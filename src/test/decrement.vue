<template>
<div>
  <el-tag type="danger">{{$store.state.count}}</el-tag>
  <el-button @click='decrement'>-1</el-button>
  <router-view></router-view>
</div>
</template>
<script>
import {mapMutations} from 'vuex'
 export default {
   data: ()=>({
   }),
   methods:{
     ...mapMutations([
       'decrement'
     ])
   },
   components: {
   }
 }
</script>
<style lang="less" scoped>
</style>