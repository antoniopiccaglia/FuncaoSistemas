﻿CREATE PROC FI_SP_AltBeneficiario
    @NOME          VARCHAR (50) ,
	@Id           BIGINT,
	@CPF           VARCHAR (11)
AS
BEGIN
	UPDATE BENEFICIARIOS 
	SET 
		NOME = @NOME, 
		CPF = @CPF
	WHERE Id = @Id
END