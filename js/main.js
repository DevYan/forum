$(function(){
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
})