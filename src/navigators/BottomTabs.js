import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Cart,
  Stock,
  Ventes,
  Operations,
  Notifications,
  Settings,
  Categories,
  Invoices,
} from '../screens';
import {ROUTES} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {cartTotalSelector} from '../redux/Selector';
import {GlobalContext} from '../services/context';
import themeContext from '../constants/themeContext';
import langContext from '../constants/langContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {Icons} from '../constants/Icons';
const Tab = createBottomTabNavigator();

function BottomTabs() {
  const COLORS = React.useContext(themeContext);
  const total = useSelector(cartTotalSelector);
  const {en} = React.useContext(GlobalContext);
  const tr = React.useContext(langContext);
  const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    //headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  const AutherTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    //headerStyleInterpolator: HeaderStyleInterpolators.forSlideRight,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  };
  return (
    <Tab.Navigator
      //initialRouteName={en !== null ? en.fonction == 'Default User' ? ROUTES.NOTIFICATIONS : ROUTES.HOME_TAB : ROUTES.HOME_TAB}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [{backgroundColor: COLORS.primary}, styles.tabBarStyle],
        //tabBarHideOnKeyboard:true,
        tabBarInactiveTintColor: '#8d8f8e',
        tabBarActiveTintColor: COLORS.white,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          let title;

          if (route.name === ROUTES.OPERATIONS) {
            iconName = focused ? 'th-list' : 'th-list';
            title = 'Opérations';
          } else if (route.name === ROUTES.STOCK) {
            iconName = focused ? 'shopping-bag' : 'shopping-bag';
            title = 'Stock';
          } else if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? 'home' : 'home';
            title = 'Accueil';
          } else if (route.name === ROUTES.VENTES) {
            title = 'Ventes';
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === ROUTES.SETTINGS) {
            title = 'Réglages';
            iconName = focused ? 'cog' : 'cog';
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            title = 'Ventes';
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === ROUTES.INVOICES) {
            title = tr.invoice;
            iconName = focused ? 'file-invoice' : 'file-invoice';
          }

          return (
            <View style={styles.button}>
              {route.name == ROUTES.INVOICES ? (
                <Icons.FontAwesome5 name={iconName} size={22} color={color} />
              ) : (
                <Icons.FontAwesome name={iconName} size={22} color={color} />
              )}

              <Text style={{color: color, ...styles.title}}>{title}</Text>
            </View>
          );
        },
      })}>
      {en && en.fonction == 'Default User' ? (
        <>
          <Tab.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
          <Tab.Screen name={ROUTES.INVOICES} component={Invoices} />
          <Tab.Screen name={ROUTES.SETTINGS} component={Settings} />
        </>
      ) : (
        <>
          <Tab.Screen name={ROUTES.HOME_TAB} component={Home} />
          <Tab.Screen
            options={{...AutherTransition}}
            name={ROUTES.STOCK}
            component={Stock}
          />
          <Tab.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
          <Tab.Screen name={ROUTES.INVOICES} component={Invoices} />
          <Tab.Screen name={ROUTES.OPERATIONS} component={Operations} />
        </>
      )}
    </Tab.Navigator>
  );
}

export default BottomTabs;

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
    zIndex: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -7,
  },
  title: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
