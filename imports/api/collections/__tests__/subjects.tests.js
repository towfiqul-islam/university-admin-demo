import {Meteor} from 'meteor/meteor';
import Subjects from '../Subjects';

import {assert} from 'chai';

if (Meteor.isServer) {
  describe('subjects collection', () => {
    it('inserts correctly', function () {
      const deptID = Subjects.insert({
        name: 'Calculus',
        department: ['CSE', 'EEE'],
        total_students: 0,
        createdAt: new Date(),
      });
      const added = Subjects.find({_id: deptID});
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'subjects');
      assert.equal(count, 1);
    });
  });
}
