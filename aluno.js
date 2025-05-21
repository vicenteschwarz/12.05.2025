

const paragrafo = document.getElementById('teste');
const tabelaAluno = document.getElementById('alunosTableDados');
const modalNomeAluno = document.getElementById('aluno-nome');
const modalMatriculaAluno = document.getElementById('aluno-matricula');
const modalIDAluno = document.getElementById('aluno-id');
const botaoExcluir = document.getElementById('btn-excluir');
botaoExcluir.addEventListener('click',excluirAluno)

const botaoAtt = document.getElementById('btn-salvar')
botaoAtt.addEventListener('click', atualizaOuInserirAluno)

const botaoIncluir = document.getElementById('btn-incluir')
botaoIncluir.addEventListener('click',incluir)

function incluir(){
    mostrarDetalhes('','','')
}

function mostrarDetalhes(nome,matricula,id){
    modalIDAluno.value = id;
    modalMatriculaAluno.value = matricula;
    modalNomeAluno.value = nome ;
}

async function atualizaOuInserirAluno(){
    const pID = modalIDAluno.value;
    const pNome = modalNomeAluno.value;
    const pMatricula = modalMatriculaAluno.value;

    if (pID === "") {
        console.log("vou inserir o aluno ", pNome);
        await insereAluno();
        return
    } else {
        console.log("vou atualizar o id ", pID);
        await atualizaAluno();
    }
    carregarAlunos();
    mostrarDetalhes("", "", "");
}

async function insereAluno() {
    const pNome = modalNomeAluno.value;
    const pMatricula = modalMatriculaAluno.value;

    console.log("vou inserir o aluno ", pNome);

    const retorno = await window.senacAPI.inserirAlunos(pNome, pMatricula);

    carregarAlunos();
    mostrarDetalhes("", "", "");
}

async function atualizaAluno() {
    const pID = modalIDAluno.value;
    const pNome = modalNomeAluno.value;
    const pMatricula = modalMatriculaAluno.value;

    console.log("vou atualizar o id ", pID);

    const retorno = await window.senacAPI.atualizarAlunos(pNome, pMatricula, pID);

    carregarAlunos();
    mostrarDetalhes("", "", "");
}

async function excluirAluno(){
    const pID = modalIDAluno.value;
    console.log("vou deletar o id ", pID);

    const retorno = await window.senacAPI.excluirAlunos(pID);

    //após deleção atualiza a lista de alunos
    mostrarDetalhes("","","");
    carregarAlunos();
}


async function carregarAlunos(){

    
    const listaAlunos = await window.senacAPI.buscarAlunos();
    tabelaAluno.innerHTML = "";

     console.log(listaAlunos)
    listaAlunos.forEach(criarLinhaAluno)

    if (! listaAlunos.length > 0 ){

        tabelaAluno.textContent ="sem dados"
    }
    
    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaAluno(aluno){
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = aluno.nome;
    linha.appendChild(celulanome);

    //matricula
    const celulaMatricula = document.createElement("td");
    celulaMatricula.textContent = aluno.matricula;   
    linha.appendChild(celulaMatricula);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click", 
                                    function () { mostrarDetalhes(aluno.nome,aluno.matricula,aluno.id)}
                                );
    botao.textContent = 'teste';    
    
    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");
    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);


    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaAluno.appendChild(linha);

}




carregarAlunos()