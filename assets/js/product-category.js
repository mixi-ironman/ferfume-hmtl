function toggleColors(button) {
    const filterSection = $(button).closest('.filter-section'); // Lấy đúng nhóm bộ lọc

    // Chỉ toggle các phần tử có data-visible="false" trong nhóm bộ lọc hiện tại
    filterSection.find('.filter-checkbox .form-check[data-visible="false"]').each(function () {
        $(this).toggle();
    });

    // Đổi tên nút và thêm icon với style
    if ($(button).text().trim() === 'Xem thêm') {
        $(button).html('Thu gọn <i class="fa-solid fa-chevron-up" style="font-size: 13px; margin-left: 2px;"></i>');
    } else {
        $(button).html('Xem thêm <i class="fa-solid fa-chevron-down" style="font-size: 13px; margin-left: 2px;"></i>');
    }
}

$(document).ready(function () {
    $('.toggleColors').on('click', function () {
        toggleColors(this);
    });
});

$(document).ready(function () {
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
                    dots: false,
                    arrows: true,
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
