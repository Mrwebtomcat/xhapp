<!--弹出窗组件-->
<template>
  <div>
  	<div class="jcdilogo">
	  		<div class="yesicon" @click.stop="closefn">
	  			<span class="iconfont icon-guanbi"></span>
	  		</div>
	   		<div class="dignotice">请选择你的支付方式</div>
	   		<!-- <div class="continuar"></div> -->
	   		<div>
	   			<button type="button" class="mui-btn mui-btn-primary" @click.stop="stoporder"><span class="iconfont payicon icon-zhifubao"></span>支付宝支付</button>
	   		</div>
	   		<div>
	   			<button type="button" class="mui-btn mui-btn-success jx" @click.stop="goorder"><span class="iconfont payicon icon-weixin"></span>微信支付</button>
	   		</div>
	  </div>
  	<div class="shadoxs"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: ''
    }
  },
  props:['lange'],
  methods: {
		stoporder(){
			this.$emit("zfbpay");
		},
		goorder(){
			this.$emit("weixinpay");
		},
		closefn(){
			this.$emit("closeDilog");
		}
	},
	created:function(){
	
	},
	mounted:function(){
		
	}
  
  
  
}
</script>
<style scoped>
	.payicon{
		font-size: 40px;
		margin-right: 15px;
	}
</style>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "./css/dilogoinfo.scss";
</style>