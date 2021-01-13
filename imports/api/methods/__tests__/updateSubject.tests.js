import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Subjects from '../../collections/Subjects';
import '../updateSubject';

if (Meteor.isServer) {
  describe('method: updateSubject', function () {
    beforeEach(function () {
      Subjects.remove({});
    });

    it('can update total_students count to a given subject', function () {
      // Insert a new subject with total_students of 0
      const subj = Subjects.insert({
        name: 'Management',
        department: ['BBA'],
        total_students: 0,
        createdAt: new Date(),
      });

      // Retrieve name of newly inserted subject
      const {name} = Subjects.findOne({name: subj.name});

      const updateSubject = Meteor.server.method_handlers['updateSubject'];

      // Invoke updateSubject with newly inserted subject's name
      updateSubject.apply({}, [name]);

      // Retrieve total_students count of updated subject
      const {total_students} = Subjects.findOne({name: name});

      // Check if total_students count increased from 0 to 1
      assert.equal(total_students, 1);
    });
  });
}
