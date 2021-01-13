import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Students from '../../collections/Students';
import '../createStudent';

if (Meteor.isServer) {
  describe('method: createStudent', function () {
    beforeEach(function () {
      Students.remove({});
    });

    it('can add a new student', function () {
      const addStudent = Meteor.server.method_handlers['createStudent'];

      addStudent.apply({}, ['Tim', 'CSE', ['Calculus', 'English']]);

      assert.equal(Students.find().count(), 1);
    });
  });
}
