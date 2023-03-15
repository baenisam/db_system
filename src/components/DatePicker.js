import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';
import {Icons} from '../constants/Icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DatePicker = props => {
  const {defaultDate, onDateChange, color, customStyle} = props;

  const [date, setDate] = useState(moment(defaultDate).format('YYYY-MM-DD'));
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
  };

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate).format('YYYY-MM-DD'));
    }
  };

  const onCancelPress = () => {
    setDate(moment(date).format('YYYY-MM-DD'));
    setShow(false);
  };
  const onDonePress = () => {
    onDateChange(date);
    console.log(date)
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <>
        <DateTimePicker
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          timeZoneOffsetInMinutes={0}
          value={new Date(date)}
          mode="date"
          minimumDate={new Date(1920, 10, 20)}
          maximumDate={new Date()}
          onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
        />
      </>
    );
  };

  return (
    <View style={{borderColor:color,...styles.box, ...customStyle}}>
      <Pressable
        onPress={() => setShow(true)}
        activeOpacity={0}>
            <Icons.AntDesign name="calendar" color={color} size={20}/>
        </Pressable>
      <View>
        <Text style={{color:color, ...styles.txt}}>{`${date}`}</Text>
        {Platform.OS !== 'ios' && show && renderDatePicker()}

        {Platform.OS === 'ios' && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientations={['portrait']}
            onRequestClose={() => setShow(!show)}>
            <View style={styles.screen}>
              <TouchableHighlight
                underlayColor={'#FFF'}
                style={styles.pickerContainer}>
                <View style={{backgroundColor: '#fff'}}>
                  <View style={{marginTop: 20}}>{renderDatePicker()}</View>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={onCancelPress}
                    style={[styles.btnText, styles.btnCancel]}>
                    <Text style={{fontSize: 18}}>キャンセル</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={onDonePress}
                    style={[styles.btnText, styles.btnDone]}>
                    <Text>完了</Text>
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 0,
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal:10,
    paddingVertical:5,
    borderWidth:1,
    borderRadius:0,
    alignItems:'center'
  },
  txt: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  screen: {
    flex: 1,
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
  textDate: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
