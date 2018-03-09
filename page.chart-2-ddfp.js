/**

 */
;(function(){
//去除非本页面使用图表报错的现象
    var oChart=Highcharts.chart;
    Highcharts.chart=function(id,option){
        if(document.getElementById(id)||$(id).size()>0){
            oChart(id,option)
        }
    }
//全局
    Highcharts.setOptions({
        credits:{
            enabled:false
        },
        chart:{
            style:{'fontFamily':'microsoft yahei'}
        },
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function(e) {
                        return false; // 直接 return false 即可禁用图例点击事件
                    }
                },
                marker:{
                    radius:2
                },
                lineWidth:1,
                connectNulls:true
            },
            pie: {
                point: {
                    events: {
                        legendItemClick: function(e) {
                            return false; // 直接 return false 即可禁用图例点击事件
                        }
                    }
                }
            }
        }
    });



//表格对应属性共用
    var tableOptions={
        chart:{type:'column'},
        title:{
            style:{'fontSize':'16px','color':'#656579'}
        },
        colors:['#63A8EB','#ADE268'],
        plotOptions:{
            column:{
                dataLabels:{
                    enabled:true,
                    verticalAlign:'middle',
                    inside:true,
                    style:{'color':'#656579',"textOutline": "none","fontSize":"14px","fontWeight":"normal",'textShadow':'none'},
                    formatter:function(){
                        if(this.point.y===0)return "";
                        return this.point.y;
                    }
                }
            }

        },
        legend: {
            floating:false,
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 30,
            symbolRadius:0,
            itemStyle:{'fontSize':'12px','color':'#656579','fontWeight':'normal'}
        },
        xAxis:{
            tickLength: 0,
            lineColor:'#efefef',
            gridLineWidth: 0,
            labels:{
                style:{'fontSize':'12px','color':'#9898A1'}
            }

        },
        yAxis: [{
            title: {
                text: ''
            },
            lineColor: '#efefef',
            lineWidth: 1,
            tickAmount: 6
        },
            {
                title: {
                    text: ''
                },
                lineColor: '#efefef',
                lineWidth: 1,
                opposite: true,
                showEmpty: true
            }
        ]
    };
//折线图公用配置
    var linePlotOption= {
            chart:{
                type:'line'
            },
            tooltip:{
                crosshairs: {
                    width: 1,
                    color: '#4ED8DA'
                },
                shadow:false,
                shape:'square',
                backgroundColor:'rgba(74,74,74,.9)',
                borderWidth:0,
                style:{ "color": "#fff","fontWeight":"normal"},
                formatter:function(){
                    return this.point.category+'<br>'+this.series.name+':'+this.point.y;
                }
            },
            yAxis: {
                lineWidth:1,
                lineColor:'#EDEFF5',
                title: {
                    text: ''
                }
            },
            xAxis: {
                lineWidth:1,
                lineColor:'#EDEFF5',
                title: {
                    text: null
                },
                type:'category'
            },
            colors:['#4ED8DA'],
            legend: {
                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom',
                y:0
            }
        }

        ;(function(){
        //var columns=[['2017-1-1','2017-1-2','2017-1-3'],[300,88,333],[222,333,333]];
        var columns = pageParams.data;
        var options=$.extend(true,{},tableOptions,{
            plotOptions:{
                series: {
                   // pointWidth: 92,
                   // groupPadding: 0.3
                },
                column: {
                    stacking: 'normal',
                    dataLabels:{
                        formatter:function(){
                            return '';
                        }
                    }
                }
            },
            tooltip:{
                crosshairs: {
                    width: 1,
                    color: '#4ED8DA'
                },
                shadow:false,
                shared:true,
                shape:'square',
                backgroundColor:'rgba(74,74,74,.9)',
                borderWidth:0,
                style:{ "color": "#fff","fontWeight":"100"},
                formatter:function(){
                    var sub='';
                    for(var i=0,len=this.points.length;i<len;i++){
                        sub+=this.points[i].series.name+':'+parseInt((this.points[i].y*100))/100+'<br>';
                    }
                    sub=sub.replace(/<br>$/,'');
                    return this.x+'<br>'+sub;
                }
            },
            colors:['#ADE268','#63A8EB'],
            chart: {
                type: 'column'
            },
            xAxis: {

                labels:{
                    step:pageParams.step
                },
                categories:columns[0]
            },
            title: {
                text: pageParams.title
            },
            series:[{
                name:'获得网上订单已分配量',
                data:columns[1]
            },{
                name:'获得网上订单已丢失量',
                data:columns[2]
            }]
        });

        Highcharts.chart('chart-ddfp-1',options);
    })();
    ;(function(){
        var columns = pageParams2.data;
        var options=$.extend(true,{},tableOptions,{
            plotOptions:{
                series: {
                    groupPadding: 0.3
                },
                column: {
                    dataLabels:{
                        formatter:function(){
                            return '';
                        }
                    }
                }
            },
            xAxis: {
                //title:{text:''},
                categories:columns[0],
                labels:{
                   //style:{'fontSize':'9px'},
                   //step:1,
                   //rotation:-45
                   autoRotation: [-45]
                }
            },
            yAxis:{
                title:{text:''},
                tickAmount:6
            },
            title: {
                text: pageParams2.title
            },
            tooltip:{
                crosshairs: {
                    width: 1,
                    color: '#4ED8DA'
                },
                shadow:false,
                shared:true,
                shape:'square',
                backgroundColor:'rgba(74,74,74,.9)',
                borderWidth:0,
                style:{ "color": "#fff","fontWeight":"normal"},
                formatter:function(){
                    var sub='';
                    for(var i=0,len=this.points.length;i<len;i++){
                        sub+=this.points[i].series.name+':'+parseInt((this.points[i].y*100))/100+'<br>';
                    }
                    sub=sub.replace(/<br>$/,'');
                    return this.x+'<br>'+sub;
                }
            },
            series:[
                {
                    type: 'column',
                    name:pageParams2.label,
                    data:columns[1]
                }
            ]
        });
        Highcharts.chart('chart-ddfp-2',options);
    })();

})();

