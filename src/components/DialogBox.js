import { StyleSheet, Text, View,Modal,TouchableWithoutFeedback, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import themeContext from '../constants/themeContext'
import { BottomNavigation } from 'react-native-paper'
const {width, height} = Dimensions.get('window')
const DialogBox = ({visible,btnValide,btnDimiss,title,description,onValidate,onDismiss}) => {
    const COLORS = React.useContext(themeContext);
    return (
    <Modal animationType="fade" transparent={true} visible={visible}>
    <TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0, 0.2)',
          justifyContent:'center',
          alignItems:'center'
        }}>
        <View style={{backgroundColor:COLORS.touchable,...styles.modal}}>
            <Text style={{color:COLORS.txtblack,...styles.title}}>{title}</Text>
            <Text style={{color:COLORS.txtblack,...styles.desc}}>{description}</Text>
        
            <View style={styles.row}>
                <TouchableOpacity onPress={onDismiss} style={{backgroundColor:COLORS.shape,...styles.btn1}}>
                    <Text style={{color:COLORS.txtWhite,...styles.btn1Text}}>{btnDimiss}</Text>
                </TouchableOpacity>
                <View style={{width:10}}/>
                <TouchableOpacity onPress={onValidate} style={{borderColor:COLORS.shape,...styles.btn2}}>
                    <Text style={{color:COLORS.shape,...styles.btn2Text}}>{btnValide}</Text>
                </TouchableOpacity>
            </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  )
}

export default DialogBox

const styles = StyleSheet.create({
    modal: {
        width: width * .8,
        borderRadius:10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems:'center'
      },
      title:{
        fontSize:14,
        fontFamily:'Poppins-ExtraBold'
      },
      desc:{
        fontFamily:'Poppins-Light',
        fontSize:12,
        textAlign:'center'
      },
      row:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:10
      },
      btn1:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        width:((width * .8) - 50) * .5 
      },
      btn2:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        width:((width * .8) - 50) * .5 
      },
      btn1Text:{
        fontFamily:'Poppins-Medium',
        fontSize:14
      },
      btn2Text:{
        fontFamily:'Poppins-Medium',
        fontSize:14
      }
})