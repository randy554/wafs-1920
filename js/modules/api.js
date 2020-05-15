import { data } from './data.js';
import { render } from './render.js';
import { helper } from './helper.js';

export const api = {

  // Request data from the Trivia API & return this data
  getCategoryQuestionsAndAnswers: function (userCategoryChoice) {

    const questionsAmount   = 12;
    const typeAnswer        = 'boolean';

    //Build API endpoint
    const apiEndpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&category=${userCategoryChoice}&type=${typeAnswer}`;

    // fetch error handling
    function handleErrors(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      console.log(response);
      return response;
    }

    // Request 12 questions & answers from a category
    return fetch(apiEndpoint)

    .then(handleErrors)
    .then(result => result.json())
    .then(jsonReturnData => {

      // Store the API data in DB
      data.storeAll(jsonReturnData.results);

      // Store the API in Local Storage
      localStorage.setItem('APIdata', JSON.stringify(jsonReturnData.results));

      // Set loader off
      render.toggleLoader("off");

       render.questionsAndAnswerOptions(jsonReturnData, helper.getQuestionList());

    });

  }


};
