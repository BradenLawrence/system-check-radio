playlist1 = Playlist.create(name: "playlist1")
submissions = [
  { track: "song1", description: "My fav song",     playlist: playlist1 },
  { track: "song2", description: "My 2nd fav song", playlist: playlist1 },
  { track: "song3", description: "My 3rd fav song", playlist: playlist1 },
  { track: "song4", description: "My 4th fav song", playlist: playlist1 },
  { track: "song5", description: "My 5th fav song", playlist: playlist1 },
  { track: "song6", description: "My 6th fav song", playlist: playlist1 },
]

submissions.each {|submission| Submission.create(submission)}
