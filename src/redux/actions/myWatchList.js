const startFetchingWatchList = () => {
    return {
        type: "startGetWatchList"
    }
};

const succesFetchingWatchList = (payload) => {
    return {
        type: "succesGetWatchList",
        payload,
    }
};

export const getWatchList = () => {
    return function (dispatch) {
        dispatch(startFetchingWatchList());
        const watchList = localStorage.getItem('watchList');
        if (!watchList) {
            dispatch(succesFetchingWatchList([]));
        }
        else {
            dispatch(succesFetchingWatchList(JSON.parse(watchList)));
        }
    }
}

const startUpdateEpisodeWatchList = () => {
    return {
        type: "startAddEpisodeWatchList"
    }
}

const successUpdateEpisodeWatchList = (payload) => {
    return {
        type: "successAddEpisodeWatchList",
        payload,
    };
};

export const updateEpisodeWatchList = (updatesList) => {
    return function (dispatch) {
        dispatch(startUpdateEpisodeWatchList());
        const jsonList = JSON.stringify(updatesList);
        localStorage.setItem('watchList', jsonList);
        dispatch(successUpdateEpisodeWatchList(updatesList));
    }
}