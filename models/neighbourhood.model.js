const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ListSchema = new Schema({
	    name:{	type: String, required: false },
		address: {
			
			city:{ type: String, required: false },
			state: { type: String, required: false },
			zipcode: { type: String, required: false },
			country: { type: String, required: false }
		},
		ListImage:{
				imageName: { type: String, required: false  },
				imageData: { type: 'Buffer',
					 required: false ,
					 data: [  0, 101, 0, 108, 0, 32, 98, 0, 102, 102, 101, 0  ] 

					}

		},
		AreaLocations: { type: String, required: false },
		
		BusinessType: { type: String, required: false },
		
		Rating: { type: String, required: false },
		
		favourite: { type: Boolean, required: false },
		
		appartment_id: { type: String, required: true },
		
			
		currentUser: { type: String, required: false },
		
						
      createdDate: { type: Date, default: Date.now }

});

ListSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('NeighbourhoodList', ListSchema);


