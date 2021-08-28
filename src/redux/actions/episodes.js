import axios from 'axios';

const startGetEpisodes = () => {
    return {
        type: "startFetchingEpisodes"
    }
};

const errorGetEpisodes = (error) => {
    return {
        type: "errorFetchEpisodes",
        error,
    }
};

const succesFetchingEpisodes = (data) => {
    return {
        type: "successFetchingEpisodes",
        payload: data,
    }
}

export const getAllEpisodes = (page) => {
    return function (dispatch) {
        dispatch(startGetEpisodes());
        axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        dispatch(succesFetchingEpisodes(response.data))
                    }, 1000)
                }
            })
            .catch((error) => dispatch(errorGetEpisodes(error)))
    }
}