const MachinesCollection = new Mongo.Collection('Machines');
const OilSamplesCollection = new Mongo.Collection('OilSamples');
const SystemValuesCollection = new Mongo.Collection('SystemValues');

export { MachinesCollection,  OilSamplesCollection, SystemValuesCollection}