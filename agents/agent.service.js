const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Agent = db.Agent;

module.exports = {
    Agentauthenticate,
    AgentgetAll,
    AgentgetById,
    Agentcreate,
    Agentupdate,
   delete: _delete
};

async function Agentauthenticate({ username, password }) {
    const agent = await Agent.findOne({ username });
    if (agent && bcrypt.compareSync(password, agent.hash)) {
        const { hash, ...userWithoutHash } = agent.toObject();
        const token = jwt.sign({ sub: agent.id }, config.secret);
        return {
            
            token
        };
    }
}

async function AgentgetAll() {
    return await Agent.find().select('-hash');
}

async function AgentgetById(id) {
    return await Agent.findById(id).select('-hash');
}

async function Agentcreate(agentParam) {
    // validate
    if (await Agent.findOne({ username: agentParam.username })) {
        throw 'Username "' + agentParam.username + '" is already taken';
    }

    const agent = new Agent(agentParam);

    // hash password
    if (agentParam.password) {
        agent.hash = bcrypt.hashSync(agentParam.password, 10);
    }

    // save agent
    await agent.save();
}

async function Agentupdate(id, agentParam) {
    const agent = await Agent.findById(id);

    // validate
    if (!agent) throw 'Agent not found';
    if (agent.username !== agentParam.username && await Agent.findOne({ username: agentParam.username })) {
        throw 'Username "' + agentParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (agentParam.password) {
        agentParam.hash = bcrypt.hashSync(agentParam.password, 10);
		
    }

    // copy agentParam properties to agent 
    Object.assign(agent, agentParam);

    await agent.save();
}


async function _delete(id) {
    await Agent.findByIdAndRemove(id);
}