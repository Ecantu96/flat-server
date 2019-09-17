const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('_helpers/role');


const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
	interestedRoommate: { type: Boolean, required: false, default: false },    
	LicenseNumber: { type: Number, required: false, default: null },
   	 questions: {
		 
					LookingRoommate: {
						type: String,
						"enum": ["Quiet", "Loud", "Tidy", "Messy"]
					},
			
					
					LookingInRoommates:{   
					 type: String,
								"enum": ["Quiet", "Loud", "Tidy", "Messy"]
					},
					
					typeofperson:{
						type: String,
								"enum": ["Quiet", "Loud", "Tidy", "Messy"]
					},
					
					DoYouDrink:{ type: Boolean, required: false, default: false },
							
					DoYouSmoke:{ type: Boolean, required: false, default: false },
							
					LikeGoOut:{ type: Boolean, required: false, default: false },    
					    
					Workhours:{ 
							type: String, 
							 "enum": ["FullTime", "PartTime", "StudentFullTime", "StudentPartTime"]
					 },
					BedTime:{ 
							 type: String, 
							 "enum": ["9-10pm", "10-11pm", "12-1am" ]
					},
					RelationshipStatus:{  
						 type: String, 
						"enum": ["Single", "onRelationship", "Married"]
						
					},
		
		
			    },  
	
	
	ProfileImage: {
		imageName: { type: String, required: false },
		imageType: { type: String, required: false},
		imagePath: { type: String, required: false}
	},
	CoverPhoto: {
		coverPhtoName: { type: String, required: false },
		coverImageType: { type: String, required: false},
		coverImagePath: { type: String, required: false}
	},
		
	Bio: { type: String, required: false, default: null},
	
	Socials:{
			
			Facebook: { type: String, required: false, default: null },
			Twitter: { type: String, required: false, default: null },
			Instagram: { type: String, required: false, default: null },
			LinkedIN: { type: String, required: false, default: null }
	},
	
	DOB: { type: Date, default: Date.now },	
	gender: { type: String, default: null },	
	Role: { type: String, required: true },
	createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
  
module.exports = mongoose.model('User', schema);  