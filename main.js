const { app, BrowserWindow } = require('electron');
const path = require('path');
const { registrarAlunoHandler } = require('./alunoHandler')
const { registrarProfessorHandler } = require('./professorHandler')

//aluno

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('professor.html');
}

app.whenReady().then(function () {

    createMainWindow();
    registrarAlunoHandler();
    registrarProfessorHandler();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

}
);


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

//professor


