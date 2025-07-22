import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header/Header';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const stats = [
    { icon: 'school', label: 'Chứng chỉ', value: '2', onPress: () => navigation.navigate('Certificates' as never) },
    { icon: 'work', label: 'Việc làm', value: '5', onPress: () => navigation.navigate('Jobs' as never) },
    { icon: 'menu-book', label: 'Khoá học', value: '3', onPress: () => navigation.navigate('Learning' as never) },
  ];

  const recentActivities = [
    {
      icon: 'verified',
      text: 'Nhận chứng chỉ Blockchain Basic',
      time: '2 giờ trước',
      onPress: () => navigation.navigate('Certificates' as never)
    },
    {
      icon: 'work',
      text: 'Ứng tuyển vị trí Frontend Developer',
      time: '1 ngày trước',
      onPress: () => navigation.navigate('Jobs' as never)
    },
    {
      icon: 'menu-book',
      text: 'Hoàn thành khoá học React Native',
      time: '2 ngày trước',
      onPress: () => navigation.navigate('Learning' as never)
    }
  ];

  const handleNotificationPress = () => {
    navigation.navigate('Notification' as never);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <View style={styles.container}>
      <Header onNotificationPress={handleNotificationPress} />
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Token Balance Section */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Số dư token</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              <Icon 
                name={isBalanceVisible ? 'visibility' : 'visibility-off'} 
                size={24} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.balanceWrapper}>
            <Text style={styles.balanceAmount}>
              {isBalanceVisible ? '1,234.56' : '•••••'}
            </Text>
            <Text style={styles.tokenSymbol}>DZT</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.statItem}
              onPress={item.onPress}
            >
              <View style={styles.statIconContainer}>
                <Icon name={item.icon} size={24} color="#7F3DFF" />
              </View>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
          <View style={styles.activityList}>
            {recentActivities.map((activity, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.activityItem}
                onPress={activity.onPress}
              >
                <View style={styles.activityIconContainer}>
                  <Icon name={activity.icon} size={20} color="#7F3DFF" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#666666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp('2%'),
  },
  balanceContainer: {
    backgroundColor: '#7F3DFF',
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: wp('4%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  balanceLabel: {
    fontSize: wp('3.5%'),
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: wp('2%'),
  },
  tokenSymbol: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: wp('4%'),
    justifyContent: 'space-around',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    alignItems: 'center',
    width: wp('25%'),
  },
  statIconContainer: {
    width: wp('12%'),
    height: wp('12%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  statValue: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginVertical: hp('0.5%'),
  },
  statLabel: {
    fontSize: wp('3.5%'),
    color: '#666666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: wp('4%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: hp('3%'),
  },
  activityList: {
    gap: hp('2%'),
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    backgroundColor: 'rgba(127, 61, 255, 0.03)',
    padding: wp('3%'),
    borderRadius: wp('2%'),
  },
  activityIconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: 'rgba(127, 61, 255, 0.1)',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: wp('3.5%'),
    color: '#2D2D2D',
    marginBottom: hp('0.5%'),
    fontWeight: '500',
  },
  activityTime: {
    fontSize: wp('3%'),
    color: '#666666',
  },
});

export default HomeScreen;