<!--个人中心 -->
<template>
	<div class="config">
		<navigBar :ShowUsericon="true"  :requreClass="`icon-fanhui`"  :titleText="changlan['config']['title']" @checkMe="clickMe"></navigBar>
		<div class="mui-content">
		   <ul class="mui-table-view mui-table-view-chevron ulcon">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:void(0);" class="mui-navigate-right" @click="imageup">
						<span class="mui-media-object mui-pull-left">
							{{changlan['config']['headimg']}}
						</span>
						<div class="headimg">
							<img :src="imgDataUrl" alt="" />
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<router-link tag="a" to="changepsw"class="mui-navigate-right">
						<span class="mui-media-object mui-pull-left">
							{{changlan['config']['changpsw']}}
						</span>
						<div class="mui-media-body">
						</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media">
					<router-link tag="a" to="phoneChange" class="mui-navigate-right">
						<span class="mui-media-object mui-pull-left">
							{{changlan['config']['changphone']}}
						</span>
						<div class="mui-media-body">
						</div>
					</router-link>
				</li>
				
				<router-link  class="mui-table-view-cell mui-media mt18"  :to="{ name:'updatapp',query:{ updatestatus: 1 }}" tag="li">
					<a class="mui-navigate-right">
						<span class="mui-media-object mui-pull-left">
							{{changlan['updatapp']['title']}}
						</span>
						<div class="mui-media-body">
						</div>
					</a>
				</router-link>
			</ul>
		</div>
		<button type="button" class="mui-btn exit" @click="exit">{{changlan['config']['exit']}}</button>
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				imgDataUrl:'http://www.bjxm360.com/static/home/img/logo.jpg'
			}	
		},
		computed: {
			//获取store里面数据 
			changlan() {
				return this.$store.state.langetype
			},
			//定位定时器
			getwatchGps(){
		  		return this.$store.state.watchgps
		  	},
			//是否出车状态
			getDriverStyle(){
		  		return this.$store.state.isOrderStyle
		  	}
		},
		props: [],
		methods: {
			clickMe() {
				this.$router.push("./center")
			},
			//清除登录的id 跳转登录页面
			clearuid(){
				var that =this;
				window.localStorage.removeItem("uid");
				mui.toast(this.changlan['config']['yjtc']);
				//重新设置为不出车状态
				this.$store.commit("orderSatus",false);
				setTimeout(function(){
					that.$router.push("./login")
				},2000)
			},
			exit(){
				var that =this;
				var url = this.$BaseUrll+"/index/updateState";
				var uid = window.localStorage.getItem("uid");
				var data = {
					vc_drcode:uid,
					n_state:1
				};
				if(this.getDriverStyle){
					clearInterval(this.getwatchGps);
					mui.post(url,data,function(data){
							var data = JSON.parse(data);
							if(data['status']!=1){
								mui.toast(that.changlan['msgtip'][data['message']])
								return false;
							}
							that.clearuid();
						},"json"
					);
				}else{
					this.clearuid();
				}
				
			},
			imageup(){
				var that = this;
				//调用手机原生接口选择图片
				 plus.nativeUI.actionSheet({cancel:that.changlan['config']['qxtext'],buttons:[  
	                    {title:that.changlan['config']['camera']},  
	                    {title:that.changlan['config']['chunkphonto']}  
	                ]}, function(e){//1 是拍照  2 从相册中选择  
	                    switch(e.index){  
	                        case 1:that.appendByCamera();break;  
	                        case 2:that.appendByGallery();break;  
	                    }  
	                });  	
			},
			appendByCamera(){
				var that = this;
				 plus.camera.getCamera().captureImage(function(e){
//                  console.log(e,"appendByCamera");
                    plus.io.resolveLocalFileSystemURL(e, function(entry) { 
//                  	console.log(entry,"相机调用的方法")
                    var path = entry.toLocalURL(); 
//                  that.imgDataUrl = path
					 that.getBase64tow(path);
                    }, function(e) { 
                        mui.toast("读取拍照文件错误：" + e.message); 
                    }); 
    
                }); 
			},
			appendByGallery(){
				var that = this;
				 plus.gallery.pick(function(path){
				 	that.getBase64tow(path);
//                  that.imgDataUrl = path
                });
			},
			posimg(){//提交图片的方法
                var uid = window.localStorage.getItem("uid");
				var url = this.$BaseUrll+"/Login/updateHeadImg";
//				console.log(this.imgDataUrl,"图片的路径");
				var data = {
					vc_drcode:uid,
					vc_hred_img:this.imgDataUrl
				};
				var that = this;
				var wt=plus.nativeUI.showWaiting();
				mui.post(url,data,function(data){
						var data = JSON.parse(data);
						wt.close();
						if(data['status']==1){
//							mui.toast(data['message'])
							mui.toast(that.changlan['msgtip'][data['message']])
							return false;
						}else{
//							mui.toast(data['message'])
							mui.toast(that.changlan['msgtip'][data['message']])
							return false;
						}
					},"json"
				);
			},
			//图像转64位
			getBase64tow(url){
				var that =this;
				var canvasId = 'canvasBase64Imgid',  
                canvas = document.getElementById(canvasId);  
                if(canvas!=null){document.body.removeChild(canvas);}  
                var canvas = document.createElement("canvas");  
                canvas.innerHTML = 'New Canvas';  
                canvas.setAttribute("id", canvasId);  
                canvas.style.display='none';  
                document.body.appendChild(canvas);   
		        var ctx = canvas.getContext("2d");
		        var maxWidth = 231.3;//694
		        this.cacheImg(url,function(){
		        	canvas.width = this.width;  
                    canvas.height = this.height;  
                    var imageWidth = this.width,imageHeight = this.height;  
                    if (this.width > maxWidth){  
                        imageWidth = maxWidth;  
                        imageHeight = this.height * maxWidth/this.width;  
                        canvas.width = imageWidth;  
                        canvas.height = imageHeight;  
                    }
		           ctx.drawImage(this , 0 , 0,imageWidth, imageHeight);
		           //图片转成base64 
		           that.imgDataUrl = canvas.toDataURL("image/png");
		           that.posimg();
		        });
	        },
	        //检测图片加载情况
	        cacheImg(url, callback){
	        	var img = new Image()
	            img.setAttribute('crossOrigin', 'Anonymous');
	            img.src = url;
	            img.onload = function() {
	                callback.call(img)
	            }
	        },
	        //获取用户信息
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
//			console.log(this.changlan)
		},
		mounted() {
			var that = this;        		
        	mui.back = function(){
        		that.$router.push("./center")
        	}
		}

	}
</script>
<style lang="scss" scoped>
	@import "../assets/css/minx.scss";
	@import "../assets/css/config.scss";
</style>