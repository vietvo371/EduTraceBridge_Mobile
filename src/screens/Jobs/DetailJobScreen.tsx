import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    StatusBar,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';

const DetailJobScreen = ({ route, navigation }: any) => {
    const { job } = route.params;
    const [selectedTab, setSelectedTab] = useState('overview');
    const [isApplyVisible, setIsApplyVisible] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    const handleApplyJob = async () => {
        setIsApplying(true);
        setTimeout(() => {
            setIsApplying(false);
            setIsApplyVisible(false);
        }, 2000);
    };

    const ApplyModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isApplyVisible}
            onRequestClose={() => setIsApplyVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Xác nhận ứng tuyển</Text>
                        <TouchableOpacity
                            onPress={() => setIsApplyVisible(false)}
                            style={styles.closeButton}
                        >
                            <Icon name="close" size={24} color="#666666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.jobInfo}>
                        <Text style={styles.modalJobTitle}>{job.title}</Text>
                        <View style={styles.companyRow}>
                            <Text style={styles.modalLabel}>Công ty:</Text>
                            <Text style={styles.modalCompany}>{job.company}</Text>
                        </View>
                        <View style={styles.salaryRow}>
                            <Text style={styles.modalLabel}>Lương:</Text>
                            <Text style={styles.modalSalary}>{job.salary}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleApplyJob}
                        disabled={isApplying}
                    >
                        {isApplying ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.confirmButtonText}>Xác nhận ứng tuyển</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back-ios" size={24} color="#2D2D2D" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton}>
                        <Icon name="bookmark-outline" size={24} color="#2D2D2D" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.jobHeader}>
                        <Text style={styles.jobTitle}>{job.title}</Text>
                        <Text style={styles.companyName}>{job.company}</Text>
                        
                        <View style={styles.stats}>
                            <View style={styles.statItem}>
                                <Icon name="location-on" size={20} color={COLORS.primary} />
                                <Text style={styles.statText}>{job.location}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Icon name="work" size={20} color={COLORS.primary} />
                                <Text style={styles.statText}>{job.type}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Icon name="access-time" size={20} color={COLORS.primary} />
                                <Text style={styles.statText}>{job.posted}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
                            onPress={() => setSelectedTab('overview')}
                        >
                            <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
                                Tổng quan
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === 'requirements' && styles.activeTab]}
                            onPress={() => setSelectedTab('requirements')}
                        >
                            <Text style={[styles.tabText, selectedTab === 'requirements' && styles.activeTabText]}>
                                Yêu cầu
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {selectedTab === 'overview' ? (
                        <View style={styles.overviewContent}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Chi tiết công việc</Text>
                                <View style={styles.jobDetailsList}>
                                    <View style={styles.jobDetailItem}>
                                        <Icon name="business" size={20} color={COLORS.primary} />
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>Công ty</Text>
                                            <Text style={styles.detailText}>{job.company}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jobDetailItem}>
                                        <Icon name="location-on" size={20} color={COLORS.primary} />
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>Địa điểm</Text>
                                            <Text style={styles.detailText}>{job.location}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jobDetailItem}>
                                        <Icon name="work" size={20} color={COLORS.primary} />
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>Loại công việc</Text>
                                            <Text style={styles.detailText}>{job.type}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jobDetailItem}>
                                        <Icon name="access-time" size={20} color={COLORS.primary} />
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailLabel}>Đăng tuyển</Text>
                                            <Text style={styles.detailText}>{job.posted}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.requirementsContent}>
                            {job.requirements.map((item: string, index: number) => (
                                <View key={index} style={styles.requirementItem}>
                                    <Icon name="check-circle" size={20} color={COLORS.primary} />
                                    <Text style={styles.requirementText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>

                <ApplyModal />

                <View style={styles.footer}>
                    <View style={styles.salaryContainer}>
                        <Text style={styles.salary}>{job.salary}</Text>
                        <Text style={styles.period}>/tháng</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.applyButton}
                        activeOpacity={0.8}
                        onPress={() => setIsApplyVisible(true)}
                    >
                        <Text style={styles.applyButtonText}>Ứng tuyển ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp('2%'),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        height: Platform.OS === 'ios' ? hp('7%') : hp('8%'),
    },
    backButton: {
        padding: wp('2%'),
    },
    saveButton: {
        padding: wp('2%'),
    },
    content: {
        flex: 1,
    },
    jobHeader: {
        padding: wp('5%'),
        backgroundColor: '#FFFFFF',
        borderRadius: wp('3%'),
        margin: wp('3%'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    jobTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: '#2D2D2D',
        marginBottom: hp('1%'),
    },
    companyName: {
        fontSize: wp('4%'),
        color: '#666666',
        marginBottom: hp('2%'),
    },
    stats: {
        flexDirection: 'row',
        gap: wp('4%'),
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('1%'),
    },
    statText: {
        fontSize: wp('3.5%'),
        color: '#666666',
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: wp('5%'),
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    tab: {
        paddingVertical: hp('2%'),
        marginRight: wp('4%'),
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        fontSize: wp('4%'),
        color: '#666666',
    },
    activeTabText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    section: {
        marginBottom: hp('3%'),
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '600',
        color: '#2D2D2D',
        marginBottom: hp('2%'),
    },
    description: {
        fontSize: wp('3.8%'),
        color: '#666666',
        lineHeight: wp('5.5%'),
    },
    overviewContent: {
        padding: wp('5%'),
    },
    jobDetailsList: {
        gap: hp('2%'),
    },
    jobDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'),
        backgroundColor: '#FFFFFF',
        padding: wp('3%'),
        borderRadius: wp('2%'),
        borderWidth: 1,
        borderColor: 'rgba(127, 61, 255, 0.1)',
    },
    detailTextContainer: {
        flex: 1,
    },
    detailLabel: {
        fontSize: wp('3.5%'),
        color: '#666666',
        marginBottom: hp('0.5%'),
    },
    detailText: {
        fontSize: wp('3.8%'),
        color: '#2D2D2D',
        fontWeight: '500',
    },
    requirementsContent: {
        padding: wp('5%'),
        gap: hp('2%'),
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'),
        backgroundColor: '#FFFFFF',
        padding: wp('3%'),
        borderRadius: wp('2%'),
        borderWidth: 1,
        borderColor: 'rgba(127, 61, 255, 0.1)',
    },
    requirementText: {
        fontSize: wp('3.8%'),
        color: '#666666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp('5%'),
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    salaryContainer: {
        flex: 1,
    },
    salary: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    period: {
        fontSize: wp('3.5%'),
        color: '#666666',
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('1.8%'),
        borderRadius: wp('3%'),
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontSize: wp('4%'),
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
        padding: wp('5%'),
        minHeight: hp('40%'),
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    modalTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#2D2D2D',
    },
    closeButton: {
        padding: wp('2%'),
    },
    jobInfo: {
        backgroundColor: '#F8F8FA',
        padding: wp('4%'),
        borderRadius: wp('3%'),
        marginBottom: hp('3%'),
    },
    modalJobTitle: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#2D2D2D',
        marginBottom: hp('2%'),
    },
    companyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    salaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalLabel: {
        fontSize: wp('3.8%'),
        color: '#666666',
    },
    modalCompany: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: '#2D2D2D',
    },
    modalSalary: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: hp('2%'),
        borderRadius: wp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: wp('4%'),
        fontWeight: '600',
    },
});

export default DetailJobScreen;
