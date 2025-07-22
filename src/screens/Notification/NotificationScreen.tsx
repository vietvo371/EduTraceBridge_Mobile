import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';

const NotificationScreen = ({ navigation }: any) => {
  const notifications = [
    {
      id: 1,
      type: 'certificate',
      icon: 'verified',
      title: 'Chứng chỉ mới',
      message: 'Chúc mừng! Bạn đã nhận được chứng chỉ Blockchain Basic',
      time: '2 giờ trước',
      isRead: false,
    },
    {
      id: 2,
      type: 'job',
      icon: 'work',
      title: 'Phản hồi ứng tuyển',
      message: 'FPT Software đã xem hồ sơ ứng tuyển của bạn',
      time: '1 ngày trước',
      isRead: true,
    },
    {
      id: 3,
      type: 'course',
      icon: 'menu-book',
      title: 'Khoá học mới',
      message: 'Khoá học React Native Advanced đã được mở',
      time: '2 ngày trước',
      isRead: false,
    },
    {
      id: 4,
      type: 'system',
      icon: 'system-update',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống đã được cập nhật lên phiên bản mới',
      time: '3 ngày trước',
      isRead: true,
    },
    {
      id: 5,
      type: 'token',
      icon: 'token',
      title: 'Nhận token',
      message: 'Bạn đã nhận được 50 DZT từ việc hoàn thành khoá học',
      time: '4 ngày trước',
      isRead: true,
    }
  ];

  const getBackgroundColor = (isRead: boolean) => {
    return isRead ? '#FFFFFF' : 'rgba(127, 61, 255, 0.05)';
  };

  const handleNotificationPress = (notification: any) => {
    // Handle navigation based on notification type
    switch (notification.type) {
      case 'certificate':
        navigation.navigate('Certificates');
        break;
      case 'job':
        navigation.navigate('Jobs');
        break;
      case 'course':
        navigation.navigate('Learning');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity>
          <Icon name="done-all" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              { backgroundColor: getBackgroundColor(notification.isRead) }
            ]}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={styles.notificationIcon}>
              <Icon name={notification.icon} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingTop: Platform.OS === 'ios' ? hp('6%') : hp('2%'),
    paddingBottom: hp('2%'),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: wp('4%'),
  },
  notificationItem: {
    flexDirection: 'row',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  notificationIcon: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  notificationTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.text,
  },
  notificationTime: {
    fontSize: wp('3%'),
    color: '#666666',
  },
  notificationMessage: {
    fontSize: wp('3.5%'),
    color: '#666666',
    lineHeight: hp('2.5%'),
  },
  unreadDot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: wp('4%'),
    right: wp('4%'),
  },
});

export default NotificationScreen; 