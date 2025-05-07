import LOG from "../../../utils/Logger.ts";
import {ReplayPlayerSummary} from "../../../api/Api.ts";

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

    static getScoreOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting score option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.general?.score ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalMassOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total mass option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.resources?.massin?.total ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEnergyOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total energy option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.resources?.energyin?.total ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalUnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total units option", playerScoreData);
        const playerScores = playerScoreData.map(player => (player.units?.air?.built ?? 0) + (player.units?.land?.built ?? 0) + (player.units?.naval?.built ?? 0));
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalStructuresBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total structures built option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.structures?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalAirUnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total air units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.air?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalLandUnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total land units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.land?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalNavalUnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total naval units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.naval?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech1UnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech1 units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech1?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech2UnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech2 units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech2?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech3UnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech3 units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech3?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech4UnitsBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech4 units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.experimental?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTransportationBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total transportation units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.transportation?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalSacuBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total sacu units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.sacu?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEngineerBuiltOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total engineer units option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.engineer?.built ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalStructuresLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total structures lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.structures?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalAirUnitsLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total air units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.air?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalLandUnitsLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total land units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.land?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalNavalUnitsLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total naval units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.naval?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech1UnitsLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech1 units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech1?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech2UnitsLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech2 units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech2?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech3UnitsLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech3 units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech3?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech4UnitsLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech4 units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.experimental?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTransportationLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total transportation units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.transportation?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalSacuLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total sacu units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.sacu?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEngineerLostOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total engineer units lost option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.engineer?.lost ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalStructuresKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total structures killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.structures?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalAirUnitsKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total air units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.air?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalLandUnitsKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total land units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.land?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalNavalUnitsKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total naval units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.naval?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech1UnitsKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech1 units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech1?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech2UnitsKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech2 units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech2?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech3UnitsKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech3 units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.tech3?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTech4UnitsKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total tech4 units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.experimental?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalTransportationKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total transportation units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.transportation?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalSacuKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total s-acu units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.sacu?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }

    static getTotalEngineerKilledOption(playerScoreData: ReplayPlayerSummary[]) {
        LOG.debug("Getting total engineer units killed option", playerScoreData);
        const playerScores = playerScoreData.map(player => player.units?.engineer?.kills ?? 0);
        const playerNames = playerScoreData.map(player => player.name ?? "Unknown");

        return this.getBarGraph(playerScores, playerNames);
    }
}

export default GraphUtils;