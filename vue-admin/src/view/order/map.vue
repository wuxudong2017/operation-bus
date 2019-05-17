<template>
  <div class="map">
    <div id="container" class="container" :style="{'width':w+'px','height':h+'px'}"></div>

    <el-button @click="sendMessageToServer" type="primary">Click</el-button>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  name: "dispathMap",
  data() {
    return {
      w: "",
      h: "",
      userList: []
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    message: function(val) {
      this.userList = val;
      console.log(this.userList);
    }
  },
  methods: {
    //socket
    sendMessageToServer: function() {
      this.$socket.emit("message", [
        "101001",
        "101002",
        "101003",
        "101004",
        "101005"
      ]);
      //插入地图标记
 const map = new AMap.Map("container", {
        resizeEnable: true,
        center:[113.61332,34.74821],
       // center: [113.357239, 33.626731], //地图中心点
        zoom: 8 //地图显示的缩放级别
      });
      function adMarker(provinces) {
        var marker = [];
        for (var i = 0; i < provinces.length; i += 1) {
          var markerContent =
            "<h1>HELLO</h1>" +
            '<span class="text">' +
            provinces[i].userId +
            "</span>" +
            "</span>";
          let row = provinces[i].longitude,
            col = provinces[i].latitude;
          marker = new AMap.Marker({
            position: new AMap.LngLat(row, col),
            // 将一张图片的地址设置为 icon
            icon:
              "http://a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
            // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
            offset: new AMap.Pixel(-13, -30),
            extData: {
              //自定义属性
              userId: provinces[i].userId
            },
            clickable: true,
            map: map
          });
          //点标注的点击事件
          marker.on("click", function(e) {
            console.log(e);
          });
          marker.on("mouseover", function(e) {
            console.log("adddd");
          });
        }
      }
      // 工人地图信息
      adMarker(this.userList);
    },
    init() {
      const $this = this;
      const map = new AMap.Map("container", {
        resizeEnable: true,
        center: [113.357239, 33.626731], //地图中心点
        zoom: 16 //地图显示的缩放级别
      });
      var district = null;
      var polygons = [];
      function drawBounds() {
        //加载行政区划插件
        if (!district) {
          //实例化DistrictSearch
          var opts = {
            subdistrict: 0, //获取边界不需要返回下级行政区
            extensions: "all", //返回行政区边界坐标组等具体信息
            level: "district" //查询行政级别为 市
          };
          district = new AMap.DistrictSearch(opts);
        }
        //行政区查询
        district.setLevel("district");
        district.search("叶县", function(status, result) {
          map.remove(polygons); //清除上次结果
          polygons = [];
          var bounds = result.districtList[0].boundaries;
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              var polygon = new AMap.Polygon({
                strokeWeight: 2,
                path: bounds[i],
                fillOpacity: 0.4,
                fillColor: "#80d8ff", // 蒙版覆盖颜色
                strokeColor: "#0091ea"
              });
              polygons.push(polygon);
            }
          }
          map.add(polygons);
          map.setFitView(polygons); //视口自适应
        });
      }
      drawBounds();
      AMap.plugin("AMap.ToolBar", function() {
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: inherit;
  min-height: 720px;
  height: calc(100%);
}
</style>
