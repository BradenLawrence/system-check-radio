import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SubmissionTile from './SubmissionTile'

Enzyme.configure({ adapter: new Adapter() })

describe("SubmissionTile", () => {
  let wrapper
  let sub = {
    name: "Africa",
    artists: "TOTO",
    album: "Toto IV",
    preview_url: "https://p.scdn.co/mp3-preview/dd78dafe31bb98f230372c038a126b8808f9349b?cid=c205b06529104ab6a0d1148d267b56cf",
    description: "go"
  }

  beforeEach(() => {
    wrapper = mount(<SubmissionTile submission={ sub } />)
  })

  it("should render a submission-name element containing the title of the track", () => {
    expect(wrapper.find("li.submission-name").text()).toBe("Africa")
  })

  it("should render a submission-description containing a description of the track", () => {
    expect(wrapper.find("li.submission-description").text()).toBe('"go"')
  })

  it("should render a submission-details containing a description of the track", () => {
    expect(wrapper.find("li.submission-details").text()).toBe("Toto IV | TOTO")
  })

  it("should render a link pointing to a preview URL", () => {
    expect(wrapper.find("a").prop("href")).toBe("https://p.scdn.co/mp3-preview/dd78dafe31bb98f230372c038a126b8808f9349b?cid=c205b06529104ab6a0d1148d267b56cf")
  })
})
