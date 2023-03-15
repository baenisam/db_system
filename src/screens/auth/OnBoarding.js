import React from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Color from '../../constants/colors';
import themeContext from '../../constants/themeContext';
import Slides from '../../constants/Slides';
import { ROUTES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('window');

const Slide = ({item}) => {
  const COLORS = React.useContext(themeContext);
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          width: width,
          paddingHorizontal: 30,
        }}>
        <Animatable.View animation="fadeInRight" duration={1000}>
          <Image
            source={item.image}
            style={{width: width * 0.9, height: width * 0.9}}
          />
        </Animatable.View>

        <Animatable.Text
          duration={1000}
          animation="slideInDown" 
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: COLORS.txtblack,
          }}>
          {item.title}
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInRight"
          duration={1000}
          style={{
            fontFamily: 'Poppins-Light',
            fontSize: 14,
            color: COLORS.txtblack,
            marginTop: 10,
            textAlign: 'center',
          }}>
          {item.description}
        </Animatable.Text>
      </View>
    </>
  );
};
export default function OnBoarding({route, navigation}) {
  const COLORS = React.useContext(themeContext);
  const ref = React.useRef(null);
  const [currentSldeIndex, setCurrentSldeIndex] = React.useState(0);
  const goNextSlide = () => {
    const NextSlide = currentSldeIndex + 1;

    if (NextSlide != Slides.length) {
      const offset = NextSlide * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSldeIndex(NextSlide);
    }
  };

  const demarrer = async () => {
    try {
      const data = {
        key: 1,
      };
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('welcome', jsonValue);
      navigation.navigate(ROUTES.WELCOME);
    } catch (e) {
      console.log(e);
    }
  };
  const Skip = () => {
    const lastSlideIndex = Slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentSldeIndex(lastSlideIndex);
  };
  const Footer = () => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
          justifyContent: 'center',
          backgroundColor: COLORS.shape,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {currentSldeIndex == Slides.length - 1 ? (
            <>
              <TouchableOpacity
                onPress={goPrevSlide}
                style={{
                  width: (width - 40) / 3,
                  ...styles.btn,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  Prev
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={Skip}
                style={{
                  width: (width - 40) / 3,
                  ...styles.btn,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
            </>
          )}
          <>
            <View style={{flexDirection: 'row'}}>
              {Slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {backgroundColor: '#bababa'},
                    currentSldeIndex == index && {
                      backgroundColor: COLORS.white,
                      width: 30,
                    },
                  ]}
                />
              ))}
            </View>
            {currentSldeIndex == Slides.length - 1 ? (
              <TouchableOpacity
                onPress={demarrer}
                style={{
                  width:(width - 40) /3,
                  ...styles.btn1}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  Get started
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={goNextSlide}
                style={{width:(width - 40) /3, ...styles.btn1}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </>
        </View>
      </View>
    );
  };
  const updateCurrentIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSldeIndex(currentIndex);
  };

  const goPrevSlide = () => {
    const PrevSlide = currentSldeIndex - 1;

    if (PrevSlide != Slides.length) {
      const offset = PrevSlide * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSldeIndex(PrevSlide);
    }
  };
  return (
    <View style={{backgroundColor: COLORS.background, flex: 1}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <FlatList
        data={Slides}
        ref={ref}
        onMomentumScrollEnd={updateCurrentIndex}
        pagingEnabled
        contentContainerStyle={{
          height: '100%',
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    width: 8,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  btn: {
    justifyContent: 'center',
    alignItems:'flex-start',
  },
  btn1: {
    justifyContent: 'center',
    alignItems:'flex-end',
  },
});
