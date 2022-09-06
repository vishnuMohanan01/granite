# frozen_string_literal: true

json.id task.id
json.title task.title
json.slug task.slug
json.assigned_user do
  json.extract! task.assigned_user,
    :id,
    :name
end
