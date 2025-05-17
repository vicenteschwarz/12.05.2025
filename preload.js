const { contextBridge, ipcRenderer } = require('electron');

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function deletarAlunos(pId){
    return ipcRenderer.invoke('deletar-alunos',pId)
}



contextBridge.exposeInMainWorld('senacAPI', {
    buscarAlunos: buscarAlunos,
    deletarAlunos: deletarAlunos
});
