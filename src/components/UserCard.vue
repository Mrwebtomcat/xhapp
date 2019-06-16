<template>
	<div class="card_user_box">
		<div class="usercontent" @click.stop="callFn">
			<div class="mian_info">
				<div class="myimg_left" :style="`background: url(${headImg?headImg:(n_sex?$mianImg:$womianImg)}) 0% 0% / 100% no-repeat;`">
				</div>
				<div class="context_right">
					<p class="qxuser" v-if="!isBottomShow">
						<span :class="isVip?'zjvip active':'zjvip'"></span>
						<span :class="isStart?'zjstart active':'zjstart'"></span>
						<span :class="isSm?'zjcard active':'zjcard'"></span>
						<!-- <span class="zjzun"></span> -->
					</p>
					<p class="cont_name mt20">{{username}}</p>
					<p class="cont_city mt20">{{cityinfo}}</p>
					<p class="cont_education mt20">{{hobby}}</p>
					<!-- <p class="cont_education mt20">{{meta}}</p> -->
					<!-- <p class="cont_phonetos">相册</p> -->
				</div>
			</div>
			<div v-if="isBottomShow" class="btncoms">
				<div class="dzhbtn" @click.stop="dzh">打招呼</div>
				<div class="msgbtn" @click.stop="postMsg">发信息</div>
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
			isVip :{
				type:[String,Number],
				default:0
			},
			isStart :{
				type:[String,Number],
				default:0
			},
			isSm :{
				type:[String,Number],
				default:0
			},
			isBottomShow :{
				type:[Number,Boolean],
				default:0
			},
			n_sex :{
				type:[String,Number],
				default:0
			},
			cityinfo:{
				type:[String,Number],
				default:'湛江 | 23岁 | 大学本科'	
			},
			hobby :{
				type:[String,Number],
				default:'喜欢打篮球，乒乓球，不喜欢晒太阳。。。'
			},
			meta :{
				type:[String,Number],
				default:'喜欢唱歌跳舞'
			},
			headImg:{
				type:[String,Number],
				default:'http://server.zjxunhun.com/uploads/album/20190516/155798426084463.jpeg'
			},
			typeCom:{
				type:[String,Number],
				default:0
			}
			// callFn:{
			// 	type:[Function],
			// 	default:(item)=>{
			// 		console.log(item)
			// 	}
			// }
		},
		methods:{
			handule:function(){
				this.$emit()
			},
			callFn:function(){
				this.$emit("dolinck")
			},
			dzh:function(){
				this.$emit("dzh")
			},
			postMsg:function(){
				this.$emit("postMsg")
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
		min-height: 300px;
		/* border-bottom: 1px solid #ccc; */
		box-sizing: border-box;
		margin-top: 20px;
		background: #fff;
		padding: 20px 0 ;
	}
	.usercontent{
		width:91%;
		margin: auto;
		padding-top: 10px;
	}
	.myimg_left{
		flex:  0 0 27%;
		min-height:200px;
		margin-right: 20px;
		border-radius: 10px;
		/* border:1px solid red; */
	}
	
	.btncoms{
		display: flex;
		margin-top: 10px;
		border-top: 1px solid #ddd;
	}
	.btncoms div{
		flex: 0 0 50%;
		text-align: center;
		padding: 15px 0;
	}
	.dzhbtn{
		border-right: 1px solid #ddd;
	}
	.msgbtn{
		
	}
	
	.mian_info{
		width: 100%;
		display: flex;
	}
	
	.context_right{
		flex:  1;
	}
	.mt20{
		margin-top: 30px;
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
	
	

</style>
