import {Meteor} from 'meteor/meteor';
import Subjects from '../collections/Subjects.js';

Meteor.publish('subjects', function () {
  return Subjects.find();
});
