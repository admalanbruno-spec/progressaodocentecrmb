let dados = [];
let afastamentos = [];

fetch("dados.csv")
.then(response => response.text())
.then(text => {

    let linhas = text.trim().split("\n");

    let cabecalho = linhas[0].split(",");

    for (let i = 1; i < linhas.length; i++) {

        let valores = linhas[i].split(",");

        let registro = {};

        cabecalho.forEach((campo, index) => {
            registro[campo.trim()] = valores[index].trim();
        });

        dados.push(registro);
    }

});

function consultar(){

    let siapeDigitado = document.getElementById("siape").value.trim();

    let servidor = dados.find(d => d.siape.trim() === siapeDigitado);

    if(!servidor){
        document.getElementById("resultado").innerHTML =
        "SIAPE não encontrado";
        return;
    }

    let ultima = new Date(servidor.ultima_progressao);

    let meses = 24;

    let proxima = new Date(ultima);

    proxima.setMonth(proxima.getMonth() + meses);

    document.getElementById("resultado").innerHTML = `
        <p><b>Nome:</b> ${servidor.nome}</p>
        <p><b>Nível atual:</b> ${servidor.nivel}</p>
        <p><b>Última progressão:</b> ${servidor.ultima_progressao}</p>
        <p><b>Próxima progressão estimada:</b> ${proxima.toLocaleDateString()}</p>
    `;
}

    return total;

}
