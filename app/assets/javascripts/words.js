document.addEventListener("DOMContentLoaded", () => {
  loadWords()
  document.querySelector('input').addEventListener('keydown', enter)
})

function loadWords(){
  fetch(`/games.json`)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(word => {
        new Word(word)
      })
      renderWords()
    })
}

function renderWords(){
  document.querySelector('.letters').innerText = words[words.length-1].shuffle()
  words.forEach(word => {
    let wordDiv = document.createElement('div')
    wordDiv.className = "word"
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
    }

  }
}
