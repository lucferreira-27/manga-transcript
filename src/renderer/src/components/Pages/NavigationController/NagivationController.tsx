import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Page } from '../Pages';
interface NavigationControllerProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    pages: Page[];
}

const NavigationController: React.FC<NavigationControllerProps> = ({currentPage,setCurrentPage,pages}) => {
    const handleNext = () => {
        const nextPageIndex = pages.indexOf(currentPage) + 1;
        if (nextPageIndex < pages.length) {
           return setCurrentPage(pages[nextPageIndex]);
        }
        return setCurrentPage(pages[0]);
    };

    const handlePrevious = () => {
        if (currentPage.number > 0) {
            return setCurrentPage(pages[currentPage.number - 1]);
        }
    };
  return <>
      <ButtonGroup variant="contained" aria-label="navigation buttons">
        <Button onClick={() => handlePrevious()}><NavigateBeforeIcon /></Button>
        <Button onClick={() => handleNext()}><NavigateNextIcon /></Button>
      </ButtonGroup>
  </>;
};

export default NavigationController;

