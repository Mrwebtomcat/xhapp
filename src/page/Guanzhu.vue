<!--浏览记录 -->
<template>
	<div class="moneymdoul">
		<navigBar :ShowUsericon="true" @wholookme="wholookme" :showBtn="true"  @melookwho="melookwho"  :titleBg="0" :showRighticon="true" :requreClass="`icon-fanhui`" :rightClass="`icon-shezhi`" :titleText="'浏览记录'" :showBtnarrytxt="['谁关注我','我关注谁']" @checkMe="clickMe" @iconRight="false"></navigBar>
		<!--滚动区间-->
		<div class="money_contxt">
			<div id="pullrefresh" class="mui-scroll-wrapper">
				<div class="mui-scroll tabvie-con">
					<ul class="mui-table-view mui-table-view-chevron">
						<userList
						 v-for="(items,index) in userdata.tjList"
						  :username="items.vc_nickname"
						  :isVip="items.n_isvip"
						  :isStart="items.n_isstar"
						  @dolinck="dolinck(items)"
						  :isSm="items.n_issm"
						  :cityinfo="items.vc_city+' |'+items.n_age+'岁' "
						  :hobby="items.vc_descript"
						  :headImg="items.vc_img"
						  :isBottomShow="1"
						  :n_sex="userdata.userlist.n_sex"
						   @dzh="dzh"
						  @postMsg="postMsg"
						  :key="index">
						 </userList>
					</ul>
					<div v-show="showImg"  class="imgtips">
						<img src="../assets/img/index/unmoneytip.png" alt="" />
					</div>
					
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
import tabview from '@/components/tabView'; //信息卡片组件
import userList from '@/components/UserCard';//用户列表
import {connetAction,regPhone} from "../utils/index.js"
import https from "../utils/Https.js"
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			showImg:false,
			userdata: {
				tiaoJian:'',
				tjList:[],
				userlist:{
					dt_endstar: null,
					dt_endtsfw: "",
					dt_endvip: "",
					id:"",
					n_age: "",
					n_gz: "",
					n_issm: "",
					n_isstar: "",
					n_isvip: "",
					n_message: "",
					n_sex: "",
					n_show: "",
					vc_img: "",
					vc_nickname: ""	
				}
			}
		}	
	},
	computed: {
		//获取store里面数据 
		changlan() {
			return this.$store.state.langetype
		}
	},
	props: [],
	components: {
		navigBar,
		tabview,
		userList
	},
	methods: {
		...mapMutations(['changUserData']),
		clickMe() {
			this.$router.go(-1)
		},
		dolinck(data) {
			this.$router.push("./seltinfo?id="+data.id);
		},
		postMsg:function(){
			console.log("发消息")
		},
		dzh:function(){
			console.log("打招呼")
		},
		getuerList:function(){
			let data = {
				oc_usercode:localStorage.openid||3
			}
			connetAction.ajaxPost(https['index'], data)
				.then(rd => {
					if(rd.status==1){
						this.userdata = rd.data;
						this.vip =this.userdata['userlist']['n_isvip'];
						this.n_issm =this.userdata['userlist']['n_issm'];
						this.changUserData(this.userdata['userlist']);
						console.log(this.userdata,3333)
					}
				})
				.catch(res => {
					// console.log(res,"res")
				})
		},
		wholookme:function(){
			
		},
		melookwho:function(){
			this.userdata.tjList = "";
		},
	},
	created() {
	
	},
	mounted() {
		// var that = this;    
    	mui.back = function(){
    		that.$router.push("./")
    	}
		this.getuerList();
	}
}
</script>
<style type="text/css" scoped>
	.moneymdoul .mui-pull-caption-nomore{
        font-size:24px;
    }
	.moneymdoul .mui-pull-bottom-pocket{
       margin-bottom: 0.5rem;
    }
    .tabvie-con ul{
    	padding:80px 0;
		background: #f1f1f1;
    }
    .moneymdoul{
    	width: 100%;
		margin-top: 85px;
    }
    .money_contxt{
    	width: 100%;
    	height:100%;
    	padding-top:0px;
    	box-sizing: border-box;
    }
	.moneymdoul .indexmain{
		width: 100%;
		position: absolute;
		top: 1.066667rem;
		left: 0;
		height: 100%;
	}
	.mui-scroll{
		overflow-y: scroll;
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "../assets/css/money.scss";
</style>