import { StyleSheet, Text, View,Animated,Dimensions,TouchableOpacity,Pressable } from 'react-native'
import * as React from 'react'
import { Portal } from 'react-native-paper';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function BottomSheet({show, onDismiss, children,allowBgDismiss,height,color}) {
    const bottomSheetHeight = Dimensions.get('window').height * height;
    const deviceWidth = Dimensions.get('window').width;
    const [open, setopen] = React.useState(show);
    const bottom = React.useRef(new Animated.Value(-bottomSheetHeight)).current;

    const onGesture = (event) => {
        if(event.nativeEvent.translationY > 0){
            bottom.setValue(-event.nativeEvent.translationY)
        }
    }

    const onGestureEnd = (event) => {
        if(event.nativeEvent.translationY > bottomSheetHeight / 2){
            onDismiss()
        } else {
            bottom.setValue(0)
        }
    }
    React.useEffect(() => {
       if(show){
        setopen(show);
        Animated.timing(bottom, {
            toValue: 0,
            duration:500,
            useNativeDriver: false
        }).start()
       } else {
        Animated.timing(bottom, {
            toValue: -bottomSheetHeight,
            duration:500,
            useNativeDriver: false
        }).start(() => {
            setopen(false)
        })
       }
    }, [show]);

    if(!open){
        return null;
    }
  return (
    <Portal>
    <Pressable  style={styles.backDrop} onPress={allowBgDismiss ? onDismiss : undefined}/>
      <Animated.View style={{height:bottomSheetHeight,bottom:bottom,backgroundColor:color, ...styles.root}}>
        <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd} >
        <View style={{height:50}}>
        <View style={{
            position:'absolute',
            width:40,
            top:10,
            left:(deviceWidth - 40) /2,
            height:3,
            borderRadius:1.4,
            zIndex:10,
            backgroundColor:'#ccc'
        }}/>
        </View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    </Portal>
  )
}

const styles = StyleSheet.create({
    root:{
        position:'absolute',
        left:0,
        right:0,
        zIndex:100,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        shadowColor:'#000',
        shadowOffset:{
            height:-3,
            width:0
        },
        shadowOpacity:0.24,
        shadowRadius:4
    },
    backDrop:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'rgba(0,0,0,.4)',
        zIndex:80
    }
})