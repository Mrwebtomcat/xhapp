<!--地图组件 produce by jack on 2018-7-16-->
<template>
	<div class="mapage">
		<div class="mapcontent" id="map"></div>
	</div>
</template>

<script>
import {mapMutations} from "vuex"
import gps from '../utils/gps'
import endicon from './img/gpsend.svg'
import starticon from './img/gpstart.svg'

export default {
  data () {
    return {
      zoom:15,//地图缩放大小
      myLatLng:{
		lat:40.036255,
		lng: 116.30514
//		lat: 52.2848179638,
//		lng: 104.3045425415
	  },
	  dvNeworke:"",
	  map:"",
      watchId: null
    }
  },
  computed:{
  	getlatlng(){
  		//监听全局的定位 
  		return this.$store.state.latanlng
  	}
  },
  props:['startjw','endjw'],
  methods: {
  		...mapMutations(['setPos']),	
		initMap(){ //初始化地图
			//用户的起点终点
			var startjw = JSON.parse(this.startjw);
			var endjw = JSON.parse(this.endjw);
			
			this.map = new google.maps.Map(document.getElementById('map'), {
				zoom: this.zoom,
				center: this.getlatlng,
				gestureHandling :"greedy",
				disableDefaultUI: false,
				zoomControl: true,    			//地图任意缩放可见控件
			  	mapTypeControl: false,
			  	scaleControl: false,
			  	streetViewControl: false,
			  	rotateControl: false,
			  	fullscreenControl: false
			});
			
			//如果终点不存在只显示起点标记
			if(endjw){
				this.calculateAndDisplayRoute(this.map,startjw,endjw);
			}else{
				var marker = new google.maps.Marker({
	              	map:this.map,
	              	position: startjw
	            });
			}

		},
		calculateAndDisplayRoute(map,startjw,endjw){//规划路线
			var that = this;
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
			directionsDisplay.setMap(map);

			
			directionsService.route({
				origin:startjw,
				destination:endjw,
				optimizeWaypoints: true,
				travelMode: 'DRIVING'
			}, function(response, status) {
				if(status === 'OK') {
					directionsDisplay.setDirections(response);
					var route = response.routes[0];

					var beachMarker1icon = {
		              url:endicon ,
		              size: new google.maps.Size(28, 38),//精灵或图像的显示大小。使用精灵时，您必须指定精灵大小。如果未提供大小，则会在图像加载时设置大小
		              origin: new google.maps.Point(0, 0),//图片在精灵中的位置，如果有的话。默认情况下，原点位于图像的左上角(0, 0)。
		//            anchor: new google.maps.Point(17, 34),根据地图上标记的位置锚定图像的位置。默认情况下，锚点位于图像底部的中心点。
		              scaledSize: new google.maps.Size(28, 38)//缩放后整个图像的大小，如果有的话。使用此属性可以拉伸/缩小图像或精灵。
		            };
		            
		            var beachMarker2icon = {
		              url: starticon,
		              size: new google.maps.Size(28, 38),
		              origin: new google.maps.Point(0, 0),//
		              scaledSize: new google.maps.Size(28, 38)
		            };
					var beachMarker = new google.maps.Marker({
					    position: that.poslnla(route.legs[0].end_location),
					    animation: google.maps.Animation.DROP,
						icon:beachMarker1icon,
						map: map,
						zindex:99
					});

					var beachMarker2 = new google.maps.Marker({
					    position: that.poslnla(route.legs[0].start_location),
					    animation: google.maps.Animation.DROP,
						icon:beachMarker2icon,
						map: map,
						zindex:99
					});
					
				}
			})
		},
		geoInf( position ) {
			var str = "";
			str += "地址："+position.addresses+"\n";//获取地址信息
			str += "坐标类型："+position.coordsType+"\n";
			var timeflag = position.timestamp;//获取到地理位置信息的时间戳；一个毫秒数；
			str += "时间戳："+timeflag+"\n";
			var codns = position.coords;//获取地理坐标信息；
			var lat = codns.latitude;//获取到当前位置的纬度；
			str += "纬度："+lat+"\n";
			var longt = codns.longitude;//获取到当前位置的经度
			str += "经度："+longt+"\n";
			var alt = codns.altitude;//获取到当前位置的海拔信息；
			str += "海拔："+alt+"\n";
			var accu = codns.accuracy;//地理坐标信息精确度信息；
			str += "精确度："+accu+"\n";
			var altAcc = codns.altitudeAccuracy;//获取海拔信息的精确度；
			str += "海拔精确度："+altAcc+"\n";
			var head = codns.heading;//获取设备的移动方向；
			str += "移动方向："+head+"\n";
			var sped = codns.speed;//获取设备的移动速度；
			str += "移动速度："+sped;
			console.log(JSON.stringify(position),"我的定位信息");
			this.setPos({"lat":lat,"lng":longt})
			console.log( str );
		},
		navigateWithMap(dst,adress,istart){//调用第三方地图
			if('Android'===plus.os.name&&navigator.userAgent.indexOf('StreamApp')>0){
				plus.nativeUI.toast('当前环境暂不支持地图插件');
				return;
			}
			
			//起点
			var src = new plus.maps.Point(this.getlatlng['lng'],this.getlatlng['lat']);
			// 目的地
			var dst = new plus.maps.Point(dst['lng'],dst['lat']);
			
//			console.log('起点',src);
//			console.log('目的地',dst);
//			
//			console.log(this.getlatlng['lng'],"lng司机现在位置")
//			console.log(this.getlatlng['lat'],"lat司机现在位置")
			//adress 到达 目的地址的描述
			plus.maps.openSysMap( dst, adress, src ); //xitongditu
			
		},
		getPos() {
//			alert( "获取位置信息:" );
			try{
				plus.geolocation.getCurrentPosition(this.geoInf, function ( e ) {
					alert( "获取位置信息失败："+e.message );
				}, {geocode:false} );
			}catch(e){
				this.setPos(this.myLatLng)
			}
		},
		watchPos() {
			var that = this;
			if ( this.watchId ) {
				return;
			}
			this.watchId =plus.geolocation.watchPosition(function (p){
//				outSet( "监听位置变化信息:" );
				that.geoInf( p );
			},function (e){
//				outSet( "监听位置变化信息失败："+e.message );
			},{geocode:false});
		},
		clearWatch() {
			
			if ( this.watchId ) {
				outSet( "停止监听位置变化信息" );
				plus.geolocation.clearWatch( watchId );
				watchId = null;
			}
		},
		poslnla(obj){
			var str = JSON.stringify(obj);
			var s = str.replace("(","");
			s = s.replace(")","");
		    return JSON.parse(s);
		},
		isSoft(){//是否安装了百度或者其他软件
			try {
				
				var packageName ='com.baidu.BaiduMap';//百度地图的包名
		        var main = plus.android.runtimeMainActivity();
		        var packageManager = main.getPackageManager();
		        var PackageManager = plus.android.importClass(packageManager);
		        var packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
		        if (packageInfo) {
//		        	mui.toast("安装了百度")
						//已安装
		        } else {
		        	mui.toast("no map!")
				//未安装
		        }
			  } catch (e) {
					//未安装
			}
		},
		plusReady(){
			//判断网络使用数据的类型
			var types = {}; 
			types[plus.networkinfo.CONNECTION_UNKNOW] = "Unknown connection"; 
			types[plus.networkinfo.CONNECTION_NONE] = "None connection"; 
			types[plus.networkinfo.CONNECTION_ETHERNET] = "Ethernet connection"; 
			types[plus.networkinfo.CONNECTION_WIFI] = "WiFi connection"; 
			types[plus.networkinfo.CONNECTION_CELL2G] = "Cellular 2G connection"; 
			types[plus.networkinfo.CONNECTION_CELL3G] = "Cellular 3G connection"; 
			types[plus.networkinfo.CONNECTION_CELL4G] = "Cellular 4G connection"; 
//			alert( "Network: " + types[plus.networkinfo.getCurrentType()] );
			if(types[plus.networkinfo.getCurrentType()].indexOf("WiFi connection")>-1){
				//Wifi网络
				this.dvNeworke = 1;
			}else if(types[plus.networkinfo.getCurrentType()].indexOf("None connection")>-1 ||  types[plus.networkinfo.getCurrentType()].indexOf("Unknown connection")>-1){
				this.dvNeworke = 0; //离线或者没有网络
			}else{
				//移动网络 4G 3G 2G
				this.dvNeworke = 2;
			};
		}
	},
	created:function(){
		this.isSoft();
	},
	mounted:function(){
		try{
			
			this.plusReady();
			plus.navigator.setStatusBarBackground("#111b30")
			
		}catch(e){
			
		}
		this.getPos();
		this.initMap();
		
	}
  
  
  
}







</script>
<style lang="scss" scoped>
	@import "./css/googlemap.scss"
</style>