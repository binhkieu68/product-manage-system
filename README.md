# Product Management System (Node.js + Express + MongoDB + EJS + Bootstrap)

## Đáp ứng yêu cầu đề bài
| Yêu cầu | Đã làm ở đâu |
|---|---|
| 1 (4đ). REST API insert / delete product | `routes/api.js` → `POST /api/products`, `DELETE /api/products/:id` |
| 2 (4đ). Website hiển thị tất cả thông tin, cho phép insert/delete | `routes/web.js` + `views/products/index.ejs` |
| 3 (2đ). Sort theo ProductStoreCode, giảm dần | `Product.find().sort({ ProductStoreCode: -1, ... })` trong `routes/web.js` |

Database: MongoDB, collection tên chính xác **`ProductCollection`** (được ép cứng trong `models/Product.js`).

## Cấu trúc
```
product-manage-system/
├── app.js                  # entry point
├── models/Product.js       # Mongoose schema -> collection "ProductCollection"
├── routes/api.js           # REST API (insert, delete)
├── routes/web.js           # Website (list sorted, insert, delete)
├── views/
│   ├── partials/           # header/footer (Bootstrap CDN)
│   └── products/index.ejs  # giao diện chính
└── public/css/style.css
```

## Cài đặt
Yêu cầu: **Node.js** (v18+) và **MongoDB** đang chạy (local hoặc MongoDB Atlas).

```bash
cd product-manage-system
npm install
```

Copy file cấu hình:
```bash
copy .env.example .env
```
(trên macOS/Linux dùng `cp .env.example .env`)

Mở `.env`, sửa `MONGO_URI` nếu bạn dùng MongoDB Atlas hoặc port khác:
```
MONGO_URI=mongodb://127.0.0.1:27017/product_manage_db
```

## Chạy
```bash
npm start
```
Mở trình duyệt: **http://localhost:3000**

## Test REST API (yêu cầu 1) bằng curl hoặc Postman
```bash
# Thêm sản phẩm mới
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"ProductCode":"A12","ProductName":"Product 1","ProductDate":"2023-08-22","ProductOriginPrice":5000000,"Quantity":1000,"ProductStoreCode":"S10"}'

# Lấy danh sách
curl http://localhost:3000/api/products

# Xóa sản phẩm (thay <id> bằng _id Mongo thật)
curl -X DELETE http://localhost:3000/api/products/<id>
```

## Test Website (yêu cầu 2, 3)
1. Mở http://localhost:3000
2. Điền form "Add new product" → bấm **Add** → sản phẩm xuất hiện ngay trong bảng.
3. Bấm **Delete** trên 1 dòng để xóa.
4. Bảng tự động sắp xếp theo **Store Code giảm dần** (các sản phẩm cùng Store Code được gom nhóm lại với nhau).

## Đẩy lên GitHub
```bash
git init
git add .
git commit -m "Product management system - NodeJS + Express + MongoDB"
git branch -M main
gh repo create product-manage-system --public --source=. --remote=origin --push
```

## Lưu ý: file .env không được đẩy lên GitHub
File `.gitignore` đã loại trừ `.env` và `node_modules/` — đây là chuẩn thực hành tốt (không lộ cấu hình, không đẩy thư viện nặng).
