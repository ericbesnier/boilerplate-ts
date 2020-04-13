/**
 * Défintion des interfaces de l'application :
 * user
 * picture
 * pictures
 * application
 */
export interface IUserState {
  id: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
  error: {
    on: boolean;
    message: string;
  };
}

export interface IPicture {
  id: number;
  base64imageOrUri: string;
}

export interface IPicturesState {
  pictures: IPicture[];
  isInitialized: boolean;
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
  error: {
    on: boolean;
    message: string;
  };
}

export interface IApplicationState {
  IUserState: IUserState;
  IPicturesState: IPicturesState;
}
