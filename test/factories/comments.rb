# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    user
    task
    content { Faker::Lorem.paragraph }
  end
end
