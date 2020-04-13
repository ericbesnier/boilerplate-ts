import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Button, Image, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {addPicture as _addPicture} from './PictureActions';
import {PictureSelectorScreenProps} from '../types/reactNavigationPropsTypes';
import {IUserState} from '../interfaces/boilerplateInterfaces';
/**
 * * c l a s s   P i c t u r e S e l e c t o r S c r e e n
 * 
 * Ecran permettant de sélectionner une image dans les dossiers du mobile
 * et de la sauvegarder dans la base de données
 */
class PictureSelectorScreen extends Component<Props, State> {
  readonly state = {
    image: undefined,
  };

  getPermissionAsync = async () => {
    if (Constants.platform!.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6.2, 2.8],
      quality: 1,
    });
    // console.log('PictureSelectorScreen/render: uri=', result.uri);
    if (!result.cancelled) {
      this.props.addPicture(result.uri);
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  render() {
    let {image} = this.state;
    console.log('PictureSelectorScreen/render');

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Pick an image from camera roll"
          onPress={this.pickImage}
        />
        {image && (
          <Image source={{uri: image}} style={{width: 200, height: 200}} />
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPicture: (base64imageOrUri: string) =>
    dispatch(_addPicture(base64imageOrUri)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux &
  PictureSelectorScreenProps & {
    userState: IUserState;
  };

type State = {
  image: undefined
}

export default connector(PictureSelectorScreen);
