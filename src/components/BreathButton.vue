<!--呼吸按钮组件 produce by jack on 2018-7-10-->
<template>
	<div class="navbtndispacth">
		<a href="javascript:void(0);" @click="dispathWorker">{{btnval}}</a>
		<div :class="animate"></div>
	</div>
</template>

<script>
export default {
  	data () {
	    return {
			animate:'lineground'
	    }
  	},
  	computed:{
	  	getOderstatus(){
	  		return this.$store.state.orderdata
		}
	},
  	props:["btnval"],
  	methods: {
  		//改变呼吸组件的状态
		changStyle(n){
			if(n == 1){ //开启
				this.animate = "lineground movies1";
			}else{      //关闭
				this.animate = "lineground";
			}
		},
		dispathWorker(){
			if(this.animate == "lineground"){
				this.$emit("yesDrive")
			}else{
				//如果有订单显示那么就不能停止接单
				if(this.getOderstatus){
					return false;
				}else{
					this.$emit("noDrive")
				}
			}
		}
	},
	created:function(){
		
		
	},
	mounted:function(){
		
	}
  
  
  
}

</script>
<style>
	/*#dipatchcon{
		width:100%;
		height:100%;
	}
	.con_box{
		width:100%;
		height:100%;
		position:relative;
	}
	.con_box a{
		z-index:11;
		position:absolute;
		left:0;
		right:0;
		width:100%;
		height:100%;
		text-decoration:none;
		text-align:center;
		line-height:116px;
		background:#ff8700;
		color:#fff;
		border-radius:50%;
		font-size: 42px;
	}
	.lineground{
		z-index:10;
		position:absolute;
		left:0;
		right:0;
		width:100%;
		height:100%;
		border-radius:50%;
		background:#fdb913;
		
	}
	.lineground.movies1{
		animation:animate2 2s ease-out infinite;
	}
	@keyframes animate1{
		0%{transform: scale(1) ;opacity:0}
		25%{transform: scale(2) ;opacity:0.15}
		50%{transform: scale(3);opacity:0.3}
		75%{transform: scale(1) ;opacity:0.45}
		100%{transform:scale(2) ;opacity:0.6} 
	}
	@keyframes animate2{				
		0%{transform: scale(1);opacity:1}
		100%{transform:scale(2);opacity:0} 				
	}*/
	.navbtndispacth{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.navbtndispacth a{
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		top: 0;
		bottom: 0;
		text-align: center;
		line-height: 140px;
		color:#fff;
		font-size: 42px;
	}
	.navbtndispacth .lineground{
		width: 100%;
		height: 100%;
		/*background:url("./img/index/1-1.png") center no-repeat;*/
		background-size:100%;
	}
	.movies1{
		background:url("./img/index/1-1.png") center no-repeat;
		background-size:100%;
		-webkit-animation:animte1  ease-in-out .3s infinite;
		animation:animte1  .3s ease-in-out infinite;
	}
	@-webkit-keyframes animte1{
			0%{background:url("./img/index/1-1.png") center no-repeat;}
			5%{background:url("./img/index/1-1.png") center no-repeat;}
			10%{background:url("./img/index/1-2.png") center no-repeat;}
			15%{background:url("./img/index/1-3.png") center no-repeat;}
			20%{background:url("./img/index/1-4.png") center no-repeat;}
			25%{background:url("./img/index/1-5.png") center no-repeat;}
			30%{background:url("./img/index/2-1.png") center no-repeat;}
			35%{background:url("./img/index/2-2.png") center no-repeat;}
			40%{background:url("./img/index/2-3.png") center no-repeat;}
			45%{background:url("./img/index/2-4.png") center no-repeat;}
			50%{background:url("./img/index/2-5.png") center no-repeat;}
			55%{background:url("./img/index/3-1.png") center no-repeat;}
			60%{background:url("./img/index/3-2.png") center no-repeat;}
			65%{background:url("./img/index/3-3.png") center no-repeat;}
			70%{background:url("./img/index/3-4.png") center no-repeat;}
			75%{background:url("./img/index/3-5.png") center no-repeat;}
			80%{background:url("./img/index/4-1.png") center no-repeat;}
			85%{background:url("./img/index/4-2.png") center no-repeat;}
			90%{background:url("./img/index/4-3.png") center no-repeat;}
			95%{background:url("./img/index/4-4.png") center no-repeat;}
			100%{background:url("./img/index/4-5.png") center no-repeat;}

		}
</style>