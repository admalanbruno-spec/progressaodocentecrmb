let dados = [];
let afastamentos = [];

const carreira = [
"A-001","A-002",
"B-001","B-002",
"C-001","C-002","C-003","C-004",
"D-001","D-002","D-003","D-004"
];

function criarDataLocal(dataString){

const partes = dataString.split("-");

return new Date(partes[0], partes[1]-1, partes[2]);

}

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

document.getElementById("btnNovaConsulta").addEventListener("click", novaConsulta);

}

function novaConsulta(){

document.getElementById("resultado").innerHTML="";

document.getElementById("siape").value="";

afastamentos=[];

atualizarLista();

}

function adicionarAfastamento(){

let inicio = new Date(document.getElementById("inicio").value);
let fim = new Date(document.getElementById("fim").value);

if(!inicio || !fim) return;

afastamentos.push({inicio,fim});

atualizarLista();

}

function atualizarLista(){

let lista = document.getElementById("listaAfastamentos");

lista.innerHTML="";

afastamentos.forEach((a,index)=>{

let li=document.createElement("li");

li.innerHTML=

a.inicio.toLocaleDateString()+" até "+a.fim.toLocaleDateString()+
" <button onclick='removerAfastamento("+index+")'>remover</button>";

lista.appendChild(li);

});

document.getElementById("totalAfastamento").innerText=

"Total de dias afastados: "+calcularDiasAfastamento();

}

function removerAfastamento(i){

afastamentos.splice(i,1);

atualizarLista();

}

function calcularDiasAfastamento(){

let total=0;

afastamentos.forEach(a=>{

let dias=(a.fim-a.inicio)/(1000*60*60*24);

total+=dias;

});

return Math.round(total);

}

function consultar(){

let siape=document.getElementById("siape").value.trim();

let servidor=dados.find(d=>d.siape===siape);

if(!servidor){

document.getElementById("resultado").innerHTML="SIAPE não encontrado";

return;

}

let nivelAtual=servidor.nivel;

let indice=carreira.indexOf(nivelAtual);

let ultima=criarDataLocal(servidor.ultima_progressao);

let diasAfastamento=calcularDiasAfastamento();

ultima.setDate(ultima.getDate()+diasAfastamento);

let tabela="<h3>Progressões futuras</h3>";

tabela+="<table border='1' cellpadding='6'>";

tabela+="<tr><th>Nível</th><th>Data prevista</th></tr>";

let data=new Date(ultima);

for(let i=1;i<=5;i++){

let proxNivel=carreira[indice+i];

if(!proxNivel) break;

let meses=24;

if(nivelAtual==="A-001" && i===1){

meses=36;

}

data=new Date(data);

data.setMonth(data.getMonth()+meses);

tabela+="<tr>";

tabela+="<td>"+proxNivel+"</td>";

tabela+="<td>"+data.toLocaleDateString()+"</td>";

tabela+="</tr>";

}

tabela+="</table>";

document.getElementById("resultado").innerHTML=

"<p><b>Nome:</b> "+servidor.nome+"</p>"+
"<p><b>Nível atual:</b> "+servidor.nivel+"</p>"+
"<p><b>Última progressão:</b> "+ultima.toLocaleDateString()+"</p>"+
tabela;

}

document.addEventListener("DOMContentLoaded", iniciar);
