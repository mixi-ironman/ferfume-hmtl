$(document).ready(function () {
    // Khi click vào nút "Chọn mã giảm giá"
    $('.coupon-toggle-btn').on('click', function () {
        const $couponList = $('.coupon-list-container');
        const $overlay = $('.coupon-list-overlay');

        if ($couponList.hasClass('show')) {
            $couponList.removeClass('show');
            $overlay.fadeOut(); // Ẩn overlay
            setTimeout(function () {
                $couponList.css('display', 'none'); // Ẩn sau khi hiệu ứng hoàn tất
            }, 300); // Thời gian khớp với hiệu ứng
        } else {
            $couponList.css('display', 'block').addClass('show');
            $overlay.fadeIn(); // Hiện overlay
        }
    });

    // Khi click vào ngoài danh sách coupon hoặc overlay, ẩn danh sách
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.coupon-toggle-btn, .coupon-list-container').length) {
            $('.coupon-list-container').removeClass('show');
            $('.coupon-list-overlay').fadeOut(); // Ẩn overlay
            setTimeout(function () {
                $('.coupon-list-container').css('display', 'none'); // Ẩn sau khi hiệu ứng hoàn tất
            }, 300);
        }
    });
});

$(document).ready(function () {
    $('#deliveryDate').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        language: 'vi',
    });
});

$(document).ready(function () {
    $('.may-like_products-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: true,
        dots: false,
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    });
});
