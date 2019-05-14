const express = require('express');
const router = express.Router();
const agentService = require('./agent.service');

// routes
router.post('/agent-authenticate', agentauthenticate);
router.post('/agent-register', agentregister);
router.get('/agentAll', agentgetAll);
router.get('/current-agent', agentgetCurrent);

router.put('/update', agentUpdate);
router.get('/:id', agentgetById);

router.delete('/:id', _delete);

module.exports = router;

function agentauthenticate(req, res, next) {
    agentService.Agentauthenticate(req.body)
        .then(agent => agent ? res.json(agent) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function agentregister(req, res, next) {
    agentService.Agentcreate(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function agentgetCurrent(req, res, next) {
    agentService.AgentgetById(req.agent.sub)
        .then(agent => agent ? res.json(agent) : res.sendStatus(404))
        .catch(err => next(err));
}


function agentUpdate(req, res, next) {
    agentService.Agentupdate(req.agent.sub, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
  
function _delete(req, res, next) {
    agentService.delete(req.agent.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function agentgetAll(req, res, next) {
    agentService.AgentgetAll()
        .then(agent => res.json(agent))
        .catch(err => next(err));
}

function agentgetById(req, res, next) {
    agentService.AgentgetById(req.agent.sub)
        .then(agent => agent ? res.json(agent) : res.sendStatus(404))
        .catch(err => next(err));
}