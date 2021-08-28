import React from 'react';
import PropTypes from 'prop-types';
import { EpisodeCard } from '..';
import './EpisodesContent.scss';

const EpisodesContent = (props) => {
    const { data } = props;
    
    return (
        <div className="container container--content">
            {data.map((elem, index) => {
                return <EpisodeCard key={index.toString()} { ...elem } />
            })}
        </div>
    );
};

export default EpisodesContent;