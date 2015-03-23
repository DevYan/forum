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
	function resize(e){
		var x = e.clientX;//鼠标横坐标
		var y = e.clientY;//鼠标纵坐标

		var ox = x - $('.pic-box').offset().left,
			oy = y-$('.pic-box').offset().top,
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
	}

	function pan(e){
		$('.size-handle').offset({
			left:e.clientX-0.5*$('.size-handle').width(),
			top:e.clientY-0.5*$('.size-handle').height()
		});
		cross();
		sync();
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

/*
 * DICE页面
 */
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