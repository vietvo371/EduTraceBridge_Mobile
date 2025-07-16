import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các file ngôn ngữ
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      home: 'Home',
      profile: 'Profile',
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      logout: 'Logout',
      error: {
        general: 'An error occurred',
        network: 'Network error',
        auth: 'Authentication error',
      },
      success: {
        login: 'Login successful',
        logout: 'Logout successful',
        save: 'Changes saved successfully',
      },
    },
  },
  vi: {
    translation: {
      welcome: 'Chào mừng',
      home: 'Trang chủ',
      profile: 'Hồ sơ',
      settings: 'Cài đặt',
      language: 'Ngôn ngữ',
      theme: 'Giao diện',
      logout: 'Đăng xuất',
      error: {
        general: 'Đã xảy ra lỗi',
        network: 'Lỗi kết nối',
        auth: 'Lỗi xác thực',
      },
      success: {
        login: 'Đăng nhập thành công',
        logout: 'Đăng xuất thành công',
        save: 'Lưu thay đổi thành công',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // ngôn ngữ mặc định
    fallbackLng: 'en', // ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 