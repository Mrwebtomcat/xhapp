<!--个人中心 -->
<template>
	<div class="travel">
		<navigBar :ShowUsericon="true"  :requreClass="`icon-fanhui`"  :titleText="changlan['travel']['title']" @checkMe="clickMe"></navigBar>
		<div class="scrolljctral">
			<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
				<div class="mui-scroll">
					<div v-if="orderList.length==0"  class="imgtips">
						<img src="../assets/img/index/untraveltip.png" alt="北极熊猫" />
					</div>
					<!--数据列表-->
					<ul class="mui-table-view mui-table-view-chevron">
						<li v-for="item in orderList" class="mui-table-view-cell" @tap="gotravel(item)">
							<dl class="travellistdl">
								<dd class="mt30">
									<span class="f30">{{traveltype(item.n_state)}}</span> 
									<span v-if="item.n_state==4">（{{item.n_day&&item.n_day!=0.5?item.n_day:'半'}}天）</span>
									<div class="statemoney">
										<span class="trave_type">({{travelstatus(item.n_otype)}})</span>
										<span class="moneyshow">{{parseInt(item.n_pay_money)}}  <i class="iconfont icon-lubu" style="font-size: 12px;"></i></span>
									</div> 
								</dd>
								<dd class="mt32"><span class="iconfont icon-shijian time"></span>{{item.dt_starttime}}</dd>
								<dd class="mt24"><span class="iconfont icon-weizhi start"></span>{{item.vc_start_place}}</dd>
								<dd class="mt22" v-if="item.n_state!=4"><span class="iconfont icon-weizhi end"></span>{{item.vc_destination}}</dd>
							</dl>
							<!--<span class="mui-btn statusbtn">{{travelstatus(item.n_otype)}}</span>-->
							<!--<span class="moneyshow">{{item.n_pay_money}}  {{changlan['travel']['rb']}}</span>-->
						</li>
					</ul>
				</div>
			</div>
			
		</div>
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
				orderList:[
//					{
//						vc_order_sn:'123',
//						n_otype:3,
//						n_pay_money:500,
//						vc_start_place:'起点',
//						vc_destination:'终点',
//						dt_starttime:'2018-09-08 10:10:10',
//						n_state:4,
//						n_day:6
//					}
				],
				page:1,
				pageNum:10
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
				this.$router.go(-1);
			},
			gotravel(data){
				
				//判断是否可以进入订单详情
				if(data.n_otype != 3){
					return false;
				}
				
				//将订单内容赋值给全局变量
				var dipatchData = {
								id:data.vc_order_sn,
							 	money:data.n_pay_money,
							 	time:data.dt_starttime,
							 	start:data.vc_start_place,
								end:data.vc_destination,
								bz:data.vc_remarks,
								startjw:data.vc_startjw,
								endjw:data.vc_endjw,
								//出行方式
								n_state:data.n_state,
								//是否携带儿童  0没有 1携带
								n_ischild:data.n_ischild,
								//携带儿童数量
								vc_child_num :data.vc_child_num,
								//包车天数
								n_day:data.n_day 
							}

				this.$store.commit("changedriverData",dipatchData);
				
				this.$router.push({ name:'dispatch',query:{ satus: data.n_isdckqd}});
			},
			//出行类型
			traveltype(val){
				 var str=""; 
				 switch (Number(val)){
				 	case 1:
				 		str = this.changlan['index']['jieji'];
				 		break;
				 	case 2:
				 		str = this.changlan['index']['songji'];
				 		break;
				 	case 4:
				 		str = this.changlan['index']['baoche'];
				 		break;
				 	case 6:
				 		str = this.changlan['index']['zhuanxian'];
				 		break;
				 	default:
				 		str = this.changlan['index']['taxi'];
				 		break;
				 }
			  return str;
			},
			travelstatus(val){
 				var str = "";
				switch (Number(val)){
					case 3:
						str = this.changlan['travel']['waitarive'];
						break;
					case 4:
						str = this.changlan['travel']['waitevalue'];
						break;
					case 5:
						str = this.changlan['travel']['complete'];
						break;
//					case 6:
//						str = this.changlan['travel']['sqrefund'];
//						break;
//					case 7:
//						str = this.changlan['travel']['orderclose'];
//						break;
					default:
						break;
				}
				return str;
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
							contentnomore: that.changlan['money']['nomoretip'],
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
						var url = that.$BaseUrll + "/Member/orderList";
						var data = {
							vc_drcode: uid,
							page: that.page,
							pageNum: that.pageNum,
						};
				
						mui.post(url, data, function(data) {
							var data = JSON.parse(data);
							console.log(data,32312)
							if(data['status'] == 1) {
								
								var list = data['data'];
								for(var i=0; i<list.length; i++){
									var arr = {};
									arr.vc_order_sn = list[i]['vc_order_sn'];
									arr.n_otype = list[i]['n_otype'];
									arr.n_pay_money = list[i]['n_pay_money'];
									arr.vc_start_place = list[i]['vc_start_place'];
									arr.vc_destination = list[i]['vc_destination'];
									arr.dt_starttime = list[i]['dt_starttime'];
									arr.vc_remarks = list[i]['vc_remarks'];
									arr.vc_startjw = list[i]['vc_startjw'];
									arr.vc_endjw = list[i]['vc_endjw'];
									arr.n_state = list[i]['n_state'];
									arr.n_ischild = list[i]['n_ischild'];
									arr.vc_child_num = list[i]['vc_child_num'];
									arr.n_isdckqd = list[i]['n_isdckqd'];
									arr.n_isdckqd = list[i]['n_isdckqd'];
									//包车天数
									arr.n_day=list[i]['n_day'];
									that.orderList.push(arr);
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
        	mui.back = function(){
        		that.$router.push("./center")
        	}
		},
		components: {
			navigBar,
			tabview
		}

	}
</script>
<style type="text/css">
	.travel .mui-table-view{
		background: transparent;
	}
	.travel .mui-table-view{
		border:1px solid transparent;
	}
	.travel .mui-table-view-cell{
		position: relative;
            width: 694px;
            min-height: 204px;
            border:1px solid #FDB913;
            border-radius: 10px;
            margin:20px auto;
            background: #fff;
            text-align: left;
            overflow: hidden;
            padding-top: 0;
            padding-right: 0 !important;
            
    }
    .travel .time,.travel .start,.travel .end{
       font-size: 28px;
       margin-right: 10px;
    }   
    .travel .time{
        color: #333;
    } 
    .travel .start{
        color: #18cf69;
    }
    .travel .end{
        color: #FDB913;
    }
    .travel .statusbtn{
       position: absolute;
        top: 22px;
        right: 0;
        min-width: 170px;
        height: 55px;
        background: #FDB913;
        font-size:30px;
        color: #4d4d4d;
    }
    .travel dd{
    	-webkit-margin-start: 0px;
    	width: 100%;
    }
    .travel .mui-pull-caption{
    	font-size: 26px;
    	color: #a6a6a6;
    }
    .travel .mui-pull-bottom-pocket{
    	margin-top: 40px;
    	height: 60px;
    }
</style>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "../assets/css/travel.scss";
</style>