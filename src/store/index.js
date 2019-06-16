import Vue from "vue"
import Vuex from "vuex"
import langdata from "./lang.json"

Vue.use(Vuex);

//定义一个容器 状态
let store = new Vuex.Store({
	state:{
		langetype:langdata['cn'],
		loginState:0,
		contextTitle:"",
		phonenum:true,
		orderdata:false,        //ui展示
		isOrderStyle:false,        //是否可以接单状态
		watchgps:"123",			//发送定位定时器
		latanlng:{
			'lat':40.037411,
			'lng': 116.311392
		},
		vUserData:{      //存储订单消息json变量
			dt_endstar: "",
			dt_endtsfw: "",
			dt_endvip:"",
			id: "",
			n_age:"",
			n_gz: "",
			n_issm: "",
			n_isstar: "",
			n_isvip:"",
			n_message:"",
			n_sex: "",
			n_show: "",
			vc_img: "",
			vc_nickname: ""
		}
	},
	mutations:{
		//切换中文
		cnlange(state,n){
			state.langetype = langdata[n];
		},
		isLogin(state,n){
			state.loginState = n;
		},
		checkPhone(state,phone){
			if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phone))){ 
				state.phonenum = false;
			}else{
				state.phonenum = true;
			}
		},
		orderSatus(state,n){//出车状态
			state.isOrderStyle = n;
		},
		setPos(state,n){
			state.latanlng = n;
		},
		chcunkOder(state,n){
			state.orderdata = n;
		},
		changUserData(state,obj){
			state.vUserData = obj;
		},
		changeGps(state,obj){
			state.watchgps = obj;
		},
		changeTitle(state,obj){
			state.contextTitle = obj;
		}
	}
})

export default store;