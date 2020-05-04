class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments
    end

     def create
        comment = Comment.create(content: params[:content], champion_id: params[:champion_id], upvotes: 1, downvotes: 0)
        render json: comment
     end
        

end
