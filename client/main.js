import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions= new Mongo.Collection('resolutions');

Template.body.helpers({
		resolutions:function(){
			return Resolutions.find();
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
