import ITunesSearch from './iTunesSearch';

// Export a default object containing event handlers
export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request, env, ctx) {
		let requestBody;
		try {
			requestBody = await request.json();
		} catch (error) {
			return new Response("Invalid JSON payload", { status: 400 });
		}
		const { query, id, options={} } = requestBody;

		// Create an instance of the ITunesSearch class
		const itunes = new ITunesSearch();

		if (query) {
			await itunes.searchAlbum(query, options);
			itunes.checkAlbum(query);
		} else if (id) {
			await itunes.lookupAlbum(id, options);
		} else {
			return new Response("Missing query parameter", { status: 400 });
		}

		return new Response(
			JSON.stringify({
				matchedAlbum: itunes.getMatchedAlbum(),
				lookupData: itunes.getLookupData(),
				albumSongs: itunes.getAlbumSongs(),
			}),
			{ headers: { "Content-Type": "application/json" } }
		);
	},
};
