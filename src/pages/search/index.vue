<!--  -->
<template>
<div class=''>
    <div class="back" @click="goback">
        <van-icon name="arrow-left" size="28" />
     </div>
<van-search
  v-model="wordkey"
  placeholder="请输入搜索关键词"
  show-action
  shape="round"
  @search="onSearch"
  background="red"
>
  <div slot="action" @click="onSearch">搜索</div>
</van-search>
    <div class="searchRes">
        <ul>
              <li class="box res" v-for="(item,index) in resSongs"  :key="index" @click="goPlay(item)">
                    <div class="content">
                        <div class="name">{{item.name | formatStr}}</div>
                        <div class="decs">{{item.artists[0].name}}</div>
                    </div>
                </li>
            </ul>
    </div>
        <div  v-show='isShow'>
            <div class="hotTitle">热搜榜</div>
            <div class="hot" v-for="(item,index)  in hot" :key="index">
                <ul>
                    <li class="box" @click="getname(item.searchWord)">
                        <span class="num">{{index+1}}</span>
                        <div class="content">
                            <div class="name">{{item.searchWord}}<img :src="item.iconUrl" alt="" class="icon"></div>
                            <div class="decs">{{item.content}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</div>
</template>

<script>
import {getSearchDetail,getSearchRes} from '@/api'
import {shortenStr} from '@/common/filter'
import {createSong} from '@/common/js/song'
import {mapState} from 'vuex'


export default {
components: {},
data() {
return {
    wordkey:'',
    hot:'',
    resSongs:'',
    isShow:true
};
},
computed: {
    ...mapState([
        'playlist'
    ])
},
watch: {
    wordkey(newVal,oldVal){
    //  console.log(newVal)
    }
},
methods: {
    goPlay(item){
        // console.log(item)
       console.log(this.playlist)
       var ret= createSong(item)
    //    console.log(ret.id)
       this.$store.commit('insertSong',ret)
       this.$router.push('/play')
    },
    goback(){
        this.$router.go(-1)
    },
    getname(keywords){
        // console.log(keywords)
      this.SearchRes(keywords)
    },
    onSearch(){
        let wordkey=this.wordkey
        // console.log(this.wordkey)
        if(wordkey){
           this.SearchRes(wordkey)
        } else{
            this.$toast('请输入搜索内容')
        } 
    },
    async getSearch(){
        let res =await getSearchDetail()
        // console.log(res.data.data)
        this.hot=res.data.data
    },
     async SearchRes(keywords){
        //  console.log(keywords)
       await getSearchRes(keywords)
        .then((result) => {
            // console.log(result.data.result.songs)
            this.resSongs=result.data.result.songs
            this.isShow=false
        }).catch((err) => {
            
        });
      
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.getSearch()
  this.$store.commit('set_fullScreen',false)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  
},
filters:{
     formatStr(str) {
      return shortenStr(str,26);
    }
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
    display: flex;
    width: 96%;
    height: 40px;
    font-size: 14px;
    padding: 4px;
}
.num{
    width: 10%;
    height: 40px;
    line-height: 40px;
    padding: 4px;
    color: red;
}
.content{
    width: 90%;
    text-align: left
}
.name{
    margin-top: 2px;
}
.decs{
    color: #666;
    font-size: 12px;
    margin-top: 2px;
}
.icon{
    width: 10px;
    margin-left: 6px;
}
.hotTitle{
    font-size: 12px;
    text-align: left;
    margin-left: 20px;
    padding: 4px 0;
    margin-top: 20px;
}
.back{
    width: 10%;
    float: left;
    background: red;
    height: 54px;
    line-height: 66px;
}
.res{
    margin-left: 4px;
}
</style>