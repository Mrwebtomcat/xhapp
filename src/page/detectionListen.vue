<!--听单检测 -->
<template>
    <div class="listen">
        <navigBar :ShowUsericon="true" :requreClass="`icon-fanhui`" :titleText="changlan['listen']['title']" @checkMe="clickMe"></navigBar>
        <div class="listencard">
            <div class="crilebpox">
                <div class="circleProgress_wrapper">
                    <div class="wrapper right">
                        <div :class="devState==1?'circleProgress rightcircle ative':this.textval==changlan['listen']['listenend']?'circleProgress rightcircle green':'circleProgress rightcircle'"></div>
                    </div>
                    <div class="wrapper left">
                        <div :class="devState==1?'circleProgress leftcircle ative':this.textval==changlan['listen']['listenend']?'circleProgress leftcircle green':'circleProgress leftcircle'"></div>
                    </div>
                    <div class="statxt" @click="startclent" v-if="!devState">{{textval}}</div>
                    <div class="statxt"  v-else>{{textval}}</div>
                </div>
            </div>
        </div>
        <div class="listenmian">
            <!--正在检测-->
            <ul class="mui-table-view" v-if="clientState==1">
                <li class="mui-table-view-cell">
                    <span class="iconfont icon-wangluo"></span>
                    {{changlan['listen']['networke']}}
                    <span v-if="netWorke==1" class="mui-badge iconfont icon-dui f40 green"></span>
                    <span v-else-if="netWorke==0" class="mui-badge iconfont icon-yichanghuotixing f40 red"></span>
					<span v-else class="mui-badge">{{listenval}}</span>

                </li>
                <li class="mui-table-view-cell">
                    <span class="iconfont icon-dingwei"></span>
                    {{changlan['listen']['gps']}}
                    <span  v-if="gpsState==1" class="mui-badge iconfont icon-dui f40 green"></span>
                    <span  v-else-if="gpsState==0" class="mui-badge iconfont icon-yichanghuotixing f40 red"></span>
                    <span v-else class="mui-badge">{{gpsval}}</span>
                </li>
                <li class="mui-table-view-cell">
                    <span class="iconfont icon-zhanghu1"></span>
                    {{changlan['listen']['user']}}
                    <span v-if="userState==1" class="mui-badge iconfont icon-dui f40 green"></span>
                    <span  v-else-if="userState==0" class="mui-badge iconfont icon-yichanghuotixing f40 red"></span>
                     <span v-else class="mui-badge">{{userval}}</span>
                </li>
                <li class="mui-table-view-cell">
                    <span class="iconfont icon-anquanjiance"></span>
                    {{changlan['listen']['orderstate']}}
                    <span v-if="orderState==1" class="mui-badge iconfont icon-dui f40 green"></span>
                    <span  v-else-if="orderState==0" class="mui-badge iconfont icon-yichanghuotixing f40 red"></span>
                    <span v-else class="mui-badge">{{allval}}</span>
                </li>
            </ul>
            <!--检测正常-->
            <ul class="mui-table-view" v-else-if="clientState==2">
                <li class="mui-table-view-cell tc">
                    <span class="iconfont icon-dui green f44"></span>
                    <span class="green"> {{changlan['listen']['normal']}}</span>
                </li>
            </ul>
            <!--检测异常-->
            <ul class="mui-table-view" v-else="clientState==3">
                <li class="mui-table-view-cell tc heiauto">
                    <span class="iconfont icon-yichanghuotixing red f44"></span>
                    <span class="red"> {{changlan['listen']['nowyicsate']}}</span>
                    <p v-if="!netWorke">
                    	 {{changlan['listen']['neterr']}}
                    </p>
                    <p v-if="!gpsState">
                    	 {{changlan['listen']['gpserr']}}
                    </p>
                    <p v-if="!userState">
                    	 {{changlan['listen']['usererr']}}
                    </p>
                    <p v-if="!orderState">
                    	 {{changlan['listen']['ordererr']}}
                    </p>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
    import grid from '@/components/Grid'; //九宫格
    import {mapGetters,mapMutations} from 'vuex';
    export default {
        data() {
            return {
                devState: false, //判断状态动画
                clientState: 1, //检测失败 成功 初始化 的UI
                textval: "开始检测", //状态圈的值
                gpsval: "待检测", //定位服务val
                userval: "待检测", //用户状态val
                allval: "待检测", //听单状态的val
                listenval: '待检测', //网络val
                gpsState: 2, //GPS状态  2显示文字  1显示成功图标  0失败的图标
                netWorke: 2, //网络状态  2显示文字  1显示成功图标  0失败的图标
                userState: 2, //用户状态  2显示文字  1显示成功图标  0失败的图标
                orderState: 2, //挺单状态  2显示文字  1显示成功图标  0失败的图标
                clikstatues:0
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
            //开始检测
            startclent() {
            	//开始动画
				this.devState = true;
				//显示待检测列表模板
                this.clientState = 1;
                //讲动画中的内容修改为检测中
               	this.textval =this.changlan['listen']['listengoiing'] ;
	            //重置初始化化value
	            this.gpsval = this.changlan['listen']['waitting'];
	            this.userval = this.changlan['listen']['waitting'];
	            this.allval = this.changlan['listen']['waitting'];
	            //检测设备网络
				this.plusReady();
            },
            //检测设备网络
            plusReady() {
            	var that = this;
            	this.listenval = this.changlan['listen']['listengoiing'];
				setTimeout(function(){
					//判断是否有网络
	    			if(navigator.onLine){
	    				that.netWorke = 1;
	    			}else{
	    				that.netWorke = 0;
	    			}
	    			
	    			//GPS服务
                	that.isGps(); 
				},1500) 
            },
            //检测是否开启GPS
            isGps() { 
        
                var that = this;
                this.gpsval = this.changlan['listen']['listengoiing'];
                
                setTimeout(function(){
                
	                mui.plusReady(function(){
	                	if (plus.os.name == "Android") {
		                    var context = plus.android.importClass("android.content.Context");
						    var locationManager=plus.android.importClass("android.location.LocationManager");
						    var main=plus.android.runtimeMainActivity();
						    var mainSvr=main.getSystemService(context.LOCATION_SERVICE);
						    var androidIsOpen=mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
	
		                    if (androidIsOpen) {
		                    	
		                    	//gps已开启，再次判断当前应用是否可以获取定位
		                    	plus.geolocation.getCurrentPosition(function (p){
									var codns = p.coords;
			//						console.log('经纬度',codns);
									if(codns['longitude'].toString().indexOf("-")>-1 || codns['latitude'].toString().indexOf("-")>-1){
										that.gpsState = 0;
									}else{
										that.gpsState = 1;//已经开启GPS并且可以正常获取定位  0关闭 1开启 2开启中
									}
			
								}, function ( e ) {
									that.gpsState = 0;
								}, {geocode:true,provider:'amap'} );
		                    	
		                    } else {
		                        that.gpsState = 0;//已经开启GPS  0关闭 1开启 2开启中
		                    }
		                } else {
		                    //ios 判断是否开启GPS通过地理位置获取判断
		                    mui.plusReady(function () {
		                        plus.geolocation.getCurrentPosition(that.translatePoint, function (e) {
		                        	that.gpsState = 0;
		//                          mui.toast("异常:" + e.message);
		                        });
		                    });
		                }
	       			});
	       			
	       			//检测账号状态
	               	that.isLogin();
	       			
       			},1500) 
            },
            translatePoint() {
            	this.gpsState = 1;
            },
            isLogin() { //是否为登录状态
            	var that = this;
            	var uid = window.localStorage.getItem("uid");
                this.userval = this.changlan['listen']['listengoiing'];
				setTimeout(function(){

	                if (!uid) {
	                    that.userState = 0;
	                } else {
	                    that.userState = 1;
	                }
			
	                //检测完成
	                that.isOrder();
                },1500) 
            },
            isOrder() {
            	this.allval = this.changlan['listen']['listengoiing'];
            	var that = this;
            	
            	setTimeout(function(){
            		if(that.getDriverStyle){
						that.orderState = 1;
					}else{
						that.orderState = 0;
					}
            		that.complete();
            	},1500) 
            },
            complete() { //检测完成
                var that = this;
                
                if (that.gpsState && that.netWorke && that.userState && that.orderState) {
                    that.clientState = 2;
                } else {
                    that.clientState = 3;
                }
                that.textval = that.changlan['listen']['listenend'];
                that.devState = false;

            },
			setlangtem(){//设置语言模板
				this.textval= this.changlan['listen']['listenstart']; //状态圈的值"检测开始"
				this.listenval=this.changlan['listen']['waitting']; //听单状态的val'待检测'
				this.listenval=this.changlan['listen']['waitting'] ; //听单状态的val'待检测'
				this.gpsval=this.changlan['listen']['waitting'] ; //听单状态的val'待检测'
				this.allval=this.changlan['listen']['waitting'] ; //听单状态的val'待检测'
				this.userval=this.changlan['listen']['waitting'] ; //听单状态的val'待检测'
			}
        },
        components: {
            navigBar
        },
        created() {
			this.setlangtem();
        },
        mounted() {
			var that = this;        		
        	mui.back = function(){
        		that.$router.push("./center")
        	}
        }

    }
</script>
<style type="text/css">
.listen .circleProgress_wrapper {
	width: 256px;
	height: 256px;
	position: relative;
	border: 1px solid transparent;
	margin: auto;
	transform: translateY(80px);
}

.listen .wrapper {
	width: 128px;
	height: 256px;
	position: absolute;
	top: 0;
	overflow: hidden;
}

.listen .right {
	right: 0;
}

.listen .left {
	left: 0;
}

.listen .circleProgress {
	width: 256px;
	height: 256px;
	border: 10px solid rgb(232, 232, 12);
	border-radius: 50%;
	position: absolute;
	top: 0;
	-webkit-transform: rotate(45deg);
}

.listen .rightcircle {
	border-top: 10px solid yellow;
	border-right: 10px solid yellow;
	right: 0;
}

.listen .rightcircle.ative {
	-webkit-animation: circleProgressLoad_right 5s linear infinite;
}

.listen .leftcircle {
	border-bottom: 10px solid yellow;
	border-left: 10px solid yellow;
	left: 0;
}

.leftcircle.ative {
	-webkit-animation: circleProgressLoad_left 5s linear infinite;
}

@-webkit-keyframes circleProgressLoad_right {
	0% {
		border-top: 10px solid #ED1A1A;
		border-right: 10px solid #ED1A1A;
		-webkit-transform: rotate(45deg);
	}
	50% {
		border-top: 10px solid rgb(232, 232, 12);
		border-right: 10px solid rgb(232, 232, 12);
		border-left: 10px solid rgb(81, 197, 81);
		border-bottom: 10px solid rgb(81, 197, 81);
		-webkit-transform: rotate(225deg);
	}
	100% {
		border-left: 10px solid green;
		border-bottom: 10px solid green;
		-webkit-transform: rotate(225deg);
	}
}

@-webkit-keyframes circleProgressLoad_left {
	0% {
		border-bottom: 10px solid #ED1A1A;
		border-left: 10px solid #ED1A1A;
		-webkit-transform: rotate(45deg);
	}
	50% {
		border-bottom: 10px solid rgb(232, 232, 12);
		border-left: 10px solid rgb(232, 232, 12);
		border-top: 10px solid rgb(81, 197, 81);
		border-right: 10px solid rgb(81, 197, 81);
		-webkit-transform: rotate(45deg);
	}
	100% {
		border-top: 10px solid green;
		border-right: 10px solid green;
		border-bottom: 10px solid green;
		border-left: 10px solid green;
		-webkit-transform: rotate(225deg);
	}
}

.listen .leftcircle.green,
.rightcircle.green {
	border-color: green;
}
</style>
<style lang="scss" scoped>
    @import "../assets/css/minx.scss";
    @import "../assets/css/listen.scss";
</style>
