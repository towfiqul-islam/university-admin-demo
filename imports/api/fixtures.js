import {Meteor} from 'meteor/meteor';
import Subjects from './collections/Subjects.js';
import Departments from './collections/Departments.js';
import Students from './collections/Students.js';

Meteor.startup(() => {
  // if the Departments collection is empty
  if (Departments.find().count() === 0) {
    const data = [
      {
        name: 'CSE',
        total_students: 1,
        createdAt: new Date(),
      },
      {
        name: 'BBA',
        total_students: 0,
        createdAt: new Date(),
      },
      {
        name: 'EEE',
        total_students: 0,
        createdAt: new Date(),
      },
    ];

    data.forEach(dept => Departments.insert(dept));
  }
  // if the Subjects collection is empty
  if (Subjects.find().count() === 0) {
    const data = [
      {
        name: 'Calculus',
        department: ['CSE', 'EEE'],
        total_students: 0,
        createdAt: new Date(),
      },
      {
        name: 'English',
        department: ['CSE', 'EEE', 'BBA'],
        total_students: 1,
        createdAt: new Date(),
      },
      {
        name: 'Management',
        department: ['BBA'],
        total_students: 0,
        createdAt: new Date(),
      },
      {
        name: 'Electronics',
        department: ['EEE'],
        total_students: 0,
        createdAt: new Date(),
      },
      {
        name: 'Algorithms',
        department: ['CSE'],
        total_students: 1,
        createdAt: new Date(),
      },
    ];

    data.forEach(subj => Subjects.insert(subj));
  }
  // if the Students collection is empty
  if (Students.find().count() === 0) {
    const data = [
      {
        name: 'Tim',
        department: 'CSE',
        subjects: ['English', 'Algorithms'],
        createdAt: new Date(),
      },
    ];

    data.forEach(stud => Students.insert(stud));
  }
});
