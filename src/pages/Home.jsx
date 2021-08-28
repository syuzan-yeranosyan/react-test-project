import React, { useEffect, useState } from 'react';
import { Navbar, Pagination, EpisodesContent, Loading } from '../Components';
import { getAllEpisodes } from '../redux/actions/episodes';
import { getWatchList } from '../redux/actions/myWatchList';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { EPISODES } from '../Constants/routes';
import './Home.scss';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [page, setPage] = useState(params.page);
    const { data, error, isFetching } = useSelector((state) => state.episodes);
    
    useEffect(() => {
        if(params.page === ":page") {
            history.push("/episodes/1")
        }
        else {
            dispatch(getAllEpisodes(page));
        }
    }, [params, history, dispatch]);
    
    useEffect(() => {
        history.push(`${EPISODES}${page}`)
    }, [page, history]);

    useEffect(() => {
        dispatch(getWatchList());
    }, [localStorage])
    return (
        <div className="home--page">
            <Navbar />
            {isFetching && <Loading />}
            {!isFetching && (
                <div className="home--page--content">
                    <EpisodesContent data={data ? data.results : []} />
                    <Pagination
                      dataLength={data === null ? 1 : data.info.count }
                      perPage={20}
                      setOffset={setPage}
                    />
                </div>
            )}
        </div>
    )
};

export default Home;