const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences ] });
const prompt = require("basic-prompt");
const chalk = require('chalk');
const AsciiTable = require('ascii-table');
const setTitle = require('console-title');
require('dotenv').config();

// Chalk config
const green = chalk.hex('33FF83');
const red = chalk.hex('FF3C33');
const yellow = chalk.hex('FFEC33');
const blue = chalk.hex('3399FF');
const grey = chalk.hex('5D6476');
const purple = chalk.hex('D133FF');

console.clear();
setTitle("Yapzx");
displayTitle();

// Check for ENV config
if (!process.env.TOKEN || process.env.TOKEN == "") {
    console.log(`${grey("[.ENV]")}${red("[ERROR]")} - TOKEN is not provided in the .env file.`);
    return;
}

if (!process.env.BOT_ID || process.env.BOT_ID == "") {
    console.log(`${grey("[.ENV]")}${red("[ERROR]")} - BOT_ID is not provided in the .env file.`);
    return;
}

if (!process.env.GUILD_ID || process.env.GUILD_ID == "") {
    console.log(`${grey("[.ENV]")}${red("[ERROR]")} - GUILD_ID is not provided in the .env file.`);
    return;
}

console.log(`${grey("[.ENV]")}${green("[SUCCESS]")} - The config has been checked and no errors is detected.`);
console.log(`${purple("[DISCORD]")}${blue('[INFO]')} - Logging into Discord...`);
client.login(process.env.TOKEN).catch(() => {
    console.log(`${purple("[DISCORD]")}${red('[ERROR]')} - Unable to login. Please make sure the Token is valid.`);
});

// Discord Bot
client.on("ready", () => {
    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")} - The bot is up.`);
    console.log(`${purple("[DISCORD]")}${blue("[INFO]")} - Checking guild id...`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) {
        console.log(`${purple("[DISCORD]")}${red("[ERROR]")} - The guild id you provided is wrong. The bot doesn't have access to it or the guild has been deleted.`);
        process.exit();
    } else {
        console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")} - The guild ${purple(`[${guild.name}]`)} id you provided is valid. The panel will appear in 3 seconds.`);
    }

    setTitle("Yapzx - Ready");
    try {
        client.user.setActivity({
            name: "Yapzx DA GOAT!",
            type: ActivityType.Watching
        });
    } catch(e) {};

    setTimeout(() => {
        resetDisplay();
    }, 3000);
});


// Displays
function resetDisplay() {
    console.clear();
    displayTitle();
    displayChoices();
}

function displayTitle() {
    console.log(red(" __  __     ______     ______   ______     __  __    \r\n\/\\ \\_\\ \\   \/\\  __ \\   \/\\  == \\ \/\\___  \\   \/\\_\\_\\_\\   \r\n\\ \\____ \\  \\ \\  __ \\  \\ \\  _-\/ \\\/_\/  \/__  \\\/_\/\\_\\\/_  \r\n \\\/\\_____\\  \\ \\_\\ \\_\\  \\ \\_\\     \/\\_____\\   \/\\_\\\/\\_\\ \r\n  \\\/_____\/   \\\/_\/\\\/_\/   \\\/_\/     \\\/_____\/   \\\/_\/\\\/_\/ \r\n                                                     "));
}

async function displayChoices() {
    setTitle("Yapzx - Ready");
    console.log(red("Created for educational purposes, I am not responsible for your actions so don't be an asshole and use this tool on your server :)"))
    console.log(`${yellow("[WARNING]")} - If it doesn't work at a moment, that's means that you got rate limited. Check if it is the bot or your IP. If it is your IP, use a VPN.`);
    // Display the table
    console.log(`+---------------------------------------+---------------------+------------------------+\r\n|                ${purple("Server")}                 |       ${purple("Members")}       |          ${purple("User")}          |\r\n+---------------------------------------+---------------------+------------------------+\r\n| ${purple("[1]")} - Change server name              | ${purple("[10]")} - Add Role All | ${purple("[14]")} - Change Activity |\r\n| ${purple("[2]")} - Create Channels                 | ${purple("[11]")} - Ban All      |                        |\r\n| ${purple("[3]")} - Create Roles                    | ${purple("[12]")} - Unban All    |                        |\r\n| ${purple("[4]")} - Create Emojis                   | ${purple("[13]")} - Rename All   |                        |\r\n| ${purple("[5]")} - Remove all Channels             |                     |                        |\r\n| ${purple("[6]")} - Remove all Roles                |                     |                        |\r\n| ${purple("[7]")} - Remove all Emojis               |                     |                        |\r\n| ${purple("[8]")} - Remove all Invites              |                     |                        |\r\n| ${purple("[9]")} - Send Messages in every Channels |                     |                        |\r\n+---------------------------------------+---------------------+------------------------+`);
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const choice = await prompt("> ");

    switch(choice) {
        case '1':
            const changeGuildNameInput = await prompt("Name of the guild: ");
            if (!changeGuildNameInput|| changeGuildNameInput.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
            }
            if (changeGuildNameInput.length > 100 || changeGuildNameInput.length < 2) {
                console.log(`${red("[ERROR]")} - Must be between 2 and 100 in length.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }

            const guildNameChanged = await guild.setName(changeGuildNameInput).catch(() => {
                console.log(`${purple("[DISCORD]")}${red("[ERROR]")} - The guild name can't be changed.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
            });

            if (guildNameChanged) {
                console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")} - The guild name has been changed. Redirecting in 3 seconds.`);
            }

            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '2':
            const createChannelsHowMany = await prompt("How many channels: ");
            if (isNaN(createChannelsHowMany)) {
                console.log(`${red("[ERROR]")} - Number only.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }
            parseInt(createChannelsHowMany);

            if (createChannelsHowMany > 500) {
                console.log(`${red("[ERROR]")} - You can't create over 500 channels.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }

            const createChannelsName = await prompt("Name of the channels: ");
            if (!createChannelsName || createChannelsName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
            }

            console.clear();
            displayTitle();

            let numOfChannelsCreated = 0;
            while (numOfChannelsCreated < createChannelsHowMany) {
                numOfChannelsCreated++;

                const channelCreated = await guild.channels.create({
                    name: createChannelsName
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfChannelsCreated}/${createChannelsHowMany}]`)} - Unable to create the channel | ${e?.rawError?.message}`);
                });

                if (channelCreated) {
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfChannelsCreated}/${createChannelsHowMany}]`)} - Channel created.`);
                }
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '3':
            const createRolesHowMany = await prompt("How many roles: ");
            if (isNaN(createRolesHowMany)) {
                console.log(`${red("[ERROR]")} - Number only.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }

            if (createRolesHowMany > 500) {
                console.log(`${red("[ERROR]")} - You can't create over 500 roles.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }

            const createRolesName = await prompt("Name of the roles: ");
            if (!createRolesName || createRolesName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
            }

            console.clear();
            displayTitle();

            let numOfRolesCreated = 0;
            while (numOfRolesCreated < createRolesHowMany) {
                numOfRolesCreated++;

                const roleCreated = await guild.roles.create({
                    name: createRolesName
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfRolesCreated}/${createRolesHowMany}]`)} - Unable to create a role  | ${e?.rawError?.message}`);
                });

                if (roleCreated) {
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfRolesCreated}/${createRolesHowMany}]`)} - Role created.`);
                }
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '4':
            console.log(`${yellow("[WARNING]")} - Uploading emojis is rate limited quickly. If uploading emojis doesn't work or stopped working, that's because it got rate limited. Wait a few minutes or few hours.`);
            const createEmojisHowMany = await prompt(`How many emojis: `);
            if (isNaN(createEmojisHowMany)) {
                console.log(`${red("[ERROR]")} - Number only.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }

            if (createEmojisHowMany > 50) {
                console.log(`${red("[ERROR]")} - You can't create over 35 emojis.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }

            const createEmojisName = await prompt("Name of the emojis: ");
            if (!createEmojisName || createEmojisName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty name.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
            }

            const createEmojisLinkToImage = await prompt("Link of image to put: ");
            if (!createEmojisName || createEmojisName.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty url.`);

                setTimeout(() => {
                    resetDisplay();
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
                        return console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Image size exceeded maximum size.`);
                    }

                    if (e?.rawError?.code === 50035) {
                        return console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Unable to create an emoji. The name is not correct (remember to always use _ as spaces).`);
                    }
                    
                    return console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Unable to create an emoji | ${e?.rawError?.message}`);
                });

                if (emojiCreated) {
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfEmojisCreated}/${createEmojisHowMany}]`)} - Emoji created.`);
                };
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '5':
            console.clear();
            displayTitle();

            const numOfChannels = guild.channels.cache.size;
            if (numOfChannels === 0) {
                resetDisplay();
                return;
            }

            let numOfDeletedChannels = 0;
            for await (let channel of guild.channels.cache) {
                numOfDeletedChannels++;
                channel = channel[1];

                await channel.delete().then((channel) => {
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfDeletedChannels}/${numOfChannels}]`)} - ${channel.name} has been deleted.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfDeletedChannels}/${numOfChannels}]`)} - Unable to delete ${channel.name} | ${e?.rawError?.message}`);
                });
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
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
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfDeletedRoles}/${numOfRoles}]`)} - ${role.name} has been deleted.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfDeletedRoles}/${numOfRoles}]`)} - Unable to delete ${role.name} | ${e?.rawError?.message}`);
                });
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '7':
            console.clear();
            displayTitle();

            const numOfEmojis = guild.emojis.cache.size;
            if (numOfEmojis === 0) {
                resetDisplay();
                return;
            }

            let numOfDeletedEmojis = 0;
            for await (let emoji of guild.emojis.cache) {
                numOfDeletedEmojis++;
                emoji = emoji[1];

                await emoji.delete().then((emoji) => {
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfDeletedEmojis}/${numOfEmojis}]`)} - ${emoji.name} has been deleted.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfDeletedEmojis}/${numOfEmojis}]`)} - Unable to delete ${emoji.name} | ${e?.rawError?.message}`);
                });
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '8':
            console.clear();

            const invitesList = await guild.invites.fetch();
            if (invitesList.size === 0) return resetDisplay();

            const numOfInvites = invitesList.size;
            let numOfInvitesTerminated = 0;
            for await (let invite of invitesList) {
                invite = invite[1];

                await invite.delete().then(() => {
                    numOfInvitesTerminated++
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfInvitesTerminated}/${numOfInvites}]`)} - Invite .gg/${invite.code} has been terminated.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfInvitesTerminated}/${numOfInvites}]`)} - Unable to terminate .gg/${invite?.code} | ${e?.rawError?.message}`);
                });
            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '9':
            const spamMessageInput = await prompt("Your message content: ");
            if (spamMessageInput.trim() === "") {
                console.log(`${red("[ERROR]")} - Input can't be empty.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
            }

            const spamMessageWithEveryone = await prompt("@everyone ? [yes/no]: ");

            const spamMessageNumOfChannels = guild.channels.cache.size;
            if (spamMessageNumOfChannels === 0) return resetDisplay();

            console.log(`${yellow("[WARNING]")} - Creation of webhook is rate limited quickly.`);
            console.log(`${blue("[INFO]")} - Using webhooks is more faster at sending a lot of messages than without it but remind the warning above.`)
            const useSpamWebhook = await prompt("Use spam webhook ? [yes/no]:");

            if (useSpamWebhook.trim() === "yes") {
                const nameOfSpamWebhook = await prompt("Name of the webhooks: ");
                if (nameOfSpamWebhook.trim() === "") {
                    console.log(`${red("[ERROR]")} - Can't be empty.`);
    
                    setTimeout(() => {
                        resetDisplay();
                    }, 2000);
                    return;
                }

                const numOfSpamWebhookInput = await prompt("How much spam webhook: ");
                if (numOfSpamWebhookInput.trim() === "") {
                    console.log(`${red("[ERROR]")} - Can't be empty.`);
    
                    setTimeout(() => {
                        resetDisplay();
                    }, 2000);
                    return;
                }
    
                if (isNaN(numOfSpamWebhookInput)) {
                    console.log(`${red("[ERROR]")} - Number only`);
    
                    setTimeout(() => {
                        resetDisplay();
                    }, 2000);
                    return;
                }
    
                if (numOfSpamWebhookInput < 2) {
                    console.log(`${red("[ERROR]")} - 2 minimum.`);
    
                    setTimeout(() => {
                        resetDisplay();
                    }, 2000);
                    return;
                }
    
                if (numOfSpamWebhookInput > 50) {
                    console.log(`${red("[ERROR]")} - Can't be over 50 webhooks.`);
    
                    setTimeout(() => {
                        resetDisplay();
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
                            console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfSpamWebhookCreated}/${numOfSpamWebhookInput}]`)} - Webhook created!`)
                            spamWebhooks.push(webhook);
                        });
                    }
                }
    
                let numOfMessagesSent = 0;
                for (let webhook of spamWebhooks) {
                    setInterval(async () => {
                        const webhookMessageSent = await webhook.send({
                            content: `${spamMessageWithEveryone == "yes" ? "@everyone" : spamMessageWithEveryone == "no" ? "" : ""} ${spamMessageInput}`
                        }).catch((e) => {
                            console.log(`${purple("[DISCORD]")}${red("[ERROR]")} - Unable to send the message. | ${e?.rawError?.message}`);
                        });
    
                        if (webhookMessageSent) {
                            numOfMessagesSent++
                            console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfMessagesSent}]`)} - Message sent!`);
                        }
                    }, 1);
                }
            } else {
                let numOfMessagesSent = 0;
                for (let channel of guild.channels.cache) {
                    channel = channel[1];
    
                    setInterval(async () => {
                        if (channel.type !== 0) return;

                        const spamMessageSent = await channel.send({
                            content: `${spamMessageWithEveryone == "yes" ? "@everyone" : spamMessageWithEveryone == "no" ? "" : ""} ${spamMessageInput}`
                        }).catch((e) => {
                            console.log(`${purple("[DISCORD]")}${red("[ERROR]")} - Unable to send the message. | ${e?.rawError?.message}`);
                        });
    
                        if (spamMessageSent) {
                            numOfMessagesSent++
                            console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfMessagesSent}]`)} - Message sent!`);
                        }
                    }, 1);
                }
            }
            break;
        case'10':
            const addRoleIdInput = await prompt("Role ID: ");
            if (!addRoleIdInput|| addRoleIdInput.trim() === "") {
                console.log(`${red("[ERROR]")} - Can't be empty.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                return;
            }

            const roleToAdd = guild.roles.cache.get(addRoleIdInput);
            if (!roleToAdd) {
                console.log(`${purple("[DISCORD]")}${red("[ERROR]")} - Role not found.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                return;
            }

            console.clear();

            for await (let member of guild.members.cache) {
                member = member[1];

                await guild.members.addRole({
                    user: member.user,
                    role: roleToAdd
                }).then(() => {
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")} - ${roleToAdd.name} has been added to ${member.user.username}.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")} - Unable to add role to ${member.user.tag} | ${e?.rawError?.message}`);
                });

            }

            console.log(`${green("[SUCCESS]")} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case'11':
            console.clear();

            const numOfMembersToBan = guild.members.cache.size;
            let numOfMembersBanned = 0;
            for await (let member of guild.members.cache) {
                member = member[1];

                await member.ban().then(() => {
                    numOfMembersBanned++
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfMembersBanned}/${numOfMembersToBan}]`)} - ${member.user.tag} has been banned.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfMembersBanned}/${numOfMembersToBan}]`)} - Can't ban ${member.user.tag} | ${e?.rawError?.message}`);
                });
            }

            console.log(`${green("[SUCCESS]")}${blue(`[${numOfMembersBanned}/${numOfMembersToBan}]`)} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case'12':
            console.clear();

            const listOfMembersBanned = await guild.bans.fetch();
            if (listOfMembersBanned.size === 0) return resetDisplay();

            const numOfBannedMembers = listOfMembersBanned.size;
            let numOfUnbannedMembers = 0;
            for await (let bannedMember of listOfMembersBanned) {
                bannedMember = bannedMember[1];

                await guild.members.unban(bannedMember.user).then(() => {
                    numOfUnbannedMembers++;
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfUnbannedMembers}/${numOfBannedMembers}]`)} - ${bannedMember.user.tag} has been unbanned.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfUnbannedMembers}/${numOfBannedMembers}]`)} - Can't unban ${bannedMember.user.tag} | ${e?.rawError?.message}`);
                })
            }

            console.log(`${green("[SUCCESS]")}${blue(`[${numOfUnbannedMembers}/${numOfBannedMembers}]`)} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case'13':
            const changeNameInput = await prompt("Name: ");
            if (!changeNameInput|| changeNameInput.trim() === "") {
                console.log(`${red("[ERROR]")} - Can't be empty.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                return;
            }

            console.clear();

            const numOfMembersToRename = guild.members.cache.size;
            let numOfMembersRenamed = 0;
            for await (let member of guild.members.cache) {
                member = member[1];

                await member.setNickname(changeNameInput).then(() => {
                    numOfMembersRenamed++;
                    console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")}${blue(`[${numOfMembersRenamed}/${numOfMembersToRename}]`)} - ${member.user.tag} has been renamed.`);
                }).catch((e) => {
                    console.log(`${purple("[DISCORD]")}${red("[ERROR]")}${blue(`[${numOfMembersRenamed}/${numOfMembersToRename}]`)} - Can't rename ${member.user.tag} | ${e?.rawError?.message}`);
                });

            }

            console.log(`${green("[SUCCESS]")}${blue(`[${numOfMembersRenamed}/${numOfMembersToRename}]`)} - Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case '14':
            const changeBotActivityInput = await prompt("Text of the activity: ");
            if (!changeBotActivityInput|| changeBotActivityInput.trim() === "") {
                console.log(`${red("[ERROR]")} - You can't set an empty text.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                return;
            }
            if (changeBotActivityInput.length > 100) {
                console.log(`${red("[ERROR]")} - Can't be over 100 in length.`);

                setTimeout(() => {
                    resetDisplay();
                }, 2000);
                break;
            }

            try {
                client.user.setActivity({
                    name: changeBotActivityInput,
                    type: ActivityType.Watching
                });
            } catch(e) {};
            
            console.log(`${purple("[DISCORD]")}${green("[SUCCESS]")} - The Bot Activity has been changed. Redirecting in 3 seconds.`);
            setTimeout(() => {
                resetDisplay();
            }, 3000);
            break;
        case 'credits':
            console.clear();
            setTitle("Yapzx - Credits");

            console.log(yellow("\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E6\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FC\u28FF\u2846\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u2839\u28FF\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FE\u2807\u2800\u28BB\u28C7\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2832\u28F6\u28F6\u28F6\u28F6\u28F6\u28F6\u28F6\u28FE\u287F\u2800\u2800\u2808\u28FF\u28F6\u28F6\u28F6\u28F6\u28F6\u28F6\u28F6\u2876\u2816\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283F\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E4\u28FE\u281F\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u28BF\u28E6\u2844\u2800\u2800\u2800\u2800\u2800\u28A0\u28F6\u283F\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28F0\u287F\u2800\u2800\u2800\u28C0\u2800\u2800\u2818\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u2864\u2804\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u2803\u2880\u28F4\u287E\u283F\u28F7\u28C4\u2840\u28B9\u28F7\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A6\u28C4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28C0\u28F4\u287F\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FE\u28FF\u28FE\u281F\u280B\u2800\u2800\u2808\u2819\u28BF\u28F6\u28FF\u28C7\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28F6\u28E4\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u28E0\u287E\u28B9\u28FF\u281F\u2845\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28F8\u287F\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u281B\u28BF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A8\u287B\u28FF\u284E\u28BF\u28C6\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u28A0\u28BE\u28FF\u2807\u289F\u28E5\u287E\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2832\u28A4\u28C4\u2840\u2800\u2800\u2800\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BB\u28EE\u28FF\u2838\u28FF\u2857\u28C4\u2800\u2800\r\n\u2800\u28A0\u287F\u28B8\u28FF\u28F4\u28FF\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u283F\u28F7\u28E4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B9\u28FF\u28E6\u28FF\u2847\u28FB\u2846\u2800\r\n\u2800\u28FE\u28F7\u28B8\u287F\u28CB\u28F4\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E4\u28E4\u28C4\u28E0\u2800\u2800\u2800\u2800\u2808\u28BB\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B7\u28CC\u28BB\u2847\u28FF\u28FF\u2800\r\n\u2800\u28BF\u28FF\u2898\u28FF\u28FF\u2803\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28F6\u28FF\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2839\u28FF\u28FF\u28E6\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u28BF\u28F7\u2844\u28FF\u28FF\u2880\r\n\u28E7\u2838\u28FF\u28FC\u287F\u28E3\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28FE\u28FF\u28FF\u28FF\u28FF\u28C5\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2838\u28FF\u28FF\u28E7\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28CC\u283B\u28FF\u28FF\u2807\u28FC\r\n\u28FF\u2846\u28B9\u285F\u28F0\u287F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28FF\u281F\u2809\u2819\u28BF\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BF\u28FF\u28FF\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B9\u28E7\u2839\u285F\u28A0\u28FF\r\n\u28BB\u28FF\u2844\u28B0\u28FF\u2807\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2801\u2800\u2800\u2800\u2800\u2819\u28BF\u28F7\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u28FC\u28FF\u28FF\u28F7\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u28FF\u28E7\u28A0\u28FF\u285F\r\n\u284C\u28BF\u28F7\u28FE\u287F\u28A0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28CE\u28B9\u28FF\u28FE\u287F\u2881\r\n\u28F7\u284C\u283B\u28FF\u2847\u28FC\u2847\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u283B\u28FF\u28FF\u28E6\u28C0\u28FC\u28FF\u28FF\u28FF\u2803\u2800\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u2800\u28FF\u281F\u28E0\u28FE\r\n\u2818\u28FF\u28E6\u2859\u2803\u28FF\u2847\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28F8\u28FF\u285F\u28BF\u28FF\u28F6\u28E4\u28C4\u28C0\u2840\u2800\u2880\u28C8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28B8\u28FF\u2800\u288B\u28FC\u28FF\u2803\r\n\u2800\u28B8\u28BF\u28FF\u28E6\u28FF\u28C7\u2838\u28C6\u2800\u2800\u2800\u2800\u2880\u28E4\u28FE\u287F\u2809\u2801\u2800\u2808\u281B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u28C0\u2800\u2800\u2800\u2800\u2800\u28F0\u2847\u28B8\u28FF\u28F4\u28FF\u281F\u2865\u2800\r\n\u2800\u2800\u28A7\u28CD\u283B\u28BF\u28FF\u2840\u28FF\u28C7\u2800\u2800\u28A0\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u2819\u281B\u281B\u281B\u280B\u2809\u2808\u283B\u28FF\u28FF\u2857\u2800\u2800\u2800\u28F0\u28FF\u2801\u28FE\u287F\u281B\u28E1\u287E\u2801\u2800\r\n\u2800\u2800\u2800\u283B\u28F7\u28E6\u28CD\u2873\u28B9\u28FF\u2857\u28E6\u2840\u2809\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u2800\u2800\u28E0\u28BA\u28FF\u285F\u2888\u28E1\u28F4\u28FE\u281F\u2801\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2808\u28BB\u28FF\u28FF\u28F6\u28FF\u28FF\u284C\u28BF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28F4\u28FF\u2883\u28FE\u28FF\u28F6\u28FF\u283F\u285F\u2801\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2808\u2833\u28E4\u28CD\u28C9\u28DB\u28DB\u284A\u283B\u28FF\u28E6\u28C4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28E0\u28F4\u28FF\u281F\u28E1\u28DB\u28C9\u28C9\u28ED\u28F4\u281E\u2801\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u28BB\u287F\u283F\u283F\u283F\u283F\u283F\u281B\u28DB\u28E9\u28F4\u28F6\u2876\u281E\u28F2\u2876\u28B6\u28F6\u285B\u283F\u28F6\u28F6\u28EF\u28C9\u285B\u281B\u283B\u283F\u283F\u283F\u283F\u285F\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2811\u2836\u28E6\u28E4\u28F6\u28F6\u28FF\u28FF\u287F\u281B\u28E1\u28F4\u281F\u2809\u2800\u2800\u2808\u283B\u28B7\u28C4\u2859\u283B\u28BF\u28FF\u28F7\u28F6\u28F6\u28F6\u2836\u280A\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u2809\u2809\u2809\u2800\u2820\u28FE\u281F\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28FF\u2866\u2800\u2800\u2809\u2809\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800"));
            console.log(red("\nСлава Yapzx, используй этот инструмент только для себя, а не для того, чтобы уничтожить тебя, гребаного засранца. Я надеюсь, что вы любите этот инструмент и не будете им злоупотреблять :))"));
            console.log("\n\nRedirecting in 10 seconds...");
            
            setTimeout(() => {
                resetDisplay();
            }, 10000);
            break;
        default:
            resetDisplay();
            break;
    }
}