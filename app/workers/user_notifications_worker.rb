# frozen_string_literal: true

class UserNotificationsWorker
  include Sidekiq::Worker

  def perform(user_id)
    TaskMailer.delay.pending_tasks_email(user_id)
  end
end
