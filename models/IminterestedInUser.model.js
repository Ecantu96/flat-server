const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('_helpers/role');


const interstedUser = new Schema({
	
	user_id : { type: String },
	questions: {
		 
										
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
						
					}
		
			    }
	
});

interstedUser.set('toJSON', { virtuals: true });
  
module.exports = mongoose.model('ImInterstedInUser', interstedUser);  