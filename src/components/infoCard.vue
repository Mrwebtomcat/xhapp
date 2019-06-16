<template>
  <div class="user_infoCard">
		<div class="lefimg" :style="`background:url(${imgUrl}) no-repeat;background-size:cover;`"></div>
		<div class="contxtright">
			<p>{{userName}}</p>
			<p>sex birthday{{n_age}}    {{city}} | {{n_education}} | {{money}} </p>
			<p>{{metacontext}}</p>
		</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: ''
    }
  },
  props:{
	  imgUrl:{
		  type:[String],
		  default:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIprcV85qXu1VryEBtObVfOB1ibeBNkyUAFFiaO7tAibAvdnjnJm2WwhafrKhyYiaFWibbhRiaVJN774GnA/132'
	  },
	  userName:{
		  type:[String,Number],
		  default:'Hellow World!'
	  },
	  n_age:{
		  type:[String,Number],
		  default:'18'
	  },
	  n_education:{
		  type:[String,Number],
		  default:'18'
	  },
	  money:{
		 type:[String,Number],
		 default:'2000' 
	  },
	  city:{
		 type:[String,Number],
		 default:'2000' 
	  },
	  metacontext:{
		  type:[String,Number],
		  default:'How long,I`ts  5:00 oclock' 
	  }
  },
  methods: {
		tips(){
			mui.toast("该模块正在开发");
		}
	},
	created:function(){
	
	},
	mounted:function(){
		
	}
  
}
</script>
<style scoped>
	.user_infoCard{
		height: 250px;
		width: 100%;
		display: flex;
		padding: 15px 20px;
		box-sizing: border-box;
		margin-bottom: 20px;
	}
	.lefimg{
		flex: 0 0 100px;
		height: 100px;
		border: 1px solid #ddd;
		margin-left: 30px;
	}
	.contxtright{
		flex: 1;
		margin-left: 10px;
	}
</style>