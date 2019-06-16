
import axios from 'axios'
import Qs from 'qs'
const DEVURL = 'http://twxuser.huitouke.cn'
const BASEURL = 'http://tinterface.huitouke.cn:8888'

// 请求接口
const requestURL={
	index:'/weservice/index',					//首页接口
	sendMsg:'/weservice/sendMsg',				//获取短信验证码
	bindAccount:'/weservice/bindAccount',		//绑定销售/技师
	checkBind:'/weservice/checkBind',			//获取短信验证码
	historyCount:'/weservice/historyCount',		//历史业绩提成统计
	salesBusiness:'/weservice/salesBusiness',	//销售业绩流水
	masterBusiness:'/weservice/masterBusiness'	//技师业绩流水
	
}

/*
 * 此处进行全局的登录验证
 * 请求拦截器
 * Request failed with status code 500 // 请求有返回 但是业务出错
 */

// http request 拦截器
axios.interceptors.request.use((config) => {
//     if (isWechat()) {
//         config.data.openid = localStorage.openid
//     } else {
//         config.data.localToken = localStorage.localToken
//     }
    return config
}, (error) => {
    return Promise.reject(error)
})
axios.interceptors.response.use(function(response){
	if(response.data.code == '10034' || response.data.code == '10003'){
		return Promise.resolve(response.data)
	}else if(response.data.code != 200){
		return Promise.resolve(response.data)
    }else
		return  Promise.resolve(response.data)
	// console.log(response)
}, function (error) {
    // 响应错误
	return Promise.reject(error);
})

// 请求方法封装
const connetAction = {
    ajaxPost (url, datainfo) {
        return axios({
            url: url,
            method: 'post',
            data: datainfo,
            transformRequest: [
              function(data) {
		        return Qs.stringify(data);
              }
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    allpost(httpUrl, datainfo) {
        return axios({
          url: httpUrl,
          method: 'post',
          data: datainfo,
          headers: {
            'Content-Type': false
          },
         
        })
    },
    ajaxGet (getUrl) {
        return axios({
            url: getUrl,
            method: 'get',
        })
    }
}
// 授权登陆
const WechatOauth = function(){
	
	return new Promise ((resolve,reject) => {
	 connetAction.ajaxPost('https://inf.huitouke.cn/weservice/oauth', {'callbackUrl': location.href})
		    .then (res => {
		      resolve(res)
		    })
	})
}
//检测用户绑定
const SearchBindUser = function(openid){
	return new Promise ((resolve,reject) => {
		connetAction.ajaxPost('https://inf.huitouke.cn/weservice/checkBind', {'openid': openid})
		    .then (res => {
		      resolve(res)
		    })
	})
}

const getQueryString = function(name){
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
}

// 判断是否是微信端
const isWechat = function() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.indexOf('micromessenger') > -1) {
		return true;
	}
	return false;
}
// 判断手机号码
const regPhone = function(str){
	if(!(/^1[34578]\d{9}$/.test(str))){ 
		return false; 
	}
	return true
}

//封装过期控制代码
const setKey = function(key,value){
	var curTime = new Date().getTime();
	localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}
const getKey = function(key,exp){
	var data = localStorage.getItem(key);
	var dataObj = JSON.parse(data);
	if (new Date().getTime() - dataObj.time>exp) {
		console.log('信息已过期');
		//alert("信息已过期")
	}else{
		//console.log("data="+dataObj.data);
		//console.log(JSON.parse(dataObj.data));
		var dataObjDatatoJson = JSON.parse(dataObj.data)
		return dataObjDatatoJson;
	}
}



// 提示
const message = function(obj,json){
	let title = "",btntxt="",contxt="",center=false,call;//标题
	if(json.hasOwnProperty('title'))title = json['title'];
	if(json.hasOwnProperty('contxt'))contxt = json['contxt'];
	if(json.hasOwnProperty('btntxt'))btntxt = json['btntxt'];
	if(json.hasOwnProperty('center'))center = json['center'];
	obj.$alert(contxt,title,{
		comfrimButtonText:btntxt,
		// cancelButtonText: '取消',
		center: center,
		callback:action=>{
			if(json.hasOwnProperty('call'))json['call']();
		}
	})
}

export {
	DEVURL,
	BASEURL,
	connetAction,
	requestURL,
	isWechat,
	regPhone,
	WechatOauth,
	SearchBindUser,
	getQueryString,
	message,
	setKey,
	getKey
}
