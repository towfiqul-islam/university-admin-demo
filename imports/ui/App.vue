<template>
  <div >
    <h1 class='text-xl text-center text-green-400  bg-gray-900 py-4 mb-4'>University Admin</h1>
    
    <div class="w-full flex flex-wrap justify-center gap-12 m-auto"> 
      <Department />
      <Subject />
      <Student />
    </div>
  </div>
</template>

<script>

import Department from './components/Department.vue'
import Subject from './components/Subject.vue'
import Student from './components/Student.vue'


export default {
  components: {
   
    Department,
    Subject,
    Student
  },
}
</script>


