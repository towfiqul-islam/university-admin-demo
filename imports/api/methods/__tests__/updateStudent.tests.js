import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Students from '../../collections/Students';
import '../updateStudent';

if (Meteor.isServer) {
  describe('method: updateStudent', function () {
    beforeEach(function () {
      Students.remove({});
    });

    it('can update subjects of a given student', function () {
      // Insert a new student with 2 subjects
      const stu = Students.insert({
        name: 'Tim',
        department: 'CSE',
        subjects: ['English', 'Math'],
        createdAt: new Date(),
      });

      // Retrieve _id of newly inserted student
      const {_id} = Students.findOne({name: stu.name});

      const updateStudent = Meteor.server.method_handlers['updateStudent'];

      // Invoke updateStudent with newly inserted student's id and a new subject
      updateStudent.apply({}, [_id, 'Algorithms']);

      // Retrieve subjects array of updated student
      const {subjects} = Students.findOne({_id: _id});

      // Check if subjects array length increased from 2 to 3
      assert.equal(subjects.length, 3);
    });
  });
}
