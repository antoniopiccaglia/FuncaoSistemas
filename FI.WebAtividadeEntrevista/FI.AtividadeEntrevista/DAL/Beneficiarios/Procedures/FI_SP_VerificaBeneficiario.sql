﻿CREATE PROC FI_SP_VerificaBeneficiario
	@CPF VARCHAR(14),
	@IdCliente BIGINT
AS
BEGIN
	
SELECT CPF FROM BENEFICIARIOS WITH(NOLOCK) WHERE CPF=@CPF AND IDCLIENTE=@IdCliente
	
END