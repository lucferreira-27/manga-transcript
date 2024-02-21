import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Volume } from '../Pages';

interface VolumeSelectorProps {
    volumes: Volume[];
    setPages: React.Dispatch<React.SetStateAction<any[]>>; // Adjust the type based on your actual Page type
}



const VolumeSelector: React.FC<VolumeSelectorProps> = ({ volumes, setPages }) => {
    const [selectedVolumeNumber, setSelectedVolumeNumber] = useState<number>(1);

    return (
        <FormControl fullWidth sx={{ m: 1, backgroundColor: 'white',}}>
            <InputLabel id="volume-select-label">Volume</InputLabel>
            <Select
                labelId="volume-select-label"
                id="volume-select"
                value={selectedVolumeNumber}
                label="Volume"
                onChange={(event) => {
                    const volumeNumber = event.target.value as number;
                    setSelectedVolumeNumber(volumeNumber);
                    const selectedVolume = volumes.find(volume => volume.volume_number === volumeNumber);
                    if (selectedVolume) {
                        setPages(selectedVolume.pages);
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: '200px', // Control the max height of the selection area
                        },
                    },
                }}
            >
                {volumes.map((volume) => (
                    <MenuItem key={volume.volume_number} value={volume.volume_number}>
                        Volume {volume.volume_number}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default VolumeSelector;