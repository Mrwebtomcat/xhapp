<!--navbarTop展示组件 produce by jack on 2018-7-10-->
<template>
  	<div class="going-info-card">
  		
  		<div class="liitem cartheader">
			<span>{{traveltype(cardata['n_state'])}}</span>
			<span v-if="cardata['n_state']==4">（{{cardata['n_day']==0.5?'半':cardata['n_day']}}天）</span>
		 </div>
  		<ul>
			    <li class="liitem psr">
			    	<span class="iconfont icon-shijian time"></span>
			    	<span class="timetxt">{{cardata['time']}}</span>
			    	<div class="moneybox">{{parseInt(cardata['money'])}}<span class="iconfont icon-lubu"></span></div>
			    </li>
			    <li class="liitem mt26" @click.stop="callappstart">
			    	<span class="iconfont icon-yuandianzuobiao time c1afa29"></span>
			    	<span class="adrestxt">{{cardata['start']}}</span>
			    </li>
			    <li v-if="cardata['n_state']!=4" class="liitem mt26" @click.stop="callappend">
			    	<span class="iconfont icon-yuandianzuobiao time cfdb914"></span>
			    	<span class="adrestxt">{{cardata['end']}}</span>
			    </li>
			    <li class="liitem mt26 a6 li_bz_tx" v-if="cardata['bz']!=''">
			    	<span class="iconfont icon-beizhu time a6"></span>
			    	<span class="adrestxt">{{cardata['bz']}}</span>
			    </li>
			    <li  class="liitem mt26 mb1rem">
			    	<span class="iconfont icon-ertongyouhui time et"></span>
			    	<span>&nbsp;{{btnText['index']['ischilds']}} :</span>
			    	<span class="adrentxt">{{cardata['n_ischild']==0?btnText['index']['no']:isChildmotext(cardata['vc_child_num'])}}</span>
			    </li>
			   
			</ul>

			<div class="btnlist">
				<!--<button v-if="cardType==2" type="button" class="mui-btn mui-btn-warning detialbtn" @click.stop="receiveuser">{{btnText['dispatchdetail']['receivePass']}}<!--到达乘客起点</button>-->
				<!--<button v-else type="button" class="mui-btn mui-btn-warning detialbtn" @click.stop="end">{{cardata['n_state']!=4?btnText['dispatchdetail']['arviend']:'结束行程'}}<!--到达终点</button>-->
				<div 
					class="stage"
				>
					<div class="slider" id="slider" :style="`background:${autoBg}`">
						<div class="label">{{tipText}}</div>
						<div :class="oTrack" id="track" :style="`width:${oLeft}px;`">
							<div class="bg-green"></div>
						</div>
						<div 
							:class="oBtn" 
							id="btn" 
							:style="`left:${oLeft}px;`"
							@touchstart.prvent="handelTouchStart($event)"
							@touchmove="handelTouchMove($event)"
							@touchend="handelTouchEnd($event)"
						>
							<!--<div class="icon" id="icon" v-show="iconIshow"></div>-->
							<div class="icon" id="icon"></div>
							<div class="spinner" id="spinner" v-show="false"></div>
						</div>
					</div>
				</div>
			</div>
			
  	</div>
</template>
<script>
export default {
  data () {
    return {
      	msg: '',
		animate:"lineground",
		autoicon:"icon-zhanghu",
		btOnOff:0,
		flag:1,//滑动表示
		oW:0,//滑动过程的距离
		oBtn:"button",//按钮类名
		oTrack:"track",//进度条lei名
		oLeft:6,//滑动距离左侧的距离
		iconIshow:true,
		isSpiner:false,
		globalW:0,//全局滑动比较条件
		chanSlidnum:1,//1执行 到达用户起点 2到达用户终点
		tipText:'滑动到达乘客起点',
		autoBg:'-webkit-linear-gradient(top,#111b30,#3e465e)'//滑动按钮切换底色
    }
  },
  props:["btnText","cardType","cardata","qrBtn",'qrbtntext'],
  methods: {
  		//儿童方式
  		isChildmotext(val){
  			var arr = val.split(',');
  			var str = "";
  			if(arr[0] != 0){
  				str += '0~3岁儿童'+arr[0]+'位';
  			}
  			if(arr[1] != 0){
  				str += '3~7岁儿童'+arr[1]+'位';
  			}
			return str;
  		},
		receiveuser(){
			this.$emit("userarive",this.cardata['id']);
		},
		end(){
			this.$emit("userend",this.cardata['id'])
		},
		//唤起app 司机导航到乘客目的地
		callappend(){
			this.$emit("gpsappend")
		},
		//唤起app 司机导航到乘客出发地
		callappstart(){
			this.$emit("gpsappstart")
		},
		traveltype(val){
			 var str=""; 
			 switch (Number(val)){
			 	case 1:
			 		str = '接机';
			 		break;
			 	case 2:
			 		str = '送机';
			 		break;
			 	case 4:
			 		str = '包车';
			 		break;
			 	case 6:
			 		str = '中文专线';
			 		break;
			 	default:
			 		str = '出租';
			 		break;
			 		
			 }
		  return str;
		},
		handelTouchStart(e) {
				var myBtn = document.getElementById('btn');
				if(this.flag == 1) {
					var touches = e.touches[0];
					this.oW = touches.clientX - myBtn.offsetLeft;
					
//					重置图标	
//					this.oBtn = "button"; 
//					this.oTrack = "track";

				}
			},
			handelTouchMove(e){
				var myBtn = document.getElementById('btn');
				if(this.flag == 1) {
					var touches = e.touches[0];
					this.oLeft = touches.clientX - this.oW;
					this.globalW = touches.clientX - this.oW;
					if(this.oLeft < 0) {
						this.oLeft = 6;
					} else if(this.oLeft > document.documentElement.clientWidth - myBtn.offsetWidth - 36) {
						this.oLeft = (document.documentElement.clientWidth - myBtn.offsetWidth - 36);
					}
				}
			},
			handelTouchEnd(e){
				var myBtn = document.getElementById('btn');
				var oSlider= document.getElementById('slider');
				var that = this;
				var maxw = oSlider.clientWidth - myBtn.clientWidth;
				if(this.globalW >= maxw) {
					this.oLeft = (document.documentElement.clientWidth - myBtn.offsetWidth - 36);
					
//					滑动右侧后第一次图标隐藏
//					this.isSpiner = true;
//					this.iconIshow = false;

					this.flag = 0;
					
					//判断滑动次数来更新司机的操作  1是到用户起点 2是到用户终点
					if(this.chanSlidnum==1){
						this.receiveuser();
						this.cardata['n_state']==4?this.tipText = "滑动行程结束":this.tipText = "滑动到达乘客终点";
						this.chanSlidnum = 2;
						this.autoBg = '-webkit-linear-gradient(top,#0c9847,#2fcd72)';
						setTimeout(function(){
							that.resetSlider();
						},1500)
					}else{
						this.end();
//						this.tipText = "滑动到达乘客起点"
						this.chanSlidnum = 1;
					}
					
				} else {
					this.oLeft = 6;
				}
				
				
				
				
				
				
			},
			//重置滑动插件
			resetSlider(){
				
//				this.isSpiner = false;
//				this.iconIshow = true;

				this.flag = 1;
				this.oLeft = 6;
				this.globalW = 0;
			}
  	},
  	components:{
  	},
	created:function(){
		//记录关闭之后在开启的状态选择是滑屏到达终点
		if(this.cardType&&this.cardType!=2){
			//根据状态确定滑动按钮底色
			this.autoBg = '-webkit-linear-gradient(top,#0c9847,#2fcd72)';
			//根据状态确定是否到达用户1起点2终点
			this.chanSlidnum = 2;
			this.cardata['n_state']==4?this.tipText = "滑动行程结束":this.tipText = "滑动到达乘客终点";
		}
		
	},
	mounted:function(){
//		alert(JSON.stringify(this.cardata))
	}
  
  
  
}

</script>
<style type="text/css">
	.stage {
		position: relative;
		padding: 0 28px;
		height: 100%;
	}
	
	.stage .slider {
		position: absolute;
		height:92px;
		width: 694px;
		box-shadow: 0 0 3px #999;
		background: -webkit-linear-gradient(top,#111b30,#3e465e);
		border-radius: 8px;
	}
	
	.stage .label {
		background: -webkit-gradient(linear, left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #fff), color-stop(1, #4d4d4d));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-animation: slidetounlock 3s infinite;
		-webkit-text-size-adjust: none;
		line-height: 92px;
		height: 92px;
		text-align: center;
		font-size: 36px;
		width: 100%;
		color: #fff
	}
	
	@keyframes slidetounlock {
		0% {
			background-position: -200px 0
		}
		100% {
			background-position: 200px 0
		}
	}
	
	@-webkit-keyframes slidetounlock {
		0% {
			background-position: -200px 0
		}
		100% {
			background-position: 200px 0
		}
	}
	
	.stage .button {
		position: absolute;
		left: 0;
		top: 6px;
		width: 106px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(bottom,#ff9600,#ffc678);
		transition: left 0s;
		-webkit-transition: left 0s;
		border-radius: 8px;
	}
	
	.stage .button-on {
		position: absolute;
		left: 0;
		top: 0;
		width: 52px;
		height: 52px;
		background-color: #fff;
		transition: left 1s;
		-webkit-transition: left .5s
	}
	
	.stage .track {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 0;
		overflow: hidden;
		transition: width 0s;
		-webkit-transition: width 0s
	}
	
	.stage .track-on {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 0;
		overflow: hidden;
		transition: width 1s;
		-webkit-transition: width .5s
	}
	
	.stage .icon {
		width: 90px;
		height: 52px;
		position: relative;
		font-family: sans-serif;
		background: url(img/cart.png) no-repeat;
		background-size: contain;
	}
	
	/*.icon:before {
		content: '>>';
		color: #ccc;
		line-height: 32px
	}*/
	
	.stage .spinner {
		width: 32px;
		height: 32px;
		background: url(img/ok.png) no-repeat;
		background-size: contain;
		position: relative;
		top: 10px;
		left: 10px;
	}
	
	@-webkit-keyframes bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0)
		}
		40% {
			-webkit-transform: scale(1)
		}
	}
	
	@keyframes bouncedelay {
		0%,
		80%,
		100% {
			transform: scale(0);
			-webkit-transform: scale(0)
		}
		40% {
			transform: scale(1);
			-webkit-transform: scale(1)
		}
	}
	
	.stage .bg-green {
		line-height: 92px;
		height: 92px;
		text-align: center;
		font-size: 16px;
		background-color: ;
	}
</style>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "./css/ordercard.scss"
</style>