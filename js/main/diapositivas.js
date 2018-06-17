var slideIndex = 1;
var timeout;
showSlides(slideIndex);

function currentSlide(n) {
  clearTimeout(timeout);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  console.log("index: " + slideIndex);
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  timeout = setTimeout(showSlides, 5000);
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
}
