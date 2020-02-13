class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :album, :artists, :description, :duration_ms, :external_url,  :image, :name, :preview_url, :track_id
end
