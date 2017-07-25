import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Resolutions= new Mongo.Collection('resolutions');
});
