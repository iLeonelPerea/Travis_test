jQuery(function( $ ){
  if ($.fn.cssOriginal!=undefined)
  $.fn.css = $.fn.cssOriginal;
  $('.fullwidthbanner').revolution(
    {
      delay:3000,
      startwidth:1170,
      startheight:550,
      onHoverStop:"on", 
      navigationType:"none",    
      soloArrowLeftHOffset:0,
      soloArrowLeftVOffset:0,
      soloArrowRightHOffset:0,
      soloArrowRightVOffset:0,
      touchenabled:"on",      
      fullWidth:"on",
      shadow:0          
    });
  $.localScroll.defaults.axis = 'xy';
  $.localScroll.hash({
        target: '#sub',//#sub
        queue:true
      });
  $.localScroll({
    target: 'body',
    queue:true,
    hash:true
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.go-top').fadeIn(200);
    } else {
      $('.go-top').fadeOut(200);
    }
  });
  $("#ajax-contact-form").submit(function() {
    var str = $(this).serialize();    
    $.ajax({
      type: "POST",
      url: "contact_form/contact_process.php",
      data: str,
      success: function(msg) {
        // Message Sent - Show the 'Thank You' message and hide the form
        if(msg == 'OK') {
          result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
          $("#fields").hide();
        } else {
          result = msg;
        }
        $('#note').html(result);
      }
    });
    return false;
  });  
});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-44567074-1', 'responsivetequila.mx');
  ga('send', 'pageview'); 