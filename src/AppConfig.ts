const appConfig = {
    appName: 'Replay Analyzer',
    version: '1.0.0',
    environment: 'development',
    apiBaseUrl: 'https://faf-replay-api.needix.de/api/v1',
    logLevel: 4, // Options: 1='info', 2='warn', 3='error', 4='debug'
    logToConsole: true,
    apiPaths: {
        replays: '/replays',
        replayIds: '/replays/ids',
    },
};

export default appConfig;