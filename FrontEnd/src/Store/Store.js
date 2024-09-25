import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log('Store state:', store.getState());
});

export default store;