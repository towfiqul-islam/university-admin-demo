import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';
import Subjects from '../../collections/Subjects';
import '../createSubject';

if (Meteor.isServer) {
  describe('method: createSubject', function () {
    beforeEach(function () {
      Subjects.remove({});
    });

    it('can add a new subject', function () {
      const addSubject = Meteor.server.method_handlers['createSubject'];

      addSubject.apply({}, ['English', ['CSE', 'BBA', 'EEE'], 0]);

      assert.equal(Subjects.find().count(), 1);
    });
  });
}
