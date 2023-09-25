const { Bot, InputFile, InputMediaBuilder } = require("grammy");
const { hydrate } = require("@grammyjs/hydrate");
const { hydrateFiles } = require("@grammyjs/files");
const fs = require("fs");
const { default: axios } = require("axios");
const execSync = require("child_process").execSync;
const fsPromises = fs.promises;
const logger = require('./logger');
require('dotenv').config()


// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(process.env.BOT_TOKEN); 
bot.api.config.use(hydrateFiles(bot.token));

bot.use(hydrate());
//replyWithAutoDelete
bot.use(async (ctx, next) => {
  ctx.replyWithAutoDelete = async (msg, config = {}, secForDelete = 20) => {
    let footerMsg = `Auto-delete: ${secForDelete}`;

    ctx.reply(`${msg}\n\n${footerMsg}`).then(async (statusMessage) => {
      for (let i = secForDelete - 1; i > 0; i--) {
        let footerMsg = `Auto-delete: ${i}`;

        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        await statusMessage.editText(`${msg}\n\n${footerMsg}`);
      }
      statusMessage.delete();
    });
  };
  // Run remaining handlers.
  await next();
});
//replyWithPhotoAutoDelete
bot.use(async (ctx, next) => {
  ctx.replyWithPhotoAutoDelete = async (
    pathPhoto,
    caption,
    secForDelete = 20
  ) => {
    let footerMsg = (await getMessangeAutoDelete()).replace(
      "seconds",
      secForDelete
    );
    let file = new InputFile(pathPhoto);
    // const newMedia = InputMediaBuilder.photo(
    //   "/github/mvp-monero-pay-tg-bot/photo2.jpg"
    // );

    // const photo = InputMediaBuilder.photo(pathPhoto, {
    //   caption: "grammY is awesome",
    //   // etc
    // });
    // await ctx.replyWithMediaGroup([photo]);
    ctx
      .replyWithPhoto(file, {
        caption: caption + footerMsg,
        parse_mode: "HTML",
      })
      .then(async (statusMessage) => {
        for (let i = secForDelete - 1; i > 0; i-=2) {
          let footerMsg = (await getMessangeAutoDelete()).replace("seconds", i);

          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          await statusMessage.editCaption(caption + footerMsg, {
            parse_mode: "HTML",
          });
        }
        statusMessage.delete();
      });

    // ctx.reply(`${msg}\n\n${footerMsg}`).then(async (statusMessage) => {
    //   for (let i = secForDelete - 1; i > 0; i--) {
    //     let footerMsg = `Auto-delete: ${i}`;

    //     await new Promise((resolve) => {
    //       setTimeout(resolve, 1000);
    //     });
    //     await statusMessage.editText(`${msg}\n\n${footerMsg}`);
    //   }
    //   statusMessage.delete();
    // });
  };

  // Run remaining handlers.
  await next();
});

// Handle the /start command.
bot.command("start", async (ctx) => {
  let {id,username}= ctx.from
  // logger.info(`/start от пользователя username: ${username} id: ${id}`);
  
  await ctx.reply(await getMessangeWelcome(), {
    parse_mode: "HTML",
  });
  await ctx.deleteMessage();
});
// Handle other messages.

bot.command("replenishmentUsingMonero",async (ctx)=>{
try{
  let {id,username}= ctx.from
  logger.info(`/replenishmentUsingMonero от пользователя username: ${username} id: ${id}`);

  let addressForReplenishment= (await axios.post(`${process.env.URL_GATEWAY}/monero/getAddressForReplenishment`, {

    uid: `t${ctx.from.id}`

    
  })).data.address;
  
  let pathQrForReplenishment=`bufferImage/${addressForReplenishment}_ForReplenishment.png`;

  let message = (await getMessangeTopUpBalance())
  .replace('address',addressForReplenishment);
  


  await exec(`qrencode -o ${pathQrForReplenishment} '${addressForReplenishment}'`);
  await ctx.replyWithPhotoAutoDelete(
    pathQrForReplenishment,
    message
  )
  // await exec(`rm -rf ${pathQrForReplenishment}`);

}catch(e){
  console.log(e)
}
  
})

bot.command("getBalance",async (ctx)=>{
  try{
    let {id,username}= ctx.from
    logger.info(`/getBalance от пользователя username: ${username} id: ${id}`);

    let   balance = (await axios.post(`${process.env.URL_GATEWAY}/account/getBalance`, {

      uid: 't'+ctx.from.id
      
    })).data;

    
    ctx.  replyWithAutoDelete(balance.balanceRub);
  }catch(e){
    console.log(e)
  }
  

})
bot.on(":text", async (ctx) => {
  ctx.reply('text');
  //   ctx.replyWithAutoDelete("sadasd");
  // let pathPhoto = "/github/mvp-monero-pay-tg-bot/photo.png";
  // let caption =
  //   '<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.';
  // ctx.replyWithPhotoAutoDelete(pathPhoto, caption,secForDelete =60);
  // //   await ctx.replyWithPhoto(a, {
  // //     caption:
  // //       '<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
  // //     parse_mode: "HTML",
  // //   });
  // // await ctx.api.sendPhoto(
  // //   ctx.from.id,
  // //   new InputFile("/github/mvp-monero-pay-tg-bot/photo.png"),
  // //   {
  // //     caption: "photo.jpg",
  // //   }
  // // );
});
bot.on(":photo", async (ctx) => {

  const file = await ctx.getFile();
  // Download the file to a temporary location.
  const path = await file.download(file.file_path);
  try{
    let zbarimgOut =  (await execSync(`zbarimg ${file.file_path}`)).toString();
    ctx.reply(zbarimgOut);

  }catch(e){
    ctx.reply('QR-code не распознан');
    
  }


  //   ctx.replyWithAutoDelete("sadasd");
  // let pathPhoto = "/github/mvp-monero-pay-tg-bot/photo.png";
  // let caption =
  //   '<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.';
  // ctx.replyWithPhotoAutoDelete(pathPhoto, caption,secForDelete =60);
  // //   await ctx.replyWithPhoto(a, {
  // //     caption:
  // //       '<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
  // //     parse_mode: "HTML",
  // //   });
  // // await ctx.api.sendPhoto(
  // //   ctx.from.id,
  // //   new InputFile("/github/mvp-monero-pay-tg-bot/photo.png"),
  // //   {
  // //     caption: "photo.jpg",
  // //   }
  // // );
});
// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();

async function getMessangeAutoDelete() {
  return `\n\n${(
    await fsPromises.readFile("./messange/auto-delete.html")
  ).toString()}`;
}
async function getMessangeWelcome() {
  return `${(await fsPromises.readFile("./messange/welcome.html")).toString()}`;
}
async function getMessangeTopUpBalance() {
  return `${(await fsPromises.readFile("./messange/top-up-balance.html")).toString()}`;
}
