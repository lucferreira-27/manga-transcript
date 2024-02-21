import { Grid, Card, CardActionArea, CardMedia, Box, CircularProgress, Typography } from '@mui/material';
import { Page,Volume,PageMark } from '../Pages';
import { useEffect, useState } from 'react';
import { readFileContent,fileExists } from '../../../utils/files';
import { useConfig } from '../../../context/ConfigContext';

interface GalleryViewerProps {
  currentVolume: Volume | null;
  onFinish: (direction: "next" | "previous") => void;
  fromStart: boolean;
  saveMarkedPages: (markedPages: PageMark[],volume_number: number) => void
}

export const GalleryViewer: React.FC<GalleryViewerProps> = ({ currentVolume, onFinish, fromStart,saveMarkedPages }) => {
  const INDEX_STEP = 3;

  const { config, setConfig } = useConfig();
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [showingPages, setShowingPages] = useState<Page[]>([]);
  const [markedPages, setMarkedPages] = useState<PageMark[]>([]);
  const [index, setIndex] = useState<number>(INDEX_STEP);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state
  const [pages,setPages] = useState<Page[]>([])


  const getMarkedPages = async () =>{
    if (!currentVolume) {
      return
    }
    const basepath = config.paths.basePath
    const path = `${basepath}/One Piece v${currentVolume?.volume_number} - Marked.json`
    const exists = await fileExists(path)
    if(!exists){
      return
    }
    const markedPages = await readFileContent(path,true) as PageMark[]
    setMarkedPages(markedPages)
    return markedPages
  }

  useEffect(() => {
    if(isLoading){
      return
    }
    getMarkedPages()
  },[isLoading,currentVolume])

  useEffect(() =>{

    setIndex(INDEX_STEP);
    if (!currentVolume) {
      setIsLoading(true)
      return
    }
    setPages(currentVolume.pages)
    setIsLoading(false)
    saveMarkedPages(markedPages,currentVolume.volume_number)
  },[currentVolume])

  useEffect(() => {
    if (fromStart) {
      setIndex(INDEX_STEP);
      setShowingPages(pages.slice(0, INDEX_STEP));
      return
    }
    setIndex(pages.length - INDEX_STEP);
    setShowingPages(pages.slice(pages.length - INDEX_STEP, pages.length));
  }, [pages]);

  useEffect(() => {
    
    setShowingPages(pages.slice(index - INDEX_STEP, index));
    saveMarkedPages(markedPages,currentVolume?.volume_number || 0)
  }, [index]);

  const handleNext = () => {

    if (index + INDEX_STEP < pages.length) {
      setIndex(index + INDEX_STEP);
      return
    }
    onFinish("next")
    saveMarkedPages(markedPages,currentVolume?.volume_number || 0)
  };
  const handlePrevious = () => {
    if (index - INDEX_STEP > 0) {
      setIndex(index - INDEX_STEP);
      return
    }
    onFinish("previous")
    saveMarkedPages(markedPages,currentVolume?.volume_number || 0)
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

  const toMarkedPage = (page: Page): PageMark =>{
    return {
      type: "red",
      filename: page.filename,
      volume_number: currentVolume?.volume_number || 0
    }
  }

  const handleSelectImage = (page: Page) => {
    setSelectedPage(page);
    if (markedPages.find((p) => p.filename === page.filename)) {
      setMarkedPages(markedPages.filter((p) => p.filename !== page.filename));
    } else {
      setMarkedPages([...markedPages, toMarkedPage(page)]);
    }
  };


  return (
    <Grid container spacing={6}>
      {isLoading ? (
        Array.from(new Array(3)).map((_, index) => ( // Assuming you want 3 placeholder items
          <Grid item xs={4} key={index}>
            <Card
              elevation={1}
              sx={{ position: 'relative', opacity: 0.5 }}
            >
              <Box
                sx={{
                  height: '540px', // Match your CardMedia height
                  width: '336px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
              />
              <Typography variant="h6" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: 1, opacity: 0.5 }}>
                Loading...
              </Typography>
            </Card>
          </Grid>
        ))
      ) : (
        showingPages.map((page, index) => (
          <Grid item xs={4} key={index}>
            <Card
              elevation={selectedPage === page ? 10 : 1}
              onClick={() => handleSelectImage(page)}
              sx={{ position: 'relative' }}
            >
              {markedPages.find((p) => p.filename === page.filename) && (
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
                />
                <Typography variant="h6" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: 1 }}>
                  {page.filename}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

