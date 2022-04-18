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

    $(".switcher-contents__item").swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            var currentCheckbox = $(this).find('input:checked');
            if (direction == "right") {
                currentCheckbox.prev().prop("checked", true);
            } else if (direction == "left") {
                currentCheckbox.next().prop("checked", true);
            }
        }
    });

    const swiper = new Swiper('.swiper', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },

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
});