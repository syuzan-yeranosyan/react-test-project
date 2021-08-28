import React from 'react';
import PropTypes from 'prop-types';
import { HOME_PAGE_NUMBER, MY_WATCH_LIST } from '../../Constants/routes';
import { Link, useLocation } from 'react-router-dom';
import './Nav.scss';

const Navbar = (props) => {
    const { navItems } = props;
    const location = useLocation();
    const { pathname } = location;
    
    return (
        <nav className="navbar--container">
            <ul className="nav--wrapper">
                <div className="tv--title">
                    <h1>Rick and Morty Tv</h1>
                </div>
                {navItems.map((elem, index) => {
                    const { text, url, activeKey } = elem;
                    return (
                        <li
                          key={index.toString()}
                          className={pathname.split('/').includes(activeKey) ? "active" : ""}
                        >
                            <Link to={url}>{text}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
};

Navbar.propTypes = {
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            url: PropTypes.string,
            activeKey: PropTypes.string
        }),
    ),
};

Navbar.defaultProps = {
    navItems: [
        { text: "Episodes", url: HOME_PAGE_NUMBER, activeKey: "episodes" },
        { text: "My Watch List", url: MY_WATCH_LIST, activeKey: "my-watch-list" },
    ],
};

export default Navbar;