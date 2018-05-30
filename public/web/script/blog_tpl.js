var blog_tpl = '';
    blog_tpl += '<script type="text/html" id="tpl_blog">';
    blog_tpl += '  {{# for(var i=0;i<d.length;i++){ }}';
    blog_tpl += '  {{# if(d[i].centerImg!=null){ }}';
    blog_tpl += '    <li class="haveImg">';
    blog_tpl += '    <img class="centerImg" src="{{d[i].centerImg}}">'
    blog_tpl += '    <div class="content">';
    blog_tpl += '        <p class="title">';
    blog_tpl += '            <a href="/blog_details?id={{d[i].id}}">{{d[i].title}}</a>';
    blog_tpl += '            <span class="time">{{d[i].createtime.substr(0,16)}}</span>';
    blog_tpl += '       </p>';
    blog_tpl += '       <p class="abstract">{{d[i].abstract}}……</p>';
    blog_tpl += '    </div>';
    blog_tpl += '    <div class="tags">标签：';
    blog_tpl += '       {{# for(var j=0;j<d[i].tags.length;j++){ }}';
    blog_tpl += '       <span>{{d[i].tags[j]}}</span>';
    blog_tpl += '       {{# } }}';
    blog_tpl += '    </div>';
    blog_tpl += '    </li> ';
    blog_tpl += '  {{# } }}';
    blog_tpl += '  {{# if(d[i].centerImg==null){ }}';
    blog_tpl += '    <li>';
    blog_tpl += '    <div class="content">';
    blog_tpl += '        <p class="title">';
    blog_tpl += '            <a href="/blog_details?id={{d[i].id}}">{{d[i].title}}</a>';
    blog_tpl += '            <span class="time">{{d[i].createtime.substr(0,16)}}</span>';
    blog_tpl += '       </p>';
    blog_tpl += '       <p class="abstract">{{d[i].abstract}}……</p>';
    blog_tpl += '    </div>';
    blog_tpl += '    <div class="tags">标签：';
    blog_tpl += '       {{# for(var j=0;j<d[i].tags.length;j++){ }}';
    blog_tpl += '       <span>{{d[i].tags[j]}}</span>';
    blog_tpl += '       {{# } }}';
    blog_tpl += '    </div>';
    blog_tpl += '    </li> ';
    blog_tpl += '  {{# } }}';
    blog_tpl += '  {{# } }}';
				  
			                  
