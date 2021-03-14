// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.querySelector('#date')
const year = new Date().getFullYear()
date.innerHTML = year
// ********** close links ************
const navToggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')
const nav = document.querySelector('#nav')
const topLink = document.querySelector('.top-link')
const scrollLinks = document.querySelectorAll('.scroll-link')
function handleToggle() {
  // linksContainer.classList.toggle('show-links')
  const containerHeight = linksContainer.getBoundingClientRect().height
  const linksHeight = links.getBoundingClientRect().height
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`
  } else {
    linksContainer.style.height = 0
  }
}
// ********** fixed navbar ************
window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset
  const navHeight = nav.getBoundingClientRect().height
  scrollHeight > navHeight
    ? nav.classList.add('fixed-nav')
    : nav.classList.remove('fixed-nav')
  scrollHeight > 500
    ? topLink.classList.add('show-link')
    : topLink.classList.remove('show-link')
})
// ********** smooth scroll ************
// select links
scrollLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    //navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1)
    const element = document.getElementById(id)
    //calculate the heights
    const navHeight = nav.getBoundingClientRect().height
    const containerHeight = linksContainer.getBoundingClientRect().height
    const fixedNav = nav.classList.contains('fixed-nav')
    let position = element.offsetTop - navHeight

    if (!fixedNav) {
      position = position - navHeight
    }
    if (navHeight > 82) {
      position = position + containerHeight
    }
    window.scrollTo({
      left: 0,
      top: position,
    })
    linksContainer.style.height = 0
  })
})
