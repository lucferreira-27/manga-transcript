import React, { useEffect, useState } from 'react';
import ImageRender from './ImageRender/ImageRender';
import { useConfig } from '../../context/ConfigContext';
import { listDirectoryContents, readFileContent,writeToFile,fileExists } from '../../utils/files';
import { Container,  Box,CircularProgress } from '@mui/material';
import { TranscriptArea } from './TranscriptArea/TranscriptArea';
import { GalleryViewer } from './GalleryViewer/GalleryViewer';
import VolumeSelector from './VolumeSelector/VolumeSelector';


export type PageMark = {
    type: string;
    filename: string;
    volume_number: number;
}

export type Prediction = {
    volume_number: number;
    pages: Annotation[]
}

export type Annotation = {
    panels: [
        {
            bbox: []
        },
    ],
    texts: [
        {
            id: number;
            bbox: number[];
        }
    ],
    gemini: [
        {
            gemini_block: boolean;
            text: [string];
            xyxy: [number];
        }
    ]
}

export type Volume = {
    volume_number: number;
    path: string;
    pages: Page[];
}

export type Page = {
    filename: string,
    number: number;
    path: string;
    url: string;
    annotation: Annotation
};

export const Pages: React.FC = () => {
    const { config, setConfig } = useConfig();
    const [pages, setPages] = useState<Page[]>([]);
    const [volumes, setVolumes] = useState<Volume[]>([]);
    const [currentVolume, setCurrentVolume] = useState<Volume | null>(null);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [filterGeminiBlock, setFilterGeminiBlock] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page | null>();
    const [isFromStart, setIsFromStart] = useState<boolean>(true);
    const getAllFileAnnoations = async () => {
        const files = await listDirectoryContents(config.paths.annotationsPath);
        const regex = /v(\d{3})/;

        for (const file of files) {
            const annotations: Annotation[] = []
            const filename = file.toLowerCase().replace(/\\/g, '/').split('/').pop() || '';
            const volume_number = parseInt(filename.match(regex)?.[1] || '0');
            const json = await readFileContent(file, true) as Prediction;
            for (const current_json of json.pages) {
                const annotation = {
                    panels: current_json.panels,
                    texts: current_json.texts,
                    gemini: current_json.gemini
                }
                annotations.push(annotation)
            }
            const volume = volumes.find(volume => volume.volume_number === volume_number)
            if (volume) {
                const images = await listDirectoryContents(volume.path);
                const pages = annotations.map((annotation, index) => {
                    return createPage(images[index], index, annotation)
                })
                volume.pages = pages;
                //setPages(pages)
            }
        }
        setAnnotations(annotations)
    }


    const getAllVolumes = async () => {
        console.log("volumes")
        const volumes_folders = await listDirectoryContents(config.paths.volumesPath);
        const volumes: Volume[] = [];
        for (const i in volumes_folders) {
            const regex = /One Piece v(\d{3})/;
            const folder = volumes_folders[i];
            const volume = {
                volume_number: parseInt(folder.match(regex)?.[1] || '0'),
                path: folder,
                pages: []
            }
            volumes.push(volume)
        }
        setVolumes(volumes)
    }
    const createPage = (file: string, index: number, annotation: Annotation) => {

        return {
            url: `file://${file}`,
            filename: file.replace(/\\/g, '/').split('/').pop() || '',
            number: index,
            path: file,
            annotation: annotation
        }
    }

    const saveMarkedPages = async (markedPages: PageMark[],volume_number: number) => {
        if(volume_number <= 0) return; // Exit if volume number is not valid

        const basePath = config.paths.basePath;
        const filePath = `${basePath}/One Piece v${volume_number} - Marked.json`;

        // Check if the file exists before proceeding
        if(!(await fileExists(filePath))) {
            await writeToFile(filePath, JSON.stringify(markedPages));
            return;
        }

        const existingMarkedPages = await readFileContent(filePath, true) as PageMark[];
        const existingFilenames = new Set(existingMarkedPages.map(page => page.filename));

        const pagesToMark = markedPages.filter(page => !existingFilenames.has(page.filename));
        console.log(pagesToMark); // Log new pages to be marked

        await writeToFile(filePath, JSON.stringify([...existingMarkedPages, ...pagesToMark]));
    }

    const onFinish = (direction: "next" | "previous") => {
        console.log(direction)
        if (direction === "next" && currentVolume) {
            const index = volumes.findIndex(volume => volume.volume_number === currentVolume.volume_number)
            if (index + 1 < volumes.length) {
                //setIsFromStart(true)
                setCurrentVolume(volumes[index + 1])
            }
        }
        if (direction === "previous" && currentVolume) {
            const index = volumes.findIndex(volume => volume.volume_number === currentVolume.volume_number)
            if (index - 1 >= 0) {
               // setIsFromStart(false)
                setCurrentVolume(volumes[index - 1])
            }
        }
    }

    useEffect(() => {
        if (pages.length === 0 || annotations.length === 0) {
            return;
        }
        if (filterGeminiBlock) {
            const filterPages = pages.filter(page => page.annotation.gemini && page.annotation.gemini.some(gemini => gemini.gemini_block));
            setPages(filterPages);
            return
        }
    }, [annotations, filterGeminiBlock]);


    useEffect(() => {
        setCurrentPage(pages[0] || null)
    }, [pages])

    useEffect(() => {

        const fetchAll = async () => {
            await getAllVolumes();

        }
        fetchAll();
    }, [])


    useEffect(() => {
        const fetchAll = async () => {
            await getAllFileAnnoations();
            setCurrentVolume(volumes[0])
        }
        if (volumes.length > 0) {
            fetchAll();
        }
    }, [volumes])

    useEffect(() => {
        if (currentVolume) {
            setPages(currentVolume.pages)
        }
    }, [currentVolume])



    return (
        <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <Box sx={{ flexDirection: 'column' }}>
                <GalleryViewer 
                    currentVolume={currentVolume} 
                    onFinish={onFinish} 
                    saveMarkedPages={saveMarkedPages}
                    fromStart={true} />
                <VolumeSelector volumes={volumes} setCurrentVolume={setCurrentVolume} currentVolume={currentVolume} />
            </Box>
            {1 > 2 &&
                <>
                    <ImageRender currentPage={currentPage || null} />
                    <TranscriptArea pages={pages}
                        currentPage={currentPage ?? null}
                        setCurrentPage={setCurrentPage}
                        filterGeminiBlock={filterGeminiBlock}
                        setFilterGeminiBlock={setFilterGeminiBlock} />
                </>
            }

        </Container>
    );
};

