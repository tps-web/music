<!--  -->
<template>
<div class=''>
        <van-nav-bar
            title="每日推荐"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            fixed
        />
    <div class="banner">  
        <div class="date">
            <span class="month">{{currentMonth}}/</span>
            <span class="day">{{currentDate}}</span>
            </div>
        <van-image
            height="280"
            :src="banner"
        />
    </div>
    <div class="recommend">
        <div class="box" v-for="(item,index) in list" :key="index" @click="selectItem(item,index)">
            <div class="index">
                {{index}}
            </div>
            <div class="img">
                <img :src="item.image" width='44'  alt="">
            </div>
            <div class="desc">
                <div class="title">{{item.name |formatStr}}</div>
                <div class="name">{{item.singer}}</div>
            </div>
            <div class="right">
                <img src="../../assets/img/play.png" width='30' alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {recommend} from '@/api/index'
import {shortenStr} from '@/common/filter'
import {createSong} from '@/common/js/song'
import {mapActions,mapState} from 'vuex'

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    list:'',
    banner:'',
    currentMonth:'',
    currentDate:''
};
},
//监听属性 类似于data概念
computed: {
    ...mapState(['fullScreen'])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
async getDailySongs(){
    //  console.log(this.loginInfo)
    let res = await recommend()
    // console.log(res.data.recommend)
    let arr=res.data.recommend
    // console.log(typeof arr)
     let ret = []
      arr.forEach((item) => {
      //console.log(item)
    //   createSong(item)
    //   console.log(createSong(item))
        ret.push(createSong(item))
      })
      this.list = ret
    // console.log(this.list)
    //this.list=res.data.recommend;
    this.banner=res.data.recommend[0].album.picUrl
   },
   onClickLeft(){
      this.$router.go(-1);
   },
   addDate() {
        const nowDate = new Date();
        let date = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth() + 1,
            date: nowDate.getDate(),
        }
        // console.log(date);
        this.currentMonth= date.month;
        this.currentDate =date.date;
    },
    goPlay(songid){
        // this.$router.push({
        //   path: `/play/${songid}`,
        // })
        this.$router.push({
            path: `/play`,
            query: {
                        songid: songid
                    }
        })
    },
     ...mapActions([
      'selectPlay'
    ]),
    selectItem(item,index){
        // console.log(item)
        // console.log(index)
        // this.$store.dispatch('selectPlay')
        this.selectPlay({  
            list: this.list,
            index
            })
        this.$router.push('/play')
    },
   
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getDailySongs();
    this.$store.commit('set_fullScreen',false)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
       this.addDate()
},
filters:{
     formatStr(str) {
      return shortenStr(str);
    },
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
.box{
    width: 96%;
    display: flex;
    padding: 6px;
    height: 40px;
    border-bottom: 1px solid #e5e5e5;
}
.desc{
    width: 70%;
    text-align: left;
    margin-left: 4px;
    font-size: 14px;
}

.img img{
    border-radius: 10px;
}
.name{
    margin-top: 4px;
    display: block;
    font-size: 10px;
}
.right{
    float: right;
    margin-top: 10px;
}
.banner{
    position: relative;
}
.banner img{
  height: 350px;
  margin-top: 30px;
}
.date{
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    z-index: 999;
    font-size: 32px;
}
.day{
    font-size: 24px;
    margin-left: -10px;
}
.index{
    width: 40px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    color: #757575;
}
</style>