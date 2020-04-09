/// <reference path="../src/interfaces/boilerplateInterfaces.tsx" />
console.log('Root...');
import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Asset} from 'expo-asset';
const AssetUtils = require('expo-asset-utils');

import LoadingScreen from './commons/LoadingScreen';
import {
  addPicture as _addPicture,
  setPictureAsInitialized as _setPictureAsInitialized,
  fetchAllPicture as _fetchAllPicture,
} from './picture/PictureActions';
import SignOutScreen from './user/SignOutScreen';
import SignInScreen from './user/SignInScreen';
import HomeInScreen from './user/HomeInScreen';
import HomeOutScreen from './user/HomeOutScreen';
import PictureSelectorScreen from './picture/PictureSelectorScreen';
import PictureCameraScreen from './picture/PictureCameraScreen';
import {
  IUserState,
  IPicturesState,
} from './interfaces/boilerplateInterfaces';
import {FluxStandardAction} from 'redux-promise-middleware';

const Stack = createStackNavigator();

const imagesArray = [
  require('../assets/images/1.jpg'),
  require('../assets/images/2.jpg'),
  require('../assets/images/3.jpg'),
  require('../assets/images/4.jpg'),
];

// c l a s s   R o o t
// -------------------
class Root extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {count: 0};
  }

  componentDidMount() {
    this.initImages();
  }

  addPicture = async (result: {data: string}): Promise<FluxStandardAction> => {
    let {data} = result;
    return await new Promise((resolve, reject) => {
      resolve(this.props.addPicture('data:image/jpeg;base64,' + data));
      reject((error: string) => error);
    });
  };

  conversionFailure = (erreur: string): void => {
    console.error(
      "Root/conversionFailure: l'opération a échoué avec le message : " +
        erreur,
    );
    throw new Error('Something failed:' + erreur);
  };

  getUriFromAsset = async (image: string) => {
    // console.log('Root/getUriFromAsset');
    return await new Promise((resolve, reject) => {
      resolve(Asset.fromModule(image).uri);
      reject((error: string) => error);
    });
  };

  isDone = async (length: number): Promise<boolean> => {
    this.setState({count: this.state.count + 1});
    return await new Promise((resolve) => {
      if (this.state.count === length) {
        resolve(true);
      }
    });
  };

  cacheImages = (images: string[]) => {
    return images.map((image: string) => {
      return Asset.fromModule(image).downloadAsync();
    });
  };

  async loadAssetsAsync() {
    const imageAssets = this.cacheImages(imagesArray);
    await Promise.all([...imageAssets]);
  }

  fetchAssetPictures = async () => {
    return await new Promise((resolve) => {
      for (let i = 0; i < imagesArray.length; i++) {
        let image = imagesArray[i];
        this.getUriFromAsset(image)
          .then((uri) => AssetUtils.resolveAsync(uri))
          .then((asset) => AssetUtils.base64forImageUriAsync(asset.localUri))
          .then((result) => this.addPicture(result))
          .then(() => this.isDone(imagesArray.length))
          .then((isDone: boolean) => this.props.setPictureAsInitialized(isDone))
          .then((result) =>
            console.log(
              'Root/fetchAssetPictures: processus de récupération des ASSET images réalisé avec succès ! result=',
              result,
            ),
          )
          .catch(this.conversionFailure);
      }
      resolve(true);
    });
  };

  fetchDataBasePictures = async () => {
    return await new Promise((resolve) => {
      this.props
        .fetchAllPicture()
        .then((result: FluxStandardAction) =>
          console.log(
            'Root/fetchDataBasePictures: processus de récupération des images de la BD réalisé avec succès !',
          ),
        )
        .catch((error: string) =>
          console.error('Root/fetchDataBasePictures: error=', error),
        );
      resolve(true);
    });
  };

  initImages = async () => {
    this.loadAssetsAsync().then(() => {
      if (!this.props.picturesState.isInitialized) {
        this.fetchAssetPictures();
      } else {
        this.fetchDataBasePictures();
      }
    });
  };

  // r e n d e r
  //
  render() {
    const {userState, picturesState} = this.props;
    // console.log("Root/render: picturesState.isInitialized : " + picturesState.isInitialized);
    if (!picturesState.isInitialized) {
      return (
        <LoadingScreen
          color="#FF0000"
          size="large"
          message="chargement des images en cours..."
        />
      );
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {userState.isLoggedIn ? (
            <>
              <Stack.Screen
                name="HomeInScreen"
                component={HomeInScreen}
                options={({navigation}) => ({
                  title: 'Accueil - connecté',
                  headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate('SignOutScreen')}
                      title="Logout"
                      color="#f4511e"
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                })}
              />
              <Stack.Screen name="SignOutScreen" component={SignOutScreen} />
              <Stack.Screen
                name="PictureSelectorScreen"
                component={PictureSelectorScreen}
              />
              <Stack.Screen
                name="PictureCameraScreen"
                component={PictureCameraScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="HomeOutScreen"
                component={HomeOutScreen}
                options={({navigation}) => ({
                  title: 'Accueil - déconnecté',
                  headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate('SignInScreen')}
                      title="Login"
                      color="#f4511e"
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                })}
              />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: {
  userState: IUserState;
  picturesState: IPicturesState;
}) => {
  return {
    userState: state.userState,
    picturesState: state.picturesState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPicture: (image: string) => dispatch(_addPicture(image)),
  setPictureAsInitialized: (isDone: boolean) =>
    dispatch(_setPictureAsInitialized(isDone)),
  fetchAllPicture: () => dispatch(_fetchAllPicture()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  userState: IUserState;
  picturesState: IPicturesState;
};

type State = {count: number};

export default connector(Root);
