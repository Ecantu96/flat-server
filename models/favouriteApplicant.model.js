const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favApplicantSchema = new Schema({
		
		favMark: { type: Boolean, required: true },
					
		Userid: { type:String, required: true },

       agent_id: { type:String, required: false },
		
		propertyList_id: { type:String, required: true, unique: true },

        createdDate: { type: Date, default: Date.now }

});

favApplicantSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FavApplicantList', favApplicantSchema);


   