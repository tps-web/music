<template>
  <div id="app">
    <router-view  />
    <play/>
  </div>
</template>

<script>
import play from '@/pages/play/index'
import {mapState} from 'vuex' 
export default {
  name: 'App',
  components:{
    play
  },
  created() {
    // console.log(this.fullScreen)
  },
  computed:{
    ...mapState([
      'fullScreen',
      'showTime',
        'music',
    ])
  },
  watch:{
    // showTime(newVal, oldVal){
    //   console.log(newVal)
    // }
  }
}
</script>
 
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
body {
  background-color: #fbf9fe;
}
.van-tabs__wrap {
  display: inline-block;
  width: 65%;
 margin-left: -40px;
}
.van-slider__button{
  width: 10px !important;
  height: 10px !important;
}
.van-tabs--line{
  margin: 0 auto;
}
html{
  height: 100%;
}
body{
  height: 100%;
}

</style>
