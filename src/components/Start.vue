<!--星级组件  create by jack on 2018.17.20-->
<template>
  <div class="start">
  	<!--5星-->
  	<div v-if="items <= 100 && items >= 95">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 5" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--4.5星-->
  	<div v-else-if="items < 95 && items >= 90">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 4" ></span>
  		<span class="iconfont icon-star2 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--4星-->
  	<div v-else-if="items < 90 && items >= 85">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 4" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--3.5星-->
  	<div v-else-if="items < 85 && items >= 80">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 3" ></span>
  		<span class="iconfont icon-star2 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--3星-->
  	<div v-else-if="items < 80 && items >= 75">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 3" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 2" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--2.5星-->
  	<div v-else-if="items < 75 && items >= 70">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 2" ></span>
  		<span class="iconfont icon-star2 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 2" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--2星-->
  	<div v-else-if="items < 70 && items >= 65">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 2" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 3" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--1.5星-->
  	<div v-else-if="items < 65 && items >= 60">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="iconfont icon-star2 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 3" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--1星-->
  	<div v-else-if="items < 60 && items >= 55">
  		<span class="iconfont icon-star1 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 4" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	<!--0.5星-->
  	<div v-else-if="items < 55">
  		<span class="iconfont icon-star2 icon-kongxingxing2222" v-for="item in 1" ></span>
  		<span class="iconfont icon-star3 icon-kongxingxing2222" v-for="item in 4" ></span>
  		<span class="fen">{{items}}  {{fen}}</span>
  	</div>
  	 
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  props:["items","fen"],
  methods: {
		prcessnum(a){
		
			
		}
	},
	created:function(){

	},
	mounted:function(){
	
	}
}
</script>
<style type="text/css">
	.start .icon-kongxingxing2222{
		color: #ff8700;
		font-size:30px;
		margin-right: 5px;
	}
	.fen{
		font-size: 28px;
		color: #fff;
		margin-left: 10px;
	}
</style>