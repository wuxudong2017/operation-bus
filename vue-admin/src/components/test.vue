<template>
  <div class="layout">
    测试页面 项目开发使用




  </div>
</template>

<script>
import {MessageBox} from 'element-ui'
export default {
  data(){
    return {

    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
     MessageBox({
       type:'warning',
       title:'提示',
       message:'错误提示信息',
     }).then(_=>{
       console.log('sure')
     }).catch(_=>{
       console.log('err')
     })
    }
  }
}
</script>

<style>

</style>
