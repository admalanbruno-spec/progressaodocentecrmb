let dados = [];

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

}

function consultar(){

    let siape = document.getElementById("siape").value.trim();

    let servidor = dados.find(d => d.siape === siape);

    if(!servidor){

        document.getElementById("resultado").innerHTML = "SIAPE não encontrado";

        return;

    }

    let ultima = new Date(servidor.ultima_progressao);

    let proxima = new Date(ultima);

    proxima.setMonth(proxima.getMonth()+24);

    document.getElementById("resultado").innerHTML = `
    <p><b>Nome:</b> ${servidor.nome}</p>
    <p><b>Nível:</b> ${servidor.nivel}</p>
    <p><b>Última progressão:</b> ${servidor.ultima_progressao}</p>
    <p><b>Próxima progressão:</b> ${proxima.toLocaleDateString()}</p>
    `;
}

document.addEventListener("DOMContentLoaded", iniciar);
