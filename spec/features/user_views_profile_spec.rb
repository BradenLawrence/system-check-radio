require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to view my profile
  So that I can view my information
} do
  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    visit "/users/#{user.id}"

    expect(page).to_not have_content('You are not authorized to view this page.')
  end

  scenario 'access profile belonging to a different user' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    visit "/users/#{user.id+1}"

    expect(page).to have_content('You are not authorized to view this page.')
  end
end
