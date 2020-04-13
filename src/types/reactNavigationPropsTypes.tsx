import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

/**
 * Définition des types de react-navigation
 */
export type RootStackParamList = {
  HomeInScreen: undefined;
  HomeOutScreen: undefined;
  SignInScreen: undefined;
  SignOutScreen: undefined;
  PictureCameraScreen: undefined;
  PictureSelectorScreen: undefined;
};

export type HomeInScreenRouteProp = RouteProp<RootStackParamList, 'HomeInScreen'>;
export type HomeOutScreenRouteProp = RouteProp<RootStackParamList, 'HomeOutScreen'>;
export type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignInScreen'>;
export type SignOutScreenRouteProp = RouteProp<RootStackParamList, 'SignOutScreen'>;
export type PictureCameraScreenRouteProp = RouteProp<
  RootStackParamList,
  'PictureCameraScreen'
>;
export type PictureSelectorScreenRouteProp = RouteProp<
  RootStackParamList,
  'PictureSelectorScreen'
>;

export type ProfileHomeInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeInScreen'
>;
export type ProfileHomeOutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeOutScreen'
>;
export type ProfileSignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignInScreen'
>;
export type ProfileSignOutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignOutScreen'
>;
export type ProfilePictureCameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PictureCameraScreen'
>;
export type ProfilePictureSelectorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PictureSelectorScreen'
>;

export type HomeInScreenProps = {
  route: HomeInScreenRouteProp;
  navigation: ProfileHomeInScreenNavigationProp;
};
export type HomeOutScreenProps = {
  route: HomeOutScreenRouteProp;
  navigation: ProfileHomeOutScreenNavigationProp;
};
export type SignInScreenProps = {
  route: SignInScreenRouteProp;
  navigation: ProfileSignInScreenNavigationProp;
};
export type SignOutScreenProps = {
  route: SignOutScreenRouteProp;
  navigation: ProfileSignOutScreenNavigationProp;
};
export type PictureCameraScreenProps = {
  route: PictureCameraScreenRouteProp;
  navigation: ProfilePictureCameraScreenNavigationProp;
};
export type PictureSelectorScreenProps = {
  route: PictureSelectorScreenRouteProp;
  navigation: ProfilePictureSelectorScreenNavigationProp;
};
