class Timer {
  constructor(){
    this.seconds = 61
    this.interval = setInterval(this.classInterval.bind(this), 1000)
  }

  reset(){
    clearInterval(this.interval)
  }

  classInterval(){
    if (this.seconds > 0){
      this.seconds--
      document.querySelector('.timer h1').innerHTML = `${this.displayTime()}`
    } else {
      this.reset()
      if (nextRound === false) { document.querySelector('.next-round').innerHTML = "<h1>Game Over </h1>" }
      document.querySelectorAll('.unrevealed').forEach(el => {
        const word = Word.find_by_id(Number.parseInt(el.id.split("-")[1]))
        el.innerText = word.word
        el.classList.add("missed")
      })
    }
  }

  displayTime(){
    let secondHand = `${this.seconds % 60}`
    if (secondHand.length===1) { secondHand = `0${secondHand}` }
    const minuteHand = Math.floor(this.seconds / 60)
    return `0${minuteHand}:${secondHand}`
  }
}
