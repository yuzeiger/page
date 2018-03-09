/**
* @desc 订单统计页 ajax分页
* @author yu.jie
*/
var pageAjax = function(){
    var CSS_PREVIOUS_PAGE = 'page_up';//上一页样式
    var CSS_NO_PREVIOUS_PAGE = 'page_up_no';//第一页时上一页的样式
    var CSS_NEXT_PAGE = 'page_down';//下一页样式
    var CSS_NO_NEXT_PAGE = 'page_down_no';//末页时下一页样式
    var CSS_INTERNAL_PAGE = 'page';//普通页样式
    var CSS_SELECTED_PAGE = 'page active'; //当前页样式
    var CSS_FIRST_PAGE = 'updowm';//首页样式
    var CSS_LAST_PAGE = 'updowm';//尾页样式
    var CSS_HIDDEN_PAGE = 'page_txt';//隐藏样式
    var AJAX_URL = '';

    var PAGE_COUNT = 0; //一共有几页
    var createPageButtons = function(c,t,url,flag){  //当前页和总页数
        c = c - 1;
        AJAX_URL = url == '' ? pageParams.url :url;
        if(Number(t) == 0){
            t = pageParams.totalPage;
            if(t <= 20) return "";
        };
        var page_html = "";
        PAGE_COUNT = Math.ceil(t/20);//每页20条
        var beginPage = Math.max(0, c - Math.floor(5/2)); //一页显示5个按钮
        var endPage = beginPage + 5 - 1;
        if(endPage >= PAGE_COUNT){
            endPage = PAGE_COUNT - 1;
            beginPage = Math.max(0, endPage-5+1);
        }
        //首页
        //page_html += createPageButton('首页',0,CSS_FIRST_PAGE,c<=0,false);
        var page = c;
        var previousPageCssClass = CSS_PREVIOUS_PAGE;
        if(page <= 0)
        {
            page=0;
            previousPageCssClass = CSS_NO_PREVIOUS_PAGE;
        }
        page_html += createPageButton('上一页',page,previousPageCssClass,c<=0,false);
        if(5 < PAGE_COUNT && c > Math.floor(5 / 2) )
        {
            page_html += createPageButton(1,0,CSS_INTERNAL_PAGE,false,false)+'<font style="font-weight:bold;">...</font>';
        }

        for(var i=beginPage;i<=endPage;++i)
        {
            page_html += createPageButton(i+1,i,CSS_INTERNAL_PAGE,false,i==c);
        }
        if(5 < PAGE_COUNT && c < PAGE_COUNT - Math.floor(5 / 2 + 1))
        {
            page_html += '<font style="font-weight:bold;">...</font>'+createPageButton(PAGE_COUNT,PAGE_COUNT-1,CSS_INTERNAL_PAGE,false,false);
        }
        //下一页
        var page = c+1;
        var nextPageCssClass = CSS_NEXT_PAGE;
        if(page > PAGE_COUNT-1)
        {
            page=PAGE_COUNT-1;
            nextPageCssClass = CSS_NO_NEXT_PAGE;
        }
        page_html +=createPageButton('下一页',page,nextPageCssClass,c>=PAGE_COUNT-1,false);

        //尾页
        //page_html +=createPageButton('尾页',PAGE_COUNT-1,CSS_LAST_PAGE,c>=PAGE_COUNT-1,false);
        $("#page_div").html(page_html);
        if(flag > 0){
            toHeader();
        }

    }
    var createPageButton = function(label,page,cls,hidden,selected)
    {
        if(selected)//被选中的
        {
            return '<span class="'+CSS_SELECTED_PAGE+'">'+(page+1)+'</span>';
        }
        if('下一页' == label)
        {
            return '<a href="javascript:void(0)" data-pid='+(page+1)+' data-url="'+AJAX_URL+'&page='+(page+1)+'" class="'+cls+'" >'+label+'</a>';
        }
        if('上一页' == label)
        {
            return '<a href="javascript:void(0)" data-pid='+page+' data-url="'+AJAX_URL+'&page='+page+'" class="'+cls+'" >'+label+'</a>';
        }
        if(hidden)
        {
            cls +=' '+(hidden ? CSS_HIDDEN_PAGE : CSS_SELECTED_PAGE);
            return '<a href="javascript:void(0)" data-pid='+label+' data-url="'+AJAX_URL+'&page='+label+'" class="'+cls+'" >'+label+'</a>';
        }

        return '<a href="javascript:void(0)" data-pid='+label+' data-url="'+AJAX_URL+'&page='+label+'" class="'+cls+'" >'+label+'</a>';
    }
    var toHeader = function(){
        var oh = $("#data-table-5").offset().top;
        $("html,body").animate({scrollTop:oh});
    }
    operations = function(_op){
        var currentPage = _op.currentPage,
            totalPage = _op.totalPage,
            url = _op.url;
            flag = _op.flag;

        createPageButtons(currentPage,totalPage,url,flag);

    }
    return {
        init: function (_op) {
            //页面元素渲染(同时预加载必备js)
            operations(_op);
        }
    };
}();
pageAjax.init({currentPage:1,totalPage:0,obj:'',url:"",flag:0});