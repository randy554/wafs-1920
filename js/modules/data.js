import { api } from './api.js';

export let data = {

  totalScore : 0,

  // Store all API call data here
  allQuizApiData : [],

  // User answers
  userAnswers : [],

  getUserAnswers : function () {

    // bron : https://stackoverflow.com/questions/523266/how-can-i-get-a-specific-parameter-from-location-search
    let str = window.location.search;

    let objURL = [];

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL.push($3);
        }
    );


    this.storeUserAnswers(objURL);

  },

  storeUserAnswers : function (userAnswers) {

    this.userAnswers = userAnswers;

  },

  // Check to see if there is already Trivia data in DB
  // if no make new call to API
  ifAnyAPIData : function (userCategoryChoice) {

    if (this.allQuizApiData.length == 0) {

      // The Database is empty, do new call to API
      api.getCategoryQuestionsAndAnswers(userCategoryChoice);

    }else{

      // Lucky you, the database has Trivia!
      api.getCategoryQuestionsAndAnswers(this.allQuizApiData);
    }

  },

  storeAll : function (jsonReturnData) {

    this.allQuizApiData = jsonReturnData;

  }

};
