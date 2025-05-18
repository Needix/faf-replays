export interface Filters {
    searchTerm: string,
    completeStatus: string;
    mods: string[];
    gameTypes: string[];
    numberOfPlayers: { min: number | null; max: number | null };
    timeFrame: { start: Date | null; end: Date | null };
    rankedOnly: boolean;
}