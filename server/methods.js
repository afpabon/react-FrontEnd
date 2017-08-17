import {MachinesCollection, OilSamplesCollection, SystemValuesCollection} from '../imports/collections';

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
    //>=4000 && <5000
    let oilVariables = SystemValuesCollection.findOne({Group: "Variable"}).Values;
    oilVariables = oilVariables.filter(v => v.Id >= 4000 && v.Id < 5000);
    let fullMachine = MachinesCollection.findOne({GuidBackend: machine.GuidBackend}, {fields : {Systems: 1, DataSources: 1, GuidBackend: 1}});
    let formulas = [];
    _.each(fullMachine.Systems, system => {
      _.each(system.Rules, rule => {
        if(rule.InheritedStatus !== 0 && rule.InheritedStatus !== 7){
          formulas.push(rule.Formula);
        }
      });
    });
    let oilVarsList = [];


    return [
      {
        "Id": 4022,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineWaterInOil",
        "Abbreviation": "EH2O",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Agua en aceite en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Water in oil"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "%",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4100,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialAluminum",
        "Abbreviation": "FDAL",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Aluminio en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Aluminum"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4200,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialAluminum",
        "Abbreviation": "RDAL",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Aluminio en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Aluminum"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4000,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineAluminum",
        "Abbreviation": "EAL",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Aluminio en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Aluminum"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4300,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionAluminum",
        "Abbreviation": "TAL",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Aluminio en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Aluminum"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4107,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialCooper",
        "Abbreviation": "FDCU",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cobre en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Cooper"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4207,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialCooper",
        "Abbreviation": "RDCU",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cobre en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Cooper"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4007,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineCooper",
        "Abbreviation": "ECU",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cobre en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Cooper"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4307,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionCooper",
        "Abbreviation": "TCU",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cobre en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Cooper"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4106,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialChromium",
        "Abbreviation": "FDCR",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cromo en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Chromium"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4206,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialChromium",
        "Abbreviation": "RDCR",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cromo en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Chromium"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4006,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineChromium",
        "Abbreviation": "ECR",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cromo en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Chromium"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4306,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionChromium",
        "Abbreviation": "TCR",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Cromo en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Chromium"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4124,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialFuelDilution",
        "Abbreviation": "FDFD",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Dilucion de combustible en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Fuel Dilution"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "%",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4224,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialFuelDilution",
        "Abbreviation": "RDFD",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Dilucion de combustible en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Fuel Dilution"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "%",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4024,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineFuelDilution",
        "Abbreviation": "EFD",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Dilucion de combustible en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Fuel Dilution"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "%",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4324,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionFuelDilution",
        "Abbreviation": "TFD",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Dilucion de combustible en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Fuel Dilution"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "%",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4108,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialIron",
        "Abbreviation": "FDFE",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Hierro en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Iron"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4208,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialIron",
        "Abbreviation": "RDFE",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Hierro en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Iron"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4008,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineIron",
        "Abbreviation": "EFE",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Hierro en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Iron"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4308,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionIron",
        "Abbreviation": "TFE",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Hierro en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Iron"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4027,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineSoot",
        "Abbreviation": "ESO",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Hollín en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Soot"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "%",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4026,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineOxidation",
        "Abbreviation": "EOX",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Oxidación en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Oxidation"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "A/cm",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4109,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialLead",
        "Abbreviation": "FDPB",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Plomo en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Lead"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4209,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialLead",
        "Abbreviation": "RDPB",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Plomo en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Lead"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4009,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineLead",
        "Abbreviation": "EPB",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Plomo en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Lead"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4309,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionLead",
        "Abbreviation": "TPB",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Plomo en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Lead"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4115,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialSilicon",
        "Abbreviation": "FDSI",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Silicio en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Silicon"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4215,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialSilicon",
        "Abbreviation": "RDSI",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Silicio en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Silicon"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4015,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineSilicon",
        "Abbreviation": "ESI",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Silicio en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Silicon"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4315,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionSilicon",
        "Abbreviation": "TSI",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Silicio en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Silicon"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "PPM",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4128,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialTbn",
        "Abbreviation": "FDTBN",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Tbn en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Tbn"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "mgKOH/g",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4228,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialTbn",
        "Abbreviation": "RDTBN",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Tbn en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Tbn"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "mgKOH/g",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4028,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineTbn",
        "Abbreviation": "ETBN",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Tbn en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Tbn"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "mgKOH/g",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4328,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionTbn",
        "Abbreviation": "TTBN",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Tbn en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Tbn"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "mgKOH/g",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4130,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "FrontDifferentialViscosity100",
        "Abbreviation": "FDV1K",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Viscosidad @ 100°C en Diferencial Frontal"
          },
          {
            "Language": "en",
            "Description": "Front Differential Viscosity @ 100°C"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "cSt",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4230,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "RearDifferentialViscosity100",
        "Abbreviation": "RDV1K",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Viscosidad @ 100°C en Diferencial Trasero"
          },
          {
            "Language": "en",
            "Description": "Rear Differential Viscosity @ 100°C"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "cSt",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4030,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "EngineViscosity100",
        "Abbreviation": "EV1K",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Viscosidad @ 100°C en Motor"
          },
          {
            "Language": "en",
            "Description": "Engine Viscosity @ 100°C"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "cSt",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      },
      {
        "Id": 4330,
        "ParentId": {
          "_str": "5915dd6a7f6eb07a7907bec9"
        },
        "Parent": "(1) Prolub",
        "DefaultParent": false,
        "Code": "TransmissionViscosity100",
        "Abbreviation": "TV1K",
        "Descriptions": [
          {
            "Language": "es",
            "Description": "Viscosidad @ 100°C en Transmisión"
          },
          {
            "Language": "en",
            "Description": "Transmission Viscosity @ 100°C"
          }
        ],
        "Type": "Numeric",
        "UserIndex": 0,
        "MeasureUnit": "cSt",
        "MksExpression": "",
        "SampleTime": 60,
        "UpperLimit": null,
        "LowerLimit": null
      }
    ]
  },
  getOilSnapshots (machine) {
    if (machine) return OilSamplesCollection.find({"Machine.LocalId" : machine._id.valueOf()}).fetch();
    else return [];
  }
});