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
});