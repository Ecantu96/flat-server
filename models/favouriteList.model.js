const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favouriteSchema = new Schema({
		
		favourite: { type: Boolean, required: true },
		
		Userid: { type:String, required: true },
		
		room_list_id: { type:String, required: true, unique: true },
					
      createdDate: { type: Date, default: Date.now }

});

favouriteSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FavouriteList', favouriteSchema);


