# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    @user = User.find_by!(email: login_params[:email].downcase)
    unless @user.authenticate(login_params[:password])
      respond_with_error(t("session.incorrect_credentials"), :unauthorized)
    end
  end

  def destroy
    @current_user = nil
    # any other session cleanup tasks can be done here...
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
