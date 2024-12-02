$(document).ready(function () {
    // Xử lý khi nhấn nút "Thêm vào giỏ hàng"
    $('.btn-add-to-cart').on('click', function () {
        let productId = $(this).data('product-id'); // Lấy ID sản phẩm
        let productName = $(this).data('product-name'); // Lấy tên sản phẩm
        let productPrice = $(this).data('product-price'); // Lấy giá sản phẩm
        let productImage = $(this).data('product-image'); // Lấy hình ảnh sản phẩm

        // Lấy số lượng từ input, nếu không hợp lệ thì gán mặc định = 1
        let productQuantity = parseInt($('#quantity-input').val()) || 1;

        // Lấy giỏ hàng từ localStorage (nếu có) hoặc tạo mảng rỗng
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        let existingItem = cart.find((item) => item.id === productId);

        if (existingItem) {
            // Sản phẩm đã tồn tại -> Cộng dồn số lượng
            existingItem.quantity += productQuantity;
        } else {
            // Sản phẩm chưa tồn tại -> Thêm sản phẩm mới vào giỏ hàng
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: productQuantity,
            });
        }

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật giao diện giỏ hàng
        renderCartItems();
        updateCartCount();
    });

    // Hàm render lại danh sách sản phẩm trong giỏ hàng từ localStorage
    function renderCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsContainer = $('.cart-items');
        cartItemsContainer.empty(); // Xóa toàn bộ sản phẩm hiện tại

        cart.forEach((item) => {
            let newItem = `
                 <li id="cart-item-${item.id}" class="cart-item d-flex align-items-center mb-2">
                     <img
                         src="${item.image}"
                         alt="${item.name}"
                         class="cart-item-img"
                         style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px"
                     />
                     <div class="cart-item-info ms-3">
                         <p class="cart-item-name mb-1">${item.name}</p>
                         <div class="d-flex align-items-center">
                             <p class="cart-item-price mb-0">${item.price} VND </p>
                             <p class="cart-item-quantity_ mb-0 ms-1"> x </p>
                             <p class="cart-item-quantity mb-0 ms-1">${item.quantity}</p>
                         </div>
                     </div>
                 </li>
             `;
            cartItemsContainer.append(newItem); // Thêm sản phẩm vào danh sách giỏ hàng
        });
    }

    // Hàm cập nhật tổng số lượng hiển thị trên biểu tượng giỏ hàng
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        $('.header__cart-count').text(totalQuantity); // Gán số lượng vào biểu tượng giỏ hàng
    }

    // Gọi renderCartItems khi tải trang để hiển thị giỏ hàng từ localStorage
    $(document).ready(function () {
        renderCartItems();
        updateCartCount();
    });

    // Hàm đăng xuất
    function logoutUser() {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('user');

        // Thông báo đăng xuất thành công
        alert('Đăng xuất thành công!');

        // Chuyển hướng người dùng đến trang đăng nhập (hoặc trang khác)
        window.location.href = 'http://127.0.0.1:5500/register-customer.html'; // Thay đổi URL nếu cần
    }

    // Thêm sự kiện click vào nút "Đăng xuất"
    document.getElementById('logout-btn').addEventListener('click', function () {
        logoutUser();
    });

    // Kiểm tra xem người dùng đã đăng nhập chưa
    function checkLoginStatus() {
        const user = localStorage.getItem('user');
        console.log(user);

        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const accountLink = document.getElementById('account-link');
        const logoutLink = document.getElementById('logout-link');

        if (user) {
            // Nếu người dùng đã đăng nhập
            const userInfo = JSON.parse(user);
            const username = userInfo.username;

            // Hiển thị tài khoản và đăng xuất, ẩn đăng ký và đăng nhập
            accountLink.innerHTML = `
            <a href="./account.html" class="submenu-link text-decoration-none text-dark d-flex align-items-center">
                <i class="fa-solid fa-user me-2"></i> Tài khoản
            </a>
        `;
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            logoutLink.style.display = 'block';
        } else {
            // Nếu người dùng chưa đăng nhập
            accountLink.style.display = 'none';
            logoutLink.style.display = 'none';
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
        }
    }

    // Gọi hàm khi trang được tải
    checkLoginStatus();
});
