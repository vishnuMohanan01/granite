# frozen_string_literal: true

class AddEmailAndPasswordDigestToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :email, :string, null: false, index: { unique: true }
    add_column :users, :password_digest, :string, null: false
  end
end
