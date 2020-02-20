import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SearchResultTile from './SearchResultTile'

Enzyme.configure({ adapter: new Adapter() })

describe("SearchResultTile", () => {
  let wrapper
  let track = {
    name: "Africa",
    album: "Toto IV",
    artists: ["Toto", "Dorothy"],
    image: "fakeImage.png"
  }

  beforeEach(() => {
    wrapper = mount(<SearchResultTile result={ track } />)
  })

  it("should render an h3 element containing the title of the track", () => {
    expect(wrapper.find("h3").text()).toBe("Africa")
  })

  it("should render an album-title element containing the track's album", () => {
    expect(wrapper.find("li.album-title").text()).toBe("Toto IV")
  })

  it("should render an artist-name element containing the names of all artists associated with the album", () => {
    expect(wrapper.find("li.artist-name").text()).toBe("Toto, Dorothy")
  })

  it("should have an image of the album cover", () => {
    expect(wrapper.find("img").prop("src")).toBe("fakeImage.png")
  })
})
