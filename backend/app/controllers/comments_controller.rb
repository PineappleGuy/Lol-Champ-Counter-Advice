class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments
    end

     def create
        comment = Comment.create(content: params[:content], champion_id: params[:champion_id], upvotes: 1, downvotes: 0)
        render json: comment
     end

     def update
        comment = Comment.find_by(id: params[:comment_id])
        if params[:upvotes]
            comment.update(upvotes: params[:upvotes] + 1)
        else
            comment.update(downvotes: params[:downvotes] + 1)
        end
        render json: comment
     end
        

end
