'use strict';

angular.module('dcmreaderApp')
  .factory('DopplerFileAnalyzer', ['TriangleAnalysis', 'PDFAnalysis', function(TriangleAnalysis, PDFAnalysis) {
    var DopplerFileAnalyzer;
    var PhysicalUnitsDictionary = {
      '0': 'None or not applicable',
      '1': 'Percent',
      '2': 'dB',
      '3': 'cm',
      '4': 'seconds',
      '5': 'hertz',
      '6': 'dB/seconds',
      '7': 'cm/sec',
      '8': 'cm^2',
      '9': 'cm^2/sec',
      'A': 'cm^3',
      'B': 'cm^3/sec',
      'C': 'degrees'
    }
    DopplerFileAnalyzer = (function(){
      function DopplerFileAnalyzer(dicomFile){

        var region_hash;
        // this is a sequence of ultrasound regions
        _.each(dicomFile['0018,6011'].value_field, function(sequence_item){
          var sequence_hash = {}
          _.each(sequence_item.value_field, function(data_element){
            sequence_hash[data_element.tag] = data_element;
          })

          if(sequence_hash['0018,6014'] && sequence_hash['0018,6014'].value_field == 3){
            region_hash ={
              region_location_min_x0 :  sequence_hash['0018,6018'].value_field,
              region_location_min_y0 :  sequence_hash['0018,601A'].value_field,
              region_location_min_x1 :  sequence_hash['0018,601C'].value_field,
              region_location_min_y1 :  sequence_hash['0018,601E'].value_field,
              reference_pixel_x0 :  sequence_hash['0018,6020'].value_field,
              reference_pixel_y0 :  sequence_hash['0018,6022'].value_field,
              physical_units_x :  sequence_hash['0018,6024'].value_field,
              physical_units_y :  sequence_hash['0018,6026'].value_field,
              physical_delta_x :  sequence_hash['0018,602C'].value_field,
              physical_delta_y :  sequence_hash['0018,602E'].value_field
            }

          }
        })

        var doppler_baseline = {
            x0: region_hash['region_location_min_x0']+region_hash['reference_pixel_x0'],
            y0: region_hash['region_location_min_y0']+region_hash['reference_pixel_y0'],
            x1: region_hash['region_location_min_x1'],
            y1: region_hash['region_location_min_y0']+region_hash['reference_pixel_y0']
          }
        var maximum_velocity = region_hash['reference_pixel_y0'];
        console.log('max',region_hash,  maximum_velocity, doppler_baseline['y0'] )
        var pixel_data = {
          peak: {x:doppler_baseline['x0']+50, y: doppler_baseline['y0'] - maximum_velocity/2},
          start: {x:doppler_baseline['x0'] , y: doppler_baseline['y0']},
          end: {x:doppler_baseline['x0']+100,y: doppler_baseline['y0']}
        }
        var tsr = region_hash['physical_delta_x'];
        var vsr = region_hash['physical_delta_y'];
        var triangle_data = TriangleAnalysis.update_indexes(pixel_data, tsr, vsr);
        var pdf_data = PDFAnalysis.get_e_wave_from_triangle(triangle_data)
        var doppler_file_analyzer = {
          time_units: PhysicalUnitsDictionary[region_hash['physical_units_x']],
          velocity_units: PhysicalUnitsDictionary[region_hash['physical_units_y']],
          tsr: tsr,
          vsr: vsr,
          doppler_region: {
            x0: region_hash['region_location_min_x0'],
            y0: region_hash['region_location_min_y0'],
            width: region_hash['region_location_min_x1']-region_hash['region_location_min_x0'],
            height: region_hash['region_location_min_y1']-region_hash['region_location_min_y0']
          },
          doppler_baseline: doppler_baseline,
          e_wave: {
            pixel_data: pixel_data,
            indexes: {
              triangle: triangle_data,
              pdf: pdf_data
            }
          },
          a_wave: {}
        }

        _.extend(this, doppler_file_analyzer);
      }

      DopplerFileAnalyzer.prototype.update_e_wave = function(){
        var triangle_data =  TriangleAnalysis.update_indexes(this.e_wave.pixel_data, this.tsr, this.vsr);
        var pdf_data = PDFAnalysis.get_e_wave_from_triangle(triangle_data);
        this.e_wave.indexes.triangle = triangle_data;
        this.e_wave.indexes.pdf = pdf_data;
        return PDFAnalysis.get_pixel_data_for_e_wave(this.e_wave.pixel_data, pdf_data, this.tsr, this.vsr)
      }


      return DopplerFileAnalyzer;
    })();
    return DopplerFileAnalyzer;
  }]);
