class TaskSerializer < ActiveModel::Serializer
  attributes :id, :done, :name
end
