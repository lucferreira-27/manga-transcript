import React, { useEffect, useState } from 'react';
import ImageRender from './ImageRender/ImageRender';
import { useConfig } from '../../context/ConfigContext';
import { listDirectoryContents } from '../../utils/files';
import { Container } from '@mui/material';
import { TranscriptArea } from './TranscriptArea/TranscriptArea';



export type Annotation = {

}

export type Page = {
    filename: string,
    number: number;
    path: string;
    url: string;
    annotations: {
        [key: string]: string;

    };
};

export const Pages: React.FC = () => {
    const { config, setConfig } = useConfig();
    const [pages, setPages] = useState<Page[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<Page | null>();
    const getAllFileImages = () => {

        if (!config.paths.imagePath || !config.paths.imagePath.length) {
            return
        }
        listDirectoryContents(config.paths.imagePath).then((files) => {
            const pages = files
                .filter((file) => file.endsWith('.jpg') || file.endsWith('.png'))
                .map(createPage);
            console.log(pages)
            setPages(pages);
            setImages(files);
        })
    }
    const createPage = (file: string, index: number) =>
    ({
        url: `file://${file}`,
        filename: file.split('/').pop() || '',
        number: index,
        path: file,
        annotations: {

        }
    })
    useEffect(() => {
        if (images.length == 0) {
            getAllFileImages();
        }
    });

    useEffect(() => {
        setCurrentPage(pages[0] || null)
    }, [pages])



    return (
        <Container sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <ImageRender currentPage={currentPage || null} alt="Example Image" />
            <TranscriptArea pages={pages} currentPage={currentPage || null} setCurrentPage={setCurrentPage || null} />
        </Container>
    );
};

