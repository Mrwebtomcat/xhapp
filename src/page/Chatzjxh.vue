<!--消息中心 -->
<template>
	<div class="chats">
		<navigBar :ShowUsericon="1"  :requreClass="`icon-fanhui`"  :titleText="'xx'" @checkMe="clickMe"></navigBar>
		<div class="emailslist">
			<ul>
				<li class="left">
					<img src="../assets/img/index/main.jpg" alt="">
					<div class="suitext">1</div>
				</li>
				<li class="right">
					<div class="suitext">2</div>
					<img src="../assets/img/index/main.jpg" alt="">
				</li>
			</ul>
		</div>
		<SendChat @sendchats="sendval"></SendChat>
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import SendChat from '@/components/SendChat';//信息卡片组件
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				messageList:[], 
				ishowimg:false,
				page:1,
				pageNum:10
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
			clickMe() {
				this.$router.go(-1)
			},
			//页面第一次自动加载ajax
			startUp() {
				var that = this;
				mui.init({
					pullRefresh: {
						container: '#pullrefresh',
						up: {
							style:"circle",
							height: 50, //可选.默认50.触发上拉加载拖动距离
							auto: true, //可选,默认false.自动上拉加载一次
							contentrefresh: that.changlan['money']['refreshingtip'],
							contentnomore: that.changlan['index']['imgtips'],
							callback: that.getData
						}
					}
				});
			},
			//请求ajax
			getData() {
				var that = this;
				return false;
				setTimeout(function(){
					var uid = window.localStorage.getItem("uid");
						if(!uid) {
							that.$router.push('./login');
						}
						var url = that.$BaseUrll + "/index/getPushMessage";
						var data = {
							vc_drcode: uid,
							page: that.page,
							pageNum: that.pageNum,
						};
						
//						if(this.page==1){
//							try{var wt=plus.nativeUI.showWaiting();}catch(e){}
//						}
						
						mui.post(url, data, function(data) {
							var data = JSON.parse(data);
							if(data['status'] == 1) {
//								if(that.page==1){wt.close()};
								var list = data['data'];
								for(var i=0; i<list.length; i++){
									var arr = {};
									arr.id = list[i]['id'];
									arr.title = list[i]['title'];
									arr.content = list[i]['content'];
									arr.dt_addtime = list[i]['dt_addtime'];
									that.messageList.push(arr);
								}
								that.messageList.length>0?that.ishowimg = false:that.ishowimg = true;
								that.page++;
								if(list.length == that.pageNum){
									mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
								}else{
									mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
								}
		
							} else {
								that.messageList.length>0?that.ishowimg = false:that.ishowimg = true;
//								mui.toast(data['message'])
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
								return false;
							}
						}, "json");
				},100)
			},
			//删除消息列表
		  	removeDom(num){
		  		this.messageList.splice(num,1)
		  	},
			sendval:function(val){
				console.log(val,222)
			}
		},
		components: {
			navigBar,
			SendChat
		},
		created() {
			
			
		},
		mounted() {
			
		}

	}
</script>
<style lang="scss" scoped>
	.chats{
		width: 100%;
		height: 100%;
	}
	.emailslist{
		margin-top:80px;
		height:calc(100% - 170px);
	}
	.emailslist ul{
		padding-left: 0;
	}
	.emailslist ul li{
		position: relative;
		height: 80px;
		display: flex;
		align-items:center;
		padding: 0 20px;
	}
	.emailslist li.left{
		justify-content: flex-start;
	}
	.suitext{
		padding: 10px;
		background: #fff;
	}
	.left img{
		width: 60px;
		height: 60px;
		margin-right:20px;
		border-radius: 50%;
	}
	
	
	.right img{
		width: 60px;
		height: 60px;
		margin-left: 20px;
		border-radius: 50%;
	}
	.emailslist li.right{
		justify-content: flex-end;
		
	}
	.right .suitext{
		background: chartreuse;
	}
</style>
