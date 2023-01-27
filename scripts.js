/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"jA4aHVbtfUwnuLYZ","label":"emulators","bookmarks":[{"id":"fTnUAbTPvqnuyjln","label":"rpcs3","url":"https://rpcs3.net"},{"id":"98tnUD9FS1O7BKq2","label":"pcsx2","url":"https://pcsx2.net"},{"id":"QmvdqrR3DRvodbCw","label":"libretro","url":"https://www.libretro.com"},{"id":"o4Trk6Du2ti4x0S7","label":"retroachievements ","url":"https://retroachievements.org"}]},{"id":"s4gSAFkiM6DvgPUP","label":"roms","bookmarks":[{"id":"LU0cqq5vHx2REk9z","label":"vimm's lair","url":"https://vimm.net"},{"id":"4RKpHlPoTSv8yYsG","label":"romspure","url":"https://romspure.cc"},{"id":"fC15Cbo9PgxlV3CS","label":"r/roms megathread","url":"https://r-roms.github.io/"}]},{"id":"NKaCEQ6s3DeftW1h","label":"games","bookmarks":[{"id":"1iv9WbX9Fa83Bw9j","label":"dndbeyond","url":"https://www.dndbeyond.com"},{"id":"uWJ8LDHwDB02n2kJ","label":"elder scrolls online","url":"https://www.elderscrollsonline.com/en-us/home"}]},{"id":"1wkuvZyTDFtgWIN9","label":"socials","bookmarks":[{"id":"lIisYbi03UEQuFvx","label":"reddit","url":"https://www.reddit.com"},{"id":"j76krB1YVlaDaq91","label":"discord","url":"https://discord.com"},{"id":"tHTqNey00jqmP9FH","label":"github","url":"https://github.com"},{"id":"HaOCHsgvBwIgFCsU","label":"youtube","url":"youtube.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
