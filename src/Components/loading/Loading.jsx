import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading--parent">
            <CircularProgress />
        </div>
    );
};

export default Loading