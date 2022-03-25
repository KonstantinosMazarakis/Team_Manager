const { modelName } = require("../models/teamManager.model")
const teamManager = require("../models/teamManager.model")

module.exports.findAllPlayers = (req,res) =>{
    teamManager.find()
        .then(allPlayers =>{
            res.json({results: allPlayers})
        })
        .catch(err=>res.json({message:"oh no ho no ho no no no", error:err}))
}


module.exports.createPlayer= (req,res) =>{
    teamManager.create(req.body)
        .then(newPlayer =>{
            res.json({results: newPlayer})
        })
        .catch(err=>res.json({message:"oh no ho no ho no no no", error:err}))
}


module.exports.findOnePlayer = (req,res) =>{
    teamManager.findOne({_id: req.params.id})
        .then(foundPlayer =>{
            res.json({results: foundPlayer})
        })
        .catch(err=>res.json({message:"oh no ho no ho no no no", error:err}))

}

module.exports.updateOnePlayer = (req,res)=>{
    teamManager.findOneAndUpdate(
        {_id:req.params.id},
        req.body,
        {new: true, runValidators: true}
        )
            .then(updatedPlayer=>{
                res.json({results: updatedPlayer})
            })
            .catch(err=>res.json({message:"oh no ho no ho no no no", error:err}))
    }


    module.exports.deletePlayer = (req,res)=>{
        teamManager.deleteOne({_id: req.params.id})
            .then(deletedPlayer =>{
                res.json({results: deletedPlayer})
            })
            .catch(err=>res.json({message:"oh no ho no ho no no no", error:err}))
    }