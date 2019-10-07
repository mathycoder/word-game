class Word < ApplicationRecord

  def word_hidden
    hidden = ''
    self.word.length.times do
      hidden += "▓ "
    end
    hidden
  end

  def self.create_dictionary
    file = File.open('./app/assets/twl06.txt')
    File.open('./app/assets/twl06.txt', "r").each_line do |word|
      word = word.split(/\n/)[0]
      if word.length >= 3 && word.length <=6
        Word.create(word: word.upcase)
      end
    end
  end

  def self.create_word_list(letters)
    word_list = []
    letters_array = letters.upcase.split("")
    [3, 4, 5, 6].each do |i|
      letters_array.permutation(i).to_a.each do |letters|
        word = letters.join
        word_obj =  Word.find_by(word: word)
        word_list << word_obj if word_obj
        #word_list << word.upcase if Word.find_by(word: word)
      end
    end
    word_list.uniq
  end
end
