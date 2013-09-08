
$(function() {

    // create menu
    $("a[href^='#']").on('click', function(e) {
      e.preventDefault();

      var target = 0;
      var bootstrap_fix = -60;
      var header = this.hash;

      if(header !== "#top") {
        target = $(header).offset().top + bootstrap_fix;
      }

      $('html, body').animate({ scrollTop: target }, 300, function() {
        // remove previous glow
        $("#navbar li a").each(function(index) {
          $(this).parent().removeClass("active");
        });

        $("#navbar span").each(function(index) {
          $(this).removeClass("glyphicon-glow");
        });


        $("[href='" + header + "']").parent().addClass("active");
        $("span", $('#navbar li a[href$="' + header + '"]').parent()).addClass("glyphicon-glow");
      });




    });

    $(document).scroll(function() {

      var highlightIndex = -1;
      var currentPosition = $(window).scrollTop();

      // identify the nearest heading relative to the viewport
      $("h2").each(function(index) {
        var headingPosition = $(this).offset().top;

        if(headingPosition > currentPosition) {
          if(highlightIndex === -1) {
            highlightIndex = index;
          }
        }
      });

      // id of the nearest header
      var targetId = $($("h2")[highlightIndex]).attr('id');

      // remove previous glow
      $("#navbar li a").each(function(index) {
        $(this).parent().removeClass("active");
      });

      $("#navbar span").each(function(index) {
        $(this).removeClass("glyphicon-glow");
      });


      // add fancy glow
      $('#navbar li a[href$="' + targetId + '"]').parent().addClass("active");
      $("span", $('#navbar li a[href$="' + targetId + '"]').parent()).addClass("glyphicon-glow");

    });

  // create hover effect for contact area
  $("[class='contact-logo-hover']").hide();

  $("#contact-area>ul>li>a").hover(function(e) {
    $("[class='contact-logo-hover']", e.currentTarget).show();
    $("[class='contact-logo']", e.currentTarget).hide();
  },
  function(e) {
    $("[class='contact-logo-hover']", e.currentTarget).hide();
    $("[class='contact-logo']", e.currentTarget).show();
  });
});