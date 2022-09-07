# frozen_string_literal: true

require "test_helper"

class PreferenceTest < ActiveSupport::TestCase
  def setup
    user = create(:user)
    @preference = user.preference
  end

  def test_notification_delivery_hour_must_be_present_and_valid
    @preference.notification_delivery_hour = nil
    assert @preference.invalid?
    assert_includes @preference.errors.messages[:notification_delivery_hour], t("errors.messages.blank")
  end

  def test_notification_delivery_hour_should_be_in_range
    invalid_hours = [-10, -0.5, 10.5, 23.5, 24]

    invalid_hours.each do |hour|
      @preference.notification_delivery_hour = hour
      assert @preference.invalid?
    end
  end
end
