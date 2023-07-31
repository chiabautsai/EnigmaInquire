class ITunesSearch {
  constructor() {
    this.albumData = null;
    this.matchedAlbum = null;
    this.lookupData = null;
    this.albumSongs = null;
  }

  /**
   * Performs a search for albums on the iTunes Store based on the given query.
   * @param {string} query - The search query.
   * @param {object} options - Optional query parameters.
   */
  async searchAlbum(query, options = {}) {
    const defaultOptions = {
      media: "music",
      entity: "album"
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const url = new URL("https://itunes.apple.com/search");
    url.searchParams.append("term", query);

    // Add optional query parameters
    for (const key in mergedOptions) {
      url.searchParams.append(key, mergedOptions[key]);
    }

    const response = await fetch(url);
    const data = await response.json();
    this.albumData = data.results;
  }

  /**
   * Looks up the iTunes Store for a specific ID.
   * @param {string} id - The ID of the album to lookup.
   * @param {object} options - Optional query parameters.
   */
  async lookupAlbum(id, options = {}) {
    const defaultOptions = {
      media: "music",
      entity: "song"
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const url = new URL("https://itunes.apple.com/lookup");
    url.searchParams.append("id", id);

    // Add optional query parameters
    for (const key in mergedOptions) {
      url.searchParams.append(key, mergedOptions[key]);
    }

    const response = await fetch(url);
    const data = await response.json();
    this.lookupData = data.results[0]; // Store the lookup result

    // Store the songs belonging to the album
    if (this.lookupData && this.lookupData.collectionId) {
      this.albumSongs = data.results.filter(
        (result) => result.wrapperType === "track" && result.kind === "song"
      );
    } else {
      this.albumSongs = null;
    }
  }

  /**
   * Checks if the desired album is included in the fetched album data.
   * @param {string} artist_album - The artist album name.
   * @returns {object|null} - The matched album object if found, or null if not found.
   */
  checkAlbum(artist_album) {
    if (!this.albumData) {
      console.log("No album data available. Please perform a search first.");
      return false;
    }

    const desiredAlbum = (artist_album).toLowerCase();
    let bestMatch = null;
    let bestSimilarity = 0;
    
    // Iterate over each album in the fetched album data
    for (const result of this.albumData) {
      const collectionName = (result.artistName + " " + result.collectionName).toLowerCase();

      const similarity = calculateStringSimilarity(desiredAlbum, collectionName);
      if (similarity >= 0.85 && similarity > bestSimilarity) {
        bestMatch = result;
        bestSimilarity = similarity;
      }
    }

    this.matchedAlbum = bestMatch;
    return this.matchedAlbum;
  }

  getData() {
    return this.albumData;
  }

  getMatchedAlbum() {
    return this.matchedAlbum;
  }

  getLookupData() {
    return this.lookupData;
  }

  getAlbumSongs() {
    return this.albumSongs;
  }
}

function calculateStringSimilarity(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const distanceMatrix = Array.from({ length: len1 + 1 }, (_, i) => [i]);

  for (let j = 0; j <= len2; j++) {
    distanceMatrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      distanceMatrix[i][j] = Math.min(
        distanceMatrix[i - 1][j] + 1,
        distanceMatrix[i][j - 1] + 1,
        distanceMatrix[i - 1][j - 1] + cost
      );
    }
  }

  return 1 - distanceMatrix[len1][len2] / Math.max(len1, len2);
}


export default ITunesSearch;