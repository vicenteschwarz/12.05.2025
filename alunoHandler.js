const db = require('./BD.js');
const { ipcMain } = require('electron')

async function buscarAlunos() {

    const resultado = await db.query('SELECT * FROM public.alunos order by id')

    return resultado.rows;
}

async function deletarAlunos(event, pId) {
    console.log(event)
    const resultado = await db.query('DELETE FROM public.alunos WHERE id= $1',[pId])
    return resultado.rowCount
}

function registrarAlunoHandler() {
    ipcMain.handle('buscar-alunos', buscarAlunos);
    ipcMain.handle('deletar-alunos', deletarAlunos)
}




module.exports = {
    registrarAlunoHandler

}
