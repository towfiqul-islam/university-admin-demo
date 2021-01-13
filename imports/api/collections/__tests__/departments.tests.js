import {Meteor} from 'meteor/meteor';
import Departments from '../Departments';

import {assert} from 'chai';

if (Meteor.isServer) {
  describe('departments collection', () => {
    it('inserts correctly', function () {
      const deptID = Departments.insert({
        name: 'CSE',
        total_students: 0,
        createdAt: new Date(),
      });
      const added = Departments.find({_id: deptID});
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'departments');
      assert.equal(count, 1);
    });
  });
}
