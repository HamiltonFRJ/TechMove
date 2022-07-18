$(function() {

    var operacao = "A"; //"A"=Adição; "E"=Edição

    var indice_selecionado = -1;

    var tbClientes = localStorage.getItem("tbClientes"); // Recupera os dados armazenados

    tbClientes = JSON.parse(tbClientes); // Converte string para objeto

    if (tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];

    function Adicionar() {
        var cli = GetCliente("Codigo", $("#codigo").val());

        if (cli != null) {
            alert("Código já cadastrado.");
            return;
        }

        var cliente = JSON.stringify({
            NumeroV: $("#numerovAva").val(),
            Data: $("#dataAva").val(),
            Descricao: $("#descAva").val()
        });

        tbClientes.push(cliente);

        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

        alert("Registro adicionado.");
        return true;
    }

    function Editar() {
        tbClientes[indice_selecionado] = JSON.stringify({
            NumeroV: $("#numerovAva").val(),
            Data: $("#dataAva").val(),
            Descricao: $("#descAva").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Informações editadas.")
        operacao = "A";
        return true;
    }

    function Listar() {
        $("#tela").html("");
        $("#tela").html(

        );

        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);
            $("#tela").append("<div>" +
                "	<img src='/Img/editar_4.png' alt='" + i + "' class='btnEditar'/><img src='/Img/delete.png' alt='" + i + "' class='btnExcluir'/>" +
                "<h1>Número do Veículo</h1> <p> " + cli.NumeroV + "</p>" +
                "<h1>Data</h1> <p> " + cli.Data + "</p>" +
                "<h1>Avaliação</h1> <p> " + cli.Descricao + "</p>" +
                "</div>");
        }
    }

    function Excluir() {
        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro excluído.");
    }

    function GetCliente(propriedade, valor) {
        var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
    }

    Listar();

    $("#form-avaliacao").on("submit", function() {
        if (operacao == "A")
            return Adicionar();
        else
            return Editar();
    });

    $("#tela").on("click", ".btnEditar", function() {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#numerovAva").val(cli.NumeroV);
        $("#dataAva").val(cli.Data);
        $("#descAva").val(cli.Descricao);
        $("#nome").focus();
    });

    $("#tela").on("click", ".btnExcluir", function() {
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();
    });
});


