import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const CertificateCard: React.FC<any> = ({
  certificate,
  onShare,
  onView,
}) => {
  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return '#4CAF50'; // Verified
      case 2:
        return '#FFC107'; // Pending
      default:
        return '#F44336'; // Not verified
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'Đã xác minh';
      case 2:
        return 'Đang xử lý';
      default:
        return 'Chưa xác minh';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onView(certificate)}
    >
      <Image 
        source={certificate.certificate_url 
          ? { uri: certificate.certificate_url } 
          : require('../../assets/images/logo.png')} 
        style={styles.certificateImage}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title} numberOfLines={2}>
              {certificate.title}
            </Text>
            <Text style={styles.issuer}>
              <Icon name="business" size={14} color={COLORS.gray} />
              {' '}{certificate.issuer.full_name}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => onShare(certificate)}
          >
            <Icon name="share" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Icon name="event" size={14} color={COLORS.gray} />
            <Text style={styles.detailText}>
              Cấp ngày: {new Date(certificate.issue_date).toLocaleDateString('vi-VN')}
            </Text>
          </View>
          {certificate.expiry_date && (
            <View style={styles.detailRow}>
              <Icon name="update" size={14} color={COLORS.gray} />
              <Text style={styles.detailText}>
                Hết hạn: {new Date(certificate.expiry_date).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(certificate.status) + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(certificate.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(certificate.status) }]}>
              {getStatusText(certificate.status)}
            </Text>
          </View>
          {certificate.blockchain_hash && (
            <View style={styles.verifiedBadge}>
              <Icon name="verified" size={16} color={COLORS.primary} />
              <Text style={styles.verifiedText}>Blockchain</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  certificateImage: {
    width: '100%',
    height: hp('15%'),
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    marginRight: wp('3%'),
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: hp('0.5%'),
  },
  issuer: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginBottom: hp('1%'),
  },
  shareButton: {
    padding: wp('2%'),
  },
  details: {
    marginVertical: hp('1%'),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  detailText: {
    fontSize: wp('3.5%'),
    color: COLORS.gray,
    marginLeft: wp('1%'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('4%'),
  },
  statusDot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginRight: wp('1%'),
  },
  statusText: {
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },
  verifiedText: {
    fontSize: wp('3%'),
    color: COLORS.primary,
    marginLeft: wp('1%'),
    fontWeight: '500',
  },
});

export default CertificateCard;