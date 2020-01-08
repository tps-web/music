<!--  -->
<template>
<div class='content'>
    <van-nav-bar left-text="返回" title="排行版" left-arrow @click-left="onClickLeft" fixed />
    <div class="box" v-for="(item,index) in isTtracks" :key="index" @click="gourl(item.id)">
        <div ><img :src="item.coverImgUrl" alt="" class="box_img"></div>
        <div class="box_decs" >
          <div class="sing" v-for="(sing,index1) in item.tracks" :key="index1">{{index1+1}}. {{sing.first}}</div>
        </div>
    </div>
     <div class="title">推荐</div>
    <div class="tuijian">
        <div class="minbox" v-for="(item,index) in isFtracks" :key="index" @click="gourl(item.id)">
            <div class="minbox_img"><img :src="item.coverImgUrl" class="minbox_img" alt=""></div>
            <div class="minbox_decs">{{item.name}}</div>
        </div>
    </div>
</div>
</template>

<script>
import {getrank} from '@/api'
export default {
components: {},
data() {
return {
    isTtracks:[],
    isFtracks:[],
    rankList:[]
};
},
computed: {},
watch: {},
methods: {
    gourl(id){
        // console.log(id)
    this.$router.push({
        path:'/songlist',
            query: {
                    id: id
                }
     })
    },
    onClickLeft(){
       this.$router.go(-1);
    },
    async getRanking(){
        let res = await getrank()
        // console.log(res.data.list)
        this.rankList=res.data.list
        // console.log( this.rankList.length)
        var j=0;
        let arr=res.data.list
        for(let i in arr){
            if(arr[i].tracks.length==0){
                this.isFtracks.push(arr[i])
            }else{
                 this.isTtracks.push(arr[i])
            }
        }
        // console.log(this.isTtracks)
        console.log(this.isFtracks)
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.getRanking()
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
.content:first-child{
   position: relative;
   top: 46px;
}
.box{
    display: flex;
    margin: 4px;
    margin-left: 10px;
}

.sing{
    padding: 4px;
    text-align: left;
}
.box_img{
    width: 100px;
    height: 100px;
    border-radius: 4px;
}
.tuijian{
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 60px;
}
.minbox{
    width: 100px;
    margin: 2px 0;
}
.minbox_img{
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
.title{
    font-size: 16px;
    text-align: left;
    margin-left: 14px;
    margin-bottom: 5px;
    font-weight: 700;
}
.minbox_decs{
    text-align: center
}
</style>