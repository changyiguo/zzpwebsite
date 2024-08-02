// 加载动画
window.onload = function () {
    $(".loader").fadeOut(1500, function () {
        $(this).remove()
    })
};
// 显示当前时间
(function () {
    time()
    setInterval(time, 1000);
    function time() {
        dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours();
        var m = dt.getMinutes();
        var s = dt.getSeconds();
        document.querySelector(".showTime").innerHTML =
            "当前时间：" +
            y +
            "年" +
            mt +
            "月" +
            day +
            "日-" +
            h +
            "时" +
            m +
            "分" +
            s +
            "秒";
    }
})();
// 中国地图
(function () {
    var myChart = echarts.init(document.querySelector(".map .chart"));
    //点击各省份事件处理
    let _this = this;
    this.mapSelParam = {};

    myChart.on('click', param => {
        //获取到的省份名
        let temp = JSON.stringify(this.mapSelParam);
        if (this.mapSelParam) {
            //取消选中前一次选中的省份
            myChart.dispatchAction({
                type: 'geoUnSelect',
                seriesIndex: this.mapSelParam.seriesIndex,
                seriesName: this.mapSelParam.seriesName,
                dataIndex: this.mapSelParam.dataIndex,
                name: this.mapSelParam.name
            })
        }

        this.mapSelParam = {
            seriesIndex: param.seriesIndex,
            seriesName: param.seriesName,
            dataIndex: param.dataIndex,
            name: param.name
        }

        //如果前一次选中与当前选中相同，则return，取消选中
        if (temp === JSON.stringify(this.mapSelParam)) {
            this.mapSelParam = {};
            return;
        }

        //选中当前点击的省份
        myChart.dispatchAction({
            type: 'geoSelect',
            seriesIndex: this.mapSelParam.seriesIndex,
            seriesName: this.mapSelParam.seriesName,
            dataIndex: this.mapSelParam.dataIndex,
            name: this.mapSelParam.name
        })
    })

    // 按钮
    $(myChart.getDom()).append("<button onclick='unSelect()'>取消选中</button>");

    window.unSelect = function () {
        myChart.dispatchAction({
            type: 'geoUnSelect',
            seriesIndex: this.mapSelParam.seriesIndex,
            seriesName: this.mapSelParam.seriesName,
            dataIndex: this.mapSelParam.dataIndex,
            name: this.mapSelParam.name
        })
    }


    var option = {
        geo: {
            //引入中国地图
            map: 'china',
            //是否可以缩放，拖拽
            roam: true,
            zoom: 1,
            //地名配置项
            label: {
                show: true,
                textStyle: {
                    color: '#CCC'
                }
            },
            //各省样式
            itemStyle: {
                areaColor: '#3034A0',
                borderColor: '#3057D3',
                borderWidth: 1
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#4467CC',
                    borderColor: '#448aff',
                },
                label: {
                    color: '#FFF'
                }
            },
            select: {
                itemStyle: {
                    areaColor: '#4467CC',
                    borderColor: '#448aff',
                },
                label: {

                    color: '#FFF'

                }
            }
        },

        //系列配置
        series: [{
            name: '大数据',
            type: 'map',
            mapType: 'china',
            geoIndex: 0,
            data: [{
                name: '湖南',
                value: 1000
            }]
        }]

    }
    myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 就业折线图
(function () {
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    option = {
        title: {
            text: "",
            x: 'center',
            y: 'top',
            textStyle:
            {
                color: '#fff',
                fontSize: 13
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '8%',
            bottom: '5%',
            top: "13%",
            containLabel: true
        },
        color: ["#72b332", '#35a9e0'],
        legend: {
            data: ['test1', 'test2'],
            show: true,

            right: '15%',
            y: "0",
            textStyle: {
                color: "#999",
                fontSize: '13'
            },
        },
        toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['2022年', '2023年', '2024年', '2025年', '2026年', '2027年', '2028年'],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2d3b53'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    },
                    alignWithLabel: true,
                    interval: 0,
                    rotate: '15'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2d3b53'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#999"
                    }
                },
            }
        ],
        series: [
            {
                name: 'test1',
                type: 'line',
                smooth: true,
                symbol: 'roundRect',
                data: [1168, 1189, 1290, 1300, 1345, 1256, 1045]
            },
            {
                name: 'test2',
                type: 'line',
                smooth: true,
                symbol: 'roundRect',
                data: [1234, 1290, 1311, 1145, 1045, 900, 673]
            }
        ]
    };
    myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 地区柱状图
(function () {
    var myChart = echarts.init(document.querySelector(".bar1 .chart"));
    var item = {
        name: '',
        value: 1200,
        // 柱子颜色
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        }
    };
    option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'item',
            // 轴触发提示才有效
            axisPointer: {
                // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
                type: 'shadow'
            }
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '0',
            right: '3%',
            bottom: '3%',
            top: '5%',
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true,
            //显示边框
            show: true,
            //边框颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // 控制x轴
        xAxis: [
            {
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                // 刻度设置
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                }
            }
        ],
        // 控制y轴
        yAxis: [
            {
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: false
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
            }
        ],
        // 控制x轴
        series: [

            {
                // series配置
                // 颜色
                itemStyle: {
                    // 提供的工具函数生成渐变颜色
                    color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00fffb' }, // 0 起始颜色
                            { offset: 1, color: '#0061ce' }  // 1 结束颜色
                        ]
                    )
                },
                // 图表数据名称
                name: '用户统计',
                // 图表类型
                type: 'bar',
                // 柱子宽度
                barWidth: '60%',
                // 数据
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
            }
        ]
    };
    myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 技能熟练分析图
(function () {
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    var data = [90, 80, 75, 65, 65];
    var titlename = ["Java", "PHP", "GO", "HTML5", "VUE"];
    var valdata = ["精通", "熟练", "熟练", "掌握", "掌握"];
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    option = {
        //图标位置
        grid: {
            top: "10%",
            left: "22%",
            bottom: "10%"
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "#fff",

                rich: {
                    lg: {
                        backgroundColor: "#339911",
                        color: "#fff",
                        borderRadius: 15,
                        // padding: 5,
                        align: "center",
                        width: 15,
                        height: 15
                    }
                }
            }
        },
        {
            show: true,
            inverse: true,
            data: valdata,
            axisLabel: {
                textStyle: {
                    fontSize: 12,
                    color: "#fff"
                }
            }
        }
        ],
        series: [{
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: data,
            barCategoryGap: 50,
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 20,
                    color: function (params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num];
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    position: "inside",
                    formatter: "{c}%"
                }
            }
        },
        {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barCategoryGap: 50,
            data: [100, 100, 100, 100, 100],
            barWidth: 15,
            itemStyle: {
                normal: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15
                }
            }
        }
        ]
    };
    myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 地区分布图
(function () {
    var myChart = echarts.init(document.querySelector(".pie2 .chart"));
    var option = {
        legend: {
            top: "90%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 注意颜色写的位置
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        series: [{
            name: "点位统计",
            type: "pie",
            // 如果radius是百分比则必须加引号
            radius: ["10%", "70%"],
            center: ["50%", "42%"],
            roseType: "radius",
            data: [{
                value: 20,
                name: "西安"
            },
            {
                value: 26,
                name: "北京"
            },
            {
                value: 24,
                name: "上海"
            },
            {
                value: 25,
                name: "其他"
            },
            {
                value: 20,
                name: "武汉"
            },
            {
                value: 25,
                name: "杭州"
            },
            {
                value: 30,
                name: "深圳"
            },
            {
                value: 42,
                name: "广州"
            }
            ],
            // 修饰饼形图文字相关的样式 label对象
            label: {
                fontSize: 10
            },
            // 修饰引导线样式
            labelLine: {
                // 连接到图形的线长度
                length: 10,
                // 连接到文字的线长度
                length2: 10
            }
        }]
    };

    myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 人员流动图
(function () {
    var myChart = echarts.init(document.querySelector(".line2 .chart"));
    option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                lineStyle: {
                    color: "#dddc6b"
                }
            }
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        grid: {
            left: "10",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },

        xAxis: [{
            type: "category",
            boundaryGap: false,
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.2)"
                }
            },

            data: [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30"
            ]
        },
        {
            axisPointer: {
                show: false
            },
            axisLine: {
                show: false
            },
            position: "bottom",
            offset: 20
        }
        ],

        yAxis: [{
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },

            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        series: [{
            name: "流入",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: "#0184d5",
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                            offset: 0,
                            color: "rgba(1, 132, 213, 0.4)"
                        },
                        {
                            offset: 0.8,
                            color: "rgba(1, 132, 213, 0.1)"
                        }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                }
            },
            itemStyle: {
                normal: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                }
            },
            data: [
                30,
                40,
                30,
                40,
                30,
                40,
                30,
                60,
                20,
                40,
                20,
                40,
                30,
                40,
                30,
                40,
                30,
                40,
                30,
                60,
                20,
                40,
                20,
                40,
                30,
                60,
                20,
                40,
                20,
                40
            ]
        },
        {
            name: "流出",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    color: "#00d887",
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                            offset: 0,
                            color: "rgba(0, 216, 135, 0.4)"
                        },
                        {
                            offset: 0.8,
                            color: "rgba(0, 216, 135, 0.1)"
                        }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                }
            },
            itemStyle: {
                normal: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                }
            },
            data: [
                50,
                30,
                50,
                60,
                10,
                50,
                30,
                50,
                60,
                40,
                60,
                40,
                80,
                30,
                50,
                60,
                10,
                50,
                30,
                70,
                20,
                50,
                10,
                40,
                50,
                30,
                70,
                20,
                50,
                10,
                40
            ]
        }
        ]
    };
    myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 资金变化图
(function () {
    var myChart = echarts.init(document.querySelector(".line .chart"));
    var xData = function () {
        var data = [];
        for (var i = 2; i < 8; i++) {
            data.push(i + "月");
        }
        return data;
    }();

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (list) {
                var msg = "";
                for (let i in list) {
                    if (i == 0) {
                        msg += list[i].name + "<br>";
                    }
                    msg += list[i].seriesName + "：" + list[i].data + "万元<br>";
                    if (i > 0 && list[i].seriesName == "不可用余额" && list[i - 1].seriesName == "可用余额") {
                        msg += "总存款余额" + "：" + (list[i].data + list[i - 1].data) + "万元<br>";
                    }
                    if (i > 0 && list[i].seriesName == "支出" && list[i - 1].seriesName == "收入") {
                        msg += "净收入" + "：" + (list[i - 1].data - list[i].data) + "万元<br>";
                    }
                }
                return msg;
            }
        },
        legend: {
            textStyle: {
                color: '#fff',
            },
            data: ['可用余额', '不可用余额', '收入', '支出']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#808eb7',
                    width: 2
                }
            },
            splitLine: { //分割线配置
                lineStyle: {
                    color: "#AAAAAA56",
                }
            },
        },
        series: [{
            name: '可用余额',
            type: 'bar',
            stack: '余额',
            barMaxWidth: 30,
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        color: "#00ffff" // 0% 处的颜色
                    },
                    {
                        offset: 0,
                        color: "#3893e5" // 100% 处的颜色
                    }
                    ], false),
                },
            },
        },
        {
            name: '不可用余额',
            type: 'bar',
            stack: '余额',
            barMaxWidth: 30,
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 1,
                        color: "#bab3bd69" // 0% 处的颜色
                    },
                    {
                        offset: 0,
                        color: "#bab3bd69" // 100% 处的颜色
                    }
                    ], false),
                },
            },
        },
        {
            name: '收入',
            data: [220, 453, 301, 354, 290, 330, 320],
            type: 'line',
            itemStyle: {
                normal: {
                    color: "#0088D4",
                },
            },
        },
        {
            name: '支出',
            data: [213, 356, 123, 225, 78, 123, 354],
            type: 'line',
            itemStyle: {
                normal: {
                    color: "#DB3233",
                },
            },
        },
        ]
    };
    myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})()