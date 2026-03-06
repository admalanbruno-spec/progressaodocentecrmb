async function consultar(){

let siape = document.getElementById("siape").value;

let docentes = await fetch("dados_docentes.json").then(r=>r.json());

let servidor = docentes.find(d => d.siape === siape);

if(!servidor){

document.getElementById("resultado").innerHTML =
"<p>SIAPE não encontrado.</p>";

return;

}

const carreira = [
"A1",
"B1",
"B2",
"B3",
"B4",
"C1",
"C2",
"C3",
"C4",
"Titular"
];

let nivelAtual = servidor.nivel;

let indexNivel = carreira.indexOf(nivelAtual);

let inicio = new Date(servidor.data_inicio_nivel);

let meses = mesesIntersticio(nivelAtual);

let proxima = new Date(inicio);

proxima.setMonth(proxima.getMonth()+meses);

let hoje = new Date();

let diasRestantes = Math.ceil((proxima-hoje)/(1000*60*60*24));

let proximas = gerarProximas(proxima,indexNivel,carreira);

document.getElementById("resultado").innerHTML = `

<h2>${servidor.nome}</h2>

<p><strong>Nível atual:</strong> ${nivelAtual}</p>

<p><strong>Próxima progressão:</strong> ${formatar(proxima)} — ${carreira[indexNivel+1] ?? "Topo da carreira"}</p>

<p><strong>Dias restantes:</strong> ${diasRestantes}</p>

<h3>Próximas progressões</h3>

${proximas}

`;

}

function mesesIntersticio(nivel){

if(nivel === "A1"){
return 36;
}

return 24;

}

function gerarProximas(data,indexNivel,carreira){

let lista="<ul>";

let d=new Date(data);

let nivel=indexNivel;

for(let i=0;i<6;i++){

nivel++;

if(nivel>=carreira.length) break;

let meses = mesesIntersticio(carreira[nivel-1]);

d.setMonth(d.getMonth()+meses);

lista+=`<li>${formatar(d)} — ${carreira[nivel]}</li>`;

}

lista+="</ul>";

return lista;

}

function formatar(data){

return data.toLocaleDateString('pt-BR');

}
document.getElementById("afastFim").value="";
document.getElementById("resultado").innerHTML="";

}
