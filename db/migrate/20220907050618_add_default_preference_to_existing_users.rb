# frozen_string_literal: true

class AddDefaultPreferenceToExistingUsers < ActiveRecord::Migration[6.1]
  def up
    users_with_nil_preference = User.where.missing(:preference)
    users_with_nil_preference.each do |user|
      user.send(:build_default_preference)
      user.save!
    end
   end

  def down
    User.find_each do |user|
      user.preference.delete
    end
  end
end
