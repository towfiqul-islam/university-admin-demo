import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Department from '../collections/Departments.js';

Meteor.methods({
  createDepartment(name, total_students) {
    check(name, String);
    check(total_students, Number);

    return Department.insert({
      name,
      total_students,
      createdAt: new Date(),
    });
  },
});
