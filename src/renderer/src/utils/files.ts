// Handle file system operations using electron api
import { ipcRenderer } from 'electron'
import { Stats } from 'fs';

// Function to read a file's content
export const readFileContent = (filePath: string): Promise<string> => {
  return ipcRenderer.invoke('read-file', filePath);
};

// Function to list directory contents
export const listDirectoryContents = (directoryPath: string): Promise<string[]> => {
  return ipcRenderer.invoke('list-directory', directoryPath);
};

// Function to get file information (e.g., size, creation date)
export const getFileInfo = (filePath: string): Promise<Stats> => {
  return ipcRenderer.invoke('get-file-info', filePath);
};