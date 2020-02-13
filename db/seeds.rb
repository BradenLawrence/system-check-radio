playlist1 = Playlist.find_or_create_by(name: "Songs for this week")
submissions = [
  {
    name: "Africa",
    artists: "TOTO",
    album: "Toto IV",
    duration_ms: 295893,
    image: "https://i.scdn.co/image/ab67616d00004851673d6a2831f72e48745ea80d",
    preview_url: "https://p.scdn.co/mp3-preview/dd78dafe31bb98f230372c038a126b8808f9349b?cid=c205b06529104ab6a0d1148d267b56cf",
    external_url: "https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX",
    description: "go",
    track_id: "2374M0fQpWi3dLnB54qaLX",
    playlist: playlist1
  },
  {
    name: "Thriller",
    artists: "Michael Jackson",
    album: "Scream",
    duration_ms: 358053,
    image: "https://i.scdn.co/image/b188d610efd0432755907dc336355b7df0827d87",
    preview_url: "https://p.scdn.co/mp3-preview/9f288fba4d3380b1ae25e7f88a2054d7fac0bf2d?cid=c205b06529104ab6a0d1148d267b56cf",
    external_url: "https://open.spotify.com/track/7azo4rpSUh8nXgtonC6Pkq",
    description: "woo",
    track_id: "7azo4rpSUh8nXgtonC6Pkq",
    playlist: playlist1
  },
  {
    name: "If I Had $1,000,000",
    artists: "Barenaked Ladies",
    album: "Gordon",
    duration_ms: 266733,
    image: "https://i.scdn.co/image/ab67616d00004851cace8130d6570006b636d582",
    preview_url: "https://p.scdn.co/mp3-preview/a66e2579577c991c194c860d764bdba49e7cfb3b?cid=c205b06529104ab6a0d1148d267b56cf",
    external_url: "https://open.spotify.com/track/0KeDuUqEX3P0cKzRD5pEom",
    description: "cash monay",
    track_id: "0KeDuUqEX3P0cKzRD5pEom",
    playlist: playlist1
  }
]

submissions.each {|submission| Submission.find_or_create_by(submission)}
