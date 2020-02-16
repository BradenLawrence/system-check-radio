require 'rails_helper'

feature 'user signs in', %Q{
  As an admin
  I want to view the user list
  So that I can see who is in my group
} do
  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)
    user.role = 1
    user.save

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    visit users_path

    expect(page).to_not have_content('You are not authorized to view this page.')
  end

  scenario 'access profile belonging to a different user' do
    user = FactoryBot.create(:user)
    user.role = 1
    user.save

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    visit "/users/#{user.id+1}"

    expect(page).to_not have_content('You are not authorized to view this page.')
  end
end
