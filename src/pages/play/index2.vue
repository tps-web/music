<template>
<div class='' v-show="currentPlay.length>0">
    <div class="bg" v-show="!fullScreen">
      <div class="bg1">
        <div class="filter"></div>
        <img :src="musicImg" alt="" width="100%" height="100%">
      </div>
    <van-nav-bar left-text="返回" :title="songName" left-arrow @click-left="onClickLeft" fixed />
    <div class="content">
      <div style="width:100%;height:50%">
            <img :src="musicImg" :class="this.audio.playing? 'zhuan':''" alt class="baImg" width="250"/>
      </div>
        <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      :src="MusicSrc"
      autoplay
    ></audio>
   
    <div class="box"> 
      <div class="time1">{{ audio.currentTime | formatSecond}}</div> 
         <van-slider v-model="sliderTime" @change="changeCurrentTime"  class="slider"/>
      <div class="time2">{{ audio.maxTime | formatSecond}}</div>
    </div>
    <div class="control">
      <div @click="changWay" class="wayBtn">
        <img v-if="audioWay==0" src="../../assets/img/danquxunhuan.png" alt="" class="way">
        <img v-if="audioWay==1" src="../../assets/img/xunhuanbofang.png" alt="" class="way">
        <img v-if="audioWay==2" src="../../assets/img/suijibofang.png" alt="" class="way">
			</div>
      <div class="playBtn">
          <img src="../../assets/img/shangyishou.png" alt="" class="conn">
              <!-- 音频播放控件 -->
          <div class="play" @click="startPlayOrPause">
              <img v-if="!this.audio.playing" src="../../assets/img/kaishi-2.png" alt="" class="conn con1">
              <img v-if="this.audio.playing" src="../../assets/img/zanting-2.png" alt="" class="conn con1">
          </div>
          <img src="../../assets/img/xiayishou.png" alt="" class="conn">
      </div>
      <div class="list">
        <img src="../../assets/img/yinleliebiao.png"  alt="">
      </div>
    </div>
    <!-- <div>
      <van-button @click="startPlayOrPause">{{audio.playing | transPlayPause}}</van-button>    
    </div> -->
    </div>
  </div>
  <!-- 小型播放器 -->
  <div class="mini-player" v-show="fullScreen">
        <div class="left">
          <img :src="musicImg" :class="this.audio.playing? 'zhuan':''" class="mini_img"  width="32"/>
        </div>
        <div class="text">
            <span class="tit">{{songName}}</span>
        </div>
         <div class="mini_playBtn" @click="startPlayOrPause">
             <van-icon  v-if="this.audio.playing" name="play-circle-o"  size="32" />
             <van-icon v-if="this.audio.playing"  name="pause-circle-o" size="32" />
          </div>
    </div>
</div>
</template>

<script>
import { getSongid, getSongDetail } from "@/api/index";
import {mapState} from 'vuex' 
import {realFormatSecond} from '@/common/filter'

export default {
  data() {
    return {
      MusicSrc: "",
    
      sliderTime: 0,
      musicImg: "",
      songName:'',
      playing:true,
			audioWay:0,	 //播放方式
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: true,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        musicid:'' //save
      }
    };
  },
    created() {
      if(!this.fullScreen){
        this.getSong();
        this.SongDetail();
      }
      console.log(this.fullScreen)
      console.log(this.playlist)

  },
  methods: {
    // saveCurrent(){
    //   console.log(this.musicid)
    //   this.$store.commit('storeCurrentSong',this.musicid)
    // },
    //改变播放方式
    changWay(){
      if(this.audioWay>1){
					this.audioWay=0
				}else{
					this.audioWay++
				}
    },
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 播放跳转
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    async SongDetail() {
      let res = await getSongDetail(this.$route.query.songid);
       console.log(res.data.songs[0].name)
       console.log(res.data.songs[0].al.picUrl)
       console.log(this.audio.playing)
      var obj={
        id:res.data.songs[0].id,
        name:res.data.songs[0].name,
        picUrl:res.data.songs[0].al.picUrl,
        playing:this.audio.playing
      } 
       this.musicid=res.data.songs[0];
      this.songName=res.data.songs[0].name
      // console.log(res.data.songs[0].al)
      // console.log(this.musicid)
      this.$store.commit('storeCurrentSong',obj)
      this.musicImg = res.data.songs[0].al.picUrl;
    },
    async getSong() {
      let res = await getSongid(this.$route.query.songid);
      // console.log(res.data);
      this.MusicSrc = res.data.data[0].url;
    },
    
    // 控制音频的播放与暂停
    startPlayOrPause() {
      // return this.audio.playing ? this.pause() : this.play();
      // console.log(this.audio.playing)
     return this.audio.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
      this.playing = this.audio.playing;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
      this.playing = this.audio.playing;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      //   console.log('timeupdate')
      //   console.log(res)
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
      //    console.log(this.sliderTime)
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      //   console.log('loadedmetadata')
      //   console.log(res)
      this.audio.maxTime = parseInt(res.target.duration);
    }
  },
  filters: {
    // // 使用组件过滤器来动态改变按钮的显示
    // transPlayPause(value) {
    //   return value ? "暂停" : "播放";
    // },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
  mounted() {
  },
  computed:{
  	 ...mapState([
        'playlist',
        'fullScreen',
        'currentPlay'
    ])
  },
   watch:{
    //  playing(newVal, oldVal){
    //    console.log(newVal)
    //  }
  }
};
</script>

<style>
.filter{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .6
}
.bg{
  width: 100%;
  height: 100%;
  position: fixed;
	top: 0;
	left: 0;
	background-position:center;
	background-repeat: no-repeat;
	background-size:cover;
}
.bg1{
  	position: fixed;
		z-index: -1;
    right: 0;
	  left: 0;
		height: 100%;
  	width: 100%;
    opacity: .6;
    filter: blur(30px);
	  background: inherit;
}
.content {
  width: 100%;
  margin-top: 50px;
  z-index: 1;
}
.baImg {
  width: 250px;
  border-radius: 50%;
  border:2px solid #fff;
  margin-top:80px;
  margin-bottom:120px;
}
.zhuan{
	 animation:circle 8s infinite linear;
}
@keyframes  circle{
	  0%{ transform:rotate(0deg); }
    100%{ transform:rotate(-360deg); }
}
.slider{
  width: 68%;
  height: 2px;
  margin: 6px auto 0;
}
.box{
  display: flex;
}
.van-slider__button{
  width: 10px;
  height: 10px;
}
.time1{
  font-size: 14px;
  margin-left: 20px;
  color: #fff;
}
.time2{
  color: #fff;
  font-size: 14px;
  margin-right: 15px
}
.control{
  display:flex;
  position: relative;
  top: 30px;
}
.list  img{
  width: 36px;
  height: 36px;
  margin-right: 18px;
  margin-top: 6px;
}
.conn{
  width: 44px;
  height: 44px;
}
.wayBtn .way{
  width: 28px;
}
.playBtn{
  display: flex;
  margin: 0 auto;
}
.way{
  margin-left: 40px;
  margin-top: 10px;
}
.con1{
  margin: 0 20px;
}
.mini-player{
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.85);
    position:fixed;
    left: 0;
    bottom: 0;
    border-top: 1px solid #e5e5e5;
}
.left{
  float: left;
  margin-left: 16px;
  margin-top: 10px;
}
.mini_img{
  border-radius: 50%;
  border: 1px solid #000;
}
.text{
  float: left;
  font-size: 14px;
  height: 60px;
  line-height: 50px;
  margin-left: 10px;
}
.mini_playBtn{
  float: right;
  margin-top:12px;
  margin-right: 40px;
}
</style>