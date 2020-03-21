'use strict'

$(() => {
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      let target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, 'easeInOutExpo')
        return false
      }
    }
  })

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide')
  })

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  })

  // Collapse Navbar
  const navbarCollapse = function () {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-scrolled')
    } else {
      $('#mainNav').removeClass('navbar-scrolled')
    }
  }
  // Collapse now if page is not at top
  navbarCollapse()
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse)

  // Magnific popup calls
  // $('#portfolio').magnificPopup({
  //   delegate: 'a',
  //   type: 'image',
  //   tLoading: 'Loading image #%curr%...',
  //   mainClass: 'mfp-img-mobile',
  //   gallery: {
  //     enabled: true,
  //     navigateByImgClick: true,
  //     preload: [0, 1]
  //   },
  //   image: {
  //     tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  //   }
  // })
  // function takes in a html element, an object called toRotate, and a period in milliseconds
  function txtRotate (el, toRotate, period = 2000) {
    const txt = ''
    const isDeleting = false
    const completed = false
    const delta = 70 - Math.random() * 20
    const i = 0
    const fullTxt = toRotate[0]
    const lastTxt = toRotate[toRotate.length - 1]
    tick(el, isDeleting, txt, fullTxt, lastTxt, completed, delta, period, i, toRotate)
  }

  function tick (el, isDeleting, txt, fullTxt, lastTxt, completed, delta, period, i, toRotate) {
    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1)
    } else {
      txt = fullTxt.substring(0, txt.length + 1)
    }
    if (txt === lastTxt) {
      completed = true
    }
    if (isDeleting) { delta = 50 }

    if (!isDeleting && txt === fullTxt) {
      delta = period
      isDeleting = true
    } else if (isDeleting && txt === '') {
      isDeleting = false
      i++
      fullTxt = toRotate[i%3]
      delta = 70 - Math.random() * 20
    }
    if (txt === fullTxt) {
      el.innerHTML = txt + '<span class="blink">|</span>'
    } else {
      el.innerHTML = txt + '<span class="no-blink">|</span>'
    }

    setTimeout(function () {
      if (!completed) {
        tick(el, isDeleting, txt, fullTxt, lastTxt, completed, delta, period, i, toRotate)
      }
    }, delta)
  }

  window.onload = function () {
    // find all the elements with class txt-rotate
    const elements = $('.txt-rotate')
    // for each of the elements
    for (let i = 0; i < elements.length; i++) {
      // initialise variable toRotate with string in the data-rotate attribute
      const toRotate = elements[i].getAttribute('data-rotate')
      // initialise variable period with string in the data-period attribute
      const period = elements[i].getAttribute('data-period')
      // if data-rotate attribute is not empty
      if (toRotate) {
        // call the function TxtRotate, passing in the element, the data-rotate attribute parsed as a JS object, and the period
        txtRotate(elements[i], JSON.parse(toRotate), parseInt(period))
        // new TxtRotate(elements[i], JSON.parse(toRotate), period)
      }
    }
  }
})
