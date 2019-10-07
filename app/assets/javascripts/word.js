words = []
class Word {
  constructor(attributes){
    this.id = attributes.id
    this.word = attributes.word
    words.push(this)
  }

  static find(searchWord){
    return words.find(word => word.word === searchWord)
  }

  wordHidden(){
    let hidden = ''
    for (let i=1; i<= this.word.length; i++){
      hidden += "▓ "
    }
    return hidden
  }

  shuffle(){
    let array = this.word.split("")
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array.join("")
  }

}
