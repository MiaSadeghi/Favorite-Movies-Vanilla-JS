let movies = [];
let currentMovie;
const addMovieBtn = document.getElementById("addMovieBtn");
const movieList = document.getElementById("movie-list");
const entryTextSection = document.getElementById("entry-text");
//add modal DOM elements
const modal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const modalActions = document.querySelector(".modal__actions");
const addModalCancelBtn = modalActions.querySelectorAll("button")[0];
const addModalAddBtn = modalActions.querySelectorAll("button")[1];
const userInputs = modal.querySelectorAll("input");

//delete Modal DOM elements
const deleteModal = document.getElementById("delete-modal");
const deleteModalActions = deleteModal.querySelector(".modal__actions");
const deleteModalNoBtn = deleteModalActions.querySelectorAll("button")[0];
const deleteModalYesBtn = deleteModalActions.querySelectorAll("button")[1];

const toggleEntryTextSection = () => {
  entryTextSection.style.display = movies.length === 0 ? "block" : "none";
};

const toggleAddMovieModal = () => {
  modal.classList.toggle("visible");
  backdrop.classList.toggle("visible");
};

const toggleDeleteMovieModal = () => {
  deleteModal.classList.toggle("visible");
  backdrop.classList.toggle("visible");
};

const clearInputValues = () => {
  for (const input of userInputs) {
    input.value = "";
  }
};

const deleteMovie = (e) => {
  const currentMovieTitle = currentMovie.querySelector("h2").textContent;
  removeEventListener;
  movies = movies.filter((movie) => movie.title !== currentMovieTitle);
  currentMovie.remove();
  toggleEntryTextSection();
  toggleDeleteMovieModal();
};

const setCurrentMovie = (e) => {
  currentMovie = e.currentTarget;
  toggleDeleteMovieModal();
};

const renderNewMovieElement = (movieObj) => {
  const newMovieEl = document.createElement("li");
  newMovieEl.className = "movie-element";
  newMovieEl.innerHTML = `
  <div class="movie-element__image">
  <img src="${movieObj.imgUrl} alt="${movieObj.title}">
  </div>
  <div class="movie-element__info">
  <h2>${movieObj.title}</h2>
  <p>${movieObj.rating}/5 stars</p>
  </div>
  `;

  currentMovie = newMovieEl;
  newMovieEl.addEventListener("click", setCurrentMovie);
  movieList.append(newMovieEl);
};

const addMovie = () => {
  const title = userInputs[0].value;
  const imgUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === "" ||
    imgUrl.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    return alert("invalid input values.");
  }

  const newMovie = { title, imgUrl, rating };
  movies.push(newMovie);
  renderNewMovieElement(newMovie);
  clearInputValues();
  toggleEntryTextSection();
  toggleAddMovieModal();
  console.log(movies);
};
//adding event listeners to DOM elements
addMovieBtn.addEventListener("click", toggleAddMovieModal);
addModalCancelBtn.addEventListener("click", toggleAddMovieModal);
addModalAddBtn.addEventListener("click", addMovie);
deleteModalNoBtn.addEventListener("click", toggleDeleteMovieModal);
deleteModalYesBtn.addEventListener("click", deleteMovie);
