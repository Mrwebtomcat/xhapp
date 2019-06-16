<template>
  <div class="pswforget">
   <navigBar :ShowUsericon="true" :requreClass="topbarIcon" :titleText="changlan['pswforget']['psw']" @checkMe="clickMe"></navigBar>
   <div class="loginform">
	   	 <form class="mui-input-group">
			    <div class="mui-input-row user phones">
			         <label> <i class="iconfont icon-shouji" ></i></label>
			   			 <input type="text" v-model="phone" :placeholder="changlan['pswforget']['phonetip']">
			    		<button type="button" v-if="isSuccess" class="mui-btn mui-btn-warning" @click="getyzm">{{changlan['pswforget']['hqyzm']}}</button>
			    		<button type="button" v-else class="mui-btn mui-btn-warning" id="">{{runTime}}</button>
			    </div>
			    <div class="mui-input-row psw yzm">
			        <label><i class="iconfont icon-yanzhengma" ></i></label>
			        <input type="text" class="mui-input-clear" v-model="yzm" maxlength="6" value=""   :placeholder="changlan['pswforget']['yzm']">
			    		<span class="mui-icon mui-icon-clear mui-hidden"></span>
			    </div>
			    <div class="mui-input-row psw">
			        <label><i class="iconfont icon-mima" ></i></label>
			        <input :type="ishowpsw1?'password':'text'" v-model="oldpsw" class="mui-input-password" value="" :placeholder="changlan['pswforget']['oderpsw']">
			        <span :class="ishowpsw1?'iconfont icon-kejian-copy-copy eirsicon':'iconfont icon-kejian-copy-copy eirsicon ative'" @click="eysslect1"></span>
			    </div>
			    <div class="mui-input-row psw">
			        <label><i class="iconfont icon-mima" ></i></label>
			        <input :type="ishowpsw2?'password':'text'" v-model="newpsw" class="mui-input-password" value="" :placeholder="changlan['pswforget']['newpsw']">
			        <span :class="ishowpsw2?'iconfont icon-kejian-copy-copy eirsicon':'iconfont icon-kejian-copy-copy eirsicon ative'" @click="eysslect2"></span>
			    </div>
			    <div class="btnnnn">
			        <button type="button" class="mui-btn mui-btn-warning" @click="posChangPsw">{{changlan['pswforget']['tj']}}</button>
			    </div>
			</form>
   </div>
  
  </div>
</template>

<script>
import {connetAction,regPhone} from "../utils/index.js"
import https from "../utils/Https.js"	
import navigBar from '@/components/navigBar';//标题组件
import {mapMutations} from 'vuex';
let staticyzm = 123456;
export default {
  data () {
    return {
    	 topbarIcon:"icon-fanhui",   //返回图标 navtopBar
    	 yzm:"",  //验证码值
			 oldpsw:"",   //旧密码
			 newpsw:'',   //新密码
			 phone:'',    //手机号
			 ishowpsw1:true,
			 ishowpsw2:true,
			 isSuccess:true,
			 runTime:60      //倒计时
    }
  },
  computed:{
		//获取store里面数据 
  	changlan(){
  		return this.$store.state.langetype
  	},
  	lginStatus(){
  		return this.$store.state.loginState
  	},
  	isPhonenum(){
  		return this.$store.state.phonenum
  	}
  },
  props:[],
  methods: {
  	...mapMutations(["checkPhone"]),
		clickMe(){
			this.$router.push('./login');
		},
		getyzm(){
			try{var wt = plus.nativeUI.showWaiting();}catch(e){ }
			if(this.phone==""){mui.toast(this.changlan['pswforget']['nullphonetip']);return false};
			this.checkPhone(this.phone);
			var that = this;
			if(this.isPhonenum){
				//关闭获取验证码按钮，显示数字倒计时
				this.isSuccess = false;
				var timer = setInterval(function(){
					
					if(that.runTime == 0){
						that.isSuccess = true;
						that.runTime = 60;
						clearInterval(timer);
					}else{
						that.runTime--;
					}
				},1000)
				
				//获取验证码ajax
				var url = this.$BaseUrll+"/Login/getCode";
				var data = {
					vc_phone:this.phone
				};
				

			}else{
				mui.toast(this.changlan['pswforget']['errphone'])
			}
		},
		
		posChangPsw(){
			try{var wt = plus.nativeUI.showWaiting();}catch(e){ }
			//判断新密码和旧密码是否一致
			if(this.oldpsw != this.newpsw || this.oldpsw == '' || this.newpsw == ''){
				mui.toast(this.changlan['pswforget']['emptypsw']);
				return false;
			}
			
			var url = this.$BaseUrll+"/Login/findPass";
			var data = {
				vc_phone:this.phone,
				code:this.yzm,
				vc_password:this.newpsw,
			};
			var that = this;
			
		},
		eysslect1(){
			this.ishowpsw1 = !this.ishowpsw1;
		},
		eysslect2(){
			this.ishowpsw2 = !this.ishowpsw2;
		}
	},
	components:{
		navigBar
	},
	created:function(){
	
	},
	mounted:function(){
		
	}
}
</script>
<style>
	body{
	 background: #f5f5f5 !important;
	}
	.loginform .mui-input-row .mui-input-password ~ .mui-icon-eye{
	 	display: none !important; 
	 	margin-top: -0.05rem !important; 
	 }
</style>
<style lang="scss" scoped>
	@import '../assets/css/pswforget.scss';
</style>
