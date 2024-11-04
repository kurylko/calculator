import React, {useEffect, useState} from "react";
import {Box, Container, CssBaseline} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SegmentedProgressBar} from "../components/SegmentedProgressBar";

export default  function MyPlatePage() {
    const [progress, setProgress] = useState<number>(10);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setProgress(prev => (prev < 100 ? prev + 1 : 0));
    //     }, 100); // Increase progress by 1% every 0.1 seconds
    //
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <Box
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                alignItems: 'center',
                paddingTop: '50px',
            }}
        >
            <Box sx={{ width: '85%', maxWidth: 700 }}>
                <Typography variant="h3">LET'S COUNT A DISH</Typography>
            </Box>
            <Container>
                <SegmentedProgressBar progress={progress} />
            </Container>
        </Box>
    )
}
