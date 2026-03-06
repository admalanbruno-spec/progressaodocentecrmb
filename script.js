function consultar(){

let dataUltima = document.getElementById("ultima").value;
let afastInicio = document.getElementById("afastInicio").value;
let afastFim = document.getElementById("afastFim").value;
let nivel = document.getElementById("nivel").value;

if(!dataUltima){

alert("Informe a data da última progressão");

return;

}

let data = new Date(dataUltima+"T00:00:00");

let intervalo = 24;

if(nivel === "A-001"){

intervalo = 36;

}

let diasAfastamento = 0;

if(afastInicio && afastFim){

let inicio = new Date(afastInicio+"T00:00:00");

let fim = new Date(afastFim+"T00:00:00");

let diff = fim - inicio;

diasAfastamento = Math.floor(diff/(1000*60*60*24));

}

let resultado = "<div><b>Nível atual:</b> "+nivel+"</div><br>";

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

document.getElementById("ultima").value="";
document.getElementById("afastInicio").value="";
document.getElementById("afastFim").value="";
document.getElementById("nivel").value="A-001";

document.getElementById("resultado").innerHTML="";

}
