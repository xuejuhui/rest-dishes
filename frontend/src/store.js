import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import persistedReducer from './reducers/index';
import { persistStore } from 'redux-persist'

const store = createStore(persistedReducer ,compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));
const persistor = persistStore(store)


export default { store , persistor }
