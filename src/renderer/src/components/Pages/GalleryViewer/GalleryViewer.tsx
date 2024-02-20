import { Grid, Card, CardActionArea, CardMedia,Box,CircularProgress,Typography } from '@mui/material';
import { Page } from '../Pages';
import { useEffect, useState } from 'react';

interface GalleryViewerProps {
    pages: Page[];

}

export const GalleryViewer: React.FC<GalleryViewerProps> = ({pages }) => {
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [showingPages, setShowingPages] = useState<Page[]>(pages);
    const [markedPages, setMarkedPages] = useState<Page[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state
    const INDEX_STEP = 3;
    useEffect(() => {
        setIndex(0);
        setShowingPages(pages.slice(0, INDEX_STEP));
    }, [pages]);

    useEffect(() => {
        setShowingPages(pages.slice(index - INDEX_STEP, index));
    }, [index]);

    const handleNext = () => {
        if (index + INDEX_STEP < pages.length) {
            console.log(index)
            setIndex(index + INDEX_STEP);
        }
    };
    const handlePrevious = () => {
        if (index - INDEX_STEP >= 0) {
            console.log(index)
            setIndex(index - INDEX_STEP);
            //setIsLoading(true); // Set loading to true when changing pages

        setTimeout(() => setIsLoading(false), 500)
    }
    }

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
    });

    const handleSelectImage = (page: Page) => {
        setSelectedPage(page);
        if (markedPages.includes(page)) {
          setMarkedPages(markedPages.filter((p) => p !== page));
        } else {
          setMarkedPages([...markedPages, page]);
        }
    };

    // New function to handle image load
    const handleImageLoad = () => {
        setIsLoading(false); // Set loading to false when an image is loaded
    };

    return (
        <Grid container spacing={6}>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', margin: 20 }}>
                <CircularProgress />
            </Box>
          )}
          {!isLoading && showingPages.map((page, index) => (
            <Grid item xs={4} key={index}>
              <Card 
                elevation={selectedPage === page ? 10 : 1} 
                onClick={() => handleSelectImage(page)}
                sx={{ position: 'relative' }}
              >
                {markedPages.includes(page) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(255, 0, 0, 0.5)',
                      zIndex: 2,
                    }}
                  />
                )}
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="540"
                    image={page.url}
                    alt={page.filename}
                    onLoad={handleImageLoad} // Add onLoad event
                  />
                  <Typography variant="h6" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: 1 }}>
                    {page.filename}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
}

