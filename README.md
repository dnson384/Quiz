# Website hỗ trợ học tập (Quiz App)

## Demo Video
[![Quiz App Demo](docs/images/demo.png)](https://youtu.be/x_gd54RaYX4)

## Các tính năng chính
### Dành cho Học viên
- **Tài khoản cá nhân:** Đăng ký, đăng nhập
- **Học tập:** Học qua Flashcard, ngẫu nhiên hoặc theo chủ đề
- **Kiểm tra kiến thức**: Làm bài kiểm tra trắc nghiệm có tính giờ, hệ thống tự động chấm điểm và nộp bài
- **Theo dõi tiến độ:** Xem lại lịch sử các bài kiểm tra đã làm và chi tiết kết quả từng câu hỏi
- **Tìm kiếm:** Tìm kiếm học phần, bài kiểm tra theo từ khóa

### Dành cho Giáo viên
- **Quản lý học phần:** Tạo mới, chỉnh sửa, xóa các bộ từ vựng
- **Quản lý bài kiểm tra:** Soạn đề kiểm tra trắc nghiệm, quản lý các câu hỏi và cài đặt đáp án đúng

### Dành cho Quản trị viên
- **Quản lý người dùng:** Phân quyền vai trò cho tài khoản
- **Kiểm soát:** Khóa hoặc mở khóa tài khoản người dùng vi phạm

## Công nghệ sử dụng
- **Frontend:** Next.js (React), sử dụng Node.js (phiên bản v22.17.1)
- **Backend:** FastAPI (Python phiên bản v3.12.4)
- **Cơ sở dữ liệu:** PostgreSQL (phiên bản 16.10)


## Hướng dẫn cài đặt và chạy dự án
### Các bước chung
#### Bước 1: Clone dự án
```
git clone https://github.com/dnson384/Quiz
cd Quiz
```

#### Bước 2: Chuẩn bị môi trường
Dự án sử dụng các tệp .env để cấu hình. Cần tạo chúng từ các bản mẫu:
- Cho Backend & Database:
```
bash
cp ./server/.env.example ./server/.env
```
(Mở ./server/.env và cập nhật thông tin trong file .env)

- Cho Frontend:
 ```
bash
cp ./ui/.env.example ./ui/.env
```
(Mở ./ui/.env và cập nhật thông tin trong file .env)


### Khởi chạy hệ thống
### *Cách 1: Chạy bằng Docker:* 
Tại thư mục gốc của dự án, chạy lệnh sau:

```
bash
docker compose up -d
```
**Lưu ý:** Lệnh này sẽ tự động tạo cơ sở dữ liệu tên là Quiz (dựa trên biến POSTGRES_DB trong tệp .env). Không cần tạo database thủ công trong PostgreSQL.

### *Cách 2: Chạy thủ công (Không dùng Docker)*
#### Bước 1: Cấu hình Cơ sở dữ liệu (PostgreSQL)
- **Tạo Database:** Mở công cụ quản lý PostgreSQL (pgAdmin hoặc SQL Shell) và tạo một database mới tên là Quiz
- **Khởi tạo cấu trúc và dữ liệu:** Mở Terminal/CMD và chạy lệnh dưới
```
psql -U <username> -d Quiz -f init-db/backup.sql
```

### Địa chỉ truy cập
- Frontend: http://localhost:3000
- API (Swagger): http://localhost:8000/docs
