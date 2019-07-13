const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ListSchema = new Schema({
	    title:{	type: String, required: false },
		description:{ type: String, required: false },
		address: {
			
			city:{ type: String, required: true },
			state: { type: String, required: true },
			zipcode: { type: String, required: true },
			country: { type: String, required: true }
		},
		ListImage:{
				imageName: { type: String, required: false  },
				imageData: { type: 'Buffer',
					 required: false ,
					 data: [  0, 101, 0, 108, 0, 32, 98, 0, 102, 102, 101, 0  ] 

					}

		},
		
		Neighborhood_id: { type: Object, required: false, unique: true },
		
		
		favMark: { type: Boolean, required: false },
		
		Roommate_id: { type: Object, required: false, unique: true },
		
		agentId:{ type: String, required: false },
				
      createdDate: { type: Date, default: Date.now }

});

ListSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ApartmentList', ListSchema);


