var article_tpl = '';
    article_tpl += '<script type="text/html" id="tpl_article">';
    article_tpl += '  {{# for(var i=0;i<d.length;i++){ }}';
    article_tpl += '    <tr data-id="{{d[i].id}}">';
    article_tpl += '    <td>{{d[i].title}}</td>';
    article_tpl += '    <td>{{d[i].author}}</td>';
    article_tpl += '    <td>{{d[i].createtime}}</td>';
    article_tpl += '    <td><a>查看</a> | <a  href="/admin/article/article_edit?id={{d[i].id}}">编辑</a> | <a class="del">删除</a></td>';
    article_tpl += '    <tr>';
    article_tpl += '  {{# } }}';
    article_tpl += '</script>';


                        