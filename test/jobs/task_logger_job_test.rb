# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class TaskLoggerJobTest < ActiveJob::TestCase
  def setup
    @task = create(:task)
  end

  test "logger runs once after creating a new task" do
    assert_enqueued_with(job: TaskLoggerJob, args: [@task])
    perform_enqueued_jobs
    assert_performed_jobs 1
  end

  test "log count increments on running task logger" do
    Sidekiq::Testing.inline!
    assert_difference "Log.count", 1 do
      TaskLoggerJob.new.perform(@task)
    end
  end
end
