import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  questionsList: [],
  questionsCache: [],
  popupOpen: false,
  selectedQuestionId: undefined,
  error: undefined
});

// reducer

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.QUESTIONS_FETCHED:
      return {...state,
        questionsList: [...state.questionsList, ...action.questions],
        error: undefined};
    
    case types.QUESTION_FETCHED:
      return {...state, 
        questionsCache: [...state.questionsCache, action.question],
        selectedQuestionId: action.question.id,
        error: undefined };

    case types.POPUP_OPEN:
      return {...state, popupOpen: action.popupOpen, selectedQuestionId: action.selectedQuestionId}

    case types.ERROR:
      return {...state, error: action.error}
    
      default:
      return state;
  }
}


// selectors

/**
 * Get questions list (no body)
 * @param {Object} state Current state
 */
export function getQuestions(state){
  return state.questions.questionsList;
}

/**
 * Get loaded questions counter
 * @param {Object} state Current state
 */
export function getQuestionsCounter(state){
  return state.questions.questionsList.length;
}

/**
 * Get loaded question with body by id from cache
 * @param {Object} state Current state
 */
export function getQuestion(state){
  return state.questions.questionsCache.find(q=>q.id === state.questions.selectedQuestionId);
}

/**
 * Gets popup window state
 * @param {*} state Current state
 */
export function getPopupState(state){
  return state.questions.popupOpen;
}

/**
 * error handler
 * @param {*} state 
 */
export function getError(state){
  return state.questions.error;
}