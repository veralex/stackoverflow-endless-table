import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import * as QuestionsActions from '../store/questions/actions';
import * as QuestionsSelectors from '../store/questions/reducer';

/**
 * Popup window class
 */
class Popup extends Component{    
    handleClose(){
        this.props.dispatch(QuestionsActions.setPopupOpen(false));
    }

    renderLoading(){
        return this.props.popupOpen? (
            <Dialog
                open={this.props.popupOpen}
                onClose={this.handleClose.bind(this)}>                
                <DialogContent>
                    Loading...
                </DialogContent>
            </Dialog>
        ) : (null);
    }

    render(){
        const question = this.props.getQuestion;
        if(!question) return this.renderLoading();        
        return(
            <Dialog
                open={this.props.popupOpen}
                onClose={this.handleClose.bind(this)}>                
                <DialogTitle>{question.title}</DialogTitle>
                <DialogContent>
                    <a href={question.url} target="_blanc">{question.url}</a>
                    {ReactHtmlParser(question.body)}
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose.bind(this)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

Popup.propTypes = {
    dispatch: PropTypes.func,
    popupOpen: PropTypes.bool,
    getQuestion: PropTypes.object
}

function mapStateToProps(state) {
    return {
        popupOpen: QuestionsSelectors.getPopupState(state),
        getQuestion: QuestionsSelectors.getQuestion(state)
    }
  }
  
  export default connect(mapStateToProps)(Popup);