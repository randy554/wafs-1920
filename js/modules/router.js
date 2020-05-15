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

        let lokaleFly = JSON.parse(localStorage.getItem('APIdata'));

        data.getUserAnswers();

        function calculateScore(accumulator, currentValue, currentIndex) {


            if(currentValue === lokaleFly[currentIndex].correct_answer){

                      // Store the API in Local Storage
                lokaleFly[currentIndex].userNieuweAnt = "goed";
                localStorage.setItem('APIdata', JSON.stringify(lokaleFly));
                accumulator++;
            }else {

                lokaleFly[currentIndex].userNieuweAnt = "fout";
                localStorage.setItem('APIdata', JSON.stringify(lokaleFly));

            }

            return accumulator;
        }

        data.totalScore = data.userAnswers.reduce(calculateScore, 0);

        // Display results page
        render.resultsPage(helper.getResultsPage(), data.userAnswers, lokaleFly, data.totalScore);



    }

});



