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
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

///////////////////////////////////////
//          Expanding Offers
///////////////////////////////////////

// function to expand extra detail in offer
// function openOffer(offerId, scrollOption) {
//
//   var offer = $('.offer-' + offerId ),
//       preExpand = offer.find( ".offer__pre-expand" ),
//       expand    = offer.find( ".offer__expand" );
//
//   // give activated class
//     offer.removeClass('is-closed').addClass('is-open');
//
//   // shows section hides thumbnail
//   preExpand.slideUp(200);
//   expand.slideDown(200, function(){
//     // option to scroll to section
//     if (scrollOption) {
//       $('html,body').animate({ scrollTop: offer.offset().top}, 500);
//     }
//   });
//
// }
//
// // hides expanded section on all offers
// $('.offer__expand').hide();
//
// // opens offer on view more click
// $('.js-expand-offer').on('click', function(e) {
//   e.preventDefault(e);
//   var clickedOffer = $(this).data('offer-id');
//   openOffer(clickedOffer, 'scroll');
// });
//
// // looks for query string & opens specific offer
// var currentOffer = getParameterByName('offer-id');
// if ( currentOffer) {
//   openOffer(currentOffer, 'scroll');
// }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // // mobile nav open
  // $('.js-mobile-menu-open').on('click', function(e) {
  //   e.preventDefault();
  //   $(this).addClass('mobile-icon__menu--open');
  //   $('.mobile-menu').toggleClass('mobile-menu--open');
  // });

  // // mobile nav close
  // $('.js-mobile-menu-close').on('click', function(e) {
  //   e.preventDefault();
  //   $('.js-mobile-menu-open').removeClass('mobile-icon__menu--open');
  //   $('.mobile-menu').toggleClass('mobile-menu--open');
  // });

  // // current page nav highlight
  // var currentPage = $('body').data('current-page');
  // $('.' + currentPage + ' .microsite-nav__item--' + currentPage).addClass('microsite-nav__item--current');


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
//      landing page modal
///////////////////////////////////////

  var modal         = $('.js-modal'),
      modalContent  = $('.js-modal__content'),
      modalClose    = $('.js-modal__close');

  // EVENT - launch modal & populate with content
  $('.js-launch-modal').on('click', function(e) {

    e.preventDefault();

    // set variables
    var offerId             = $(this).data('offer-id'),
        offerContentClass   = ".modal__content--" + offerId,
        offerContent        = $(offerContentClass);

    // hide previous content
    // $('.modal__content.is-open').toggleClass('is-open').toggleClass('is-closed');
    openToggle($('.modal__content.is-open'));

    // launch modal
    modal.removeClass('is-closed').addClass('is-open');
    $('body').css('overflow', 'hidden');

    // reveal content
    openToggle(offerContent);
  });

  // toggles generic open close classes
  function openToggle(selector) {
    selector.toggleClass('is-closed').toggleClass('is-open');
  }
  function closeModal(e) {
      e.on('click', function() {
      modal.removeClass('is-open').addClass('is-closed');
      $('body').css('overflow', 'auto');
    });
  }

  $(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
       modal.removeClass('is-open').addClass('is-closed');
       $('body').css('overflow', 'auto');
      }
  });

  // close modal on icon and bg click
  closeModal(modalClose);
  // closeModal(modal);




///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end
