# frozen_string_literal: true

require "test_helper"
require "minitest/mock"

class FlakyEnvVariableTest < ActiveSupport::TestCase
  # def teardown
  #   #reset the env variables
  #   Rails.env = "test"
  # end

  def test_one_check_the_env_value
    assert_equal Rails.env, "test"
  end

  def test_two_check_the_env_value
    assert_equal Rails.env, "test"
  end

  def test_three_check_the_env_value
    assert_equal Rails.env, "test"
  end

  def test_four_check_the_env_value
    assert_equal Rails.env, "test"
  end

  def test_five_check_the_env_value
    assert_equal Rails.env, "test"
  end

  def test_update_the_env_value
    Rails.stub :env, "production" do
      assert_equal Rails.env, "production"
    end
    assert_equal Rails.env, "test"
  end
end
