class Tag < ActiveRecord::Base
	has_many :taggings
	has_many :tags, through: :taggings

	def to_s
		name
	end

end
