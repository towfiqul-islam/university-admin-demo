import assert from 'assert';
import '../imports/api/collections/__tests__/departments.tests.js';
import '../imports/api/collections/__tests__/subjects.tests.js';
import '../imports/api/collections/__tests__/students.tests.js';

import '../imports/api/methods/__tests__/createDepartment.tests';
import '../imports/api/methods/__tests__/updateDepartment.tests';

import '../imports/api/methods/__tests__/createSubject.tests';
import '../imports/api/methods/__tests__/updateSubject.tests';

import '../imports/api/methods/__tests__/createStudent.tests';
import '../imports/api/methods/__tests__/updateStudent.tests';
import '../imports/api/methods/__tests__/removeStudent.tests';

import '../imports/api/methods/__tests__/decrease_total_student_on_department.tests';
import '../imports/api/methods/__tests__/decrease_total_student_on_subjects.tests';

describe('university-admin', function () {
  it('package.json has correct name', async function () {
    const {name} = await import('../package.json');
    assert.strictEqual(name, 'university-admin');
  });

  if (Meteor.isClient) {
    it('client is not server', function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
