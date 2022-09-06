json.tasks do
  json.pending @pending_tasks do |pending_task|
    json.partial! "tasks/task", task: pending_task
    json.progress pending_task.progress
  end

  json.completed @completed_tasks
end
