import TelegramBot from 'node-telegram-bot-api';

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you got from BotFather
const bot = new TelegramBot('7334292510:AAH9imHLlmj94tGJGarcTmf3YZUFEZeLtGE', { polling: true });

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'there';

  // Send a welcome message
  bot.sendMessage(chatId, `Welcome, ${userName}! This is your bot. How can I assist you today?`);
});