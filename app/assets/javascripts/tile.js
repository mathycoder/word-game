class Tile {
  constructor(word){
    this.word = word.shuffle()
    this.untypedTiles = this.word.split("")
    this.typedTiles = []
  }

  typed(event){
    const inputKey = String.fromCharCode(event.keyCode)
    if (this.untypedTiles.includes(inputKey)){
      this.typedTiles.push(inputKey)
      const index = this.untypedTiles.indexOf(inputKey)
      this.untypedTiles.splice(index, 1)
    } else if (event.which === 13) {
      this.wordSubmit()
    } else if (event.which === 8 && this.untypedTiles.length < 6) {
      this.untypedTiles.unshift(this.typedTiles.pop())
    }
  }

  wordSubmit(){
    const inputedWord = this.typedTiles.join("")
    this.untypedTiles = this.word.split("")
    this.typedTiles = []
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

  renderTypedTiles(){
    let html = ''
    this.typedTiles.forEach(tile => {
      html += `
        <div class="tile">
          ${tile}
        </div>
      `
    })
    return html
  }

  renderUntypedTiles(){
    let html = ''
    this.untypedTiles.forEach(tile => {
      html += `
        <div class="tile">
          ${tile}
        </div>
      `
    })
    return html
  }
}
