const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('config/db');
const User = db.User;
const Role = require('_helpers/role');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
	updateQuestionData,
	getQuestionDataByUserId,  
	profileImageData,
	UserRole, 
	getAllUserBasedOnRole,
	delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
	//const user = users.find(u => u.username === username && u.password === password);
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.Role }, config.secret);
        return {
           
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
} 

async function getAllUserBasedOnRole(userRole) { 
    return await User.find({ Role: userRole}).select('-hash');
}
 

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
		
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
async function updateQuestionData(id,userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}


async function UserRole(id) {
    return await User.findById(id).select('-hash');
}


async function getQuestionDataByUserId(id) {
    return await User.findById(id).select('-hash');
}

//Upload Image

async function profileImageData(id) {
    return await User.findById(id).select('-hash');
}


async function _delete(id) {
    await User.findByIdAndRemove(id);
}