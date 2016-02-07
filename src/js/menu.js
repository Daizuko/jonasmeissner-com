$(function() {
  var navicon = $(".navicon");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= $('#welcome').height()) {
      navicon.addClass("show");
    } else {
      navicon.removeClass("show");
    }
  });

  $('#toggle').click(function() {
    $(this).toggleClass('active', 'show');
    $('.body').toggleClass('body-hidden')
    $('#navigation').toggleClass('open');
  });

  $('.menu').click(function() {
    $('.body').removeClass('body-hidden')
    $( "#toggle" ).removeClass( "active" )
    $('#navigation').removeClass('open');
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('.body').removeClass('body-hidden')
      $( "#toggle" ).removeClass( "active" )
      $('#navigation').removeClass('open');
    }
  });
});
