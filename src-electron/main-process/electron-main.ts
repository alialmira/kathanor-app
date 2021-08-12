import { app, BrowserWindow, nativeTheme } from 'electron'
import fs from 'fs'
import path from 'path'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

let mainWindow: BrowserWindow | null

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    frame: false,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: primitiveToBoolean(process.env.QUASAR_NODE_INTEGRATION),
      nodeIntegrationInWorker: primitiveToBoolean(process.env.QUASAR_NODE_INTEGRATION)

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.loadURL(process.env.APP_URL as string)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function primitiveToBoolean (value: string | number | boolean | null | undefined): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || !!+value // here we parse to number first
  }

  return !!value
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})