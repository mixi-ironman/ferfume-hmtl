// thay đối số lượng sản phẩm
$(document).ready(function () {
    // Bắt sự kiện cho tất cả các quantity-input
    $('[data-quantity-input]').each(function () {
        const $this = $(this);

        // Nút tăng
        $this.find('.btn-increase').on('click', function () {
            const $input = $this.find('.input-quantity');
            let currentValue = parseInt($input.val());
            console.log(currentValue);
            $input.val(currentValue + 1);
        });

        // Nút giảm
        $this.find('.btn-decrease').on('click', function () {
            const $input = $this.find('.input-quantity');
            let currentValue = parseInt($input.val());
            if (currentValue > 1) {
                $input.val(currentValue - 1);
            }
        });
    });
});

// Hàm hiển thị nội dung khi hover
$(document).ready(function () {
    function initHover(triggerSelector, contentSelector) {
        const $trigger = $(triggerSelector);
        const $content = $(contentSelector);

        // Hiển thị nội dung khi hover vào trigger
        $trigger.hover(
            function () {
                $content.css('display', 'block'); // Hiển thị nội dung
            },
            function () {
                // Khi chuột rời khỏi trigger, kiểm tra xem có đang hover vào content không
                // if (!$content.is(':hover')) {
                // $content.css('display', 'none'); // Ẩn nếu không hover vào content
                // }
            },
        );

        // Giữ hiển thị nội dung khi hover vào chính nó
        $content.hover(
            function () {
                // $(this).css('display', 'block');
            },
            function () {
                $(this).css('display', 'none'); // Ẩn khi không hover vào
            },
        );
    }

    // Khởi tạo hover cho các phần tử cụ thể
    initHover('.header-right__cart', '.top-cart-content');
    initHover('.header-right__cart_', '.top-cart-content_');
    initHover('.menu-item-fluid', '.menu-item__submenu-fluid');
});

// hiển thị resultBox search
$(document).ready(function () {
    const resultBox = $('#resultBox');
    // Khi click vào nút tìm kiếm, hiển thị resultBox
    $('.icon-action__search').on('click', function (e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        resultBox.removeClass('hidden');
        setTimeout(() => {
            resultBox.addClass('show');
        }, 80);
    });

    // Khi click ra ngoài, ẩn resultBox
    $(document).on('click', function () {
        resultBox.addClass('hidden');
    });

    // Ngăn không ẩn resultBox khi click vào bên trong nó
    resultBox.on('click', function (e) {
        e.stopPropagation();
    });
});

function headerScroll() {
    var stickyElement = document.querySelector('.header');
    var contentOffsetTop = document.querySelector('.main-content').offsetTop;

    // Hàm kiểm tra vị trí cuộn và thêm/xóa class 'sticky'
    function handleScroll() {
        var scrollPosition = window.scrollY;

        if (scrollPosition >= contentOffsetTop) {
            stickyElement.classList.add('sticky');
        } else {
            stickyElement.classList.remove('sticky');
        }
    }

    // Thêm sự kiện scroll vào window
    window.addEventListener('scroll', handleScroll);
}

// Gọi hàm
headerScroll();

// accordion ------------------------------------
// Hàm để hiển thị/ẩn danh sách và xoay icon
function toggleAccordion(trigger, contentClass, iconClass) {
    var icon = trigger.find(iconClass);

    // Xóa lớp .rotated khỏi tất cả các icon khác
    $(iconClass).not(icon).removeClass('rotated');

    // Kiểm tra xem icon hiện tại đã có lớp .rotated chưa
    if (icon.hasClass('rotated')) {
        icon.removeClass('rotated'); // Xoay ngược lại
    } else {
        icon.addClass('rotated'); // Xoay 180 độ
    }

    // Ẩn tất cả các nội dung ngoại trừ phần tử liền sau
    $(contentClass).not(trigger.find(contentClass)).slideUp();

    // Hiển thị hoặc ẩn danh sách hiện tại
    trigger.find(contentClass).slideToggle();
}

$(document).ready(function () {
    // toggle footer
    $('.footer-section_click').click(function (event) {
        // event.preventDefault();
        toggleAccordion($(this), '.footer-links_click', '.footer-section__icon');
    });

    // toggle sub nav mobile
    $('.nav__mobile-item > a').click(function (event) {
        event.preventDefault();
        $('.product-detail__content-mobile').removeClass('d-none');
        toggleAccordion($(this).parent(), '.nav__mobile-item__sub-menu', '.mobile-nav__icon');
    });

    // Hàm kiểm tra kích thước màn hình và gán sự kiện cho tab trên màn mobile
    function handleProductDetailTabClick() {
        if ($(window).width() < 768) {
            // Đảm bảo sự kiện chỉ được gán một lần khi ở màn hình nhỏ
            $('.product-detail__nav-item > .product-detail__tab-link').off('click'); // Gỡ bỏ sự kiện cũ
            $('.product-detail__nav-item > .product-detail__tab-link').on('click', function (event) {
                event.preventDefault();
                $('.product-detail__content-mobile').removeClass('d-none');
                toggleAccordion($(this).parent(), '.product-detail__content-mobile', '.mobile-nav__icon');
            });
        } else {
            $('.product-detail__content-mobile').addClass('d-none');
            $('.mobile-nav__icon-wrapper').addClass('d-none');
        }
    }

    // Gọi hàm khi document load
    handleProductDetailTabClick();

    // Gọi lại hàm khi thay đổi kích thước cửa sổ
    $(window).resize(function () {
        handleProductDetailTabClick();
    });
});

// toggle nav mobile
// -------
function initToggleNav(toggleButtonSelector, navBarSelector, overlaySelector) {
    var navBar = $(navBarSelector);
    var overlay = $(overlaySelector);

    // Khi bấm vào nút toggle, hiển thị nav bar và overlay
    $(toggleButtonSelector).on('click', function (e) {
        e.stopPropagation();

        // Hiển thị nav bar với animation trượt từ trái
        navBar.removeClass('d-none');
        navBar.show().animate(
            {
                left: '0',
            },
            200,
        );

        overlay.fadeIn(200);
        $('.header').removeClass('sticky');
        $('body').css('overflow', 'hidden');
    });

    // Khi bấm vào bất cứ đâu bên ngoài nav bar, ẩn nav bar và overlay
    $(document).on('click', function () {
        navBar.animate(
            {
                left: '-300px',
            },
            200,
            function () {
                // navBar.hide();
            },
        );

        overlay.fadeOut(200);
        $('body').css('overflow', 'visible');
    });

    // Ngăn không ẩn nav bar khi click vào bên trong nó
    navBar.on('click', function (e) {
        e.stopPropagation();
    });
}

$(document).ready(function () {
    // Gọi hàm với các selector khác nhau
    // nav header mobile
    initToggleNav('.toggle-nav__mobile', '.nav__mobile', '.overlay');
    // nav-filter-mobile
    initToggleNav('.filter-mobile__icon-wrap', '.product-collection__filter', '.overlay');
    // initToggleNav('.filter-mobile__icon-wrap', '.product-collection__filter-mobile', '.overlay');
});

// $(document).ready(function () {
//     function activeOption(itemSelector, activeClass) {
//         $(document).on('click', itemSelector, function () {
//             // Bỏ class active của tất cả các item
//             $(itemSelector).removeClass(activeClass);

//             // Thêm class active vào item được click
//             $(this).addClass(activeClass);
//         });
//     }

//     activeOption('.product-options__size-item', 'active'); // Kích hoạt chọn size
//     activeOption('.product-options__color-img', 'active'); // Kích hoạt chọn màu
// });
$(document).ready(function () {
    function activeOption(itemSelector, activeClass) {
        $(document).on('click', itemSelector, function () {
            // Bỏ class active của tất cả các item trong cùng một nhóm (option)
            $(this).closest('.product-options__wrap').find(itemSelector).removeClass(activeClass);

            // Thêm class active vào item được click
            $(this).addClass(activeClass);
        });
    }

    activeOption('.product-options__item-btn', 'active'); // Kích hoạt chọn màu và kích thước
});

$(document).ready(function () {
    function activateOption(itemSelector, activeClass) {
        $(document).on('click', itemSelector, function () {
            var $currentItem = $(this);

            $currentItem.parent().find(itemSelector).removeClass(activeClass);
            $currentItem.addClass(activeClass);
        });
    }

    activateOption('.product-info__item-color-img', 'active'); // Kích hoạt chọn màu
});

// $(document).ready(function () {
//     var colorItems = $('.product-info__item-color-img');
//     var viewMoreButton = $('<a>+1</a>').addClass('view-more-link'); // Đảm bảo sử dụng đúng biến này

//     // Ẩn tất cả các phần tử sau phần tử thứ 3
//     colorItems.each(function (index) {
//         if (index >= 2) {
//             // Ẩn từ phần tử thứ 3 trở đi (index >= 2)
//             $(this).hide();
//         }
//     });

//     // Chỉ thêm nút "Xem thêm" nếu có hơn 2 phần tử
//     if (colorItems.length > 2) {
//         colorItems.eq(2).after(viewMoreButton); // Đảm bảo thêm nút sau phần tử thứ 3
//     }
// });

$(document).ready(function () {
    // Lặp qua từng sản phẩm
    $('.product-item').each(function () {
        var colorItems = $(this).find('.product-info__item-color-img'); // Lấy các phần tử màu sắc trong sản phẩm hiện tại
        var viewMoreButton = $(this).find('.view-more-link');

        // Ẩn tất cả các phần tử sau phần tử thứ 3 (index >= 2)
        colorItems.each(function (index) {
            if (index >= 2) {
                $(this).addClass('d-none');
            }
        });

        // Chỉ thêm nút "Xem thêm" nếu có hơn 2 phần tử
        if (colorItems.length > 2 && viewMoreButton.length > 0) {
            // Nếu nút "Xem thêm" chưa có, chúng ta cần phải thêm vào sau phần tử thứ 3
            if (viewMoreButton.hasClass('d-none')) {
                viewMoreButton.removeClass('d-none').addClass('d-block');
            }

            // // Đảm bảo rằng nút "Xem thêm" sẽ được hiển thị sau phần tử thứ 3
            // colorItems.eq(2).after(viewMoreButton);
        }
    });
});

// xét chiều cao cho các item bằng nhau
function setEqualHeightForItems() {
    let productItems = document.querySelectorAll('.product-item');
    let maxHeight = 0;

    // Tìm chiều cao lớn nhất của các item
    productItems.forEach(function (item) {
        let itemHeight = item.offsetHeight;
        if (itemHeight > maxHeight) {
            maxHeight = itemHeight;
        }
    });

    // Đặt chiều cao của tất cả các item theo chiều cao lớn nhất
    productItems.forEach(function (item) {
        item.style.height = maxHeight + 'px';
    });
}

// Gọi hàm khi trang được tải
window.onload = setEqualHeightForItems;
