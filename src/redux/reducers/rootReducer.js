import { combineReducers } from 'redux';
import episodesReducer from './episodesReducer';
import myWatchListReducer from './myWatchListReducer';

const rootReducer = combineReducers({
    episodes: episodesReducer,
    myWatchList: myWatchListReducer,
});

export default rootReducer;