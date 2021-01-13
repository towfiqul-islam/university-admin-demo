<template>
  <div>
    <h2 class="mb-4 text-lg font-medium">Add Department</h2>
   
   <!-- Add department form -->
        <form class="">
          <input class="bg-gray-200 border-2 border-gray-800 px-2 py-1" type="text" v-model="name" name="name" placeholder="Department Name" required>
          
          <input class="px-4 py-1 block mt-2 rounded bg-green-300" type="submit" name="submit" @click="submit($event)" value="Add">
        </form>
<!-- Department table to show current departments -->
    <div class="mt-4 mb-8">

        <h2 class="mb-2 text-xl">Departments</h2>
        <table class="table-fixed pt-8 text-sm">
          <thead>
            <tr>
              <th class="px-4 py-2 border border-gray-400">Name</th>
              <th class="px-4 py-2 border border-gray-400">Total students</th>
              
            </tr>
          </thead>
          <tbody v-bind:key="d._id" v-for="d in departments">
            <tr>
              <td class="px-4 py-2 border border-gray-400" >{{d.name}}</td>
              <td class="px-4 py-2 border border-gray-400" >{{d.total_students}}</td>
            
              </tr>
          </tbody>
        </table>
    </div>

     
  </div>
</template>

<script>
  import Departments from '../../api/collections/Departments'
export default {
  data() {
    return {
      name,
      total_students: 0
      
    }
  },
  meteor: {
    $subscribe: {
      'departments': [],
      
    },
    departments () {
      return Departments.find({})
     
    },
    
  },
  methods: {
    // method for adding new department
    submit(event) {
      event.preventDefault()
      // check if field is empty
      if (this.name === '') {
        alert('Department name cannot be empty')
        return
      }
      // Add new department
      Meteor.call('createDepartment', this.name, this.total_students,  (error) => {
        if (error) {
          alert(error.error)
        }  
        else {
          // empty input field after adding a department
          this.name = ''
          
          
        }
      })
    }
  },
}
</script>