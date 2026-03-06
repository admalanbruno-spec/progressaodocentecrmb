let dados = [];

fetch("dados.csv")
.then(res => res.text())
.then(texto => {

let linhas = texto.split("\n");

for(let i=1;i<linhas.length;i++){

let colunas = linhas[i].split(",");

dados.push({

siape:colunas[0],
nivel:colunas[1],
data:colunas[2]

});

}

});

function consultar(){

let siape = document.getElementById("siape").value;

let afastInicio = document.getElementById("afastInicio").value;
let afastFim = document.getElementById("afastFim").value;

let servidor = dados.find(d => d.siape === siape);

if(!servidor){

alert("SIAPE não encontrado");

return;

}

let data = new Date(servidor.data+"T00:00:00");

let intervalo = 24;

if(servidor.nivel === "A-001"){

intervalo = 36;

}

let diasAfastamento = 0;

if(afastInicio && afastFim){

let inicio = new Date(afastInicio);
let fim = new Date(afastFim);

diasAfastamento = Math.floor((fim - inicio)/(1000*60*60*24));

}

let resultado = "<b>Nível atual:</b> "+servidor.nivel+"<br>";
resultado += "<b>Última progressão:</b> "+servidor.data+"<br><br>";

for(let i=1;i<=5;i++){

let novaData = new Date(data);

novaData.setMonth(novaData.getMonth() + intervalo*i);

novaData.setDate(novaData.getDate() + diasAfastamento);

let dia = novaData.getDate().toString().padStart(2,'0');
let mes = (novaData.getMonth()+1).toString().padStart(2,'0');
let ano = novaData.getFullYear();

let classe = "progressao";

if(i==1){

classe = "progressao proxima";

}

resultado += "<div class='"+classe+"'>"+i+"ª Progressão: "+dia+"/"+mes+"/"+ano+"</div>";

}

document.getElementById("resultado").innerHTML = resultado;

}

function novaConsulta(){

document.getElementById("siape").value="";
document.getElementById("afastInicio").value="";
document.getElementById("afastFim").value="";
document.getElementById("resultado").innerHTML="";

}
