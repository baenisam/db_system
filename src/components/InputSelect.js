import * as React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Icons} from '../constants/Icons';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const InputSelect = React.forwardRef(
  (
    {
      icon,
      error,
      isPassword,
      amStyle,
      touched,
      color,
      value,
      onValueChange,
      placeholder,
      items,
      onFocus = () => {},
      ...otherProps
    },
    ref,
  ) => {
    const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : color;
    return (
      <>
        <View
          style={{
            borderWidth: error ? 1 : 0,
            borderColor: error ? 'red' : color,
            ...styles.action2,
            ...amStyle,
          }}>
          <View style={{flex: 1}}>
            <RNPickerSelect
              onDonePress={() => {
                onFocus();
              }}
              onDownArrow={() => {
                onFocus();
              }}
              onOpen={() => {
                onFocus();
              }}
              
              placeholder={{label: placeholder, value: ''}}
              onValueChange={onValueChange}
              items={items}
              value={value}
              style={{color: color, ...styles.textInput1}}
            />
          </View>
        </View>
        {error && (
          <View>
            <Text style={{fontFamily: 'font2', fontSize: 10, color: 'red'}}>
              {error}
            </Text>
          </View>
        )}
      </>
    );
  },
);

export default InputSelect;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: 'flex-end',
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontFamily: 'font11',
  },

  bouton: {
    width: 400,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#e3a220',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action1: {
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  action2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  textInput1: {
    flex: 1,
    marginLeft: 0,
    fontFamily: 'font2',
    fontSize: 15,
  },
});
