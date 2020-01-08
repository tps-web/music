<template>
<div class='content'>
       <van-nav-bar
            title="歌单"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            fixed
        />
         <div class="banner">  
        <van-image
            height="280"
            :src="banner"
        />
    </div>
         <div class="recommend">
            <div class="box" v-for="(item,index) in list" :key="index" @click="selectItem(item,index)">
            <div class="index">
                {{index+1}}
            </div>
            <!-- <div class="img">
                <img :src="item.image" width='44'  alt="">
            </div> -->
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
import {getsonglist} from '@/api'
import {createSonger} from '@/common/js/song'
import {shortenStr} from '@/common/filter'
import {mapActions,mapState} from 'vuex'

export default {
components: {},
data() {
return {
    list:[],
    banner:''
};
},
computed: {
    ...mapState(['fullScreen'])
},
watch: {},
methods: {
    async getSongList(id){
    // console.log(id)
        let res= await getsonglist(id)
        // console.log(res.data.playlist.tracks)
        let arr=res.data.playlist.tracks;
        let ret = []
        arr.forEach((item) => {
            ret.push(createSonger(item))
        })
    //  console.log(ret)
        this.list=ret
        this.banner=ret[0].image
    },
    onClickLeft(){
      this.$router.go(-1);
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
     let id= this.$route.query.id
    //  console.log(id)
    this.getSongList(id)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
filters:{
     formatStr(str) {
      return shortenStr(str,18);
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
.content{
    width: 100%;
    height: 100%;
}
.box{
    width: 96%;
    display: flex;
    padding: 3px;
    height: 40px;
    border-bottom: 1px solid #e5e5e5;
}
.desc{
    width: 70%;
    text-align: left;
    margin-left: 4px;
    font-size: 14px;
    margin-top: 4px;
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
    margin-top: 46px;
}


.index{
    width: 40px;
    height: 50px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    color: #757575;
}
.recommend{
    width: 100%;
    position: absolute;
    /* margin-top: 40px; */
    margin-bottom: 64px;
}
</style>