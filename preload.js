const { contextBridge, ipcRenderer } = require('electron')

function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function excluirAlunos(pID){
    return ipcRenderer.invoke('deletar-alunos',pID);
}

function atualizarAluno(pNome, pMatricula, pID){
    console.log('teste atualizar aluno preload')
    return ipcRenderer.invoke('att-alunos', pNome, pMatricula, pID)
}

function inserirAluno(pNome, pMatricula){
    return ipcRenderer.invoke('insert-alunos', pNome, pMatricula)
}


contextBridge.exposeInMainWorld('senacAPI',

    {
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        atualizarAluno: atualizarAluno,
        inserirAluno: inserirAluno

    }


)
