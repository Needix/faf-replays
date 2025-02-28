import {ReplayData} from "../../../types/Common.ts";
import LOG from "../../../utils/Logger.ts";

class GraphUtils {

    static getBarGraph (playerScores: number[], playerNames: string[]){
        const option = {
            backgroundColor: '#242424', // Dark background color
            xAxis: {
                type: 'category',
                data: playerNames,
                axisLine: { lineStyle: { color: '#cccccc' } }, // X-axis line color
                axisLabel: {
                    color: '#ffffff', // X-axis labels color
                    interval: 0, // Ensure all labels are shown
                    rotate: 35, // Rotate labels for better visibility (optional)
                },
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#cccccc' } }, // Y-axis line color
                axisLabel: { color: '#ffffff' }, // Y-axis labels color
                splitLine: { lineStyle: { color: '#444444' } }, // Grid lines color
            },
            series: [
                {
                    data: playerScores,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(255, 255, 255, 0.1)', // Light background for the bars
                    },
                    itemStyle: {
                        color: '#40a9ff', // Bar color
                    },
                },
            ],
            tooltip: {
                trigger: 'item', // Trigger tooltips on item hover
                formatter: (params: { name: string, value: string }) => {
                    // Customize the tooltip content
                    return `${params.name}: ${params.value}`;
                },
                backgroundColor: '#333333', // Tooltip background color
                borderColor: '#777777', // Tooltip border
                textStyle: {
                    color: '#ffffff', // Tooltip text color
                },
            },
            textStyle: {
                color: '#ffffff', // Text color for tooltips, legends, etc.
            },
        };

        LOG.debug("Returning option", option);
        return option;
    }

    static getScoreOption(data: ReplayData) {
        LOG.debug("Getting score option", data);
        const playerScores = data.playerScores.map(player => player.general.score);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }



    static getTotalMassOption(data: ReplayData) {
        LOG.debug("Getting total mass option", data);
        const playerScores = data.playerScores.map(player => player.resources.massin.total);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEnergyOption(data: ReplayData) {
        LOG.debug("Getting total energy option", data);
        const playerScores = data.playerScores.map(player => player.resources.energyin.total);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalUnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total units option", data);
        const playerScores = data.playerScores.map(player => player.units.air.built + player.units.land.built + player.units.naval.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalStructuresBuiltOption(data: ReplayData) {
        LOG.debug("Getting total structures built option", data);
        const playerScores = data.playerScores.map(player => player.units.structures.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalAirUnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total air units option", data);
        const playerScores = data.playerScores.map(player => player.units.air.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalLandUnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total land units option", data);
        const playerScores = data.playerScores.map(player => player.units.land.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalNavalUnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total naval units option", data);
        const playerScores = data.playerScores.map(player => player.units.naval.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech1UnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total tech1 units option", data);
        const playerScores = data.playerScores.map(player => player.units.tech1.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech2UnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total tech2 units option", data);
        const playerScores = data.playerScores.map(player => player.units.tech2.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech3UnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total tech3 units option", data);
        const playerScores = data.playerScores.map(player => player.units.tech3.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech4UnitsBuiltOption(data: ReplayData) {
        LOG.debug("Getting total tech4 units option", data);
        const playerScores = data.playerScores.map(player => player.units.experimental.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTransportationBuiltOption(data: ReplayData) {
        LOG.debug("Getting total transportation units option", data);
        const playerScores = data.playerScores.map(player => player.units.transportation.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalSacuBuiltOption(data: ReplayData) {
        LOG.debug("Getting total sacu units option", data);
        const playerScores = data.playerScores.map(player => player.units.sacu.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEngineerBuiltOption(data: ReplayData) {
        LOG.debug("Getting total engineer units option", data);
        const playerScores = data.playerScores.map(player => player.units.engineer.built);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalStructuresLostOption(data: ReplayData) {
        LOG.debug("Getting total structures lost option", data);
        const playerScores = data.playerScores.map(player => player.units.structures.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalAirUnitsLostOption(data: ReplayData) {
        LOG.debug("Getting total air units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.air.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalLandUnitsLostOption(data: ReplayData) {
        LOG.debug("Getting total land units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.land.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalNavalUnitsLostOption(data: ReplayData) {
        LOG.debug("Getting total naval units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.naval.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech1UnitsLostOption(data: ReplayData) {
        LOG.debug("Getting total tech1 units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.tech1.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech2UnitsLostOption(data: ReplayData) {
        LOG.debug("Getting total tech2 units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.tech2.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech3UnitsLostOption(data: ReplayData) {
        LOG.debug("Getting total tech3 units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.tech3.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech4UnitsLostOption(data: ReplayData) {
        LOG.debug("Getting total tech4 units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.experimental.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTransportationLostOption(data: ReplayData) {
        LOG.debug("Getting total transportation units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.transportation.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalSacuLostOption(data: ReplayData) {
        LOG.debug("Getting total sacu units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.sacu.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEngineerLostOption(data: ReplayData) {
        LOG.debug("Getting total engineer units lost option", data);
        const playerScores = data.playerScores.map(player => player.units.engineer.lost);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalStructuresKilledOption(data: ReplayData) {
        LOG.debug("Getting total structures killed option", data);
        const playerScores = data.playerScores.map(player => player.units.structures.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalAirUnitsKilledOption(data: ReplayData) {
        LOG.debug("Getting total air units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.air.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalLandUnitsKilledOption(data: ReplayData) {
        LOG.debug("Getting total land units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.land.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalNavalUnitsKilledOption(data: ReplayData) {
        LOG.debug("Getting total naval units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.naval.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech1UnitsKilledOption(data: ReplayData) {
        LOG.debug("Getting total tech1 units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.tech1.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech2UnitsKilledOption(data: ReplayData) {
        LOG.debug("Getting total tech2 units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.tech2.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech3UnitsKilledOption(data: ReplayData) {
        LOG.debug("Getting total tech3 units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.tech3.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech4UnitsKilledOption(data: ReplayData) {
        LOG.debug("Getting total tech4 units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.experimental.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTransportationKilledOption(data: ReplayData) {
        LOG.debug("Getting total transportation units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.transportation.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalSacuKilledOption(data: ReplayData) {
        LOG.debug("Getting total s-acu units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.sacu.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEngineerKilledOption(data: ReplayData) {
        LOG.debug("Getting total engineer units killed option", data);
        const playerScores = data.playerScores.map(player => player.units.engineer.kills);
        const playerNames = data.playerScores.map(player => player.name);

        return this.getBarGraph(playerScores, playerNames);
    }
}

export default GraphUtils;