<!--版本更新 produce by jack -->
<template>
	<div class="updatamain">
		<navigBar :ShowUsericon="type"  :requreClass="`icon-fanhui`"  :titleText="changlan['updatapp']['title']" @checkMe="clickMe"></navigBar>
		<img class="tipimg" src="../assets/img/logo.png" alt="" />
		<p class="nowversion">{{changlan['updatapp']['vesiontip']}}：{{version}}</p>
		<!--新版本提示-->
		<p class="nowversion" v-show="isVerision">{{changlan['updatapp']['findInspect']}}：{{newversion}}</p>
		<p class="wxatip" >{{changlan['updatapp']['wxtip']}}</p>	
		<!--检查版本-->
		<button v-if="isdownload==1" type="button" class="mui-btn exit" @click="getData">{{changlan['updatapp']['inspectv']}}<!--j --></button>
		<!--开始下载新版本-->
		<button v-if="isdownload==2" type="button" class="mui-btn exit" @click="startDownloadTask">{{changlan['updatapp']['btnval']}}（{{newversion}}）</button>
		<!--下载中-->
		<div v-if="isdownload==3"  class="exit qx">
			<div class="loading" :style="`width:${loadingwidth}%;` "></div>
			<button type="button" class="mui-btn" @click="cancelDownloadTask">{{changlan['updatapp']['qxval']}}</button>
		</div>
		<!--没有更新版本-->
		<button v-if="isdownload==4" type="button" class="mui-btn exit">{{changlan['updatapp']['newv']}}:{{newversion}}</button>
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				type:1,
				isVerision:false,
				version:"V1.0.0",
				newversion:"V1.0.1",
				isdownload:1,
				loadingwidth:0,
				dtask:null,
				downUrl:"http://www.bjxm360.com/uploads/version/20180807.apk"
			}	
		},
		computed: {
			//获取store里面数据 
			changlan() {
				return this.$store.state.langetype
			},
			getDriverStyle(){
		  		return this.$store.state.isOrderStyle
		  	},
			 getwatchGps(){
			  	return this.$store.state.watchgps
		  	}
		},
		props: [],			
		methods: {
			clickMe(){
				//设置跳转参数
				//如果是从设置跳转 到版本更新则物理按键返回的是设置页
				this.$router.push("./config")
			},
			// 获取本地应用资源版本号
			plusReady(){
				var that =this;
				try{
					plus.runtime.getProperty(plus.runtime.appid,function(inf){
				        that.version=inf.version;
				    });
				}catch(e){
				}
			},
			createDownloadTask(){
				var that = this;
				if(this.version == this.newversion){
					mui.toast(that.changelan['updatapp']['verynewvs']);
					this.isdownload = 4;
					return false;
				}
				//创建下载任务
				if(this.dtask){
//					mui.toast( "下载任务开始创建！" );
					 mui.toast(that.changlan['updatapp']['downtask'])
					return;
				}
				this.isdownload = 3;
				var url=this.downUrl;
			    var options = {method:"GET"};
			    try{
			    	this.dtask = plus.downloader.createDownload( url, options ,function(d,status){
			    		if(status==200){
			    			var path = d.filename;
			    			plus.runtime.install(path,{force:true},function(){
//			    				window.localStorage.removeItem("uid");
			    				plus.runtime.restart();
			    			},function(e){
			    				console.log("failed")
			    			});
			    		}else{
			    			 mui.toast(that.changlan['updatapp']['downfail'])
			    		}
			    	});
				    this.dtask.addEventListener( "statechanged", function(task,status){
				    	if(!that.dtask){return;}
				    	switch(task.state) {
				    		case 1: // 开始
								mui.toast(that.changlan['updatapp']['stardownload'])
				    		break;
				    		case 2: // 已连接到服务器
				    		break;
				    		case 3:	// 已接收到数据
				    			var num = (task.downloadedSize/task.totalSize).toFixed(4);
				    			that.loadingwidth = that.totowbit(num);
				    			if(that.loadingwidth==100){
				    				mui.toast(that.changlan['updatapp']['completedown'])
				    			}
				    			//mui.toast( task.downloadedSize+"/"+task.totalSize );
				    		break;
				    		case 4:	// 下载完成
				    		
				    		break;
				    	}
				    } );
			    }catch(e){}
				
			},
			//启动下载任务
			startDownloadTask(){
				
				
				if(this.getDriverStyle){
					this.stopOrder()
				}
				this.createDownloadTask();
				if (!this.dtask ) {
//					mui.toast( "请先创建下载任务！" );
					return;
				}
				this.dtask.start();
			},
			//取消下载任务
			cancelDownloadTask(){
				var that=this;
					mui.confirm(this.changlan['updatapp']['undorloadtip']," ",[this.changlan['index']['yes'],this.changlan['index']['no']] , function(e) {
						if(e.index==0){
							try{
								that.dtask.abort();
								that.dtask = null;
								that.isdownload = 2;
//								mui.toast( "取消下载任务！" );
							}catch(e){}
						}else{
							
						}
					})
			},
			//停止接单
			stopOrder(){
				var that = this;
				var url = this.$BaseUrll+"/index/updateState";
				var uId  =window.localStorage.getItem("uid");
				var data = {
					vc_drcode:uId,
					n_state:1
				};
				mui.post(url,data,function(data){
					var data = JSON.parse(data);
					if(data['status']==1){
						//停止接单
						that.$store.commit("orderSatus",false);
						
						//关闭监听位置信息
						clearInterval(that.getwatchGps);
					}
				},"json");
			},
			totowbit(num){
				var str = isNaN(num)?num.toString():num;
				var index =str.indexOf('.')+3;
				var result = str.substring(0,index);
				return result*100;
			},
			getData(){
				var url = this.$BaseUrll+"/index/getVersion";
				var that =this;
				var data = {
					vc_drcode:123,
				};
				mui.post(url,data,function(data){
						var data = JSON.parse(data);
						if(data['status']==1){
							that.newversion = data.data.version;
							that.downUrl = "http://www.bjxm360.com" + data.data.url;
							if(that.version == that.newversion){
								mui.toast(that.changlan['updatapp']['verynewvs']);
								that.isdownload = 4;
								that.isVerision = false;
							}else{
								that.isdownload = 2;
								that.isVerision = true;
							}
						}else{
							that.isVerision = false;
							mui.toast(that.changlan['msgtip'][data['message']])
							return false;
						}
					},"json"
				);
			}
		},
		components: {
			navigBar
		},
		created() {
			this.type = this.$router['history']['current']['query']['updatestatus'];
			this.plusReady();
			
		},
		mounted() {
			var that =this;
			//设置跳转参数
			
			mui.back =()=>{
				//如果是从设置跳转 到版本更新则物理按键返回的是设置页
				if(that.type==1){
					that.$router.push("./config")
				}else{
					return false;
				}
			};
		}

	}
</script>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	.updatamain{
		width: 100%;
		height: 100%;
		text-align:center;
		.tipimg{
			margin-top: 220px;
			width: 239px;
		}
		.nowversion{
			margin-top: 28px;
			font-size: 32px;
			color: #4d4d4d;
		}
		.wxatip{
			@extend .nowversion;
			margin-top: 40px;
		}
		.exit{
			width: 600px;
			height: 78px;
			background: #FDB913;
			font-size: 36px;
			color: #333;
			margin-top: 80px;
			border:1px solid #FDB913;
			&.qx{
				position: relative;
				display: inline-block;
				background:#fff;
				.loading{
					position: absolute;
					height: 100%;
					width: 0%;
					left: 0;
					top: 0;
					background: #FDB913;
					text-align: right;
					line-height: 78px;
				}
				.loadingval{
					color: #fff;
				}
				button{
					position: relative;
					z-index: 999;
					width: 100%;
					height: 100%;
					font-size: 36px;
					background: transparent;
				}
			}
		}
	}
</style>