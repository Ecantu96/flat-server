const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Agentschema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
	image: { type: String, required: false  },
       
     createdDate: { type: Date, default: Date.now }
});

Agentschema.set('toJSON', { virtuals: true });
  
module.exports = mongoose.model('Agent', Agentschema);  