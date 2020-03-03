class HitsSerializer < ActiveModel::Serializer
  attributes :id, :name, :compilation, :submissions

  def submissions
    playlists = Playlist.where(compilation: false).where().not(top_submission:false)
    top_submissions = playlists.map do |playlist|
      Submission.find(playlist.top_submission)
    end
    return ActiveModel::Serializer::CollectionSerializer.new(
      top_submissions, each_serializer: SubmissionSerializer
    )
  end
end
