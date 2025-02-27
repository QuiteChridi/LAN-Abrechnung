const path = require('path');
const DB = require('../../../Web/lib/postgres');
const { default: i18n } = require('new-i18n')
const newi18n = new i18n(path.join(__dirname, '../', '../', 'lang'),  ['de', 'en', 'de-by', 'ua', 'it', 'fr'], process.env.Fallback_Language);
const { log } = require('../../../Web/lib/logger');
const { boolToText } = require('../../lib/utils');
const randomstring = require('randomstring');

module.exports = function (bot, mainconfig, preisliste) {
    bot.on('callbackQuery', (msg) => {
        DB.get.tglang.Get(msg.from.id).then(function (tglang_response) {
            if ('inline_message_id' in msg) {
                var inlineId = msg.inline_message_id;
            } else {
                var chatId = msg.message.chat.id;
                var messageId = msg.message.message_id;
            }

            var data = msg.data.split("_")

            if (parseInt(data[1]) !== msg.from.id) //Execute always, not user bound
            {
                if (data[0] === 'F') {
                    if (data[1] === 'PC') //If guest has PC with him
                    {
                        DB.write.Guests.UpdateCollumByID(msg.from.id, "pc", data[2]).then(function (response) {
                            let Message = `${msg.message.text}\n\n<b>Antwort:</B> ${boolToText(data[2], tglang_response)}`
                            if ('inline_message_id' in msg) {
                                bot.editMessageText(
                                    { inlineMsgId: inlineId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            } else {
                                bot.editMessageText(
                                    { chatId: chatId, messageId: messageId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            }

                            let replyMarkup = bot.inlineKeyboard([
                                [
                                    bot.inlineButton('1', { callback: 'F_DPC_1' }),
                                    bot.inlineButton('2', { callback: 'F_DPC_2' }),
                                    bot.inlineButton('3', { callback: 'F_DPC_3' })
                                ], [
                                    bot.inlineButton('4', { callback: 'F_DPC_4' }),
                                    bot.inlineButton('5', { callback: 'F_DPC_5' }),
                                    bot.inlineButton('6', { callback: 'F_DPC_6' })
                                ]
                            ]);

                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Fragen.Displays'), { replyMarkup });
                        }).catch(function (error) {
                            log.error(error)
                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                        })
                    }

                    if (data[1] === 'DPC') //How many Displays does he got (For Space Reasons)
                    {
                        DB.write.Guests.UpdateCollumByID(msg.from.id, "displays_count", data[2]).then(function (response) {
                            let Message = `${msg.message.text}\n\n<b>Antwort:</B> ${data[2]}`
                            if ('inline_message_id' in msg) {
                                bot.editMessageText(
                                    { inlineMsgId: inlineId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            } else {
                                bot.editMessageText(
                                    { chatId: chatId, messageId: messageId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            }

                            let replyMarkup = bot.inlineKeyboard([
                                [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.Ja'), { callback: 'F_LK_true' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.Nein'), { callback: 'F_LK_false' })
                                ]
                            ]);

                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Fragen.LanKabel'), { replyMarkup });
                        }).catch(function (error) {
                            log.error(error)
                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                        })
                    }

                    if (data[1] === 'LK') //Does the guest got a LAN cable that he will bring to the event
                    {
                        DB.write.Guests.UpdateCollumByID(msg.from.id, "network_cable", data[2]).then(function (response) {
                            let Message = `${msg.message.text}\n\n<b>Antwort:</B> ${boolToText(data[2], tglang_response)}`
                            if ('inline_message_id' in msg) {
                                bot.editMessageText(
                                    { inlineMsgId: inlineId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            } else {
                                bot.editMessageText(
                                    { chatId: chatId, messageId: messageId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            }

                            let replyMarkup = bot.inlineKeyboard([
                                [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.Ja'), { callback: 'F_VR_true' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.Nein'), { callback: 'F_VR_false' })
                                ]
                            ]);

                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Fragen.VR'), { replyMarkup });
                        }).catch(function (error) {
                            log.error(error)
                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                        })
                    }

                    if (data[1] === 'VR')  //Does teh guest got a VR-Headset (For Space resons)
                    {
                        DB.write.Guests.UpdateCollumByID(msg.from.id, "vr", data[2]).then(function (response) {
                            let Message = `${msg.message.text}\n\n<b>Antwort:</B> ${boolToText(data[2], tglang_response)}`
                            if ('inline_message_id' in msg) {
                                bot.editMessageText(
                                    { inlineMsgId: inlineId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            } else {
                                bot.editMessageText(
                                    { chatId: chatId, messageId: messageId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            }

                            let replyMarkup = bot.inlineKeyboard([
                                [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.Vollständig'), { callback: 'F_VC_Voll' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.Teil'), { callback: 'F_VC_Teil' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.Nein'), { callback: 'F_VC_Nein' })
                                ], [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Antworten.NichtSagen'), { callback: 'F_VC_Secret' })
                                ]
                            ]);

                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Fragen.Vaccinated'), { replyMarkup });
                        }).catch(function (error) {
                            log.error(error)
                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                        })
                    }

                    if (data[1] === 'VC')  //Is the guest Vaccinated
                    {
                        DB.write.Guests.UpdateCollumByID(msg.from.id, "vaccinated", data[2]).then(function (response) {
                            let Message = `${msg.message.text}\n\n<b>Antwort:</B> ${newi18n.translate(tglang_response, `Vaccinated.${data[2]}`)}`
                            if ('inline_message_id' in msg) {
                                bot.editMessageText(
                                    { inlineMsgId: inlineId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            } else {
                                bot.editMessageText(
                                    { chatId: chatId, messageId: messageId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            }

                            let replyMarkup = bot.inlineKeyboard([
                                [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Arrivale.1_Voll'), { callback: 'F_EA_1' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Arrivale.2_Voll'), { callback: 'F_EA_2' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Arrivale.3_Voll'), { callback: 'F_EA_3' })
                                ], [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Arrivale.4_Voll'), { callback: 'F_EA_4' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Arrivale.5_Voll'), { callback: 'F_EA_5' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Arrivale.6_Voll'), { callback: 'F_EA_6' })
                                ]
                            ]);

                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Fragen.Arrivale'), { replyMarkup });
                        }).catch(function (error) {
                            log.error(error)
                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                        })
                    }

                    if (data[1] === 'EA')  //Planned arrival time
                    {
                        let DateArray = newi18n.translate(tglang_response, `Arrivale.${data[2]}`).split(".");
                        let newDateString = `${DateArray[1]}/${DateArray[0]}/${DateArray[2]}`;
                        let newDate = new Date(newDateString);
                        DB.write.Guests.UpdateCollumByID(msg.from.id, "expected_arrival", newDate).then(function (response) {
                            let Message = `${msg.message.text}\n\n<b>Antwort:</B> ${newi18n.translate(tglang_response, `Arrivale.${data[2]}_Voll`)}`
                            if ('inline_message_id' in msg) {
                                bot.editMessageText(
                                    { inlineMsgId: inlineId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            } else {
                                bot.editMessageText(
                                    { chatId: chatId, messageId: messageId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            }

                            let replyMarkup = bot.inlineKeyboard([
                                [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Depature.1_Voll'), { callback: 'F_ED_1' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Depature.2_Voll'), { callback: 'F_ED_2' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Depature.3_Voll'), { callback: 'F_ED_3' })
                                ], [
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Depature.4_Voll'), { callback: 'F_ED_4' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Depature.5_Voll'), { callback: 'F_ED_5' }),
                                    bot.inlineButton(newi18n.translate(tglang_response, 'Depature.6_Voll'), { callback: 'F_ED_6' })
                                ]
                            ]);

                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Fragen.Depature'), { replyMarkup });
                        }).catch(function (error) {
                            log.error(error)
                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                        })
                    }

                    if (data[1] === 'ED') //Planned departure time
                    {
                        let DateArray = newi18n.translate(tglang_response, `Depature.${data[2]}`).split(".");
                        let newDateString = `${DateArray[1]}/${DateArray[0]}/${DateArray[2]}`;
                        let newDate = new Date(newDateString);
                        DB.write.Guests.UpdateCollumByID(msg.from.id, "expected_departure", newDate).then(function (response) {
                            let Message = `${msg.message.text}\n\n<b>Antwort:</B> ${newi18n.translate(tglang_response, `Depature.${data[2]}_Voll`)}`
                            if ('inline_message_id' in msg) {
                                bot.editMessageText(
                                    { inlineMsgId: inlineId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            } else {
                                bot.editMessageText(
                                    { chatId: chatId, messageId: messageId }, Message,
                                    { parseMode: 'html' }
                                ).catch(error => log.error('Error:', error));
                            }

                            let WebToken = randomstring.generate({
                                length: mainconfig.RegTokenLength, //DO NOT CHANCE!!!
                                charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!'
                            });

                            DB.write.RegToken.NewToken(msg.from.id, msg.from.username, WebToken).then(function (response) {

                                let replyMarkup = bot.inlineKeyboard([
                                    [
                                        bot.inlineButton(newi18n.translate(tglang_response, 'Knöpfe.WebReg'), { url: `${process.env.WebPanelURL}/api/v1/register/load/${WebToken}` })
                                    ]
                                ]);

                                return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Fragen.WebReg'), { replyMarkup });

                            }).catch(function (error) {
                                log.error(error)
                                return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                            })


                        }).catch(function (error) {
                            log.error(error)
                            return bot.sendMessage(msg.message.chat.id, newi18n.translate(tglang_response, 'Error.DBFehler'));
                        })
                    }
                }
            }
        }).catch(function (error) {
            log.error(error)
            if ('inline_message_id' in msg) {
                bot.editMessageText(
                    { inlineMsgId: inlineId }, newi18n.translate(process.env.Fallback_Language || 'en', 'Error.DBFehler'),
                    { parseMode: 'html' }
                ).catch(error => log.error('Error:', error));
            } else {
                bot.editMessageText(
                    { chatId: chatId, messageId: messageId }, newi18n.translate(process.env.Fallback_Language || 'en', 'Error.DBFehler'),
                    { parseMode: 'html' }
                ).catch(error => log.error('Error:', error));
            }
        });
    });
}