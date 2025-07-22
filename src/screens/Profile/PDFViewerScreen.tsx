import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewerScreen = ({ route }: any) => {
  const { filePath } = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{ uri: filePath }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default PDFViewerScreen; 