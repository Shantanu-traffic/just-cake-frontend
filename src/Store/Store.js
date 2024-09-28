import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers';
import { loadState, saveState } from '../utils/storeLocalStorage';

// Load the persisted state from localStorage if available
const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
);

// Subscribe to store changes and save the updated state to localStorage
store.subscribe(() => {
    console.log('Store state:', store.getState());
    saveState(store.getState()); // Save the entire state or specific slices if needed
});

export default store;