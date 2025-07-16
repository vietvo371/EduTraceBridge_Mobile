# CoreLayoutApp 📱

Ứng dụng React Native với cấu trúc hiện đại, được tối ưu hóa cho cả iOS và Android. Dự án này sử dụng các công nghệ và thư viện mới nhất để tạo ra một ứng dụng di động chất lượng cao.

## ✨ Tính năng

- 🎨 Giao diện người dùng hiện đại và responsive
- 🌍 Hỗ trợ đa ngôn ngữ (i18n)
- 🔐 Quản lý state với Redux Toolkit
- 📱 Navigation system hoàn chỉnh
- 🎯 TypeScript để type-safe
- 🔄 API integration với Axios
- 💅 Theme system linh hoạt

## 🛠 Công nghệ sử dụng

- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- i18next
- Axios
- React Native Vector Icons
- React Native Gesture Handler
- React Native Screens
- React Native Safe Area Context

## 📦 Cài đặt

1. Clone repository:
```bash
git clone [repository-url]
cd CoreLayoutApp
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cài đặt iOS dependencies:
```bash
cd ios
pod install
cd ..
```

## 🚀 Chạy ứng dụng

### iOS
```bash
npx react-native run-ios
```

### Android
```bash
npx react-native run-android
```

## 📁 Cấu trúc thư mục

```
src/
├── components/         # Các components có thể tái sử dụng
│   ├── Header/        # Component Header
│   ├── Footer/        # Component Footer
│   └── Card/          # Component Card
├── screens/           # Các màn hình của ứng dụng
├── navigation/        # Cấu hình navigation
├── services/         # Các service gọi API
├── utils/            # Các hàm tiện ích
├── styles/           # Styles và theme chung
├── assets/           # Resources (hình ảnh, fonts,...)
└── hooks/            # Custom hooks
```

## 🔧 Cấu hình

### Navigation

Ứng dụng sử dụng React Navigation với cấu trúc:
- Stack Navigator cho điều hướng chính
- Tab Navigator cho menu chính
- Hỗ trợ gesture navigation

### State Management

Redux được cấu hình với các slices:
- Auth slice: Quản lý authentication
- UI slice: Quản lý theme và UI states

### API Integration

Axios được cấu hình với:
- Base URL configuration
- Interceptors cho request/response
- Error handling
- Authentication headers

### Internationalization

i18n được cấu hình với:
- Hỗ trợ tiếng Việt và tiếng Anh
- Tự động phát hiện ngôn ngữ
- Dễ dàng thêm ngôn ngữ mới

## 🎨 Theme System

Theme system bao gồm:
- Màu sắc
- Typography
- Spacing
- Border radius
- Shadow styles

## 📱 Components

### Header
- Menu button
- Title
- Search button
- Safe area support

### Footer
- Tab navigation
- Icon support
- Badge support

### Card
- Title
- Content
- Shadow effect
- Border radius

## 🔐 Authentication

- JWT authentication
- Secure storage
- Auto refresh token
- Logout handling

## 📦 API Services

- REST API integration
- Error handling
- Loading states
- Cache management

## 🛠 Development

### Scripts

```bash
# Chạy tests
npm test

# Kiểm tra lint
npm run lint

# Build cho production
npm run build

# Chạy storybook
npm run storybook
```

### Environment Variables

Tạo file .env trong thư mục gốc:
```
API_URL=your_api_url
API_KEY=your_api_key
```

## 📝 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Đóng góp

Mọi đóng góp đều được chào đón! Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết.

## 📫 Liên hệ

- Website: [your-website]
- Email: [your-email]
- Twitter: [@your-twitter]

## 🙏 Cảm ơn

Cảm ơn các thư viện open source đã được sử dụng trong dự án này.
