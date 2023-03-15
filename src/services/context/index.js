import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ROUTES} from '../../constants';
import * as config from '../config';
export const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {
  const navigation = useNavigation();
  const [mode, setMode] = React.useState(false);
  const [lg, setlange] = React.useState(false);
  const [sound, setSound] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modal, showModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessge, setSuccessMessage] = React.useState('');
  const [allEntreprise, setAllentprise] = React.useState([]);
  const [userData, setUserData] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [en, setEn] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [splashloading, setSplashLoading] = React.useState(false);
  const [refresh, forceUpdate] = React.useReducer(x => x + 1, 0);

  const displayMessage = (title, description, type) => {
    showMessage({
      message: title,
      description: description,
      type: type,
      statusBarHeight: 10,
      duration: 3000,
      icon: type == 'danger' ? 'danger' : type == 'success' ? 'success' : '',
      backgroundColor: type == 'danger' ? 'red' : 'green',
    });
  };

  const ShoosedEntreprise = item => {
    AsyncStorage.setItem('entre', JSON.stringify(item));
    setEn(item);
  };

  const toogleTheme = async value => {
    await AsyncStorage.setItem('changeTheme', JSON.stringify(value));
    setMode(value);
  };

  const toogleSound = async value => {
    await AsyncStorage.setItem('changeSound', JSON.stringify(value));
    setSound(value);
  };

  const toogleLanguage = async value => {
    await AsyncStorage.setItem('changeLang', JSON.stringify(value));
    setlange(value);
  };

  const CreateAccount = inputs => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 50000);
        setIsLoading(true);
        axios({
          url: config.REGISTER,
          method: 'post',
          data: {
            email: inputs.email,
            fullname: inputs.nom,
            phone: inputs.phone,
            role: 'User',
            password1: inputs.password,
            password2: inputs.password_confirmation,
          },
          cancelToken: source.token,
        })
          .then(response => {
            clearTimeout(timeout);

            if (response.data.status === 200) {
              setIsLoading(false);
              navigation.navigate(ROUTES.OTP, {
                email: inputs.email,
                phone: inputs.phone,
              });
            } else {
              setIsLoading(false);
              console.log(response.data.message);
              displayMessage('Erreur', response.data.message, 'danger');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data.message);
              displayMessage('Erreur', error.response.data.message, 'danger');
              setIsLoading(false);
            } else if (error.request) {
              console.log(error.request.message);
              setIsLoading(false);
              displayMessage('Erreur', error.request.message, 'danger');
            } else if (error.code === 'ERR_CANCELED') {
              setIsLoading(false);
              displayMessage(
                'Erreur',
                "Votre connexion internet n'est pas bonne",
                'danger',
              );
              console.log(error.code);
            } else {
              console.log('Error', error.message.message);
              //setError(error.message.message);
              setIsLoading(false);
            }
          });
      } else {
        displayMessage(
          'Erreur de connexion',
          "Votre téléphone n'est pas connecté à l'internet",
          'danger',
        );
      }
    });
  };

  const CreateEntreprise = (inputs, setInputs) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 50000);
        setIsLoading(true);
        axios({
          url: config.CREATED_EN,
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          data: {
            name: inputs.name,
            adresse: inputs.adresse,
            id_categorie: inputs.category,
            description: inputs.description,
            email: inputs.email,
            etat: 0,
            idnat: inputs.id,
            rccm: inputs.rccm,
            tel: inputs.phone,
            message_name: inputs.sender,
          },
          cancelToken: source.token,
        })
          .then(response => {
            clearTimeout(timeout);

            if (response.data.status === 200) {
              forceUpdate();
              setIsLoading(false);
              setInputs({})
              displayMessage('Success', response.data.message, 'success');
              navigation.goBack()
            } else {
              setIsLoading(false);
              console.log(response.data.message);
              displayMessage('Erreur', response.data.message, 'danger');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data.message);
              displayMessage('Erreur', error.response.data.message, 'danger');
              setIsLoading(false);
            } else if (error.request) {
              console.log(error.request.message);
              setIsLoading(false);
              displayMessage('Erreur', error.request.message, 'danger');
            } else if (error.code === 'ERR_CANCELED') {
              setIsLoading(false);
              displayMessage(
                'Erreur',
                "Votre connexion internet n'est pas bonne",
                'danger',
              );
              console.log(error.code);
            } else {
              console.log('Error', error.message.message);
              //setError(error.message.message);
              setIsLoading(false);
            }
          });
      } else {
        displayMessage(
          'Erreur de connexion',
          "Votre téléphone n'est pas connecté à l'internet",
          'danger',
        );
      }
    });
  };

  const UpdateEntreprise = (inputs, id) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 50000);
        setIsLoading(true);
        axios({
          url: config.BASE_URL + `entreprise/${id}/update`,
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json'
          },
          data: {
            name: inputs.name,
            adresse: inputs.adresse,
            id_categorie: inputs.category,
            description: inputs.description,
            email: inputs.email,
            idnat: inputs.id,
            rccm: inputs.rccm,
            tel: inputs.phone,
            message_name: inputs.sender,
          },
          cancelToken: source.token,
        })
          .then(response => {
            clearTimeout(timeout);

            if (response.data.status === 200) {
              forceUpdate();
              setIsLoading(false);
              displayMessage('Success', response.data.message, 'success');
              navigation.goBack()
            } else {
              setIsLoading(false);
              console.log(response.data.message);
              displayMessage('Erreur', response.data.message, 'danger');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data.message);
              displayMessage('Erreur', error.response.data.message, 'danger');
              setIsLoading(false);
            } else if (error.request) {
              console.log(error.request.message);
              setIsLoading(false);
              displayMessage('Erreur', error.request.message, 'danger');
            } else if (error.code === 'ERR_CANCELED') {
              setIsLoading(false);
              displayMessage(
                'Erreur',
                "Votre connexion internet n'est pas bonne",
                'danger',
              );
              console.log(error.code);
            } else {
              console.log('Error', error.message.message);
              //setError(error.message.message);
              setIsLoading(false);
            }
          });
      } else {
        displayMessage(
          'Erreur de connexion',
          "Votre téléphone n'est pas connecté à l'internet",
          'danger',
        );
      }
    });
  };

  const CreateUser = (inputs, setInputs) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 50000);
        setIsLoading(true);
        axios({
          url: config.BASE_URL + `account/create/${en.id_entreprise}`,
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          data: {
            email:inputs.email,
            fullname:inputs.name,
            phone:inputs.phone,
            adresse:inputs.adresse,
            date:'2020-02-02',
            date_naiss:'2020-02-02',
            genre:inputs.genre,
            matricule:inputs.matricule,
            nationalite:inputs.nationalite,
            lat:'-',
            long:'-',
            type:'Agent',
            fonction:'Default User',
          },
          cancelToken: source.token,
        })
          .then(response => {
            clearTimeout(timeout);

            if (response.data.status === 200) {
              forceUpdate();
              setIsLoading(false);
              setInputs({})
              displayMessage('Success', response.data.message, 'success');
              navigation.goBack()
            } else {
              setIsLoading(false);
              console.log(response.data.message);
              displayMessage('Erreur', response.data.message, 'danger');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data.message);
              displayMessage('Erreur', error.response.data.message, 'danger');
              setIsLoading(false);
            } else if (error.request) {
              console.log(error.request.message);
              setIsLoading(false);
              displayMessage('Erreur', error.request.message, 'danger');
            } else if (error.code === 'ERR_CANCELED') {
              setIsLoading(false);
              displayMessage(
                'Erreur',
                "Votre connexion internet n'est pas bonne",
                'danger',
              );
              console.log(error.code);
            } else {
              console.log('Error', error.message.message);
              //setError(error.message.message);
              setIsLoading(false);
            }
          });
      } else {
        displayMessage(
          'Erreur de connexion',
          "Votre téléphone n'est pas connecté à l'internet",
          'danger',
        );
      }
    });
  };

  const LoginAccount = inputs => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 50000);
        setIsLoading(true);
        axios({
          url: config.LOGIN,
          method: 'post',
          data: {
            username: inputs.email,
            password: inputs.password,
          },
          cancelToken: source.token,
        })
          .then(response => {
            clearTimeout(timeout);
            if (response.data.status === 200) {
              setIsLoading(false);
              let data = response.data.data;
              let dataT = response.data.token;
              AsyncStorage.setItem('userData', JSON.stringify(data));
              AsyncStorage.setItem('token', JSON.stringify(dataT));
              setUserData(data);
              setToken(dataT);
              setAllentprise(data.entreprises);
              //navigation.navigate(ROUTES.HOME)
              console.log(response);
              getCategory();
            } else {
              setIsLoading(false);
              console.log(response.data.message);
              displayMessage('Erreur', response.data.message, 'danger');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data.message);
              displayMessage('Erreur', error.response.data.message, 'danger');
              setIsLoading(false);
            } else if (error.request) {
              console.log(error.request.message);
              setIsLoading(false);
              displayMessage('Erreur', error.request.message, 'danger');
            } else if (error.code === 'ERR_CANCELED') {
              setIsLoading(false);
              displayMessage(
                'Erreur',
                "Votre connexion internet n'est pas bonne",
                'danger',
              );
              console.log(error.code);
            } else {
              console.log('Error', error.message.message);
              //setError(error.message.message);
              setIsLoading(false);
            }
          });
      } else {
        displayMessage(
          'Erreur de connexion',
          "Votre téléphone n'est pas connecté à l'internet",
          'danger',
        );
      }
    });
  };

  const CheckCode = (code, email) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        let source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 50000);
        setIsLoading(true);
        axios({
          url: config.CHECK_CODE,
          method: 'post',
          data: {
            email_or_phone: email,
            code_val: code,
          },
          cancelToken: source.token,
        })
          .then(response => {
            clearTimeout(timeout);
            if (response.data.status === 200) {
              setIsLoading(false);
              showModal(true);
              setSuccessMessage(response.data.message);
            } else {
              setIsLoading(false);
              console.log(response.data.message);
              displayMessage('Erreur', response.data.message, 'danger');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data.message);
              displayMessage('Erreur', error.response.data.message, 'danger');
              setIsLoading(false);
            } else if (error.request) {
              console.log(error.request.message);
              setIsLoading(false);
              displayMessage('Erreur', error.request.message, 'danger');
            } else if (error.code === 'ERR_CANCELED') {
              setIsLoading(false);
              displayMessage(
                'Erreur',
                "Votre connexion internet n'est pas bonne",
                'danger',
              );
              console.log(error.code);
            } else {
              console.log('Error', error.message.message);
              //setError(error.message.message);
              setIsLoading(false);
            }
          });
      } else {
        displayMessage(
          'Erreur de connexion',
          "Votre téléphone n'est pas connecté à l'internet",
          'danger',
        );
      }
    });
  };

  const Logout = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('changeTheme');
        await AsyncStorage.removeItem('changeSound');
        await AsyncStorage.removeItem('changeLang');
        await AsyncStorage.removeItem('entre');
        await AsyncStorage.removeItem('token');
        setToken(null);
        setUserData(null);
        setIsLoading(false);
        setAllentprise([])
        setEn(null);
        //await AsyncStorage.removeItem('token');
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    });
  };
  
  const LogoutSession = () => {
    setTimeout(async () => {
      try {
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('changeTheme');
        await AsyncStorage.removeItem('changeSound');
        await AsyncStorage.removeItem('changeLang');
        await AsyncStorage.removeItem('entre');
        await AsyncStorage.removeItem('token');
        setToken(null);
        setUserData(null);
        setEn(null);
        displayMessage('Erreur', 'Votre session a expiré, veuillez vous reconnecter', 'danger');
        //await AsyncStorage.removeItem('token');
      } catch (e) {
        console.log(e);
      }
    });
  };

  const IsLoggedin = async () => {
    try {
      setSplashLoading(true);
      let userData = await AsyncStorage.getItem('userData');
      let token = await AsyncStorage.getItem('token');
      let changeTheme = await AsyncStorage.getItem('changeTheme');
      let changeSound = await AsyncStorage.getItem('changeSound');
      let changeLang = await AsyncStorage.getItem('changeLang');
      let entreprise = await AsyncStorage.getItem('entre');
      userData = JSON.parse(userData);
      token = JSON.parse(token);
      changeTheme = JSON.parse(changeTheme);
      changeSound = JSON.parse(changeSound);
      changeLang = JSON.parse(changeLang);
      entreprise = JSON.parse(entreprise);
      if (userData) {
        setUserData(userData);
        setMode(changeTheme);
        setlange(changeLang);
        setSound(changeSound);
        setToken(token);
        setEn(entreprise);
        setAllentprise(userData.entreprises);
       

        //console.log(token)
      }
      setSplashLoading(false);
    } catch (e) {
      console.log(e);
      setSplashLoading(false);
    }
  };

  const hideModal = route => {
    showModal(false);
    setErrorMessage('');
    setSuccessMessage('');
    if (route) {
      navigation.navigate(route);
    }
  };

  const clearAllData = () => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => alert('success'));
  };

  React.useEffect(() => {
    //clearAllData();
    IsLoggedin();
  }, []);

  const getCategory = () => {
    axios({
      url: config.BASE_URL + `entreprise/categorie/load`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        let data = response.data.data;
        let areas = data.map(item => {
          return {
            label: item.designation,
            value: item.id,
          };
        });
        setCategories(areas);
        console.log(areas)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getEntreprise = value => {
    setIsLoading(true)
    axios({
      url: config.BASE_URL + `entreprise/load`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        let data = response.data.data;
        setAllentprise(data);
        setIsLoading(false)
        console.log(response.data.data)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      });
  };
  React.useEffect(() => {
    getEntreprise()
  }, [refresh])

  React.useEffect(() => {
    getCategory();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        toogleTheme,
        toogleLanguage,
        lg,
        mode,
        toogleSound,
        sound,
        CreateAccount,
        isLoading,
        CheckCode,
        modal,
        getEntreprise,
        successMessge,
        errorMessage,
        hideModal,
        displayMessage,
        LoginAccount,
        getCategory,
        userData,
        Logout,
        en,
        ShoosedEntreprise,
        token,
        splashloading,
        clearAllData,
        CreateUser,
        allEntreprise,
        categories,
        UpdateEntreprise,
        LogoutSession,
        refresh,
        forceUpdate,
        CreateEntreprise
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
