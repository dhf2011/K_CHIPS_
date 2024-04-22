var dimm = '<div class="dimm"></div>';
var popOff = "[data-role=pop-off]";
var popOn = "[data-role=pop-on]";
var dimmName = ".dimm";
var layerActive = "data-link-active";

var openPopWraps = 0;

/* dimm */
var setDimm = function (isDimm, $layer) {
  if (isDimm) {
    $(".container").append(dimm);
    if ($layer.hasClass("no_dim")) {
      $(dimmName).remove();
    }
    openPopWraps++;
  } else {
    openPopWraps--;
    if (openPopWraps <= 0) {
      $(dimmName).remove();
      openPopWraps = 0; 
    }
  }
  if ($layer) {
    $layer.attr("data-link-active", isDimm);
  }
};

var lyPop = function () {
  var popupClose = function ($curLayer) {
    if ($curLayer.hasClass("pop_wrap")) {
      $curLayer.hide();
    }
    setDimm(false, $curLayer);
  };

  var popupOn = function () {
    $(popOn).on("click", function () {
      var $this = $(this),
        $curLayer = $("#" + $this.data("link"));

      if (!$curLayer.is(":visible")) {
      
        if ($this.data("role") == "pop-on") {
          $curLayer.show();
        }
        setDimm(true, $curLayer);
      }
    });
  };

  var popupOff = function () {
    $(popOff).on("click", function () {
      var $this = $(this),
        $curLayer = $this.closest(".pop_wrap");

      popupClose($curLayer);
    });
  };

  if ($(popOn).length) {
    popupOn();
  }

  if ($(popOff).length) {
    popupOff();
  }
};


lyPop();

var gnb = function(){
    $('[class^="dep1_"] > a, .dep2').on('mouseenter focus', function(){
        $(this).parents('[class^="dep1_"]').addClass('on');
		$(this).parents('[class^="dep1_"]').siblings().children('a').css('color','#969696');
        var dep3ALast = $('[class^="dep1_"].on').find('.dep3_li').last().find('a');
        dep3ALast.on('blur', function(){
            $(this).parents('[class^="dep1_"]').removeClass('on');
        })
    })

    $('[class^="dep1_"] > a, .dep2').on('mouseleave', function(){
        $(this).parents('[class^="dep1_"]').removeClass('on');
		$(this).parents('[class^="dep1_"]').siblings().children('a').removeAttr('style');
    })    
}

var accordion = function(){
	if($('.accor_bx').length > 0) {		
		$('.accor_bx').each(function(){
			if($(this).is('.on')){
				$(this).find('.accor_cont').slideDown();
			}
		});

		$('.accor_btn').click(function(e){
			e.preventDefault();
			var accorCtl = $(this);
			var accorBx = accorCtl.parents('.accor_bx');
			var accorBxS = accorBx.siblings();
			var accorCont = accorBx.find('.accor_cont');
			var accorContS = accorBxS.find('.accor_cont');

			if(accorBx.hasClass('on')){
				accorBx.removeClass('on');
				accorCont.stop().slideUp();
			} else {
				accorBx.addClass('on');
				accorCont.stop().slideDown();
			}
			accorBxS.removeClass("on");
			accorContS.stop().slideUp();			
		})
	}
}

var btnSelect = function(){
	$('.btn_sel').on('click', function(){
		$(this).parent('.sel_typ1').toggleClass('on');
	})
	$('.sel_option > li > button').on('click', function(){
		var selVal = $(this).text();
		$(this).parents('.sel_option').prev('.btn_sel').text(selVal);
		$(this).parents('.sel_typ1').removeClass('on');
	})
}

var tab = function(){
    $(document).on('click','[class*="tab_li"] a', function(){
		
		var $this  = $(this),
		    $tabWrap = $this.closest('.tab_wrap'),
		    $tabCont = $tabWrap.children('.tab_cont'),
		    $tabCtr = $this.parent('.tab_li'),
		    tabIdx = $tabCtr.index();

		if (!$tabCtr.is('.on')){
			
			$tabCtr.addClass('on').siblings('li').removeClass('on');
			$tabCont.removeClass('on').eq(tabIdx).addClass('on');
		}
	})
}

var datepicker = function(){
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		showOn: 'both',
		buttonImage: '../../resources/images/pc/icon_calendar.png',
		buttonImageOnly: true,
		showMonthAfterYear: true,
		showOtherMonths: true,
		yearSuffix: '.',
		monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
	})

	var _datepickerThis = null;
	$('.datepicker').on('click', function(){
		_datepickerThis = $(this);
	});
	
	$('.datepicker').datepicker();

	$('.datepicker, .ui-datepicker-trigger, .ui-datepicker').on('click', function(){
		if($(this).is('.ui-datepicker-trigger')) _datepickerThis = $(this).prev('.datepicker');
		btnSelYear();
	})

	function btnSelYear(){
		var datepickerHd = $('.ui-datepicker-header');
		var btnPrevYr = $('<button class="ui-year-prev"><span class="blind">이전 년도</span></button>');
		var btnNextYr = $('<button class="ui-year-next"><span class="blind">다음 년도</span></button>');
		var btnYear = (!$('#ui-datepicker-div').find('button.btn_year_prev').length > 0 && !$('#ui-datepicker-div').find('button.btn_year_next').length > 0);
	
		if(btnYear){
			btnNextYr.prependTo(datepickerHd);
			btnPrevYr.prependTo(datepickerHd);			
		}

		btnPrevYr.unbind('click').bind('click', function(){
			$.datepicker._adjustDate(_datepickerThis, -1, 'Y');
		});
		btnNextYr.unbind('click').bind('click', function(){
			$.datepicker._adjustDate(_datepickerThis, +1, 'Y');
		});
	}	
}

var calendarFocus = function(){
	$(".ui-datepicker-trigger").on('focus mouseover', function(){
		$(this).attr('src','../../resources/images/pc/icon_calendar_on.png')
	})
	$(".ui-datepicker-trigger").on('blur mouseleave', function(){
		$(this).attr('src','../../resources/images/pc/icon_calendar.png')
	})
}

var textareaAutoH = function(){
	$('textarea.auto_h').on('keydown keyup', function(){
		$(this).height(1);
		$(this).height(this.scrollHeight - 10);
	})		
}

$('document').ready(function(){
	lyPop() // layer popup
    gnb(); // gnb
    accordion(); // accordion
	btnSelect(); // select
	tab(); // tab
	datepicker(); // datepicker
	calendarFocus(); // calendar icon image change
	textareaAutoH(); // textarea height auto

	// 인풋박스에 값을 입력하면 레이블에 클라스 추가하는 스크립트
	const inputBoxes = document.getElementsByClassName("inputBox_is");
	for (let i = 0; i < inputBoxes.length; i++) {
		inputBoxes[i].addEventListener("input", function () {
			const inputValue = this.value.trim();
			const outputLabel = this.nextElementSibling;

			if (inputValue.length > 0) {
				outputLabel.classList.add("is_value");
			} else {
				outputLabel.classList.remove("is_value");
			}
		});
	}

// 파일 업로드
	
	$("#file").on('change',function(){
		var fileName = $("#file").val();
		$(".upload-name").val(fileName);
	  });
	
	
	




	// 네비게이션


    // 페이지 로딩 시 한 번 실행하여 초기 상태 설정
	$('.h_navigation_wrap').hover(
        function() {
            // This function is executed when the mouse enters the element with class '.h_navigation_wrap'
            $('.header_wrap').addClass('on');      // Add the class 'on' to elements with class '.header_wrap'
            $('.h_side_bar').removeClass('on');    // Remove the class 'on' from elements with class '.h_side_bar'

            // Check window width and fade out '.h_information_wrap' if window width is 1650px or less
          
        },
        function() {
            // This function is executed when the mouse leaves the element with class '.h_navigation_wrap'
            $('.header_wrap').removeClass('on');   // Remove the class 'on' from elements with class '.header_wrap'
            
            // Check window width and fade in '.h_information_wrap' if window width is 1650px or less
           
        }
    );
	$('.h_navigation').hover(
        function() {
   
            if ($(window).width() <= 1600) {
                $('.reaction_fade').stop().fadeOut();
            }
        },
        function() {
            // Check window width and fade in '.h_information_wrap' if window width is 1650px or less
            if ($(window).width() <= 1600) {
                $('.reaction_fade').stop().fadeIn();
            }
        }
    );


		// 햄버거 메뉴
		
		$('.h_infor_hamburger').click(function(){
			$('.h_side_bar').addClass('on')
		});
		$('.h_side_bar_close_btn').click(function(){
			$('.h_side_bar').removeClass('on');
			
		});
		
		var lnb = function(){
		$('[class^="lnb_dep"] a').on('click', function(e){
		e.preventDefault();
		var lnbCtl = $(this),
			lnbDep = lnbCtl.parent('[class^="lnb_dep"]'),
			lnbDepS = lnbDep.siblings(),
			lnbDepSC = lnbDep.siblings().find('[class^="lnb_dep"]'),
			lnbdep2S = lnbDepS.find('.lnb_li_dep2');
			lnbdep3S = lnbDepS.find('.lnb_li_dep3');
		if(lnbDep.hasClass('on')){
			lnbDep.removeClass('on');
			lnbDep.find(".lnb_dep2").removeClass('on');
			lnbDep2 = lnbDep.find('.lnb_li_dep2');
			lnbDep2.stop().slideUp();
			lnbDep3 = lnbDep.find('.lnb_li_dep3');
			lnbDep3.stop().slideUp();
		
		
			return;
		}
		
		lnbDep.addClass('on');
		lnbDepS.removeClass('on');
		lnbDepSC.removeClass('on');
		
		if($('.has_dep2').length > 0) {
			var hasDep2 = $(this).parent('.has_dep2'),
				lnbDep2 = hasDep2.find('.lnb_li_dep2');
				
			if(hasDep2.hasClass('on')){
				lnbDep2.stop().slideDown();
			} else {
				lnbDep2.stop().slideUp();
			}
		}
		if($('.has_dep3').length > 0) {
			var hasDep3 = $(this).parent('.has_dep3'),
				lnbDep3 = hasDep3.find('.lnb_li_dep3');
				
			if(hasDep3.hasClass('on')){
				lnbDep3.stop().slideDown();
			} else {
				lnbDep3.stop().slideUp();
			}
		}
		lnbdep2S.stop().slideUp();
		lnbdep3S.stop().slideUp();
		})
		}
	
	
		lnb();
	
		// 햄버거 끝
	
	// text 박스 x 버튼
	$(document).on("keyup",".text_clear_inpt",function () {
		$(this).siblings(".text_clear").toggle(Boolean($(this).val())); //영역 
	});



	$('.text_clear').click(function(){

	/* 텍스트박스 지우는 부분 */var el = $(this).siblings(".text_clear_inpt");
	for(var i=0; i<el.length; i++){	el[i].value = '';};
	$(this).toggle(Boolean($(this).val()));

	})
	
		// text 박스 x 버튼 끝
		
		
	
});
$( function() {
	$( document ).tooltip();
	
  } );
  $(function() { $(document).tooltip({ content: function() { return $(this).prop('title');}});});


//   아코디언
  $( function() {
    $( "#accordion" ).accordion({
      heightStyle: "content"
	 
    });
	
  } );

  $( function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  } );
  $( function() {
    $( "#accordion02" ).accordion({
      heightStyle: "content"
	 
    });
	
  } );

  $( function() {
    $( "#accordion02" ).accordion({
      collapsible: true
    });
  } );

//   파일 업로드



