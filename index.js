process.env.NTBA_FIX_319 = 1;// Без этой строчки будет ругаться 
const TelegramBot = require('node-telegram-bot-api');// Подключает метод для работы с Api telegram

let Token = require("./components/token.js"); //Импортируем токен Нужен для работы Api telegram
let helloMessage = require("./components/hello_message.js"); //Импортируем сообщение приветствия
let contactNode = require("./components/contact_node_message.js"); //Импортируем сообщение контакты ноде
let nameLidNode = require("./components/contact_node_message.js"); //Импортируем сообщение имя лидера ноде
let benefitsOfMode = require("./components/benefits_of_mode_message.js"); //Импортируем сообщение преимушества ноде
let faqInlineKeyboard = require("./components/faq_inline_keyboard.js"); //Импортируем сообщение преимушества ноде
let faqMessage = require("./components/faq_message.js"); //Импортируем сообщение преимушества ноде

var request = require('request');

    const bot = new TelegramBot(Token.Token(), {polling: true});//Создаем новый экземпляр обьекта 

    bot.on('message', (msg) => { // Ждем любое сообшения 
        const chatId = msg.chat.id; //Получаем id пользователя 
        let newHelloMessage = helloMessage.helloMessage1() + msg.from.first_name + helloMessage.helloMessage2(); // Собираем строку из '1 сообшения + имени пользователя + 2 сообшения
        
        switch (msg.text){
            
            case 'Часто задаваемые вопросы':
                bot.sendMessage(chatId, 'Ответы на часто задаваймые вопросы', {
                    reply_markup: {
                        inline_keyboard: faqInlineKeyboard.faqInlineKeyboard()
                    }
                });
                break;

            case 'Преимущества Ноды':
                bot.sendMessage(chatId, benefitsOfMode.benefitsOfMode(), {parse_mode : "HTML"});
                break;

            case 'Лидер Ноды и его Контакты':
                bot.sendMessage(chatId, nameLidNode.nameLidNode(), {parse_mode : "HTML"});

                const url = 'PhotoLid.jpg';
                bot.sendPhoto(chatId, url).then(function(data)
                {
                    bot.sendMessage(chatId, contactNode.contactNode(), {parse_mode : "HTML"});
                });

                
                break;

            default: 
                bot.sendMessage(chatId, newHelloMessage, {
                    reply_markup:{
                        keyboard:[
                            ['Часто задаваемые вопросы'],
                            ['Преимущества Ноды'],
                            ['Лидер Ноды и его Контакты'],
                        ]
                    }
                });
                break;
        }
    });

    bot.on('callback_query', query => {// Ждет пока пользователь совершит событие на инлайн клавиотуре
        bot.sendMessage(query.message.chat.id, faqMessadge(query.data))
    });

    const faqMessadge = (name) => { return faqMessage.faqMessage[(Number(name)-1)] }// Функция принимает id вопроса и возврощает его 