import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import 'dotenv/config'
import { command } from './const.js';

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : "незнакомец"}`));
bot.help((ctx) => ctx.reply(command));


bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('get_information', async (ctx) => {
    try {
        await ctx.replyWithHTML('Информация о <b>чем-то</b>', Markup.inlineKeyboard(
            [Markup.button.callback('Информация 1', 'btn_1')]
        ))
    } catch (error) {
        console.error(error)
    }
  
})

bot.action('btn_1', async (ctx) => {
    try {
        await ctx.answerCbQuery()
       await ctx.reply('👍');
    } catch (error) {
        console.log(error)
    }
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));