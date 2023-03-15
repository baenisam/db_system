import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {RNCamera} from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import {Icons} from '../../constants/Icons';
import themeContext from '../../constants/themeContext';
const {width, height} = Dimensions.get('window');
const QrScan = props => {
  const COLORS = React.useContext(themeContext);
  const [flash, setFlash] = React.useState(RNCamera.Constants.FlashMode.off)
  const maskRowHeight = Math.round((height - 200) / 20);
  const maskColWidth = (width - 200) / 2;
  const {navigation} = props;
  const [scanned, setScanned] = React.useState(false)
  const onBarCodeRead = data => {
    setScanned(true)
    console.log(data);
    alert(data);
    
  };

  const toggleFlash = () => {
   setFlash((current) => (
    current === RNCamera.Constants.FlashMode.off ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off
   ))
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <LinearGradient
        style={{width: width, height: 180}}
        colors={[COLORS.shape, 'transparent']}>
        <View
          style={{
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight : 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              width: width,
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons.Feather name="arrow-left" color={COLORS.txtWhite} size={20} />
            </TouchableOpacity>
            <Text style={{color:COLORS.txtWhite,...styles.title}}>Paiement</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 30,
              marginTop: 10,
            }}>
            <Text style={{color:COLORS.txtWhite,...styles.desc}}>
              Veuillez scanner la carte Tap & Pay du client pour effectuer le
              paiement
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.scrollViewStyle}>
        <React.Fragment>
          <RNCamera
            style={{flex: 1}}
            captureAudio={false}
            onBarCodeRead={scanned ? undefined : onBarCodeRead}
            type={RNCamera.Constants.Type.back}
            flashMode={flash}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'Camera is required for barcode scanning',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}>
            <View style={styles.maskOutter}>
              <View
                style={[
                  {flex: maskRowHeight},
                  styles.maskRow,
                  styles.maskFrame,
                ]}
              />
              <View style={[{flex: 30}, styles.maskCenter]}>
                <View style={[{width: maskColWidth}, styles.maskFrame]} />
                <View style={styles.maskInner} />
                <View style={[{width: maskColWidth}, styles.maskFrame]} />
              </View>
              <View
                style={[
                  {flex: maskRowHeight, width:width,justifyContent:'center', alignItems: 'center'},
                  styles.maskRow,
                  styles.maskFrame,
                ]}
              >
                <TouchableOpacity style={{
                    backgroundColor:flash ? '#d49d5f' : COLORS.txtWhite,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    width:60,
                    height:60
                }} onPress={toggleFlash}>
                    <Icons.Entypo name="flashlight" color={COLORS.black} size={30}/>
                </TouchableOpacity>
              </View>
            </View>
          </RNCamera>
        </React.Fragment>
      </View>
    </View>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: (width - 40) / 3,
  },
  desc: {
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    fontSize: 16,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 200,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {flexDirection: 'row'},
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2196f3',
  },
});
