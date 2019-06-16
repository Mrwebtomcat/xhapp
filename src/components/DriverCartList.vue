<!--司机卡片信息展示组件 produce by jack on 2018-7-10-->
<template>
  	<div class="card_con">
		<div class="card_title">
			<span class="card_h1">{{notivtitle}}<!--系统消息--></span>
			<span class="card_time">{{time}}<!--2018-7-10-5:55--></span>
			<!--<span class="mui-icon mui-icon-closeempty closcard" @click="removeDom"></span>-->
		</div>
		<div class="cardarea">
			{{cadAreaText}}
		</div>
	</div>	
</template>

<script>
export default {
  data () {
    return {
      msg: '',
	  animate:"lineground",
	  btOnOff:0
    }
  },
  props:["btnval","notivtitle","cadAreaText","time"],
  methods: {
		changStyle:()=>{
					
		},
		removeDom(){
			 this.$emit("remvList");
		}
	},
	created:function(){
		
		
	},
	mounted:function(){
		
	}
  
  
  
}

</script>
<style lang="scss" scoped>
	@import "./css/divercartlist.scss"
</style>