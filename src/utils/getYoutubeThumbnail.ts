export function getThumbnail(link: string) {
  const videoid = youtube_parser(link)
  if (videoid) {
    return `https://i1.ytimg.com/vi/${videoid}/maxresdefault.jpg`
  } else {
    throw new Error('Invalid YouTube link')
  }
}

function youtube_parser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}
