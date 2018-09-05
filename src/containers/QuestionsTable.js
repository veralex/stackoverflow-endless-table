import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateFormat from 'dateformat';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';

import * as QuestionsActions from '../store/questions/actions';
import * as QuestionsSelectors from '../store/questions/reducer';

import Row from '../components/questions/Row';
import Counter from '../components/questions/Counter';
import PropTypes from 'prop-types';

import '../styles/app.css';

/**
 * Stackoverflow questions table class
 */
class QuestionsTable extends Component {
    constructor(props){
        super(props);
        window.addEventListener('resize',()=>{this.resize()});
    }

    componentDidMount() {
        this.props.dispatch(QuestionsActions.getQuestionsList({pageSize: 50}));
        this.resize();
        const [container] = document.body.getElementsByClassName('container');
        container.addEventListener('scroll', ()=>{
            if (container.scrollTop + container.clientHeight >= container.scrollHeight) this.getNextPage();
        })
    }

    /**
     * Row click handler
     * @param {number} id Question id
     */
    onRowClick(id){
        this.props.dispatch(QuestionsActions.getQuestion(id));
        this.props.dispatch(QuestionsActions.setPopupOpen(true, id));
    }

    /**
     * Gets next page of questions. Pagesize is fixed to 25 rows
     */
    getNextPage(){
        this.props.dispatch(QuestionsActions.getQuestionsList({pageSize: 25, max: this.props.questions[this.props.questions.length-1].created}));
        this.resize();
    }

    /**
     * Resize window to get visible scroll
     */
    resize = () =>{
        const [mainPageHeader] = document.body.getElementsByClassName('header');
        const [container] = document.body.getElementsByClassName('container');
        container.style.height=`${window.innerHeight-mainPageHeader.clientHeight - 10}px`;
    }
  
    render() {
        return (
            <div>
                <div className="header">
                    <Typography variant="headline" component="h2">Stackoverflow endless table</Typography>
                    <Counter counter={this.props.counter} />
                </div>
                <div className="container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Author</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Created date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        this.props.questions.map(item => <Row 
                            key={item.id} 
                            author = {item.author} 
                            title = {item.title} 
                            created = {DateFormat(item.created*1000, 'HH:MM:ss dd-mm-yyyy')} 
                            onClick={()=>this.onRowClick(item.id)}
                            hover/>)
                    }
                    </TableBody>
                </Table>
                </div>
            </div>
    );
  }
  
}

QuestionsTable.propTypes ={
    dispatch: PropTypes.func,
    questions: PropTypes.array,
    counter: PropTypes.number
}

function mapStateToProps(state) {
  return {
      questions: QuestionsSelectors.getQuestions(state),
      counter: QuestionsSelectors.getQuestionsCounter(state),
      popupOpen: QuestionsSelectors.getPopupState(state),
      error: QuestionsSelectors.getError(state)
  }
}

export default connect(mapStateToProps)(QuestionsTable);