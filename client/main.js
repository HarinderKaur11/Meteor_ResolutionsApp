import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions= new Mongo.Collection('resolutions');

Meteor.subscribe("resolutions");

Template.body.helpers({
		resolutions:function(){
			if(Session.get('hideFinished')){
				return Resolutions.find({checked: {$ne: true}});
			}
			else{
				return Resolutions.find();
			}
		},

		hideFinished: function(){
			return Session.get('hideFinished');
		}

	});

Template.resolution.helpers({
	selectedResolution: function(){
			var selectedResolution=Session.get('selectedResolution');
			return Resolutions.findOne({_id:selectedResolution});
		},

	isOwner: function(){
		return this.owner===Meteor.userId();
	}
});

Template.body.events({
	'submit .new-resolution':function(event){
		var title = event.target.title.value;
		Meteor.call("addResolution",  title);
		event.target.title.value="";
		return false;
	},

	'change .hide-finished': function(event){
		Session.set('hideFinished',event.target.checked);
	}

});

Template.resolution.events({
	'click .delete': function(){
		var id=this._id;
		Session.set('selectedResolution',id);
		var selectedResolution=Session.get('selectedResolution');
		var r=confirm("Are you sure you want to remove resolution");
		if(r){
		Meteor.call("deleteResolution",selectedResolution);}
	},

	'click .toggle-checked': function(){
		Meteor.call("updateResolution",this._id,!this.checked);
	},

	'click .toggle-private': function(){
		Meteor.call("setPrivate",this._id,!this.private);
	}
});

Accounts.ui.config({
	passwordSignupFields:"USERNAME_ONLY"
});


