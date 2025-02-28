import appConfig from "../AppConfig.ts";

class LOG {
    private static logLevel: number = appConfig.logLevel;

    static error(message: string, obj?: object) {
        if (!appConfig.logToConsole || this.logLevel < 3) {
            return;
        }
        if (obj) {
            console.error(`${message}:`, obj);
        } else {
            console.error(message);
        }
    }

    static warn(message: string, obj?: object) {
        if (!appConfig.logToConsole || this.logLevel < 2) {
            return;
        }
        if (obj) {
            console.warn(`${message}:`, obj);
        } else {
            console.warn(message);
        }
    }

    static debug(message: string, obj?: object) {
        if (!appConfig.logToConsole || this.logLevel < 4) {
            return;
        }
        if (obj) {
            console.log(`${message}:`, obj);
        } else {
            console.log(message);
        }
    }

    static info(message: string, obj?: object) {
        if (!appConfig.logToConsole || this.logLevel < 1) {
            return;
        }

        if (obj) {
            console.log(`${message}:`, obj);
        } else {
            console.log(message);
        }
    }
}

export default LOG;