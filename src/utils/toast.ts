import Toast from 'react-native-toast-message';

export const showToast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
      visibilityTime: 2000,
      topOffset: 60,
      props: {
        style: {
          width: '90%',
          marginHorizontal: 20,
          borderWidth: 0.5,
          borderColor: '#52c41a',
          backgroundColor: '#ffffff',
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginTop: 10,
          borderRadius: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        },
        contentContainerStyle: {
          paddingHorizontal: 0,
        },
        text1Style: {
          fontSize: 13,
          fontWeight: '400',
          color: '#000000',
          textAlign: 'left',
        }
      }
    });
  },
  error: (message: string) => {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'top',
      visibilityTime: 2000,
      topOffset: 60,
      props: {
        style: {
          width: '90%',
          marginHorizontal: 20,
          borderWidth: 0.5,
          borderColor: '#ff4d4f',
          backgroundColor: '#ffffff',
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginTop: 10,
          borderRadius: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        },
        contentContainerStyle: {
          paddingHorizontal: 0,
        },
        text1Style: {
          fontSize: 13,
          fontWeight: '400',
          color: '#000000',
          textAlign: 'left',
        }
      }
    });
  },
  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      position: 'top',
      visibilityTime: 2000,
      topOffset: 60,
      props: {
        style: {
          width: '90%',
          marginHorizontal: 20,
          borderWidth: 0.5,
          borderColor: '#1890ff',
          backgroundColor: '#ffffff',
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginTop: 10,
          borderRadius: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        },
        contentContainerStyle: {
          paddingHorizontal: 0,
        },
        text1Style: {
          fontSize: 13,
          fontWeight: '400',
          color: '#000000',
          textAlign: 'left',
        }
      }
    });
  },
};
