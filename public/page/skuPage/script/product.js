
$(document).ready(function(){
	
	// SKU
	tpl = $("#tpl_sku").html();
	laytpl(tpl).render(Norm,function(html){
		$(".sku_list").html(html);
		SkuDetail();
	});
	
	// 拖动添加模块
	$(".sku_list").sortable({
		revert: true,
		placeholder: "highlight",
		deactivate:function(evt,ui){
			SkuDetail();
		}
	});
	$(".sku_list").disableSelection();
	
	$(".sku_list").on("click",".sku_val",function(){
		if( $(this).is(".active") )
			$(this).removeClass("active");
		else
			$(this).addClass("active");
		
		SkuDetail();
	});
	
	// 批量设置价格和库存
	$(".sku_detail").on("keyup",".set_price",function(){
		fee = $(this).val();
		fee = fee.replace(/^\./,"");										// 不能以小数点（ . ）开始
		fee = fee.replace(/^0\d/,"0");										// 不能以 0 开始（小数除外）
		fee = fee.replace(/(.*\..*)\./,fee.substr(0,fee.length-1));			// 不能含有两个小数点
		fee = fee.replace(/(.*\.\d{2}).+/,fee.substr(0,fee.length-1));		// 小数点后面保留 2 位
		fee = fee.replace(/[^0-9\.]/g,"");									// 不能含有特殊字符
		$(this).val(fee);
		if( fee!="" ) $(".sku_detail .tb_price").val(fee);
	});
	$(".sku_detail").on("keyup",".tb_price",function(){
		fee = $(this).val();
		fee = fee.replace(/^\./,"");										// 不能以小数点（ . ）开始
		fee = fee.replace(/^0\d/,"0");										// 不能以 0 开始（小数除外）
		fee = fee.replace(/(.*\..*)\./,fee.substr(0,fee.length-1));			// 不能含有两个小数点
		fee = fee.replace(/(.*\.\d{2}).+/,fee.substr(0,fee.length-1));		// 小数点后面保留 2 位
		fee = fee.replace(/[^0-9\.]/g,"");									// 不能含有特殊字符
		$(this).val(fee);
	});
	$(".sku_detail").on("keyup",".set_store",function(){
		val = $(this).val();
		val = val.replace(/^\./,"");										// 不能以小数点（ . ）开始
		val = val.replace(/^0\d/,"0");										// 不能以 0 开始
		val = val.replace(/[^0-9]/g,"");									// 不能含有特殊字符
		$(this).val(val);
		if( fee!="" ) $(".sku_detail .tb_store").val(val).eq(0).trigger("keyup");
	});
	$(".sku_detail").on("keyup",".tb_store",function(){
		val = $(this).val();
		val = val.replace(/^\./,"");										// 不能以小数点（ . ）开始
		val = val.replace(/^0\d/,"0");										// 不能以 0 开始
		val = val.replace(/[^0-9]/g,"");									// 不能含有特殊字符
		$(this).val(val);
		sum = 0;
		$(".sku_detail tr .tb_store").each(function(){
			sum += parseInt($(this).val()||"0");
		});
		$(".store_all").val(sum);
	});
	
	
	// 批量设置价格和库存
//	$(".prices input").keyup(function(){
//		fee = $(this).val();
//		fee = fee.replace(/^\./,"");										// 不能以小数点（ . ）开始
//		fee = fee.replace(/^0\d/,"0");										// 不能以 0 开始（小数除外）
//		fee = fee.replace(/(.*\..*)\./,fee.substr(0,fee.length-1));			// 不能含有两个小数点
//		fee = fee.replace(/(.*\.\d{2}).+/,fee.substr(0,fee.length-1));		// 小数点后面保留 2 位
//		fee = fee.replace(/[^0-9\.]/g,"");									// 不能含有特殊字符
//		$(this).val(fee);
//	});
	$(".store_all").keyup(function(){
		fee = $(this).val();
		fee = fee.replace(/^0\d/,"0");										// 不能以 0 开始
		fee = fee.replace(/[^0-9]/g,"");									// 不能含有特殊字符
		$(this).val(fee);
	});
	
	// 选择框
	var config = {
   		".chosen-select": {},
		".chosen-select-deselect": {allow_single_deselect: !0},
		".chosen-select-no-single": {disable_search_threshold: 10},
		".chosen-select-no-results": {no_results_text: "Oops, nothing found!"},
		".chosen-select-width": {width: "95%"}
	};
	for (var selector in config) $(selector).chosen(config[selector]);

});



function SkuDetail()
{
	var sku_header = "";
	var sku_contt = "";
	var sku_footer = "";

	groups = $(".sku_list li");
	var arr = [];
	var elms = [];

	// 表格头部
	for(var i=0;i<groups.length;i++)
	{
		act = groups.eq(i);
		if( act.find(".active").length>0 )
		{
			sku_header += "<td>"+act.find(".sku_key").text()+"</td>";
			arr.push(act.find(".active").length);
			elms.push(act.find(".active"));
		}
	}
	sku_header = "<tr>"+sku_header+"<td>价格（元）</td><td>库存</td><td>商家编码</td><td>销量</td></tr>";

	// 表格内容
	sku_contt = SkuContt(arr,elms,arr.length,"");

	// 表格底部
	sku_footer += "<tr class='setting'>";
	sku_footer += "<td colspan='"+arr.length+"'>批量设置</td>";
	sku_footer += "<td><input type='text' class='set_price' /></td>";
	sku_footer += "<td><input type='text' class='set_store' /></td>";
	sku_footer += "<td colspan='2'></td></tr>";
	
	$(".sku_detail").html(sku_header + sku_contt + sku_footer);
	
	// 控制表格显示
	if( arr.length==0 )
		$(".sku_detail").parents(".form-group").addClass("hide");
	else
		$(".sku_detail").parents(".form-group").removeClass("hide");
	
	// 总库存
	var sum = 0;
	$(".sku_detail tr .tb_store").each(function(){
		sum += parseInt($(this).val()||"0");
	});
	$(".store_all").val(sum);
	
	if($(".pro_norms .sku_val").length>0)
	{
		//$(".store_all").prop({disabled:true});
		//$(".prices input").eq(0).prop({disabled:true});
	}
	else
	{
		$(".store_all").prop({disabled:false});
		//$(".prices input").eq(0).prop({disabled:false});
	}

	// ======================================================================================================

	// SKU 表格内容渲染
	// 说明：整个函数核心在于函数自身的迭代，每次迭代传入的参数都比上一次调用少传一层，直至结束
	// Arr  - 数组，代表各个选中规格的个数，比如选中三个颜色、两个尺寸、五个材质，那么 Arr = [3,2,5]
	// Elms - 数组，代表各个选中规格的元素节点
	// Len  - 数字，代表选中规格的大类型（颜色、尺寸、材质）的个数，等同于 Arr 第一次传入的数组长度，每次迭代都相同
	// ID   - 字符串，每次迭代追加一次上层规格的 ID，类似于遍历，比如 101_201_301
	function SkuContt(Arr,Elms,Len,ID)
	{
		var cols = 1;
		for(var i=1;i<Arr.length;i++)
		{
			cols *= Arr[i];
		}
//		Console(cols);
//		Console(Arr);
//		console.log(Elms);

		var sku_html = "";
		for(var i=0;i<Arr[0];i++)
		{
			if( Arr.length!=1 )
			{
				// 非最后一层规格
				var tid = ID + Elms[0].eq(i).data("id")+"_";

				var html = (Arr.length==Len?"<tr>":"")+"<td rowspan='"+cols+"'>"+Elms[0].eq(i).text()+"</td>";

				var arr = Arr.concat();
				var elms = Elms.concat();
				arr.shift();
				elms.shift();

				sku_html += html+SkuContt(arr,elms,Len,tid);
			}
			else
			{
				// 最后一层规格
				var tid = ID + Elms[0].eq(i).data("id");

				var html = "";
				html += "<td rowspan='"+cols+"'>"+Elms[0].eq(i).text()+"<input type='hidden' name='norm_id' style='width:150px' value='"+tid+"' /></td>";
				html += "<td><input type='text' name='norm_price' class='tb_price' value='"+(SKU[tid]?SKU[tid].price:"")+"' /></td>";
				html += "<td><input type='text' name='norm_store' class='tb_store' value='"+(SKU[tid]?SKU[tid].stock_count:"")+"' /></td>";
				html += "<td><input type='text' name='norm_code'  class='tb_proid' value='"+(SKU[tid]?SKU[tid].product_id:"")+"' /></td>";
				html += "<td>0</td>";

				sku_html += (i==0?"":"<tr>")+html+"</tr>";
				//sku_html += "\n\n";
				//Console(2+"\n",sku_html);
			}
		}
		return sku_html;
	}
}
