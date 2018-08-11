header = document.getElementsByTagName("header")[0]
parallax = document.getElementsByClassName("parallax")[0]
article = document.getElementsByTagName("article")[0]

window.addEventListener 'scroll', ->
  scrolltop = window.pageYOffset

  header.style.opacity = 1 - scrolltop * .02
  
  parallax.style.opacity = 1 - scrolltop * .003
  parallax.style.top = -scrolltop * .32 + 40 + 'px'