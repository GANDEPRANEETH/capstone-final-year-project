
export function register() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(() => {
            console.log('Service worker registered');
        }).catch(err => console.log('SW register failed', err));
    }
}
