import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Subjects from '../../collections/Subjects';
import '../decrease_total_student_on_subjects';

if (Meteor.isServer) {
  describe('method: decrease_total_student_on_subjects', function () {
    beforeEach(function () {
      Subjects.remove({});
    });

    it('can update total_students count to a given subject', function () {
      // Insert two new subjects with total_students of 2
      const subj1 = Subjects.insert({
        name: 'Management',
        department: ['BBA'],
        total_students: 2,
        createdAt: new Date(),
      });

      const subj2 = Subjects.insert({
        name: 'English',
        department: ['BBA', 'CSE', 'EEE'],
        total_students: 2,
        createdAt: new Date(),
      });

      const updateSubject =
        Meteor.server.method_handlers['decrease_total_student_on_subjects'];

      // Invoke updateSubject with newly inserted subject's name which is an array. Because a single student can have multiple subjects and both subjects needs to be updated

      updateSubject.apply({}, ['_id', ['Management', 'English']]);

      // Retrieve total_students count of updated subject
      const updatedSubj1 = Subjects.findOne({name: 'Management'});
      const updatedSubj2 = Subjects.findOne({name: 'English'});

      // Check if total_students count decreased from 2 to 1 on both subjects
      assert.equal(updatedSubj1.total_students, 1);
      assert.equal(updatedSubj2.total_students, 1);
    });
  });
}
