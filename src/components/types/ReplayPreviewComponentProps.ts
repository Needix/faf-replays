import {ReplayData} from "../../types/Common.ts";

export interface ReplayPreviewComponentProps {
    data: ReplayData
}

export interface Player {
    id: number;
    position: number;
    name: string;
    faction: number;
    playerId: number;
    score: number;
}