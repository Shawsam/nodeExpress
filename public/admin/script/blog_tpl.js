var blog_tpl = '';
    blog_tpl += '<script type="text/html" id="tpl_blog">';
    blog_tpl += '  {{# for(var i=0;i<d.length;i++){ }}';
    blog_tpl += '    <tr data-id="{{d[i].id}}">';
    blog_tpl += '    <td>{{d[i].title}}</td>';
    blog_tpl += '    <td>';
    blog_tpl += '  {{# for(var j=0;j<d[i].tags.length;j++){ }}';
    blog_tpl += '    <span class="tag">{{d[i].tags[j]}}</span>';
    blog_tpl += '  {{# } }}';
    blog_tpl += '    </td>';
    blog_tpl += '    <td>{{d[i].createtime}}</td>';
    blog_tpl += '    <td><a>查看</a> | <a  href="/admin/blog/blog_edit?id={{d[i].id}}">编辑</a> | <a class="del">删除</a></td>';
    blog_tpl += '    <tr>';
    blog_tpl += '  {{# } }}';
    blog_tpl += '</script>';


                        
