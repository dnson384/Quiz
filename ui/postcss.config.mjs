// postcss.config.mjs

const config = {
  plugins: {
    // Đây là cú pháp plugin mà bạn đã phát hiện ra là hoạt động
    "@tailwindcss/postcss": {},
    // Thêm autoprefixer nếu cần
    autoprefixer: {},
  },
};

// PHẢI DÙNG cú pháp ES Module export vì file là .mjs
export default config;
