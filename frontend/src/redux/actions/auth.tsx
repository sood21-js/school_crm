import { RECEIVE_AUTH, REQUEST_AUTH, CLEAR_AUTH, ERROR_AUTH, TLogin } from '../types/auth'
import { TResponseError, TResponse } from '../types/common_types'
import { fetchApi } from '../../lib/net/fetch'
import config from '../../config.app'

export const receiveAuth = (data: unknown) => ({ type: RECEIVE_AUTH, data });
export const requestAuth = () => ({ type: REQUEST_AUTH });
export const clearAuth = () => ({ type: CLEAR_AUTH });
export const errorAuth = (error: TResponseError) => ({ type: ERROR_AUTH, error });

export const fetchAuth = (data: TLogin) => (dispatch: any) => {
    dispatch(requestAuth())
    return fetchApi(data, config.url.login)
        .then((resuilt: TResponse) => {
            console.log(resuilt)
            dispatch(receiveAuth(resuilt.data))
        })
        .catch((error: any) => {
            console.log(error)
            dispatch(errorAuth({
                data: error.response?.data,
                status: error.response?.status
            }))
        })
}

/* export const getAuthThunk = (user: TUser) => (dispatch: any) => {
    dispatch(setLoadingStatus(true))
    getAuth(user)
      .then((res: TUser) => {
        if (res && res.isAuth && res.active) {
          dispatch(setUser(res));
          getProfile(res)
            .then((res: TUser) => {
              dispatch(setLoadingStatus(false))
              dispatch(setUser(res))
            });
        } else if (res && res.isAuth && !res.active) {
          dispatch(setErrorMsg('Учетная запись не активированна'))
          dispatch(setLoadingStatus(false))
  
        } else {
          dispatch(setErrorMsg('Неверный логин или пароль'))
          dispatch(setLoadingStatus(false))
        }
      });
  } */
/* 

type TInfo = {
  Код?: string | undefined
  ФИО?: string | undefined
  Личный?: string | undefined
  Рабочий?: string | undefined
  Email?: string | undefined
  DR?: string | undefined
  Цех?: string | undefined
  Должность?: string | undefined
  Подразделение?: string | undefined
  JobName?: string | undefined
  CexName?: string | undefined
  PodrName?: string | undefined
  Админ?: string | undefined
}

export type TUser = {
  _id?: string | undefined
  login?: string | undefined
  isAuth?: boolean
  online?: boolean
  userKod?: string | undefined
  active?: boolean
  userIp?: string | undefined
  foto?: any
  device?: string | undefined
  token?: string | undefined
  menu?: TMenu[]
  info?: TInfo
}

export type TInitialState = typeof initialState
let initialState = {
  user: {
    _id: undefined,
    login: undefined,
    isAuth: false,
    online: false,
    userKod: undefined,
    active: false,
    userIp: undefined,
    foto: {},
    device: undefined,
    token: undefined,
    menu: [],
    info: {}
  } as TUser,
  loadingStatus: true as boolean,
  errorMsg: undefined as string | undefined,
  initialUser: false as boolean
}


type TSetUser = { type: typeof SET_USER, user: TUser }
type TDelUser = { type: typeof DEL_USER }
type TSetLoadingStatus = { type: typeof SET_LOADING_STATUS, loadingStatus: boolean }
type TSetErrorMsg = { type: typeof SET_ERROR_MESSAGE, errorMsg: string | undefined }
type TSetInitialUser = { type: typeof SET_INITIAL_USER }

type TAction = TSetUser | TDelUser | TSetLoadingStatus | TSetErrorMsg | TSetInitialUser

const dataReducer = (state: TInitialState = initialState, action: TAction) => {
  let stateCopy;
  switch (action.type) {

    case "SET_USER":
      stateCopy = { ...state, user: action.user };
      return stateCopy;

    case "DEL_USER":
      stateCopy = { ...state, user: {} };
      return stateCopy;

    case "SET_LOADING_STATUS":
      stateCopy = { ...state, loadingStatus: action.loadingStatus };
      return stateCopy;

    case "SET_ERROR_MESSAGE":
      stateCopy = { ...state, errorMsg: action.errorMsg };
      return stateCopy;

    case "SET_INITIAL_USER":
      stateCopy = { ...state, initialUser: true };
      return stateCopy;

    default:
      return state;
  }
};

export default dataReducer;

export const setUser = (user: TUser) => {
  return {
    type: SET_USER,
    user
  };
};

export const setLoadingStatus = (loadingStatus: boolean) => {
  return {
    type: SET_LOADING_STATUS,
    loadingStatus
  };
};

export const setErrorMsg = (errorMsg: string | undefined) => {
  return {
    type: SET_ERROR_MESSAGE,
    errorMsg
  };
};

export const delUser = () => {
  return {
    type: DEL_USER,
  };
};

export const setInitialUser = () => {
  return {
    type: SET_INITIAL_USER
  };
};


export const getProfileInfo = (user: TUser) => async (dispatch: any) => {
  dispatch(setLoadingStatus(true))
  const res = await getProfile(user)
  dispatch(setLoadingStatus(false))
  dispatch(setUser(res))
}

export const getAuthThunk = (user: TUser) => (dispatch: any) => {
  dispatch(setLoadingStatus(true))
  getAuth(user)
    .then((res: TUser) => {
      if (res && res.isAuth && res.active) {
        dispatch(setUser(res));
        getProfile(res)
          .then((res: TUser) => {
            dispatch(setLoadingStatus(false))
            dispatch(setUser(res))
          });
      } else if (res && res.isAuth && !res.active) {
        dispatch(setErrorMsg('Учетная запись не активированна'))
        dispatch(setLoadingStatus(false))

      } else {
        dispatch(setErrorMsg('Неверный логин или пароль'))
        dispatch(setLoadingStatus(false))
      }
    });
}

export const getLoginThunk = () => async (dispatch: any) => {

  dispatch(setLoadingStatus(true))
  const res = await logIn()

  if (res && res.isAuth) {
    dispatch(setUser(res));
    const res1 = await getProfile(res)
    dispatch(setLoadingStatus(false))
    dispatch(setUser(res1))
  }
  dispatch(setInitialUser())
  dispatch(setLoadingStatus(false));
}

export const changeUserFoto = (user: TUser) => async (dispatch: any) => {
  dispatch(setLoadingStatus(true))
  await editUser(user)
  dispatch(setLoadingStatus(false))
} */