export function parseInputListToPlaylistIdArray(listAsText) {
  if (listAsText.length === 0) {
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

export default { parseInputListToPlaylistIdArray };
