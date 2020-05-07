class CommentsController < ApplicationController

    def index
        comments = Comment.order(difference: :desc, upvotes: :desc)
        render json: comments
    end

     def create
        comment = Comment.create(content: params[:content], champion_id: params[:champion_id])
        render json: comment
     end

     def update
        comment = Comment.find_by(id: params[:comment_id])
        if params[:upvotes]
            comment.update(upvotes: params[:upvotes] + 1)
        else
            comment.update(downvotes: params[:downvotes] + 1)
        end
        comment.update(difference: comment.upvotes - comment.downvotes)
        render json: comment
     end
        

end
