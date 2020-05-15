
export const helper = {

  getResultsPage : function () {
    let divResults  = document.querySelector("#results");
    return divResults;
  },

  getQuestionList : function () {
    let ulQuestionList  = document.querySelector("#questionList");
    return ulQuestionList;
  },

  // Retrieve the list item ID that was clicked & remove the
  // questions from the questions unordered list
  getCategoryChoice : function () {

    // Get the root element of the unordered lists
    const ulCategoryList     = document.querySelector("#categoryList");

    // A variable to store user input
    let userCategoryChoice  = "";

    ulCategoryList.addEventListener("click", function (element) {

      // If it is a list item that has been clicked
      if(element.target.tagName === ("LI")){

        // Assign the list item ID to the variable
        userCategoryChoice = element.target.getAttribute("data-category-id");

        // Remove if any previous questions from the unordered list
        let ulQuestionList = helper.getQuestionList();
        ulQuestionList.textContent = "";

        // Redirect to quiz page per category
        location.replace(location.href + '#quiz/' + userCategoryChoice);

      }

    });

  }

};
