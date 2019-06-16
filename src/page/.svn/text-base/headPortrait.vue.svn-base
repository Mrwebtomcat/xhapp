<!--听单检测 -->
<template>
	<div class="headpotrai">
		<navigBar :ShowUsericon="true"  :requreClass="`icon-fanhui`"  :titleText="changlan['config']['changehead']" @checkMe="clickMe"></navigBar>
		<div class="headporcard" @click="imageup">
			<img id="headimg" :src="imgDataUrl" alt="北极熊猫" />
		</div>
		<button type="button" class="mui-btn changimg" @click="posimg">{{changlan['config']['changehead']}}</button>
	</div>
</template>
<script>
	import navigBar from '@/components/navigBar'; //navBartop 状态栏组件
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				imgDataUrl:"http://www.bjxm360.com/static/home/img/logo.jpg"
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
			imageup(){
				var that = this;
				 plus.nativeUI.actionSheet({cancel:that.changlan['config']['qxtext'],buttons:[  
	                    {title:that.changlan['config']['camera']},  
	                    {title:that.changlan['config']['chunkphonto']}  
	                ]}, function(e){//1 是拍照  2 从相册中选择  
	                	console.log(e,'拍照片返回的文件信息')
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
                    //就是这里www.bcty365.com
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
			uploadChange(event) {//上传图片方法
				var that =this;
				if(event.target.files.length>0){
					this.files = event.target.files[0];  //提交的图片
					that.getBase64(event.target,(url)=>{
						that.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片
					}); 
				}	
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
		        });
	        },
	        cacheImg(url, callback){
	        	var img = new Image()
	            img.setAttribute('crossOrigin', 'Anonymous');
	            img.src = url;
	            img.onload = function() {
	                callback.call(img)
	            }
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
			if(window.plus){  
                plusReady();  
            }else{  
                document.addEventListener("plusready",plusReady,false);  
            }  
		}

	}
</script>
<style scoped>
.headporcard{
	transform: translateY(160px);
	width: 694px;
	height: 694px;
	border-radius: 10px;
	background: #ccc;
	margin: auto;
	overflow: hidden;
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