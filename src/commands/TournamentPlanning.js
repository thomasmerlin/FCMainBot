const Discord = require('discord.js');
const MongooseHelper = require('./../mongoose/helper/schema');
const CommandHelper = require('./CommandHelper');

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
        let requirements = true;
        if (messageArguments.length !== 4) {
            message.channel.send('You did not provide the good number of arguments.');
            requirements = false;
            this.getCommandHelp(message, command);
        }

        let tournamentDate = messageArguments[2];
        if (CommandHelper.isDateValid(message, tournamentDate) === false) {
            requirements = false;
            CommandHelper.notValidDateException(message, tournamentDate);
        }       

        let tournamentUrl = messageArguments[3];
        if (CommandHelper.isUrlValid(tournamentUrl) === undefined) {
            requirements = false;
            CommandHelper.notValidUrlException(message, tournamentUrl);
        }

        return requirements;
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
        let requirements = this.checkCommandRequirements(message, command, messageArguments);

        if (requirements === true) {
            let tournamentName = messageArguments[1];
            let tournamentDate = messageArguments[2];
            let tournamentUrl = messageArguments[3];

            let tournamentData = {
                name: tournamentName,
                date: tournamentDate,
                url: tournamentUrl
            }

            try {
                let flush = MongooseHelper.addDocument('tournament', tournamentData);
                if (flush.error === false) {
                    return message.channel.send(`Tournament \`${tournamentName}\` added to planning ! :thumbsup:`);
                }
            } catch (error) {
                return message.channel.send(`An error occured : \`${error}\``);
            }
        }
    }
}