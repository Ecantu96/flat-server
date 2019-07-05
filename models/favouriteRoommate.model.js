const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FavRoommateSchema = new Schema({
		
		favouriteRoommate: { type: Boolean, required: true },
		
		 Userid: { type:String, required: true },
		
		favouriteRoommate_id: { type:String, required: true},
					
      createdDate: { type: Date, default: Date.now }

});

FavRoommateSchema.set('toJSON', { virtuals: true });  

module.exports = mongoose.model('FavouriteRoommates', FavRoommateSchema);


