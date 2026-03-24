/**
* Template Name: Nexa
* Template URL: https://bootstrapmade.com/nexa-bootstrap-agency-template/
* Updated: Aug 19 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


document.addEventListener("DOMContentLoaded", function () {

  // Swiper Init
  var swiper = new Swiper(".portfolio-slider", {
    loop: false,
    speed: 600,
    spaceBetween: 30,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  });

  // Isotope Init
  var iso = new Isotope(".isotope-container", {
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows"
  });

  // Filtering
  document.querySelectorAll(".isotope-filters li").forEach(function (btn) {
    btn.addEventListener("click", function () {

      document.querySelector(".filter-active").classList.remove("filter-active");
      this.classList.add("filter-active");

      var filterValue = this.getAttribute("data-filter");
      iso.arrange({ filter: filterValue });

      setTimeout(function () {
        swiper.update();
      }, 400);

    });
  });

});


   function handleRequestType() {
    const type = document.getElementById("requestType").value;
    const messageDiv = document.getElementById("responseMessage");

    if (type === "sales") {
      messageDiv.innerHTML = `We are here to serve you , Please call : <span class="text-danger "> <strong>+0201025111103 , +0201091666919</strong>`;
    } 
    else if (type === "maintenance") {
      messageDiv.innerHTML = `We are here to serve you , Please call : <span class="text-danger "> <strong>+0201025111103 , +0201091666919</strong>.`;
    } 
    else {
      messageDiv.innerHTML = "";
    }
  }

      function showFormSuccessToast(message) {
        const toastEl = document.getElementById("formSuccessToast");
        if (!toastEl) return;
        toastEl.querySelector(".toast-body").textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }

      function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const successMap = {
          orderForm: "orderFormFeedback",
          subscriptionForm: "subscriptionFormFeedback",
        };

        const feedbackEl = document.getElementById(successMap[form.id]);

        const successMessage = "Form submitted successfully. Thank you!";

        if (feedbackEl) {
          feedbackEl.textContent = successMessage;
          feedbackEl.classList.remove("d-none", "alert-danger");
          feedbackEl.classList.add("alert-success");

          setTimeout(() => {
            feedbackEl.classList.add("d-none");
          }, 5000);
        } else {
          alert(successMessage);
        }

        showFormSuccessToast(successMessage);

        form.reset();

        const modal = form.closest(".modal");
        if (modal) {
          const bsModal = bootstrap.Modal.getInstance(modal);
          if (bsModal) {
            bsModal.hide();
          }
        }
      }
    
      ["imageSlider-1", "imageSlider-2", "imageSlider-3"].forEach(
        function (cls) {
          new Swiper("." + cls, {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        },
      );

      function countOrderChars() {
  const text = document.getElementById("orderDetails").value.length;
  document.getElementById("orderCount").innerText = text + "/500";
}

function countReqChars() {
  const text = document.getElementById("reqDetails").value.length;
  document.getElementById("reqCount").innerText = text + "/500";
}
function countOrderChars1() {
  const text = document.getElementById("messageInput").value.length;
  document.getElementById("orderCount1").innerText = text + "/500";
}
      document.addEventListener("DOMContentLoaded", function () {
        const imageSlider = new Swiper(".imageSlider", {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,

          pagination: {
            el: ".imageSlider .swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".imageSlider .swiper-button-next",
            prevEl: ".imageSlider .swiper-button-prev",
          },
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
        });

        document.querySelectorAll("#orderForm, #subscriptionForm").forEach((form) => {
          form.addEventListener("submit", handleFormSubmit);
        });
      });