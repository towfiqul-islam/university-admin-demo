<template>
  <div>
    <h2 class="mb-4 text-lg font-medium">Add Subject</h2>
    <!-- Add new subject form -->
        <form class="">
          <input class="bg-gray-200 border-2 border-gray-800 px-2 py-1" type="text" v-model="name" name="name" placeholder="Subject Name" required>
      <!-- Selected departments from the chip -->
          <div class="inline-block" v-if="this.department.length > 0">
            <div @click="popDept(d)" class="bg-gray-900 text-gray-100 px-1 py-1 inline-block mr-1 cursor-pointer" v-bind:key='d' v-for="d in this.department">{{d}}</div>
          </div>
          
         <!-- Chip element to choose department -->
          <div class="mt-2" >
            <h3 class="mb-2">Select department that belongs to the subject</h3>
            <span class="bg-gray-200 hover:bg-gray-400 px-4 text-sm py-1 rounded-lg mr-1 cursor-pointer inline-block"  @click="addDepartment(d.name)" v-bind:key="d._id"  v-for="d in departments">{{d.name}}</span>
          </div>
          
          <input class="px-5 py-1 bg-green-300  mt-2 rounded" type="submit" name="submit" @click="submit($event)" value="Add">
        </form>
  <!-- Subjects table to show current subjects available -->
    <div class="mt-4 mb-8">

        <h2 class="mb-2 text-xl">Subjects</h2>
        <table class="table-fixed pt-8 text-sm">
          <thead>
            <tr>
              <th class="px-4 py-2 border border-gray-400">Name</th>
              <th class="px-4 py-2 border border-gray-400">Offered by</th>
              <th class="px-4 py-2 border border-gray-400">Total students</th>
              
            </tr>
          </thead>
          <tbody v-bind:key="sub._id" v-for="sub in subjects">
            <tr>
              <td class="px-4 py-2 border border-gray-400" >{{sub.name}}</td>
              <td class="px-4 py-2 border border-gray-400" >{{[...sub.department].join(', ')}}</td>
             <td class="px-4 py-2 border border-gray-400" >{{sub.total_students}}</td>
              </tr>
          </tbody>
        </table>
    </div>
     
  </div>
</template>

<script>
  import Departments from '../../api/collections/Departments'
  import Subjects from '../../api/collections/Subjects'
export default {
  data() {
    return {
      name,
      department: [],
      total_students: 0
    }
  },
  meteor: {
    $subscribe: {
      'subjects': [],
      'departments': []
      
    },
    subjects () {
      return Subjects.find({})
     
    },

    departments () {
      return Departments.find({})
     
    },
    
  },
  methods: {
    // To remove a department from departments array -- only on client
    popDept(dept) {
      this.department.pop(dept)
    },
    // To add a department to departments array -- only on client
    addDepartment(name) {
      this.department.push(name)
    },
    // To add new department to the DB.
    submit(event) {
      event.preventDefault()

      // Check if the field is empty
      if (this.name === '' && this.department === []) {
        alert('Invalid input provided')
        return
      }
      
      // Add new subject
      Meteor.call('createSubject', this.name, this.department, this.total_students, (error) => {
        if (error) {
          alert(error.error)
        }  
        else {
         
          this.name = ''
          this.department = []
          
       
          
        }
      })
      
    }
  },
}
</script>