interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    disableVerticalSwipes: () => void;
    // Add other methods and properties you need
}

interface window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}