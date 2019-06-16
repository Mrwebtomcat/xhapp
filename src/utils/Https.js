// INTERFACE MODULE
// const baseURL = "http://10.10.2.27/zjxh/public/index.php"
const baseURL = "http://server.zjxunhun.com/index.php/"
let INTERFACE = {
	login:'login/login',					//登陆
	/*
		注册参数：{
			vc_userphone:用户
			vc_password：密码
		}
		返回id ； 用户的id 
	*/
	register:'login/register',				//注册
	getSmsCode:'login/getSmsCode',			//验证码  params {type:, 1 注册验证码 2  重置验证码 vc_userphone:,用户手机}
	forgotPassWord:'login/forgotPassWord',	//忘记密码
	checkPhone:'login/checkPhone',			//忘记密码发送验证码确认是否是本人手机号码 params{vc_userphone:,code }
	getCode:'index/getCode',				//返回所有系统编码值
	//tree返回三级联动的地区表  {pid:默认不传参请求该接口的id，type:1默认不用传： 2省 3 市}
	tree:'index/tree',					      
	index:'index/homeInfo',					//首页接口
	addWsh:'user/addWsh',					//工作生活
	updateZotj:'user/updateZotj',			//更新择偶条件
	updateInfo:'user/updateInfo',			//更新个人资料
	getInfo:'user/getInfo',					//获取个人资料
	quanxian:'user/quanxian',				//权限 params{id：n_isinfo:'是否显示',n_yuanying:'原因'}
	souSuo:'base/souSuo',					//昵称搜索   参数 用户昵称 params{vc_nickname}
	nameSousuo:'base/nameSouSuo',
	huiyuan:'Huiyuan/index',				//查询VIP会员列表 params{id:会员id}
	addAlbum:'user/addAlbum',				//上传图片
	delAlbum:'user/delAlbum',				//删除图片  { id:图片id; oc_usercode:用户id}
	updateLogo:'user/updateLogo',			//上传头像  { id:用户id,id; vc_img:头像}
	setOrder:'wxpay/setOrder',			//发起微信支付  { id:用户id,}  返回订单id 和url
	getOrderStatus:'wxpay/getOrderStatus',			//获得订单状态
	dzh:'Index/dzh',						//打招呼startid vc_nick_name oc_usercode
	addLiulan:'Llgz/addLiulan'	,			//增加流量浏览
	addHN:'index/getHongNiang',				//联系红娘
	addGuanzu:'Llgz/addGuanzu',				//关注
	nvIndex:'Huiyuan/nvIndex',				//查看所有VIP配置信息
	setOrder:'wxpay/setOrder',				//发起微信支付  { id:用户id,}  返回订单id 和url
	setaliOrder:'alipay/setOrder',			//发起支付宝支付  { id:用户id,}  返回订单id 和url
	getOrderStatus:'wxpay/getOrderStatus',	//微信支付状态 vc_order_sn
	getAliPayStatus:'alipay/getOrderStatus',	//微信支付状态 vc_order_sn
	setSm:'user/setSm',						//实名认证
	upDatePhone:'user/updatePhone',			//修改手机号码
}
for(var key in INTERFACE){
	INTERFACE[key] = baseURL+ INTERFACE[key]
}
export default INTERFACE;