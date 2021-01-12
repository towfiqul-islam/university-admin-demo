<template>
  <div >
    <h1 class='text-xl text-center text-green-400  bg-gray-900 py-4 mb-4'>University Admin</h1>
    
   <div class="w-3/4 m-auto"> <AddDepartment />
    <AddSubject />
    <AddStudent /></div>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Info from './components/Info.vue'
import AddDepartment from './components/AddDepartment.vue'
import AddSubject from './components/AddSubject.vue'
import AddStudent from './components/AddStudent.vue'


export default {
  components: {
   
    AddDepartment,
    AddSubject,
    AddStudent
  },
}
</script>


