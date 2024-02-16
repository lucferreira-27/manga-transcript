import React, { useEffect, useState } from 'react';
import ImageRender from './ImageRender/ImageRender';
import { useConfig } from '../../context/ConfigContext';
import { listDirectoryContents } from '../../utils/files';
import NavigationController from './NavigationController/NagivationController';

export type Page = {
    filename: string,
    number: number;
    path: string;
    url: string;
};

export const Pages: React.FC = () => {
    const { config, setConfig } = useConfig();
    const [pages, setPages] = useState<Page[]>([]);
    const [images,setImages]= useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<Page>({
        filename: '',
        number: 0,
        path: '',
        url: '',
    });
    const getAllFileImages = () => {
        
        if (!config.paths.imagePath || !config.paths.imagePath.length){
            return
        }
        listDirectoryContents(config.paths.imagePath).then((files) => {
            const pages = files.map(createPage);
            setPages(pages);
            setImages(files);
        })
    }
    const createPage = (file: string, index: number) =>
    ({
        url: `file://${file}`,
        filename: file.split('/').pop() || '',
        number: index,
        path: file
    })
    useEffect(() => {
        getAllFileImages();
    }, []);

    useEffect(() => {
        setCurrentPage(pages[0] || null)
    }, [pages])



    return (
        <>
            <ImageRender currentPage={currentPage} alt="Example Image" />
            <NavigationController pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    );
};

