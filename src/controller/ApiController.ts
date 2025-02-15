import appConfig from "../AppConfig.ts";
import LOG from "../utils/Logger.ts";

import testIds from "../assets/testing/replay_ids_test.json";
import testReplay from "../assets/testing/replay_test.json";

class ApiController {

    private static baseUrl = appConfig.apiBaseUrl;
    private static idsPath = appConfig.apiPaths.replayIds;
    private static replayPath = appConfig.apiPaths.replays;


    static async getReplayIdsTest() {
            const data = testIds;
            LOG.debug(JSON.stringify(data));
            return data;
    }

    static async getReplayTest(id:number) {
        LOG.debug("Getting replay with id: " + id);
        const data = testReplay;
        LOG.debug(JSON.stringify(data));
        return data;
    }

    static async getReplayIds(): Promise<number[]> {
        LOG.debug("Fetching replay ids");
        return fetch(this.baseUrl + this.idsPath)
            .then(response => response.json()).then(
            data => {
                LOG.debug(data);
                return data as number[];
            }
        ).catch(error => {
            LOG.error(error)
            return [];
        });
    }

    static async getReplayData(id: number) {
        LOG.debug("Getting replay with id: " + id);
        return fetch(this.baseUrl + this.replayPath + "/" + id)
            .then(response => response.json()).then(
            data => {
                LOG.debug(data);
                return data;
            }
        ).catch(error => LOG.error(error));
    }


}

export default ApiController;