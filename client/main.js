import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions= new Mongo.Collection('resolutions');

Template.body.helpers({
		resolutions:function(){
			return Resolutions.find();
		}
	});


