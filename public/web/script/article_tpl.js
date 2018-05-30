var article_tpl = '';
    article_tpl += '<script type="text/html" id="tpl_article">';
    article_tpl += '  {{# for(var i=0;i<d.length;i++){ }}';
    article_tpl += '  {{# if(d[i].centerImg){ }}';
    article_tpl += '    <li class="haveImg">';
    article_tpl += '        <img class="centerImg" src="{{d[i].centerImg}}">';
    article_tpl += '        <div class="content">';
    article_tpl += '            <div class="author">';
    article_tpl += '               <img class="avatar" src="{{d[i].avatar}}">';
    article_tpl += '               <div class="info">';
    article_tpl += '                    <a class="nickname">{{d[i].author}}</a>';
    article_tpl += '               </div>';
    article_tpl += '            </div>';
    article_tpl += '            <p class="title"><a href="/article_details?id={{d[i].id}}">{{d[i].title}}</a></p>';
    article_tpl += '            <p class="abstract">{{d[i].abstract}}</p>';
    article_tpl += '        </div>';
    article_tpl += '    </li> ';
    article_tpl += '  {{# } }}';
    article_tpl += '  {{# if(d[i].centerImg==null){ }}';
    article_tpl += '    <li>';
    article_tpl += '        <div class="content">';
    article_tpl += '            <div class="author">';
    article_tpl += '               <img class="avatar" src="{{d[i].avatar}}">';
    article_tpl += '               <div class="info">';
    article_tpl += '                    <a class="nickname">{{d[i].author}}</a>';
    article_tpl += '               </div>';
    article_tpl += '            </div>';
    article_tpl += '            <p class="title"><a href="/article_details?id={{d[i].id}}">{{d[i].title}}</a></p>';
    article_tpl += '            <p class="abstract">{{d[i].abstract}}</p>';
    article_tpl += '        </div>';
    article_tpl += '    </li> ';
    article_tpl += '  {{# } }}';
    article_tpl += '  {{# } }}';
				  
			                  

                  
                  
                    
                          
                        
                            
                        
                    
                    
                    
                 
                
