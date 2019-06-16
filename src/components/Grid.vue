<!--九宫格组件  create by jack on 2018.17.20-->
<template>
  <div class="grid">
   		<div class="mui-content">
				<ul class="mui-table-view mui-grid-view mui-grid-9">
					<li v-for="itme in griddata" class="mui-table-view-cell mui-media mui-col-xs-4 oli">
						<router-link v-if="itme['routeurl']!=''" :to="itme['routeurl']" tag="a">
							<span :class="`iconfont ${itme['icon']} gidfonts` "></span>
							<div class="ieminfo">{{ itme['itmename']}}</div>
						</router-link>
						<a v-else :to="itme['routeurl']"  @click="tips">
							<span :class="`iconfont ${itme['icon']} gidfonts` "></span>
							<div class="ieminfo">{{ itme['itmename']}}</div>
						</a>
					</li>
				</ul>
				
			</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: ''
    }
  },
  props:['griddata'],
  methods: {
		tips(){
			mui.toast("该模块正在开发");
		}
	},
	created:function(){
	
	},
	mounted:function(){
		
	}
  
  
  
}
</script>
<style scoped>
	.gidfonts{
		font-size: 65px;
	}
	.ieminfo{
		margin: 16px 0;
		font-size: 28px;
		color: #333;
		width: 100%;
		justify-content: center;	
		white-space: normal;
	}
</style>