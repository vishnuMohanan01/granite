# frozen_string_literal: true

class TasksController < ApplicationController
  def index
    tasks = Task.all
    render status: :ok, json: { tasks: tasks }
  end

  def create
    task = Task.new(task_params)
    task.save!
    respond_with_success("Task was successfully created")
  end

  private

    def task_params
      params.require(:task).permit(:title)
    end
end
