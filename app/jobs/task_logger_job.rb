# frozen_string_literal: true

class TaskLoggerJob < ApplicationJob
  sidekiq_options queue: :default, retry: 3
  queue_as :default

  def perform(task)
    msg = "A task was created with the following title: #{task.title}"
    log = Log.create! task_id: task.id, message: msg

    puts log.message
  end
end
