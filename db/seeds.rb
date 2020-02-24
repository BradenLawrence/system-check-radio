Playlist.create(name: "My First Playlist")
Playlist.create(name: "Greatest Hits", compilation: true)
User.create(
  name: "admin",
  email: ENV["ADMIN_EMAIL"],
  password: ENV["ADMIN_PW"],
  role: "admin",
  member: true
)
