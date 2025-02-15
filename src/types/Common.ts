export interface ReplayData {
    id: number;
    replayTitle: string;
    replayVersion: number;
    replayCompression: string;
    complete: boolean;
    featuredMod: string;
    gameType: string;
    gameStart: number;
    gameEnd: number;
    numberOfPlayers: number;
    recorder: string;
    supComVersion: string;
    mapName: string;
    cheatsEnabled: boolean;
    randomSeed: number;

    players: {
        [playerId: string]: {
            id: number;
            name: string;
            playerId: number;
            massShared: number;
            energyShared: number;
            massReceived: number;
            energyReceived: number;
        };
    };

    chatMessages: Array<{
        id: number;
        tick: number;
        sender: string;
        receiver: string;
        message: string;
        marker: boolean;
    }>;

    playerScores: Array<{
        id: number;
        type: string;
        name: string;
        faction: number;
        general: {
            score: number;
            lost: {
                mass: number;
                count: number;
                energy: number;
            };
            kills: {
                mass: number;
                count: number;
                energy: number;
            };
            built: {
                mass: number;
                count: number;
                energy: number;
            };
            lastupdatetick: number;
            currentcap: number;
            currentunits: number;
        };
        blueprints: {
            [blueprintName
            :
            string
                ]:
                {
                    kills: number;
                    built: number;
                    lost: number;
                    lowest_health: number;
                };
        };
        resources: {
            storage: {
                maxMass: number;
                storedMass: number;
                maxEnergy: number;
                storedEnergy: number;
            };
            massin: {
                total: number;
                reclaimed: number;
                reclaimRate: number;
                rate: number;
            };
            massout: {
                total: number;
                rate: number;
                excess: number;
            };
            energyin: {
                total: number;
                reclaimed: number;
                reclaimRate: number;
                rate: number;
            };
            energyout: {
                total: number;
                rate: number;
                excess: number;
            };
        };
        units: {
            air: {
                lost: number;
                kills: number;
                built: number;
            };
            tech3: {
                lost: number;
                kills: number;
                built: number;
            };
            experimental: {
                lost: number;
                kills: number;
                built: number;
            };
            tech2: {
                lost: number;
                kills: number;
                built: number;
            };
            tech1: {
                lost: number;
                kills: number;
                built: number;
            };
            land: {
                lost: number;
                kills: number;
                built: number;
            };
            naval: {
                lost: number;
                kills: number;
                built: number;
            };
            transportation: {
                lost: number;
                kills: number;
                built: number;
            };
            structures: {
                lost: number;
                kills: number;
                built: number;
            };
            sacu: {
                lost: number;
                kills: number;
                built: number;
            };
            engineer: {
                lost: number;
                kills: number;
                built: number;
            };
            cdr: {
                lost: number;
                kills: number;
                built: number;
            };
        };
        Defeated: number;
    }>;
}