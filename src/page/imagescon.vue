<!--听单检测 -->
<template>
	<div class="imgcontent">
		<navigBar :ShowUsericon="true"  :requreClass="`icon-fanhui`"  :titleText="title" @checkMe="clickMe"></navigBar>
		<div class="headporcard">
			<img id="headimg" :src="imgUrl" alt="北极熊猫" />
		</div>
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				title:"",
				imgUrl:"http://www.bjxm360.com/static/home/img/logo.jpg"
			}	
		},
		computed: {
			//获取store里面数据 
			changlan() {
				return this.$store.state.langetype
			}
		},
		props: [],
		methods: {
			clickMe() {
				this.$router.go(-1)
			},
			//获取用户信息接口
			getUserInfo(){
				var uid = window.localStorage.getItem("uid");
				if(!uid){
					this.$router.push('./login');
				}
				var url = this.$BaseUrll+"/Member/index";
				var data = {
					vc_drcode:uid,
					type:1
				};
	
				var that = this;
				mui.post(url,data,function(data){
						var data = JSON.parse(data);
						if(data['status']==1){
							if(data['data'].vc_hred_img != '0'){
								that.imgDataUrl = "http://www.bjxm360.com"+data['data'].vc_hred_img;
							}
						}else{
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
			this.getUserInfo();
		},
		mounted() {
			this.title = this.$route.query.text;
			this.imgUrl = "http://www.bjxm360.com/"+this.$route.query.imgsrc;
		}

	}
</script>
<style scoped>
.imgcontent{
	height: 100%;
	overflow-y: scroll;
}
.imgcontent .headporcard{
	transform: translateY(160px);
	width: 694px;
	border-radius: 10px;
	/*background: #ccc;*/
	margin: auto;
	overflow: scroll;
	margin-bottom: 30px;
}
.headporcard #filimg{
	display: none;
}
.headporcard label{
	display: block;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.headporcard img{
	width: 100%;
	/*height: 100%;*/
}
.headpotrai{
	text-align: center;
}
.headpotrai .changimg{
	width: 264px;
	height: 80px;
	background: #fdb913 !important;
	font-size: 36px;
	color: #333;
	border-radius: 8px;
	transform: translateY(220px);
	margin: auto;
}
.headpotrai .mui-btn:enabled:active{background: #FDB913;color: #333;}
</style>
<!--<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "../assets/css/listen.scss";
</style>-->