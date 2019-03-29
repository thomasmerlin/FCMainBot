const Discord = require('discord.js');
const Configuration = require('./config.json');

const bot = new Discord.Client({disableEveryone : true});

bot.on(
    'ready',
     async () => {
        console.log('Bot en ligne');
        bot.user.setActivity('Dealing punches !');
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

        if (command === `${prefix}punch`) {
            let punchScore = getPunchScore(10000);
            let text = "";

            if (punchScore < 2000) {
                text +='Did you really punch ? ';
            } else if (punchScore < 5000) {
                text += 'So bad...';
            } else if (punchScore < 7500) {
                text += 'I actually feel something !';
            } else {
                text +='That was a good punch !';
            }

            text += ' **Punch score :** `' + punchScore + '`'; 

            return message.channel.send(text);
        }
    }
)

bot.login(process.env.BOT_TOKEN);


/**
 * Get a random integer between range
 * 
 * @param {integer} number 
 */
function getPunchScore(number)
{
    return Math.floor(Math.random() * Math.floor(number));
}