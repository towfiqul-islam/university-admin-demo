import {Meteor} from 'meteor/meteor';
import Students from '../Students';

import {assert} from 'chai';

if (Meteor.isServer) {
  describe('students collection', () => {
    it('inserts correctly', function () {
      const deptID = Students.insert({
        name: 'Tim',
        department: 'CSE',
        subjects: ['Calculus', 'Algorithms'],
        total_students: 0,
        createdAt: new Date(),
      });
      const added = Students.find({_id: deptID});
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'students');
      assert.equal(count, 1);
    });
  });
}
