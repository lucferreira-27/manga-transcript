import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Volume } from '../Pages';

interface VolumeSelectorProps {
    volumes: Volume[];
    setCurrentVolume: React.Dispatch<React.SetStateAction<Volume | null>>;
    currentVolume: Volume | null;
     // Adjust the type based on your actual Page type
}   



const VolumeSelector: React.FC<VolumeSelectorProps> = ({ volumes, setCurrentVolume,currentVolume }) => {

    return (
        <FormControl fullWidth sx={{ mt: 2}}>
            <InputLabel id="volume-select-label">Volume</InputLabel>
            <Select
                labelId="volume-select-label"
                id="volume-select"
                value={currentVolume?.volume_number || 1}
                label="Volume"
                onChange={(event) => {
                    const volumeNumber = event.target.value as number;
                    const selectedVolume = volumes.find(volume => volume.volume_number === volumeNumber);
                    if (selectedVolume) {
                        setCurrentVolume(selectedVolume)
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: '150px', // Control the max height of the selection area
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