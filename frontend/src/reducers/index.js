import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import dishReducer from "./dishReducer";
import commentReducer from "./commentReducer";
import orderReducer from "./orderReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { USER_LOGOUT } from "../actions/types";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"] // only auth will be persisted
};
const orderPersistConfig = {
  key: "order",
  storage: storage,
  whitelist: ["cart"]
};

const appReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  dish: dishReducer,
  comment: commentReducer,
  order: persistReducer(orderPersistConfig, orderReducer)
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
