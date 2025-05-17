const paragrafo = document.getElementById('teste');
const tabelaAluno = document.getElementById('alunosTableDados');
const modalNomeAluno = document.getElementById('aluno-nome')
const modalMatriculaAluno = document.getElementById('aluno-matricula')
const modalIdAluno = document.getElementById('aluno-id')


async function carregarAlunos() {

    const listaAlunos = await window.senacAPI.buscarAlunos();


    listaAlunos.forEach(criarLinhaAluno)

    lucide.createIcons(); // renderiza os ícones do Lucide
}




function criarLinhaAluno(aluno) {
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    const linha = document.createElement('tr');

    const celulanome = document.createElement('td');
    celulanome.textContent = aluno.nome

    const celunaMatricula = document.createElement('td')
    celunaMatricula.textContent = aluno.matricula


    linha.appendChild(celulanome);
    linha.appendChild(celunaMatricula)

    //botao de modificar

    const celulaBotao = document.createElement('td');
    const botao = document.createElement('button');
    botao.addEventListener('click', function () { mostrarDetalhes(aluno.id, aluno.nome, aluno.matricula) })
    botao.style.backgroundColor = 'pink'
    botao.style.borderRadius = '15px'

    celulaBotao.appendChild(botao)
    const icone = document.createElement('i')
    icone.setAttribute('data-lucide', 'edit')
    botao.appendChild(icone)
    linha.appendChild(celulaBotao)


    //---
    tabelaAluno.appendChild(linha)



}
//botao de exluir
const botaoExluir = document.getElementById('btn-excluir')
botaoExluir.addEventListener('click', deletarAluno)

async function deletarAluno() {
    console.log('teste')
    const pID = modalIdAluno.value
    console.log('deletando o id', pID)
    //return
    const retorno = await window.senacAPI.deletarAlunos(pID)
    return retorno
}

function mostrarDetalhes(id, nome, matricula) {
    modalIdAluno.value = id
    modalNomeAluno.value = nome
    modalMatriculaAluno.value = matricula
}

carregarAlunos()    