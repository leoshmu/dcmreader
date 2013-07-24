'use strict';

angular.module('dcmreaderApp')
  .factory('TagDictionary', function () {
    // Service logic
    // ...

    var tagHash = {
      '0002,0000': 'Meta Element Group Length',
      '0002,0001': 'File Meta Information Version',
      '0002,0002': 'Media Storage SOP Class UID',
      '0002,0003': 'Media Storage SOP Instance UID',
      '0002,0010': 'Transfer Syntax UID',
      '0002,0012': 'Implementation Class UID',
      '0002,0013': 'Implementation Version Name',
      '0008,0000': 'Identifying Group Length',
      '0008,0008': 'Image Type',
      '0008,0016': 'SOP Class UID',
      '0008,0018': 'SOP Instance UID',
      '0008,0020': 'Study Date',
      '0008,0023': 'Image Date',
      '0008,0030': 'Study Time',
      '0008,0060': 'Modality',
      '0008,0070': 'Manufacturer',
      '0008,0080': 'Institution Name',
      '0008,0090': 'Referring Physician\'s Name',
      '0008,1010': 'Station Name',
      '0008,1030': 'Study Description',
      '0008,103E': 'Series Description',
      '0008,1090': 'Manufacturer\'s Model Name',
      '0008,2122': 'Stage Number',
      '0008,2124': 'Number of Stages',
      '0008,2128': 'View Number',
      '0008,212A': 'Number of Views in Stage',
      '0010,0000': 'Patient Group Length',
      '0010,0010': 'Patient\'s Name',
      '0018,0000': 'Acquisition Group Length',
      '0018,1000': 'Device Serial Number',
      '0018,1020': 'Software Version(s)',
      '0018,1030': 'Protocol Name',
      '0020,0000': 'Relationship Group Length',
      '0020,000D': 'Study Instance UID',
      '0020,000E': 'Series Instance UID',
      '0020,0011': 'Series Number',
      '0020,0013': 'Instance (form...Image) Number',
      '0028,0000': 'Image Presenta... Group Length',
      '0028,0002': 'Samples per Pixel',
      '0028,0004': 'Photometric Interpretation',
      '0028,0006': 'Planar Configuration',
      '0028,0010': 'Rows',
      '0028,0011': 'Columns',
      '0028,0034': 'Pixel Aspect Ratio',
      '0028,0100': 'Bits Allocated',
      '0028,0101': 'Bits Stored',
      '0028,0102': 'High Bit',
      '0028,0103': 'Pixel Representation',
      '7FE0,0000': 'Pixel Data Group Length',
      '7FE0,0010': 'Pixel Data'
    }

    // Public API here
    return {
      getTagDescription: function (tagString) {
        return tagHash[tagString];
      }
    };
  });
