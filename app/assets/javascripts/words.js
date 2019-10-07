document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('input').addEventListener('keydown', enter)
})

function enter(event) {
  if (event.which === 13) {
    const inputedWord = document.querySelector('input').value.toUpperCase()
    console.log(inputedWord)
    document.querySelector('input').value = ""
    let el = document.querySelector(`.word[data-word = "${inputedWord}"]`)
    if (el){
      el.style.backgroundColor = "yellow"
    }
  }
}
