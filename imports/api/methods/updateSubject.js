import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Subject from '../collections/Subjects.js';

Meteor.methods({
  updateSubject(name) {
    check(name, String);

    const find_subject = Subject.findOne({name: name});

    Subject.update(find_subject._id, {
      $set: {total_students: find_subject.total_students + 1},
    });
  },
});
