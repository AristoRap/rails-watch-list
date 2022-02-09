class Movie < ApplicationRecord
  has_many :bookmarks
  has_many :users
  validates :imdb_id, presence: true, uniqueness: true
end
