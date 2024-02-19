import React, { useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Page } from '../Pages';
interface NavigationControllerProps {
    currentPage: Page | null;
    setCurrentPage: (page: Page | null) => void;
    pages: Page[];
}

const NavigationController: React.FC<NavigationControllerProps> = ({ currentPage, setCurrentPage, pages }) => {
    const handleNext = () => {
        if (!currentPage) return
        const nextPageIndex = pages.indexOf(currentPage) + 1;
        if (nextPageIndex < pages.length) {
            return setCurrentPage(pages[nextPageIndex]);
        }
        return setCurrentPage(pages[0]);
    };

    const handlePrevious = () => {
        if (!currentPage) return

        const nextPageIndex = pages.indexOf(currentPage) - 1;
        if (nextPageIndex > 0) {
            return setCurrentPage(pages[nextPageIndex]);
        }
    };
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowRight':
                    handleNext();
                    break;
                case 'ArrowLeft':
                    handlePrevious();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPage, pages]);
    return <>
        <ButtonGroup variant="contained" aria-label="navigation buttons">
            <Button onClick={() => handlePrevious()}><NavigateBeforeIcon /></Button>
            <Button onClick={() => handleNext()}><NavigateNextIcon /></Button>
        </ButtonGroup>
    </>;
};

export default NavigationController;

