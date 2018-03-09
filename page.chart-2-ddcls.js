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
                    style:{'color':'#656579',"textOutline": "none","fontSize":"14px","fontWeight":"normal",'textShadow':'none'}
                }
            }

        },
        legend: {
            floating:false,
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 30,
            itemStyle:{'fontSize':'12px','color':'#656579','fontWeight':'normal'}
        },
        xAxis:{
            tickLength: 0,
            lineColor:'#efefef',
            gridLineWidth: 1,
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
                tickAmount: 6,
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
                type:'category',
                gridLineWidth: 0
            },
            colors:['#4ED8DA'],
            legend: {
                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom'
            }
        }


        ;(function(){
       /* var $this=$('#chart-ddcls-1');
        if($this.size()<1)return;
        var categories=eval($this.data('categories'));
        var nums1=$this.data('nums1');
        var nums2=$this.data('nums2');
        var step=parseInt($this.data('step')||1);*/

        var options=$.extend(true,{},tableOptions,linePlotOption,{
            title:{
                text:pageParams.title
            },
            //colors:['#FF6C60','#4ED8DA'],'#63A8EB'
            colors:['#FF6C60','#4ED8DA'],//蓝色在前，绿色在后
            tooltip:{
                crosshairs: {
                    width: 1,
                    color: '#4ED8DA'
                },
                shared: true,
                shadow:false,
                shape:'square',
                backgroundColor:'rgba(74,74,74,.9)',
                borderWidth:0,
                style:{ "color": "#fff","fontWeight":"normal"},
                formatter:function(){
                    //console.log(this)
                    var sub='';
                    for(var i=0,len=this.points.length;i<len;i++){
                        sub+=this.points[i].series.name+':'+parseInt((this.points[i].y*100))/100+'<br>';
                    }
                    sub=sub.replace(/<br>$/,'');
                    return this.x+'<br>'+sub;
                }
            },
            xAxis:{
                labels:{
                    step:pageParams.step //折线图间隔
                },
                categories:pageParams.data[0]
            },
            legend:{
                align:'right',
                verticalAlign:'top',
                layout: 'horizontal',
            },
            series: [{
                name: '非公共网上订单量',
                data: pageParams.data[2]
            },{
                name: '抢得公共网上订单量',
                data: pageParams.data[1]
            }]
        });
        Highcharts.chart('chart-ddcls-1',options);//折线图
    })();


    //饼图基本配置
    var pieOptions=$.extend(true,{},tableOptions,{
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        colors:['#FF6C60','#4ED8DA'],
        tooltip:{
            shadow:false,
            shape:'square',
            backgroundColor:'rgba(74,74,74,.9)',
            borderWidth:0,
            style:{ "color": "#fff","fontWeight":"normal"},
            formatter:function(){
                return this.point.name+':'+this.point.m+' ('+this.point.p+'%)';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    style:{
                        'color':'#656579',
                        'textShadow':'none',
                        'fontSize':'12px'
                    }
                },
                showInLegend: true,
                states: {
//                    hover: {
//                        enabled: false
//                    }
                }
            }
        }
    });
    ;(function(){
        /*var ddcls=$('#chart-ddcls-2');
        if(ddcls.size()<1)return;
        var title=ddcls.data('title');
        var nums=ddcls.data('nums');
        var percents=[];
        var sum=0;
        for(var i=0,len=nums.length;i<len;i++){
            sum+=nums[i];
        }
        for(var i=0,len=nums.length;i<len;i++){
            percents.push(+(nums[i]/sum).toFixed(1));
        }
        console.log(nums[0]+'='+percents[0]);*/
        var options=$.extend(true,{},pieOptions,{
            title:{
                text:pageParams.title2
            },
            series: [{
                type:'pie',
                data: pageParams.cake
            }]
        });
        Highcharts.chart('chart-ddcls-2',options);//饼图-公共非公共
    })();

    ;(function(){
        /*var $this=$('#chart-ddcls-3');
        if($this.size()<1)return;
        var categories=eval($this.data('categories'));
        var nums1=$this.data('nums1');
        var nums2=$this.data('nums2');
        var step=parseInt($this.data('step')||1);*/

        var options=$.extend(true,{},tableOptions,linePlotOption,{
            title:{
                text:pageParams2.title
            },
            colors:['#FF6C60','#4ED8DA'],
            tooltip:{
                crosshairs: {
                    width: 1,
                    color: '#4ED8DA'
                },
                shared: true,
                shadow:false,
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
            xAxis:{
                categories:pageParams2.data[0],
                labels:{
                    step:pageParams.step
                }
            },
            legend:{
                align:'right',
                verticalAlign:'top',
                layout: 'horizontal',
            },
            series: [{
                name: 'PC获得网上订单量',
                data: pageParams2.data[1]
            },{
                name: '移动获得网上订单量',
                data: pageParams2.data[2]
            }]
        });
        Highcharts.chart('chart-ddcls-3',options);//第三个折线图
    })();

    ;(function(){
        var ddcls=$('#chart-ddcls-4');
        if(ddcls.size()<1)return;
        var title=ddcls.data('title');
        var nums=ddcls.data('nums');
        var percents=[];
        var sum=0;
        for(var i=0,len=nums.length;i<len;i++){
            sum+=nums[i];
        }
        for(var i=0,len=nums.length;i<len;i++){
            percents.push(+(nums[i]/sum).toFixed(1));
        }
        var options=$.extend(true,{},pieOptions,{
            title:{
                text:pageParams2.title2
            },
            series: [{
                type:'pie',
                data: pageParams2.cake
            }]
        });
        Highcharts.chart('chart-ddcls-4',options);
    })();

})();