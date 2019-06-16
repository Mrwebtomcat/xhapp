<!--首页 produce by jack-->
<template>
  <div>
  	<navigBar v-if="barTitle!='我的设置'" :ShowUsericon="false" :titleText="barTitle" :showRighticon="false"  :rightClass="`icon-letter`"  @checkMe="clickMe" @iconRight="goEmial"></navigBar>
		<div class="indexmain">
			<div class="inx_content">
				<router-view></router-view>
			</div>
		</div>
		
		<div class="inx_dispatch">
			<div class="patch_btn">
				<nav class="mui-bar mui-bar-tab">
				    <router-link @click.native="chantime(1)" tag="a" to="/" class="items_barlist ">
			　　　　　　<span class="iconfont icon-xihuan"></span>
				   　　<span class="mui-tab-label">推荐</span>
			   　　  </router-link>　
					<router-link @click.native="chantime(2)" tag="a" to="/mesgNotice" class="items_barlist">
						<span class="iconfont icon-xiaoxi1"></span>
						<span class="mui-tab-label">消息</span>
					</router-link>
					<router-link @click.native="chantime(3)" tag="a" to="/center" class="items_barlist">
						<span class="iconfont icon-zhanghu1"></span>
						<span class="mui-tab-label">我的</span>
					</router-link>
			　　</nav>
			</div>
		</div>
  </div>
</template>

<script>
// import breathBtn from '@/components/BreathButton';//呼吸按钮组件
import navigBar from '@/components/navigBar';//呼吸按钮组件
import mapMutations from 'vuex';
export default {
  data () {
    return {
		ws:{},         //存储websocket
		uid:0,         //用户编码
		lan_statue:1   ,//语言缓存  1中文  2俄文
		roteUrl:['./home','./emial'],
		barTitle:"每日推荐"
    }
  },
  computed:{
		//获取store里面数据 
  	changlan(){
  		return this.$store.state.langetype
  	},
  	getlatandlng(){
  		return this.$store.state.latanlng
  	},
  	getOderstatus(){
  		return this.$store.state.orderdata
  	},
  	getOderData(){
  		return this.$store.state.driverData
  	},
  	getDriverStyle(){
  		return this.$store.state.isOrderStyle
  	},
  	getwatchGps(){
  		return this.$store.state.watchgps
  	}
  },
  props:[],
  components:{
  	navigBar
  },
	methods: {
		clickMe(){
			if(this.getOderstatus){
				return false;
			}
				this.$router.push("./center");
		},
		//控制title
		chantime(str){
			if(str==1){
				this.barTitle = "每日推荐"
			}else if(str==2){
				this.barTitle = "聊天消息"
			}else if(str==3){
				this.barTitle = "我的设置"
			}
		},
		goEmial(){
			if(this.getOderstatus){
				return false;
			}
			this.$router.push("./mesgNotice");
		},
		
		
		
	},
	created:function(){
		
	},
	mounted:function(){
		
	}
}

</script>
<style scoped> 
	body,html,#app{
		width: 100%;
		height: 100%;
	}
	body{
		overflow: hidden;
		background: #f5f5f5 !important;
		font:16px/32px "SourceHanSanCN-Medium";
	}
	#app{
		text-align: left;
	}
	.li_bz_tx{
		display: flex;
	}
	a{
		color: #333;
	}
	.router-link-exact-active{
		background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow); 
		-webkit-background-clip:text; 
		-webkit-text-fill-color:transparent; 
	}
	
</style>
<style lang="scss" scoped>
@import "../assets/css/minx.scss";
@import "../assets/css/index.scss";
.mui-bar-tab{
	 .mui-tab-item{
		 height:80px;
	 }
}

.patch_btn .mui-bar-tab{
	display: flex;
	height: 80px;
	justify-content: space-between;
}
.patch_btn{
	text-align: center;
}
.patch_btn .mui-bar-tab .items_barlist{
	height: 80px;
}
.patch_btn .mui-bar-tab .items_barlist .iconfont{
	display: inline-block;
	margin-top: 13px;
	font-size: 40px;
	// background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow); 
	background-image:-webkit-linear-gradient(bottom,#333,#8070f1, #b06cef); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
}
// .items_barlist {
// 	
// }
.items_barlist .mui-tab-label{
	display: block;
	// text-align:center;
	padding:0 50px;
}
.patch_btn .mui-bar-tab .router-link-exact-active .iconfont{
		background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow); 
		-webkit-background-clip:text; 
		-webkit-text-fill-color:transparent; 
	}
</style>
