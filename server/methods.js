import {MachinesCollection, OilSamplesCollection} from '../imports/collections';

Meteor.methods({
  //graph oil samples Methods
  getMachinesByPlate(text) {
    return MachinesCollection.find({
      'Identification.Number': { $regex : text, $options: 'i' }
    }, {
      fields : {
        _id : 1,
        GuidBackend : 1,
        Identification: 1
      }
    }).fetch();
  },
  getOilVariablesList(machine) {
    return [
      {
        "Id":4401,
        "ParentId": "566affcf4b9e6d1330a1aa73",
        "Parent":"(0) Mix",
        "DefaultParent":true,
        "Code":"HidraulicBarium",
        "Abbreviation":"HBA",
        "Descriptions":[
          {
            "Language" : "es",
            "Description" : "Bario en Sistema Hidráulico"
          },
          {
            "Language" : "en",
            "Description" : "Hidraulic Barium"
          }
        ],
        "Type":"Numeric",
        "UserIndex":0,
        "MeasureUnit":"PPM",
        "MksExpression":"",
        "SampleTime":0.5,
        "UpperLimit":null,
        "LowerLimit":null
      },
      {
        "Id":4402,
        "ParentId": "566affcf4b9e6d1330a1aa73",
        "Parent":"(0) Mix",
        "DefaultParent":true,
        "Code":"HidraulicBoron",
        "Abbreviation":"HB",
        "Descriptions":[
          {
            "Language" : "es",
            "Description" : "Boro en Sistema Hidráulico"
          },
          {
            "Language" : "en",
            "Description" : "Hidraulic Boron"
          }
        ],
        "Type":"Numeric",
        "UserIndex":0,
        "MeasureUnit":"PPM",
        "MksExpression":"",
        "SampleTime":0.5,
        "UpperLimit":null,
        "LowerLimit":null
      }
    ];
  },
  getOilSnapshots (machine) {
    if (machine) return OilSamplesCollection.find({"Machine.LocalId" : machine._id.valueOf()}).fetch();
    else return [];
  }
});