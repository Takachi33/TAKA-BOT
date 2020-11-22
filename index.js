const Discord = require ('discord.js');
const { fstat } = require('fs');
const token = require ("./token.json");
const bot = new Discord.Client();




bot.on("ready", async () =>{



  console.log("Le bot est allumé");
  bot.user.setStatus("online");
  bot.user.setActivity("dévlopper mon bot",)

  bot.on('guildMemberAdd', function (member) {
    member.guild.channels.resolve('730140935136084019').send("Bienvenue sur le serveur")
    member.roles.add('765897883169849344');
   });
  

})

bot.on("message", message => {
  if(message.content.startsWith("/ticket")){
    if(message.member.hasPermission('MANAGE_MESSAGES')){
      message.channel.send("**Réagis au ✅ pour créer un ticket**")
      message.react("✅")
      bot.on("messageReactionAdd", (reaction, user) => {
        if (user.bot) return
        if (reaction.emoji.name == "✅") {
          reaction.message.channel.send('**Tu as réagi : ✅**');
          message.delete({ timeout: 3000 })
          reaction.message.guild.channels.create(`ticket de ${user.username}`, {
            type: 'text',
            permissionOverwrites: [{
              id: reaction.message.guild.id,
              allow: ['SEND_MESSAGES'],
              allow: ['ADD_REACTIONS']
            }]
        }).then(channel_ticket => {
          channel_ticket.send(`**:white_check_mark:Channel crée ! ${user}**`)
          .then(msg => {
          msg.delete({ timeout: 10000 })
          })
        })
    }else {
      message.channel.send(":x: Tu n'as pas les permissions necéssaires !")
      message.delete({ timeout: 3000 })
    }
  })
    }
  }
})

bot.on("message", message =>{
  if(message.content.startsWith("/ping")){
    message.channel.send("Pinging...").then(m =>{
      var ping = m.createdTimestamp - message.createdTimestamp;
      var embed = new Discord.MessageEmbed()
      .setAuthor(`Pong ! le ping est de ${ping}`)
      .setColor('#0099ff')
      m.edit(embed)
    })
    .then(msg => {
      msg.delete({ timeout: 10000 })
    })
}
})

bot.on("message", message =>{
  if (message.content.startsWith("/ban")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: `Banni ${user.tag}`,
          })
          .then(() => {
            message.reply(`**:white_check_mark: L'utilisateur ${user} a bien été banni**`)
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
          })
          .catch(err => {
            message.reply("**:x: Je n'ai pas pu bannir le membre**")
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
            console.error(err);
          });
      } else {
        message.reply("**:x: Cet utilisateur n'est pas dans cette guilde !**")
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
      }
    } else {
      message.reply("**:x: Vous devez mentionner un utilisateur à bannir !**")
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
    }
  }
})

bot.on("message", message =>{
  if (message.content.startsWith("/kick")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick(`Kické ${user.tag}`)
          .then(() => {
            message.reply(`**:white_check_mark: L'utilisateur ${user} a bien été kick**`)
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
          })
          .catch(err => {
            message.reply("**:x: Je n'ai pas pu kicker le membre**")
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
            console.error(err);
          });
      } else {
        message.reply("**:x: Cet utilisateur n'est pas dans cette guilde !**")
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
      }
    } else {
      message.reply("**:x: Vous devez mentionner un membre à kick !**")
            .then(msg => {
              msg.delete({ timeout: 3000 })
            })
    }
  }
})

bot.on('guildMemberAdd', function (member) {
  member.guild.channels.resolve('730140935136084019').send("Bienvenue sur le serveur")
 });

bot.on("message", message =>{
  if (message.content.startsWith("/say")) {
    message.delete();
    let arg = message.content.trim().split(/ +/g);
    const ms = (arg.splice(1).join(' '));
    message.channel.send(ms);
  }
})
 

bot.on("message", async message => {
  if (message.content.startsWith("/clear")) {
    message.delete()
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
      let args = message.content.split(/ +/g);
      if (args[1]) {
        if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 100) {
          message.channel.bulkDelete(args[1]++, true).then(collection => {
            message.channel.send(`✅ Vous avez supprimé ${collection.size} message(s) !`).then(message => {
              setTimeout(() => {
                message.delete()
              }, 5000)
            })
          })
        }
        else {
          message.channel.send(`:x: **Vous devez indiquer une valeur entre 1 et 100 !**`).then(message => {
            setTimeout(() => {
              message.delete()
            }, 5000)
          })
        }
      }
      else {
        message.channel.send(`:x: **Vous devez indiquer un nombre de message a supprimer !**`).then(message => {
          setTimeout(() => {
            message.delete()
          }, 5000)
        })
      }
    }
    else {
      message.channel.send(`:x: **Vous devez avoir la permission de gérer les messages pour éxecuter cette commande !**`).then(message => {
        setTimeout(() => {
          message.delete()
        }, 5000)
      })
    }
  }
})

bot.login (token.token)