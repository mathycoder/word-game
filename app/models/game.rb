class Game < ApplicationRecord
  def test_words
    file = File.open('./app/assets/twl06.txt')
    file.foreach.grep(/hello/)
  end
end
