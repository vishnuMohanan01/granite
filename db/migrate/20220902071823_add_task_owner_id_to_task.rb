# frozen_string_literal: true

class AddTaskOwnerIdToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :task_owner_id, :integer
    add_foreign_key :tasks, :users, column: :task_owner_id, on_delete: :cascade
  end
end
