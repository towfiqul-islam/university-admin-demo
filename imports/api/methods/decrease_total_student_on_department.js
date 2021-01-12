import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Department from '../collections/Departments.js';

Meteor.methods({
  decrease_total_student_on_department(name) {
    check(name, String);

    const find_department = Department.findOne({name: name});

    Department.update(find_department._id, {
      $set: {total_students: find_department.total_students - 1},
    });
  },
});
