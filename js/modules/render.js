
export const render = {

  // Toggle submit button in questions form
  toggleSubmitButton : function (state) {

    if(state === "on"){

      document.querySelector("button[type=submit]").style.display = "block";

    }else if (state === "off") {

      document.querySelector("button[type=submit]").style.display = "none";
    }

  },

  // Toggle the quiz page
  toggleQuizPage : function (state) {

    if(state === "on"){

      document.querySelector("#quiz").style.display = "grid";

    }else if (state === "off") {

      document.querySelector("#quiz").style.display = "none";
    }

  },

  // Toggle the results page
  toggleResultsPage : function (state) {

    if(state === "on"){

      document.querySelector("#results").style.display = "grid";

    }else if (state === "off") {

      document.querySelector("#results").style.display = "none";
    }

  },

  toggleMenu : function (state) {

    if(state === "on"){

      document.querySelector("#categoryList").style.display = "block";

    }else if(state === "off") {

      document.querySelector("#categoryList").style.display = "none";
    }

  },

  // Generate quiz questions and answer options
  questionsAndAnswerOptions : function (data, ulQuestionList) {

    // Remove menu
    this.toggleMenu("off");

    // Display the quiz page
    this.toggleQuizPage("on");

    data.results.map((triviaObject, index) => {

      // Add list item to UL element
      let divBlock  = document.createElement("DIV");
      divBlock.setAttribute("class","questionBlock");
      ulQuestionList.appendChild(divBlock);

      divBlock.insertAdjacentHTML('beforeend', `<li class="quizQuestions">${index+1}. ${triviaObject.question}</li>`);
      divBlock.insertAdjacentHTML('beforeend', `<input id=yes${index} type="radio" name=${index+1} value="True" required> `);
      divBlock.insertAdjacentHTML('beforeend', `<label for=yes${index}>True</label>`);
      divBlock.insertAdjacentHTML('beforeend', `<input id=no${index} type="radio" name=${index+1} value="False">`);
      divBlock.insertAdjacentHTML('beforeend', `<label for=no${index}>False</label>`);

    });

    // Display submit button
    this.toggleSubmitButton("on");

  },

  // Generate quiz results
  resultsPage : function (headPageElement, apiData, userData, score) {

    // Remove menu
    this.toggleMenu("off");

    // Show the quiz page
    this.toggleResultsPage("on");

    // Hide the quiz page
    this.toggleQuizPage("off");

    // Set filters
    this.setFilterGoed(headPageElement, apiData, userData, score);
    this.setFilterFout(headPageElement, apiData, userData, score);

    // Add header text to page
    let h2        = document.createElement("H2");
    let textScore = document.createTextNode(`Je hebt ${score} van de 12 goed!`);
    h2.appendChild(textScore);
    headPageElement.appendChild(h2);


    userData.map((triviaObject, index) => {

      let divBlock  = document.createElement("DIV");
      divBlock.setAttribute("class","questionBlock");
      headPageElement.appendChild(divBlock);

      divBlock.insertAdjacentHTML('beforeend', `<p class="quizQuestions">Vraag ${index+1} : ${triviaObject.question}</p>`);

      if(triviaObject.correct_answer === apiData[index]) {

        divBlock.insertAdjacentHTML('beforeend', `<p class="True">Jouw antwoord: ${apiData[index]}</p>`);

      } else {

        divBlock.insertAdjacentHTML('beforeend', `<p class="False">Jouw antwoord: ${apiData[index]}</p>`);

      }
      divBlock.insertAdjacentHTML('beforeend', `<p>Juiste antwoord: ${triviaObject.correct_answer}</p>`);

    });

    // Display submit button
    this.toggleSubmitButton("on");

  },

  // Generate quiz results
  updateResultsPage : function (headPageElement, apiData, userData, score) {

    headPageElement.innerHTML = "";

    // Remove menu
    this.toggleMenu("off");

    // Show the quiz page
    this.toggleResultsPage("on");

    // Hide the quiz page
    this.toggleQuizPage("off");


    // Button container
    let divFilter = document.createElement("DIV");
    divFilter.setAttribute("id", "filter");


    // All button
    let allButton = document.createElement("BUTTON");
    allButton.setAttribute("id", "all");
    let allText   = document.createTextNode("All");
    allButton.appendChild(allText);

       // Header element
    let h2        = document.createElement("H2");
    let textScore = document.createTextNode(`Je hebt ${score} van de 12 goed!`);
    h2.appendChild(textScore);

    // Add button to container
    divFilter.appendChild(allButton);

    // Insert elements one after the other
    headPageElement.appendChild(divFilter);
    headPageElement.appendChild(h2);

    // Set reset filter
    this.resetFilter();

    userData.map((triviaObject, index) => {

      let divBlock  = document.createElement("DIV");
      divBlock.setAttribute("class","questionBlock");
      headPageElement.appendChild(divBlock);

      if ( triviaObject.userNieuweAnt == "goed") {

        divBlock.insertAdjacentHTML('beforeend', `<p class="quizQuestions">Vraag : ${triviaObject.question}</p>`);

        divBlock.insertAdjacentHTML('beforeend', `<p class="True">Juiste antwoord: ${triviaObject.correct_answer}</p>`);

      } else {

        divBlock.insertAdjacentHTML('beforeend', `<p class="quizQuestions">Vraag : ${triviaObject.question}</p>`);

        divBlock.insertAdjacentHTML('beforeend', `<p class="False">Juiste antwoord: ${triviaObject.correct_answer}</p>`);

      }

    });

    // Display submit button
    this.toggleSubmitButton("on");

  },

  toggleLoader: function (state) {

    if(state === "on"){

      document.querySelector(".loaderBlock").style.display = "flex";

    }else if(state === "off") {

      document.querySelector(".loaderBlock").style.display = "none";
    }

  },

  resetFilter : function () {

    const allFilter  = document.querySelector("#all");

    allFilter.addEventListener("click", function (element) {

        // Reload webpage
        location.reload();

    });
  },

  setFilterGoed : function (headPageElement, apiData, userData, score) {

    const goedFilter  = document.querySelector("#goed");

    goedFilter.addEventListener("click", function (element) {

        function showOnly (currentValue) {

          return currentValue.userNieuweAnt == "goed";

        }

        let rightAnswers = userData.filter(showOnly);
        render.updateResultsPage(headPageElement, apiData, rightAnswers, score);

    });

  },

  setFilterFout : function (headPageElement, apiData, userData, score) {

    const foutFilter  = document.querySelector("#fout");

    foutFilter.addEventListener("click", function (element) {

        function showOnly (currentValue) {

          return currentValue.userNieuweAnt == "fout";

        }

        let wrongAnswers = userData.filter(showOnly);

        headPageElement.insertAdjacentHTML('beforeend', `<div id="filter">
            <button id="goed">Goed</button>
            <button id="all">All</button>
            <button id="fout">Fout</button>
        </div>`);

        render.updateResultsPage(headPageElement, apiData, wrongAnswers, score);

    });

  }


};
