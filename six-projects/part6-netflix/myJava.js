let imageOpen = document.getElementById("imageOpen");
let imageClose = document.getElementById("imageClose");
let divContent = document.getElementById("divContent");
let divRed = document.getElementById("divRed");
let divBlack = document.getElementById("divBlack");

imageOpen.addEventListener("click", () => {
  divBlack.classList = [];
  void divBlack.offsetHeight;

  divBlack.classList.add("doAnim");
  divBlack.classList.add("classDivBlack");
  setTimeout(() => {
    divRed.classList = [];
    void divRed.offsetHeight;
    divRed.classList.add("doAnim");
    divRed.classList.add("classDivRed");
  }, 200);

  setTimeout(() => {
    divContent.classList = [];
    void divContent.offsetHeight;
    divContent.classList.add("doAnim");
    divContent.classList.add("classDivWhite");
  }, 400);
});

imageClose.addEventListener("click", () => {
  divContent.classList = [];
  void divContent.offsetHeight;
  divContent.classList.add("reverseAnim");
  divContent.classList.add("classDivWhite");

  setTimeout(() => {
    divRed.classList = [];
    void divRed.offsetHeight;
    divRed.classList.add("reverseAnim");
    divRed.classList.add("classDivRed");
  }, 200);

  setTimeout(() => {
    divBlack.classList = [];
    void divBlack.offsetHeight;
    divBlack.classList.add("reverseAnim");
    divBlack.classList.add("classDivBlack");
  }, 400);
});
