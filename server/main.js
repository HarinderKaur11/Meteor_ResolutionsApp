import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Resolutions= new Mongo.Collection('resolutions');

  Meteor.methods({
	addResolution: function(title){
		Resolutions.insert({
			title: title,
			createdAt: new Date()
		});
	},

	updateResolution:function(id,checked){
		Resolutions.update(id,{$set:{ checked: checked} })
	},

	deleteResolution:function(id){
		Resolutions.remove(id);
	}
});
});
