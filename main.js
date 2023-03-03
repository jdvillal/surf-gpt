const { app, BrowserWindow, BrowserView, ipcMain, ipcRenderer } = require('electron')
const url = require('url')
const path = require('path')

const views = [];

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenu(null)
  win.openDevTools()
  const view = new BrowserView()
  views.push(view);
  view.setBounds({ x: 0, y: 45, width: 885, height: 755 })
  //view.setAutoResize({ width: true, height: true })
  view.webContents.loadURL('https://www.google.com')
  /* view.webContents.addListener('did-finish-load', () => {
    //console.log('did-finish-load')
    console.log('dud finished load',view.webContents.getURL())
    win.webContents.send('url', view.webContents.getURL())
  })
  view.webContents.on('new-window', (event, url) => {
    console.log('new window',url);
  }) */
  view.webContents.on('will-navigate', (event, url) => {
    console.log('will-navigate',url);
    win.webContents.send('url',url);
  })
  win.setBrowserView(view)
  
  win.loadFile('dist/surf-gpt/index.html')
}

app.whenReady().then(() => {
  /* ipcMain.on('urlChange', (event)=>{
    console.log("URL has changed")
    console.log(event)
  }); */
  ipcMain.handle('urlChange', async(event, url) => {
    console.log(url);
    views[0].webContents.loadURL(url)
  })
  
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}, error =>{console.log(error)})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})