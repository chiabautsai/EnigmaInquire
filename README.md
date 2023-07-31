# EnigmaInquire

EnigmaInquire is a Cloudflare Workers app that allows you to search for albums on iTunes and retrieve information about them.

## Features

- Search for albums based on a query string.
- Retrieve detailed information about a specific album using its ID.
- Get a list of songs associated with an album.

## Usage

To use the iTunes Search App, send a POST request to the Cloudflare Workers endpoint with the following parameters:

- `query`: The search query string to find albums.
- `id`: The ID of a specific album to retrieve information.
- `options` (optional): Additional options for the search or lookup operation.

### Search for Albums

To search for albums, send a POST request to the endpoint with the `query` parameter set to the desired search query string:

```http
POST /search HTTP/1.1
Content-Type: application/json

{
  "query": "{artist} - {album}"
}
```

The app will return a JSON response with the following information:

- `matchedAlbum`: Information about the best-matched album based on the search query.

### Lookup an Album

To retrieve detailed information about a specific album, send a POST request to the endpoint with the `id` parameter set to the album's ID:

```http
POST /search HTTP/1.1
Content-Type: application/json

{
  "id": "123456789"
}
```

The app will return a JSON response with the following information:

- `lookupData`: Detailed information about the album.
- `albumSongs`: A list of songs associated with the album.

## Error Handling

If the request is missing the required parameters (`query` or `id`), the app will return a 400 Bad Request response with an error message.

## Dependencies

The iTunes Search App relies on the `ITunesSearch` class to interact with the iTunes Search API and retrieve album information.

## Development

To set up the development environment and deploy the app to Cloudflare Workers:

1. Clone the repository.
2. Install the required dependencies.
3. Modify the code as needed.
4. Deploy the app to Cloudflare Workers using the provided deployment process.

## iTunes API Response Data Structure

**Songs:**

- `wrapperType`: "track"
- `kind`: "song"
- `artistId`: [Artist ID]
- `collectionId`: [Collection ID]
- `trackId`: [Track ID]
- `artistName`: [Artist Name]
- `collectionName`: [Collection Name]
- `trackName`: [Track Name]
- `collectionCensoredName`: [Collection Censored Name]
- `trackCensoredName`: [Track Censored Name]
- `artistViewUrl`: [Artist View URL]
- `collectionViewUrl`: [Collection View URL]
- `trackViewUrl`: [Track View URL]
- `previewUrl`: [Preview URL]
- `artworkUrl30`: [Artwork URL (30x30)]
- `artworkUrl60`: [Artwork URL (60x60)]
- `artworkUrl100`: [Artwork URL (100x100)]
- `collectionPrice`: [Collection Price]
- `trackPrice`: [Track Price]
- `releaseDate`: [Release Date]
- `collectionExplicitness`: [Collection Explicitness]
- `trackExplicitness`: [Track Explicitness]
- `discCount`: [Disc Count]
- `discNumber`: [Disc Number]
- `trackCount`: [Track Count]
- `trackNumber`: [Track Number]
- `trackTimeMillis`: [Track Time in Milliseconds]
- `country`: [Country]
- `currency`: [Currency]
- `primaryGenreName`: [Primary Genre Name]
- `isStreamable`: [Is Streamable]

**Collection:**

- `wrapperType`: "collection"
- `collectionType`: "Album"
- `artistId`: [Artist ID]
- `collectionId`: [Collection ID]
- `amgArtistId`: [AMG Artist ID]
- `artistName`: [Artist Name]
- `collectionName`: [Collection Name]
- `collectionCensoredName`: [Collection Censored Name]
- `artistViewUrl`: [Artist View URL]
- `collectionViewUrl`: [Collection View URL]
- `artworkUrl60`: [Artwork URL (60x60)]
- `artworkUrl100`: [Artwork URL (100x100)]
- `collectionPrice`: [Collection Price]
- `collectionExplicitness`: [Collection Explicitness]
- `trackCount`: [Track Count]
- `copyright`: [Copyright]
- `country`: [Country]
- `currency`: [Currency]
- `releaseDate`: [Release Date]
- `primaryGenreName`: [Primary Genre Name]

## License

This project is licensed under the [MIT License](LICENSE).