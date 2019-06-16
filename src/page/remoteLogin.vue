<!--远程登录 -->
<template>
	<div class="remoteloginbox">
		<navigBar :ShowUsericon="false"  :requreClass="`icon-fanhui`"  :titleText="changlan['remotelogin']['title']" @checkMe="clickMe"></navigBar>
		<img class="tipimg" src="../assets/img/index/wraming.png" alt="" />
		<div class="article">
			<div class="tip">{{changlan['remotelogin']['securitip']}}：</div>
			<div :class="changlan['index']['lagtype']=='cn'?'aricleonetip':'aricleonetip rutip'">
				{{changlan['remotelogin']['securitycontent']}}
			</div>
		</div>
		
		<button type="button" class="mui-btn exit" @click="exit">{{changlan['remotelogin']['afresh']}}</button>
		
		
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
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
			exit(){
				this.$router.push("./login")
			}
		},
		components: {
			navigBar
		},
		created() {
//			console.log(this.changlan)
		},
		mounted() {
			
		}

	}
</script>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "../assets/css/remote.scss";
</style>