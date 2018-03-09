/**

 */
;(function(){

    var oChart=Highcharts.chart;
    Highcharts.chart=function(id,option){
        if(document.getElementById(id)||$(id).size()>0){
            oChart(id,option)
        }
    }

    Highcharts.setOptions({
        credits:{
            enabled:false
        },
        chart:{
            style:{'fontFamily':'"microsoft yahei",arial'}
        },
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function(e) {
                        return false;
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
                            return false;
                        }
                    }
                }
            }
        }
    });



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
            tickAmount: 5
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
            tickAmount: 6,
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


    var xsOptions=$.extend(true,{},tableOptions,linePlotOption,{
        tooltip:{
            formatter:function(){
                return this.point.name+'<br>'+this.series.name+':'+this.point.y;
            }
        },
        yAxis:{
            plotLines: [{
                color: '#4ED8DA',
                dashStyle: 'dash',
                width: 1,
                label: {
                    align: 'right',
                    style: {
                        color:'#4ED8DA'
                    },
                    x: -10
                },
                events:{
                    click:function(){
                        console.log(this)
                    }
                },
                zIndex: 3
            }]
        },
        xAxis:{
            labels:{
                step:pageParams.step //折线图间隔
            }
        },
        legend:{
            align:'right',
            verticalAlign:'top',
            floating:true
        }
    });
    ;(function(){
        var options=$.extend(true,{},xsOptions,{
            yAxis:{
                plotLines:[{
                    value:pageParams.avg,
                    tickAmount:5,
                    label:{
                        text:'平均值:'+pageParams.avg //折线图平均值
                    }
                }]
            },
            title:{
                text:pageParams.title //折线图标题
            },
            series: [{
                name: pageParams.label, //折线图
                data: pageParams.data
            }]
        });
        Highcharts.chart('chart-ddxs-1',options);
    })();
    //统计字符数
    function getCharLen(str){
        return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
    }

    //按字符截字
    function cutStr(str,len){
        if(getCharLen(str)<=len)return str;
        var slen=parseInt(len/2),tmp;
        do{
            tmp=str.substring(0,slen);
            slen++;
        }while(getCharLen(tmp)<len);
        return tmp;
    }

    ;(function(){
        //var columns=[["众泰Z300众泰众泰众泰众泰众泰众泰","众泰Z560","众泰Z600","丢?汽大众迈??1.8t众迈??","丢?汽大众迈??2.0t众迈??","众泰Z700","众泰Z700"],[10,1,3,10,1,3,10]];
        var bar_config = {pointWidth: 25,groupPadding: 0.3};
        if(pageParams.bar_num > 10){
            bar_config = {};
        }
        var columns=pageParams2.data;
        var options=$.extend(true,{},tableOptions,{
            chart:{
                type:'bar'
            },
            plotOptions:{
                series: bar_config,
                column: {
                    dataLabels:{
                        formatter:function(){
                            return '';
                        }
                    }
                }
            },
            xAxis: {
                categories:columns[0],
                labels:{
                    step:1,
                    formatter:function(){
                        if(getCharLen(this.value)>16){
                            return cutStr(this.value,16)+'...'
                        }
                        return this.value;

                    }
                },
                gridLineWidth: 1

            },
            legend:{
                enabled:false
            },
            yAxis:{
                opposite: true,
                showEmpty: true,
                tickAmount: 6,
                title: {
                    text: ''
                },
                gridLineDashStyle: 'dash'
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
                    name: pageParams2.label,

                    data:columns[1]//[{name:'',y:100},]
                }
            ]
        });
        Highcharts.chart('chart-ddxs-2',options);
    })();

})();

















