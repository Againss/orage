<template>
<div>
  <el-tag type="danger">{{$store.state.count}}</el-tag>
  <el-button @click='add'>+1</el-button>
</div>
</template>
<script>
 export default {
   data: ()=>({
   }),
   methods:{
     add(){
       this.$store.commit('increment')
     }
   },
   components: {
   }
 }
</script>
<style lang="less" scoped>
</style>