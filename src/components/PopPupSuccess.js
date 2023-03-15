import { StyleSheet, Text, View,Modal,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import themeContext from '../constants/themeContext';
import { Icons } from '../constants/Icons';
const {width, height} = Dimensions.get('window')
const PopPupSuccess = ({visible, onPress, icon,button,description,color}) => {
    const COLORS = React.useContext(themeContext);
  return (
 <Modal animationType="fade" transparent={true} visible={visible}>
       <View  style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0, 0.2)',
          justifyContent:'center',
          alignItems:'center'
        }}>
        <View style={{
            width: width * .8,
            borderRadius:10,
            paddingTop: 20,
            alignItems:'center',
            backgroundColor:COLORS.touchable
        }}>
            <Icons.MaterialIcons name={icon} color={color} size={80}/>
            <View style={{
                padding:30,
                justifyContent:'center'
            }}>
                <Text style={{
                    fontFamily:'Poppins-Regular',
                    textAlign:'center',
                    color:COLORS.txtblack
                }}>{description}</Text>
            </View>
            <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{
                width:'100%',
                backgroundColor:color,
                padding:10,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10
            }}>
                <Text style={{
                    fontFamily:'Poppins-Medium',
                    color:COLORS.white,
                    fontSize:16
                }}>{button}</Text>
            </TouchableOpacity>

        </View>
      </View>
 </Modal>
  )
}

export default PopPupSuccess

const styles = StyleSheet.create({})