// Lưu trạng thái menu hiện tại
function setActiveMenu(menuId) {
    localStorage.setItem('activeMenu', menuId);
}

// Khôi phục trạng thái menu
function restoreActiveMenu() {
    const activeMenu = localStorage.getItem('activeMenu');
    console.log(activeMenu);

    if (activeMenu) {
        // Xóa tất cả trạng thái active
        document.querySelectorAll('.tab-link').forEach((item) => item.classList.remove('active'));

        // Đặt trạng thái active cho menu hiện tại
        const activeElement = document.querySelector(`.tab-link[onclick="setActiveMenu('${activeMenu}')"]`);
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }
}

// Gọi hàm khi tải trang
document.addEventListener('DOMContentLoaded', restoreActiveMenu);

$('.nav-item').on('click', function () {
    restoreActiveMenu();
});

$(document).ready(function () {
    let tem_active = $('.tab-link.active').data('tab');
    $('.tab-content').removeClass('d-none');
    $('.tab-content').addClass('d-none');
    $(`#${tem_active}`).removeClass('d-none');
});
