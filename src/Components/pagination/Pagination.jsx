import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg'
import { useParams } from 'react-router-dom';
import './Pagination.scss';

const Pagination = ({ dataLength, perPage, setOffset }) => {
  const [pageCount, setPageCount] = useState(0);
  const params = useParams();
  const handlePageClick = (item) => {
    setOffset(item.selected + 1);
  };
  useEffect(() => {
    setPageCount(Math.ceil(dataLength / perPage));
  }, [dataLength, perPage]);

  useEffect(() => {
    // Prev Icon
    const prev = document.querySelector('.previous a');
    if (prev) {
      const prevIcon = document.createElement('img');
      prevIcon.src = leftArrow;
      prev.innerHTML = '';
      prev.appendChild(prevIcon);
    }
    // Next Icon
    const next = document.querySelector('.next a');
    if (next) {
      const nextIcon = document.createElement('img');
      nextIcon.src = rightArrow;
      next.innerHTML = '';
      next.appendChild(nextIcon);
    }
  }, []);

  return (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      breakLabel="..."
      breakClassName="break-me"
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
      // disableInitialCallback={false}
      forcePage={+params.page - 1}
    />
  );
};

Pagination.propTypes = {
  dataLength: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
};


export default Pagination;