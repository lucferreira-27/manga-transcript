import { Container, Paper, Box, Checkbox, FormControlLabel } from '@mui/material';
import NavigationController from '../NavigationController/NagivationController';
import { Page } from '../Pages';

interface TranscriptAreaProps {
    pages: Page[];
    currentPage: Page | null;
    setCurrentPage: (page: Page | null) => void;
    filterGeminiBlock: boolean; // New prop for checkbox state
    setFilterGeminiBlock: (value: boolean) => void;

}

export const TranscriptArea: React.FC<TranscriptAreaProps> = ({ pages, currentPage, setCurrentPage, filterGeminiBlock, setFilterGeminiBlock }) => {

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Paper sx={{ padding: 2 }}>
                        <FormControlLabel
                            control={<Checkbox checked={filterGeminiBlock} onChange={(e) => setFilterGeminiBlock(e.target.checked)} />}
                            label="Filter Gemini Block"
                        />
                        <NavigationController pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </Paper>
                </Box>
        </Container>
    )
}

