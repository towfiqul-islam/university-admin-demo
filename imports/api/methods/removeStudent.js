import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Student from '../collections/Students.js';

Meteor.methods({
  removeStudent(id) {
    check(id, String);

    // const find_subject = Subject.findOne({name: name});

    Student.remove(id);
  },
});
