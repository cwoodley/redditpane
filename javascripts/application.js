jQuery(document).ready(function($) {

  var checkImage = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
  var loadJSON = "http://www.reddit.com/r/funny/"

  // initialize app
  $.getJSON(
    loadJSON+".json?jsonp=?",function foo(result) {
      
      afterNext = result.data.after

      $.each(result.data.children.slice(0, 25),
        function (i, post) {
        // check for image links and apply image class to parent <li> if true
        if (checkImage.test(post.data.url)) {
          $("#posts ul").append( '<li class="image"><a href="'+post.data.url+'">' + post.data.title + "</a></li>");
        } else {
          $("#posts ul").append( '<li><a href="'+post.data.url+'">' + post.data.title + "</a></li>");
        };
        }
      )
    }
  )

  // load next 25 items on click
  $(document).on('click', '#next', function(event) {
    event.preventDefault();
    
    $('html, body').animate({scrollTop:0}, 'slow');
    $('#posts ul').html('');

    $.getJSON(
      loadJSON+".json?after="+afterNext+"&jsonp=?",function foo(result) {
      
      afterNext = result.data.after

      $.each(result.data.children.slice(0, 25),
        function (i, post) {
        // check for image links and apply image class to parent <li> if true
        if (checkImage.test(post.data.url)) {
          $("#posts ul").append( '<li class="image"><a href="'+post.data.url+'">' + post.data.title + "</a></li>");
        } else {
          $("#posts ul").append( '<li><a href="'+post.data.url+'">' + post.data.title + "</a></li>");
        };
        }
      )
    }
  )

  });

  // capture link clicks
  $(document).on('click', '#posts ul a', function(event) {
    event.preventDefault(); // stop from navigating away

    $('#posts ul a').removeClass('active');
    $(this).addClass('active seen');

    var targetURL = $(this).attr('href');

    if (checkImage.test(targetURL)) {
      $("#window").html('');
      $('#window').append('<div id="loading-content"><img src="./images/loading.gif" /></div>')

      var _url = targetURL;
      // set up the node / element
      _im =$("<img>");

      // hide and bind to the load event
      _im.hide();
      _im.bind("load",function(){ 
        $('#loading-content').hide();
        $(this).fadeIn();
      });

      // append to target node / element
      $('#window').append(_im);

      // set the src attribute now, after insertion to the DOM
      _im.attr('src',_url);
    } else {
      $('#window').html('<iframe src="'+targetURL+'" width="100%" height="100%">');
    }

  });


});
