import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Student from '../collections/Students.js';

Meteor.methods({
  updateStudent(id, s) {
    check(id, String);
    check(s, String);
    // console.log(subjects);

    const find_subject = Student.findOne({_id: id});

    let {subjects} = find_subject;

    subjects.push(s);

    Student.update(id, {$set: {subjects: subjects}});
  },
});
