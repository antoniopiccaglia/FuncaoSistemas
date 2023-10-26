//const { Modal } = require("bootstrap");
/*
$(document).ready(function () {
    $('#formCadastroBenef').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlInclusao,
            method: "POST",
            data: {
                "Nome": $(this).find("#Nome").val(),
                "IdCliente": $(this).find("#IdCliente").val(),
                "CPF": $(this).find("#cpf").val()
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastroBenef")[0].reset();
                }
        });
    })
})
*/
function Save() {
    if (!$('#formCadastroBenef')[0].checkValidity()) {
        $('#formCadastroBenef')[0].reportValidity();
        return;
    }
    
    indexBeneficiario = document.getElementById('indexBeneficiario').value;
    if (indexBeneficiario=='')
        Add();
    else
        Update(indexBeneficiario);
}

function Add() {

    var table = document.getElementById("gridBeneficiarios");
    var qtd = table.rows.length;
    var contador;

    if (qtd == 0)
        contador = 1;
    else {
        contador=table.rows[qtd-1].id
        contador = contador.replace('tablerow', '');
        contador++;
    }
        
    id = document.getElementById('indexBeneficiario').value;
    cpf = document.getElementById('cpfBeneficiario').value;
    nome = document.getElementById('NomeBeneficiario').value;
    if (!verificaDuplicado(cpf,'') && validaCPF(cpf)) {
        $('<tr id="tablerow' + contador + '"><td style="visibility:hidden">' +
            0 +
            '</td >' +
            '<td>' +
            cpf +
            '</td>' +
            '<td>' +
            nome +
            '</td>' +
            '<td>' +
            '<button onclick="Edit(' + contador + ')" class="btn btn-primary btn-sm">Alterar</button>' +
            '</td>' +
            '<td>' +
            '<button onclick="Remove(' + contador + ')" class="btn btn-primary btn-sm">Excluir</button>' +
            '</td>' +
            '</tr>').appendTo('#gridBeneficiarios');

        document.getElementById('indexBeneficiario').value = '';
        document.getElementById('cpfBeneficiario').value = '';
        document.getElementById('NomeBeneficiario').value = '';
        SalvaBeneficiarios();
    }
}

function Remove(index) {
    $('#tablerow' + index).remove();
    SalvaBeneficiarios();
}

function Edit(index) {
    var table = document.getElementById("gridBeneficiarios");
    hidId = document.getElementById('indexBeneficiario');
    txtcpf = document.getElementById('cpfBeneficiario');
    txtnome = document.getElementById('NomeBeneficiario');

    var tr = $('#tablerow' + index);

    txtcpf.value = tr.find("td:eq(1)").text().trim();
    txtnome.value = tr.find("td:eq(2)").text().trim();
    hidId.value = index;
}

function Update(index) {
    var table = document.getElementById("gridBeneficiarios");
    var tr = $('#tablerow' + index);

    txtcpf = document.getElementById('cpfBeneficiario');
    txtnome = document.getElementById('NomeBeneficiario');

    if (!verificaDuplicado(txtcpf.value,index) && validaCPF(txtcpf.value)) {
        tr.find("td:eq(1)").text(txtcpf.value);
        tr.find("td:eq(2)").text(txtnome.value);

        document.getElementById('indexBeneficiario').value = '';
        document.getElementById('cpfBeneficiario').value = '';
        document.getElementById('NomeBeneficiario').value = '';
        SalvaBeneficiarios();
    }
}

function verificaDuplicado(cpf,index) {
    var estaDuplicado=false;
    var trid = '';
    cpf = cpf.replace('-', '');
    cpf = cpf.replace('.', '');
    cpf = cpf.replace('.', '');

    var cpfcadastro = '';
    $("#gridBeneficiarios tbody tr").each(function () {
        var benef = {}, i = 0;
        trid = $(this).attr('id').replace('tablerow', '');
        $(this).children("td").each(function () {
            if (i == 1) {
                cpfcadastro = $(this).html().trim();
                cpfcadastro = cpfcadastro.replace('-', '');
                cpfcadastro = cpfcadastro.replace('.', '');
                cpfcadastro = cpfcadastro.replace('.', '');

                if (cpf == cpfcadastro && index != trid) {
                    ModalDialog("Atenção", "Esse cpf já está cadastrado");
                    estaDuplicado= true;
                }
            }
            i++;
        })
    });
    return estaDuplicado;
}

function validaCPF(cpf) {
    var cpfvalido = true;
        if (cpf) {
            cpf = cpf.replace(".", "");
            cpf = cpf.replace(".", "");
            cpf = cpf.replace("_", "");
            cpf = cpf.replace("-", "");
            if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
                cpfvalido = false;
            }
            else {
                let numbers, digits, sum, i, result, equalDigits;
                equalDigits = 1;
                if (cpf.length < 11) {
                    cpfvalido = false;
                }

                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                        equalDigits = 0;
                        break;
                    }
                }

                if (!equalDigits) {
                    numbers = cpf.substring(0, 9);
                    digits = cpf.substring(9);
                    sum = 0;
                    for (i = 10; i > 1; i--) {
                        sum += numbers.charAt(10 - i) * i;
                    }

                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(0))) {
                        cpfvalido = false;
                    }
                    numbers = cpf.substring(0, 10);
                    sum = 0;

                    for (i = 11; i > 1; i--) {
                        sum += numbers.charAt(11 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(1))) {
                        cpfvalido = false;
                    }
                } 
            }
    }

    if (!cpfvalido) {
        ModalDialog("Atenção", "CPF inválido");
    }
    return cpfvalido;
}

function SalvaBeneficiarios() {
    var keys = [], beneficiarios = [];
    //$("#gridBeneficiarios thead tr th").each(function () {
    //    keys.push($(this).html());
    //});

    keys.push("Id");
    keys.push("CPF");
    keys.push("Nome");
    keys.push("IdCliente");

    $("#gridBeneficiarios tbody tr").each(function () {
        var benef = {}, i = 0;
        $(this).children("td").each(function () {
            if (i <= 2)
                benef[keys[i]] = $(this).html().trim();
            else
                if (i == 3)
                    if (typeof obj === 'undefined')
                        benef[keys[i]] = 0;
                    else
                        benef[keys[i]] = obj.Id;
            i++;
        })
        beneficiarios.push(benef);
    });
    //jQuery.ajaxSettings.traditional = true;
    var dados = JSON.stringify({ beneficiarios: beneficiarios });

    $.ajax({
        url: urlBeneficiarioList,
        method: "POST",
        dataType: "json",
        contentType:"application/json",
        data: dados,
        traditional: true,
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                //ModalDialog("Sucesso!", r)
                //$("#formCadastro")[0].reset();
                //window.location.href = urlRetorno;
            }
    });

    //return JSON.stringify(beneficiarios);
    //return beneficiarios;

}

function ModalBeneficiario(titulo, texto) {
    var random = 'divmodal';
    div = document.getElementById(random);
    if (div == null) {

        var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
            '        <div class="modal-dialog">                                                                                 ' +
            '            <div class="modal-content">                                                                            ' +
            '                <div class="modal-header">                                                                         ' +
            '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
            '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
            '                </div>                                                                                             ' +
            '                <div class="modal-body">                                                                           ' +
            '                    <p>' + texto + '</p>                                                                           ' +
            '                </div>                                                                                             ' +
            '                <div class="modal-footer">                                                                         ' +
            '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
            '                                                                                                                   ' +
            '                </div>                                                                                             ' +
            '            </div><!-- /.modal-content -->                                                                         ' +
            '  </div><!-- /.modal-dialog -->                                                                                    ' +
            '</div> <!-- /.modal -->                                                                                        ';

        $('body').append(texto);
    }
    $('#' + random).modal('show');
}