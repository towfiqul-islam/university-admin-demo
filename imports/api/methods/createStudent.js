import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Student from '../collections/Students.js';

Meteor.methods({
  createStudent(name, department, subjects) {
    check(name, String);
    check(department, String);
    check(subjects, Array);

    return Student.insert({
      name,
      department,
      subjects,
      createdAt: new Date(),
    });
  },
});
