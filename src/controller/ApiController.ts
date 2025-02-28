import LOG from "../utils/Logger.ts";

import {Api} from "../api/Api.ts";


class ApiController {
    static async getReplayIds(page: number = 0, size: number = 10): Promise<{
        content: number[];
        totalPages: number
    }> {
        try {
            LOG.debug(`Fetching replay IDs with page=${page}, size=${size}`);

            const response = await new Api().api.getAllReplayIds({page, size});
            LOG.debug("Replay IDs response: ", response);

            const content = (response?.data?.content || []).map((item: any) => Number(item));
            const totalPages = response?.data?.totalPages || 0;

            return {content, totalPages};
        } catch (error) {
            LOG.error("Error fetching replay IDs", error instanceof Object ? error : undefined);
            return {content: [], totalPages: 0};
        }
    }

    /**
     * Function to fetch replay data for a specific ID.
     */
    static async getReplayData(id: number) {
        try {
            LOG.debug(`Fetching replay data for ID: ${id}`);

            const replayData = await new Api().api.getReplayById(id);

            LOG.debug("Replay data response: ", replayData);
            return replayData;
        } catch (error) {
            LOG.error("Error fetching replay data", error instanceof Object ? error : undefined);
            throw error;
        }
    }
}

export default ApiController;