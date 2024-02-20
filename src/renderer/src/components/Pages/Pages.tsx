import React, { useEffect, useState } from 'react';
import ImageRender from './ImageRender/ImageRender';
import { useConfig } from '../../context/ConfigContext';
import { listDirectoryContents,readFileContent } from '../../utils/files';
import { Container } from '@mui/material';
import { TranscriptArea } from './TranscriptArea/TranscriptArea';




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
            texts: [string];
            xyxy: [number];
        }
    ]
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
    const [folder_images, setFolderImages] = useState<string[]>([]);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [filterGeminiBlock, setFilterGeminiBlock] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page | null>();

    const getAllFileAnnoations = async () => {
        const files =  await listDirectoryContents(config.paths.annotationPath);
        const annotations: Annotation[] = [] 
        for (const file of files.slice(0, 1)) {
            const json = await readFileContent(file, true) as Prediction;
            for (const current_json of json.pages) {
                    const annotation = {
                        panels: current_json.panels ,
                        texts: current_json.texts ,
                        gemini: current_json.gemini
                    }
                    annotations.push(annotation)
            }
        }
        setAnnotations(annotations)
    }

    const getAllFileImages = async () => {
        const files = await listDirectoryContents(config.paths.imagePath);
        const images = files.filter((file) => file.endsWith('.jpg') || file.endsWith('.png'));
        console.log(images.length)
        setFolderImages(images);
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

    useEffect(() =>{
        if(pages.length > 0)
            setCurrentPage(pages[0] || null)
    },[pages])
    useEffect(() => {
        if (folder_images.length === 0 || annotations.length === 0) {
            return;
        }
        if (filterGeminiBlock){
            const filterPages = pages.filter(page => page.annotation.gemini && page.annotation.gemini.some(gemini => gemini.gemini_block));
            setPages(filterPages);
            return
        }
        let new_pages: Page[] = [];
        for (const image of folder_images) {
            const index = folder_images.indexOf(image);
            const annotation = annotations[index];
            const page = createPage(image, index, annotation);
            new_pages.push(page);
        }
        setPages(new_pages)

    }, [annotations, filterGeminiBlock]); 


    useEffect(() => {
        setCurrentPage(pages[0] || null)
    }, [pages])

    useEffect(() =>{

        const fetchAll = async () => {
            await getAllFileImages();
            await getAllFileAnnoations();
        }
        fetchAll();
    }, [])



    return (
        <Container sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <ImageRender currentPage={currentPage || null} />
            <TranscriptArea pages={pages} 
            currentPage={currentPage ?? null} 
            setCurrentPage={setCurrentPage} 
            filterGeminiBlock={filterGeminiBlock} 
            setFilterGeminiBlock={setFilterGeminiBlock} />        
        </Container>
    );
};

