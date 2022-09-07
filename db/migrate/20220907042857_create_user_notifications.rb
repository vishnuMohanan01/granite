# frozen_string_literal: true

class CreateUserNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :user_notifications do |t|
      t.date :last_notification_sent_date, null: false
      t.references :user, foreign_key: true
      t.index [:user_id, :last_notification_sent_date],
        name: :index_user_preferences_on_user_id_and_notification_sent_date,
        unique: true
      t.timestamps
    end
  end
end
