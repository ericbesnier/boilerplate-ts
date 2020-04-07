console.log('userReducer...');
import { FluxStandardAction } from 'redux-promise-middleware';
import { LOGIN, LOGOUT } from '../constants/const';
import {IUserState} from '../interfaces/boilerplateInterfaces';

const INITIAL_STATE: IUserState = {
  id: "",
  email: "",
  password: "",
  isLoggedIn: false,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: {
    on: false,
    message: ""
  }
}

const userReducer = (state = INITIAL_STATE, action: FluxStandardAction) => {
  // console.log('userReducer: state=', state);
  switch (action.type) {
    case `${LOGIN}_PENDING`:
      console.log('userReducer: action.type=', action.type);
      return {
        ...state,
        isPending: true,
      };
    case `${LOGIN}_FULFILLED`:
      console.log('userReducer: action.type=', action.type);
      console.log('userReducer: action.payload=', action.payload);
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
        isPending: false,
        isLoggedIn: true,
      };
    case `${LOGIN}_REJECTED`:
      console.log('userReducer: action.type=', action.type);
      return {
        ...state,
        isPending: false,
        error: {
          on: true,
          message: 'Error when login !',
        },
      };
      case `${LOGOUT}_PENDING`:
        console.log('userReducer: action.type=', action.type);
        return {
          ...state,
          isPending: true,
        };
      case `${LOGOUT}_FULFILLED`:
        console.log('userReducer: action.type=', action.type);
        console.log('userReducer: action.payload=', action.payload);
        return {
          ...state,
          isPending: false,
          isLoggedIn: false,
        };
      case `${LOGOUT}_REJECTED`:
        console.log('userReducer: action.type=', action.type);
        return {
          ...state,
          isPending: false,
          error: {
            on: true,
            message: 'Error when logout !',
          },
        };
    default:
      return state;
  }
}

export default userReducer;