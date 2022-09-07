# frozen_string_literal: true

class TodoNotificationService
  attr_reader :users_to_notify

  def initialize
    @users_to_notify = get_users_to_notify
  end

  def process
    notify_users
  end

  private

    def get_users_to_notify
      users = get_users_with_pending_tasks
      users_with_pending_notifications(users)
    end

    def notify_users
      users_to_notify.each do |user|
        UserNotificationsWorker.perform_async(user.id)
      end
    end

    def get_users_with_pending_tasks
      User.includes(:assigned_tasks, :preference).where(
        tasks: { progress: "pending" },
        preferences: {
          receive_email: true,
          notification_delivery_hour: hours_till_now
        }
      )
    end

    def users_with_pending_notifications(users)
      no_mail_sent = "user_notifications.last_notification_sent_date <>"
      first_time_mailing = "user_notifications.id is NULL"
      delivery_condition = "#{no_mail_sent} ? OR #{first_time_mailing}"

      users.left_outer_joins(:user_notifications)
        .where(delivery_condition, Time.zone.today).distinct
    end

    def hours_till_now
      current_hour = Time.now.utc.hour
      (0..current_hour)
    end
end
