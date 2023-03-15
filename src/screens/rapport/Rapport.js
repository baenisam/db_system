import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ventes from './Ventes';
import Achat from './Achat';
import Depenses from './Depenses';
import imgs from '../../constants/imgs';
import { ROUTES } from '../../constants';
import { useDispatch, useSelector } from "react-redux";
import { cartTotalSelector } from '../../redux/Selector';
import themeContext from '../../constants/themeContext';
import langContext from '../../constants/langContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Icons } from '../../constants/Icons';
const Tab = createBottomTabNavigator();

function Rapport() {
  const COLORS = React.useContext(themeContext)
  const total = useSelector(cartTotalSelector);
  const tr = React.useContext(langContext)
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.NOTIFICATIONS}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{backgroundColor: COLORS.bottom},styles.tabBarStyle],
        //tabBarHideOnKeyboard:true,
        tabBarInactiveTintColor: '#777878',
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          let title;

          if (route.name === ROUTES.ACHAT) {
            iconName = focused ? imgs.purshase : imgs.purshase;
            title = 'Achats';
          }  else if (route.name === ROUTES.VENTES) {
            iconName = focused ? imgs.ventes : imgs.ventes;
            title = 'Ventes';
          }  else if (route.name === ROUTES.DEPENSES) {
            iconName = focused ? imgs.pie : imgs.pie;
            title = 'Dépenses';
          } 

          return (
            <View style={styles.button}>
              {route.name === ROUTES.CART_NAVIGATOR &&
                total ? (
                <View style={{backgroundColor: COLORS.primary, ...styles.icon}}>
                  <Text style={{color: COLORS.white,...styles.iconText}}>{total}</Text>
                </View>
              ) : null}
              <Image source={iconName} style={{
                width:20,
                height:20,
                resizeMode: 'contain',
                tintColor:color
              }}/>
              <Text style={{color: color, ...styles.title}}>{title}</Text>
            </View>
          );
        },
      })}>
      
      <Tab.Screen name={ROUTES.ACHAT} component={Achat} />
      <Tab.Screen name={ROUTES.VENTES} component={Ventes} />
      <Tab.Screen name={ROUTES.DEPENSES} component={Depenses} />
    </Tab.Navigator>
  );
}

export default Rapport;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    borderTopWidth: 0,
  },
  iconText: {
    fontSize: 8,
    
  },
  icon: {
    width: 15,
    height: 15,
    zIndex:10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -7,
  },
  title: {
    fontFamily: 'Poppins-Light',
    fontSize: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
