<!--  -->
<template>
<div class=''>{{list}}  1321</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {recommend} from '@/api/index'

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {    
    list:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  async getDailySongs(){
    //  console.log(this.loginInfo)
    let data = await recommend()
    console.log(data)
    this.list=data
   },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getDailySongs()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  
},

}
</script>
<style scoped>
</style>