import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Camera, CameraCapturedPicture} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components/native';
import {Audio} from 'expo-av';
import {addPicture as _addPicture} from './PictureActions';
import {PictureCameraScreenProps} from '../types/reactNavigationPropsTypes';

/**
 * * c l a s s   P i c t u r e C a m e r a S c r e e n
 * 
 * Ecran permettant de prendre une photo et de la sauvegarder
 * dans la base de données
 */

class PictureCameraScreen extends Component<Props, State> {
  camera: Camera;

  constructor(props: Props) {
    super(props);
    console.log('PictureCameraScreen/constructor');
  }

  getPermissionAsync = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };

  savePicture = (image: {uri: string}) => {
    let {uri} = image;
    // console.log('PictureCameraScreen/savePicture: base64=', base64);
    this.props.addPicture(uri);
  };


  makeClick = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(
        require('../../assets/sounds/camera-click.mp3'),
      );
      await soundObject.playAsync();
    } catch (error) {
      throw error;
    }
  };

  takePicture = async () => {
    console.log('PictureCameraScreen/takePicture');
    this.makeClick();
    if (this.camera) {
      await this.camera
        .takePictureAsync({quality: 1, base64: true})
        .then((img: CameraCapturedPicture) => this.savePicture(img));
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  render() {
    return (
      <FlexContainer>
        <Camera
          ref={(ref) => {
            this.camera = ref;
          }}
          ratio={'16:9'}
          style={styles.camera}>
          <View style={styles.preview} />
        </Camera>
        <BottomButtonWrapper>
          <Button onPress={this.takePicture}>
            <MediumText> </MediumText>
          </Button>
        </BottomButtonWrapper>
      </FlexContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPicture: (base64imageOrUri: string) => dispatch(_addPicture(base64imageOrUri)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PictureCameraScreenProps ;
type State = {
  camera: Camera
}
export default connector(PictureCameraScreen);


const styles = StyleSheet.create({
  preview: {
    height: (Math.round(Dimensions.get('window').width) * 2.8) / 6.2,
    width: Math.round(Dimensions.get('window').width),
    color: 'transparent',
    borderColor: 'blue',
    borderWidth: 1,
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const FlexContainer = styled.View`
  flex: 1;
`;

const BottomButtonWrapper = styled.TouchableOpacity`
  flex: 0.1;
  borderColor: green;
  borderWidth: 1px;
  justifyContent: center;
  paddingHorizontal: 120px;
  paddingVertical: 10px;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  borderColor: red;
  borderWidth: 1px;
  borderRadius: 40px;
  justifyContent: center;
`;

const MediumText = styled.Text`
  fontSize: 20px;
  color: white
  textAlign: center;
`;

