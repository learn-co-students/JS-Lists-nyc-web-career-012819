class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :priority
  has_many :tasks
end
