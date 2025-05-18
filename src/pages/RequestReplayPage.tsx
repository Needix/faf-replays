import React, {useState} from "react";
import NavbarComponent from "../components/NavbarComponent";
import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import ReplayPreviewComponent from "../components/replay/ReplayPreviewComponent";
import {Api, Replay} from "../api/Api";

import "./css/RequestReplayPage.css";

const RequestReplayPage = () => {
    const [replayId, setReplayId] = useState<string>(""); // Holds user-inputted Replay ID
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Holds uploaded file
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error message if any
    const [analysisResult, setAnalysisResult] = useState<Replay | null>(null); // Result after analysis

    // Handle user input for replay ID
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplayId(e.target.value);
    };

    // Handle file uploads
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Submit replay for analysis
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate input
        if (!replayId && !selectedFile) {
            setError("Please provide a Replay ID or upload a file.");
            return;
        }
        setError(null); // Clear previous errors
        setIsLoading(true); // Show loading indicator

        try {
            const apiController = new Api().api; // Initialize API Controller
            let result: Replay | null = null;

            // Submit the replay ID or File
            if (replayId) {
                const response = await apiController.getReplayById(Number(replayId)); // Call backend endpoint for replay ID
                result = response.data as Replay;
            } else if (selectedFile) {
                const response = await apiController.uploadReplay({file: selectedFile}); // Call backend endpoint for file upload
                result = response.data as Replay;
            }

            setAnalysisResult(result); // Store analysis results
        } catch (err) {
            console.error(err);
            setError("An error occurred while analyzing the replay. Please try again later.");
        } finally {
            setIsLoading(false); // Stop loading indicator
        }
    };

    return (
        <div className="body requestReplay">
            <NavbarComponent/>
            <Container className="mt-4">
                <h1>Analyze a Replay</h1>
                <p>Enter a Replay ID or upload a replay file to analyze its details.</p>

                {/* Error Message */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Form to submit Replay */}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3" style={{paddingBottom: "1rem"}}>
                        <Col md={6}>
                            <Form.Group controlId="replayIdInput">
                                <Form.Label>Replay ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Replay ID"
                                    value={replayId}
                                    onChange={handleInputChange}
                                    disabled={isLoading} // Disable input while loading
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="fileUpload" className="file-upload-group">
                                <Form.Label>Replay File</Form.Label>
                                <div className="custom-file-upload-wrapper">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="custom-file-input"
                                        onChange={handleFileChange}
                                        accept=".fafreplay"
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="file-upload" className="custom-file-label">
                                        {selectedFile ? selectedFile.name : "Choose File"}
                                    </label>
                                </div>
                            </Form.Group>

                        </Col>
                    </Row>

                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner animation="border" size="sm"
                                         className={"spinner-border spinner-color"}/> Analyzing...
                            </>
                        ) : (
                            "Analyze Replay"
                        )}
                    </Button>
                </Form>

                {/* Show results once available */}
                {analysisResult && (
                    <div className="mt-4">
                        <h2>Analysis Results</h2>
                        <ReplayPreviewComponent data={analysisResult}/> {/* Re-use existing component */}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default RequestReplayPage;