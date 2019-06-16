<!--客服中心 -->
<template>
	<div class="kefu">
		<navigBar :ShowUsericon="true"  :requreClass="`icon-fanhui`"  :titleText="changlan['kefu']['title']" @checkMe="clickMe" ></navigBar>
		<div class="kefcontent">
			<div class="mui-content mui-row mui-fullscreen">
				<div class="mui-col-xs-3">
					<div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
						<a v-for="(data,index) in domlist" :key="" :class="index==0?'mui-control-item mui-active':'mui-control-item'" :href="'#content' + (index+1)">
							<div :class="data.icon+' myicon'"></div>
							<div class="tabcon_val">{{data.name}}</div>	
						</a>
					</div>
				</div>
				<div id="segmentedControlContents" class="mui-col-xs-9">
					<div v-for="(data,index) in dataDetail" :id="'content'+ (index+1)" :class="index==0?'mui-control-content mui-active':'mui-control-content'">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell">{{data}}</li>	
						</ul>
					</div>
				</div>
			</div>
		</div>
		<button type="button" class="mui-btn lxkf" @click="gophone"><span class="iconfont icon-kefu"></span>{{changlan['kefu']['conectserver']}}</button>
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import tabview from '@/components/tabView'; //信息卡片组件
	import grid from '@/components/Grid'; //九宫格
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				domlist:[
					{"icon":"iconfont icon-dingdan","name":"订单"},
					{"icon":"iconfont icon-zhanghu","name":"账户"},
					{"icon":"iconfont icon-xinshoushanglu","name":"软件使用"}
				],
				dataDetail:["内容待更新...","内容待更新...","内容待更新...",]
			}	
		},
		computed: {
			//获取store里面数据 
			changlan() {
				return this.$store.state.langetype
			}
		},
		props: [],
		methods: {
			clickMe() {
				this.$router.push('./center')
			},
			setlang(){
				this.domlist[0]['name'] = this.changlan['kefu']['order']; 
				this.domlist[1]['name'] = this.changlan['kefu']['user']; 
				this.domlist[2]['name'] = this.changlan['kefu']['usesoft']; 
			},
			gophone(){
				try{
					mui.confirm('联系客服', ' ', [this.changlan['index']['yes'],this.changlan['index']['no']], function(e) {
				        if (e.index != 1) {
							plus.device.dial('+79246066677', false );			
				        }
				    })
					
				}catch(e){
					//TODO handle the exception
				}
				
			},
			isLogin(){//是否为登录状态
					var logininfo = window.localStorage.getItem("uid");
					if(!logininfo){
						this.$router.push('./login');
					}
			}
		},
		components: {
			navigBar,
			tabview
		},
		created() {
			this.setlang();
		},
		mounted() {
			var that = this;
			mui.back = function(){
				that.$router.push('./center')
			}
			var controls = document.getElementById("segmentedControls");
			var contents = document.getElementById("segmentedControlContents");
			var html = [];
			
		}

	}
</script>
<style type="text/css">
.kefu{
	text-align: center;
}
.kefu .mui-segmented-control .mui-control-item{
	width: 100%;
	height: 150px;
}
.kefu .mui-col-xs-3, .mui-control-content{
	 overflow-y: auto;
    height: 100%;
}
.kefu .mui-fullscreen{
	top: 80px;
}
.kefu .tabcon_val{
	width: 100%;
	white-space: pre-wrap;
	text-align: center;
	font-size: 24px;
	color: #8c8c8c;
}
.kefu .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
	color: #FDB913;
	border-right:1px solid transparent !important;
}
.kefu .myicon{
	font-size:40px ;
	margin-top: 36px;
	/*margin-bottom: 18px;*/
	
}
.kefu #segmentedControlContents{
	padding-left: 22px;
}
.kefu .mui-segmented-control.mui-segmented-control-inverted.mui-segmented-control-vertical .mui-control-item{
	position: relative;
	background: #fff;
	border-right:1px solid #D1D1D1 ;
}
.kefu .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active:after{
	position: absolute;
	content: "";
	width: 14px;
	height: 100%;
	left: 0;
	top: 0;
	background: #fdb913;
}
.kefu .mui-table-view-cell{
	height: 88px;
	line-height: 88px;
	font-size: 30px;
	color: #4d4d4d;
	padding-top: 0;
}
.kefu .mui-table-view-cell:after {
    -ms-transform: scaleY(1);
     transform: scaleY(1); 
    background-color: #d1d1d1;
}
.kefu .lxkf{
	width: 100%;
	position: fixed;
	z-index: 999;
	background: #FDB913;
	bottom: 0;
	left: 0;
	height: 80px;
	font-size: 30px;
	color: #333;
	z-index: 9999;
}
.kefu .lxkf.mui-btn:enabled:active,.kefu .lxkf:enabled:active{
	background: #FDB913;
	    color: #333;
}
.kefu .lxkf .icon-kefu{
	font-size: 30px;
	margin-right: 16px;
}
</style>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "../assets/css/travel.scss";
</style>