<template>
  <div>
    <h2>Add New Student</h2>
   
        <form class="">
          <input class="bg-gray-200 border-2 border-gray-800 px-2 py-1" type="text" v-model="name" name="name" placeholder="Student Name" required>
          
         
          <select class="border-2 border-gray-800 bg-gray-200 px-2 py-1" v-model='department'>
              <option value="" disabled>Select a department</option>
              <option v-bind:key="d._id" v-for="d in departments">{{d.name}}</option>
          </select>
          

          <div class="inline-block" v-if="this.subjectsTaken.length > 0">
            <div @click="popSubj(s)" class="bg-gray-900 text-gray-100 px-1 py-1 inline-block mr-1 cursor-pointer" v-bind:key='s' v-for="s in this.subjectsTaken">{{s}}</div>
          </div>
          
         
          <div class="mt-2" >
            <h3 class="mb-2">Select subject for the student</h3>
            <span class="bg-gray-200 hover:bg-gray-400 px-4 text-sm py-1 rounded-lg mr-1 cursor-pointer inline-block"  @click="addSubject(sub.name)" v-bind:key="sub._id"  v-for="sub in subjects">{{sub.name}}</span>
            </div>
          
          <input class="px-5 py-1 rounded bg-green-300 mt-2" type="submit" name="submit" @click="submit($event)" value="Add">
        </form>

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
      assign_subject: ''
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

    popSubj(sub) {
      this.subjectsTaken.pop(sub)
    },

    removeStudent(student) {
      Meteor.call('removeStudent', student._id)
      Meteor.call('decrease_total_student_on_department', student.department)
      Meteor.call('decrease_total_student_on_subjects', student._id, student.subjects)
    },

    updateStudent(id) {
      
      Meteor.call('updateStudent', id, this.assign_subject)
      Meteor.call('updateSubject', this.assign_subject)
    },

     addSubject(sub) {
         this.subjectsTaken.push(sub)
     },
      
    submit(event) {
      event.preventDefault()
      if (this.name === '' && this.department === '' && this.subjectsTaken === []) {
        alert('Invalid input provided')
        return
      }
      
      Meteor.call('createStudent', this.name, this.department, this.subjectsTaken, (error) => {
        if (error) {
          alert(error.error)
        }  
        else {

          Meteor.call('updateDepartment', this.department)
          for (const s of this.subjectsTaken) {
            Meteor.call('updateSubject', s)
          }
         
          this.name = ''
          this.department = '',
          this.subjectsTaken = []
          // alert('Student Added Successfully!!')
       
          
        }
      })
      
    }
  }
}
</script>