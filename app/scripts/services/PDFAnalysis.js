'use strict';

angular.module('dcmreaderApp')
  .factory('PDFAnalysis', [function() {
    // Service logic
    // ...
    var underdamped_upper_limit = 2.64;
    var underdamped_critical_upper_limit =3.78;

    var capitalY = function(y){
      var sqrt1minusyneg2 = Math.sqrt(1-Math.pow(y,-2));
      return -1/(2*sqrt1minusyneg2) * (Math.log((1+sqrt1minusyneg2)/(1-sqrt1minusyneg2)))
    }
    var invertOverDamped = function(ATDTRatio){
      var inverse_y = 0.0005;
      var newError = Math.abs(ATDTRatio - 1- 2*1/inverse_y*Math.exp(capitalY(1/inverse_y)));
      do {
        var lastError = newError;
        inverse_y +=0.0005;
        var matchATOverDT = 1- 2*1/inverse_y*Math.exp(capitalY(1/inverse_y));
        newError = Math.abs(matchATOverDT - ATDTRatio);
      }
      while  (newError < lastError && (inverse_y < 1))
      return 1/inverse_y;
    }
    var e_wave_velocity = function(c, k, x0, t){
      var v;
      var alpha = c/2;
      var y = alpha/Math.sqrt(k);

      if(y<=1){
        //underdamped or critically damped
        var omega = Math.sqrt(k)*Math.sqrt(1-Math.pow(y,2));
        var omega = Math.sqrt(k - Math.pow(alpha,2))
        v = k*x0/omega*Math.exp(-alpha*t)*Math.sin(omega*t);
        // = pdf_data['k']*pdf_data['x0']/pdf_data['w'] *Math.exp(-pdf_data['c']/2*convertedTime)*Math.sin(pdf_data['w']*convertedTime);
      } else {
        // overdamped
        var beta = Math.sqrt(Math.pow(alpha,2)-k);
        v = k*x0/beta *Math.exp(-alpha*t)*(Math.exp(beta*t)-Math.exp(-beta*t))/2
      }
      return v
    }
    var underDampedCriticalRegion = function(AT, DT, Epeak){

      var matchValue = (DT-AT)/(2*DT);
      var y = 0.0005;
      var newError = Math.abs(matchValue - y*Math.exp(-y*Math.acos(y)/Math.sqrt(1-Math.pow(y,2))));
      do {
        var lastError = newError;
        y +=0.0005;
        var newMatchValue = y*Math.exp(-y*Math.acos(y)/Math.sqrt(1-Math.pow(y,2)));
        newError = Math.abs(matchValue - newMatchValue);
      }
      while  (newError < lastError && (y < 1))

      var found_y = y;
      var inverse_y=1/found_y;
      var found_k=Math.pow(((1/AT)*Math.acos(found_y)/Math.sqrt(1-(Math.pow(found_y,2)))),2);
      var found_c=found_y*2*Math.sqrt(found_k);
      var found_x0=((Epeak/Math.sqrt(found_k))*(Math.exp(Math.atan(Math.sqrt(Math.pow(inverse_y,2)-1))/Math.sqrt(Math.pow(inverse_y,2)-1))));
      return {c: found_c, k: found_k, x0: found_x0, y: y, type:'underdamped_critical'}
    }
    var underDampedRegion = function(AT, DT, Epeak){
        var y = Math.cos(Math.PI*AT/(AT+DT));
      var pdfK = 1/Math.pow((AT + DT),2)*Math.PI*Math.PI/(1-Math.pow(y,2));
      var pdfC = 2*y*Math.sqrt(pdfK);
      var pdfX0 = (Epeak) / Math.sqrt(pdfK) * Math.exp(y*Math.acos(y)/Math.sqrt(1-Math.pow(y,2)));
      return {c: pdfC, k: pdfK, x0: pdfX0, y: y, type:'underdamped'};
    }
    var overDampedRegion = function(AT, DT, Epeak){
      var y = invertOverDamped(AT/DT);
      var pdfK = Math.pow(1/AT*capitalY(y)/y,2);
      var pdfC = 2*y*Math.sqrt(pdfK);
      var pdfX0 = Epeak / (Math.sqrt(pdfK)*Math.exp(capitalY(y)));
      return {c: pdfC, k: pdfK, x0: pdfX0, y: y, type:'overdamped'};
    }

    // Public API here
    return {
      get_e_wave_from_triangle : function(triangle_data){
        var AT = triangle_data.AT;
        var DT = triangle_data.DT;
        var Epeak = triangle_data.MaxV;

        if (DT/AT > underdamped_upper_limit && DT/AT < underdamped_critical_upper_limit){
          // underdamped with inflection case
          var foundPDF = underDampedCriticalRegion(AT, DT, Epeak);
        }
        if (DT/AT >= underdamped_critical_upper_limit){
          // underdamped with inflection case
          var foundPDF = overDampedRegion(AT, DT, Epeak);
        }
        if (DT/AT<=underdamped_upper_limit){
          //fully underdamped case
          var foundPDF = underDampedRegion(AT, DT, Epeak);
        }
        foundPDF['w'] = Math.sqrt(foundPDF['k'])*Math.sqrt(1-Math.pow(foundPDF['y'],2));
        return foundPDF
      },
      get_pixel_data_for_e_wave: function(pixel_data, pdf_data, tsr, vsr){

        var line_data = [];
        for(var i=0; i<parseInt(pixel_data.end.x-pixel_data.start.x); i++){
            var convertedTime = i*tsr;
            var pdfVel = e_wave_velocity(pdf_data['c'], pdf_data['k'], pdf_data['x0'], convertedTime);
            line_data.push({
              "x":pixel_data.start.x+i, "y": pixel_data.start.y - pdfVel/vsr
            })
          }
        return {type:pdf_data.type, data: line_data}
      }
    };
  }]);
