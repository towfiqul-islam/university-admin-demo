import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Students from '../../collections/Students';
import '../removeStudent';

if (Meteor.isServer) {
  describe('method: removeStudent', function () {
    beforeEach(function () {
      Students.remove({});
    });

    it('can remove a specific student', function () {
      // Insert a new student with 2 subjects
      const stu = Students.insert({
        name: 'Tim',
        department: 'CSE',
        subjects: ['English', 'Math'],
        createdAt: new Date(),
      });

      // Retrieve id of newly inserted student
      const {_id} = Students.findOne({name: stu.name});

      const removeStudent = Meteor.server.method_handlers['removeStudent'];

      // Invoke removeStudent with newly inserted student's id
      removeStudent.apply({}, [_id]);

      // Check if students collection is empty
      assert.equal(Students.find().count(), 0);
    });
  });
}
