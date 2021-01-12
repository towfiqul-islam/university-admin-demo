import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Subject from '../collections/Subjects.js';

Meteor.methods({
  decrease_total_student_on_subjects(id, subjects) {
    check(id, String);
    check(subjects, Array);

    for (const s of subjects) {
      const find_subject = Subject.findOne({name: s});

      Subject.update(find_subject._id, {
        $set: {total_students: find_subject.total_students - 1},
      });
    }
  },
});
