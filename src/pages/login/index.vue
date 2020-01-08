<template>
  <div class="hello">
    
        <img src="../../assets/logo.jpg" alt="" width="100" class="icon">
 
      <div class="box">
          <van-field
          v-model="loginInfo.phone"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('请输入用户名')"
        />

        <van-field
          v-model="loginInfo.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
        <van-button type="primary" size="large" @click="phoneLoginClick">登录</van-button>
      </div>

  </div>
</template>

<script>
import {loginRequest} from '@/api/index'
import { mapMutations } from "vuex";

export default {
  name: 'HelloWorld',
  data () {
    return {
      loginInfo:{
        phone:'',
        password:''
      },
    }
  },
 methods:{
    async phoneLoginClick(){
      if(this.loginInfo.name==''||this.loginInfo.password==''){
          this.$toast('请输入用户名或密码')
      }else{
      //  console.log(this.loginInfo)
        let res = await loginRequest(this.loginInfo)
        console.log(res.data)
        if(res.data.code==502){
             this.$toast('请输入用户名或密码')
        }else if(res.data.code==501){
            this.$toast('帐号不存在')
        }else{
          this.storeUserInfo(res);
          this.$router.push('/')
        }
       
      }
   
   
   },
  ...mapMutations(["storeUserInfo"]),
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  position: relative;
  top: 110px;
  width: 80%;
  height: 140px;
  margin: 0 auto;
}
/* .van-button--large{
  height: 30px !important;
  width: 90%;
} */
.icon{
  position: relative;
  top: 100px;
}
</style>
