import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Departments from '../../collections/Departments';
import '../updateDepartment';

if (Meteor.isServer) {
  describe('method: updateDepartment', function () {
    beforeEach(function () {
      Departments.remove({});
    });

    it('can update total_students count to a given department', function () {
      // Insert a new department with total_students of 0
      const dept = Departments.insert({
        name: 'EEE',
        total_students: 0,
        createdAt: new Date(),
      });

      // Retrieve name of newly inserted department
      const {name} = Departments.findOne({name: dept.name});

      const updateDepartment =
        Meteor.server.method_handlers['updateDepartment'];

      // Invoke updateDepartment with newly inserted department's name
      updateDepartment.apply({}, [name]);

      // Retrieve total_students count of updated department
      const {total_students} = Departments.findOne({name: name});

      // Check if total_students count increased from 0 to 1
      assert.equal(total_students, 1);
    });
  });
}
