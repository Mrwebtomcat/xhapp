<!--消息中心 -->
<template>
	<div class="emails">
		<!-- <navigBar :ShowUsericon="true"  :requreClass="`icon-fanhui`"  :titleText="changlan['index']['infocenter']" @checkMe="clickMe"></navigBar> -->
		<div class="emailslist">
			<div id="pullrefresh" class="mui-content mui-scroll-wrapper" >
				<div class="unorderimg" v-show="ishowimg">
					<img src="../assets/img/index/unodertip.png" class="tipimgs"  />
				</div>
				<div class="mui-scroll" >
					<MsgCard></MsgCard>
					<MsgCard  v-for="(cartlit,index) in messageList" :key="index" :notivtitle="cartlit['title']" :time="cartlit['dt_addtime']"  :cadAreaText="cartlit['content']" ></MsgCard>
				</div>
			</div>		
		</div>
		
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import MsgCard from '@/components/MsgCard';//信息卡片组件
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
				if(this.getDriverStyle){
					this.$router.push({ name:'Index', params: {type: 1} });
				}else{
					this.$router.push({ name:'Index', params: {type: 0} });
				}
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
		  	}
		},
		components: {
			navigBar,
			MsgCard
		},
		created() {
			for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
		          item=mui.hooks.inits[i];
		          if(item.name=="pullrefresh"){
		              item.repeat=true;
		          }
		      }
			
		},
		mounted() {
			this.startUp();
			var that = this;
			 mui.back =function(){
			 	if(that.getDriverStyle){
					that.$router.push({ name:'Index', params: {type: 1} });
				}else{
					that.$router.push({ name:'Index', params: {type: 0} });
				}
			 }
		}

	}
</script>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	.emails{
		width: 100%;
		height: 100%;
		#pullrefresh{
			top: 80px;
		}
		
		.emailslist{
			width: 100%;
			height: 100%;
			overflow-y:scroll;
			box-sizing:border-box;
			.mui-scroll{
				height: 100%;
				/*overflow-y: scroll;*/
			}
		}
		.unorderimg{
			width: 100%;
			text-align:center;
			position: absolute;
			left: 0;
			top: 80px;
			img{
				margin-top: 160px;
				width: 640px;
			}
			.ptips{
                font-size: 36px;
                text-align: center;
                padding-top: 10px;
            }
            
		}
		.mui-visibility{
        	display: none;
        }
	}
	.card_con{
		.cardarea{
			text-align: left;
		}
	}
</style>
<style type="text/css">
	.emails .mui-pull-bottom-pocket{
			height: 1rem !important;
	}
	.emails .mui-pull-caption{
		font-size: 28px;
	}
</style>