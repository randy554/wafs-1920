import '../lib/routie.js';
import { render } from './render.js';
import { data } from './data.js';
import { helper } from './helper.js';

routie({
    'quiz/:id': function(id) {

        data.ifAnyAPIData(id);

        render.toggleLoader("on");

    },

    'results': function () {

        // API Questions & correct answers from local storage
        let lStorageApiData = data.getLocalStorage()

        // User answers
        data.getUserAnswers();

        // Match user answers with correct answers and calculate score
        function calculateScore(accumulator, currentValue, currentIndex) {


            if(currentValue === lStorageApiData[currentIndex].correct_answer){

                // Store the API in Local Storage
                lStorageApiData[currentIndex].userNieuweAnt = "goed";
                localStorage.setItem('APIdata', JSON.stringify(lStorageApiData));
                accumulator++;
            }else {

                lStorageApiData[currentIndex].userNieuweAnt = "fout";
                localStorage.setItem('APIdata', JSON.stringify(lStorageApiData));

            }

            return accumulator;
        }

        data.totalScore = data.userAnswers.reduce(calculateScore, 0);

        data.calcScore(lStorageApiData);

        // Display results page
        render.resultsPage(helper.getResultsPage(), data.userAnswers, lStorageApiData, data.totalScore);



    }

});



