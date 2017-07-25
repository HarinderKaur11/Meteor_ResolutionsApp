import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions= new Mongo.Collection('resolutions');

Template.body.helpers({
		resolutions:function(){
			return Resolutions.find();
		}

	});

Template.resolution.helpers({
	selectedResolution: function(){
			var selectedResolution=Session.get('selectedResolution');
			return Resolutions.findOne({_id:selectedResolution});
		}
});

Template.body.events({
	'submit .new-resolution':function(event){
		var title = event.target.title.value;

		Resolutions.insert({
			title: title,
			createdAt: new Date()
		});

		event.target.title.value="";
		return false;

	}
});

Template.resolution.events({
	'click .delete': function(){
		var id=this._id;
		Session.set('selectedResolution',id);
		var selectedResolution=Session.get('selectedResolution');
		Resolutions.remove({_id:selectedResolution});
	}
});
