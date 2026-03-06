let dados = [];
let afastamentos = [];

fetch("dados.csv")
.then(response => response.text())
.then(text => {
    let linhas = text.split("\n");
    let cabecalho = linhas[0].split(",");

    for(let i=1;i<linhas.length;i++){
        let valores = linhas[i].split(",");

        let registro = {};

        cabecalho.forEach((campo,index)=>{
            registro[campo] = valores[index];
        });

        dados.push(registro);
    }
});

function consultar(){

    let siape = document.getElementById("siape").value;

    let servidor = dados.find(d => d.siape === siape);

    if(!servidor){
        document.getElementById("resultado").innerHTML = "SIAPE não encontrado";
        return;
    }

    let ultima = new Date(servidor.ultima_progressao);

    let meses = 24;

    let totalAfastado = calcularAfastamentos();

    ultima.setDate(ultima.getDate()+totalAfastado);

    let proxima = new Date(ultima);

    proxima.setMonth(proxima.getMonth()+meses);

    document.getElementById("resultado").innerHTML = `
        <p><b>Nome:</b> ${servidor.nome}</p>
        <p><b>Nível atual:</b> ${servidor.nivel}</p>
        <p><b>Última progressão:</b> ${servidor.ultima_progressao}</p>
        <p><b>Próxima progressão estimada:</b> ${proxima.toLocaleDateString()}</p>
    `;
}

function adicionarAfastamento(){

    let inicio = new Date(document.getElementById("inicio").value);
    let fim = new Date(document.getElementById("fim").value);

    afastamentos.push({inicio,fim});

    atualizarLista();
}

function atualizarLista(){

    let lista = document.getElementById("listaAfastamentos");

    lista.innerHTML = "";

    afastamentos.forEach(a => {

        let li = document.createElement("li");

        li.innerText = a.inicio.toLocaleDateString()+" até "+a.fim.toLocaleDateString();

        lista.appendChild(li);

    });
}

function calcularAfastamentos(){

    let total = 0;

    afastamentos.forEach(a=>{

        let dias = (a.fim - a.inicio)/(1000*60*60*24);

        total += dias;

    });

    return total;

}
