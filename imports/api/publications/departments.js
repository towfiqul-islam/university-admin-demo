import {Meteor} from 'meteor/meteor';
import Departments from '../collections/Departments.js';

Meteor.publish('departments', function () {
  return Departments.find();
});
