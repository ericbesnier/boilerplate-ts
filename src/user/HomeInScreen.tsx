import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {FloatingAction, IActionProps} from 'react-native-floating-action';
import {removePicture as _removePicture} from '../picture/PictureActions';
import {
  IPicturesState,
  IPicture,
  IApplicationState,
} from '../interfaces/boilerplateInterfaces';
import {HomeInScreenProps} from '../types/reactNavigationPropsTypes';

const actions: Array<IActionProps> = [
  {
    text: 'Photos',
    icon: require('../../assets/icons/insert_photo_white.png'),
    name: 'bt_photos',
  },
  {
    text: 'Camera',
    icon: require('../../assets/icons/camera_white.png'),
    name: 'bt_camera',
  },
];

/**
 * * c l a s s   H o m e I n S c r e e n
 * 
 * Ecran d'accueil de l'application quand l'utilisateur est logger
 * Affiche une liste déroulante d'image
 */
class HomeInScreen extends Component<Props, IApplicationState> {
  render() {
    const {navigation, picturesState} = this.props;

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingVertical: 0}}>
          {picturesState.pictures.map((item: IPicture) => (
            <Card
              title={`CARD ${item.id}`}
              image={{uri: item.base64imageOrUri}}
              key={item.id}>
              <Icon
                reverse
                name="delete"
                color="#f50"
                onPress={() => this.props.removePicture(item.id)}
              />
            </Card>
          ))}
        </ScrollView>
        <FloatingAction
          actions={actions}
          onPressItem={(name: string | undefined) => {
            if (name === 'bt_photos') {
              navigation.navigate('PictureSelectorScreen');
            } else if (name === 'bt_camera') {
              console.log('HomeInScreen/render: lancement application camera');
              navigation.navigate('PictureCameraScreen');
            } else {
              console.error("HomeInScreen/render: ce bouton n'existe pas !!");
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: {picturesState: IPicturesState}) => {
  return {
    picturesState: state.picturesState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removePicture: (id: number) => dispatch(_removePicture(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux &
  HomeInScreenProps & {
    picturesState: IPicturesState;
  };
export default connector(HomeInScreen);
