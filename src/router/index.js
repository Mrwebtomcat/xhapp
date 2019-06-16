import Vue from 'vue'
import Router from 'vue-router'
//首页
import Index from '@/page/index'
import Vip from '@/page/Vip'
import Start from '@/page/Start'
import Login from '@/page/login'
import PswForget from '@/page/pswforget'
import Center from '@/page/center'
import TuiJian from '@/page/TuiJian'
import seltinfo from '@/page/SelfInfo'
import LLInfo from '@/page/LLInfo'
import Card from '@/page/Card'
import EditInfo from '@/page/EditInfo'
import SetTJinfo from '@/page/SetTJinfo'
import SetSystem from '@/page/SetSystem'
import config from '@/page/config'
import travel from '@/page/travel'
import kefu from '@/page/kefu'
import detectionlisten from '@/page/detectionListen'
import headportrait from '@/page/headPortrait'
import changepsw from '@/page/changepsw'
import registe from '@/page/registe'
import phonechange from '@/page/phoneChange'
import remotelogin from '@/page/remoteLogin'
import updatapp from '@/page/updatapp'
// 消息
import MesgNotice from '@/page/MsgNotice'
import Chatzjxh from '@/page/Chatzjxh'
import Guanzhu from '@/page/Guanzhu'
import imagesc from '@/page/imagescon.vue'
Vue.use(Router)
let indexRouter;
export default indexRouter = new Router({
	//mode: 'history',
	linkActiveClass: 'mui-active',
	routes: [{
			path: '/',
			// redirect:'/tuijian',
			component: Index,
			children: [{ //推荐
					path: '/',
					name: 'tuijian',
					component: TuiJian,
					title: '推荐'
				},
				{ //消息
					path: '/mesgNotice',
					name: 'mesgNotice',
					component: MesgNotice
				},

			]
		},
		{ //个人中心
			path: '/center',
			name: 'center',
			component: Center
		},
		{ //聊天
			path: '/Chatzjxh',
			name: 'Chatzjxh',
			component: Chatzjxh
		},
		{
			path: '/Start',
			name: 'Start',
			component: Start
		},
		{
			path: '/Card',
			name: 'Card',
			component: Card
		},
		{
			path: '/vip',
			name: 'vip',
			component: Vip
		},
		{
			path: '/Guanzhu',
			name: 'Guanzhu',
			component: Guanzhu
		},
		{
			path: '/SetTJinfo',
			name: 'SetTJinfo',
			component: SetTJinfo
		},
		
		{
			path: '/LLInfo',
			name: 'LLInfo',
			component: LLInfo
		},
		{
			path: '/SetSystem',
			name: 'SetSystem',
			component: SetSystem
		},
		{
			path: '/EditInfo',
			name: 'EditInfo',
			component: EditInfo
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/index',
			name: 'Index',
			component: Index
		},
		{
			path: '/pswforget',
			//    name: 'Index',
			component: PswForget
		},
		{
			path: '/registe',
			component: registe
		},


		{ //个人信息
			path: '/seltinfo',
			//    name: 'seltinfo',
			component: seltinfo
		},
		{ //个人设置
			path: '/config',
			//    name: 'config',
			component: config
		},
		{ //我的行程
			path: '/travel',
			//    name: 'config',
			component: travel
		},
		{ //我的客服
			path: '/kefu',
			//    name: 'config',
			component: kefu
		},
		{ //听单检测
			path: '/detectionlisten',
			//    name: 'config',
			component: detectionlisten
		},
		{ //修改头像
			path: '/headportrait',
			//    name: 'config',
			component: headportrait
		},
		{ //修改密码
			path: '/changepsw',
			//    name: 'config',
			component: changepsw
		},
		{ //修改手机
			path: '/phonechange',
			//    name: 'config',
			component: phonechange
		},
		{ //远程登录
			path: '/remotelogin',
			name: 'remotelogin',
			component: remotelogin
		},
		{ //版本更新
			path: '/updatapp',
			name: 'updatapp',
			component: updatapp
		},

		{ //图片展示
			path: '/imagesc',
			name: 'imagesc',
			component: imagesc
		}
	]
})

indexRouter.beforeEach(function(to, from, next) {
	const meta = to.meta || {};
	if (meta.title) { //如果设置标题，拦截后设置标题
		if (to.params.hasOwnProperty('detailname') && to.params.hasOwnProperty('detailname') != "") {
			document.title = to.params.detailname
		} else {
			document.title = meta.title;
		}
	}
	// 判断是否登录
	if (to.fullPath == "/register" || to.fullPath == "/getPsw") {
		next();
		return false
	}

	if (!localStorage.openid) {
		if (to.fullPath != "/login") {
			next("/login");
			return false;
		}
	}
	//document.body.scrollTop = 0;
	next();
})
// 每次条路由重设scrollTop值
indexRouter.afterEach(function(to) {
	window.scrollTo(0, 0)
})
