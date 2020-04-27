class ChampionSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :image_url
    has_many :comments

end