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
      comment.update(upvotes: params[:upvotes], downvotes: params[:downvotes], difference: params[:difference])
      render json: comment
   end
        

end
