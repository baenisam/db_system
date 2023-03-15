import React, {useState, forwardRef} from 'react';
import {
  StatusBar,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Modal,
} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {Icons} from '../../constants/Icons';
import themeContext from '../../constants/themeContext';
import {GlobalContext} from '../../services/context';
import PopPupSuccess from '../../components/PopPupSuccess';
import {Button} from '../../components/Button';
import KeyboardAvoidingWrapper from '../../components/auth/KeyboardAvoidingWrapper';
import CodeInputField from '../../components/auth/CodeInputField';
import {ROUTES} from '../../constants';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function Otp({route, navigation}) {
  const Color = React.useContext(themeContext);
  const {email, phone} = route.params;
  const {isLoading, CheckCode, modal, successMessge, errorMessage, hideModal} =
    React.useContext(GlobalContext);
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setverifying] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [registerInfo, setregisterInfo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [modalError, showModalError] = useState(false);

  const MAX_CODE_LENGTH = 6;

  React.useEffect(() => {
    if (!verifying && pinReady) {
      Keyboard.dismiss();
      setDisabled(false);
      //CheckCode(code, email, setCode, showModalError);
    } else {
      setDisabled(true);
    }
  }, [verifying, pinReady]);

  React.useEffect(() => {
    if(route.params === undefined){
        navigation.navigate(ROUTES.LOGIN)
    }
  }, [])

  return (
    <>
      <KeyboardAvoidingWrapper
        onPress={() => {
          CheckCode(code, email);
        }}
        disabled={disabled}
        color={Color.background}
        colorHeader={Color.shape}
        colorText={Color.txtblack}
        isLoading={isLoading}>
        <View
          animation="fadeInDown"
          duration={2000}
          style={{
            paddingHorizontal: 25,
            backgroundColor: Color.background,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 10,
              paddingHorizontal: 0,
            }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: Color.txtblack,
                fontFamily: 'Poppins-Regular',
              }}>
              Un code de validation vous a été envoyé à l'adresse {email}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: Color.txtblack,
                fontFamily: 'Poppins-Regular',
              }}>
              entrez-le ici pour continuer
            </Text>
            <CodeInputField
              color={Color.txtblack}
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxLength={MAX_CODE_LENGTH}
            />
          </View>
          <PopPupSuccess
            visible={modal}
            icon={
              errorMessage ? 'error' : successMessge ? 'check-circle' : 'error'
            }
            color={errorMessage ? 'red' : successMessge ? 'green' : ''}
            description={
              errorMessage ? errorMessage : successMessge ? successMessge : ''
            }
            button="D'ACCORD"
            onPress={() => hideModal(errorMessage ? '' : ROUTES.LOGIN)}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </>
  );
}
