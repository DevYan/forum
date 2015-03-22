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