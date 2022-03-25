const teamManagerController = require("../controllers/teamManager.controller")

module.exports = (app) =>{
    app.get('/api/teamManager',teamManagerController.findAllPlayers)
    app.post('/api/teamManager', teamManagerController.createPlayer)
    app.get('/api/teamManager/:id', teamManagerController.findOnePlayer)
    app.put('/api/teamManager/:id', teamManagerController.updateOnePlayer)
    app.delete('/api/teamManager/:id', teamManagerController.deletePlayer)
}