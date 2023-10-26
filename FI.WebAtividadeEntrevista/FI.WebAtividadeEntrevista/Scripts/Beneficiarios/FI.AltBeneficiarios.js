
$(document).ready(function () {
    if (obj) {
        $('#formCadastroBenef #Nome').val(obj.Nome);
        $('#formCadastroBenef #Id').val(obj.Id);
        $('#formCadastroBenef #cpf').val(obj.CPF);
    }

    $('#formCadastroBenef').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlAlteracao,
            method: "POST",
            data: {
                "Nome": $(this).find("#Nome").val(),
                "Id": $(this).find("#Id").val(),
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
                window.location.href = urlRetorno;
            }
        });
    })
    
})

