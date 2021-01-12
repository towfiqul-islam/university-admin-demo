import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Subject from '../collections/Subjects.js';

Meteor.methods({
  createSubject(name, department, total_students) {
    check(name, String);
    check(department, Array);
    check(total_students, Number);

    return Subject.insert({
      name,
      department,
      total_students,

      createdAt: new Date(),
    });
  },
});
