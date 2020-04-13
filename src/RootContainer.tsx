console.log('RootContainer...');
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import createStore from './redux/Store';
import Root from './Root';
import LoadingScreen from './commons/LoadingScreen';

export const {store, persistor} = createStore();

/**
 * * R o o t C o n t a i n e r
 * 
 * Charge le store et le persistor
 * et appel le composant root
 * 
 */
export default function RootContainer() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <LoadingScreen
            color="#00FF00"
            size="large"
            message="chargement du PersistGate"
          />
        }
        persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
