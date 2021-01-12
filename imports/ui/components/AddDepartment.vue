<template>
  <div>
    <h2>Add New Department</h2>
   
        <form class="">
          <input class="bg-gray-200 border-2 border-gray-800 px-2 py-1" type="text" v-model="name" name="name" placeholder="Department Name" required>
          
          <input class="px-4 py-1 rounded bg-green-300" type="submit" name="submit" @click="submit($event)" value="Add">
        </form>

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
    submit(event) {
      event.preventDefault()
      if (this.name === '') {
        alert('Department name cannot be empty')
        return
      }
      Meteor.call('createDepartment', this.name, this.total_students,  (error) => {
        if (error) {
          alert(error.error)
        }  
        else {

          this.name = ''
          // alert('Department Added Successfully!!')
          
        }
      })
    }
  },
}
</script>