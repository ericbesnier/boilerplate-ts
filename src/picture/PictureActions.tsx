import {STORAGE_API} from '../api/StorageApi';
import {
  SET_INITIALIZED,
  FETCH_ALL_PICTURE,
  ADD_PICTURE,
  REMOVE_PICTURE,
} from '../constants/const';
import {FluxStandardAction} from 'redux-promise-middleware';

export const setPictureAsInitialized = (isDone: boolean) => {
  console.log('PictureAction/setPictureAsInitialized: isDone=', isDone);
  return {
    type: SET_INITIALIZED,
    payload: isDone,
  };
};

export const fetchAllPicture = (): FluxStandardAction => {
  return {
    type: FETCH_ALL_PICTURE,
    payload: STORAGE_API.fetchAll(),
  };
};

export const addPicture = (base64imageOrUri: string): FluxStandardAction => {
  // console.log('PictureAction/addPicture: base64imageOrUri=', base64imageOrUri);
  return {
    type: ADD_PICTURE,
    payload: STORAGE_API.add(base64imageOrUri),
  };
};

export const removePicture = (id: number): FluxStandardAction => {
  return {
    type: REMOVE_PICTURE,
    payload: STORAGE_API.remove(id),
  };
};
