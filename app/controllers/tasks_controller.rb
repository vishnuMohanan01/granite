# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :load_task!, only: %i[show update destroy]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :ensure_authorized_update_to_restricted_attrs, only: :update

  def index
    tasks = policy_scope(Task)
    @pending_tasks = tasks.pending.includes(:assigned_user)
    @completed_tasks = tasks.completed
  end

  def create
    task = current_user.created_tasks.new(task_params)
    authorize task
    task.save!
    respond_with_success(t("successfully_created", entity: "Task"))
  end

  def show
    authorize @task
    @comments = @task.comments.order("created_at DESC")
  end

  def update
    authorize @task
    @task.update!(task_params)
    respond_with_success(t("successfully_updated", entity: "Task")) unless params.key?(:quiet)
  end

  def destroy
    authorize @task
    @task.destroy!
    respond_with_success(t("successfully_deleted", entity: "Task")) unless params.key?(:quiet)
  end

  private

    def task_params
      params.require(:task).permit(:title, :assigned_user_id, :progress)
    end

    def load_task!
      @task = Task.find_by!(slug: params[:slug])
    end

    def ensure_authorized_update_to_restricted_attrs
      is_editing_restricted_params = Task::RESTRICTED_ATTRIBUTES.any? { |a| task_params.key?(a) }
      is_not_owner = @task.task_owner_id != @current_user.id
      if is_editing_restricted_params && is_not_owner
        handle_authorization_error
      end
    end
end
