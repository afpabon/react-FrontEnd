import {MachinesCollection} from '../imports/collections';

Meteor.publish("variables_last_values", function(vehicleId, module, submodule) {
  if (vehicleId) 
    return MachinesCollection.find({
      _id : new Meteor.Collection.ObjectID(vehicleId),
      'Packages.Name' :  'Variables',
      ResourceType : 0
    });
  else
    return null;
});