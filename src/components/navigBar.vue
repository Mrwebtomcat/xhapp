<!--navbarTop展示组件 produce by jack on 2018-7-10-->
<template>
  	<div class="title" :style="titleBg?'background:transparent;':''">
  		<!--{{changlan['login']['dl']}}-->
		<div v-if="!showBtn">
			<span v-if="ShowUsericon" :class="`iconfont ${requreClass?requreClass:autoicon} useicon`" @click="checkLeft"></span>
			{{titleText}}
			<span v-if="showRighticon" :class="`iconfont ${rightClass?rightClass:autoicon} righicon`" @click="checkRight"></span>
		</div>
		<div class="topflex" v-else>
			<span v-if="ShowUsericon" :class="`iconfont ${requreClass?requreClass:autoicon} useicon`" @click="checkLeft"></span>
			<div :class="ative==1?'ative':''" @click.stop="seleterLL(1)">{{showBtnarrytxt.length>0?showBtnarrytxt[0]:''}}</div>
			<div :class="ative==2?'ative':''"  @click.stop="seleterLL(2)">{{showBtnarrytxt.length>0?showBtnarrytxt[1]:''}}</div>
		</div>
  	</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
	  animate:"lineground",
	  ative:1,
	  autoicon:"icon-zhanghu",
	  btOnOff:0
    }
  },
  props:{
	  titleText:{
		  type:[String,Number,Boolean],
		  default:0
	  },
	  ShowUsericon:{
		   type:[String,Number,Boolean],
		  default:0
	  },
	  requreClass:{
		   type:[String,Number,Boolean],
		  default:0
	  }, 
	  showRighticon:{
		   type:[String,Number,Boolean],
		  default:0
	  },
	  rightClass:{
		   type:[String,Number,Boolean],
		  default:0
	  }, 
	  titleBg:{
		   type:[String,Number,Boolean],
		  default:0
	  },
	  showBtn:{
		   type:[Number,Boolean],
		  default:0
	  },
	  showBtnarrytxt:{
		  type:[String,Array],
		  default:()=>["谁看过我","我看过谁"]
	  }
  },
  methods: {
		changStyle:()=>{
					
		},
		checkLeft(){
			this.$emit("checkMe")
		},
		checkRight(){
			this.$emit("iconRight");
		},
		seleterLL(status){
			this.ative = status;
			if(status==1){
				this.$emit("wholookme",status);
			}else{
				this.$emit("melookwho");
			}
		}
	},
	created:function(){
		
		
	},
	mounted:function(){
		
	}
  
  
  
}

</script>
<style scoped>
	.topflex{
		display: flex;
		justify-content: center;
	}
	.topflex div{
		flex: 0 0 30%;
		align-items: center;
		font-size: 25px;
		cursor: pointer;
	}
	.topflex .ative{
		position: relative;
	}
	.topflex .ative:before{
		display: block;
		content: "";
		width: 40%;
		height: 5px;
		position: absolute;
		bottom: 0px;
		left: 30%;
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	@import "./css/navigBar.scss"
</style>