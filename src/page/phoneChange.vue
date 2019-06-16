<template>
  <div class="pswforget cgphone">
   <navigBar :ShowUsericon="true" :requreClass="topbarIcon" :titleText="changlan['config']['changphone']" @checkMe="clickMe"></navigBar>
   <div class="loginform">
	   	 <form class="mui-input-group">
	   	 		<div class="mui-input-row psw">
			        <label><i class="iconfont icon-shouji" ></i></label>
			        <input type="text" v-model="oldphone" class="mui-input-clear" value="" :placeholder="changlan['pswforget']['nonwphonetip']">
			    </div>
			    <div class="mui-input-row user phones">
			        <label> <i class="iconfont icon-shouji" ></i></label>
			   			<input type="text" v-model="newPhone" :placeholder="changlan['pswforget']['newphone']">
			    		<button type="button" v-if="isSuccess" class="mui-btn mui-btn-warning" @click="getyzm">{{changlan['pswforget']['hqyzm']}}</button>
			    		<button type="button" v-else class="mui-btn mui-btn-warning" id="">{{runTime}}</button>
			    </div>
			    <div class="mui-input-row psw yzm">
			        <label><i class="iconfont icon-yanzhengma" ></i></label>
			        <input type="text" class="mui-input-clear" v-model="yzm" maxlength="6" value=""   :placeholder="changlan['pswforget']['yzm']">
			    		<span class="mui-icon mui-icon-clear mui-hidden"></span>
			    </div>
			    
			    <div class="btnnnn">
			        <button type="button" class="mui-btn mui-btn-warning phonebtn" @click="posChangPsw">{{changlan['pswforget']['qrval']}}</button>
			    </div>
			</form>
   </div>
  
  </div>
</template>

<script>
import navigBar from '@/components/navigBar';//标题组件
import {mapMutations} from 'vuex';
let staticyzm = 123456;
export default {
  data () {
    return {
    	 topbarIcon:"icon-fanhui",   //返回图标 navtopBar
    	 oldphone:'',    //手机号
    	 yzm:"",         //验证码值
			 newPhone:"",    //新手机号
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
			this.$router.go(-1);
		},
		getyzm(){
			if(this.newPhone==""){mui.toast(this.changlan['pswforget']['nullphonetip']);return false};
			this.checkPhone(this.newPhone);
			try{var wt = plus.nativeUI.showWaiting();}catch(e){ };
			if(this.isPhonenum){
				//关闭获取验证码按钮，显示数字倒计时
				this.isSuccess = false;
				var that = this;
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
					vc_phone:this.newPhone
				};
				mui.post(url,data,function(data){
						var data = JSON.parse(data);
							wt?wt.close():'';
						if(data['status']==1){
							mui.toast(that.changlan['msgtip'][data['message']])
							return false;
						}else{
							mui.toast(that.changlan['msgtip'][data['message']])
							return false;
						}
					},"json"
				);

			}else{
				mui.toast("手机号输入规则不正确")
			}
		},
		posChangPsw(){
			
			var uid = window.localStorage.getItem("uid");
			if(!uid){
				this.$router.push('./login');
			}
			
			var url = this.$BaseUrll+"/Login/updatePhone";
			var data = {
				vc_drcode:uid,
				vc_phone:this.oldphone,
				code:this.yzm,
				new_phone:this.newPhone,
			};
			
			var that = this;
			
			mui.post(url,data,function(data){
						var data = JSON.parse(data);
						if(data['status']==1){
					
							mui.toast('修改成功，请重新登陆！',2000)
							
							setTimeout(function(){
								window.localStorage.removeItem("uid");
								that.$router.push("./login")
							},2000)
							
						}else{
							mui.toast(that.changlan['msgtip'][data['message']])
							return false;
						}
					},"json"
				);
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
	.cgphone .phonebtn,.cgphone .mui-btn-warning:enabled:active{
		background: #FDB913;
		color: #333;
	}
</style>
<style lang="scss" scoped>
	@import '../assets/css/pswforget.scss';
</style>
