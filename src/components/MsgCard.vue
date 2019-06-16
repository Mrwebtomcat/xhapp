<template>
	<div class="msg_card_jj">
		<div class="usercontent" @click="callFn">
			<div class="myimg_left" :style="`background: url(${headImg}) no-repeat;background-size:cover;`">
			</div>
			<div class="context_right">
				
				<!-- <p class="qxuser">
					<span class="zjvip active"></span>
					<span class="zjstart"></span>
					<span class="zjcard"></span>
				</p> -->
				<p class="cont_name mt20">{{username}}</p>
				<p class="cont_city mt20">{{cityinfo}}</p>
				<p class="cont_education mt20">{{meta}}</p>
				<p class="cont_education mt20">{{hobby}}</p>
				<!-- <p class="cont_phonetos">相册</p> -->
				<button class="iconfont icon-guanbi closeInfo" @click.stop="closeFn"></button>
				<button class="iconfont icon-xiaoxi1 sendbtn" @click.stop="sendMsg">    发信息</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:{
			username :{
				type:[String,Number],
				default:'米老鼠Kiss'
			},
			cityinfo:{
				type:[String,Number],
				default:'湛江 | 23岁 | 大学本科'	
			},
			hobby :{
				type:[String,Number],
				default:'2019-05-30'
			},
			meta :{
				type:[String,Number],
				default:'喜欢唱歌跳舞'
			},
			headImg:{
				type:[String,Number],
				default:'http://server.zjxunhun.com/uploads/album/20190516/155798426084463.jpeg'
			},
			callFn:{
				type:[Function],
				default:(item)=>{
					console.log(item)
				}
			},
			closeFn:{
				type:[Function],
				default:(item)=>{
					console.log("关闭了 ")
				}
			},
			sendMsg:{
				type:[Function],
				default:(item)=>{
					console.log("发了一条消息 ")
				}
			}
		},
		methods:{
			handule:function(){
				this.$emit()
			}
		},
		mounted:function(){
			// mui.previewImage();
		}
	}
</script>

<style scoped>
	
	.card_user_box{
		width: 100%;
		padding: 10px;
		height: 400px;
		border-bottom: 1px solid blue;
		box-sizing: border-box;
	}
	
	.usercontent{
		position: relative;
		width:95%;
		margin: auto;
		display: flex;
		margin-top: 20px;
		background: #fff;
		padding:5% 3%;
		border-radius: 3px;
	}
	
	.myimg_left{
		flex:  0 0 170px;
		height:170px;
		margin-right: 20px;
		border-radius: 10px;
		border:1px solid red;
	}
	
	.sendbtn{
		background: linear-gradient(#8070f1, #b06cef);
		padding:5px 20px;
		color: #fff;
		border-radius: 3px;
		position: absolute;
		right: 20px;
		bottom: 13%;
	}
	
	.context_right{
		flex:  1;
	}
	
	.mt20{
		margin-top: 10px;
	}
	
	.user_meta{
		width:80%;
		margin: auto;
		padding-top: 20px;
	}
	
	.cont_name{
		font-size: 30px;
		font-weight: bold;
	}
	
	.cont_city,.cont_education,.cont_phonetos{
		font-size: 26px;
	}
	
	.closeInfo{
		position: absolute;
		right: 10px;
		top: 0px;
		color: #333;
		border-radius: 50%;
	}
	

</style>
