const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ListSchema = new Schema({
		title:{	type: String, required: false },
		description:{ type: String, required: false },
		address:{ type: String, required: false },
		ListImage:{
				imageName: { type: String, required: false  },
				imageData: { type: 'Buffer',
					 required: false ,
					 data: [  0, 101, 0, 108, 0, 32, 98, 0, 102, 102, 101, 0  ] 

					}

		},
		
		agentId:{ type: String, required: false },
				
      createdDate: { type: Date, default: Date.now }

});

ListSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RoomsList', ListSchema);

//module.exports = mongoose.model('User', schema);  

//var List  = mongoose.model('List', ListSchema);

//var User = mongoose.model('User', schema);

//User.find().populate("List");
