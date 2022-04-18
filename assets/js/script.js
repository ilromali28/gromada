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
});