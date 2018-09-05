import React from 'react';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

/**
 * Loaded questions counter
 * @param {Object} param0 counter
 */
const Counter = ({counter})=>(
    <Typography component="p">Loaded {counter} questions</Typography>
)

Counter.propTypes = {
    counter: PropTypes.number
}

export default Counter;