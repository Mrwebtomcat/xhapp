<!-- seftinfo persional -->
<template>
	<div class="selinfocon">
		<navigBar :ShowUsericon="true" :titleBg="false" style="background:transparent;" :requreClass="`icon-fanhui`" @checkMe="clickMe"></navigBar>
		<div class="h120px"></div>
		<div class="mui-content">
			
			<div class="header">
				<div class="mytoux">
					<img :src="userData.vc_img?userData.vc_img:(userData.n_sex?$mianImg:$womianImg)" alt="">
				</div>
				
				<div class="phontosbox">
					<div class="phontos">
						<ul>
							<li v-for="(items,index) in userData.album" :key="index">
								<img :src="items.vc_img" alt="">
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			<div class="personinfo">
				<button type="button" class="mui-btn mui-btn-primary gzbtn" @click="addGuanzhu">关注</button>
				<div class="u_name">
					<span class="nickname">{{userData.vc_nickname}}</span>
					<div class="vcqanxian">
						<span :class="userData.n_isvip?'zjvip active':'zjvip'"></span>
						<span :class="userData.n_isstar?'zjstart active':'zjstart'"></span>
						<span :class="userData.n_issm?'zjcard active':'zjcard'"></span>
					</div>
				</div>
				<div class="userinfolist">
					<div  class="mui-btn mui-btn-primary">{{userData.vc_city}}</div>
					<div  class="mui-btn mui-btn-primary">{{userData.vc_area}}</div>
					<div class="mui-btn mui-btn-success">{{userData.n_age}}岁</div>
					<div v-if="userData.n_xueli" class="mui-btn mui-btn-warning">文化程度:{{autoCodeStr("1",userData.n_xueli)}}</div>
					<!-- <div class="mui-btn mui-btn-danger">红色</div>
					<div  class="mui-btn mui-btn-royal">紫色</div> -->
				</div>
				<!-- /// -->
				<div class="userinfoscroll">
					<div class="comomhead">
						<span class="brforline">内心独白</span>
						<p class="bbline"></p>
					</div>
					<div class="ddubaibox">
						{{userData.vc_descript?userData.vc_descript:'(空)'}}
					</div>
					<div class="comomhead">
						<span class="brforline">个人爱好</span>
						<p class="bbline"></p>
					</div>
					<div class="ddubaibox">
						{{userData.vc_loveplay?userData.vc_loveplay:'(空)'}}
					</div>
					<div class="comomhead">
						<span class="brforline">个人资料<!-- （<span class="ziliaonc">昵称：你好</span>） --></span>
						<p class="bbline"></p>
					</div>
					<div class="ddubaibox">
						<div v-if="userData.vc_mz" class="mui-btn mui-btn-success">{{autoCodeStr('mz',userData.vc_mz)}}</div>
						<div class="mui-btn mui-btn-primary">{{autoCodeStr(7,userData.n_huntype)}}</div>
						<div v-if="userData.n_tz" class="mui-btn mui-btn-success">{{userData.n_tz}}KG</div>
						<div  v-if="userData.n_sg" class="mui-btn mui-btn-warning">{{userData.n_sg}}(cm)</div>
						<div v-if="userData.n_ischild" class="mui-btn mui-btn-royal">{{autoCodeStr(3,userData.n_ischild)}}</div> 
						<div v-if="userData.vc_worke" class="mui-btn mui-btn-royal">{{autoCodeStr("zhiye",userData.vc_worke)}}</div> 
						<div v-if="userData.n_money" class="mui-btn mui-btn-danger">月收入{{autoCodeStr(2,userData.n_money,"code")}}(RMB)</div>
						<div v-if="userData.n_ishouse" class="mui-btn mui-btn-royal">{{autoCodeStr("hours",userData.n_ishouse)}}</div> 
						<div v-if="userData.n_alcohol" class="mui-btn mui-btn-danger">{{autoCodeStr(8,userData.n_alcohol)}}</div>
						<div  v-if="userData.n_smoke" class="mui-btn mui-btn-warning">{{autoCodeStr(9,userData.n_smoke)}}</div>
						<p class="bbline"></p>
					</div>
					<div class="comomhead">
						<span class="brforline">择偶条件</span>
						<p class="bbline"></p>
					</div>
					<div class="ddubaibox">
						<div  v-if="tjData&&tjData.n_hyzk" class="mui-btn mui-btn-primary">{{autoCodeStr(7,tjData.n_hyzk)}}</div>
						<div v-if="tjData&&tjData.n_province" class="mui-btn mui-btn-success">{{cityCodeStr(tjData.n_province)}}</div>
						<div v-if="tjData&&tjData.n_city" class="mui-btn mui-btn-success">{{cityCodeStr(tjData.n_province,tjData.n_city)}}</div>
						<div v-if="tjData&&tjData.n_min_age" class="mui-btn mui-btn-warning">{{tjData.n_min_age}}~{{tjData.n_max_age}}岁</div>
						<div v-if="tjData&&tjData.n_min_tz" class="mui-btn mui-btn-warning">{{autoCodeStr("1",tjData.n_xueli)}}</div>
						<div v-if="tjData&&tjData.n_max_sg" class="mui-btn mui-btn-royal">{{tjData.n_min_sg}}~{{tjData.n_max_sg}}(cm)</div> 
						<div v-if="tjData&&tjData.n_max_tz" class="mui-btn mui-btn-royal">{{tjData.n_min_tz}}~{{tjData.n_max_tz}}(kg)</div> 
						<div  v-if="tjData&&userData.n_smoke" class="mui-btn mui-btn-danger">{{autoCodeStr(9,tjData.n_smoke)}}</div>
						<div  v-if="tjData&&userData.n_alcohol" class="mui-btn mui-btn-royal">{{autoCodeStr(8,tjData.n_alcohol)}}</div>
						<p class="bbline"></p>
					</div>
				</div>
				<!-- /// -->
				
			</div>
		</div>
		<msgBar @dzh="dzh" @goMsg="goMsg" @doHn="Hongniang"></msgBar>
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import {connetAction,regPhone} from "../utils/index.js"
	import https from "../utils/Https.js"
	import msgBar from '@/components/MsgBar'; //navBartop 状态栏组件
	import autoCode from "../store/autocode.json"
	import provinceCode from "../store/province.json"
	import { mapGetters, mapMutations } from 'vuex';
	
	export default {
		data() {
			return {
				userName:'北极熊猫',
				userImg:'/static/home/img/logo.jpg',
				userPhone:'17710900441',
				vc_pc_img:'',
				vc_hz_img:'',
				vc_jz_img:'',
				vc_xsb_img:'',
				img:'',            //当前展示图片
				isShowImg:false,    //是否显示遮罩层
				userData:{
					album: [],
					dt_addtime: "2019-02-14 07:02:52",
					dt_updatetime: "2019-03-22 07:03:12",
					id: 3,
					n_age: 18,
					n_alcohol: 0,
					n_child: 0,
					n_huntype: 1,
					n_info: 30,
					n_iscar: 0,
					n_ischild: 0,
					n_ishouse: 0,
					n_issm: 0,
					n_isstar: 0,
					n_isvip: 0,
					n_jiehuntime: 0,
					n_money: 2,
					n_sex: 2,
					n_sfzh: 0,
					n_sg: 0,
					n_smoke: 0,
					n_tz: 0,
					n_xueli: 1,
					oc_usercode: "3",
					tiaojian: null,
					vc_area: 690,
					vc_city: 75,
					vc_descript: "",
					vc_img: "",
					vc_loveplay: "",
					vc_mz: null,
					vc_nickname: "丽梓",
					vc_province: 5,
					vc_username: null,
					vc_userphone: "13702889930",
					vc_worke: null,
					vc_xinzuo: null
					
				},
				tjData:{
					n_alcohol: "",
					n_child: "",
					n_city: "",
					n_hyzk: "",
					n_ischild: "",
					n_isphoto: "",
					n_max_age: "",
					n_max_sg: "",
					n_max_tz: "",
					n_min_age: "",
					n_min_sg:  "",
					n_min_tz:  "",
					n_money: "",
					n_province: "",
					n_smoke: "",
					n_xueli:  "",
				}
			}	
		},
		computed: {
			//获取store里面数据 
			vUserData() {
				return this.$store.state.vUserData
			}
		},
		props: [],
		methods: {
			clickMe() {
				this.$router.go(-1)
			},
			//用户信息
			getInfos:function(){
				let data = {id:this.$route.query.id};
				if(!data.id){
					return false;
				}
				
				connetAction.ajaxPost(https['getInfo'],data)
				.then((res)=>{
					if(res.status==1){
							 this.userData = res.data;
							 this.tjData = res.data.tiaojian;
							 this.myn_sex =  this.userData.n_sex;
							 // alert(this.myn_sex)
							// 初始化基本数据
							
					}else{
						this.toastip(res.message)
					}	
					
				})
				.catch((res)=>{
					
				})
			},
			//展示图片
			showImg(imgUrl){
				this.img = "http://www.bjxm360.com/"+imgUrl;
				this.isShowImg = true;
			},
			//关闭图片
			hideImg(){
				this.isShowImg = false;
			},
			autoCodeStr:function(num,id,code){
			 let str = "";
			 if(code){
			   str = autoCode[num].filter((item,index,arr)=>item.code == id);
			 }else{
			   str = autoCode[num].filter((item,index,arr)=>item.value == id);
			 }
			  return str.length>0?str[0].text:'';
			},
			cityCodeStr:function(id,code){
			 let str = "";
			 if(code){
			   var data = provinceCode.filter((item,index,arr)=>item.value == id);
			   str = data[0].children.filter((item,index,arr)=>item.pid == id);
			 }else{
			   str = provinceCode.filter((item,index,arr)=>item.value == id);
			 }
			  return str.length>0?str[0].text:'';
			},
			dzh:function(){
				let param = {
					startid:localStorage.openid,
					vc_nickname:this.vUserData.vc_nickname,
					endid:this.$route.query.id
				}
				console.log(param)
				connetAction.ajaxPost(https['dzh'],param)
				.then((res)=>{
					mui.toast(res.message)
				})
				.catch((res)=>{
					
				})
			},
			
			goMsg:function(){
				this.$router.push("./Chatzjxh")
			},
			Hongniang:function(){
				let data = {
					oc_usercode:3
				};
				console.log(1)
				connetAction.ajaxPost(https['addHN'],data)
				.then((res)=>{
					if(res.status==1){
							mui.toast('已成功联系红娘','success')
							
					}else{
						mui.toast(res.message)
					}	
					
				})
				.catch((res)=>{
					
				})
			},
			addGuanzhu:function(){
				let data = {
					startid:localStorage.openid,
					endid:this.$route.query.id
				};
			
				
				connetAction.ajaxPost(https['addGuanzu'],data)
				.then((res)=>{
					if(res.status==1){
							mui.toast(res.message,'suceess');
							// 初始化基本数据
							
					}else{
						mui.toast(res.message)
					}	
					
				})
				.catch((res)=>{
					
				})
			},
		},
		components: {
			navigBar,
			msgBar
		},
		created() {
			this.getInfos();
		},
		mounted() {
			var that = this;        		
        	mui.back = function(){
        		that.$router.push("./center")
        	}
			console.log(this.vUserData);
		}

	}
</script>
<style lang="scss" scoped>
	.selinfocon{
		text-align: left;
	}
	.img{
		width: 66%;
		max-height:55% ;
		margin-top: 25%;
	}
	.h120px{
		background: linear-gradient(#8070f1, #b06cef);
		height: 220px;
	}
	.header{
		padding:0 30px;
		height: 140px;
		display: flex;
	}
	.mytoux{
		width: 130px;
		max-height:200px ;
		position: relative;
		
	}
	.mytoux img{
		width: 100%;
		border-radius: 3px;
		transform: translateY(-50px);
	}
	.phontosbox{
		width: 80%;
		flex: 1;
		margin-left: 10px;
	}
	
	.phontos{
		height: 130px;
	}
	
	.phontos ul {
		display: flex;
	}
	
	.phontos ul  li{
		height: 100px;
		width: 100px;
		background: #000;
		margin-right: 10px;
	}
	.phontos ul  li img{
		width: 100%;
		height: 100%;
	}
	.u_name{
		padding: 10px 30px;
		text-align: left;
		display: flex;
	}
	
	.nickname{
		font-size: 40px;
		line-height: 30px;
		font-weight: bold;
	}
	
	.vcqanxian{
		margin-left:10px;
	}
	.zjcard, .zjvip, .zjstart{
		margin-right: 5px;
	}
	.userinfolist{
		padding: 0 30px 30px;
		text-align: left;
		border-bottom: 1px solid #ddd;
		padding-right: 0;
	}
	.userinfolist .mui-btn{
		font-size: 30px
	}
	.personinfo{
		position: relative;
	}
	.gzbtn{
		position: absolute;
		right: 30px;
		top: 0px;
		padding: 10px 50px;
		font-size: 28px;
		border-radius: 30px;
		line-height: 45px;
	}
	.comomhead{
		padding:0px 30px;
		height: 80px;
		line-height: 80px;
		padding-right: 0;
	}
	.comomhead .brforline{
		position: relative;
		font-size: 30px;
		padding-left: 20px;
	}
	.comomhead .brforline::before{
		position: absolute;
		display: block;
		content: "";
		width: 5px;
		height:100%;
		background: #8070f1;
		top: 0px;
		left: 0px;
	}
	.bbline{
		border-bottom: 1px solid #ddd;
	}
	.ddubaibox{
		min-height: 150px;
		background: #fff;
		font-size:28px;
		padding:20px 30px;
	}
	.ddubaibox div{
		display: inline-block;
		font-size: 26px;
		margin-top: 10px;
	}
	.ziliaonc{
		font-size: 23px
	}
	.userinfoscroll{
		height: 56vh;
		overflow-y: scroll;
	}
</style>