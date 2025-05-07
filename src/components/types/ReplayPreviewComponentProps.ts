import {Replay} from "../../api/Api.ts";

export interface ReplayPreviewComponentProps {
    data: Replay
}

export interface Player {
    id: number;
    position: number;
    name: string;
    faction: number;
    playerId: number;
    score: number;
}