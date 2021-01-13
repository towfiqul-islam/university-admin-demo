import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Departments from '../../collections/Departments';
import '../createDepartment';

if (Meteor.isServer) {
  describe('method: createDepartment', function () {
    beforeEach(function () {
      Departments.remove({});
    });

    it('can add a new department', function () {
      const addDepartment = Meteor.server.method_handlers['createDepartment'];

      addDepartment.apply({}, ['CSE', 0]);

      assert.equal(Departments.find().count(), 1);
    });
  });
}
