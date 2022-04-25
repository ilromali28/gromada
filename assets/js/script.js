$(document).ready(function() {
    $('.navigation__dd-title').click(function() {
        $(this).parent().toggleClass('dd_opened');
    });
    $(document).click(function(e) {
        if ($(e.target).closest('.navigation__item_dd').length) {
            return;
        }
        $('.dd_opened').removeClass('dd_opened');
    });

    /*$(".switcher-contents__item").swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            var currentCheckbox = $(this).find('input:checked');
            if (direction == "right") {
                currentCheckbox.prev().prop("checked", true);
            } else if (direction == "left") {
                currentCheckbox.next().prop("checked", true);
            }
        }
    });*/

    const swiper = new Swiper('.swiper', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 700,

        direction: 'horizontal',
        loop: true,
        grabCursor: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        slidesPerView: 1,
        spaceBetween: 30,

        breakpoints: {
            571: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            811: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            1201: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });

    const sliderPartners = new Swiper('.partners-slider', {
        direction: 'horizontal',
        grabCursor: true,
        speed: 700,

        navigation: {
            nextEl: '.partners-slider-next',
            prevEl: '.partners-slider-prev'
        },

        slidesPerView: 3,
        spaceBetween: 20,

        breakpoints: {
            571: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            650: {
                slidesPerView: 5,
                spaceBetween: 20
            },
            767: {
                slidesPerView: 6,
                spaceBetween: 22
            },
            811: {
                slidesPerView: 6,
                spaceBetween: 30
            },
            1201: {
                slidesPerView: 6,
                spaceBetween: 40
            }
        }
    });
});

function countChar(val) {
    var len = val.value.length;
    $('#messCharCount .messCharCount__current').text(len);
};

function initMap() {
    // The location of Uluru
    const adress1 = { lat: 46.46115531671167, lng: 30.749824600000004 };
    const adress2 = { lat: 46.444781766723096, lng: 30.758586800000014 };
    const middleadress = { lat: 46.45393786672846, lng: 30.75337039999998 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: middleadress,
        mapTypeControl: false,
        streetViewControl: false
    });
    const marker1 = new google.maps.Marker({
        position: adress1,
        map: map,
        icon: 'assets/img/favicons/favicon-32x32.png'
    });
    const marker2 = new google.maps.Marker({
        position: adress2,
        map: map,
        icon: 'assets/img/favicons/favicon-32x32.png'
    });
}

window.initMap = initMap;


var preloader = document.querySelector('.preloader');
window.addEventListener('load', disapper);

function disapper() {
    preloader.classList.add('disapper');
}