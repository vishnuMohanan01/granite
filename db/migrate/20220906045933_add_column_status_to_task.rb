# frozen_string_literal: true

class AddColumnStatusToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :status, :string, default: "unstarred", null: false
  end
end
