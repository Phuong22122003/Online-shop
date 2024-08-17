
# WEB BÁN HÀNG

Trang web dùng với mục đích học tập
# Mô tả
- Vài trò của người dùng:   
    - Người dùng với vai trò là người mua sắm.
    - Người dùng với vai trò là người bán hàng.
- Chức năng chính:
    - Xem chi tiết sản phẩm như tên, giá, mô tả của sản phẩm.
    - Mua sắm: Người dùng sẽ được xem giỏ hàng và được chọn những sản phẩm cần mua. Sau đó tổng tiền sẽ được hiện ra và người dùng chỉ cần nhấn mua và xác nhận là sẽ mua thành công.
    - Xem trạng thái đơn hàng: Người tiêu dùng sẽ xem được trạng thái mua hàng của mình như đơn hàng giao thành công, đang giao, đã hủy.
    - Đối với người dùng có vai trò bán hàng thì sẽ được quản lý các mặc hàng mình bán như thêm hoặc giảm số lượng mặc hàng sẳn có, chỉnh sửa mô tả, chỉnh sửa tên, chỉnh sửa giá. Hoặc thêm mặc hàng mới
# Các công nghệ sử dụng:
- Database:
    - Sql server
- Backend
    - Framwork: Spring boot.
    - Spring security
- Frontend:
    - Html, css, javascript.
    - Thymeleaf.
# Cách sử dụng:
- Clone project về sau đó chạy file sqlscript trong sql server và run project.
- Hình ảnh sẻ được lưu vào folder File trong project. Có thể sửa đổi đến folder nào tùy ý và cấu hình lại đường dẫn trong file application.properties.
- Câu hình thêm
    + spring.security.oauth2.client.registration.google.client-id
    + spring.security.oauth2.client.registration.google.client-secret
    + spring.security.oauth2.client.registration.google.scope=email,profile
