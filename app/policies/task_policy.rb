# frozen_string_literal: true

class TaskPolicy
  attr_reader :user, :task

  def initialize(user, task)
    @user = user
    @task = task
  end

  # The show policy check is invoked when we call `authorize @task`
  # from the show action of tasks controller.
  # Here the condition we want to check is that
  # whether the record's creator is current user or record is assigned to the current user.
  def show?
    task.task_owner_id == user.id || task.assigned_user_id == user.id
  end

  def edit?
    show?
  end

  # Only owner is allowed to update a task.
  def update?
    show?
  end

  # Every user can create a task, hence create? will always returns true.
  def create?
    true
  end

  # Only the user that has created the task, can delete it.
  def destroy?
    task.task_owner_id == user.id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(task_owner_id: user.id).or(scope.where(assigned_user_id: user.id))
    end
  end
end
