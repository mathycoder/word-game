class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def show
    @game = Game.find_by(id: params[:id])
    @word_list = Word.create_word_list(@game.letters)
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
