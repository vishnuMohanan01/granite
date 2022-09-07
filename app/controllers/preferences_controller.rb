# frozen_string_literal: true

class PreferencesController < ApplicationController
  before_action :load_preference

  def show
    respond_with_json({ preference: @preference })
  end

  def update
    @preference.update!(preference_params)
    respond_with_success(t("successfully_updated", entity: "Preference"))
  end

  def mail
    @preference.update!(receive_email: preference_params[:receive_email])
    respond_with_success(
      t(
        "preference.mail.notification_status",
        status: @preference.receive_email ? "enabled" : "disabled"
      )
    )
  end

  private

    def preference_params
      params.require(:preference).permit(:notification_delivery_hour, :receive_email)
    end

    def load_preference
      @preference = current_user.preference
      unless @preference
        respond_with_error(t("not_found", entity: "Preference"), :not_found)
      end
    end
end
