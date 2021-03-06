import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {Card} from 'react-native-elements';
import {
  IPicture,
  IPicturesState,
  IApplicationState,
} from '../interfaces/boilerplateInterfaces';
import {HomeOutScreenProps} from '../types/reactNavigationPropsTypes';

/**
 * * c l a s s   H o m e O u t S c r e e n
 * 
 * Ecran d'accueil de l'application quand l'utilisateur n'est pas logger
 * Affiche une liste déroulante d'image
 */
class HomeOutScreen extends Component<Props, IApplicationState> {
  render() {
    const {picturesState} = this.props;
    // console.log('HomeOutScreen/render: picturesState=', picturesState);
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>
          {picturesState.pictures.map((item: IPicture) => (
            <Card
              title={`CARD ${item.id}`}
              image={{uri: item.base64imageOrUri}}
              key={item.id}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: {picturesState: IPicturesState}) => {
  return {
    picturesState: state.picturesState,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux &
  HomeOutScreenProps & {
    picturesState: IPicturesState;
  };

export default connector(HomeOutScreen);
