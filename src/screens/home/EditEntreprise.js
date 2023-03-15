import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
  StatusBar,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ROUTES} from '../../constants';
import React from 'react';
import Loader from './Loader';
import {Icons} from '../../constants/Icons';
import InputSelect from '../../components/InputSelect';
import TextInputA from '../../components/InputTextA';
import TextArea from '../../components/TextArea';
import {Button} from '../../components/Button';
import {GlobalContext} from '../../services/context';
import themeContext from '../../constants/themeContext';
import {useNavigation} from '@react-navigation/native';
import imgs from '../../constants/imgs';
import DialogBox from '../../components/DialogBox';
const {width, height} = Dimensions.get('window');
const EditEntreprise = ({route, navigation}) => {
  const COLORS = React.useContext(themeContext);
  const {
    userData,
    ShoosedEntreprise,
    CreateEntreprise,
    UpdateEntreprise,
    categories,
    allEntreprise,
    en,
    getCategory,
    Logout,
    isLoading,
  } = React.useContext(GlobalContext);
  const [modal, showModal] = React.useState(false);
const {item} = route.params;

console.log(item)





  React.useEffect(() => {
    getCategory()
  }, [])
  const [inputs, setInputs] = React.useState({
    name: item.nom_entreprise,
    description: item.descripton,
    category: item.id_categorie,
    phone: item.tel,
    adresse: item.adresse,
    email: item.email,
    id: item.idnat,
    rccm: item.rccm,
    sender: item.message_name,
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valide = true;

    if (!inputs.email) {
      hanldeError('Veuillez renseigner ce champ', 'email');
      valide = false;
    }
    if (!inputs.name) {
      hanldeError('Veuillez renseigner ce champ', 'name');
      valide = false;
    }
    if (!inputs.phone) {
      hanldeError('Veuillez renseigner ce champ', 'phone');
      valide = false;
    }
    if (!inputs.adresse) {
      hanldeError('Veuillez renseigner ce champ', 'adresse');
      valide = false;
    }
    if (!inputs.id) {
      hanldeError('Veuillez renseigner ce champ', 'id');
      valide = false;
    }
    if (!inputs.rccm) {
      hanldeError('Veuillez renseigner ce champ', 'rccm');
      valide = false;
    }
    if (!inputs.description) {
      hanldeError('Veuillez renseigner ce champ', 'description');
      valide = false;
    }
    if (!inputs.sender) {
      hanldeError('Veuillez renseigner ce champ', 'sender');
      valide = false;
    }
    if (!inputs.category) {
      hanldeError('Veuillez renseigner ce champ', 'category');
      valide = false;
    }
    if (valide) {
      UpdateEntreprise(inputs, item.id_entreprise);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const hanldeError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const renderItemProduct = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => ShoosedEntreprise(item)}
        style={[
          styles.card_template,
          {
            backgroundColor: COLORS.touchable,
            justifyContent: 'center',
            alignItems: 'center',
          },
          index % 2 == 0 ? {marginRight: 5} : {marginLeft: 5},
        ]}>
        <Image style={styles.card_image} source={imgs.logo} />
        <Text
          style={{
            color: COLORS.txtblack,
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          }}>
          {item.nom_entreprise}
        </Text>
        <Text
          style={{
            color: COLORS.txtblack,
            fontFamily: 'Poppins-Light',
            fontSize: 12,
          }}>
          {item.categorie}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.shape}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />


      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom:20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.FontAwesome
              name="arrow-left"
              size={15}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
          <Text style={{marginLeft:20, ...styles.desc}}>Modifier une entreprise</Text>

      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}>
        <Image
          source={imgs.logo}
          style={{
            alignSelf: 'center',
            marginTop: height / 5,
            opacity: 0.1,
            ...StyleSheet.absoluteFill,
          }}
        />
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={10}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom:10}}>
          <TextInputA
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            amStyle={{marginTop: 20}}
            placeholder="Nom de l'entreprise"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.name}
            value={inputs.name}
            touched={errors.name}
            onFocus={() => {
              hanldeError(null, 'name');
            }}
            onChangeText={text => handleOnChange(text, 'name')}
          />
          <InputSelect
            color={COLORS.txtblack}
            icon="user"
            autoCapitalize="none"
            placeholder="Catégorie"
            keyboardAppearance="dark"
            amStyle={{
              borderRadius: 0,
              backgroundColor: COLORS.inputBg,
              height: 50,
              marginTop: 20,
            }}
            onFocus={() => {
              hanldeError(null, 'category');
            }}
            error={errors.category}
            value={inputs.category}
            onValueChange={text => {
              handleOnChange(text, 'category');
              hanldeError(null, 'category');
            }}
            items={categories}
          />
          <TextArea
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="Description de l'entreprise"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.description}
            value={inputs.description}
            touched={errors.description}
            onFocus={() => {
              hanldeError(null, 'description');
            }}
            onChangeText={text => handleOnChange(text, 'description')}
          />

          <TextInputA
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="Phone de l'entreprise"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.phone}
            amStyle={{marginTop: 20}}
            value={inputs.phone}
            touched={errors.phone}
            onFocus={() => {
              hanldeError(null, 'phone');
            }}
            onChangeText={text => handleOnChange(text, 'phone')}
          />
          <TextInputA
                amStyle={{marginTop: 20}}
            color={COLORS.txtblack}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="Email de l'entreprise"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.email}
            value={inputs.email}
            touched={errors.email}
            onFocus={() => {
              hanldeError(null, 'email');
            }}
            onChangeText={text => handleOnChange(text, 'email')}
          />
          <TextInputA
            color={COLORS.txtblack}
            amStyle={{marginTop: 20}}

            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="Adresse de l'entreprise"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.adresse}
            value={inputs.adresse}
            touched={errors.adresse}
            onFocus={() => {
              hanldeError(null, 'adresse');
            }}
            onChangeText={text => handleOnChange(text, 'adresse')}
          />
          <TextInputA
            color={COLORS.txtblack}
            amStyle={{marginTop: 20}}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="IDNAT"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.id}
            value={inputs.id}
            touched={errors.id}
            onFocus={() => {
              hanldeError(null, 'id');
            }}
            onChangeText={text => handleOnChange(text, 'id')}
          />
          <TextInputA
            color={COLORS.txtblack}
            amStyle={{marginTop: 20}}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="RCCM"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.rccm}
            value={inputs.rccm}
            touched={errors.rccm}
            onFocus={() => {
              hanldeError(null, 'rccm');
            }}
            onChangeText={text => handleOnChange(text, 'rccm')}
          />
          <TextInputA
            color={COLORS.txtblack}
            amStyle={{marginTop: 20}}
            colorPlaceholder={'grey'}
            label=""
            iconName="user"
            placeholder="Message sender name"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="Suivant"
            error={errors.sender}
            value={inputs.sender}
            touched={errors.sender}
            onFocus={() => {
              hanldeError(null, 'sender');
            }}
            onChangeText={text => handleOnChange(text, 'sender')}
          />
          <Button
            isLoading={isLoading}
            onPress={validate}
            label={'Enregistrer'}
            color={COLORS.shape}
            colorText={COLORS.white}
            containerStyle={{
              marginTop: 40,
              height: 55,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default EditEntreprise;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    marginTop: 10,
    fontSize: 24,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 16,
  },
  header: {
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  subTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 24,
    marginTop: -10,
  },
  category: {
    width: 100,
    marginRight: 5,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
  },
  product: {
    width: '45%',
    marginRight: 5,
    marginBottom: 5,
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cate: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  imageProduct: {
    width: '90%',
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  catTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
  },
  card_template: {
    width: width / 2 - 15,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 3,
  },
  card_image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  text_container: {
    position: 'absolute',
    width: '100%',
    height: 70,
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  card_title: {
    color: 'white',
  },
  modal: {
    height: 130,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
