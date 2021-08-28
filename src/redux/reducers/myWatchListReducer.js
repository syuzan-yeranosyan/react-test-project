import myWatchListState from '../states/myWatchList';

const myWatchListReducer = (state = myWatchListState, action) => {
    let temp = { ...state };
    if (action.type === "startGetWatchList") {
        temp = { list: [], isFetching: true };
    }
    if (action.type === "succesGetWatchList") {
        temp = { list: action.payload, isFetching: false };
    }
    if (action.type === "successAddEpisodeWatchList") {
        temp.list = action.payload;
    }
    return temp;
};

export default myWatchListReducer;