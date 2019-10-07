class GamesController < ApplicationController
  def index
    #@games = Game.all
    random_word = Word.where("LENGTH(word) = ?", 6).sample
    @word_list = Word.create_word_list(random_word.word)

    respond_to do |format|
      format.html
      format.json {render json: @word_list}
    end
  end

  def show
    @game = Game.find_by(id: params[:id])
    @word_list = Word.create_word_list(@game.letters)

    respond_to do |format|
      format.html
      format.json {render json: @word_list}
    end
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    @game.save ? (redirect_to(games_path)) : (render 'new')
  end

  def edit
    @game = Game.find_by(id: params[:id])
  end

  def update
    @game = Game.find_by(id: params[:id])
    @game.update(game_params) ? (redirect_to(games_path)) : (render 'edit')
  end

  def destroy
    @game = Game.find_by(id: params[:id])
    @game.destroy
    redirect_to(games_path)
  end

  private

  def game_params
    params.require(:game).permit(:letters)
  end
end
