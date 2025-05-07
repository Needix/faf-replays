import {Card} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import GraphOverallComponent from "./graph/GraphOverallComponent.tsx";
import GraphUnitsBuiltComponent from "./graph/GraphUnitsBuiltComponent.tsx";
import GraphUnitsLostComponent from "./graph/GraphUnitsLostComponent.tsx";
import GraphUnitsKilledComponent from "./graph/GraphUnitsKilledComponent.tsx";
import {ReplayPreviewComponentProps} from "./types/ReplayPreviewComponentProps.ts";


const ReplaySummaryGraphs = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const [currentSection, setCurrentSection] = useState(0);
    const cardBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cardBody = cardBodyRef.current;
        if (cardBody) cardBody.addEventListener("scroll", handleScroll);

        return () => {
            if (cardBody) cardBody.removeEventListener("scroll", handleScroll);
        };
    }, [cardBodyRef]);

    const handleScroll = () => {
        const cardBody = cardBodyRef.current;

        if (cardBody) {
            const sectionHeight = cardBody.clientHeight; // Get the visible height of the container
            const scrollTop = cardBody.scrollTop; // Get the scroll position
            const totalSections = cardBody.childElementCount; // Number of sections

            // Ensure we calculate the current section correctly
            const sectionIndex = Math.round(scrollTop / sectionHeight);

            // Prevent index out of bounds (if scrolling ends are imprecise)
            setCurrentSection(Math.min(Math.max(sectionIndex, 0), totalSections - 1));
        }
    };

    if (data.playerScores?.length === 0) {
        return "No scores found";
    }

    return (
        <Card className={"preview-card-graph"}>
            <Card.Body className="scrollable-card-body" ref={cardBodyRef}>
                <div className="scroll-section">
                    <GraphOverallComponent data={data}/>
                </div>


                <div className="scroll-section">
                    <GraphUnitsBuiltComponent data={data}/>
                </div>

                <div className="scroll-section">
                    <GraphUnitsLostComponent data={data}/>
                </div>

                <div className="scroll-section">
                    <GraphUnitsKilledComponent data={data}/>
                </div>
            </Card.Body>

            <div className="indicator-container">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${currentSection === index ? "active" : ""}`}
                    ></div>
                ))}
            </div>
        </Card>
    )
}
export default ReplaySummaryGraphs;