<template>
  <div id="#app">
    <!-- 左侧导航区域 -->
     <LeftNav></LeftNav>
     <!-- 右侧内容区域 -->
      <div id="main">
        <router-view/>
      </div>
  </div>
 
</template>

<script>
import LeftNav from '@/components/common/LeftNav'
export default {
  name: 'app',
  components:{
    LeftNav
  }
}
</script>

<style>

#app{
  height:100%;
  width:100%;
  color: #2c3e50;
  text-align:center;
}
#main{
  width:95%;
  float: left;
  background: #EFF2F7;
  overflow:auto;
}
</style>
