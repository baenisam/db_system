import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTES } from '../constants';
import {Home, Cart, Notifications, Settings} from '../screens';
import { Icons } from '../constants/Icons';
import BottomTabs from './BottomTabs';
import themeContext from '../constants/themeContext';
import langContext from '../constants/langContext';
import CustomDrawer from '../components/CustomDrawer';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const COLORS = React.useContext(themeContext);
  const tr = React.useContext(langContext);
  return (
    <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown:false,
      drawerActiveBackgroundColor:'transparent',
      drawerActiveTintColor:COLORS.txtblack,
      drawerLabelStyle: {
        marginLeft:-25,
        fontFamily:'Poppins-Medium',
        color:COLORS.txtblack
      }
  }}>
      <Drawer.Screen 
      name={ROUTES.HOME_DRAWER} 
      component={BottomTabs} 
      options={{
        title:tr.home,
        drawerIcon:({focused,color,size}) => (
          <Icons.FontAwesome name="home" size={18} color={COLORS.txtblack}/>
        ),
      }}
      />
      <Drawer.Screen 
      name={ROUTES.SETTINGS}
      component={Settings}
      options={{
        title:tr.settings,
        drawerIcon:({focused,color,size}) => (
          <Icons.FontAwesome name="cog" size={18} color={COLORS.txtblack}/>
        ),
      }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator