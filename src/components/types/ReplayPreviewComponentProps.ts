import {Replay} from "../../api/Api.ts";

export interface ReplayPreviewComponentProps {
    data: Replay,
    selectedOption: string,
    setSelectedOption: (value: (((prevState: string) => string) | string)) => void
}