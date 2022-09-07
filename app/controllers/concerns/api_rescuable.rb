# frozen_string_literal: true

module ApiRescuable
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActiveRecord::RecordNotUnique, with: :handle_record_not_unique
    rescue_from ActionController::ParameterMissing, with: :handle_api_error
    rescue_from Pundit::NotAuthorizedError, with: :handle_authorization_error
  end

  private

    def handle_validation_error(exception)
      respond_with_error(exception)
    end

    def handle_record_not_found(exception)
      respond_with_error(exception.message, :not_found)
    end

    def handle_record_not_unique(exception)
      respond_with_error(exception)
    end

    def handle_api_error(exception)
      respond_with_error(exception, :internal_server_error)
    end

    def handle_authorization_error
      respond_with_error(t("authorization.denied"), :forbidden)
    end
end
