<!--  -->
<template>
<div class=''>
     <van-nav-bar
            title="歌手"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            fixed 
            class="bar"
        />
    <div class="banner">  
        <van-image
            height="300"
            src="https://p2.music.126.net/Xl0WENt4F6wsgjjjQWuQsw==/109951164232034479.jpg"
        />
    </div>
    <div class="singer">
        <div class="singer_box" v-for="(item,index) in singerList" :key="index" @click="go(item.id)">
            <div class="mun">{{index+1}}</div>
            <img :src="item.picUrl" alt="" class="sing_img">
            <div class="name">{{item.name}}</div>
        </div>
    </div>
</div>
</template>

<script>
import {singer} from '@/api';
export default {
components: {},
data() {
return {
    singerList:[]
};
},
computed: {},
watch: {},
methods: {
    onClickLeft(){
        this.$router.go(-1)
    },
    async getsinger(){
        let res= await singer()
        console.log(res.data.artists)
        this.singerList=res.data.artists
    },
    go(id){
        this.$router.push({
            path:'singerSong',
             query: {
                 id: id
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.getsinger()
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
@import url(./index.css);
</style>