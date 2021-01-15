

var def = {
  menu: false
}

window.onload = function () {
  $(window).scroll(function () {
    let st = window.pageYOffset || document.documentElement.scrollTop,
    h = $(window).height(),
    trs = 300;

    // change logo on scroll-top-btn
    if (st > (h / 2) ) {
      $('.header__wrapper').addClass('active');
      $('.header__logo').addClass('active');
      $('.header .btn-scroll-up').slideDown(trs);
    }
    else {
      $('.header__wrapper').removeClass('active');
      $('.header__logo').removeClass('active');
      $('.header .btn-scroll-up').slideUp(trs);
    }
  });
  $(window).resize(function () {
    let w = $(window).width();

    // close/open menu
    if (w > 768)
      $('.header__nav').addClass('active');
    else {
      if (!def.menu)
        $('.header__nav').removeClass('active');
      else
        $('.header__nav').addClass('active');
    }
  });
}

// scroll top
$('.btn-scroll-up').click(function () {
  $('body, html').animate({ scrollTop: 0 }, 300);

  if ( ($(window).width() <= 768) && $('.header__nav').hasClass('active') ) {
    $('.header__nav-btn').click();
  }
});

// close/open menu
$('.header__nav-btn').click(function () {
  $('.header__nav').slideToggle(300);
  $('.header__nav').toggleClass('active');
  def.menu = !def.menu;
})
$('.header__nav li a').click(function () {
  if ( ($(window).width() <= 768) && $('.header__nav').hasClass('active') ) {
    $('.header__nav-btn').click();
  }
});

// slider-2
if ( $('*').is('.slider-2') ) {
  $(document).ready(function(){

    // $(".slider-2 .slider__slides")

    let sliders__array = $('.slider-2');
    for (var i = 0; i < sliders__array.length; i++) {
      let id = $(sliders__array[i]).attr('id');

      $('#' + id).children('.slider__slides').owlCarousel({
        loop: true,
        items: 4,

        nav: true,
        dots: false,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        navContainer: `#${id} .slider__nav_btns`,

        responsive : {
          0 : {
            items: 1,
          },
          768 : {
            items: 2,
          },
          1200 : {
            items: 3,
          }
        }
      });
    }

  });
}

var filterOpen = function () {
  let trs = 300;

  if ( $('.filter').hasClass('hoh') ) {
    $('.filter__nav ul li a').click(function (e) {
      // filter processing
      e.preventDefault();

      if ( $(this).parent().children('ul').length ) {
        $(this).parent().children('ul').slideToggle(trs);
        $(this).parent().toggleClass('active');
      }

      // content processing
      // {...}
    });
  }
  else {
    $('.filter__nav ul li a').click(function (e) {
      // filter processing
      if ( $(this).parent().children('ul').length ) {
        e.preventDefault();

        $(this).parent().children('ul').slideToggle(trs);
        $(this).parent().toggleClass('active');
      }
    });
  }
};
filterOpen();

// btn-send-lid
$('.btn-send-lid').click(function () {

  var correct_input = true;

  var userName = $('.form .userName').val(),
      userEmail = $('.form .userEmail').val();

  if ( userName.length < 2 ) correct_input = false;
  if ( userEmail.length <= 5 ) correct_input = false;
  else {
    var index_mail = userEmail.indexOf('@');

    if (userEmail.length <= (index_mail + 5) ) correct_input = false;
  }

  if (correct_input) {
    $.ajax({
      type: "POST",
      url: '../../php/sendLid.php',
      data: {
        userName: $('.form .userName').val(),
        userLink: $('.form .userLink').val(),
        userEmail: $('.form .userEmail').val(),
        userMessage: $('.form .userMessage').val(),
      },
      beforeSend: function () {
        $('.form__stateAlert').attr('class', 'form__stateAlert beforeSend').html('Ожидайте...');
        // remove btn-send-lid
        let trs = .5;
        $('.form .btn-send-lid').css({'transition-duration': trs + 's'});
        $('.form .btn-send-lid').addClass('not-active');
        setTimeout(function () {
          $('.form .btn-send-lid').remove();
        }, trs * 1000);
      },
      success: function(data){
        if (data) {
          $('.form__stateAlert').attr('class', 'form__stateAlert success').html('Спасибо за вашу заявку! </br> Мы свяжемся с вами в ближайшее время');
        }
        else {
          $('.form__stateAlert').attr('class', 'form__stateAlert unsuccess').html('Ой... Что-то пошло не так, попробуйте позже');
        }
      }
    });
  }
  else {
    $('.form__stateAlert').attr('class', 'form__stateAlert unsuccess').html('Заполните поля корректно');
  }
  $('.form__stateAlert').slideDown(300);

});

// links
$('a').click(function () {
  var elementClick = $(this).attr("href");
  if (elementClick.length > 1) {
    var destination = $(elementClick).offset().top;
    $('body, html').animate({ scrollTop: destination }, 600);
    return false;
  }
});
