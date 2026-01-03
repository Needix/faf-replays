import {Replay} from "../../api/Api.ts";

export interface ReplayPreviewComponentProps {
    data: Replay,
    selectedOption?: string | null,
    setSelectedOption?: (value: (((prevState: string) => string) | string)) => void | null
}