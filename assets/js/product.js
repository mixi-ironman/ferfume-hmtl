$(document).ready(function () {
    function showTab(event) {
        var tabItem = $('.product-detail__nav-item');
        var panes = $('.product-detail__tab-content');
        // console.log(panes);

        tabItem.removeClass('active');
        panes.removeClass('active');

        // Thêm class active cho tab được click và content tương ứng
        $(this).addClass('active');
        var index = tabItem.index(this);
        panes.eq(index).addClass('active');
    }

    // Đăng ký sự kiện click cho các tab
    $(document).on('click', '.product-detail__nav-item', showTab);
});

$(document).ready(function () {
    $('.similar_products-list').slick({
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

    $('.same_products-list').slick({
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
                    dots: true,
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

    $('.viewed_products-list').slick({
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
                    dots: true,
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

    $('.product-detail_wrap-img_main-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        // asNavFor: '.product-detail_wrap-thumbnail', // Liên kết với thumbnail slider
        prevArrow:
            "<button type='button' class='slick-prev pull-left'><i class='fa-solid fa-chevron-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right'><i class='fa-solid fa-chevron-right'></i></button>",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    });

    // Khởi tạo slider cho thumbnail
    $('.product-detail_wrap-thumbnail').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        vertical: true, // Chuyển sang chế độ theo chiều dọc
        draggable: false, // Tắt khả năng kéo (drag)
        infinite: false,
    });

    // Xử lý để làm thumbnail "active" khi ảnh chính thay đổi
    $('.product-detail_wrap-img_main-list').on('afterChange', function (event, slick, currentSlide) {
        // Xóa class active khỏi tất cả thumbnail
        $('.product-detail_wrap-thumbnail .product-detail_img-thumbnail').removeClass('active');

        // Thêm class active cho thumbnail tương ứng
        $(
            '.product-detail_wrap-thumbnail .product-detail_img-thumbnail[data-slick-index="' + currentSlide + '"]',
        ).addClass('active');
    });

    // Khi click vào thumbnail, làm ảnh chính thay đổi
    $('.product-detail_wrap-thumbnail .product-detail_img-thumbnail').on('click', function () {
        var index = $(this).data('slick-index');
        $('.product-detail_wrap-img_main-list').slick('slickGoTo', index); // Chuyển đến ảnh tương ứng
    });

    // -------------------------------------------------------------------

    // Kiểm tra và ẩn/hiện các nút mũi tên khi slider thay đổi
    $('.product-detail_wrap-img_main-list,.similar_products-list,.same_products-list,.viewed_products-list').on(
        'afterChange',
        function (event, slick, currentSlide) {
            var totalSlides = slick.slideCount;
            console.log(currentSlide);

            // Ẩn nút prevArrow nếu đang ở item đầu tiên
            if (currentSlide === 0) {
                $('.slick-prev').hide();
                // $('.slick-prev').prop('disabled', true);
            } else {
                $('.slick-prev').show();
            }

            // Ẩn nút nextArrow nếu đang ở item cuối cùng
            if (currentSlide >= totalSlides - slick.options.slidesToShow) {
                $('.slick-next').hide();
            } else {
                $('.slick-next').show();
            }
        },
    );

    // Kiểm tra lần đầu khi slider được khởi tạo
    $('.product-detail_wrap-img_main-list,.similar_products-list,.same_products-list,.viewed_products-list').on(
        'init',
        function (event, slick) {
            var totalSlides = slick.slideCount;

            // Ẩn nút prevArrow nếu slider bắt đầu từ item đầu tiên
            if (slick.currentSlide === 0) {
                $('.slick-prev').hide();
            }

            // Ẩn nút nextArrow nếu không đủ item để cuộn
            if (slick.currentSlide >= totalSlides - slick.options.slidesToShow) {
                $('.slick-next').hide();
            }
        },
    );
});

// $(document).ready(function () {
//     function changeImage(targetElement, event, mainImageClass) {
//         event.preventDefault();
//         var url = $(targetElement).data('img');
//         $(mainImageClass).attr('src', url);
//     }

//     $(document).on('click', '.product-detail_img-thumbnail', function (event) {
//         changeImage(this, event, '.mainImage');
//     });
// });
