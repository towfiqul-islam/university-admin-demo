import {Meteor} from 'meteor/meteor';
import Students from '../collections/Students.js';

Meteor.publish('students', function () {
  return Students.find();
});
