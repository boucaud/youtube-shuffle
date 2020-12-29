export function parseInputListToPlaylistIdArray(listAsText) {
  if (!listAsText || listAsText.length === 0) {
    return null;
  }
  const idArray = listAsText.split("\n").map((candidate) => {
    return candidate;
    // TODO: validate id
    // TODO: check for existence ?? is it possible without youtube api ?
    // TODO: also parse url
  });
  return idArray;
}

export function buildURLFromIdArray(idArray) {
  if (!idArray || idArray.length === 0) {
  return;
  }
  const searchParams = new URLSearchParams()
  idArray.forEach((id) => searchParams.append("id", id));

  const url = new URL(`?${searchParams.toString()}`, 'http://localhost:8080');
  return url.href;
}

export default { parseInputListToPlaylistIdArray, buildURLFromIdArray };
