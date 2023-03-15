import React from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {
  Login,
  Register,
  ForgotPassword,
  Token,
  Cart,
  SetLangue,
  OnBoarding,
  QrScan,
  AddEntreprise,
  ChooseEnt,
  Stock,
  ProductList,
  ListEntreprise,
  Welcome,
  InvoiceDetail,
  OperationDetail,
  Rapport,
  Settings,
  AddUser,
  ListUser,
  Otp,
  CategorieDetails,
  ProductDetail,
  Socket,
  AppLoading,
} from '../screens';
import {ROUTES} from '../constants';
import DrawerNavigator from './DrawerNavigator';
import themeContext from '../constants/themeContext';
import lang from '../constants/lang';
import langContext from '../constants/langContext';
import {GlobalContext} from '../services/context';
import theme from '../constants/theme';
const Stack = createStackNavigator();

function AuthNavigator() {
  const {mode, lg, userData, token, splashloading, en, isLoading} =
    React.useContext(GlobalContext);

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
    <langContext.Provider
      value={lg === 'en' ? lang.en : lg === 'ks' ? lang.ks : lang.fr}>
      <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <Stack.Navigator
          initialRouteName={'AppLoading'}
          screenOptions={{
            headerShown: false,
            animationTypeForReplace: 'push',
            animationEnabled: true,
          }}>
          {splashloading ? (
            <Stack.Screen
              options={{...MyTransition}}
              name="AppLoading"
              component={AppLoading}
            />
          ) : !token ? (
            <>
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.LANGUE}
                component={SetLangue}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.ONBOARDING}
                component={OnBoarding}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.WELCOME}
                component={Welcome}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.TOKEN}
                component={Token}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.LOGIN}
                component={Login}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.REGISTER}
                component={Register}
              />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.OTP}
                component={Otp}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.FORGOT_PASSWORD}
                component={ForgotPassword}
              />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.ADD_ENTREPRISE}
                component={AddEntreprise}
              />
            </>
          ) : !en ? (
            <>
              <Stack.Screen name={ROUTES.SHOOSE} component={ChooseEnt} />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.ADD_ENTREPRISE}
                component={AddEntreprise}
              />
            </>
          ) : (
            <>
              <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.CART}
                component={Cart}
              />
              <Stack.Screen name={ROUTES.QR} component={QrScan} />
              <Stack.Screen
                name={ROUTES.CATEGORIE_DETAIL}
                component={CategorieDetails}
              />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.RAPPORTS}
                component={Rapport}
              />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.ADD_ENTREPRISE}
                component={AddEntreprise}
              />
              <Stack.Screen
                name={ROUTES.PRODUCT_LIST}
                component={ProductList}
                options={{...MyTransition}}
              />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.STOCK}
                component={Stock}
              />
              <Stack.Screen
                name={ROUTES.PRODUCT_DETAILS}
                component={ProductDetail}
                options={{...MyTransition}}
              />
              <Stack.Screen
                name={ROUTES.INVOICE_DETAILS}
                component={InvoiceDetail}
                options={{...AutherTransition}}
              />
              <Stack.Screen
                options={{...AutherTransition}}
                name={ROUTES.SETTINGS_NAVIGATOR}
                component={Settings}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.OPERATION_DETAIL}
                component={OperationDetail}
              />
              <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.LIST_ENTREPRISE}
                component={ListEntreprise}
              />
                <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.ADD_USER}
                component={AddUser}
              />
                <Stack.Screen
                options={{...MyTransition}}
                name={ROUTES.USER_LIST}
                component={ListUser}
              />
            </>
          )}
        </Stack.Navigator>
      </themeContext.Provider>
    </langContext.Provider>
  );
}

export default AuthNavigator;
