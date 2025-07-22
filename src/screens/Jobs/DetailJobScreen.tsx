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
    Alert,
} from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../styles/theme';

const DetailJobScreen = ({ route, navigation }: any) => {
    const { job } = route.params;
    const [selectedTab, setSelectedTab] = useState('overview');
    const [isApplyVisible, setIsApplyVisible] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [selectedCV, setSelectedCV] = useState<any>(null);

    const handleSelectCV = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [types.pdf],
                allowMultiSelection: false,
            });

            if (result && result.length > 0) {
                const file = result[0];
                if (file.size && file.size > 5 * 1024 * 1024) { // 5MB limit
                    Alert.alert('Error', 'Kích thước file phải nhỏ hơn 5MB');
                    return;
                }
                setSelectedCV(file);
            }
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                Alert.alert('Error', 'Chọn CV thất bại. Vui lòng thử lại.');
            }
        }
    };

    const handleApply = async () => {
        if (!selectedCV) {
            Alert.alert('Error', 'Vui lòng chọn CV của bạn');
            return;
        }

        setIsApplying(true);
        try {
            // TODO: Implement API call to submit CV
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            Alert.alert('Success', 'CV của bạn đã được gửi thành công');
            setIsApplyVisible(false);
            setSelectedCV(null);
        } catch (error) {
            Alert.alert('Error', 'Gửi CV thất bại. Vui lòng thử lại.');
        } finally {
            setIsApplying(false);
        }
    };

    const renderApplyModal = () => (
        <Modal
            visible={isApplyVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setIsApplyVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Apply for {job.title}</Text>
                    <Text style={styles.modalSubtitle}>{job.company}</Text>

                    <TouchableOpacity 
                        style={styles.selectCVButton}
                        onPress={handleSelectCV}
                    >
                        <Icon name="file-upload" size={24} color={COLORS.primary} />
                        <Text style={styles.selectCVText}>
                            {selectedCV ? 'Change CV' : 'Select CV'}
                        </Text>
                    </TouchableOpacity>

                    {selectedCV && (
                        <View style={styles.selectedFileContainer}>
                            <Icon name="description" size={20} color={COLORS.primary} />
                            <Text style={styles.selectedFileName} numberOfLines={1}>
                                {selectedCV.name}
                            </Text>
                        </View>
                    )}

                    <View style={styles.modalButtons}>
                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={() => setIsApplyVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.applyButton, !selectedCV && styles.disabledButton]}
                            onPress={handleApply}
                            disabled={!selectedCV || isApplying}
                        >
                            {isApplying ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.applyButtonText}>Submit Application</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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

            {renderApplyModal()}

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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: wp('5%'),
        padding: wp('5%'),
        width: wp('90%'),
        maxHeight: hp('80%'),
    },
    modalTitle: {
        fontSize: wp('5%'),
        fontWeight: '600',
        color: '#2D2D2D',
        marginBottom: hp('1%'),
    },
    modalSubtitle: {
        fontSize: wp('4%'),
        color: '#666666',
        marginBottom: hp('3%'),
    },
    selectCVButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderRadius: wp('2%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
    },
    selectCVText: {
        marginLeft: wp('2%'),
        fontSize: wp('4%'),
        color: COLORS.primary,
        fontWeight: '500',
    },
    selectedFileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(127, 61, 255, 0.1)',
        padding: wp('3%'),
        borderRadius: wp('2%'),
        marginBottom: hp('3%'),
    },
    selectedFileName: {
        marginLeft: wp('2%'),
        fontSize: wp('3.5%'),
        color: '#2D2D2D',
        flex: 1,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: wp('3%'),
    },
    cancelButton: {
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        borderRadius: wp('2%'),
        backgroundColor: '#F0F0F0',
    },
    cancelButtonText: {
        fontSize: wp('3.5%'),
        color: '#666666',
        fontWeight: '500',
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default DetailJobScreen;
