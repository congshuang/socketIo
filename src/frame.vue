<template>
  <div class="frame">
    <div class="login" v-if="isShow">
      <div class="welcome"><img src="../static/img/images/welcome.png"></div>
      <div class="login-form">
        <div class="login-inp"><label>窗口名</label><input type="text" placeholder="" name="name" v-model="name"></div>
        <div class="login-inp"><label>窗口号</label><input type="password" placeholder="" name="pass" v-model="password"></div>
        <div class="login-inp"><label>UID</label><input type="password" placeholder="" name="pass" v-model="uid"></div>
        <div class="login-inp"><a href="#" id="login" @click="isShow = false">立即登录</a></div>
      </div>
    </div>
    <div v-if="!isShow" class="frame">
      <div class="title" >
        <div class="circle">{{password}}</div>
        {{name}}
      </div>
      <div class="subtitle">
        {{content}}
      </div>

      <div class="footer">
        <img src="../static/img/images/serve.png" alt="" style="width: 3rem;height: 3rem">
        <span>常熟市政务服务中心</span>
      </div>
    </div>
  </div>

</template>

<script>
  import Stomp from 'stompjs'

  export default{
      name:'frame',
      data(){
        return{
          isShow:true,
          name:"",
          password:"",
          uid:"",
          content:'',
          client:{},
          websock:{},
          wsuri:"ws://127.0.0.1:8223/socket/wisely"
        }
      },
    methods:{
      initWebSocket(){
        this.websock = new WebSocket(this.wsuri);
        this.client = Stomp.over(this.websock);
        this.client.connect({},this.responseCallback, this.onFailed);
      },
      responseCallback(frame){
        let that = this;
        this.client.subscribe('/topic/spread',function (res) {
          var data = JSON.parse(res.body);
          if(!that.isShow){
            if(that.uid == data.sID){
              that.content = data.sText;
            }
          }

        });


      },
      onFailed(frame) {
        console.log('Failed: ' + frame)
      },
    },
    mounted(){

      this.initWebSocket();
    },
  }
</script>
<style>
  html,body,div,p,form,label,ul,li,dl,dt,dd,ol,img,button,b,em,strong,small,h1,h2,h3,h4,h5,h6{margin:0;padding:0;border:0;list-style:none;font-style:normal;}
  body{font-family:SimHei,'Helvetica Neue',Arial,'Droid Sans',sans-serif;font-size:14px;color:#333; background: #000;
    background-size: cover;
    position: fixed;
    z-index: -10;
  width: 100%;}
  a, a.link{color:#666;text-decoration:none;font-weight:500;}
  a, a.link:hover{color:#666;}
  h1,h2,h3,h4,h5,h6{font-weight: normal;}

  .login{width:100%;height:100%;}
  .welcome{width:100%;margin:5% 0;}
  .welcome img{width:100%;}
  .login-inp{margin: 0 10% 30px 10%;border:1px solid #fff;border-radius:25px;}
  .login-inp label{width:4em;text-align:center;display:inline-block;color:#fff;font-size: 25px;}
  .login-inp input{line-height: 45px;color: #fff;background-color: transparent;border: none;outline: none;font-size: 25px;width: 80%}
  .login-inp a{display:block;width:100%;text-align:center;line-height:60px;color:#fff;font-size:27px;letter-spacing:5px;}
  .login-txt{text-align:center;color:#fff;}
  .login-txt a{color:#fff;padding:0 5px;}
  .title{width:100%;margin:8% 0;text-align: center;color: #fff;font-size: 7rem;letter-spacing: 10px;height: 10%}
  .circle{border:.5rem solid #fe5b02;border-radius: 50%;font-size: 6rem;color:#fe5b02;width: 7rem;height: 7rem;line-height: 7rem;  display: inline-block;}
  .subtitle{width:100%;padding-bottom:7%;text-align: center;color: #fff;font-size: 5rem;letter-spacing: 6px;border-bottom: .5rem solid #fff;box-sizing: content-box;height: 10%}
  .footer{width:100%;text-align: center;color: #fff;font-size: 3rem;letter-spacing: 3px;box-sizing: content-box;line-height: 3rem;padding-top: 2rem;height: 30%}

  .frame{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

</style>
