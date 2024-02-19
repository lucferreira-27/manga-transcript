import { Container, Paper, Box } from '@mui/material';
import NavigationController from '../NavigationController/NagivationController';
import { Page } from '../Pages';

interface TranscriptAreaProps {
    pages: Page[];
    currentPage: Page | null;
    setCurrentPage: (page: Page | null) => void;
}

export const TranscriptArea: React.FC<TranscriptAreaProps> = ({ pages, currentPage, setCurrentPage }) => {

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Paper sx={{ padding: 2 }}>
                        <NavigationController pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </Paper>
                </Box>

        </Container>


    )
}

