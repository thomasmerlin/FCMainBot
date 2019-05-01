const UrlChecker = require('valid-url');

module.exports = {
    /**
     * 
     * @param {Discord.Message} message 
     * @param {string} testedDate 
     */
    'isDateValid': function (message, testedDate) {
        var bits = testedDate.split('/');
        var date = new Date(bits[2] + '/' + bits[1] + '/' + bits[0]);

        if (date < (new Date())) {
            return false;
        }
        return !!(date && (date.getMonth() + 1) == bits[1] && date.getDate() == Number(bits[0]));
    },

    /**
     * @param {Discord.Message} message 
     */
    'notValidDateException' : function (message, date) {
        return message.channel.send(`Invalid date \`${date}\` provided. Date must be at format day/month/year with correct values and not anterior to today.`);
    },

    'isUrlValid': function (url) {
        return UrlChecker.isUri(url);
    },

    /**
     * 
     * @param {Discord.Message} message 
     * @param {string} url 
     */
    'notValidUrlException': function (message, url) {
        return message.channel.send(`Invalid URL \`${url}\` provided. Please provide a valid URL.`)
    }
}