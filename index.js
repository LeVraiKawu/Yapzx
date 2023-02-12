const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });
const prompt = require("basic-prompt");
const chalk = require('chalk');
const setTitle = require('console-title');
require('dotenv').config();

// Chalk config
const green = chalk.hex('33FF83');
const red = chalk.hex('FF3C33');
const yellow = chalk.hex('FFEC33');
const blue = chalk.hex('3399FF');
const purple = chalk.hex('D133FF');

console.clear();
setTitle("Yapzx");
displayTitle();

// Check for ENV config
if (!process.env.TOKEN || process.env.TOKEN == "") {
    console.log(`${red("[ERROR]")} - TOKEN is not provided in the .env file.`);
    return;
}

if (!process.env.BOT_ID || process.env.BOT_ID == "") {
    console.log(`${red("[ERROR]")} - BOT_ID is not provided in the .env file.`);
    return;
}

if (!process.env.GUILD_ID || process.env.GUILD_ID == "") {
    console.log(`${red("[ERROR]")} - GUILD_ID is not provided in the .env file.`);
    return;
}

console.log(`${green("[SUCCESS]")} - The config has been checked and no errors is detected.`);
console.log(`${blue('[INFO]')}${purple('[DISCORD]')} - Logging into Discord...`);
client.login(process.env.TOKEN);

// Discord Bot
client.on("ready", () => {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    console.log(`${green("[SUCCESS]")} - The bot is up.`);

    if (!guild) {
        console.log(`${red("[ERROR]")} - The guild id you provided is wrong. The bot doesn't have access to it or the guild has been deleted.`);
    } else {
        console.log(`${green("[SUCCESS]")} - The guild ${purple(`[${guild.name}]`)} id you provided is valid. The panel will appear in 3 seconds.`);
    }

    setTitle("Yapzx - Ready");
    try {
        client.user.setActivity({
            name: "Yapzx DA GOAT!",
            type: ActivityType.Watching
        });
    } catch(e) {};

    setTimeout(() => {
        console.clear();
        displayTitle();
        displayChoices();
    }, 3000);
});


// Displays
function displayTitle() {
    console.log(red(" __  __     ______     ______   ______     __  __    \r\n\/\\ \\_\\ \\   \/\\  __ \\   \/\\  == \\ \/\\___  \\   \/\\_\\_\\_\\   \r\n\\ \\____ \\  \\ \\  __ \\  \\ \\  _-\/ \\\/_\/  \/__  \\\/_\/\\_\\\/_  \r\n \\\/\\_____\\  \\ \\_\\ \\_\\  \\ \\_\\     \/\\_____\\   \/\\_\\\/\\_\\ \r\n  \\\/_____\/   \\\/_\/\\\/_\/   \\\/_\/     \\\/_____\/   \\\/_\/\\\/_\/ \r\n                                                     "));
}

async function displayChoices() {
    console.log(red("Created for educational purposes, I am not responsible for your actions so don't be an asshole and use this tool on your server :)"))
    console.log(`\r\n+---------------------------------------------+-----------------------+\r\n|                   ${purple("Server")}                    |           ${purple("Bot")}         |\r\n+---------------------------------------------+-----------------------+\r\n| ${purple("[1]")} - Change server name                    | ${purple("[9]")} - Change Activity |\r\n| ${purple("[2]")} - Create Channels                       |                       |\r\n| ${purple("[3]")} - Create Roles                          |                       |\r\n| ${purple("[4]")} - Create Emojis                         |                       |\r\n| ${purple("[5]")} - Remove all Channels                   |                       |\r\n| ${purple("[6]")} - Remove all Roles                      |                       |\r\n| ${purple("[7]")} - Remove all Emojis                     |                       |\r\n| ${purple("[8]")} - Send Messages in every channels       |                       |\r\n+---------------------------------------------+-----------------------+`);
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const choice = await prompt("> ");

    switch(choice) {
        case '1':
            const changeGuildNameInput = await prompt("Name of the guild: ");
            if (!changeGuildNameInput|| changeGuildNameInput.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            }
            if (changeGuildNameInput.length > 100 || changeGuildNameInput.length < 2) {
                console.log(`${red("[ERROR]")} - Must be between 2 and 100 in length.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }

            const guildNameChanged = await guild.setName(changeGuildNameInput).catch(() => {
                console.log(`${red("[ERROR]")} - The guild name can't be changed.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            });

            if (guildNameChanged) {
                console.log(`${green("[SUCCESS]")} - The guild name has been changed. Redirecting in 3 seconds.`);
            }

            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        case '2':
            const createChannelsHowMany = await prompt("How many channels: ");
            if (isNaN(createChannelsHowMany)) {
                console.log(`${red("[ERROR]")} - Number only.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }
            parseInt(createChannelsHowMany);

            if (createChannelsHowMany > 500) {
                console.log(`${red("[ERROR]")} - You can't create over 500 channels.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }

            const createChannelsName = await prompt("Name of the channels: ");
            if (!createChannelsName || createChannelsName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            }

            console.clear();
            displayTitle();

            let numOfChannelsCreated = 0;
            while (numOfChannelsCreated < createChannelsHowMany) {
                numOfChannelsCreated++;

                const channelCreated = await guild.channels.create({
                    name: createChannelsName
                }).catch(() => {
                    console.log(`${yellow("[WARNING]")}${blue(`[${numOfChannelsCreated}/${createChannelsHowMany}]`)} - Unable to create the channel.`);
                });

                if (channelCreated) {
                    console.log(`${green("[SUCCESS]")}${blue(`[${numOfChannelsCreated}/${createChannelsHowMany}]`)} - Channel created.`);
                }
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        case '3':
            const createRolesHowMany = await prompt("How many roles: ");
            if (isNaN(createRolesHowMany)) {
                console.log(`${red("[ERROR]")} - Number only.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }

            if (createRolesHowMany > 500) {
                console.log(`${red("[ERROR]")} - You can't create over 500 roles.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }

            const createRolesName = await prompt("Name of the roles: ");
            if (!createRolesName || createRolesName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            }

            console.clear();
            displayTitle();

            let numOfRolesCreated = 0;
            while (numOfRolesCreated < createRolesHowMany) {
                numOfRolesCreated++;

                const roleCreated = await guild.roles.create({
                    name: createRolesName
                }).catch(() => {
                    console.log(`${yellow("[WARNING]")}${blue(`[${numOfRolesCreated}/${createRolesHowMany}]`)} - Unable to create a role.`);
                });

                if (roleCreated) {
                    console.log(`${green("[SUCCESS]")}${blue(`[${numOfRolesCreated}/${createRolesHowMany}]`)} - Role created.`);
                }
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        case '4':
            console.log(`${yellow("[WARNING]")} - Uploading emojis is rate limited quickly. If uploading emojis doesn't work or stopped working, that's because it got rate limited. Wait a few minutes or few hours.`);
            const createEmojisHowMany = await prompt(`How many emojis: `);
            if (isNaN(createEmojisHowMany)) {
                console.log(`${red("[ERROR]")} - Number only.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }

            if (createEmojisHowMany > 50) {
                console.log(`${red("[ERROR]")} - You can't create over 35 emojis.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }

            const createEmojisName = await prompt("Name of the emojis: ");
            if (!createEmojisName || createEmojisName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            }

            const createEmojisLinkToImage = await prompt("Link of image to put: ");
            if (!createEmojisName || createEmojisName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty url.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            }

            console.clear();
            displayTitle();

            let numOfEmojisCreated = 0;
            while (numOfEmojisCreated < createEmojisHowMany) {
                numOfEmojisCreated++;

                const emojiCreated = await guild.emojis.create({
                    name: createEmojisName,
                    attachment: createEmojisLinkToImage
                }).catch((e) => {
                    if (e?.rawError?.code === 50045) {
                        return console.log(`${yellow("[WARNING]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Image size exceeded maximum size.`);
                    }

                    if (e?.rawError?.code === 50035) {
                        return console.log(`${yellow("[WARNING]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Unable to create an emoji. The name is not correct (remember to always use _ as spaces).`);
                    }
                    
                    return console.log(`${yellow("[WARNING]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Unable to create an emoji.`);
                });

                if (emojiCreated) {
                    console.log(`${green("[SUCCESS]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Emoji created.`);
                };
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        case '5':
            console.clear();
            displayTitle();

            const numOfChannels = guild.channels.cache.size;
            if (numOfChannels === 0) {
                console.clear();
                displayTitle();
                displayChoices();
                return;
            }

            let numOfDeletedChannels = 0;
            for await (let channel of guild.channels.cache) {
                numOfDeletedChannels++;
                channel = channel[1];

                await channel.delete().then((channel) => {
                    console.log(`${green("[SUCCESS]")}${blue(`[${numOfDeletedChannels}/${numOfChannels}]`)} - ${channel.name} has been deleted.`);
                }).catch(() => {
                    console.log(`${yellow("[WARNING]")}${blue(`[${numOfDeletedChannels}/${numOfChannels}]`)} - Unable to delete ${channel.name}.`);
                });
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        case '6':
            console.clear();
            displayTitle();

            const numOfRoles = guild.emojis.cache.size;
            let numOfDeletedRoles = 0;
            for await (let role of guild.roles.cache) {
                numOfDeletedRoles++;
                role = role[1];

                await role.delete().then((role) => {
                    console.log(`${green("[SUCCESS]")}${blue(`[${numOfDeletedRoles}/${numOfRoles}]`)} - ${role.name} has been deleted.`);
                }).catch(() => {
                    console.log(`${yellow("[WARNING]")}${blue(`[${numOfDeletedRoles}/${numOfRoles}]`)} - Unable to delete ${role.name}.`);
                });
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        case '7':
            console.clear();
            displayTitle();

            const numOfEmojis = guild.emojis.cache.size;
            if (numOfEmojis === 0) {
                console.clear();
                displayTitle();
                displayChoices();
                return;
            }

            let numOfDeletedEmojis = 0;
            for await (let emoji of guild.emojis.cache) {
                numOfDeletedEmojis++;
                emoji = emoji[1];

                await emoji.delete().then((emoji) => {
                    console.log(`${green("[SUCCESS]")}${blue(`[${numOfDeletedEmojis}/${numOfEmojis}]`)} - ${emoji.name} has been deleted.`);
                }).catch(() => {
                    console.log(`${yellow("[WARNING]")}${blue(`[${numOfDeletedEmojis}/${numOfEmojis}]`)} - Unable to delete ${emoji.name}.`);
                });
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        case '8':
            const spamMessageInput = await prompt("Your message content: ");
            if (spamMessageInput.trim() === "") {
                console.log(`${red("[ERROR]")} - Input can't be empty.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            }

            const spamMessageWithEveryone = await prompt("@everyone ? [yes/no]: ");

            const spamMessageNumOfChannels = guild.channels.cache.size;
            if (spamMessageNumOfChannels === 0) {
                console.clear();
                displayTitle();
                displayChoices();
                return;
            }

            console.log(`${yellow("[WARNING]")} - Creation of webhook is rate limited quickly.`);
            console.log(`${blue("[INFO]")} - Using webhooks is more faster at sending a lot of messages than without it but remind the warning above.`)
            const useSpamWebhook = await prompt("Use spam webhook ? [yes/no]:");

            if (useSpamWebhook.trim() === "yes") {
                const nameOfSpamWebhook = await prompt("Name of the webhooks: ");
                if (nameOfSpamWebhook.trim() === "") {
                    console.log(`${red("[ERROR]")} - Can't be empty.`);
    
                    setTimeout(() => {
                        console.clear();
                        displayTitle();
                        displayChoices();
                    }, 2000);
                    return;
                }

                const numOfSpamWebhookInput = await prompt("How much spam webhook: ");
                if (numOfSpamWebhookInput.trim() === "") {
                    console.log(`${red("[ERROR]")} - Can't be empty.`);
    
                    setTimeout(() => {
                        console.clear();
                        displayTitle();
                        displayChoices();
                    }, 2000);
                    return;
                }
    
                if (isNaN(numOfSpamWebhookInput)) {
                    console.log(`${red("[ERROR]")} - Number only`);
    
                    setTimeout(() => {
                        console.clear();
                        displayTitle();
                        displayChoices();
                    }, 2000);
                    return;
                }
    
                if (numOfSpamWebhookInput < 2) {
                    console.log(`${red("[ERROR]")} - 2 minimum.`);
    
                    setTimeout(() => {
                        console.clear();
                        displayTitle();
                        displayChoices();
                    }, 2000);
                    return;
                }
    
                if (numOfSpamWebhookInput > 50) {
                    console.log(`${red("[ERROR]")} - Can't be over 50 webhooks.`);
    
                    setTimeout(() => {
                        console.clear();
                        displayTitle();
                        displayChoices();
                    }, 2000);
                    return;
                }
    
                console.clear();
                displayTitle();
    
                const spamWebhooks = [];
                for (let channel of guild.channels.cache) {
                    let numOfSpamWebhookCreated = 0;
                    channel = channel[1];
    
                    while (numOfSpamWebhookCreated < numOfSpamWebhookInput) {
                        numOfSpamWebhookCreated++;
                        await channel.createWebhook({ name: nameOfSpamWebhook }).then((webhook) => {
                            console.log(`${green("[SUCCESS]")}${blue(`[${numOfSpamWebhookCreated}/${numOfSpamWebhookInput}]`)} - Webhook created!`)
                            spamWebhooks.push(webhook);
                        });
                    }
                }
    
                for (let webhook of spamWebhooks) {
                    setInterval(async () => {
                        const webhookMessageSent = await webhook.send({
                            content: `${spamMessageWithEveryone == "yes" ? "@everyone" : spamMessageWithEveryone == "no" ? "" : ""} ${spamMessageInput}`
                        }).catch((e) => {
                            console.log(e);
                        });
    
                        if (webhookMessageSent) {
                            console.log(`${green("[SUCCESS]")} - Message sent!`);
                        }
                    }, 1);
                }
            } else {
                for (let channel of guild.channels.cache) {
                    channel = channel[1];
    
                    setInterval(async () => {
                        const spamMessageSent = await channel.send({
                            content: `${spamMessageWithEveryone == "yes" ? "@everyone" : spamMessageWithEveryone == "no" ? "" : ""} ${spamMessageInput}`
                        }).catch((e) => {
                            console.log(e);
                        });
    
                        if (spamMessageSent) {
                            console.log(`${green("[SUCCESS]")} - Message sent!`);
                        }
                    }, 1);
                }
            }
            break;
        case '9':
            const changeBotActivityInput = await prompt("Text of the activity: ");
            if (!changeBotActivityInput|| changeBotActivityInput.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty text.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
            }
            if (changeBotActivityInput.length > 100) {
                console.log(`${red("[ERROR]")} - Can't be over 100 in length.`);

                setTimeout(() => {
                    console.clear();
                    displayTitle();
                    displayChoices();
                }, 2000);
                break;
            }

            try {
                client.user.setActivity({
                    name: changeBotActivityInput,
                    type: ActivityType.Watching
                });
            } catch(e) {};
            
            console.log(`${green("[SUCCESS]")} - The Bot Activity has been changed. Redirecting in 3 seconds.`);
            setTimeout(() => {
                console.clear();
                displayTitle();
                displayChoices();
            }, 3000);
            break;
        default:
            console.clear();
            displayTitle();
            displayChoices();
            break;
    }
}