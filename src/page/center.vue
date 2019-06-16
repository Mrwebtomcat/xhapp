<!--个人中心 -->
<template>
	<div>
		<navigBar :ShowUsericon="true" :titleBg="1" :showRighticon="true" :requreClass="`icon-fanhui`" :rightClass="`icon-shezhi`" :titleText="'我'" @checkMe="clickMe" @iconRight="righconfig"></navigBar>
		<div class="useinfocard">
			<div class="cardlogo">
				<img src="http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg" alt="北极熊猫" />
			</div>
			<div class="cardright" @click="dolink('./EditInfo')">
				<div class="username">我是谁</div>
				<div class="cfff">广东 | 湛江 | 大专 | 177cm</div>.
				<div class="deraion_left">个人描述</div>
				<div>
					<img src="" alt="" />
					<img src="" alt="" />
					<img src="" alt="" />
					<img src="" alt="" />
				</div>
				
			</div>
		</div>
		<div class="centercon">
			<!-- <grid :griddata="gidDtail"></grid> -->
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @click.stop="dolink('./Card')"> <a class="mui-navigate-right"><i class="iconfont icon-renzheng rzicon"></i> 我的认证</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./LLInfo')"> <a class="mui-navigate-right"><i class="iconfont icon-kejian-copy llicon"></i>谁看过我</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./Guanzhu')"> <a class="mui-navigate-right"><i class="iconfont icon-aixin fguanz"></i>关注我</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./vip')"> <a class="mui-navigate-right"><i class="iconfont icon-huangguan jmicon"></i>金梦会员</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./start')"> <a class="mui-navigate-right"><i class="iconfont icon-xingxing jmicon"></i>金梦星级</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./Vip')"> <a class="mui-navigate-right"><i class="iconfont icon-huabanfuben shopicon"></i>直营门店</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./SetTJinfo')"> <a class="mui-navigate-right"><i class="iconfont icon-icon_set_up conficon"></i>资料设置</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./SetSystem')"> <a class="mui-navigate-right"><i class="iconfont icon-icon_set_up conficon"></i>系统设置</a></li>
				<li class="mui-table-view-cell"  @click.stop="dolink('./login')"> <a class="mui-navigate-right"><i class="iconfont icon-icon_set_up conficon"></i>退出登录</a></li>
			</ul>
		</div>
	</div>
</template>
<script>
import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
import start from '@/components/Start'; //信息卡片组件
import grid from '@/components/Grid'; //九宫格
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			gidDtail: [{
					itmename: "会员中心",
					icon: "icon-wallet",
					routeurl:"vip"
				},
				{
					itmename: "我的行程",
					icon: "icon-hangcheng_fill",
					routeurl:"travel"
				},
				{
					itmename: "我的信息",
					icon: "icon-wodewodexinxi",
					routeurl:"seltinfo"
				},
				{
					itmename: "推荐有奖",
					icon: "icon-tuijianyoujiang",
					routeurl:""
				},
				{
					itmename: "客服中心",
					icon: "icon-kefu",
					routeurl:"kefu"
				},
				{
					itmename: "听单检测",
					icon: "icon-anquanjiance",
					routeurl:"detectionlisten"
				}
			],
			userName:'北极熊猫',
			userImg:'http://www.bjxm360.com/static/home/img/logo.jpg',
		}
	},
	computed: {
		//获取store里面数据 
		changlan() {
			return this.$store.state.langetype
		},
		getDriverStyle(){
	  		return this.$store.state.isOrderStyle
	  	}
	},
	props: [],
	methods: {
		//返回上一级
		clickMe() {
			this.$router.go(-1);
		},
		dolink(url){
			this.$router.push(url)
		},
		//点击设置
		righconfig() {
			
		},
		//获取用户信息接口
		getUserInfo(){
			var uid = window.localStorage.getItem("uid");
			if(!uid){
				this.$router.push('./login');
			}
			var url = this.$BaseUrll+"/Member/index";
			var data = {
				vc_drcode:uid,
				type:1
			};

			var that = this;
			mui.post(url,data,function(data){
					var data = JSON.parse(data);
					if(data['status']==1){
						that.userName = data['data'].vc_name;
						if(data['data'].vc_hred_img != '0'){
							that.userImg = "http://www.bjxm360.com"+data['data'].vc_hred_img;
						}
						that.userStar = data['data'].vc_star;
					}else{
						mui.toast(data['message'])
						return false;
					}
				},"json"
			);
		},
		//开始默认设置语言模板
		setLange(){
			this.gidDtail[0]['itmename'] = this.changlan['center']['wallet'];
			this.gidDtail[1]['itmename'] = this.changlan['center']['travel'];
			this.gidDtail[2]['itmename'] = this.changlan['center']['info'];
			this.gidDtail[3]['itmename'] = this.changlan['center']['rewrad'];
			this.gidDtail[4]['itmename'] = this.changlan['center']['cusService'];
			this.gidDtail[5]['itmename'] = this.changlan['center']['orderTest'];
			console.log(this.gidDtail)
		}
	},
	components: {
		navigBar,
		start,
		grid
	},
	created() {
		// this.getUserInfo();
		// this.setLange();
	},
	mounted() {
		var that = this;
		// mui.back = function(){
		// 	if(that.getDriverStyle){
		// 		that.$router.push({ name:'Index', params: {type: 1} });
		// 	}else{
		// 		that.$router.push({ name:'Index', params: {type: 0} });
		// 	}
		// }
	}

}
</script>
<style scoped>
	.title{
		background: transparent;
	}
	.oli {
		height: 225px !important;
	}
	.oli a {
		display: block !important;
		margin-top: 50px !important;
		overflow: initial !important;
		white-space: normal !important;
	}
	.grid .mui-grid-view.mui-grid-9 .mui-media,
	.grid .mui-grid-view.mui-grid-9,
	.grid .mui-content {
		background: transparent;
	}
	.indexmain{
		top: 0 !important;
	}
	.deraion_left{
		text-align: left;
		color: #fff;
	}
	.mui-table-view{
		width: 100%;
		margin: auto;
	}
	.mui-table-view li a{
		font-size: 30px;
	    padding:35px 30px;
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
</style>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "../assets/css/center.scss";
</style>