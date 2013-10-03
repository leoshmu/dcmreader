'use strict';

angular.module('dcmreaderApp')
  .factory('ValueRepresentationDictionary', function () {
    // Service logic
    // ...

    var vr_dictionary = {
            'AE':{
              'name':'Application Entity',
              'definition':'A string of characters that identifies an Application Entity with leading and trailing spaces (20H) being non-significant. A value consisting solely of spaces shall not be used.',
              'character_repertoire':'Default Character Repertoire excluding character code 5CH (the BACKSLASH "\" in ISO-IR 6), and control characters LF, FF, CR and ESC.',
              'length':'16 bytes maximum',
              'type':'char string'
            },
            'AS':{
              'name':'Age String',
              'definition':'A string of characters with one of the following formats -- nnnD, nnnW, nnnM, nnnY; where nnn shall contain the number of days for D, weeks for W, months for M, or years for Y.',
              'character_repertoire':'0"-"9", "D", "W", "M", "Y" of Default Character Repertoire',
              'length':'4 bytes fixed',
              'type':'char string'
            },
            'AT':{
              'name':'Attribute Tag',
              'definition':'Ordered pair of 16-bit unsigned integers that is the value of a Data Element Tag.',
              'character_repertoire':'not applicable',
              'length':'4 bytes fixed',
              'type':'Uint16'
            },
            'CS':{
              'name':'Code String',
              'definition':'A string of characters with leading or trailing spaces (20H) being non-significant.',
              'character_repertoire':'Uppercase characters, "0"- "9", the SPACE character, and underscore "_", of the Default Character Repertoire',
              'length':'16 bytes maximum',
              'type':'char string'
            },
            'DA':{
              'name':'Date',
              'definition':'A string of characters of the format YYYYMMDD; where YYYY shall contain year, MM shall contain the month, and DD shall contain the day, interpreted as a date of the Gregorian calendar system.',
              'character_repertoire':'"0"-"9" of Default Character Repertoire In the context of a Query with range matching (see PS3.4), the character "-" is allowed, and a trailing SPACE character is allowed for padding.',
              'length':'￼8 bytes fixed In the context of a Query with range matching (see PS3.4), the length is 18 bytes maximum.',
              'type':'char string'
            },
            'DS':{
              'name':"Decimal String",
              'definition':'A string of characters representing either a fixed point number or a floating point number. A fixed point number shall contain only the characters 0-9 with an optional leading "+" or "-" and an optional "." to mark the decimal point. A floating point number shall be conveyed as defined in ANSI X3.9, with an "E" or "e" to indicate the start of the exponent. Decimal Strings may be padded with leading or trailing spaces. Embedded spaces are not allowed. Note: Data Elements with multiple values using this VR may not be properly encoded if Explicit-VR transfer syntax is used and the VL of this attribute exceeds 65534 bytes.',
              'length':'16 bytes max',
              'type':'char string'
            },
            'DT':{
              'name':'Date Time',
              'definition':'A concatenated date-time character string in the format: YYYYMMDDHHMMSS.FFFFFF&ZZXX The components of this string, from left to right, are YYYY = Year, MM = Month, DD = Day, HH = Hour (range "00" - "23"), MM = Minute (range "00" - "59"), SS = Second (range "00" - "60"). FFFFFF = Fractional Second contains a fractional part of a second as small as 1 millionth of a second (range "000000" - "999999"). &ZZXX is an optional suffix for offset from Coordinated Universal Time (UTC), where & = "+" or "-", and ZZ = Hours and XX = Minutes of offset. The year, month, and day shall be interpreted as a date of the Gregorian calendar system. A 24-hour clock is used. Midnight shall be represented by only "0000" since "2400" would violate the hour range. The Fractional Second component, if present, shall contain 1 to 6 digits. If Fractional Second is unspecified the preceding "." shall not be included. The offset suffix, if present, shall contain 4 digits. The string may be padded with trailing SPACE characters. Leading and embedded spaces are not allowed. A component that is omitted from the string is termed a null component. Trailing null components of Date Time indicate that the value is not precise to the precision of those components. The YYYY component shall not be null. Non-trailing null components are prohibited. The optional suffix is not considered as a component.A Date Time value without the optional suffix is interpreted to be in the local time zone of the application creating the Data Element, unless explicitly specified by the Timezone Offset From UTC (0008,0201). UTC offsets are calculated as "local time minus UTC". The offset for a Date Time value in UTC shall be +0000. Notes: 1. The range of the offset is -1200 to +1400. The offset for United States Eastern Standard Time is -0500. The offset for Japan Standard Time is +0900. 2. The RFC 2822 use of -0000 as an offset to indicate local time is not allowed. 3. A Date Time value of 195308 means August 1953, not specific to particular day. A Date Time value of 19530827111300.0 means August 27, 1953, 11;13 a.m. accurate to 1/10th second. 4. The Second component may have a value of 60 only for a leap second. 5. The offset may be included regardless of null components; e.g., 2007-0500 is a legal value.',               'character_repertoire':'"0"-"9", "+", "-", "." and the SPACE character of Default Character Repertoire',
              'length':'26 bytes maximum. In the context of a Query with range matching (see PS3.4), the length is 54 bytes maximum.',
              'type':'char string'
            },
            'FL':{
              'name':'Floating Point Single',
              'definition':'Single precision binary floating point number represented in IEEE 754:1985 32-bit Floating Point Number Format.',
              'character_repertoire':'not applicable',
              'length':'4 bytes fixed',
              'type':'Float32'
            },
            'FD':{
              'name':'Floating Point Double',
              'definition':'Double precision binary floating point number represented in IEEE 754:1985 64-bit Floating Point Number Format.',
              'character_repertoire':'not applicable',
              'length':'8 bytes fixed',
              'type':'Float64'
            },
            'IS':{
              'name':'Integer String',
              'definition':'A string of characters representing an Integer in base-10 (decimal), shall contain only the characters 0 - 9, with an optional leading "+" or "-". It may be padded with leading and/or trailing spaces. Embedded spaces are not allowed. The integer, n, represented shall be in the range: -2^31 <= n <= (2^31 - 1).',
              'character_repertoire':'"0"-"9", "+", "-" of Default Character Repertoire',
              'length':'12 bytes maximum',
              'type':'char string'
            },
            'LO':{
              'name':'Long String',
              'definition':'A character string that may be padded with leading and/or trailing spaces. The character code 5CH (the BACKSLASH "\" in ISO-IR 6) shall not be present, as it is used as the delimiter between values in multiple valued data elements. The string shall not have Control Characters except for ESC.',
              'character_repertoire':'Default Character Repertoire and/or as defined by (0008,0005).',
              'length':'64 chars maximum (see NOTE in 6.2)',
              'type':'char string'
            },
            'LT':{
              'name':'Long Text',
              'definition':'A character string that may contain one or more paragraphs. It may contain the Graphic Character set and the Control Characters, CR, LF, FF, and ESC. It may be padded with trailing spaces, which may be ignored, but leading spaces are considered to be significant. Data Elements with this VR shall not be multi-valued and therefore character code 5CH (the BACKSLASH "\" in ISO-IR 6) may be used.',
              'character_repertoire':'Default Character Repertoire and/or as defined by (0008,0005).',
              'length':'10240 chars maximum (see NOTE in 6.2)',
              'type':'char string'
            },
            'OB':{
              'name':'Other Byte String',
              'definition':'A string of bytes where the encoding of the contents is specified by the negotiated Transfer Syntax. OB is a VR which is insensitive to Little/Big Endian byte ordering (see Section 7.3). The string of bytes shall be padded with a single trailing NULL byte value (00H) when necessary to achieve even length.',
              'character_repertoire':'not applicable',
              'length':'see Transfer Syntax definition',
              'type':'byte string'
            },
            'OF':{
              'name':'Other Float String',
              'definition':'A string of 32-bit IEEE 754:1985 floating point words. OF is a VR which requires byte swapping within each 32-bit word when changing between Little Endian and Big Endian byte ordering (see Section 7.3).',
              'character_repertoire':'not applicable',
              'length':'2^32-4 maximum',
              'type':'Float32 string'
            },
            'OW':{
              'name':'Other Word String',
              'definition':'A string of 16-bit words where the encoding of the contents is specified by the negotiated Transfer Syntax. OW is a VR that requires byte swapping within each word when changing between Little Endian and Big Endian byte ordering (see Section 7.3).',
              'character_repertoire':'not applicable',
              'length':'see Transfer Syntax definition',
              'type':'Uint16 string'
            },
            'PN':{
              'name':'Person Name',
              'definition':'A character string encoded using a 5 component convention. The character code 5CH (the BACKSLASH "\" in ISO-IR 6) shall not be present, as it is used as the delimiter between values in multiple valued data elements. The string may be padded with trailing spaces. For human use, the five components in their order of occurrence are: family name complex, given name complex, middle name, name prefix, name suffix. Note: HL7 prohibits leading spaces within a component; DICOM allows leading and trailing spaces and considers them insignificant. Any of the five components may be an empty string. The component delimiter shall be the caret "^" character (5EH). Delimiters are required for interior null components. Trailing null components and their delimiters may be omitted. Multiple entries are permitted in each component and are encoded as natural text strings, in the format preferred by the named person. For veterinary use, the first two of the five components in their order of occurrence are: responsible party family name or responsible organization name, patient name. The remaining components are not used and shall not be present. This group of five components is referred to as a Person Name component group. For the purpose of writing names in ideographic characters and in phonetic characters, up to 3 groups of components (see Annexes H, I and J) may be used. The delimiter for component groups shall be the equals character "=" (3DH). The three component groups of components in their order of occurrence are: an alphabetic representation, an ideographic representation, and a phonetic representation. Any component group may be absent, including the first component group. In this case, the person name may start with one or more "=" delimiters. Delimiters are required for interior null component groups. Trailing null component groups and their delimiters may be omitted. Precise semantics are defined for each component group. See section 6.2.1. Examples: Rev. John Robert Quincy Adams, B.A. M.Div. "Adams^John Robert Quincy^^Rev.^B.A. M.Div." [One family name; three given names; no middle name; one prefix; two suffixes.] Susan Morrison-Jones, Ph.D., Chief Executive Officer "Morrison-Jones^Susan^^^Ph.D., Chief Executive Officer" [Two family names; one given name; no middle name; no prefix; two suffixes.] John Doe "Doe^John" [One family name; one given name; no middle name, prefix, or suffix. Delimiters have been omitted for the three trailing null components.] (for examples of the encoding of Person Names using multi-byte character sets see Annex H) Smith^Fluffy [A cat, rather than a human, whose responsible party family name is Smith, and whose own name is Fluffy] ABC Farms^Running on Water [A horse whose responsible organization is named ABC Farms, and whose name is "Running On Water"] Notes: 1. A similar multiple component convention is also used by the HL7 v2 XPN data type. However, the XPN data type places the suffix component before ￼the prefix, and has a sixth component "degree" that DICOM subsumes in the name suffix. There are also differences in the manner in which name representation is identified. 2. In typical American and European usage the first occurrence of "given name" would represent the "first name". The second and subsequent occurrences of the "given name" would typically be treated as a middle name(s). The "middle name" component is retained for the purpose of backward compatibility with existing standards. 3. The implementer should remain mindful of earlier usage forms that represented "given names" as "first" and "middle" and that translations to and from this previous typical usage may be required. 4. For reasons of backward compatibility with versions of this standard prior to V3.0, person names might be considered a single family name complex (single component without "^" delimiters).',               'character_repertoire':'Default Character Repertoire and/or as defined by (0008,0005) excluding Control Characters LF, FF, and CR but allowing Control Character ESC.',               'length':'64 chars maximum per component group (see NOTE in 6.2)',
              'type':'char string'
            },
            'SH':{
              'name':'Short String',
              'definition':'A character string that may be padded with leading and/or trailing spaces. The character code 05CH (the BACKSLASH "\" in ISO-IR 6) shall not be present, as it is used as the delimiter between values for multiple data elements. The string shall not have Control Characters except ESC.',
              'character_repertoire':'Default Character Repertoire and/or as defined by (0008,0005).',
              'length':'16 chars maximum (see NOTE in 6.2)',
              'type':'char string'
            },
            'SL':{
              'name':'Signed Long',
              'definition':'Signed binary integer 32 bits long in 2\'s complement form. Represents an integer, n, in the range: -2^31<=n<=(2^31- 1).',
              'character_repertoire':'not applicable',
              'length':'4 bytes fixed',
              'type':'signed int32'
            },
            'SQ':{
              'name':'Sequence of Items',
              'definition':'Value is a Sequence of zero or more Items, as defined in Section 7.5.',
              'character_repertoire':'not applicable (see Section 7.5)',
              'length':'not applicable (see Section 7.5)',
              'type':''
            },
            'SS':{
              'name':'Signed Short',
              'definition':'Signed binary integer 16 bits long in 2\'s complement form. Represents an integer n in the range: -2^15 <= n <= (2^15 - 1).',
              'character_repertoire':'not applicable',
              'length':'2 bytes fixed',
              'type':'signed int16'
            },
            'ST':{
              'name':'Short Text',
              'definition':'A character string that may contain one or more paragraphs. It may contain the Graphic Character set and the Control Characters, CR, LF, FF, and ESC. It may be padded with trailing spaces, which may be ignored, but leading spaces are considered to be significant. Data Elements with this VR shall not be multi-valued and therefore character code 5CH (the BACKSLASH "\" in ISO-IR 6) may be used.',
              'character_repertoire':'Default Character Repertoire and/or as defined by (0008,0005).',
              'length':'1024 chars maximum (see NOTE in 6.2)',
              'type':'char string'
            },
            'TM':{
              'name':'Time',
              'definition':'A string of characters of the format HHMMSS.FFFFFF; where HH contains hours (range "00" - "23"), MM contains minutes (range "00" - "59"), SS contains seconds (range "00" - "60"), and FFFFFF contains a fractional part of a second as small as 1 millionth of a second (range "000000" - "999999"). A 24-hour clock is used. Midnight shall be represented by only "0000" since "2400" would violate the hour range. The string may be padded with trailing spaces. Leading and embedded spaces are not allowed. One or more of the components MM, SS, or FFFFFF may be unspecified as long as every component to the right of an unspecified component is also unspecified, which indicates that the value is not precise to the precision of those unspecified components. The FFFFFF component, if present, shall contain 1 to 6 digitis. If FFFFFF is unspecified the preceding "." shall not be included. Examples: 1. "070907.0705 " represents a time of 7 hours, 9 minutes and 7.0705 seconds. 2. "1010" represents a time of 10 hours, and 10 minutes. 3. "021 " is an invalid value. Notes: 1. The ACR-NEMA Standard 300 (predecessor to DICOM) supported a string of characters of the format HH:MM:SS.frac for this VR. Use of this format is not compliant. 2. See also DT VR in this table. 3. The SS component may have a value of 60 only for a leap second.',
              'character_repertoire':'"0"-"9", "." and the SPACE character of Default Character Repertoire. In the context of a Query with range matching (see PS3.4), the character "-" is allowed.',
              'length':'16 bytes maximum. In the context of a Query with range matching (see PS3.4), the length is 28 bytes maximum.',
              'type':'char string'
            },
            'UI':{
              'name':'Unique Identifier (UID)',
              'definition':'A character string containing a UID that is used to uniquely identify a wide variety of items. The UID is a series of numeric components separated by the period "." character. If a Value Field containing one or more UIDs is an odd number of bytes in length, the Value Field shall be padded with a single trailing NULL (00H) character to ensure that the Value Field is an even number of bytes in length. See Section 9 and Annex B for a complete specification and examples.',
              'character_repertoire':'"0"-"9", "." of Default Character Repertoire',
              'length':'64 bytes maximum',
              'type':'char string'
            },
            'UL':{
              'name':'Unsigned Long',
              'definition':'Unsigned binary integer 32 bits long. Represents an integer n in the range: 0 <= n < 2^32.',
              'character_repertoire':'not applicable',
              'length':'4 bytes fixed',
              'type':'Uint32'
            },
            'UN':{
              'name':'Unknown',
              'definition':'A string of bytes where the encoding of the contents is unknown (see Section 6.2.2).',
              'character_repertoire':'not applicable',
              'length':'Any length valid for any of the other DICOM Value Representations',
              'type':''
            },
            'US':{
              'name':'Unsigned Short',
              'definition':'Unsigned binary integer 16 bits long. Represents integer n in the range: 0 <= n < 2^16.',
              'character_repertoire':'not applicable',
              'length':'2 bytes fixed',
              'type':'Uint16'
            },
            'UT':{
              'name':'Unlimited Text',
              'definition':'A character string that may contain one or more paragraphs. It may contain the Graphic Character set and the Control Characters, CR, LF, FF, and ESC. It may be padded with trailing spaces, which may be ignored, but leading spaces are considered to be significant. Data Elements with this VR shall not be multi-valued and therefore character code 5CH (the BACKSLASH "\" in ISO-IR 6) may be used.',
              'character_repertoire':'Default Character Repertoire and/or as defined by (0008,0005).',
              'length':'2^32-2 Note: limited only by the size of the maximum unsigned integer representable in a 32 bit VL field minus one, since FFFFFFFFH is reserved.',
              'type':'char string'
            }
          }

    // Public API here
    return {
      full: function(){
        return vr_dictionary;
      },
      lookup: function (input) {
        return vr_dictionary[input];
      }
    };
  });
