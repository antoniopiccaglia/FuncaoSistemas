﻿ALTER PROC FI_SP_ConsBeneficiario
	@ID BIGINT,
	@IDCLIENTE BIGINT
AS
BEGIN
	IF(ISNULL(@ID,0) = 0)
		SELECT NOME, ID, CPF, IDCLIENTE FROM BENEFICIARIOS WITH(NOLOCK) WHERE IDCLIENTE=@IDCLIENTE
	ELSE
		SELECT NOME, ID, CPF, IDCLIENTE FROM BENEFICIARIOS WITH(NOLOCK) WHERE ID = @ID
END