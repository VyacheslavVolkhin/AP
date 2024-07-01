

//files add
if (document.querySelector(".js-field-file")) {
  document
    .querySelector(".js-field-file .js-file-button")
    .addEventListener("click", function () {
      this.parentElement.querySelector('input[type="file"]').click();
    });
}
const inputs = document.querySelectorAll('.js-field-file input[type="file"]');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', function(event) {
	let fileName = event.target.value;
	if (fileName == '') {
	  fileName = this.parentNode.querySelector('.js-file-button').getAttribute('data-title');

	  this.parentNode.classList.remove('active');
	  this.parentNode.querySelector('.js-file-button .button-title').innerHTML = fileName;
	} else {
	  this.parentNode.classList.add('active');
	  this.parentNode.querySelector('.js-file-button .button-title').innerHTML = fileName;
	}
  });
}



//header search
const searchButton = document.querySelector(
  ".header .search-inner-wrap .btn-popup-inner"
);
const searchInput = document.querySelector(
  ".header .search-inner-wrap .form-input"
);
searchButton.addEventListener("click", function (event) {
  if (!this.classList.contains("js-active")) {
    this.classList.add("js-active");
    searchInput.focus();
  } else {
    this.classList.remove("js-active");
  }
  event.preventDefault();
});

//button scroll up
let buttonUp = document.getElementById("up");
buttonUp.addEventListener("click", function (e) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  e.preventDefault();
  e.stopPropagation();
});

//fancybox
Fancybox.bind("[data-fancybox]", {
  //settings
});


//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')
const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
const tabsButtonContent = document.querySelectorAll('.js-tab-content')
function tabsActiveStart() {
    for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
        if (tabsBlocks[iTab].classList.contains('active')) {
            tabsBlocks[iTab].classList.remove('active')
        }
    }
    for (i = 0; i < tabsNav.length; i++) {
        let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
        for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
            if (tabsNavElements[iElements].classList.contains('active')) {
                let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
                for (j = 0; j < tabsBlocks.length; j++) {
                    if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
                        console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
                        tabsBlocks[j].classList.add('active')
                    }
                }
            }
        }
    }
    
}
for (i = 0; i < tabsButtonTitle.length; i++) {
    tabsButtonTitle[i].addEventListener('click', function (e) {
        this.classList.toggle('active')
        e.preventDefault()
        e.stopPropagation()
        return false
    })
}
for (i = 0; i < tabsNav.length; i++) {
    tabsNav[i].addEventListener('click', function (e) {
        if (e.target.closest('[data-tab]')) {
            let tabsNavElements = this.querySelector('[data-tab].active')
            tabsNavElements ? tabsNavElements.classList.remove('active') : false
            e.target.closest('[data-tab]').classList.add('active')
            tabsActiveStart()
            e.preventDefault()
            e.stopPropagation()
            return false
        }
    })
}
tabsActiveStart()

//js popup wrap
const togglePopupButtons = document.querySelectorAll(".js-btn-popup-toggle");
const closePopupButtons = document.querySelectorAll(".js-btn-popup-close");
const popupElements = document.querySelectorAll(".js-popup-wrap");
const wrapWidth = document.querySelector(".wrap").offsetWidth;
const bodyElem = document.querySelector("body");
function popupElementsClear() {
  document.body.classList.remove("menu-show");
  document.body.classList.remove("filter-show");
  document.body.classList.remove("search-show");
  popupElements.forEach((element) => element.classList.remove("popup-right"));
}
function popupElementsClose() {
  togglePopupButtons.forEach((element) => {
    if (!element.closest(".no-close")) {
      element.classList.remove("active");
    }
  });
}
function popupElementsContentPositionClass() {
  popupElements.forEach((element) => {
    let pLeft = element.offsetLeft;
    let pWidth = element.querySelector(".js-popup-block").offsetWidth;
    let pMax = pLeft + pWidth;
    if (pMax > wrapWidth) {
      element.classList.add("popup-right");
    } else {
      element.classList.remove("popup-right");
    }
  });
}
for (i = 0; i < togglePopupButtons.length; i++) {
  togglePopupButtons[i].addEventListener("click", function (e) {
    popupElementsClear();
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      popupElementsClose();
      this.classList.add("active");
      if (this.closest(".popup-menu-wrap")) {
        document.body.classList.add("menu-show");
      }
      if (this.closest(".popup-search-wrap")) {
        document.body.classList.add("search-show");
      }
      if (this.closest(".popup-filter-wrap")) {
        document.body.classList.add("filter-show");
      }
      popupElementsContentPositionClass();
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}
for (i = 0; i < closePopupButtons.length; i++) {
  closePopupButtons[i].addEventListener("click", function (e) {
    popupElementsClear();
    popupElementsClose();
    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}
document.onclick = function (event) {
  if (!event.target.closest(".header .search-inner-wrap")) {
    searchButton.classList.remove("js-active");
  }
  if (!event.target.closest(".js-popup-block")) {
    popupElementsClear();
    popupElementsClose();
  }
};
popupElements.forEach((element) => {
  if (element.classList.contains("js-popup-select")) {
    let popupElementSelectItem = element.querySelectorAll(
      ".js-popup-block li a"
    );
    if (element.querySelector(".js-popup-block .active")) {
      element.classList.add("select-active");
      let popupElementActive = element.querySelector(
        ".js-popup-block .active"
      ).innerHTML;
      let popupElementButton = element.querySelector(".js-btn-popup-toggle");
      popupElementButton.innerHTML = "";
      popupElementButton.insertAdjacentHTML("beforeend", popupElementActive);
    } else {
      element.classList.remove("select-active");
    }
    for (i = 0; i < popupElementSelectItem.length; i++) {
      popupElementSelectItem[i].addEventListener("click", function (e) {
        this.closest(".js-popup-wrap").classList.add("select-active");
        if (
          this.closest(".js-popup-wrap").querySelector(
            ".js-popup-block .active"
          )
        ) {
          this.closest(".js-popup-wrap")
            .querySelector(".js-popup-block .active")
            .classList.remove("active");
        }
        this.classList.add("active");
        let popupElementActive = element.querySelector(
          ".js-popup-block .active"
        ).innerHTML;
        let popupElementButton = element.querySelector(".js-btn-popup-toggle");
        popupElementButton.innerHTML = "";
        popupElementButton.insertAdjacentHTML("beforeend", popupElementActive);
        popupElementsClear();
        popupElementsClose();
        if (!this.closest(".js-tabs-nav")) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
    }
  }
});

// Popups
let popupCurrent;

document.querySelectorAll(".js-popup-open").forEach(function (element) {
  element.addEventListener("click", function (e) {
    document.querySelector(".popup-outer-box").classList.remove("active");
    document.body.classList.add("popup-open");

    popupCurrent = this.getAttribute("data-popup");
    document
      .querySelector(
        `.popup-outer-box[id="${popupCurrent}"
		]`
      )
      .classList.add("active");

    e.preventDefault();
    e.stopPropagation();
    return false;
  });
});
document.querySelectorAll(".js-popup-close").forEach(function (element) {
  element.addEventListener("click", function (e) {
    document.body.classList.remove("popup-open");
    document.querySelector(".popup-outer-box").classList.remove("active");

    e.preventDefault();
    e.stopPropagation();
    return false;
  });
});
document.querySelectorAll(".popup-outer-box").forEach(function (element) {
  element.addEventListener("click", function (event) {
    if (!event.target.closest(".popup-box")) {
      document.body.classList.remove("popup-open");
      document.body.classList.remove("popup-open-scroll");
      document.querySelectorAll(".popup-outer-box").forEach(function (e) {
        e.classList.remove("active");
      });
      return false;
    }
  });
});



//slider tiles
const sliderList = document.querySelectorAll(".slider-tiles");
sliderList.forEach(function (slider) {
    let sliderCols = slider.getAttribute("data-cols");
    let sliderWrapper = slider.querySelector('.swiper')
    let sliderArrowNext = slider.querySelector(".button-slider-tiles-next");
    let sliderArrowPrev = slider.querySelector(".button-slider-tiles-prev");
    let sliderPagination = slider.querySelector(".slider-tiles-pagination");
    switch (sliderCols) {
        case "2":
            let swiperSliderTiles2 = new Swiper(sliderWrapper, {
              loop: false,
              slidesPerView: 1,
              spaceBetween: 0,
              autoHeight: true,
              speed: 400,
              pagination: {
                el: sliderPagination,
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<span class="' + className + '">' + (index + 1) + "</span>"
                  );
                },
              },
              autoplay: false,
              navigation: {
                nextEl: sliderArrowNext,
                prevEl: sliderArrowPrev,
              },
              breakpoints: {
                768: {
                  slidesPerView: 2,
                },
              },
            });
            break;
        case "3":
            let swiperSliderTiles3 = new Swiper(sliderWrapper, {
                loop: false,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 400,
                pagination: {
                    el: sliderPagination,
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                },
                autoplay: false,
                navigation: {
                    nextEl: sliderArrowNext,
                    prevEl: sliderArrowPrev,
                },
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                    },
                },

            });
            break;
        case "4":
            let swiperSliderTiles4 = new Swiper(sliderWrapper, {
              loop: false,
              slidesPerView: 1,
              spaceBetween: 0,
              autoHeight: true,
              speed: 400,
              pagination: {
                el: ".slider-tiles-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<span class="' + className + '">' + (index + 1) + "</span>"
                  );
                },
              },
              autoplay: false,
              navigation: {
                nextEl:
                  ".btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next",
                prevEl:
                  ".btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev",
              },
              breakpoints: {
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              },
            });
            break;
        default:
            let swiperSliderTiles = new Swiper(sliderWrapper, {
                loop: false,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 400,
                pagination: {
                    el: sliderPagination,
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                    },
                },
                autoplay: false,
                navigation: {
                    nextEl: sliderArrowNext,
                    prevEl: sliderArrowPrev,
                },

            });
    }
})


//slider media thumbs main
const swiperMediaMain = new Swiper(".slider-media-main .swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 400,
  navigation: false,
  pagination: {
    el: ".slider-media-main-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});
//slider media thumbs preview
const swiperMediaPreview = new Swiper(".slider-media-thumbs .swiper", {
	loop: false,
	slidesPerView: 2,
	spaceBetween: 0,
	threshold: 5,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".button-slider-media-thumbs-next",
		prevEl: ".button-slider-media-thumbs-prev",
	},
	thumbs: {
		swiper: swiperMediaMain,
	},
	breakpoints: {
		640: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		992: {
			slidesPerView: 5,
		},
	},
});

//tooltip
tippy("[data-tippy-content]");
