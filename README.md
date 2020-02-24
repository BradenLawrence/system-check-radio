# README

[![Codeship Status for BradenLawrence/system-check-radio](https://app.codeship.com/projects/f88a2960-2e53-0138-a6de-068da70eff24/status?branch=master)](https://app.codeship.com/projects/384825)

# System Check Radio

## Introduction
System Check Radio is a music app built for teams to nominate songs to a playlist of the week. At the end of each week, the #1 voted song is submitted to a "Greatest Hits" playlist that can be shared and listened to across time. This app is powered by the Spotify API to search for track data and enable song playback.

One of the most challenging parts of this experience has been these intense coding exams that we have every Friday. So I wanted to build something that future students could use to relax and focus while they take those same exams.

## Installation
1. Download the project:
  * Clone: [https://github.com/BradenLawrence/system-check-radio.git](https://github.com/BradenLawrence/system-check-radio.git)
  * Download: [https://github.com/BradenLawrence/system-check-radio/archive/master.zip](https://github.com/BradenLawrence/system-check-radio/archive/master.zip)
2. Install gemfiles and yarn packages
  * `bundle install`
  * `yarn install`
3. Add your Spotify credentials
  * This app uses the Spotify api to search for song data. Spotify requires a client ID and client secret to authorize these requests.
  * Sign up for a Spotify account and create a new App.
    * [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/)
  * From your app's dashboard, copy your `CLIENT ID ` and `CLIENT SECRET` and save them in the `.env` file found in the root directory like so:
    * `CLIENT_ID = "enterYourClientIdNumberHere"
    CLIENT_SECRET = "enterYourClientSecretHere"`
4. Set up your database
  * Inside your `.env` file, add the email address and password you want to use for your admin account
    * `ADMIN_EMAIL = "example@example.com"
    ADMIN_PW = "yourPassword"`
  * In a terminal use the following commands to set up your database
    * `bundle exec rake db:create`
    * `bundle exec rake db:migrate`
    * `bundle exec rake db:seed`
5. Start your servers
  * Start the Rails backend using `rails s`
  * In another terminal window, start the React frontend using `yarn start`
6. System Check Radio should now be running on [http://localhost:3000](http://localhost:3000)
  * You should now see your first playlist, that a logged in user can contribute to
  * You can also sign in to your admin account using the email and password you provided earlier. Using this account, you can navigate to the "/users" page to manage which accounts are allowed to vote and make submissions

## Technologies used
* Ruby 2.6.5
* Ruby on Rails 5.2.3
* Spotify api
* Rspotify
* Pundit
* React 16.8.0
