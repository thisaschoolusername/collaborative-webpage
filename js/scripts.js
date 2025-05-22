


(function($) {
    "use strict"; 
	

	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


	$('#clock').countdown('2020/12/27 08:50:56') 
	.on('update.countdown', function(event) {
		var format = '<span class="counter-number">%D<br><span class="timer-text">Days</span></span><span class="counter-number">%H<br><span class="timer-text">Hours</span></span><span class="counter-number">%M<br><span class="timer-text">Minutes</span></span><span class="counter-number">%S<br><span class="timer-text">Seconds</span></span>';
		$(this).html(event.strftime(format));
	})
	.on('finish.countdown', function(event) {
	$(this).html('This offer has expired!')
		.parent().addClass('disabled');
    });


    var imageSliderOne = new Swiper('.image-slider-1', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
    });


    var imageSliderTwo = new Swiper('.image-slider-2', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
		},
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
		breakpoints: {
            
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


	var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
        },
        spaceBetween: 70,
        slidesPerView: 2,
		breakpoints: {
            
            1199: {
                slidesPerView: 1,
            },
        }
    });
    

    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, 
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
    
    
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


    $("#registrationForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            
            rformError();
            rsubmitMSG(false, "Please fill all fields!");
        } else {
            
            event.preventDefault();
            rsubmitForm();
        }
    });

    function rsubmitForm() {
		var name = $("#rname").val();
		var email = $("#remail").val();
		var phone = $("#rphone").val();
        var terms = $("#rterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/registrationform-process.php",
            data: "name=" + name + "&email=" + email + "&phone=" + phone + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    rformSuccess();
                } else {
                    rformError();
                    rsubmitMSG(false, text);
                }
            }
        });
	}

    function rformSuccess() {
        $("#registrationForm")[0].reset();
        rsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); 
    }

    function rformError() {
        $("#registrationForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function rsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#rmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    

    $("#newsletterForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
        
            nformError();
            nsubmitMSG(false, "Please fill all fields!");
        } else {
            
            event.preventDefault();
            nsubmitForm();
        }
    });

    function nsubmitForm() {
		var email = $("#nemail").val();
        var terms = $("#nterms").val();
        $.ajax({
            type: "POST",
            url: "php/newsletterform-process.php",
            data: "email=" + email + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    nformSuccess();
                } else {
                    nformError();
                    nsubmitMSG(false, text);
                }
            }
        });
	}

    function nformSuccess() {
        $("#newsletterForm")[0].reset();
        nsubmitMSG(true, "Subscribed!");
        $("input").removeClass('notEmpty'); 
    }

    function nformError() {
        $("#newsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function nsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {

            cformError();
            csubmitMSG(false, "Please fill all fields!");
        } else {
        
            event.preventDefault();
            csubmitForm();
        }
    });

    function csubmitForm() {
		var name = $("#cname").val();
		var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
	}

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); 
        $("textarea").removeClass('notEmpty'); 
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    $("#privacyForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
    
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
       
		var name = $("#pname").val();
		var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
	}

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); 
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    

    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);