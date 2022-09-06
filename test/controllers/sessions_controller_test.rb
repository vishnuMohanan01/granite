# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
  end

  def test_should_login_user_with_valid_credentials
    post session_path, params: { login: { email: @user.email, password: @user.password } }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @user.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post session_path, params: { login: { email: @user.email, password: "invalid password" } }, as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["error"], t("session.incorrect_credentials")
  end

  def test_should_respond_with_not_found_error_if_user_is_not_present
    non_existent_email = "this_email_does_not_exist_in_db@example.email"
    post session_path, params: { login: { email: non_existent_email, password: "welcome" } }, as: :json
    assert_response :not_found
    response_json = response.parsed_body
    assert_equal response_json["error"], "Couldn't find User"
  end
end
