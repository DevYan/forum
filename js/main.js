$(function(){
/*页面过短时设置主题部分长度*/
	$('#main').css('minHeight',($(window).height()-275)+'px');

/*弹出搜索框*/
	$('.search-container').click(function(e){
		e.preventDefault();
		$(this).addClass('enable');
		$('.search-box').animate({width:"210px"},500,function() {
			$('.search-box').attr('placeholder','Search...').focus()
		});
	})

/*帖子列表页显示类型切换*/
	$('.title-nav .cat li').click(function(){
		$('.title-nav .cat li').removeClass('active');
		$(this).addClass('active');
		var index = $('.title-nav .cat li').index($(this));
		$('.subject-list').removeClass('active').eq(index).addClass('active');
	})

/*帖子列表树形切换*/
	$('.toggle-view li').click(function(){
		$('.toggle-view li').removeClass('active');
		$(this).addClass('active');
		var index = $('.toggle-view li').index($(this));
		if (index === 0) {
			$('#tie-list').addClass('tree-view');
		}else{
			$('#tie-list').removeClass('tree-view');
		}
	})

/*帖子回复显示隐藏*/
	$('.frp').click(function(e){
		e.preventDefault() 

		var commentBox = $(this).parents('.foot-right').siblings(".comment-list");
		if (commentBox.find('li').length<=0) return;

		if (!$(this).hasClass('unfold')) {
			var tmp = $(this).html();
			$(this).html('收起'+tmp).addClass('unfold');
			commentBox.show();
		}else{
			var tmp = $(this).html().split('').slice(2).join('');
			$(this).html(tmp).removeClass('unfold');
			commentBox.hide();
		}
	})

/*
 * 设置页面
 */
//导航切换
	$('.setting-nav li').click(function(e){
	 	e.preventDefault();
	 	$('.setting-nav li').removeClass('active');
	 	$(this).addClass('active');

	 	$('.option-panel').removeClass('active');
	 	var index = $('.setting-nav li').index($(this));
	 	if (index == 0) {

	 	}else if (index == 1) {
	 		$('.change-head-pic').addClass('active');
	 	}else{
	 		$('.change-password').addClass('active');
	 	}
	})
//头像设置
	var ifBool = false;//判断鼠标是否按下
	var moveType = '';

	/*
		事件区
	*/
	//头像上传触发
	$('.change-head-pic .btn-upload').change(function(event){
		if ($(this).val()!=='') {
			var uploadFile = event.target.files[0];
			if (!(/\.(jpg|jpeg|gif|png)$/i).test(uploadFile.name)) {
            	alert('请选择一张图片进行上传');
                $(this).val('');
            } else if (uploadFile.size > 3000000) { // 3mb
            	alert('您上传的图片过大,最大文件大小为 3 MB');
                $(this).val('');
            } else {
				var tmppath = URL.createObjectURL(uploadFile);
				$('.pic-box').addClass('uploaded-l');
				$('.size-list').addClass('uploaded');
				$('.upload-pic2').attr('src',tmppath);
				$('.upload-pic2').eq(0).load(function(){
					adjustImg($(this).width(),$(this).height());
				});
				//isImgLoad(adjustImg);
				previewAll();
            }
		}
	});

	//尺寸大小控制触发
	$('.size-handle .handle-bar').mousedown(function(e){
		ifBool = true;
		moveType ='resize';
	})

	//移动选区触发
	$('.size-handle .handle-body').mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		ifBool = true;
		moveType ='pan';
	})

	//监听鼠标移动事件
	$(window).mousemove(function(e){
		if (!ifBool) return;
		e.preventDefault();
		
		if( moveType == 'resize') resize(e);
		if( moveType == 'pan') pan(e);
	})

	//取消监听鼠标移动事件
	$(window).mouseup(function(e){
		ifBool = false;
		moveType = '';
	})

	/*
		函数区
	*/
	//上传图片过大调整
	function adjustImg(w,h){
		var max = w >= h ? w : h;
		var min = w < h ? w : h;
		console.log(w+' '+h);
		var rate = max/min;
		if (max>300) {
			if (w >= h) {
				$('.upload-pic2').height(300/rate).width(300);
			}else{
				$('.upload-pic2').height(300).width(300/rate);
			}
		};
	}
	
	function resize(e){
		var x = e.clientX;//鼠标横坐标
		var y = e.clientY;//鼠标纵坐标

		var ox = x - $('.pic-box').offset().left,
			oy = y - $('.pic-box').offset().top,
			ow = $('.pic-box').width(),
			oh = $('.pic-box').height();
			if((ox>ow)||(oy>oh)) return;

		
		var width = x - $('.size-handle').offset().left,
			height = y - $('.size-handle').offset().top;

		var distance = width > height ? width : height;

		//设置拖动后的宽高和位置
		$('.size-handle').width(distance).height(distance);
		cross();
		sync();
		previewAll();
	}

	function pan(e){
		$('.size-handle').offset({
			left:e.clientX-0.5*$('.size-handle').width(),
			top:e.clientY-0.5*$('.size-handle').height()
		});
		cross();
		sync();
		previewAll();
	}

	function cross () {
		var child_x = $('.size-handle').offset().left,
			child_y = $('.size-handle').offset().top,
			child_w = $('.size-handle').width(),
			child_h = $('.size-handle').height(),
			parent_x = $('.pic-box').offset().left,
			parent_y = $('.pic-box').offset().top,
			parent_w = $('.pic-box').width(),
			parent_h = $('.pic-box').height();
		//超出左边界
		if(child_x <= parent_x){
			$('.size-handle').offset({
				left:parent_x
			});
		}

		//超出上边界
		if(child_y <= parent_y){
			$('.size-handle').offset({
				top:parent_y
			});
		}

		//超出右边界
		if(child_x + child_w >= parent_x + parent_w){
			$('.size-handle').offset({
				left:parent_x+parent_w-child_w
			});
		}

		//超出底部边界
		if(child_y + child_h >= parent_y + parent_h){
			$('.size-handle').offset({
				top:parent_y+parent_h-child_h
			});
		}
	}

	//选择区同步
	function sync(){
		var elem_x = $('.size-handle').offset().left,
			elem_y = $('.size-handle').offset().top,
			elem_w = $('.size-handle').width(),
			elem_h = $('.size-handle').height(),
			p_x = $('.pic-box').offset().left,
			p_y = $('.pic-box').offset().top,
			p_w = $('.pic-box').width(),
			p_h = $('.pic-box').height();
		$('.clip-layer').css('clip','rect('+
			(elem_y-p_y)+'px '+
			(elem_x-p_x+elem_w)+'px '+
			(elem_y-p_y+elem_h)+'px '+
			(elem_x-p_x)+'px)');
	}

	//预览显示
	function previewAll(){
		preview($('.size-list .big'),120);
		preview($('.size-list .middle'),60);
		preview($('.size-list .small'),32);
	}

	function preview(obj,meta){
		//原图选区宽高
		var sideWidth = $('.size-handle').width();
		//原图选区偏移
		var o_left = $('.size-handle').offset().left-$('.pic-box').offset().left;
		var o_top = $('.size-handle').offset().top-$('.pic-box').offset().top;
		//缩放比例
		var rate = sideWidth/meta;
		//缩放后图片尺寸
		var imgW = $('.clip-layer img').width()/rate;
		var imgH = $('.clip-layer img').height()/rate;
		obj.find('.clip-layer-preview img').width(imgW).height(imgH);
		obj.find('.clip-layer-preview').width(300/rate).height(300/rate)
		.css('left',(-1)*(o_left/rate)+'px').css('top',(-1)*(o_top/rate)+'px');
	}

/*
 * DICE页面
 */
 //调整概率触发
	$('.progress .bar').mousedown(function(e){
		ifBool = true;
		moveType ='adjustRage';
	})
	$(window).mousemove(function(e){
		if (!ifBool) return;
		e.preventDefault();
		
		if( moveType == 'adjustRage') adjustRage(e);
	})
	function adjustRage(e){
		var hor = e.clientX - $('.bar-bg').offset().left;
		if (hor<0||hor>$('.bar-bg').width()) return;
		$('.progress .bar').width(hor);
		var wRate = hor/$('.bar-bg').width()*100;
		var index = 2;
		if (wRate<10) {
			index=1;
		}else if(wRate>99){
			wRate=100;
			index == 3;
		}
		wRate = wRate + '' ;
		if (wRate=='100') {
			$('.win-rate').html(100);
			return;
		};
		$('.win-rate').html(wRate.substring(0,index));
	}


 //导航切换
	 $('.dice-nav li').click(function(e){
	 	e.preventDefault();
	 	$('.dice-nav li').removeClass('active');
	 	$(this).addClass('active');

	 	$('#dice table').removeClass('active');
	 	var index = $('.dice-nav li').index($(this));
	 	if (index % 2 == 0) {
	 		$('.table-1').addClass('active');
	 	}else{
	 		$('.table-2').addClass('active');
	 	}
	 })
	})