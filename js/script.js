(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }

  // searches for specific queryString
  function getQueryStringByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Parallax
///////////////////////////////////////

  $(document).scroll(function(){
    var scrolled = $(document).scrollTop();
    $('.parallax').each(function(){
      var speed = $(this).attr('data-parallax-speed');
      var parallax = scrolled * speed ;
      $(this).css('background-position', 'center -' + parallax + 'px');
    });
  });


///////////////////////////////////////
//    landing page offer modals
///////////////////////////////////////

  var modal          = $('.js-modal'),
      modalContent   = $('.js-modal__content'),
      modalLaunchBtn = $('.js-launch-modal'),
      modalCloseBtn  = $('.js-modal__close');

    // opens modal
    function modalOpen(offerId, event){
      var eventVar = event || false;
      if (eventVar) { event.preventDefault(); }
      // get class for offer content
      var offerContentClass   = ".modal__content--" + offerId,
          offerContent        = $(offerContentClass);
          // stop function if offer doesn't exist
      if ($(offerContentClass).length === 0) { return false; }
      // disable scrolling
      $('body').addClass('disable-scroll');
      // open modal
      modal.show(0, function() {
        // switch classes when open
        $(this).removeClass('is-closed').addClass('is-open');
        // show offer content with fade - modal bg is css transition
        offerContent.fadeIn(250, function() {
          // switch classes when open
          $(this).removeClass('is-closed').addClass('is-open');
        });
      });
    }

    // closes modal
    function modalClose(){
      // close modal with fade - modal bg is css transition
      modal.fadeOut(250, function() {
        // enable scrolling
        $('body').removeClass('disable-scroll');
        // close open offer in modal
        $('.modal__content.is-open').hide().removeClass('is-open').addClass('is-closed');
        // resets scroll position & switches classes when closed
        $(this).scrollTop(0).removeClass('is-open').addClass('is-closed');
        // show offer content - switch classes & fade
      });
    }

    // launches modal if query string
    var currentOffer = getQueryStringByName('offer-id');
    if ( currentOffer) {
      modalOpen(currentOffer);
    }

    // launches modal when offer is clicked
    modalLaunchBtn.on('click', function(e) {
      // gets data id
      var offerId = $(this).data('offer-id');
      modalOpen(offerId, e);
    });

    // closes modal on close icon click
    modalCloseBtn.on('click', function() {
      modalClose();
    });

    // closes modal on background click
    modal.on('click', function(e) {
      if (e.target !== this){
        return;
      }
      modalClose();
    });

    // closes modal on escape key press
    $(document).keyup(function(e) {
       if (e.keyCode == 27) {
         modalClose();
        }
    });


///////////////////////////////////////
//    Offer Countdown
///////////////////////////////////////

  // neat way to give the css classes to each element of countdown
  function countdownSpanWrap(timeUnit, timeLabel) {
    return '<span class="countdown__unit">' + timeUnit + ' <span class="countdown__label">' + timeLabel + '</span> </span>';
  }

  // countdown for the global issue expiry date
  // init countdown plugin - specific structure, format & time labels
  if ( typeof ExpiryDate != 'undefined') {
    $('.js-countdown').countdown(ExpiryDate)
      .on('update.countdown', function(event) {
        var format = countdownSpanWrap('%-H', 'hrs') + countdownSpanWrap('%-M', 'mins') + countdownSpanWrap('%-S', 'sec');
        if(event.offset.daysToWeek > 0) {
          format = countdownSpanWrap('%-d', 'day%!d') + " " + format;
        }
        if(event.offset.weeks > 0) {
          format = countdownSpanWrap('%-w', 'week%!w') + " " + format;
        }
        format = '<div class="countdown__wrap"> <div class="countdown__title">expires in:</div> <div class="countdown__time">' + format + '</div>';
        $(this).html(event.strftime(format));
      });
  }

  // countdown for the single offer expiry date
  $('.js-offer-countdown').each(function() {
    var offerExpiryDate = $(this).data('year') + '/' + $(this).data('month') + '/' + $(this).data('day');
    //
    // init countdown plugin - specific structure, format & time labels
    $(this).countdown(offerExpiryDate)
      .on('update.countdown', function(event) {
        var format = countdownSpanWrap('%-H', 'hrs') + countdownSpanWrap('%-M', 'mins') + countdownSpanWrap('%-S', 'sec');
        if(event.offset.daysToWeek > 0) {
          format = countdownSpanWrap('%-d', 'day%!d') + " " + format;
        }
        if(event.offset.weeks > 0) {
          format = countdownSpanWrap('%-w', 'week%!w') + " " + format;
        }
        format = '<div class="countdown__wrap"> <div class="countdown__title">expires in:</div> <div class="countdown__time">' + format + '</div>';
        $(this).html(event.strftime(format));
      })
      .on('finish.countdown', function(event) {
        // disables the expired offer
        var parent = $(this).closest('.modal__content');
        // remove last cta button
        var lastButton = $('a.btn--large',parent);
        // add in hr
        lastButton.after('<hr class="row">');
        lastButton.remove();
        // disable cta button
        $('a.btn',parent).text('Offer Expired').attr('class', 'btn btn--disabled').removeAttr('href');
        // remove countdown block
        $(this).remove();
      });

    });


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end
