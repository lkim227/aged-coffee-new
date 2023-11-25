const decodeUrlRepeatedly = (url: string) => {
  let decodedUrl = decodeURI(url)
  while (url !== decodedUrl) {
    url = decodedUrl
    decodedUrl = decodeURI(url)
  }
  return decodedUrl
}

export default decodeUrlRepeatedly
