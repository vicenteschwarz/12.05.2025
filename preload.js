const { contextBridge, ipcRenderer } = require('electron')
//alunos
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

//profes

function buscarProfessores(){
    return ipcRenderer.invoke('buscar-professores')
}

function deletarProfessor( pID){
    return ipcRenderer.invoke('deletar-professor', pID);
}

function attProfessor( pNome, pCpf, pID){
    return ipcRenderer.invoke('att-professor', pNome, pCpf, pID)
}

function inserirProfessor(pNome, pCpf) {
    return ipcRenderer.invoke('inserir-professor', pNome, pCpf)
}
contextBridge.exposeInMainWorld('senacAPI',

    {
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        atualizarAluno: atualizarAluno,
        inserirAluno: inserirAluno,

        buscarProfessores:buscarProfessores,
        deletarProfessor:deletarProfessor,
        attProfessor:attProfessor,
        inserirProfessor:inserirProfessor
    }
)
