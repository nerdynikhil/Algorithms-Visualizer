const generateArrayBtn = document.getElementById("generate-array");
const elementToSearch = document.getElementById("valueForSearch");
const searchBtn = document.getElementById("search");
const linearSearchBtn = document.getElementById("linear-search");
const binarySearchBtn = document.getElementById("binary-search");
const arrowIcons = document.getElementsByClassName("box-item-icon");

// colors
const successColor = "#32E0C4";
const failureColor = "#FB3640";

let randomArray = [];
let randomSortedArray = [];
let searchType = "linear";

// generate random numbers first time
insertRandomArray();

// event listner for generating new array
generateArrayBtn.addEventListener("click", () => {
  insertRandomArray();
});

// event listner for searching an element in an array
searchBtn.addEventListener("click", () => {
  let element = elementToSearch.value;
  if (element != "") {
    const searchValue = parseInt(element);
    if (searchType === "linear") {
      disable();
      linearSearch(randomArray, searchValue);
    }

    if (searchType === "binary") {
      disable();
      binarySearch(
        randomSortedArray,
        searchValue,
        0,
        randomSortedArray.length - 1
      );
    }
  }
});

// event listner for selecting type of search method(linear or binary)
// for linear search
linearSearchBtn.addEventListener("click", () => {
  binarySearchBtn.style.borderBottomColor = "#658ec6";
  linearSearchBtn.style.borderBottom = "3px solid #243441";
  searchType = "linear";
});

// for binary search
binarySearchBtn.addEventListener("click", () => {
  linearSearchBtn.style.borderBottomColor = "#658ec6";
  binarySearchBtn.style.borderBottom = "3px solid #243441";
  if (searchType != "binary") {
    searchType = "binary";
    insertRandomArray();
  }
});
