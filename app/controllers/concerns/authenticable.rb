module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_using_x_auth_token
  end

  private

    def authenticate_user_using_x_auth_token
      user_email = request.headers["X-Auth-Email"].presence
      auth_token = request.headers["X-Auth-Token"].to_s
      user = user_email && User.find_by!(email: user_email)
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(user.authentication_token, auth_token)
      if is_valid_token
        @current_user = user
      else
        respond_with_error(t("session.could_not_auth"), :unauthorized)
      end
    end
