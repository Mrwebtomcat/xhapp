<!--验证card produce by jack-->
<template>
  <div>
  	<navigBar :ShowUsericon="1" :requreClass="`icon-fanhui`" :titleText="'身份验证'" :showRighticon="false"  :rightClass="`icon-letter`"  @checkMe="clickMe" @iconRight="goEmial"></navigBar>
	<div class="csshenhe_sq">
		<div class="renzstatus">
			<span style="font-size: 22px;">认证步骤-</span>	 
		</div>
		<div class="imgcon">
			<img src="../assets/img/sh/1.png" alt="">
		</div>
		
		<div class="renzstatus">
			<span style="font-size: 22px;">认证状态-</span>	 
			<span style="color:red ;">未实名认证，请填写相关信息实名认证</span>
		</div>
		<div>
			<div class="centercon">
				<form class="mui-input-group">
					<div class="stepone" v-if="stpenums==1">
						<div class="mui-input-row user">
							<label>姓名</label>
							<input type="text" class="mui-input-clear" v-model="form.vc_username" placeholder="请输入用户名">
						</div>
						<div class="mui-input-row cpasws">
							<label>身份证号码</label>
							<input type="password" class="mui-input-password" v-model="form.vc_card" placeholder="请输入密码">
						</div>
					</div>
					<div class="steptwo" v-else-if="stpenums==2">
						<div class="mui-input-row yzphone">
							<label>手机号码</label>
							<input type="text" class="mui-input-clear"  v-model="form.vc_phone" placeholder="请输入手机号码">
						</div>
						<div class="mui-input-row yzma">
							<input type="text" v-model="form.vc_yzm"   placeholder="请输入验证码">
							<button type="button" v-if="yzmStatus===1" class="mui-btn mui-btn-primary" @click.stop="getYzm">获取验证码</button>
							<button type="button"  v-else-if="yzmStatus===2" class="mui-btn mui-btn-primary" @click.stop="getYzm">{{Yzmtext}}</button>
							<button type="button" v-else class="mui-btn mui-btn-primary" @click.stop="getYzm">{{Yzmtext}}</button>
						</div>
					</div>
					
				</form>
				<div class="btncon" style="text-align: center;">
					<button type="button" class="mui-btn mui-btn-primary" @click.stop="setNext">下一步</button>
				</div>
			</div>
		</div>
		<div class="renzstatus">
			<span style="font-size: 22px;">安全保障-</span>	 
		</div>
		<div class="bztip">
			<p>金梦情缘，严格保护会员隐私</p>
			<p>如认证遇到困难，可咨询客服13824818105或13702889930</p>
		</div>
	</div>
  </div>
</template>

<script>
// import breathBtn from '@/components/BreathButton';//呼吸按钮组件
import navigBar from '@/components/navigBar';//呼吸按钮组件
import mapMutations from 'vuex';
export default {
  data () {
    return {
		stpenums:1,
		Yzmtext:'',
		yzmStatus:1,
		form:{vc_username:'',vc_card:'',vc_phone:'',vc_yzm:''}
    }
  },
  computed:{
		//获取store里面数据 
  	changlan(){
  		return this.$store.state.langetype
  	}
  
  },
  props:[],
  components:{
  	navigBar
  },
	methods: {
		clickMe(){
			if(this.getOderstatus){
				return false;
			}
				this.$router.push("./center");
		},
		//控制title
		chantime(str){
			
		},
		goEmial(){
			if(this.getOderstatus){
				return false;
			}
			this.$router.push("./mesgNotice");
		},
		setNext(){
			if(this.stpenums==1){
				if(this.form.vc_username==""){
					mui.toast("用户名不能为空")
					return false;
				}
				
				if(this.form.vc_card==""){
					mui.toast("身份证号码不能为空")
					return false;
				}
				
			}else if(this.stpenums==2){
				if(this.form.vc_phone==""){
					mui.toast("手机号码不能为空")
					return false;
				}
				
				if(this.form.vc_yzm==""){
					mui.toast("验证码不能为空")
					return false;
				}
				
			}
			
			this.stpenums++;
		},
		getYzm:function(){
			
		}
		
		
	},
	created:function(){
		
	},
	mounted:function(){
		
	}
}

</script>
<style scoped> 
	.csshenhe_sq{
		width: 100%;
		padding-top: 80px;
	}
	.renzstatus{
		background:#f1f1f1;
		color: #333;
		padding: 30px  0 20px 30px;
	}
	.mui-table-view{
		width: 100%;
		margin: auto;
	}
	.mui-table-view li a{
		font-size: 30px;
	    padding:35px 30px;
	}
	.mui-input-group .mui-input-row{
		font-size:35px;
		height: 100px;
		padding-left: 20px;
		padding-top: 15px;
		display: flex;
		align-items: center;
	}
	.mui-input-row label + input{
		height: 100%;
		font-size: 35px;
		float: left;
	}
	.mui-input-row label{
		width: auto;
	}
	.mui-table-view-cell:after{
		height: 2px;
	}
	.iconfont{
		font-size: 35px;
		color: #b06cef;
		position: relative;
	}
	.fguanz{
		font-size: 38px;
		color: #f99e4ce3;
		margin-right: 18px;
		top: 2px;
	}
	.llicon{
		font-size: 30px;
		margin-right: 8px;
	}
	.rzicon{
		font-size: 50px;
		top: 5px;
	}
	.jmicon{
		font-size: 45px;
		top: 5px;
		margin-right: 13px;
	}
	.shopicon{
		font-size: 38px;
		top: 2px;
		margin-right: 20px;
	}
	.conficon{
		margin-right: 20px;
		font-size: 38px;
	}
	.cfff{
		color: #fff;
	}
	
	.mui-input-row .mui-input-clear ~ .mui-icon-clear, 
	.mui-input-row .mui-input-speech ~ .mui-icon-speech,
	.mui-input-row .mui-input-password ~ .mui-icon-eye{
		font-size: 40px !important;
	}
	.imgcon img{
		width: 100%;
	}
	.mui-input-password{
		padding-left: 35px;
	}
	.user input{
		margin-left: 135px;
	}
	.btncon{
		margin-top: 30px;
		padding-bottom: 20px;
	}
	.btncon button{
		padding: 10px 80px;
		font-size: 30px;
	}
	.yzma button{
		padding: 10px 20px;
		font-size: 30px;
		width: auto;
	}
	.yzma input{
		width: 300px;
		height: 100%;
		font-size: 30px;
	}
	.yzphone input{
		margin-left: 30px;
	}
	.bztip p{
		font-size: 30px;
		padding-left: 30px;
		margin-top: 20px;
	}
</style>

