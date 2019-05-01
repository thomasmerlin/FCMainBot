const Discord = require('discord.js');
const Configuration = require('./../config.json');
const Parameters = require('./../parameters.json')
const MongooseHelper = require ('./mongoose/helper/schema');
const TournamentPlanning = require('./commands/TournamentPlanning.js');

const bot = new Discord.Client({disableEveryone : true});

bot.on(
    'ready',
     async () => {
        console.log('Bot en ligne');
        MongooseHelper.initializeSchemas();
        bot.user.setActivity('Cherche un player !');
    }
);

bot.on(
    'message',
    async message => {
        if (message.author.bot || message.channel.type === 'dm') {
            return;
        }

        let prefix = Configuration.prefix;
        let messageArray = message.content.split(' ');
        let command = messageArray[0];

        if (command === `${prefix}addTournamentPlanning`) {
            if (messageArray.length === 1) {
                return TournamentPlanning.getCommandHelp(message, command);
            }
            
            TournamentPlanning.addTournament(message, command, messageArray);
        }
    }
)

bot.login(Parameters.token);