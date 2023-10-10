const stepHeights = {
    tab1: 240,
    tab2: 260,
    tab3: 610,
    tab4: 240,
    tab5: 270,
    tab6: 240,
    tab7: 350,
    tab8: 240
}

function getHeight(el) {
    $(el).css('height', 'auto');
    elHeight = $(el).height();
    $(el).css('height', '0');
    return elHeight;
}

const header = document.querySelector('.headergov');
let lastScrollTop = 0;
const scrollThreshold = 0.3;

// Находим элементы
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.headergov__nav');

function hideHeader() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDistance = scrollTop - lastScrollTop;
    if (scrollDistance > 0 && scrollTop > windowHeight * scrollThreshold) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('open');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
}

window.addEventListener('scroll', hideHeader);


// Добавляем обработчик клика на ссылки в адаптированном меню (закрывает меню)
mobileMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        closeMobileMenu();
    }
});

// Закрываем адаптированное меню при клике вне меню
/*document.addEventListener('click', function (e) {
    if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        closeMobileMenu();
    }
});*/

// При изменении размера экрана больше 650px закрываем адаптированное меню
window.addEventListener('resize', function () {
    if (window.innerWidth > 650) {
        closeMobileMenu();
    }
});

// Дополнительный обработчик для закрытия меню при скролле на мобильных устройствах
window.addEventListener('scroll', function () {
    if (window.innerWidth <= 650) {
        closeMobileMenu();
    }
});

$(document).ready(function() {
    hideHeader();
    $('.navigation__dd-title').click(function() {
        $(this).parent().toggleClass('dd_opened');
    });
    $(document).click(function(e) {
        if ($(e.target).closest('.navigation__item_dd').length) {
            return;
        }
        $('.dd_opened').removeClass('dd_opened');
    });
    // Добавляем обработчик клика на кнопку бургера
    mobileMenuBtn.addEventListener('click', function () {
        toggleMobileMenu();
        // Анимируем трансформацию бургера в крестик и обратно
        this.classList.toggle('cross');
    });

    mobileMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            closeMobileMenu();
            mobileMenuBtn.classList.remove('cross');
        }
    });

    $('.aboutWhat__name').click(function() {
        var elParent = $(this).parent();
        if ($(elParent).hasClass('active')) {
            return;
        }
        $('.aboutWhat__item').removeClass('active');
        $('.aboutWhat__description').css('height', '0');
        var el = $(elParent).find('.aboutWhat__description');
        $(elParent).addClass('active');
        var elH = getHeight(el);
        window.setTimeout(function() {
            $(el).css('height', elH + 'px');
        }, 100);

    });

    var stepsLabels = $('.instruction .switchers__item, .instruction .mobile-tabs__item');
    var stepsWrapper = $('.instruction__switcher-contents');

    function redrawHeight() {
        if ($(window).width() < 650) {
            $(stepsLabels).click(function() {
                if ($(this).hasClass('switchers__item')) {
                    if ($(this).hasClass('switchers__item_1')) {
                        $('[name="firsttabs"]').each(function(index) {
                            if ($(this).is(':checked')) {
                                $(stepsWrapper).css('height', Object.values(stepHeights)[index] + 'px');
                                console.log(Object.values(stepHeights)[index]);
                            };
                        })
                    } else {
                        $('[name="secondtabs"]').each(function(index) {
                            if ($(this).is(':checked')) {
                                $(stepsWrapper).css('height', Object.values(stepHeights)[index + 4] + 'px');
                                console.log(Object.values(stepHeights)[index + 4]);
                            };
                        })
                    }
                } else {
                    $('#tab1').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab1 + 'px');
                    });
                    $('#tab2').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab2 + 'px');
                    });
                    $('#tab3').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab3 + 'px');
                    });
                    $('#tab4').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab4 + 'px');
                    });
                    $('#tab5').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab5 + 'px');
                    });
                    $('#tab6').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab6 + 'px');
                    });
                    $('#tab7').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab7 + 'px');
                    });
                    $('#tab8').change(function() {
                        $(stepsWrapper).css('height', stepHeights.tab8 + 'px');
                    });
                }
            });
        } else {
            $(stepsWrapper).css('height', '400px');
        }
    }
    redrawHeight();
    $(window).resize(function() {
        redrawHeight();
    });


    $('.faqs__question').click(function() {
        var elParent = $(this).parent();
        var el = $(elParent).find('.faqs__answer');
        if ($(elParent).hasClass('expanded')) {
            $(elParent).removeClass('expanded');
            $(el).css('height', '0');
            $(el).css('margin-bottom', '0');
        } else {
            $(elParent).addClass('expanded');
            var elH = getHeight(el);
            window.setTimeout(function() {
                $(el).css('height', elH + 'px');
                $(el).css('margin-bottom', '30px');
            }, 100);
        }
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