import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'] // only navigation will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;
