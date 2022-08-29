# frozen_string_literal: true

class MakeTitleNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :tasks, :title, false
  end
end
