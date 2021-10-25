const {app, BrowserWindow, Menu} = require('electron')
const {openAria2, closeAria2} = require('./utils/cmd')
const {join} = require('path')

function createWindow() {
    openAria2()
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, 'renderer.js')
        },
        icon: join(__dirname, './icons/icon.ico')
    })

    mainWindow.loadFile('view/index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('ready', function () {
    Menu.setApplicationMenu(null)
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        closeAria2()
        app.quit()
    }
})

