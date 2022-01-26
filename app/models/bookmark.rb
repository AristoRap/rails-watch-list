class Bookmark < ApplicationRecord
  belongs_to :movie
  belongs_to :list, dependent: :destroy

  validates :movie, presence: true, uniqueness: { scope: :list }
  validates :comment, presence: true, length: { minimum: 6 }
end
