$(function(){
    var tpl_item = '<script id="tpl_item" type="text/html">'
        tpl_item += '{{# for(var i=0;i<d.length;i++){ }}'
        tpl_item += '<tr>'
        tpl_item +=     '<td>{{d[i].username}}</td>'
        tpl_item +=     '<td>{{d[i].adminCode==1?"管理员":"普通用户"}}</td>'
        tpl_item +=     '<td>{{d[i].age||"暂无"}}</td>'
        tpl_item +=     '<td>{{d[i].registerdate||"暂无"}}</td>'
        tpl_item +=     '<td>{{d[i].logindate||"暂无"}}</td>'
        tpl_item +=     '<td><a>编辑</a> | <a>重置密码</a> | <a>删除</a></td>'
        tpl_item += '</tr>'
        tpl_item += '{{# } }}'
        tpl_item += '</script>'

    $("body").append(tpl_item);
    $(".sort").click(function(){

        $(this).find("i").toggleClass("zmdi-chevron-up");

        switch(true){
            case $(this).hasClass("ageSort"): 
                 $(".registerSortFlag").val('');
                 $(".loginSortFlag").val('');
                 if($(".ageSortFlag").val()!=1){
                     $(".ageSortFlag").val(1);
                 }else{
                     $(".ageSortFlag").val(-1);
                 }
                 $(".searchBtn").trigger("click"); 
                 break;
            case $(this).hasClass("registerSort"):    
                 $(".ageSortFlag").val('');
                 $(".loginSortFlag").val('');
                 if($(".registerSortFlag").val()!=1){
                     $(".registerSortFlag").val(1);
                 }else{
                     $(".registerSortFlag").val(-1);
                 }
                 $(".searchBtn").trigger("click"); 
                 break;
            case $(this).hasClass("loginSort"):
                 $(".ageSortFlag").val('');
                 $(".registerSortFlag").val('');
                 if($(".loginSortFlag").val()!=1){
                     $(".loginSortFlag").val(1);
                 }else{
                     $(".loginSortFlag").val(-1);
                 }
                 $(".searchBtn").trigger("click"); 
                 break;
        }
    })


    $(".searchBtn").on("click",function(){
        url = "/api/admin/user/user_list?"+$("form").serialize();
        Ajax(url,function(ret){
            if(ret.state){
                tpl = $("#tpl_item").html();
                laytpl(tpl).render(ret.data,function(html){ $("tbody").html(html); });
            }else{
              layer.msg(ret.msg);
            }
        })
    })
})