document.addEventListener("DOMContentLoaded", function(){

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

let siape = document.getElementById("siape").value.trim();

if(!siape){

alert("Digite sua matrícula SIAPE.");

return;

}

let resposta = await fetch("dados_docentes.json");
let docentes = await resposta.json();

let servidor = docentes.find(d => d.siape === siape);

if(!servidor){

document.getElementById("resultado").innerHTML =
"<p>SIAPE não encontrado.</p>";

return;

}

const carreira = [
"A1","B1","B2","B3","B4",
"C1","C2","C3","C4","Titular"
];

let nivelAtual = servidor.nivel;

let indiceNivel = carreira.indexOf(nivelAtual);

let inicio = new Date(servidor.data_inicio_nivel);

let meses = mesesIntersticio(nivelAtual);

let proxima = new Date(inicio);

proxima.setMonth(proxima.getMonth() + meses);

let diasAfastamento = calcularAfastamento();

proxima.setDate(proxima.getDate() + diasAfastamento);

let hoje = new Date();

let diasRestantes = Math.ceil(
(proxima - hoje) / (1000 * 60 * 60 * 24)
);

let proximas = gerarProximas(proxima, indiceNivel, carreira);

document.getElementById("resultado").innerHTML = `

<h2>${servidor.nome}</h2>

<p><strong>Nível atual:</strong> ${nivelAtual}</p>

<p><strong>Próxima progressão:</strong>
${formatar(proxima)} — ${carreira[indiceNivel+1] ?? "Topo da carreira"}
</p>

<p><strong>Dias restantes:</strong> ${diasRestantes}</p>

<h3>Próximas progressões</h3>

${proximas}

`;

}

function calcularAfastamento(){

let check = document.getElementById("temAfastamento").checked;

if(!check) return 0;

let inicio = document.getElementById("dataInicioAfastamento").value;
let fim = document.getElementById("dataFimAfastamento").value;

if(!inicio || !fim) return 0;

let d1 = new Date(inicio);
let d2 = new Date(fim);

let dias = Math.ceil(
(d2 - d1) / (1000 * 60 * 60 * 24)
);

return dias;

}

function mesesIntersticio(nivel){

if(nivel === "A1"){
return 36;
}

return 24;

}

function gerarProximas(data, indiceNivel, carreira){

let lista = "<ul>";

let d = new Date(data);

let nivel = indiceNivel;

for(let i=0;i<6;i++){

nivel++;

if(nivel >= carreira.length) break;

let meses = mesesIntersticio(carreira[nivel-1]);

d.setMonth(d.getMonth() + meses);

lista += `<li>${formatar(d)} — ${carreira[nivel]}</li>`;

}

lista += "</ul>";

return lista;

}

function formatar(data){

return data.toLocaleDateString("pt-BR");

}
