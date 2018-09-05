import React from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableCell} from '@material-ui/core';

/**
 * Table row
 * @param {Object} param0 
 */
const Row = ({onClick, author, title, created}) =>
    (<TableRow hover onClick={onClick}>
        <TableCell>{author}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{created}</TableCell>
    </TableRow>);
    
Row.propTypes = {
    onClick: PropTypes.func,
    author: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string
};

export default Row;