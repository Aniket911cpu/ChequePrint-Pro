const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Auth
  login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
  signup: (userData) => ipcRenderer.invoke('auth:signup', userData),
  // Printing
  printCheque: (payload) => ipcRenderer.invoke('print:cheque', payload),
  printBatch: (payload) => ipcRenderer.invoke('print:batch', payload),
  printTest: () => ipcRenderer.invoke('print:test'),

  // Database
  dbSave: (record) => ipcRenderer.invoke('db:save', record),
  dbQuery: (query) => ipcRenderer.invoke('db:query', query),
  dbExport: (records) => ipcRenderer.invoke('db:export', records),
  getTemplates: () => ipcRenderer.invoke('db:getTemplates'),
  getCalibration: (templateId) => ipcRenderer.invoke('db:getCalibration', templateId),

  // Settings
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSetting: (key, value) => ipcRenderer.invoke('settings:set', key, value),

  // File System & Dialogs
  openFile: (filters) => ipcRenderer.invoke('dialog:openFile', filters),
  readFile: (path) => ipcRenderer.invoke('fs:readFile', path),
  readFileBinary: (path) => ipcRenderer.invoke('fs:readFileBinary', path),

  // Systems
  getSystemStats: () => ipcRenderer.invoke('sys:getStats'),
});
