const { ipcMain, BrowserWindow } = require('electron')
const path = require('path')

function createWindow(arqHtml) {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,
    });

    janela.loadFile(arqHtml);
}

function windowAlunos(){
    createWindow('aluno.html')
}

function windowProfessores(){
    createWindow('professor.html')
}

function abrirMenu(){
    createWindow('index.html')
}

function registrarJanelas(){
    ipcMain.on('window-alunos',windowAlunos)
    ipcMain.on('window-professores', windowProfessores,)
    ipcMain.on('abrir-menu', abrirMenu)
}

module.exports = {
    registrarJanelas
}