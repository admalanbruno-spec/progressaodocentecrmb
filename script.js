let dados = [];
let afastamentos = [];

async function carregarDados(){

    const resposta = await fetch("dados.csv");
    const texto = await resposta.text();

    const linhas = texto.trim().split("\n");

    const cabecalho = linhas[0].split(",");

    for(let i=1;i<linhas.length;i++){

        const valores = linhas[i].split(",");

        let registro = {};

        cabecalho.forEach((campo,index)=>{
            registro[campo.trim()] = valores[index].trim();
        });

        dados.push(registro);

    }

}

async function iniciar(){

    await carregarDados();

    document.getElementById("btnConsultar").addEventListener("click", consultar);

    document.getElementById("btnAddAfastamento").addEventListener("click", adicionarAfastamento);

}

function adicionarAfastamento(){

    let inicio = new Date(document.getElementById("inicio").value);
    let fim = new Date(document.getElementById("fim").value);

    if(!inicio || !fim){
        return;
    }

    afastamentos.push({inicio,fim});

    atualizarLista();

}

function atualizarLista(){

    let lista = document.getElementById("listaAfastamentos");

    lista.innerHTML = "";

    afastamentos.forEach(a=>{

        let li = document.createElement("li");

        li.innerText =
        a.inicio.toLocaleDateString()+" até "+a.fim.toLocaleDateString();

        lista.appendChild(li);

    });

}

function calcularDiasAfastamento(){

    let total = 0;

    afastamentos.forEach(a=>{

        let dias = (a.fim - a.inicio)/(1000*60*60*24);

        total += dias;

    });

    return total;

}

function consultar(){

    let siape = document.getElementById("siape").value.trim();

    let servidor = dados.find(d => d.siape === siape);

    if(!servidor){

        document.getElementById("resultado").innerHTML = "SIAPE não encontrado";

        return;

    }

    let ultima = new Date(servidor.ultima_progressao);

    let diasAfastamento = calcularDiasAfastamento();

    ultima.setDate(ultima.getDate() + diasAfastamento);

    let resultado = `
    <p><b>Nome:</b> ${servidor.nome}</p>
    <p><b>Nível atual:</b> ${servidor.nivel}</p>
    <p><b>Última progressão:</b> ${servidor.ultima_progressao}</p>
    <h3>Próximas progressões</h3>
    <ul>
    `;

    let data = new Date(ultima);

    for(let i=1;i<=5;i++){

        data = new Date(data);

        data.setMonth(data.getMonth()+24);

        resultado += `<li>${i}ª progressão: ${data.toLocaleDateString()}</li>`;

    }

    resultado += "</ul>";

    document.getElementById("resultado").innerHTML = resultado;

}

document.addEventListener("DOMContentLoaded", iniciar);
