# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  include ActionView::Helpers::TranslationHelper
  self.abstract_class = true
end
