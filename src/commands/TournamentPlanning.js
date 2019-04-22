const Discord = require('discord.js');
const CommandHelper = require('./CommandHelper');
const DataStore = require('./../dataStore.json');

let tournament = function (date, url, name) {
    this.date = date;
    this.url = url;
    this.name = name;
}

module.exports = {
    /**
     * 
     * @param {Discord.Message} message
     * @param {string} command 
     */
    'getCommandHelp': function (
        message,
        command
    ) {
        return message.channel.send(`Correct format for \`${command}\` is : \`${command} TournamentName Day/Month/Year TournamentUrl\`.`);
    },

    /**
     * 
     * @param {Discord.Message} message 
     * @param {string} command 
     * @param {string[]} messageArguments
     */
    'checkCommandRequirements': function(
        message,
        command,
        messageArguments
    ) {
        if (messageArguments.length !== 4) {
            message.channel.send('You did not provide the good number of arguments.');
            return this.getCommandHelp(message, command);
        }

        let tournamentDate = messageArguments[2];
    
        if (CommandHelper.isDateValid(tournamentDate) === false) {
            return CommandHelper.notValidDateException(message, tournamentDate);
        }

        let tournamentUrl = messageArguments[3];
        if (CommandHelper.isUrlValid(tournamentUrl) === undefined) {
            return CommandHelper.notValidUrlException(message, tournamentUrl);
        }
    },

    /**
     * 
     * @param {Discord.Message} message 
     * @param {string} command
     * @param {string[]} messageArguments
     */
    'addTournament': function (
        message,
        command,
        messageArguments
    ) {
        this.checkCommandRequirements(message, command, messageArguments);

        let tournamentName = messageArguments[1];
        let tournamentDate = messageArguments[2];
        let tournamentUrl = messageArguments[3];

        let newTournament = new tournament(tournamentDate, tournamentUrl, tournamentName);
        DataStore.tournaments.push(newTournament);

        return message.channel.send(`Tournament \`${tournamentName}\` added to planning ! :thumbsup:`);
    }
}