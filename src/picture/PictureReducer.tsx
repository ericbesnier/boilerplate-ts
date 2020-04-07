console.log('pictureReducer...');
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {FluxStandardAction} from 'redux-promise-middleware';
import {
  SET_INITIALIZED,
  FETCH_ALL_PICTURE,
  ADD_PICTURE,
  REMOVE_PICTURE,
} from '../constants/const';
import {IPicturesState} from '../interfaces/boilerplateInterfaces'

const INITIAL_STATE: IPicturesState = {
  pictures: [],
  isInitialized: false,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: {
    on: false,
    message: '',
  },
};

const pictureReducer = (state = INITIAL_STATE, action: FluxStandardAction) => {
  switch (action.type) {
    case SET_INITIALIZED:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isInitialized: action.payload,
      };
    case `${FETCH_ALL_PICTURE}_PENDING`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: true,
      };
    case `${FETCH_ALL_PICTURE}_FULFILLED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        pictures: action.payload.rows._array,
        isPending: false,
      };
    case `${FETCH_ALL_PICTURE}_REJECTED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: false,
        error: {
          on: true,
          message: 'Error when fetch all pictures !',
        },
      };
    case `${ADD_PICTURE}_PENDING`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: true,
      };
    case `${ADD_PICTURE}_FULFILLED`:
      console.log('pictureReducer: action.type=', action.type);
      // console.log('pictureReducer: action.payload=', action.payload);
      return {
        ...state,
        pictures: action.payload.rows._array,
        isPending: false,
      };
    case `${ADD_PICTURE}_REJECTED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: false,
        error: {
          on: true,
          message: 'Error when add picture !',
        },
      };
    case `${REMOVE_PICTURE}_PENDING`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: true,
      };
    case `${REMOVE_PICTURE}_FULFILLED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        pictures: action.payload.rows._array,
        isPending: false,
      };
    case `${REMOVE_PICTURE}_REJECTED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: false,
        error: {
          on: true,
          message: 'Error when remove picture  !',
        },
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'picture',
  storage: storage,
  whitelist: ['isInitialized'], // only isInitialized will be persisted
};

export default persistReducer(persistConfig, pictureReducer);
