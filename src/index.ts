import { telegramBotKey, telegramChatId } from './config.js';
import { divide_countries, risk_attack } from './risk.js';
import { TelegramClient } from './telegram.js';

const telegram = new TelegramClient(telegramChatId, telegramBotKey);

async function onMessage(text: string): Promise<void> {

  if (['31', '32', '21', '22', '11', '12'].includes(text)) {
    telegram.sendText(risk_attack(text))
  }

  if (/^countries [2-5]$/.test(text)) {
    const nPlayers = parseInt(text.split(" ")[1]);
    telegram.sendText(divide_countries(nPlayers))
  }



  if (/^\/howto$/.test(text)) {
    telegram.sendText(`if (['31', '32', '21', '22', '11', '12'].includes(text))\nif (/^countries [2-5]$/.test(text))\nif (/^\/howto$/.test(text))`)
  }
  
}

telegram.runPolling(onMessage);
