<template>
  <div>
  	<button type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn mui-btn-primary">{{btnval}}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
    }
  },
  props:["btnval"],
  methods: {
		changStyle:()=>{
			var that= this;
				mui(document.body).on('tap', '.mui-btn', function(e) {
			    mui(this).button('loading');
			    setTimeout(function() {
			        mui(this).button('reset');
			        that.$emit("btntapl")
			    }.bind(this), 2000);
			});
		}
	},
	created:function(){
		this.changStyle()
	},
	mounted:function(){
		
	}
  
  
  
}







</script>
