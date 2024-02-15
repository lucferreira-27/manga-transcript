import React, { useEffect, useState } from 'react';
import ImageRender  from '../ImageRender/ImageRender';
import { useConfig } from '../../context/ConfigContext';
import { listDirectoryContents } from '../../utils/files';

export const Pages: React.FC = () => {
    const { config, setConfig } = useConfig();
    const [currentFileImage, setCurrentFileImage] = useState<string | null>(null);

    const getAllFileImages = () =>{
        listDirectoryContents(config.paths.imagePath).then((files) => {
            setCurrentFileImage(files[0]);
        })
    }
    useEffect(() => {
        getAllFileImages();
    }, []);



    return (
        <>
        <ImageRender src="https://example.com/image.png" alt="Example Image" />
        </>
    );
  };

