<!--选项卡刷新组件  create by jack on 2018.17.20-->
<template>
	<div class="tabmain">

		<div class="mui-content">
			<div id="slider" class="mui-slider mui-fullscreen sdbox">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper  mui-segmented-control mui-segmented-control-inverted tabvie-header">
					<div class="mui-scroll moneyja_bar">
						<span :class="active==1?'mui-control-item mui-active':'mui-control-item'" @click="typeClick(1)">
							{{menudata['all']}}
						</span>
						<span :class="active==2?'mui-control-item mui-active':'mui-control-item'" @click="typeClick(2)">
							{{menudata['income']}}
						</span>
						<span :class="active==3?'mui-control-item mui-active':'mui-control-item'" @click="typeClick(3)">
							{{menudata['expenditure']}}
						</span>
					</div>
				</div>

				<div class="mui-slider-group">
					<div id="pullrefresh" class="mui-scroll-wrapper">
						<div class="mui-scroll tabvie-con">
							<div v-if="moneyList.length==0"  class="imgtips">
								<img src="../assets/img/index/unmoneytip.png" alt="" />
							</div>
							<ul class="mui-table-view">

								<li class="mui-table-view-cell" v-for="item in moneyList">
									<div class="celltop">{{item.vc_source}}</div>
									<div class="cellbottom">{{item.dt_addtime}}</div>
									<div v-if='item.n_type == 1' class="cellshownum fdb913">+{{item.vc_money}}</div>
									<div v-else class="cellshownum a9cf5">-{{item.vc_money}}</div>
								</li>

							</ul>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active:1, //默认显示全部类型
				type: 1, //1全部  2收入  3支出
				page: 1, //页码
				pageNum: 5, //每页显示的条数
				moneyList: [
//					{
//						vc_money: "100",
//						vc_source: "收到车费",
//						dt_addtime: "2018-09-08 10:10:10",
//						n_type: 1
//					},
//					{
//						vc_money: "200",
//						vc_source: "扣除车费",
//						dt_addtime: "2018-09-08 10:10:10",
//						n_type: 2
//					}
				] //数据集合
			}
		},
		props: ['menudata'],
		methods: {
			//切换请求类型
			typeClick(type){
				this.type = type;
				this.moneyList = [];
				this.page = 1;
				this.getData();
				//重置mui下拉加载
				mui('#pullrefresh').pullRefresh().refresh(true);
				//回到顶部
				mui('#pullrefresh').pullRefresh().scrollTo(0, 0, 500);
			},
			//页面第一次自动加载ajax
			startUp() {
				var that = this;
				mui.init({
					pullRefresh: {
						container: '#pullrefresh',
						up: {
							height: 50, //可选.默认50.触发上拉加载拖动距离
							auto: true, //可选,默认false.自动上拉加载一次
							contentrefresh: that.menudata['refreshingtip'],//key*
							contentnomore: that.menudata['nomoretip'],//*key*
							callback: that.getData
						}
					}
				});
			},
			//请求ajax
			getData() {
				var that = this;
				setTimeout(function(){
					var uid = window.localStorage.getItem("uid");
						if(!uid) {
							that.$router.push('./login');
						}
						var url = that.$BaseUrll + "/Member/moneyList";
						var data = {
							vc_drcode: uid,
							page: that.page,
							pageNum: that.pageNum,
							type: that.type
						};
						mui.post(url, data, function(data) {
							var data = JSON.parse(data);
							if(data['status'] == 1) {
								
								var list = data['data'];
								for(var i=0; i<list.length; i++){
									var arr = {};
									arr.vc_money = list[i]['vc_money'];
									arr.vc_source = list[i]['vc_source'];
									arr.dt_addtime = list[i]['dt_addtime'];
									arr.n_type = list[i]['n_type'];
									that.moneyList.push(arr);
								}
								that.page++;
								if(list.length == that.pageNum){
									mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
								}else{
									mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
								}
								
		
							} else {
//								mui.toast(data['message'])
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
								return false;
							}
						}, "json");
				},100)
			}
		},
		created: function() {
		},
		mounted: function() {
			this.startUp();
		}
	}
</script>
<style type="text/css">
	.tabmain .mui-bar~.mui-content .mui-fullscreen {
		top: 44px;
		height: auto;
	}
	
	.tabmain .mui-pull-top-tips {
		position: absolute;
		top: -20px;
		left: 50%;
		margin-left: -25px;
		width: 40px;
		height: 40px;
		border-radius: 100%;
		z-index: 1;
	}
	
	.tabmain .mui-bar~.mui-pull-top-tips {
		top: 24px;
	}
	.tabmain .mui-fullscreen .mui-segmented-control~.mui-slider-group{
		top: 1.6rem;
	}
	.tabmain .mui-pull-top-wrapper {
		width: 42px;
		height: 42px;
		display: block;
		text-align: center;
		background-color: #efeff4;
		border: 1px solid #ddd;
		border-radius: 25px;
		background-clip: padding-box;
		box-shadow: 0 4px 10px #bbb;
		overflow: hidden;
	}
	
	.tabmain .mui-pull-top-tips.mui-transitioning {
		-webkit-transition-duration: 200ms;
		transition-duration: 200ms;
	}
	
	.tabmain .mui-pull-top-tips .mui-pull-loading {
		/*-webkit-backface-visibility: hidden;
				-webkit-transition-duration: 400ms;
				transition-duration: 400ms;*/
		margin: 0;
	}
	
	.tabmain.mui-pull-top-wrapper .mui-icon,
	.tabmain .mui-pull-top-wrapper .mui-spinner {
		margin-top: 7px;
	}
	
	.tabmain .mui-pull-top-wrapper .mui-icon.mui-reverse {
		/*-webkit-transform: rotate(180deg) translateZ(0);*/
	}
	
	.tabmain .mui-pull-bottom-tips {
		text-align: center;
		background-color: #efeff4;
		font-size: 15px;
		line-height: 40px;
		color: #777;
	}
	
	.tabmain .mui-pull-top-canvas {
		overflow: hidden;
		background-color: #fafafa;
		border-radius: 40px;
		box-shadow: 0 4px 10px #bbb;
		width: 40px;
		height: 40px;
		margin: 0 auto;
	}
	
	.tabmain .mui-pull-top-canvas canvas {
		width: 40px;
	}
	
	.tabmain .mui-slider-indicator.mui-segmented-control {
		background-color: #efeff4;
	}
	.tabmain .mui-pull-caption{
		font-size: 26px;
	}
</style>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "./css/tablview.scss";
</style>