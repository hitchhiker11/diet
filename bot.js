const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');


const token = '6593684143:AAGTUqIhfH797vBOW9fN2WUKOKeVPGBGUJI';
const webAppUrl = 'https://master--willowy-smakager-12493b.netlify.app';

const bot = new Telegraf(token);
const app = express();

app.use(express.json());
app.use(cors());

bot.on('text', async (ctx) => {
    const chatId = ctx.chat.id;
    const text = ctx.message.text;

    if (text === '/start') {
        await ctx.reply('Добрый день! Я ваш личный ассистент-диетолог. Ниже появится кнопка, заполните форму'

        // , {
        //     reply_markup: {
        //         keyboard: [
        //             [{ text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'} }]
        //         ]
        //     }
        // }
        
        );

        await ctx.reply('Заполнить данные:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Открыть приложение', web_app: {url: webAppUrl + '/form'} }]
                ]
            }
        });
    }
});

bot.on('callback_query', async (ctx) => {
    const chatId = ctx.chat.id;
    const data = JSON.parse(ctx.update.callback_query.data);

    try {
        await ctx.reply('Спасибо за обратную связь!');
        await ctx.reply('Ваша страна: ' + data.country);
        await ctx.reply('Ваша улица: ' + data.street);

        setTimeout(async () => {
            await ctx.reply('Всю информацию вы получите в этом чате');
        }, 3000);
    } catch (e) {
        console.log(e);
    }
});
bot.launch();
app.post('/web-data', async (req, res) => {
    const { queryId, products = [], totalPrice } = req.body;
    try {
        await bot.answerCbQuery(queryId, `Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`);
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({});
    }
});

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT));
