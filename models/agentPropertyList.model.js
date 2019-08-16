const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PropertySchema = new Schema({
	    
        Address: {	type: String, required: true },
		region: { type: String, required: true },
		location: {
			type: { type: String },
			coordinates: [Number],
		  },
		
		unitNumber: { type: Number, required: false },
		
		propertyType: { 
						rooms: { type: Boolean, default: null },
						apprtment: { type: Boolean, default: null }
		              },
				
		rentPrice: { type: String, required: true, default: null },
		
		securityDeposit: { type: String , required: true, default: null },
		
		Beds: { type: String, required: true },
		
		Baths: { type: String, required: true  },
		
		squareFeet: { type: String, required: true },
		
		leaseDuration: { type: String, required: true },
		
		dateAvailable: { type: Date, default: Date.now  },
		
		leaseTerms: { type: String, required: true },
		
		Description: { type: String, required: true },
		
		HidePropertyAddress: { type: Boolean, required: true, default: null },
		
		Name: { type: String, required: true },
		
		Email: { type: String, required: true },
		
		Phone: { type: Number, required: true },
		
		propertyOwner: { type: Boolean, required: true, default: null },
		
		managementCompanyBroker: { type: Boolean, required: true, default: null },
		
		Tenant: { type: Boolean, required: true, default: null },
		
		HidePhoneOnListing: { type: Boolean, required: true, default: null },
		
		AC: { type: Boolean, required: false, default: null },
		
		BalconyDeck: { type: Boolean, required: false, default: null },
		
		Furnished: { type: Boolean, required: false, default: null },
		
		HardwoodFloor: { type: Boolean, required: false, default: null },
		
		wheelchairAccess: { type: Boolean, required: false, default: null },
		
		GarageParking: { type: Boolean, required: false, default: null },
		
		OffStreetParking: { type: Boolean, required: false, default: null },
		
		None: { type: Boolean, required: false, default: null },
		
		InUnit: { type: Boolean, required: false, default: null }, 
		
		SharedInBuilding:{ type: Boolean, required: false,  default: null },
		
		NoPetsAllowed:{ type: Boolean, required: false,  default: null },
		
		Catsok:{ type: Boolean, required: false,  default: null }, 
		
		SmallDogsOk:{ type: Boolean, required: false, default: null },
		
		LargeDogsOk:{ type: Boolean, required: false,  default: null },
		
		PhotosAndMedia:{ 
							path:  { type: String,  required: false ,
					                 data: [  101, 114, 32, 101, 111, 117, 98, 104, 109, 108, 107, 108  ] 
									 },
							caption: { type: String  }
						},
						
		ProvideGeneralAvailabilityByDay: { type: Boolean, required: true },
		
		AllowRentalApplications: { type: Boolean, required: true },
		
		agentId:{ type: String, required: false }, 
				
      createdDate: { type: Date, default: Date.now }

});

PropertySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Property', PropertySchema);

//module.exports = mongoose.model('User', schema);  

//var List  = mongoose.model('List', ListSchema);

//var User = mongoose.model('User', schema);

//User.find().populate("List");
