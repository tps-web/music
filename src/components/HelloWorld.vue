<template>
  <div >
    <div class="top">
       <div class="imgLeft"  @click="showPopup"> <img src="../assets/img/list.png" width='32'  alt=""></div>
    <!-- 个人资料     -->
<van-popup
  v-model="show"
  position="left"
  :style="{ width: '70%',height: '100%' }"
>
  <van-image
  round
  width="44px"
  height="44px"
  v-if="isShow"
  :src="userinfo.avatarUrl" class="touxiang"
/>
  <div class="login"  v-if="!isShow">
      <van-button type="primary" size="mini" @click="gourl('/login')">登录</van-button>
  </div>
  <div class="username"  v-if="isShow">{{userinfo.name}}</div>
  <div class="control">
<van-cell title="个人资料"  url=""  class="btn" @click="profile"/>
<van-cell title="退出"  v-if="isShow" url=""  class="btn" @click="exit"/>

  </div>
</van-popup>

       <van-tabs v-model="active">
    <van-tab title="发现">
      <!-- 轮播图 -->
      <div class="swipeBox">
          <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item,index) in banner" :key="index">
                <img :src="item.pic" alt="" class="bannerImg">
              </van-swipe-item>
          </van-swipe>
      </div>
    <!-- 推荐 -->
    <div class="recommend">
        <div class="box" @click="gourl('/recommend')">
            <div class="yuan">
                <img src="../assets/icon1.png" alt="" width="44" class="icon" >
            </div>
            <span class="tit">每日推荐</span>
        </div>
        <div class="box"  @click="gourl('/singer')">
            <div class="yuan">
                <img src="../assets/icon1.png" alt="" width="44" class="icon" >
            </div>
            <span class="tit">热门歌手</span>
        </div>
        <div class="box">
            <div class="yuan"   @click="gourl('/rank')">
             <img src="../assets/icon1.png" alt="" width="44" class="icon" >
            </div>
            <span class="tit">排行版</span>
        </div>
        <div class="box"  @click="gourl('/radio')">
            <div class="yuan">
               <img src="../assets/icon1.png" alt="" width="44" class="icon" >
            </div>
           <span class="tit">电台</span>
        </div>
    </div>
    <!-- 歌单 -->
    <div class="playlist">
        <div class="title">推荐歌单</div>
        <div class="play_box">
           <div class="playlist_box" v-for="(item,index) in playlist" :key="index" @click="goplay(item.id)">
              <img :src="item.picUrl" alt="" class="play_img">
              <div class="decs">{{item.name | formatStr}}</div>
           </div>
        </div>
    </div>
    <!-- 精选歌单 -->
    <div class="choiceness">
        <div class="title">精选歌单</div>
        <div class="play_box">
           <div class="playlist_box" v-for="(item,index) in list" :key="index" @click="goplay(item.id)">
              <img :src="item.picUrl" alt="" class="play_img">
              <div class="decs">{{item.name | formatStr}}</div>
           </div>
        </div>
    </div>
    
  </van-tab>
  <van-tab title="我的">
    <van-collapse v-model="activeNames2" class="btn" v-if="isShow">
        <van-collapse-item title="最近播放" name="1">
          <div  v-if="record.length>0"  >
              <div class="recordplay" v-for="(item,index) in record" :key="index" @click="gotoplay(item)">
                  <div class="recordplay_name">{{item.name}}</div>
                  <div class="recordplay_name">{{item.singer}}</div>
              </div>
          </div>
          <div v-else>
            暂无播放
          </div>
      
        </van-collapse-item>
     </van-collapse>
    <!-- 我的收藏 -->
    <van-collapse v-model="activeNames1" class="btn" v-if="isShow">
        <van-collapse-item title="我的收藏" name="1">
        我的收藏
        </van-collapse-item>
     </van-collapse>
     <!-- 我的歌单 -->
     <van-collapse v-model="activeNames" class="btn" v-if="isShow">
        <van-collapse-item title="我的歌单" name="1">
          <div class="like"  v-for="(item,index) in usersongs" :key="index" @click="gosongs(item.id)">
            <img :src="item.coverImgUrl" alt="" width="44" class="like_img">
            <div class="like_decs">
                <div class="like_name">{{item.name}}</div>
                <div class="num">{{item.trackCount}}首</div>
            </div>
          </div>
        </van-collapse-item>
     </van-collapse>
  </van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
</van-tabs>
       <div class="imgRight"> <img src="../assets/img/search.png" width='32'  alt="" @click="gourl('/search')"></div>
    </div>
   
  

  </div>
</template> 

<script>
import {banner,getrecommend,personalized,getusersongs} from '@/api'
import {shortenStr} from '@/common/filter'
import {mapState} from 'vuex'
import {createUser} from '@/common/js/user'

export default {
  name: 'HelloWorld',
  data () {
    return {
       active: 0,
       banner:'',
       show: false,
       userinfo:'',
       userId:'',
       isShow:false,
       playlist:[],
       list:[],
       activeNames: [],
       usersongs:[],
       activeNames1:[],
       activeNames2:[]
    }
  },
  components:{
    
  },
  computed:{
    ...mapState(['userInfo','record'])
  },
 methods:{
   gotoplay(res){
     console.log(res)
      this.$store.commit('insertSong',res)
      this.$router.push('/play')
   },
   gosongs(id){
     console.log(id)
     this.$router.push({
       path:'/songlist',
       query:{
         id
       }
     })
   },
   //我的歌单
   async getusersongs(id){
      let res=await getusersongs(id);
      // console.log(res.data.playlist)
      this.usersongs=res.data.playlist
      this.$store.commit('set_userplaylist',this.usersongs[0].trackCount)
   },

   //每日歌单
   async recommendDay(){
     let res=await getrecommend()
     let arr =res.data.recommend
     for(var i =0;i<6;i++){
          this.playlist.push(arr[i])
     }
    //  console.log(this.playlist)
   },
   //精选歌单
   async choicenesslist(){
      let res=await personalized()
      let arr=res.data.result
      // console.log(arr)
       for(var i =0;i<6;i++){
          this.list.push(arr[i])
     }
   },
   profile(){
     if(this.userInfo){
       this.$router.push('/profile')
     }else{
        this.$toast('您还未登录！请先登录');
     }
   },
   exit(){
    //  console.log(this.userInfo)
    this.$store.commit('storeUserInfo','')
    // this.$router.go(0)
    this.isShow=false
   },
    showPopup() {
      this.show = true;
    },
    async getBanner(){
    //  console.log(this.loginInfo)
    let res = await banner()
    console.log(res.data)
    this.banner=res.data.banners
   },
   gourl(url){
    this.$router.push(url)
   },
   goplay(id){
    //  console.log(id)
     this.$router.push({
       path:'/songlist',
        query: {
                id: id
              }
     })
   }
 },
 created() {
    this.$store.commit('set_fullScreen',false)
   this.getBanner()
   this.recommendDay()
   if(this.userInfo){
     this.isShow=true
      let ret={};
      ret=createUser(this.userInfo)
      this.userinfo=ret
      this.userId=this.userInfo.data.account.id
      this.getusersongs(this.userId)
   }
   this.choicenesslist()
  //  console.log(this.userInfo.data.account.id)

 },
 filters:{
     formatStr(str) {
      return shortenStr(str,20);
    },
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url(./index.css);

</style>
