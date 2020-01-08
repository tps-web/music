<!--  -->
<template>
<div class=''>
       <van-nav-bar left-text="返回" title="电台" left-arrow @click-left="onClickLeft" fixed />
     <!-- 轮播图 -->
      <div class="swipeBox">
          <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item,index) in djBannerList" :key="index">
                <img :src="item.pic" alt="" class="bannerImg">
              </van-swipe-item>
          </van-swipe>
      </div>
</div>
</template>

<script>
import {getdjBanner} from '@/api';
export default {
components: {},
data() {
return {
    djBannerList:''
};
},
computed: {},
watch: {},
methods: {
    onClickLeft(){
         this.$router.go(-1)
    },
    async djBanner(){
        let res=await getdjBanner()
        console.log(res)
        this.djBannerList=res.data.data
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.djBanner()
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.swipeBox{
    width: 100%;
    margin-top: 50px;
}
.bannerImg {
    width: 96%;
    height: 100%;
    padding: 1%;
    border-radius: 10px;
}
</style>