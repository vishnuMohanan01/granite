# frozen_string_literal: true

require "test_helper"
require "support/sidekiq_helper"
class TodoNotificationServiceTest < ActiveSupport::TestCase
  include SidekiqHelper

  def setup
    @sam = create(:task).assigned_user # assignee of the generated task
    @nancy = create(:task).assigned_user # assignee of another generated task

    default_mail_delivery_time = "#{Constants::DEFAULT_NOTIFICATION_DELIVERY_HOUR}:00 AM"
    travel_to DateTime.parse(default_mail_delivery_time)
  end

  def test_notification_worker_is_invoked_for_users_receiving_mail_for_first_time
    assert_difference -> { @sam.user_notifications.count }, 1 do
      todo_notification_service.process
    end
  end

  def test_notification_worker_is_invoked_for_users_according_to_delivery_hour_preference
    delivery_hour_in_future = Constants::DEFAULT_NOTIFICATION_DELIVERY_HOUR + 1
    @sam.preference.update(notification_delivery_hour: delivery_hour_in_future)

    assert_difference -> { UserNotification.count }, 1 do
      todo_notification_service.process
    end
  end

  def test_notification_worker_is_invoked_only_for_users_with_receive_email_enabled
    @sam.preference.update(receive_email: false)

    assert_difference -> { UserNotification.count }, 1 do
      todo_notification_service.process
    end
  end

  def test_notification_worker_is_invoked_only_for_users_yet_to_receive_notification_today
    create(:user_notification, user: @sam)

    assert_difference -> { UserNotification.count }, 1 do
      todo_notification_service.process
    end
  end

  private

    def todo_notification_service
      TodoNotificationService.new
    end
end
