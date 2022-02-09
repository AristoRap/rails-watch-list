class Favorite < ApplicationRecord
  belongs_to :user, dependent: :destroy
  validates :movie_id, presence: true, uniqueness: { scope: :user }
end
