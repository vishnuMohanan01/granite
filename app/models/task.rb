class Task < ApplicationRecord
    MAXIMUM_TITLE_LENGTH = 125
    validates :title, {presence: true, length: {maximum: MAXIMUM_TITLE_LENGTH}}
end