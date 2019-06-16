<template>
  <div class="cgpsw pswforget">
   <navigBar :ShowUsericon="true" :requreClass="topbarIcon" :titleText="changlan['pswforget']['changepswtip']" @checkMe="clickMe"></navigBar>
   <div class="loginform">
	   	 <form class="mui-input-group">
			    <div class="mui-input-row psw yzm">
			        <label><i class="iconfont icon-mima" ></i></label>
			        <input type="text" class="mui-input-clear" v-model="yzm"  value=""   :placeholder="changlan['pswforget']['pswed']">
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
import navigBar from '@/components/navigBar';//标题组件
import {mapMutations} from 'vuex';
let staticyzm = 123456;
export default {
  data () {
    return {
    	 topbarIcon:"icon-fanhui",   //返回图标 navtopBar
    	 yzm:"",      //旧密码
			 oldpsw:"",   //新密码1次
			 newpsw:'',   //新密码2次
			 ishowpsw1:true,
			 ishowpsw2:true
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
		posChangPsw(){
			
			var uid = window.localStorage.getItem("uid");
			if(!uid){
				this.$router.push('./login');
			}
			try{
				var wt = plus.nativeUI.showWaiting();
			}catch(e){
				//TODO handle the exception
			}
			
			//判断旧密码和新密码不能相同
			if(this.yzm == this.newpsw){
				mui.toast(this.changlan['pswforget']['noldanewpsw']);
				return false;
			}
			if(this.newpsw.length<6){
					mui.toast(this.changlan['pswforget']['pswleng6']);
					return false;
			}
			//判断两次新密码是否一致
			if(this.oldpsw != this.newpsw || this.oldpsw == '' || this.newpsw == ''){
				mui.toast(this.changlan['pswforget']['emptypsw']);
				return false;
			}
			
			var url = this.$BaseUrll+"/Login/updatePass";
			var data = {
				vc_drcode:uid,
				pass:this.yzm,
				vc_password:this.newpsw,
			};
			
			var that = this;
			
			mui.post(url,data,function(data){
						var data = JSON.parse(data);
						try{
							wt.close();				
						}catch(e){
						}
						if(data['status']==1){
					
							mui.toast(that.changlan['pswforget']['changok'],2000)
							
							setTimeout(function(){
								window.localStorage.removeItem("uid");
								that.$router.push("./login")
							},2000)
							
						}else{
							mui.toast(data['message'])
							return false;
						}
					},"json"
				);
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
	.cgpsw .mui-input-row .mui-input-password ~ .mui-icon-eye{
	 	display: none !important; 
	 	margin-top: -0.05rem !important; 
	 }
</style>
<style lang="scss" scoped>
	@import '../assets/css/pswforget.scss';
</style>
