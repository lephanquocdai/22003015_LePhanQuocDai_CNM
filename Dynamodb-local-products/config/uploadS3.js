const multer = require('multer');

// Chuyển sang dùng memoryStorage thay cho multer-s3 do lỗi phiên bản SDK v2 và v3 ko tương thích
const upload = multer({
    storage: multer.memoryStorage(),
});

module.exports = upload;