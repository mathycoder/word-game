let points = 0
let interval
let nextRound = false

document.addEventListener("DOMContentLoaded", () => {
  loadWords()
  document.querySelector('input').addEventListener('keydown', enter)
  document.querySelector('.reset').addEventListener('click', resetGame)
})

function resetGame(){
  if (!nextRound) { document.querySelector('.points h1').innerText = "0" }
  nextRound = false
  document.querySelector('.next-round h1').innerText = ""
  interval.reset()
  document.querySelector('.word-list').innerHTML = ""
  document.querySelector('.letters').innerHTML = ""
  words = []
  loadWords()
}

function loadWords(){
  fetch(`/games.json`)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(word => {
        new Word(word)
      })
      renderWords()
      interval = new Timer()
    })
}

function renderWords(){
  document.querySelector('.letters').innerText = words[words.length-1].shuffle()
  words.forEach(word => {
    let wordDiv = document.createElement('div')
    wordDiv.className = "word"
    wordDiv.classList.add("unrevealed")
    wordDiv.id = `word-${word.id}`
    wordDiv.innerText = word.wordHidden()
    document.querySelector('.word-list').appendChild(wordDiv)
  })
}

function enter(event) {
  if (event.which === 13) {
    const inputedWord = document.querySelector('input').value.toUpperCase()
    console.log(inputedWord)
    document.querySelector('input').value = ""
    const word = Word.find(inputedWord)
    if (word) {
      let el = document.querySelector(`.word#word-${word.id}`)
      el.innerText = word.word
      el.classList.add("revealed")
      el.classList.remove("unrevealed")
      const newPoints = Number.parseInt(document.querySelector('.points').innerText) + word.word.length
      document.querySelector('.points').innerHTML = `<h1>${newPoints}</h1>`
      if (word.word.length === 6) {
        document.querySelector('.next-round').innerHTML = "<h1>Pass to Next Round!</h1>"
        nextRound = true
      }
    }

  }
}
