import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateEpisodeWatchList } from '../../redux/actions/myWatchList';
import { useSelector, useDispatch } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './EpisodeCard.scss';

const formatDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${year}-${month}-${day}`
};

const getCharactersReqParam = (characters) => {
    return characters.map((elem) => {
        const elemCopy = elem.split('/');
        return elemCopy[elemCopy.length - 1]
    })
}

const EpisodeCard = (props) => {
    const dispatch = useDispatch();
    const { name, created, episode, air_date, characters } = props;
    const [toggle, setToggle] = useState(false);
    const [charactersData, setCharactersData] = useState([]);
    const { list } = useSelector((state) => state.myWatchList);
    const [checkWatchList, setCheckWatchList] = useState(false);
    const [findEpisodeInWatchListIndex] = useState(list.findIndex((elem) => elem.episode === episode));

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${getCharactersReqParam(characters)}`)
            .then((response) => {
                setCharactersData(response.data)
            })
    }, [characters]);
    useEffect(() => {
        if (findEpisodeInWatchListIndex === -1) {
            setCheckWatchList(false);
        }
        else {
            setCheckWatchList(true);
        }
    }, [list, episode])
    return (
        <div className={!toggle ? "episode--item--card--parent" : "episode--item--card--parent expand"}>
            <div className="title--section">
                <h4>{name}</h4>
                <p className="created">
                    <span>created: </span>
                    {formatDate(created)}
                </p>
            </div>
            <div className="episode--number">
                <p>
                    <span>Episode: </span>
                    {episode}
                </p>
            </div>
            <div className="air--date">
                <p>
                    <span>Air Date: </span>
                    {air_date}
                </p>
            </div>
            <div className="to--my--watch--list">
                <Button
                  variant="contained"
                  color={!checkWatchList ? "primary" : "secondary"}
                  onClick={() => {
                    if (!checkWatchList) {
                        setCheckWatchList(true);
                        list.push({ title: name, episode, completed: false });
                        dispatch(updateEpisodeWatchList(list));
                    }
                    else {
                        setCheckWatchList(false);
                        list.splice(findEpisodeInWatchListIndex, 1);
                        dispatch(updateEpisodeWatchList(list));
                    }
                      
                  }}
                >
                  {!checkWatchList ? "Add to My Watch List" : "Remove In My Watch List"}
                </Button>                   
            </div>
            <div className={"info"}>
                {toggle && (
                    <div className="more--information">
                        {charactersData.length && (
                            <p className="cast">
                                <span>Cast: </span>
                                <span className="characters--list">
                                    {charactersData.map((elem, index) => {
                                        const { name } = elem;
                                        return (
                                            <span key={index.toString()}>
                                                <FiberManualRecordIcon />
                                                {name} /
                                            </span>
                                        )
                                    })}
                                </span>
                            </p>
                        )}
                        
                    </div>
                )}
            </div>
            <div className="expand--section">
                <IconButton onClick={() => setToggle(!toggle)}>
                    {toggle ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
            </div>
        </div>
    );
};

EpisodeCard.propTypes = {
    name: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    episode: PropTypes.string.isRequired,
    air_date: PropTypes.string.isRequired,
    characters: PropTypes.array,
}

export default EpisodeCard;