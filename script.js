document.addEventListener("DOMContentLoaded", function(){

console.log("Script carregado");

document.getElementById("btnConsultar")
.addEventListener("click", consultar);

document.getElementById("temAfastamento")
.addEventListener("change", toggleAfastamento);

});

function toggleAfastamento(){

let check = document.getElementById("temAfastamento").checked;

document.getElementById("areaAfastamento").style.display =
check ? "block" : "none";

}

async function consultar(){

console.log("Botão clicado");

let siape = document.getElementById("siape").value.trim();

if(!siape){

alert("Digite sua matrícula SIAPE");

return;

}

try{

let resposta = await fetch("dados_docentes.json");

let docentes = await resposta.json();

let servidor = docentes.find(d => d.siape === siape);

if(!servidor){

document.getElementById("resultado").innerHTML =
"SIAPE não encontrado";

return;

}

const carreira = [
"A1","B1","B2","B3","B4",
"C1","C2","C3","C4","Titular"
];

let indiceNivel = carreira.indexOf(servidor.nivel);

let inicio = new Date(servidor.data_inicio_nivel);

let meses = servidor.nivel === "A1" ? 36 : 24;

let proxima = new Date(inicio);

proxima.setMonth(proxima.getMonth() + meses);

let hoje = new Date();

let diasRestantes = Math.ceil(
(proxima - hoje) / (1000*60*60*24)
);

document.getElementById("resultado").innerHTML = `

<h2>${servidor.nome}</h2>

<p>Nível atual: ${servidor.nivel}</p>

<p>Próxima progressão: ${proxima.toLocaleDateString("pt-BR")}</p>

<p>Dias restantes: ${diasRestantes}</p>

`;

}catch(erro){

console.error(erro);

document.getElementById("resultado").innerHTML =
"Erro ao calcular progressão";

}

}
