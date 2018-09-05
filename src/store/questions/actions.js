import * as types from './actionTypes';
import stackexchangeService from '../../services/stackexchange';

/**
 * Get questions page action
 * @param {Object} parameters stack exchange parameters
 */
export function getQuestionsList(parameters) {
  return async(dispatch) => {
    try {
      const questions = await stackexchangeService.getQuestionsList(parameters);
      dispatch({ type: types.QUESTIONS_FETCHED, questions });
    } catch (error) {
      console.error(error);
      dispatch({ type: types.ERROR, error: error.message });
    }
  };
}

/**
 * Gets a single question with body
 * @param {number} id Question id
 */
export function getQuestion(id) {
  return async (dispatch, getState) => {
    try {
      const question = getState().questions.questionsCache.find(i=>i.id === id) || await stackexchangeService.getQuestion(id);
      dispatch({ type: types.QUESTION_FETCHED, question  });      
    } catch (error) {
      console.error(error);
      dispatch({type: types.ERROR, error: error.message})
    }
  };
}

/**
 * Sets popup window open or close
 * @param {boolean} value Open/close state
 * @param {*} id Question id
 */
export function setPopupOpen(value, id = undefined){
  return (dispatch)=>{
    dispatch({ type: types.POPUP_OPEN, popupOpen: value, selectedQuestionId: id })
  }
}