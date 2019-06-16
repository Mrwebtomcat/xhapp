<template>
  <div class="pswforget">
   <navigBar :ShowUsericon="true" :requreClass="topbarIcon" :titleText="'注册'" @checkMe="clickMe"></navigBar>
   <div class="loginform">
	   	 <form class="mui-input-group">
				<div class="mui-input-row user nichen">
					  <label> <i class="iconfont icon-shouji" ></i></label>
					  <span> 昵称：</span>
					   <input type="text" class="ml10" v-model="form1.vc_nickname" placeholder="请输入昵称" />
				</div>
				<div class="mui-input-row user nichen">
					<label><i class="iconfont icon-xingbie"></i></label>
					<span> 性别：</span>
					<div class="mui-input-row mui-radio">
							<div :class="n_sex==1?'mysex ative':'mysex'" style="padding-left: 20px;" @click="changesex(1)">
								男<i class="iconfont icon-xingbienan"></i>
							</div>
							<div :class="n_sex!=1?'mysex ative':'mysex'"  @click="changesex(2)">
								女<i class="iconfont icon-xingbienv" ></i>
							</div>
					</div>
				</div>
				<!-- <div class="mui-input-row mui-input-range user nichen">
					  <label> <i class="iconfont icon-iconsg" ></i></label>
						<span>身高：</span>
					   
					  
				</div> -->
				 <div class="mui-input-row mui-input-range">
					<label><i class="iconfont icon-iconsg" ></i></label>
					<span style="font-size: 18px;">身高 :</span>
					<span style="margin-left: 15px;font-size: 18px;">{{form1.vc_sg}}CM</span>
					<input style="width: 200px;margin-left: 10px;" v-model="form1.vc_sg" type="range" min="100" max="250" @change="getsg">
				</div>
				<div class="mui-input-row user">
					  <label> <i class="iconfont icon-riqi" ></i></label>
						<span> 出生日期:</span>
					  <input class="ml10" type="text" readonly v-model="form1.dt_csrq" @click="showtimes" placeholder="请选择日期">
				</div>
				<div class="mui-input-row user">
					  <label> <i class="iconfont icon-dizhi" ></i></label>
						<span>工作地区：</span>
					  <input type="text" class="ml10" readonly v-model="workeradres" @click="showPiker(2)" placeholder="请选择工作地区">
				</div>
				<div class="mui-input-row user nichen">
					  <label> <i class="iconfont icon-xueli" ></i></label>
						<span >学历：</span>
					   <input type="text" readonly class="ml10" @click="selectWorke('xueli')" v-model="vc_xueli" placeholder="请输入学历" />
				</div>
				<div class="mui-input-row user nichen">
					  <label> <i class="iconfont icon-xinzi" ></i></label>
						<span>薪资：</span>
					   <input type="text" readonly class="ml10" @click="selectWorke('gz')" v-model="vc_money" placeholder="请选择薪资" />
				</div>
				<div class="mui-input-row user nichen">
					  <label> <i class="iconfont icon-hunyinzhuangtai" ></i></label>
						<span>婚姻状态：</span>
					   <input type="text" readonly class="ml10" @click="selectWorke('hunyin')"  v-model="vc_huntype" placeholder="请输入婚姻状态" />
				</div>
			    <div class="mui-input-row user phones">
			         <label> <i class="iconfont icon-shouji" ></i></label>
			   			 <input type="text" v-model="phone" placeholder="请输入手机号码">
			    		<button type="button" v-if="isSuccess" class="mui-btn mui-btn-warning" @click="getyzm">获取验证码</button>
			    		<button type="button" v-else class="mui-btn mui-btn-warning" id="">{{runTime}}</button>
			    </div>
			    <div class="mui-input-row psw yzm">
			        <label><i class="iconfont icon-yanzhengma" ></i></label>
			        <input type="text" class="mui-input-clear" v-model="yzm" maxlength="6" value=""   placeholder="请输入验证码">
			    		<span class="mui-icon mui-icon-clear mui-hidden"></span>
			    </div>
			    <div class="mui-input-row psw">
			        <label><i class="iconfont icon-mima" ></i></label>
			        <input :type="ishowpsw1?'password':'text'" v-model="oldpsw" class="mui-input-password" value="" placeholder="请输入新密码">
			        <span :class="ishowpsw1?'iconfont icon-kejian-copy-copy eirsicon':'iconfont icon-kejian-copy-copy eirsicon ative'" @click="eysslect1"></span>
			    </div>
			    <div class="mui-input-row psw">
			        <label><i class="iconfont icon-mima" ></i></label>
			        <input :type="ishowpsw2?'password':'text'" v-model="newpsw" class="mui-input-password" value="" placeholder="请再次输入新密码">
			        <span :class="ishowpsw2?'iconfont icon-kejian-copy-copy eirsicon':'iconfont icon-kejian-copy-copy eirsicon ative'" @click="eysslect2"></span>
			    </div>
			    <div class="btnnnn">
			        <button type="button" class="mui-btn mui-btn-warning" @click="posZhuce">注册</button>
			        <!-- <button id="dom3" type="button" data-options='{"value":"2019-5-9","beginYear":2010,"endYear":2020}' class="mui-btn mui-btn-warning" @click="showPiker">选择日期</button> -->
			    </div>
			</form>
   </div>
	<div class="itemaction" v-show="showrili==1">
		<inlineCalendar @change="onChange" />
	</div>
  </div>
</template>

<script>
import navigBar from '@/components/navigBar';//标题组件
import {mapMutations} from 'vuex';
import {connetAction,regPhone} from "../utils/index.js"
import https from "../utils/Https.js"
import bigJon from "../store/province.json"
import autoCode from "../store/autocode.json"
export default {
  data () {
    return {
    	 topbarIcon:"icon-fanhui",   //返回图标 navtopBar
    	 yzm:"",  //验证码值
		 oldpsw:"",   //旧密码
		 newpsw:'',   //新密码
		 phone:'',    //手机号
		 n_sex:1,
		 showrili:false,
		 ishowpsw1:true,
		 ishowpsw2:true,
		 isSuccess:true,
		 workeradres:"",
		 vc_xueli:'',
		 vc_huntype:'',
		 vc_money:'',
		 picker:null,
		 runTime:60,      //倒计时
		 form1:{
			vc_nickname:'',
			n_sex:"",
			vc_sg:100,
			n_age:'',
			dt_csrq:'',
			vc_province:'',
			vc_city :'',
			vc_area:'',
			n_province:'',
			n_city :'',
			n_area:'',
			n_education:'',
			n_money:"",
			n_huntype:0,
			vc_userphone:'',
			code:'',
			vc_password:''
		 }  
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
		changesex:function(val){
			this.n_sex = val;
			this.form1.n_sex = val;
			
		},
		onChange(date){
			this.showrili = !this.showrili;
			this.form1.dt_csrq = date.format('YYYY-MM-DD');
		},
		showriqi:function(){
			this.showrili =! this.showrili;
		},
		getyzm(){
			try{var wt = plus.nativeUI.showWaiting();}catch(e){ }
			if(this.phone==""){mui.toast(this.changlan['pswforget']['nullphonetip']);return false};
			this.checkPhone(this.phone);
			var that = this;
			if(this.isPhonenum){
				
				//获取验证码ajax
				var data = {
					vc_userphone:this.phone
				};
				
				this.form1.vc_userphone = this.phone;
				
				connetAction.ajaxPost(https['getSmsCode'],data)
				.then(rd=>{
					if(rd.status==1){
						wt?wt.close():'';
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
						mui.toast("验证码发送成功,请用手机查看",'success')
					}else{
						mui.toast("手机已注册过，请绑定另外的手机号码",'success');
					}
				})
				.catch(res=>{
					// console.log(res,"res")
					this.toast("发送验证码失败",'success');
				})
				

			}else{
				mui.toast(this.changlan['pswforget']['errphone'])
			}
		},
		deactivated() {
		 this.$destroy()
		},
		getsg(e) {
			this.form1.vc_sg = e.target.valueAsNumber;
		},
		posZhuce(){
			try{var wt = plus.nativeUI.showWaiting();}catch(e){ }
			
			var data = Object.assign({},this.form1);
			var that = this;
			data.vc_userphone = this.phone;
			data.code = this.yzm;
			data.n_sex = this.n_sex;
			
			data.vc_password = this.newpsw;
			console.log(data)
			if(!data['vc_nickname']||data['vc_nickname']==""){
				mui.toast("昵称不能为空",'warning');
				return false;
			}
		
			if(!data['dt_csrq']||data['dt_csrq']==""){
				mui.toast("出生日期不能为空",'warning');
				return false;
			}
			var nowDate = new Date().getFullYear();
			var inputDate = new Date(data['dt_csrq']).getFullYear();
			inputDate =Number(nowDate) - Number(inputDate);
			data.n_age = inputDate;
			
			if(!data['n_province']||data['n_province']==""){
				mui.toast("请选择工作地区",'warning');
				return false;
			}
			if(!data['n_city']||data['n_city']==""){
				mui.toast("请选择城市",'warning');
				
				return false;
			}
			if(!data['n_area']||data['n_area']==""){
				mui.toast("请选择城区",'warning');
				return false;
			}
			if(!data['n_education']||data['n_education']==""){
				mui.toast("请选择学历",'warning');
				return false;
			}
			if(!data['n_money']||data['n_money']==0){
				mui.toast("请选择薪资",'warning');
				return false;
			}
			if(!data['n_huntype']||data['n_huntype']==0){
				mui.toast("请选择婚姻情况",'warning');
				return false;
			}
			
			if(!data['vc_userphone']||data['vc_userphone']==""){
				mui.toast("手机号码不能为空",'warning')
				return false;
			}
			
			if(!regPhone(data.vc_userphone)){
				mui.toast("手机格式不正确",'warning')
				return false;
			}
			
			if(!data['code']||data['code']==""){
				mui.toast("验证码不能为空",'warning')
				return false;
			}
			
			if(this.oldpsw == '' || this.newpsw == ''){
				mui.toast("密码输入不能为空");
				return false;
			}
			
			//判断新密码和旧密码是否一致
			if(this.oldpsw != this.newpsw){
				mui.toast("两次输入密码不一致");
				return false;
			}
		
			console.log(data);
			
			
			connetAction.ajaxPost(https['register'],data)
			.then(rd=>{
				console.log(rd)
				if(rd.status!=0){
					// message(that,{contxt:rd.message})
					///setKey('sessionid',rd.data);
					wt?wt.close():"";
					localStorage.openid = rd.data;
					mui.toast(rd.message)
					setTimeout(function(){
						that.$router.push('./index');
					},3000);
					// if(localStorage.exitid){
					// 	localStorage.removeItem('exitid')
					// }
				}else{
					//localStorage.sessionid = rd.data
					mui.toast(rd.message);
					// setKey('sessionid',rd.data);
				}
				
			})
			.catch(res=>{
				console.log(res,"res")
			})
			
		},
		eysslect1(){
			this.ishowpsw1 = !this.ishowpsw1;
		},
		eysslect2(){
			this.ishowpsw2 = !this.ishowpsw2;
		},
		selectWorke:function(type="gz"){
			var that = this;
			// mui.init();
			 this.picker = new mui.PopPicker({
				layer:1
			});
			if(type=="xueli"){
				this.picker.setData(autoCode['1']);
			}else if(type=="hunyin"){
				this.picker.setData(autoCode['7']);
			}else{
				this.picker.setData(autoCode['2']);
			}
		
			this.picker.pickers[0].setSelectedIndex(1);
			this.picker.show(function(SelectedItem) {
				
				if(type=="xueli"){
					that.form1.n_education = SelectedItem[0].value;
					that.vc_xueli =  SelectedItem[0].text;
				}
				
				if(type=="gz"){
					that.form1.n_money = SelectedItem[0].value;
					that.vc_money = SelectedItem[0].text;
				}
				
				if(type=="hunyin"){
					that.form1.n_huntype = SelectedItem[0].value;
					that.vc_huntype =  SelectedItem[0].text;
				}
				setTimeout(function(){
					let domm  = document.getElementsByClassName('mui-poppicker');
					domm[0].remove();
				})
			})
		},
		//选择省三级
		showPiker:function(type){
			var that = this;
			mui.init();
			this.picker = new mui.PopPicker({
				layer: 3
			});
			
			this.picker.setData(bigJon)
			this.picker.pickers[0].setSelectedIndex(1);
			this.picker.pickers[1].setSelectedIndex(1);
			this.picker.pickers[2].setSelectedIndex(2);
			this.picker.show(function(SelectedItem) {
				that.workeradres = SelectedItem[0].text+SelectedItem[1].text+SelectedItem[2].text;
				that.form1.n_province = SelectedItem[0].value;
				that.form1.n_city = SelectedItem[1].value;
				that.form1.n_area = SelectedItem[2].value;
				that.form1.vc_province = SelectedItem[0].text;
				that.form1.vc_city = SelectedItem[1].text;
				that.form1.vc_area = SelectedItem[2].text;
				
				setTimeout(function(){
					let domm  = document.getElementsByClassName('mui-poppicker');
					domm[0].remove();
				})
			})
			
		},
		//选择出生日期
		showtimes:function(){
			var that = this;
			var dtpicker = new mui.DtPicker({
				beginDate:new Date(1950,5),
				endDate:new Date(2000,1),
				"type": "date",
			});
			dtpicker.show(function(e) { 
				that.form1.dt_csrq = e.text;
				setTimeout(function(){
					let domm  = document.getElementsByClassName('mui-dtpicker');
					domm[0].remove();
				},1000)
			})
		}
	},
	components:{
		navigBar
	},
	created:function(){
	
	},
	mounted:function(){
		mui.init();
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
	 .itemaction{
		width: 100%;
		height: 700px;
		position: absolute;
		bottom: 0;
		left: 0;
		 
	 }
</style>
<style lang="scss" scoped>
	@import '../assets/css/pswforget.scss';
	.pswforget .loginform{
		height: 100%;
		overflow-y: scroll
	}
	.pswforget .loginform .user input[type="text"]{
		width: auto !important;
	}
	.pswforget .loginform .user input[type="radio"]{
		margin-left: 40px !important;
		
	}
	.ml10{
		margin-left: 10px !important;
	}
	.lbel100{
		width: 50px !important;
		display: block !important;
	}
	.lbel20{
		margin-left: 20px;
	}
	.loginform .input-row{
		align-items: center;
	}
	.autow{width: 100px !important;}
	.pswforget .loginform button{
		margin-top: 0;
		margin-bottom: 130px;
	}
	.pswforget .loginform .btnnnn{
		height: 100px;
		margin-top: 10px;
	}
	.pswforget .loginform .mui-input-row label .iconfont{
		position: relative;
		top: -3px;
	}
	.mysex.ative{
		color: red;
	}
	.mysex .iconfont{
		font-size: 45px;
		margin-left: 10px;
		margin-right: 30px;
	}
	.phones{
		position: relative;
	}
	.pswforget .loginform .phones button{
		margin-bottom: 0;
	}
</style>
