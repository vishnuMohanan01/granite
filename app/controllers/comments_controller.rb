# frozen_string_literal: true

class CommentsController < ApplicationController
  before_action :load_task!

  def create
    comment = @task.comments.new(comment_params.merge(user: current_user))
    comment.save!
    respond_with_json
  end

  private

    def load_task!
      @task = Task.find_by!(id: comment_params[:task_id])
    end

    def comment_params
      params.require(:comment).permit(:content, :task_id)
    end
end
