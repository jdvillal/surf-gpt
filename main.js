const path = require('path')
// In the main process.
const { app, BrowserView, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })
    win.loadFile('index.html')
    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 50, width: 300, height: 300 })
    view.webContents.loadURL('https://electronjs.org')
  //setTimeout(() => view.webContents.loadURL('https://electronjs.org'), 0);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})