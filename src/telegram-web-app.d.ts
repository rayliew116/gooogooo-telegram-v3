interface TelegramWebApp {
    ready: () => void;
    disableVerticalSwipes: () => void;
    // Add other methods and properties you need
}

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}