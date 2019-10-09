let points = 0
let interval
let tiles
let nextRound = false

document.addEventListener("DOMContentLoaded", () => {
  loadWords()
  document.querySelector('.reset').addEventListener('click', resetGame)
  document.addEventListener('keydown', keyListener)
})

function keyListener(event){
  tiles.typed(event)
  document.querySelector('.letters.untyped').innerHTML = tiles.renderUntypedTiles()
  document.querySelector('.letters.typed').innerHTML = tiles.renderTypedTiles()
}

function resetGame(){
  this.blur()
  if (!nextRound) { document.querySelector('.points h1').innerText = "0" }
  nextRound = false
  document.querySelector('.next-round h1').innerText = ""
  interval.reset()
  document.querySelector('.word-list').innerHTML = ""
  document.querySelector('.letters.typed').innerHTML = ""
  document.querySelector('.letters.untyped').innerHTML = ""
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
  document.querySelector('.word-list').style.columns = Math.ceil(words.length / 15)
  document.querySelector('.word-list').style.width = `${Math.ceil(words.length / 15)*150}px`
  tiles = new Tile(words[words.length-1])
  document.querySelector('.letters.untyped').innerHTML = tiles.renderUntypedTiles()
  words.forEach(word => {
    let wordDiv = document.createElement('div')
    wordDiv.className = "word"
    wordDiv.classList.add("unrevealed")
    wordDiv.id = `word-${word.id}`
    wordDiv.innerText = word.wordHidden()
    document.querySelector('.word-list').appendChild(wordDiv)
  })
}
