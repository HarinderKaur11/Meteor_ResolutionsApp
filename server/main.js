import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Resolutions= new Mongo.Collection('resolutions');

  Meteor.methods({
	addResolution: function(title){
		Resolutions.insert({
			title: title,
			createdAt: new Date(),
			owner: Meteor.userId()
		});
	},

	updateResolution:function(id,checked){
		Resolutions.update(id,{$set:{ checked: checked} })
	},

	deleteResolution:function(id){
		Resolutions.remove(id);
	},

	setPrivate: function(id,private){
		var res=Resolutions.findOne(id);
		if(res.owner!==Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}

		Resolutions.update(id,{$set:{ private: private} })
	}
});
});

Meteor.publish("resolutions", function(){
	return Resolutions.find();

});
