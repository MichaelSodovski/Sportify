import { createStore } from "redux";
import { reducer } from './reducer';
import { appState } from './app-state';

export const store = createStore(reducer, new appState()); 
