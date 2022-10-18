export default () => {
  const mapRender = (data: any = [], mapData: any = []) => {
    let mapLocal: any = [];
    mapData.forEach((value: any, index: number) => {
      console.log(value.properties.name);
      mapLocal.push(value.properties.name);
    });
    //特殊城市
    let city = ["北京", "重庆", "上海", "天津"];
    let area: any = {
      内蒙古: "内蒙古自治区",
      新疆: "新疆维吾尔自治区",
      广西: "广西壮族自治区",
      宁夏: "宁夏回族自治区",
      西藏: "西藏自治区",
      澳门: "俺们特别行政区",
      香港: "香港特别行政区",
    };
    // 便利处理字典
    let result = data.map((i: any, index: number) => {
      let name = "";
      if (city.find((x: any) => x === i.properties.name)) {
        name = i.properties.name + "市";
      } else if (area[i.properties.name]) {
        name = area[i.properties.name];
      } else {
        name = i.properties.name + "省";
      }
      return {
        name: i.properties.name,
        value: Number(i.properties.adcode), //将省的id作为Value,看需求可更改
      };
    });
    // echarts 的数据配置选项 具体看官网
    let option = {
      title: {
        text: "中国地图",
        left: "right",
        triggerEvent: true,
      },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        left: "left",
        min: 100000,
        max: 800000,
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#a7ce89",
            "#9fe080",
            "#40b27d",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["高", "低"],
        calculable: true,
      },
      series: [
        {
          name: "中国地图",
          type: "map",
          roam: true,
          map: "china",
          // 设置地图的文字
          label: {
            show: true,
            fontSize: 8,
            color: "#fff",
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          data: result,
        },
      ],
    };
    return option;
  };
  return mapRender;
};
