import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';

import './pagination.css'

const Paginate = ({ id, page, actionGet, numberOfPages, totalNumber }) => {
  const dispatch             = useDispatch()
  const location             = useLocation();
  const { pathname, search } = location;

  useEffect(() => {
    if(page) dispatch(actionGet(id, page))
  }, [page, actionGet, id, dispatch])

  return (
    <div className="main-pagination">
      <Stack spacing={2}>
        <Pagination 
          count={numberOfPages}
          variant="outlined"
          shape="rounded"
          color='primary'
          page={Number(page) || 1}
          renderItem={(item) => (
            <PaginationItem { ...item } component={Link} to={`${pathname}${search}&page=${item.page}`} />
            // <PaginationItem { ...item } component="a" href={`/${pageName}?page=${item.page}`} />
          )}
        />
        <span>{totalNumber} results found</span>
      </Stack>
    </div>
  );
}

export default Paginate