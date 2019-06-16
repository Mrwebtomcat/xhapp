<!--底部悬浮菜单-->
<template>
  	<div class="msgbar">
		<div class="buton" @click="fn1"><span class="iconfont"></span>打招呼</div>
		<div class="buton" @click="fn2"><span class="iconfont"></span>发消息</div>
		<div class="buton" @click="fn3"><span class="iconfont"></span>红娘牵线</div>
  	</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
	  animate:"lineground",
	  autoicon:"icon-zhanghu",
	  btOnOff:0
    }
  },
  props:["titleText","ShowUsericon","requreClass","showRighticon","rightClass"],
  methods: {
		changStyle:()=>{
					
		},
		checkLeft(){
			this.$emit("checkMe")
		},
		checkRight(){
			this.$emit("iconRight");
		},
		fn1(){
			this.$emit("dzh");
		},
		fn2(){
			this.$emit("goMsg");
		},
		fn3(){
			this.$emit("doHn");
		},
	},
	created:function(){
		
		
	},
	mounted:function(){
		
	}
  
  
  
}

</script>
<style lang="scss" scoped>
	.msgbar{
		position: fixed;
		bottom: 0;left: 0;
		width: 100%;
		height: 100px;
		line-height: 100px;
		background: #fff;
		text-align: center;
		// display: flex;
		// justify-content: space-between;
	}
	.buton{
		 display: inline-block;
		width: 30%;
		text-align: center;
	}
</style>