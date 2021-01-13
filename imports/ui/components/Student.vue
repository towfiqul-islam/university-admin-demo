<template>
  <div>
    <h2 class="mb-4 text-lg font-medium">Add New Student</h2>
     <!-- Add new student form -->
        <form class="">
          <input class="bg-gray-200 border-2 border-gray-800 px-2 py-1" type="text" v-model="name" name="name" placeholder="Student Name" required>
          
         <!-- Select dropdown to choose department -->
          <select class="border-2 border-gray-800 bg-gray-200 px-2 py-1" v-model='department'>
              <option value="" disabled>Select a department</option>
              <option v-bind:key="d._id" v-for="d in departments">{{d.name}}</option>
          </select>
          
          <!-- Selected subjects from the chip -->
          <div class="inline-block" v-if="this.subjectsTaken.length > 0">
            <div @click="popSubj(s)" class="bg-gray-900 text-gray-100 px-1 py-1 inline-block mr-1 cursor-pointer" v-bind:key='s' v-for="s in this.subjectsTaken">{{s}}</div>
          </div>
          
         <!-- Chip element to choose subjects -->
          <div class="mt-2" >
            <h3 class="mb-2">Select subject for the student</h3>
            <span class="bg-gray-200 hover:bg-gray-400 px-4 text-sm py-1 rounded-lg mr-1 cursor-pointer inline-block"  @click="addSubject(sub.name)" v-bind:key="sub._id"  v-for="sub in subjects">{{sub.name}}</span>
          </div>
          
          <input class="px-5 py-1 rounded bg-green-300 mt-2" type="submit" name="submit" @click="submit($event)" value="Add">
        </form>
      <!-- Students table to show current students -->
      <div class="mt-4 mb-8">

        <h2 class="mb-2 text-xl">Students</h2>
        <table class="table-fixed pt-8 text-sm">
          <thead>
            <tr>
              <th class="px-4 py-2 border border-gray-400">Name</th>
              <th class="px-4 py-2 border border-gray-400">Department</th>
              <th class="px-4 py-2 border border-gray-400">Subjects</th>
              <th class="px-4 py-2 border border-gray-400">Assign subject</th>
              <th class="px-4 py-2 border border-gray-400">Update</th>
              <th class="px-4 py-2 border border-gray-400">Remove</th>
              
            </tr>
          </thead>
          <tbody v-bind:key="student._id" v-for="student in students">
            <tr>
              <td class="px-4 py-2 border border-gray-400" >{{student.name}}</td>
              <td class="px-4 py-2 border border-gray-400" >{{student.department}}</td>
             <td class="px-4 py-2 border border-gray-400" >{{[...student.subjects].join(', ')}}</td>
             <td class="px-4 py-2 border border-gray-400">
               <!-- Select subject dropdown -->
               <select v-model="assign_subject">
                 <option value="" disabled>Select a Subject</option>
                 <option v-bind:key="sub._id" v-for="sub in subjects">{{sub.name}}</option>
               </select>
             </td>
             <td class="px-4 py-2 border border-gray-400">
               <button @click="updateStudent(student._id)" class="bg-gray-900 text-gray-100 px-2 py-1 text-xs">Update</button>
             </td>
             <td class="px-4 py-2 border border-gray-400">
               <button @click="removeStudent(student)" class="bg-red-700 text-gray-100 px-2 py-1 text-xs">Remove</button>
             </td>
              </tr>
          </tbody>
        </table>
    </div>

       
     
  </div>
</template>

<script>
  import Departments from '../../api/collections/Departments'
  import Subjects from '../../api/collections/Subjects'
  import Students from '../../api/collections/Students'
export default {
  data() {
    return {
      name,
      department: '',
      subjectsTaken: [],
      assign_subject: '' // stores subject which will be assigned to existing student
    }
  },
  meteor: {
    $subscribe: {
      'subjects': [],
      'departments': [],
      'students': []
      
    },
    subjects () {
      return Subjects.find({})
     
    },

    departments () {
      return Departments.find({})
     
    },

    students () {
      return Students.find({})
     
    },
    
  },
  methods: {

    // To remove a subject from subjectsTaken array -- only on client
    popSubj(sub) {
      this.subjectsTaken.pop(sub)
    },
    // To remove a student completely from the DB
    removeStudent(student) {
      Meteor.call('removeStudent', student._id)
      Meteor.call('decrease_total_student_on_department', student.department)
      Meteor.call('decrease_total_student_on_subjects', student._id, student.subjects)
    },

    // To update student with a new subject and update total_students count.
    updateStudent(id) {     
      Meteor.call('updateStudent', id, this.assign_subject)
      Meteor.call('updateSubject', this.assign_subject)
    },

    // To add a subject to subjectsTaken array -- only on client
     addSubject(sub) {
         this.subjectsTaken.push(sub)
     },
      
    // To add new student to the DB.
    submit(event) {
      event.preventDefault()

      // Check if the field is empty
      if (this.name === '' && this.department === '' && this.subjectsTaken === []) {
        alert('Invalid input provided')
        return
      }
      // Add new student
      Meteor.call('createStudent', this.name, this.department, this.subjectsTaken, (error) => {
        if (error) {
          alert(error.error)
        }  
        else {
          // Update total_students count in the specific department when adding new student
          Meteor.call('updateDepartment', this.department)

          // Update total_students count to each subject that were taken by the student
          for (const s of this.subjectsTaken) {
            Meteor.call('updateSubject', s)
          }
         
          this.name = ''
          this.department = '',
          this.subjectsTaken = []
          
       
          
        }
      })
      
    }
  }
}
</script>