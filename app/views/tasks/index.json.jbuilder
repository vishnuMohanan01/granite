# frozen_string_literal: true

json.tasks do
  json.pending @pending_tasks do |pending_task|
    json.partial! "tasks/task", task: pending_task
    json.extract! pending_task,
      :progress,
      :status
  end

  json.completed @completed_tasks
end
