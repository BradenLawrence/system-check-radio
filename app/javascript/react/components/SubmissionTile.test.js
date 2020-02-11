import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SubmissionTile from './SubmissionTile'

Enzyme.configure({ adapter: new Adapter() })

describe("SubmissionTile", () => {
  let wrapper
  let sub = {
    track: "We All Become",
    description: "Fav song from Transistor."
  }

  beforeEach(() => {
    wrapper = mount(<SubmissionTile submission={ sub } />)
  })

  it("should render a track-name element containing the title of the track", () => {
    expect(wrapper.find("li.track-name").text()).toBe("Track name: We All Become")
  })

  it("should render a track-description containing a description of the track", () => {
    expect(wrapper.find("li.track-description").text()).toBe("Description: Fav song from Transistor.")
  })
})
