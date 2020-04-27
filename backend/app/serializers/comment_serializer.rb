class CommentSerializer
    include FastJsonapi::ObjectSerializer
    attributes :content, :upvotes, :downvotes, :champion_id
    belongs_to :champion

end