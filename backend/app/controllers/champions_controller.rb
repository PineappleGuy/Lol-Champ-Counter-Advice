class ChampionsController < ApplicationController

    def index
        champions = Champion.all
        render json: ChampionSerializer.new(champions)
    end

end
