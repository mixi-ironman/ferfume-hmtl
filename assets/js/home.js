let slider_wrap = new Swiper('.slider-wrap', {
    loop: true, // Lặp lại vòng quay
    speed: 800, // Thời gian chuyển slide (1000ms)
    effect: 'fade', // Hiệu ứng chuyển slide mượt mà (có thể là 'fade', 'cube', 'coverflow', 'flip')
    autoplay: {
        delay: 3000, // Thời gian tự động chuyển slide (3 giây)
        disableOnInteraction: false, // Đảm bảo autoplay tiếp tục khi người dùng tương tác
    },
    navigation: {
        nextEl: '.slider-wrap .swiper-button-next', // Nút chuyển sang slide tiếp theo
        prevEl: '.slider-wrap .swiper-button-prev', // Nút quay lại slide trước
    },
    pagination: {
        el: '.swiper-pagination', // Hiển thị phân trang (nếu muốn)
        clickable: true,
    },
    grabCursor: true, // Tạo hiệu ứng kéo khi người dùng di chuột
    centeredSlides: true, // Giữ slide hiện tại ở giữa màn hình
    slidesPerView: 1, // Số lượng slide hiển thị cùng lúc
});

// Hàm đặt chiều cao cho các phần tử theo chiều cao lớn nhất của chúng
function setEqualHeightForItems(selector) {
    var $items = $(selector);
    var maxHeight = 0;

    // Tìm chiều cao lớn nhất của các item
    $items.each(function () {
        var itemHeight = $(this).outerHeight();
        if (itemHeight > maxHeight) {
            maxHeight = itemHeight;
        }
    });

    $items.css('height', maxHeight + 'px');
}

// Gọi hàm khi trang được tải
$(document).ready(function () {
    setEqualHeightForItems('.product-item');
    setEqualHeightForItems('.comment-item');
});

// Đặt lại chiều cao khi thay đổi kích thước cửa sổ
$(window).on('resize', function () {
    setEqualHeightForItems('.product-item');
    setEqualHeightForItems('.comment-item');
});

// Swiper Initialization
var mySwiperBrand = new Swiper('.swiper_brand', {
    slidesPerView: 5, // Hiển thị 5 hình ảnh
    spaceBetween: 20, // Khoảng cách giữa các slide
    navigation: {
        nextEl: '.swiper_brand .swiper-button-next',
        prevEl: '.swiper_brand .swiper-button-prev',
    },
    breakpoints: {
        // Responsive settings
        320: { slidesPerView: 2, spaceBetween: 10 }, // Mobile
        768: { slidesPerView: 3, spaceBetween: 15 }, // Tablet
        1024: { slidesPerView: 5, spaceBetween: 20 }, // Desktop
    },
});
