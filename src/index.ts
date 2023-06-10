import Discord,{GatewayIntentBits,Partials,EmbedBuilder} from "discord.js"
const { QuickDB } = require("quick.db");
const db = new QuickDB(); 
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
      ]
})

client.on("messageCreate",async (message)=>{
if(message.content == "!oi"){
    message.reply("hi")
}
if(message.content == "!embed"){
const embed = new EmbedBuilder()
.setDescription("teste")
.setTitle("teste")
.setImage("https://imagecolorpicker.com/imagecolorpicker.png")
.setFooter({text:"teste"})
message.reply({content:"teste",embeds:[embed]})
}
if(message.content == "!criarnumero"){
    await db.set(`numero__${message.author.id}`,1)
message.reply("Numero criado")
}
if(message.content == "!addnumero"){
    const numero = await db.get(`numero__${message.author.id}`)
    if(!numero){
 message.reply("Não nem numero para adicionar");
    }else
   { await db.add(`numero__${message.author.id}`,1)
message.reply("Numero adicionado")}

}
if(message.content == "!vernumero"){
    const numero = await db.get(`numero__${message.author.id}`)
    if(!numero){
 message.reply("Não possui numeros");
    }else
   { 
message.reply("Você possui " + numero+ " numeros")}

}
if(message.content == "!subnumero"){
    const numero = await db.get(`numero__${message.author.id}`)
    if(!numero){
 message.reply("Não nem numero para remover");
    }else
   { await db.sub(`numero__${message.author.id}`,1)
message.reply("Numero removido")}

}
if(message.content == "!criardado"){
   await db.set(`name__${message.author.id}`,message.author.username)
    message.reply("Seu nome foi salvo no banco de dados com sucesso")
}
if(message.content == "!verdado"){
    const nome = await db.get(`name__${message.author.id}`)
    if(nome){
        message.reply(`seu nome é ${nome}`)
    }else{
        message.reply(`Você não criou dado nenhum`)
    }
    }
    if(message.content == "!deletedado"){
        const nome = await db.get(`name__${message.author.id}`)
        if(nome){
            await db.delete(`name__${message.author.id}`)
            message.reply(`seu dado fo deletado com sucesso`)
        }else{
            message.reply(`Você não criou dado nenhum para ser deletado`)
        }
    }
    

})
client.login("token")
