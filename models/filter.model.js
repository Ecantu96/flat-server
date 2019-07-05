const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchResults = new Schema({
	
	    price:{	type: String, required: true },
		
	    neighborhoods:{	type: String, required: false },
		
	    Beds:{	type: String, required: false },
		
	    Baths:{	type: String, required: false },
		
	    Amenities:{	type: String, required: false },
		
	    Pets:{	type: String, required: false },
		
	    Subway:{	type: String, required: false },
		
	    SubwayStops:{	type: String, required: false },
		
	    NoFreeOnly:{	type: String, required: false },
		
	    SortResultsBy:{	type: String, required: false },
		
	    currentUser:{	type: String, required: false },
		
	 createdDate: { type: Date, default: Date.now }
});

SearchResults.set('toJSON', { virtuals: true });

module.exports = mongoose.model('SearchResult', SearchResults);


