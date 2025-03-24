### Tài liệu cho Backend Developer - TemplateLab

## 1. Tổng quan dự án

TemplateLab là một nền tảng bán mẫu giao diện (templates) cho các trang web, với giao diện người dùng được xây dựng bằng Next.js và Tailwind CSS. Dự án cần một backend mạnh mẽ để hỗ trợ các chức năng như quản lý sản phẩm, xử lý thanh toán, quản lý người dùng và phân tích dữ liệu.

### Công nghệ Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Đa ngôn ngữ**: Hỗ trợ tiếng Anh và tiếng Việt


## 2. Mô hình dữ liệu

### 2.1 Templates (Mẫu giao diện)

```json
{
  "id": "string (UUID)",
  "title": "string",
  "slug": "string",
  "description": "string",
  "price": "number",
  "salePrice": "number (optional)",
  "category": "string (reference to Category)",
  "tags": "array of strings",
  "features": "array of strings",
  "images": "array of strings (URLs)",
  "thumbnailImage": "string (URL)",
  "demoUrl": "string (URL)",
  "downloadUrl": "string (URL)",
  "status": "enum (published, draft)",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "salesCount": "number",
  "rating": "number",
  "reviewsCount": "number",
  "includes": "array of strings"
}
```

### 2.2 Categories (Danh mục)

```json
{
  "id": "string (UUID)",
  "name": "string",
  "slug": "string",
  "description": "string",
  "icon": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 2.3 Users (Người dùng)

```json
{
  "id": "string (UUID)",
  "email": "string",
  "password": "string (hashed)",
  "firstName": "string",
  "lastName": "string",
  "avatar": "string (URL)",
  "role": "enum (user, admin)",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "lastLoginAt": "datetime"
}
```

### 2.4 Orders (Đơn hàng)

```json
{
  "id": "string (UUID)",
  "orderNumber": "string",
  "userId": "string (reference to User)",
  "items": "array of OrderItems",
  "subtotal": "number",
  "tax": "number",
  "total": "number",
  "status": "enum (pending, completed, failed, refunded)",
  "paymentMethod": "string",
  "paymentId": "string",
  "billingInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 2.5 OrderItems (Chi tiết đơn hàng)

```json
{
  "id": "string (UUID)",
  "orderId": "string (reference to Order)",
  "templateId": "string (reference to Template)",
  "title": "string",
  "price": "number",
  "createdAt": "datetime"
}
```

### 2.6 Reviews (Đánh giá)

```json
{
  "id": "string (UUID)",
  "templateId": "string (reference to Template)",
  "userId": "string (reference to User)",
  "rating": "number (1-5)",
  "comment": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 2.7 SupportTickets (Hỗ trợ)

```json
{
  "id": "string (UUID)",
  "ticketNumber": "string",
  "userId": "string (reference to User)",
  "subject": "string",
  "description": "string",
  "status": "enum (open, in_progress, closed)",
  "priority": "enum (low, medium, high)",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "closedAt": "datetime"
}
```

### 2.8 SupportMessages (Tin nhắn hỗ trợ)

```json
{
  "id": "string (UUID)",
  "ticketId": "string (reference to SupportTicket)",
  "userId": "string (reference to User)",
  "isAdmin": "boolean",
  "message": "string",
  "attachments": "array of strings (URLs)",
  "createdAt": "datetime"
}
```

## 3. API Endpoints

### 3.1 Authentication

| Endpoint | Method | Description | Request Body | Response
|-----|-----|-----|-----|-----
| `/api/auth/register` | POST | Đăng ký tài khoản mới | `{ email, password, firstName, lastName }` | `{ user, token }`
| `/api/auth/login` | POST | Đăng nhập | `{ email, password }` | `{ user, token }`
| `/api/auth/logout` | POST | Đăng xuất | - | `{ success: true }`
| `/api/auth/me` | GET | Lấy thông tin người dùng hiện tại | - | `{ user }`
| `/api/auth/refresh-token` | POST | Làm mới token | `{ refreshToken }` | `{ token, refreshToken }`
| `/api/auth/forgot-password` | POST | Quên mật khẩu | `{ email }` | `{ success: true }`
| `/api/auth/reset-password` | POST | Đặt lại mật khẩu | `{ token, password }` | `{ success: true }`


### 3.2 Templates

| Endpoint | Method | Description | Request Body/Params | Response
|-----|-----|-----|-----|-----
| `/api/templates` | GET | Lấy danh sách mẫu giao diện | Query: `{ page, limit, category, search, sort, status, tags }` | `{ templates, pagination }`
| `/api/templates/:id` | GET | Lấy chi tiết mẫu giao diện | - | `{ template }`
| `/api/templates/:slug` | GET | Lấy chi tiết mẫu giao diện theo slug | - | `{ template }`
| `/api/templates` | POST | Tạo mẫu giao diện mới (Admin) | Template object | `{ template }`
| `/api/templates/:id` | PUT | Cập nhật mẫu giao diện (Admin) | Template object | `{ template }`
| `/api/templates/:id` | DELETE | Xóa mẫu giao diện (Admin) | - | `{ success: true }`
| `/api/templates/featured` | GET | Lấy mẫu giao diện nổi bật | Query: `{ limit }` | `{ templates }`
| `/api/templates/:id/related` | GET | Lấy mẫu giao diện liên quan | - | `{ templates }`


### 3.3 Categories

| Endpoint | Method | Description | Request Body/Params | Response
|-----|-----|-----|-----|-----
| `/api/categories` | GET | Lấy tất cả danh mục | - | `{ categories }`
| `/api/categories/:id` | GET | Lấy chi tiết danh mục | - | `{ category }`
| `/api/categories` | POST | Tạo danh mục mới (Admin) | Category object | `{ category }`
| `/api/categories/:id` | PUT | Cập nhật danh mục (Admin) | Category object | `{ category }`
| `/api/categories/:id` | DELETE | Xóa danh mục (Admin) | - | `{ success: true }`


### 3.4 Users

| Endpoint | Method | Description | Request Body/Params | Response
|-----|-----|-----|-----|-----
| `/api/users` | GET | Lấy danh sách người dùng (Admin) | Query: `{ page, limit, search, role }` | `{ users, pagination }`
| `/api/users/:id` | GET | Lấy chi tiết người dùng (Admin) | - | `{ user }`
| `/api/users/:id` | PUT | Cập nhật người dùng (Admin) | User object | `{ user }`
| `/api/users/:id` | DELETE | Xóa người dùng (Admin) | - | `{ success: true }`
| `/api/users/profile` | PUT | Cập nhật thông tin cá nhân | User object | `{ user }`
| `/api/users/change-password` | PUT | Đổi mật khẩu | `{ currentPassword, newPassword }` | `{ success: true }`


### 3.5 Orders

| Endpoint | Method | Description | Request Body/Params | Response
|-----|-----|-----|-----|-----
| `/api/orders` | GET | Lấy danh sách đơn hàng của người dùng | Query: `{ page, limit, status }` | `{ orders, pagination }`
| `/api/orders/:id` | GET | Lấy chi tiết đơn hàng | - | `{ order }`
| `/api/orders` | POST | Tạo đơn hàng mới | Order object | `{ order, paymentUrl }`
| `/api/orders/webhook` | POST | Webhook cho thanh toán | Payment provider data | `{ success: true }`
| `/api/orders/admin` | GET | Lấy tất cả đơn hàng (Admin) | Query: `{ page, limit, status, search }` | `{ orders, pagination }`
| `/api/orders/:id/status` | PUT | Cập nhật trạng thái đơn hàng (Admin) | `{ status }` | `{ order }`


### 3.6 Reviews

| Endpoint | Method | Description | Request Body/Params | Response
|-----|-----|-----|-----|-----
| `/api/templates/:id/reviews` | GET | Lấy đánh giá của mẫu giao diện | Query: `{ page, limit, sort }` | `{ reviews, pagination }`
| `/api/templates/:id/reviews` | POST | Thêm đánh giá mới | `{ rating, comment }` | `{ review }`
| `/api/reviews/:id` | PUT | Cập nhật đánh giá | `{ rating, comment }` | `{ review }`
| `/api/reviews/:id` | DELETE | Xóa đánh giá | - | `{ success: true }`


### 3.7 Support Tickets

| Endpoint | Method | Description | Request Body/Params | Response
|-----|-----|-----|-----|-----
| `/api/support/tickets` | GET | Lấy danh sách ticket hỗ trợ của người dùng | Query: `{ page, limit, status }` | `{ tickets, pagination }`
| `/api/support/tickets/:id` | GET | Lấy chi tiết ticket | - | `{ ticket, messages }`
| `/api/support/tickets` | POST | Tạo ticket hỗ trợ mới | `{ subject, description }` | `{ ticket }`
| `/api/support/tickets/:id/close` | PUT | Đóng ticket | - | `{ ticket }`
| `/api/support/tickets/:id/messages` | POST | Thêm tin nhắn vào ticket | `{ message, attachments }` | `{ message }`
| `/api/support/admin/tickets` | GET | Lấy tất cả ticket (Admin) | Query: `{ page, limit, status, priority }` | `{ tickets, pagination }`
| `/api/support/admin/tickets/:id/status` | PUT | Cập nhật trạng thái ticket (Admin) | `{ status, priority }` | `{ ticket }`


### 3.8 Analytics (Admin)

| Endpoint | Method | Description | Request Body/Params | Response
|-----|-----|-----|-----|-----
| `/api/analytics/revenue` | GET | Lấy dữ liệu doanh thu | Query: `{ period }` | `{ data }`
| `/api/analytics/sales` | GET | Lấy dữ liệu bán hàng | Query: `{ period }` | `{ data }`
| `/api/analytics/users` | GET | Lấy dữ liệu người dùng | Query: `{ period }` | `{ data }`
| `/api/analytics/templates` | GET | Lấy dữ liệu mẫu giao diện | - | `{ data }`
| `/api/analytics/dashboard` | GET | Lấy dữ liệu tổng quan cho dashboard | - | `{ revenue, templates, users, conversion }`


## 4. Xác thực và Phân quyền

### 4.1 Xác thực

- Sử dụng JWT (JSON Web Tokens) cho xác thực
- Token có thời hạn 1 giờ
- Refresh token có thời hạn 7 ngày
- Gửi token trong header: `Authorization: Bearer {token}`


### 4.2 Phân quyền

- **Public**: Endpoints có thể truy cập mà không cần xác thực
- **User**: Endpoints yêu cầu người dùng đã đăng nhập
- **Admin**: Endpoints chỉ dành cho quản trị viên


## 5. Tích hợp thanh toán

### 5.1 Stripe

- Tích hợp Stripe cho xử lý thanh toán
- Cần webhook để xử lý các sự kiện thanh toán
- Lưu trữ ID thanh toán để tham chiếu


### 5.2 PayPal

- Tích hợp PayPal như một phương thức thanh toán thay thế
- Xử lý callback từ PayPal sau khi thanh toán hoàn tất


## 6. Lưu trữ file

### 6.1 Lưu trữ hình ảnh

- Sử dụng dịch vụ lưu trữ đám mây (AWS S3, Cloudinary, hoặc tương tự)
- Tạo API endpoint để tải lên hình ảnh
- Tối ưu hóa hình ảnh trước khi lưu trữ


### 6.2 Lưu trữ template

- Lưu trữ các file template trong dịch vụ lưu trữ đám mây
- Tạo URL tải xuống có thời hạn cho người dùng đã mua


## 7. Đa ngôn ngữ

### 7.1 API đa ngôn ngữ

- Hỗ trợ header `Accept-Language` để xác định ngôn ngữ
- Trả về dữ liệu theo ngôn ngữ được yêu cầu (tiếng Anh hoặc tiếng Việt)
- Lưu trữ các bản dịch trong cơ sở dữ liệu hoặc file JSON


## 8. Yêu cầu bổ sung

### 8.1 Hiệu suất

- Triển khai bộ nhớ đệm (Redis hoặc tương tự) cho các endpoint phổ biến
- Tối ưu hóa truy vấn cơ sở dữ liệu
- Phân trang cho tất cả các endpoint trả về danh sách


### 8.2 Bảo mật

- Triển khai rate limiting để ngăn chặn tấn công brute force
- Xác thực CSRF cho các endpoint POST/PUT/DELETE
- Mã hóa dữ liệu nhạy cảm trong cơ sở dữ liệu
- Triển khai HTTPS cho tất cả các endpoint


### 8.3 Logging và Monitoring

- Ghi log tất cả các request và response
- Theo dõi lỗi và ngoại lệ
- Thiết lập cảnh báo cho các sự cố quan trọng


## 9. Môi trường triển khai

### 9.1 Môi trường phát triển

- Cung cấp API documentation (Swagger/OpenAPI)
- Thiết lập dữ liệu mẫu cho môi trường phát triển


### 9.2 Môi trường sản xuất

- Triển khai trên dịch vụ đám mây (AWS, GCP, Azure)
- Thiết lập auto-scaling
- Cấu hình CDN cho các tài nguyên tĩnh


## 10. Lịch trình triển khai

1. **Tuần 1-2**: Thiết lập cơ sở dữ liệu và mô hình dữ liệu
2. **Tuần 3-4**: Triển khai API xác thực và quản lý người dùng
3. **Tuần 5-6**: Triển khai API quản lý template và danh mục
4. **Tuần 7-8**: Triển khai API đơn hàng và thanh toán
5. **Tuần 9-10**: Triển khai API đánh giá và hỗ trợ
6. **Tuần 11-12**: Triển khai API phân tích và tối ưu hóa