import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {logout as _logout} from './UserActions';
import LoadingScreen from '../commons/LoadingScreen';
import {IUserState, IApplicationState} from '../interfaces/boilerplateInterfaces';
import {SignOutScreenProps} from '../types/reactNavigationPropsTypes';

/**
 * * c l a s s   S i g n O u t S c r e e n
 * 
 * Ce composant permet à l'utilisateur de se déconnecter de l'application
 */
class SignOutScreen extends Component<Props, IApplicationState> {
  render() {
    const {logout, userState} = this.props;
    console.log('SignOutScreen/render: userState=', userState);
    if (userState.isPending) {
      return (
        <LoadingScreen
          color="#FF0000"
          size="large"
          message="logout en cours..."
        />
      );
    }
    return (
      <View style={{paddingVertical: 20}}>
        <Card title={userState.email}></Card>
        <Button
          buttonStyle={{marginTop: 20, marginLeft: 15, marginRight: 15}}
          title="Logout"
          onPress={() => logout(userState.email, userState.password)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: {userState: IUserState}) => {
  return {
    userState: state.userState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (email: string, password: string) =>
    dispatch(_logout(email, password)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux &
  SignOutScreenProps & {
    userState: IUserState;
  };

export default connector(SignOutScreen);
