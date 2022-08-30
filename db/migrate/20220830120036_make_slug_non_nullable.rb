# frozen_string_literal: true

class MakeSlugNonNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :tasks, :slug, false
  end
end
