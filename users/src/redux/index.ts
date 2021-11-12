import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import userReducer from "./userReducer";
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "./saga";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type RootReducerType = typeof rootReducer

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

export type AppStateType = ReturnType<RootReducerType>

const rootReducer = combineReducers({
  userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootWatcher)
