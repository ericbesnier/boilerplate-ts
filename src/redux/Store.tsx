import { applyMiddleware, createStore, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import userReducer from '../user/UserReducer';
import pictureReducer from '../picture/PictureReducer';

/**
 * Implémentation du store redux
 * 
 * Utilisation de :
 * - reduxPromiseMiddleware : transforme l'action vers une action distincte 'en attente' (pending)
 *   et une action distincte 'exécutée' (fulfilled) ou 'rejetée' (rejected).
 * - Redux Thunk middleware : permet d'écrire des créateurs d'actions 
 *   qui renvoient une fonction au lieu d'une action.
 */
const middlewares = [
  reduxPromiseMiddleware,
  thunk,
];

const appReducers = combineReducers({
  userState: userReducer,
  picturesState: pictureReducer,
});

export default () => {
  let store = createStore(
    appReducers,
    undefined,
    applyMiddleware(...middlewares),
  );
  const persistor = persistStore(store);
  // if (persistor) {
  //   console.log('Store/RootReducer: persistStore  -----------------------------> A SUPPRIMER < ------------------------------------------');
  //   persistor.purge();
  // }
  return { store, persistor };
};