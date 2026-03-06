async function consultar(){

let siape = document.getElementById("siape").value.trim();

let resposta = await fetch("dados_docentes.json");

let docentes = await resposta.json();

let servidor = docentes.find(d => d.siape === siape);

if(!servidor){

document.getElementById("resultado").innerHTML="SIAPE não encontrado";

return;

}

document.getElementById("resultado").innerHTML=

"Servidor encontrado: " + servidor.nome;

}
