const appConfig = {
    appName: 'Replay Analyzer',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://faf-replay-api.needix.de/api/v1',
    logLevel: 4, // Options: 1='info', 2='warn', 3='error', 4='debug'
    logToConsole: true,
    apiPaths: {
        replays: '/replays',
        replayIds: '/replays/ids',
    },
};

export default appConfig;