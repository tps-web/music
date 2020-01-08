<!--  -->
<template>
<div class='content'>
       <van-nav-bar left-text="返回" title="个人资料" left-arrow @click-left="onClickLeft" fixed />
       <div class="top">
           <div class="bgImg">
               <img :src="user.profile.backgroundUrl" alt="" class="Img">
           </div>
           <div class="avatarImg">
               <img :src="user.profile.avatarUrl" alt="" class="avatar">
               <div class="username"> {{user.profile.nickname}}</div>
               <div class="num">关注 {{user.profile.follows}} | 粉丝  {{user.profile.followeds}} </div>
               <div class="level"> lv.{{user.level}}</div>
           </div>
       </div>
         <div class="message">
             <div class="title">基本信息</div>
             <div class="sex">性别：{{user.profile.gender|sex}}</div>
             <div class="age">村龄：{{toage}} ({{user.profile.createTime | createTime}}注册)</div>
             <!-- <div class="area">{{user.profile.city}}</div> -->
             <div class="birthday">生日：{{user.profile.birthday|createTime}}</div>
             <!-- <div class="listenSongs"> </div> -->
             <div class="listenSongs"> 
                 <img src="../../assets/logo.jpg" alt="" class="listenSongsImg">
                 <div class="box">
                     <div>听歌排行</div>
                 <div class="listenSongsNum"> 累计听歌 {{user.listenSongs}} 首</div>
                 </div>
             </div>
             <div class="listenSongs"> 
                 <img src="../../assets/logo.jpg" alt="" class="listenSongsImg">
                 <div class="box">
                     <div>我喜欢的音乐</div>
                 <div class="listenSongsNum"> 累计 {{userplaylist}} 首</div>
                 </div>
             </div>
         </div>
</div>
</template>

<script>
import {getuserdetail} from '@/api';
import {mapState} from 'vuex' 

import {dateformat,getDiffDays} from '@/common/js/time.js'

export default {
components: {},
data() {
return {
    user:[],
    bgImg:''
};
},
computed: {
    ...mapState([
        'userInfo',
        'userplaylist'
    ]),
    toage:function(){
        var time = dateformat(this.user.profile.createTime)
        console.log(time)
         var oDate1 = new Date();
         var oDate2 = new Date(time);
            //   console.log(oDate1)
            //   console.log(oDate2)
         return getDiffDays(oDate1,oDate2)
    }
},
watch: {},
methods: {
onClickLeft(){
    this.$router.go(-1)
},
 async getuser(){
     console.log(this.userInfo.data.account.id)
     let id=this.userInfo.data.account.id
     let res= await getuserdetail(id)
    //  console.log(res.data)
     this.user=res.data
     
 }
},
filters:{
    sex(num){
        return num==0 ? '女': '男'
    },
    createTime(time){
        // console.log(time)
        return dateformat(time)
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getuser()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
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
.content{
    font-size: 14px;
}
.top{
    position: relative;
    top: 0;
    left: 0;
}
.Img{
    width: 100%;
    height: 280px;
    /* filter: blur(4px); */
}
.avatarImg{
    position:absolute;
    top: 40%;
    left: 6%;
    color: #fff;
}
.avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.username{
    font-weight: 700;
}
.message{
    text-align: left;
    padding-left: 10px;
    margin-top: 10px;
}
.title{
    font-size: 16px;
    text-align: left;
    font-weight: 700;
    margin-bottom: 4px;
}
.listenSongs{
    display: flex;
    margin-top: 20px;
}
.listenSongsImg{
    width: 44px;
    height: 44px;
}
.box{
    font-size: 12px;
    margin-left: 4px;
    margin-top: 2px;
}
.listenSongsNum{
    margin-top: 5px;
    color: #666
}
</style>