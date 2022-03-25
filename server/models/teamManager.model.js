const mongoose = require('mongoose');

const teamManagerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name cannot be empty"],
            minlength: [2, "Name has to be at least 2 characters long"]
        },
        position: {
            type: String,
        },
        gameOneStatus: {
            type: String,
            default:"Undecided",
            enum:[
                "Undecided",
                "Playing",
                "Not Playing"
            ] 
        },
    
        gameTwoStatus: {
            type: String,
            default:"Undecided",
            enum:[
                "Undecided",
                "Playing",
                "Not Playing"
            ] 
        },
    
        gameThreeStatus: {
            type: String,
            default:"Undecided",
            enum:[
                "Undecided",
                "Playing",
                "Not Playing"
            ] 
        }
    },
    { timestamps: true }
);



const teamManager = mongoose.model("teamManager", teamManagerSchema)

module.exports = teamManager


