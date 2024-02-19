// Handle file system operations using electron api
import { Stats } from 'fs';
import { Prediction } from '@renderer/components/Pages/Pages';

const ipcRenderer = window.electron.ipcRenderer
// Function to read a file's content
export const readFileContent = (filePath: string, json: boolean): Promise<string | Prediction> => {
  return ipcRenderer.invoke('read-file', filePath, json);
};

// Function to list directory contents
export const listDirectoryContents = (directoryPath: string): Promise<string[]> => {
  return ipcRenderer.invoke('list-directory', directoryPath);
};

// Function to get file information (e.g., size, creation date)
export const getFileInfo = (filePath: string): Promise<Stats> => {
  return ipcRenderer.invoke('get-file-info', filePath);
};