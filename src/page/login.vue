<template>
  <div class="xmapp">
    <!--<div class="title">{{changlan['login']['dl']}}</div>-->
    	<navigBar :ShowUsericon="false" :titleText="changlan['login']['dl']"></navigBar>
    <div id="scrollboxjc" :class="iskeyBoard?'top31':'top0'"> 
	    <!-- <button class="chanlangesbtn" @click="poslangtype"><img class="img-en" :src="langicon" alt="" />{{changlan['login']['lang']}}</button> -->
	    <!--<img class="logo" src="../assets/img/login/logo.png" alt="北极熊猫" />-->
	    <img class="logo" src="../../build/logo.png" />
	    <div class="loginform">
	    	<form class="mui-input-group">
			    <div class="mui-input-row user">
			         <label> <i class="iconfont icon-zhanghu" style="font-size:26px;"></i></label>
			   			 <input type="text" v-model="user" :placeholder="changlan['login']['usetip']">
			    </div>
			    <div class="mui-input-row psw">
			        <label><i class="iconfont icon-mima" style="font-size:26px;"></i></label>
			        <input :type="ishowpsw?'password':'text'" v-model="psw"  value="" @blur="inonbure"  :placeholder="changlan['login']['pswtip']">
			        <span :class="ishowpsw?'iconfont icon-kejian-copy-copy eirsicon':'iconfont icon-kejian-copy-copy eirsicon ative'" @click="eysslect"></span>
			    </div>
			    <div class="fogetpsw">
			    		<span class="mui-pull-right regit"><router-link :to="'registe'">注册</router-link></span>
			    		<span class="mui-pull-right"><router-link :to="'pswforget'">忘记密码?</router-link></span>
			    </div>
			    <div class="">
			        <button type="button" class="mui-btn mui-btn-primary" @click="getlogin">{{changlan['login']['dl']}}</button>
			    </div>
			</form>
	    </div>
	   </div>
  </div>
</template>

<script>
import navigBar from '@/components/navigBar';//标题组件
import cnicon from '../assets/img/login/cn.png';
import ruicon from '../assets/img/login/ru.png';
import {connetAction,regPhone} from "../utils/index.js"
import https from "../utils/Https.js"
import {mapMutations} from 'vuex';
export default {
  data () {
    return {
       msg: '你好，index',
       langicon:cnicon,
       langdata:"",
       lan_statue:1,//语言缓存
       types:true,
			 user:"",
			 psw:"",
			 iskeyBoard:false,
			 ishowpsw:true,
			 cid:0
    }
  },
  computed:{
  	changlan(){
  		return this.$store.state.langetype
  	},
  	lginStatus(){
  		return this.$store.state.loginState
  	}
  },
  props:[],
  methods: {
  	...mapMutations(['isLogin']),
		SignJump(data){
			var that = this;
			// var url = that.$BaseUrll+"login/login";
			try{
				var wt = plus.nativeUI.showWaiting();
			}catch(e){
			// 	
			}
			connetAction.ajaxPost(https['login'],data)
			.then(rd=>{
				console.log(rd)
				if(rd.status!=0){
					// message(that,{contxt:rd.message})
					///setKey('sessionid',rd.data);
					localStorage.openid = rd.data;
					mui.toast(rd.message)
					setTimeout(function(){
						that.$router.push('./');
					},3000);
					
				}else{
					//localStorage.sessionid = rd.data
					mui.toast(rd.message);
					// setKey('sessionid',rd.data);
				}
				
			})
			.catch(res=>{
				console.log(res,"res")
			})
			return false;
			//登陆ajax
			mui.post(url,data,function(data){
					var data = JSON.parse(data);
					if(data['status']==1){
						try{
							wt.close();			
						}catch(e){
						}
						mui.toast(that.changlan['msgtip'][data['message']],1500)
						setTimeout(function(){			
							window.localStorage.setItem("uid",data['data'])
							that.$router.push('./index')
						},2000)
							
					}else{
						try{
							wt.close();			
						}catch(e){
						}
							mui.toast(that.changlan['msgtip'][data['message']])
						return false;
					}
				},"json"
			);
			

		},
		poslangtype(){
			//提交一个状态改变
			if(this.types){
				this.$store.commit("cnlange",'cn');
				this.langicon=cnicon;//切换中文图标
				window.localStorage.setItem("lange_type",1);
			}else{
				this.$store.commit("cnlange",'ru');
				this.langicon=ruicon;//切换俄文图标
				window.localStorage.setItem("lange_type",2)
			}
			this.types = !this.types;
		},
		eysslect(){
			this.ishowpsw = !this.ishowpsw
		},
		//输入框调用键盘被顶上去处理
		clientWriting(){
			var that = this;
			var originalHeight=document.documentElement.clientHeight || document.body.clientHeight;
			window.onresize=function(){
			    //软键盘弹起与隐藏  都会引起窗口的高度发生变化
		    var  resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
		    if(resizeHeight*1<originalHeight*1){ //resizeHeight<originalHeight证明窗口被挤压了
						that.iskeyBoard = true;
		    }else{
		    		that.iskeyBoard = false;
		    }
			}
		},
		inonbure(){
			this.iskeyBoard = false;
		},
		getlogin(){
			var that =this;
			try{
				that.cid = plus.push.getClientInfo().clientid;
				console.log('cid:',that.cid);
			}catch(e){
				
			}
			let jsondata = {
				vc_userphone:that.user,
				vc_password:that.psw
			}
			
			if(this.user == ""){
				mui.toast(this.changlan['login']['nullusertip'])	
				return false;
			}
			
			if(this.psw == ""){
				mui.toast(this.changlan['login'].nullpswtip)	
				return false;
			}
			
			//登录 
			that.SignJump(jsondata);
			
		}
	},
	components:{
		navigBar
	},
	created:function(){
		this.lan_statue = window.localStorage.getItem('lange_type');
	},
	mounted:function(){
		var that =this;
		if(this.lan_statue!=null){
				if(this.lan_statue!=2){
					this.types = false;
					this.$store.commit("cnlange",'cn');
				}else{
					this.types = true;
					this.$store.commit("cnlange",'ru');
				}
		}
		setTimeout(function(){
			that.clientWriting();
		},500)
	}
  
}

</script>
<style lang="scss" scoped>
#scrollboxjc{
	width: 100%;
	height: 100%;
}
.top31{
	margin-top: -31%;
}
.top0{
	margin-top: 0;
}
.regit{
	margin-left: 20px;
}
@import '../assets/css/login.scss';
</style>
