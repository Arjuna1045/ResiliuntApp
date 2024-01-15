import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import md5 from 'md5';
import auth from '@react-native-firebase/auth';
import {Formik, useFormik} from 'formik';
import axios, {Axios} from 'axios';
import {Endpoints} from './API/Endpoints';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import qs from 'query-string';
import {saveToken, setTokenInfo, setUname} from './Utilities';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User Name is required').label('username'),
  password: Yup.string().required('Password is required').label('password'),
});
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {Appearance} from 'react-native';

export function Login({navigation}) {
  // const [showpwd, setShowpwd] = useState(false);
  const deviceTheme = Appearance.getColorScheme();
  console.log(deviceTheme);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '180491280564-iibljgcrto8th1fr2g978ijum2khujap.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // forceCodeForRefreshToken:true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);


const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [role, setRole] = useState('');
  const handleShowEye = () => {
    setShowpwd(() => !showpwd);
  };

const [loggedIn, setloggedIn] = useState(false);
const [userInfo, setuserInfo] = useState([]);

async function onGoogleButtonPress() {

  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

  const _signIn = async () => {
    console.log("Called")
    // Linking.openURL("https://auth.multitenancy.realware.app/auth/realms/undergrid/protocol/openid-connect/auth?client_id=rw_viewer&redirect_uri=https://sccom.realware.app/&response_type=code&scope=openid&kc_idp_hint=google")
    try {
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      setloggedIn(true);
      console.log("Response is ....",data)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        console.log("[ Error : ] ",error)
      }
    }
  };

  const [loader, setLoader] = useState(true);
  const checkAccessToken = async () => {
    const storedAccessToken = await getToken();
    // let exp = await getTokenInfo();
    // exp = JSON.parse(exp);
    // const expirationTime = exp - 60000 * 5;
    // if (Date.now() > expirationTime) {
    //   console.log('expiration Is Checking....');
    //   setLoader(false);
    //   return;
    // }

    if (storedAccessToken) {
      // setAccessToken(storedAccessToken);
      navigation.navigate('Drawer');
      setLoader(false);
    } else {
      setLoader(false);
      return;
    }
  };
  const handleLogin = async (user, pwd) => {
    console.log(' token called');
    user=user.toLowerCase();
    setUser(user);

    // console.log(user, pwd);

    const basicHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const refreshTokenUrl = Endpoints.AUTH_URL;
    console.log('referes', refreshTokenUrl);
    const method = 'POST';
    const body = qs.stringify({
      username: user,
      password: md5(pwd),
      grant_type: 'password',
      client_id: 'rw_viewer',
      scope: 'openid',
    });
    console.log('body is ', body);

    const options = {headers: basicHeaders, method, body};

    // console.log(' token called' + JSON.stringify(options));
    const fullResponse = await fetch(refreshTokenUrl, options);
    // console.log('fullResponse', JSON.stringify(fullResponse));
    const jsonResponse = await fullResponse.json();
    console.log('jsonResponse', jsonResponse);
    // const token = jwtDecode(jsonResponse.access_token);
    // console.log("Decoded data",token);
    // console.log('Refresh token called' + JSON.stringify(jsonResponse));

    if (jsonResponse.hasOwnProperty('error')) {
      Alert.alert('Error', jsonResponse.error_description);
    }

    if (jsonResponse.hasOwnProperty('access_token')) {
      saveToken(jsonResponse.access_token);
      
      setUname(user);
      let newExp = Date.now() + jsonResponse.expires_in * 1000;
      await setTokenInfo(newExp);
      navigation.navigate('Grid');
      // test();
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,

    onSubmit: values => handleLogin(values.username.trim(), values.password),
  });
  const [showpwd, setShowPwd] = useState(false);
  return (
    <ImageBackground
      source={require('./assets/Bg.jpg')}
      resizeMode="cover"
      style={[loginstyles.container]}>
      <SafeAreaView>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"></StatusBar>
        <View>
          <ScrollView>
            <View style={loginstyles.loginText}>
              <View style={{width: 60, height: 64}}>
                {/* <Image
                style={loginstyles.tinyLogo}
                width={'100%'}
                source={require('./images/key.jpg')}
              /> */}
              </View>
              <View style={{flexDirection: 'column',alignItems:'center'}}>
               
             
                <View style={{width: 300, height: 100}}>
                  <Image
                    source={require('./assets/logoo.png')}
                    resizeMode={'contain'}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
              </View>
            </View>
            <Formik>
              <View style={loginstyles.loginArea}>
                {/* <Text style={loginstyles.label}>USER NAME</Text> */}
                <View style={{marginBottom: 20}}>
                  <View style={loginstyles.inputContainer}>
                    <Icon
                      name="mail-outline"
                      size={24}
                      style={loginstyles.icon}
                      color={loginstyles.light}
                    />
                    <TextInput
                      placeholder="User Name / Email Address"
                      placeholderTextColor="#bbb"
                      style={loginstyles.inputText}
                      onChangeText={uname =>
                        formik.setFieldValue('username', uname)
                      }
                      value={formik.values.username}
                      errorMessage={
                        formik.touched.username && formik.errors.username
                          ? formik.errors.username
                          : ''
                      }
                    />
                  </View>

                  {formik.errors.username && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'red',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}>
                      {formik.errors.username}
                    </Text>
                  )}
                </View>
                {/* <Text style={loginstyles.label}>PASSWORD</Text> */}
                <View style={{marginBottom: 20}}>
                  <View style={loginstyles.inputContainer}>
                    <Icon
                      name="lock-outline"
                      size={24}
                      style={loginstyles.icon}
                      color={loginstyles.light}
                    />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#bbb"
                      style={loginstyles.inputText}
                      secureTextEntry={showpwd ? false : true}
                      // onChangeText={pwd => setPwd(pwd)}
                      value={formik.values.password}
                      autoCapitalize="none"
                      onChangeText={text => {
                        formik.setFieldValue('password', text);
                      }}
                      errorMessage={
                        formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : ''
                      }
                    />
                    <TouchableOpacity onPress={() => setShowPwd(!showpwd)}>
                      {showpwd ? (
                        <Text
                          style={{
                            fontSize: 12,
                            letterSpacing: 1,
                            fontWeight: 'bold',
                            color: 'blue',
                          }}>
                          HIDE
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 12,
                            letterSpacing: 1,
                            fontWeight: 'bold',
                            color: 'blue',
                          }}>
                          SHOW
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  {formik.errors.password && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'red',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}>
                      {formik.errors.password}
                    </Text>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      formik.handleSubmit(formik.values);
                    }}
                    style={loginstyles.button}>
                    <Text
                      style={{
                        color: 'whitesmoke',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                        fontWeight: 'bold',
                      }}>
                      SIGN IN
                    </Text>
                  </TouchableOpacity>
                  {/* <GoogleSigninButton
                    style={loginstyles.button}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={onGoogleButtonPress}
                  /> */}
                  {/* <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn} 
              />  */}
                </View>

                {/* <TouchableOpacity>
              <Text style={loginstyles.forgot}>Forgot Password?</Text>
            </TouchableOpacity> */}
              </View>
            </Formik>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const LoginStyle = StyleSheet.create({
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',

    marginLeft: 15,
    textAlign: 'left',
  },
  loginLower: {
    display: 'flex',
    paddingHorizontal: 20,
    borderTopWidth: 2,
    justifyContent: 'space-between',
  },
  username: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    padding: 9,
    fontFamily: 'OpenSans-Regular',
  },
  pwd: {
    marginBottom: 10,
  },
  submitBtn: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#1338BE',
  },
  submitText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.8,

    color: 'white',
  },
});

const loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',

    // borderWidth:1
  },
  tinyLogo: {
    marginRight: 15,
  },
  loginText: {
    marginTop: 150,
  },
  textBig: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing:0.3,
    // marginBottom: 5,
    color: 'whitesmoke',
  },
  totext: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 5,
    color: 'whitesmoke',
  },
  textLight: {
    color: 'white',
    fontSize: 14,
  },
  loginArea: {
    marginTop: 40,
  },
  forgot: {
    textAlign: 'center',
    marginTop: 20,
    color: '#0061d8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1.5,
  },
  button: {
    backgroundColor: '#0061d8',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: 'white',
    // marginLeft: 10,
    marginBottom: 5,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    // paddingVertical: 10,
    marginVertical: 0,
    borderRadius: 10,
    elevation: 0,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,

    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  inputIcon: {
    flex: 1,
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    color: 'grey',
    backgroundColor: '#f1f1f1',
  },
  line: {
    width: 30,
    // height: 1,
    marginTop: 3,
    backgroundColor: 'whitesmoke',
  },
  signupBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginTop: 2,
  },
  light: '#6d93e0',
});
