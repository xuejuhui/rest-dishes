import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import dishReducer from "./dishReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"] // only navigation will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  dish: dishReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
