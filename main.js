const { app, BrowserWindow } = require('electron');
const path = require('path'); // This line imports the path module
if(require('electron-squirrel-startup')) app.quit();
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "logo.ico"),
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    // Load the remote URL instead of a local file
    win.loadURL('http://203.112.209.98:3001/');
   // Load the index.html from the dist directory
  /* win.loadFile(path.join(__dirname, 'dist', 'index.html')).catch(err => {
    console.error('Failed to load index.html:', err);
});*/
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});