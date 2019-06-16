<!--produce by jack-->
<template>
  <div class="patchdetailcon">
  	   <navigBar class="navbar" :ShowUsericon="false"  :titleText="'我的星级'" @checkMe="clickMe"></navigBar>
 		<div class="ouside">
			<div class="vip_banner">
				<div v-if="vUserData.n_isstart" class="time_tip">
					星级'{{vUserData.dt_endstart}}到期
				</div>
				<div id="slider" class="mui-slider" >
					<div class="mui-slider-group mui-slider-loop">
						<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<a href="#">
								<img src="https://images.zastatic.com/app/zhenxin/zhenxin_metal_a.jpg">
							</a>
						</div>
						<!-- 第一张 -->
						<div class="mui-slider-item">
							<a href="#">
								<img src="https://images.zastatic.com/app/zhenxin/zhenxin_photo_a.jpg">
							</a>
						</div>
						<!-- 第二张 -->
						<div class="mui-slider-item">
							<a href="#">
								<img src="https://images.zastatic.com/app/zhenxin/new_zhenxin_unlimit_mail_a.jpg">
							</a>
						</div>
						<div class="mui-slider-item">
							<a href="#">
								<img src="https://images.zastatic.com/app/zhenxin/zhenxin_search_a.jpg">
							</a>
						</div>
						<!-- 第3张 -->
						<div class="mui-slider-item">
							<a href="#">
								<img src="https://images.zastatic.com/app/zhenxin/zhenxin_metal_a.jpg">
							</a>
						</div>
						
						<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<a href="#">
								<img src="https://images.zastatic.com/app/zhenxin/zhenxin_photo_a.jpg">
							</a>
						</div>
					</div>
					<div class="mui-slider-indicator">
						<div class="mui-indicator mui-active"></div>
						<div class="mui-indicator"></div>
						<div class="mui-indicator"></div>
					</div>
				</div>
				
			</div>
			<div class="pay_itemul">
				<ul class="mui-table-view mui-table-view-radio">
					<li  v-for="(vitem,index) in itemList" :class="index==0?'mui-table-view-cell mui-selected':'mui-table-view-cell'":key="index" @click="sletVip">
						<a class="vipatext mui-navigate-right">
							购买会员{{vitem.n_time}}个月
							<span style="margin-left: 14px;">日均 {{vitem.vc_daymoney}}元</span>
							<span style="margin-left: 20px;">￥ {{vitem.n_money}}元</span>
						</a>
					</li>
					
				</ul>
			</div>
			<div class="zfbtn">
				<button type="button" class="mui-btn mui-btn-primary" @click="goPay">立即开通VIP</button>
			</div>
		</div>
		<div class="noticbox">
			<p>服务说明：</p>
			<p>1、购买的服务仅限本账号使用，不能转移到其他账号；</p>
			<p>2、在使用本服务期间，若从事不恰当或不合法的行为， 金梦情缘保留进行调查并立即终止服务的权利；</p>
			<p>3、对于本服务和以上条款，在法律允许范围内 金梦情缘拥有最终解释权。</p>
			<p>安全征婚提示：</p>
			<p>1、在以下情况下请不要轻易透露你的联系方式（如电话、手机号码、邮箱、即时通信、通信地址等）</p>
			<p>2、当对方无相片或资料不完整时，请不要轻易透露你的联系方式。</p>
			<p>3、相亲过程中，如遇对方提及借款、投资或索要等行为，请务必提高警惕，谨防受骗，并及时举报。</p>
			
		</div>
  </div>
</template>

<script>
import {connetAction,regPhone} from "../utils/index.js"
import https from "../utils/Https.js"	
import navigBar from '@/components/navigBar';//状态栏组件
import {mapGetters,mapMutations} from 'vuex';
export default {
  data () {
    return {
    	uid:0,            //用户id
		viplen:0,
       btnstatus:2,      //判断显示接到乘客还是显示到达终点按钮
       showdilog:false,  //弹窗是否显示
       routgoing:"",    //出行页面路由参数
	   payId:0, 		//支付id
	   itemList:[
		    {
			   dt_addtime: "2019-03-29 22:31:42",
				dt_updatetime: "2019-03-29 22:31:46",
				id: 1,
				n_money: 199,
				n_sex: 1,
				n_time: 1,
				_type: 1,
			}, {
			   dt_addtime: "2019-03-29 22:31:42",
				dt_updatetime: "2019-03-29 22:31:46",
				id: 1,
				n_money: 199,
				n_sex: 1,
				n_time: 2,
				_type: 1,
			}, {
			   dt_addtime: "2019-03-29 22:31:42",
				dt_updatetime: "2019-03-29 22:31:46",
				id: 1,
				n_money: 199,
				n_sex: 1,
				n_time: 3,
				_type: 1,
			}
	   ]
	  
	   
    }
  },
  computed:{
		//获取store里面数据 
  	changlan(){
  		return this.$store.state.langetype
  	},
  	vUserData(){
  		return this.$store.state.vUserData
  	}
  },
  props:[],
  methods: {
		clickMe(){
	//		alert("这里不能点击返回，去掉返回按钮")
		},
		sletVip(id){
			this.payId = id;
		},
		getUerInfo(){
			let data = {
				oc_usercode:localStorage.openid
			}
			connetAction.ajaxPost(https['index'], data)
				.then(rd => {
					if(rd.status){
						this.itemList = rd.data;
						console.log(this.itemList)
					}
				})
				.catch(res => {
					// console.log(res,"res")
				})
		},
		setOrder:function(){
			let data = {
				id:this.payId,
				oc_usercode:localStorage.openid
			}
			connetAction.ajaxPost(https['setOrder'], data)
				.then(rd => {
					if(rd.status==1){
						// this.updateCode(rd.data);
					}
				})
				.catch(res => {
					// console.log(res,"res")
				})
		},
		goPay:function(){
			var btnArray = ['支付宝', '微信'];
			var that = this;
			mui.confirm('支付方式', 'Hello MUI', btnArray, function(e) {
				if (e.index == 1) {
					info.innerText = '支付宝支付';
					that.alipaySetOrder();
				} else {
					info.innerText = '微信支付';
					that.setOrder()
				}
			})
		},
		alipaySetOrder:function(){
			let data = {
				id:this.payId,
				oc_usercode:localStorage.openid
			}
			connetAction.ajaxPost(https['setaliOrder'], data)
				.then(rd => {
					if(rd.status==1){
						// this.updateCode(rd.data,1);
					}
				})
				.catch(res => {
					// console.log(res,"res")
				})
		},
		getFuWu:function(){
			let that = this;
			connetAction.ajaxPost(https['nvIndex'], {type:2})
			.then(rd => {
				
				this.itemList =  rd.data.filter((item,index,arr)=>item.n_sex==this.vUserData.n_sex);
				
				if(this.itemList.length>0){
					this.payId = this.itemList[0].id;
				}
				
				
			})
			.catch(res => {
				// console.log(res,"res")
			})
		},
		getVipList(){
			connetAction.ajaxPost(https['huiyuan'], {id:localStorage.openid})
			.then(rd => {
				let mydata = rd.data.filter((item,index,arr)=>(item.n_type==1));
				this.itemList =mydata;
				
				if(rd.data.length<=1){
					this.viplen = 0
				}else{
					this.viplen = rd.data.length -2;
				}
				this.getFuWu(mydata);
				
			})
			.catch(res => {
				this.getFuWu()
				// console.log(res,"res")
			})
		},
		appadresend(){
			
		}
	},
	components:{
		navigBar
		// ，ordercardpatch,
		// googlemap,
		// dilogo
	},
	created:function(){
		// this.huiyuanInfo();
	},
	mounted:function(){
		this.getFuWu();
		var gallery = mui('.mui-slider');
		gallery.slider({
		  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
		});
	}
}

</script>
<style scoped>
	.patchdetailcon{
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	.vip_banner{
		height: 300px;
		margin-top: 80px;
		position: relative;
		background: #ddd;
		margin-bottom: 10px;
	}
	.vip_banner img{
		height: 300px;
	}
	
	.vipatext{
		font-size: 32px;
		padding: 15px 0;
		height: 80px;
		line-height: 80px;
	}
	.pay_itemul .mui-table-view-radio .mui-table-view-cell .mui-navigate-right:after{
		font-size: 80px;
	}
	.pay_itemul .mui-navigate-right:after, .mui-push-right:after{
		font-size: 80px;
	}
	
	.pay_itemul,.noticbox{
		width: 95%;
		margin:0 auto;
		height: 260px;
	}
	.pay_itemul{
		height: auto;
		margin-bottom: 40px;
	}
	.noticbox{
		height:auto;
		margin-top: 30px;
		min-height: 300px;
		border-radius: 10px;
		padding-bottom: 10px;
	}
	.pay_itemul .mui-table-view-cell{
		height: 80px;
	}
	
	
	.time_tip{
		position: fixed;
		top: 80px;
		left: 0;
		padding: 20 0px;
		font-size: 24px;
		width: 100%;
		background: rgba(0,0,0,.4);
		text-align: center;
		color: #fff;
	}
	
	.noticbox{
		padding-top: 20px;
		background: #fff;
		margin-bottom: 30px;
	}
	
	.noticbox p{
		color: #333;
		font-size: 26px;
		margin-bottom: 20px;
		padding-left: 20px;
	}
	
	
	.svnbox{
		height: 100px;
		height: 100px;
		border-radius:50%;
	}
	
	.zfbtn{
		text-align: center;
		margin-bottom: 30px;
	}
	
	.zfbtn button{
		font-size: 32px;
		padding:10px 20px;
		border-radius: 10px;
	}
</style>