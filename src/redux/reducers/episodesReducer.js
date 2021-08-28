import episodesState from '../states/episodes';

const episodesReducer = (state = episodesState, action ) => {
    let temp = { ...state };
    if (action.type === 'startFetchingEpisodes') {
        temp.isFetching = true;
    }
    if (action.type === 'errorFetchEpisodes') {
        temp = { data: null, error: action.error, isFetching: false };
    }
    if (action.type === 'successFetchingEpisodes') {
        temp = { data: { ...action.payload }, error: null, isFetching: false };
    }
    return temp;
};

export default episodesReducer;