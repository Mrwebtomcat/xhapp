<!-- 聊天输入 -->
<template>
	<div class="send_ltmsg">
		<button class="chatbtn">推荐语</button>
		<input class="chatinput" v-model="chatval" type="text">
		<button class="chatbtn" @click="sendMSg">发送</button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				chatval:''
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
			sendMSg:function(){
				this.$emit("sendchats",this.chatval);
				this.chatval = "";
			}
		},
		mounted:function(){
			// mui.previewImage();
		}
	}
</script>

<style scoped>
	.send_ltmsg{
		width: 100%;
		height: 90px;
		position: fixed;
		border-top: 1px solid #ccc;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 2%;
	}
	.chatinput{
		flex:0 0 70%;
		height: 70px;
		padding: 0;
		margin: 0;
		font-size: 30px;
		text-indent:15px ;
	}
	.chatbtn{
		height: 70px;
		flex: 0 0 15%;
	}
</style>
