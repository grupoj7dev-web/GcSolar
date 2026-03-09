# Documentacao Completa do Firestore - Projeto gcredito

Gerado em: 2026-03-08T22:29:22.688Z

Project ID: gcredito

Total de colecoes mapeadas (incluindo subcolecoes): 22

Total de documentos mapeados: 1401

## Visao Geral das Colecoes

| Caminho da colecao | Documentos | Campos unicos |
|---|---:|---:|
| asaas_keys | 3 | 10 |
| assinantes_pendentes | 17 | 49 |
| gcredito_admins | 4 | 8 |
| gcredito_email_settings | 1 | 8 |
| gcredito_faturas_emitidas | 4 | 282 |
| gcredito_faturas_validacao | 3 | 303 |
| gcredito_funcionarios | 9 | 26 |
| gcredito_generators | 7 | 138 |
| gcredito_invoice_attachments | 585 | 8 |
| gcredito_invoice_data | 12 | 79 |
| gcredito_invoice_fetch_log | 406 | 6 |
| gcredito_subscriber_fetch_status | 43 | 10 |
| gcredito_subscribers | 104 | 155 |
| gcredito_tenants | 4 | 7 |
| gcredito_whatsapp_instances | 3 | 5 |
| generator_subscribers | 4 | 11 |
| generators | 8 | 44 |
| invoice_customization | 3 | 2 |
| invoice_data | 161 | 1525 |
| payment_data | 6 | 20 |
| system_settings | 2 | 20 |
| tarifas_referencia | 12 | 4 |

## Estrutura Completa por Colecao

### Colecao: asaas_keys

- ID da colecao: asaas_keys
- Quantidade de documentos: 3
- Quantidade de campos unicos: 10

#### Document IDs

- 972TYkST7ua99M1NcIEJjcRAmaB3_production
- BgR0965BWTdrqEIBFGBUwd7iOas2_production
- MQ6CvSWnASQCcEX1EIoGf1tdGf03_production

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| api_key | string | 3 | 3 | 0 |
| copied_at | string | 1 | 1 | 0 |
| copied_from_user_id | string | 1 | 1 | 0 |
| created_at | string | 3 | 3 | 0 |
| environment | string | 3 | 3 | 0 |
| id | string | 3 | 3 | 0 |
| is_active | boolean | 3 | 3 | 0 |
| last_used | string | 3 | 3 | 0 |
| updated_at | string | 3 | 3 | 0 |
| user_id | string | 3 | 3 | 0 |

### Colecao: assinantes_pendentes

- ID da colecao: assinantes_pendentes
- Quantidade de documentos: 17
- Quantidade de campos unicos: 49

#### Document IDs

- 0BnZBHulDj685eQJhwG2
- 13yFJ4OB17CR7hbuuOtl
- 22xU5zdqfBhADhGOqYPd
- 3P3MJFjnlG6niLEayRG6
- 4o141UXGrhOZJBmnwAkV
- 7tq7LkcG1lkVnh2FnDxG
- 9wxBvhW8koGBweZpqpsD
- CjJIZslAhj4HuxN4Jfsw
- HOf2jTlMYIB3YxK0eFfJ
- HvIiVxnDtLCnBr99xlPv
- RUlLPnENQocPWMnjkduk
- SJUkVuNUewdlsuygwR9M
- XjrTCDNPD4GEKoKPJgxK
- aZJxqflqtmRWctybXszK
- faapL8DYumHtNpTRfE1h
- frt0zWqdnbU3QKWlA1hf
- pr6LLFbv9JSOdxUn2cca

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| consumoMedio | number | 17 | 17 | 0 |
| contaEnergiaNoNomeDoContratante | boolean | 16 | 16 | 0 |
| contrato | map | 8 | 8 | 0 |
| contrato.assinatura | map | 3 | 3 | 0 |
| contrato.assinatura.assinadoEm | timestamp | 3 | 3 | 0 |
| contrato.assinatura.assinaturaImagem | string | 3 | 3 | 0 |
| contrato.assinatura.ip | string | 3 | 3 | 0 |
| contrato.assinatura.location | string | 3 | 3 | 0 |
| contrato.assinatura.nomeConfirmacao | string | 3 | 3 | 0 |
| contrato.assinatura.selfieImagem | string | 3 | 3 | 0 |
| contrato.assinatura.userAgent | string | 3 | 3 | 0 |
| contrato.geradoEm | timestamp | 8 | 8 | 0 |
| contrato.pdfUrl | string | 8 | 8 | 0 |
| cpfCnpj | string | 17 | 17 | 0 |
| cpfCnpjDonoConta | string | 16 | 16 | 0 |
| createdAt | timestamp | 17 | 17 | 0 |
| createdBy | string | 17 | 17 | 0 |
| dataFundacao | string | 7 | 7 | 0 |
| dataNascimento | string | 17 | 17 | 0 |
| dataNascimentoDonoConta | string | 4 | 4 | 0 |
| desconto | number | 17 | 17 | 0 |
| documentos | map | 17 | 17 | 0 |
| documentos.cnhDonoContaUrl | string | 2 | 2 | 0 |
| documentos.cnhUrl | string | 8 | 8 | 0 |
| documentos.contaEnergiaUrl | string | 8 | 8 | 0 |
| documentos.contratoSocialUrl | string | 2 | 2 | 0 |
| email | string | 17 | 17 | 0 |
| endereco | map | 16 | 16 | 0 |
| endereco.bairro | string | 16 | 16 | 0 |
| endereco.cep | string | 16 | 16 | 0 |
| endereco.cidade | string | 16 | 16 | 0 |
| endereco.complemento | string | 16 | 16 | 0 |
| endereco.estado | string | 16 | 16 | 0 |
| endereco.logradouro | string | 16 | 16 | 0 |
| endereco.numero | string | 16 | 16 | 0 |
| isencaoFioB | boolean | 17 | 17 | 0 |
| isencaoImpostos | boolean | 17 | 17 | 0 |
| modalidade | string | 16 | 16 | 0 |
| nome | string | 17 | 17 | 0 |
| nomeAdmin | string | 17 | 17 | 0 |
| nomeDonoConta | string | 16 | 16 | 0 |
| nomeFantasia | string | 7 | 7 | 0 |
| razaoSocial | string | 7 | 7 | 0 |
| status | string | 17 | 17 | 0 |
| telefone | string | 17 | 17 | 0 |
| tenantId | string | 17 | 17 | 0 |
| tipoPessoa | string | 17 | 17 | 0 |
| uc | string | 17 | 17 | 0 |
| updatedAt | timestamp | 17 | 17 | 0 |

### Colecao: gcredito_admins

- ID da colecao: gcredito_admins
- Quantidade de documentos: 4
- Quantidade de campos unicos: 8

#### Document IDs

- 972TYkST7ua99M1NcIEJjcRAmaB3
- BgR0965BWTdrqEIBFGBUwd7iOas2
- MQ6CvSWnASQCcEX1EIoGf1tdGf03
- mqHpil0qsUUMcqwButJhZzSrodq2

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| createdAt | string | 4 | 4 | 0 |
| email | string | 4 | 4 | 0 |
| name | string | 4 | 4 | 0 |
| role | string | 1 | 1 | 0 |
| tenantId | string | 4 | 4 | 0 |
| uid | string | 4 | 4 | 0 |
| updatedAt | string | 1 | 1 | 0 |
| whatsapp | string | 3 | 3 | 0 |

### Colecao: gcredito_email_settings

- ID da colecao: gcredito_email_settings
- Quantidade de documentos: 1
- Quantidade de campos unicos: 8

#### Document IDs

- 972TYkST7ua99M1NcIEJjcRAmaB3

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| fromEmail | string | 1 | 1 | 0 |
| fromName | string | 1 | 1 | 0 |
| host | string | 1 | 1 | 0 |
| pass | string | 1 | 1 | 0 |
| port | number | 1 | 1 | 0 |
| secure | boolean | 1 | 1 | 0 |
| updatedAt | string | 1 | 1 | 0 |
| user | string | 1 | 1 | 0 |

### Colecao: gcredito_faturas_emitidas

- ID da colecao: gcredito_faturas_emitidas
- Quantidade de documentos: 4
- Quantidade de campos unicos: 282

#### Document IDs

- GFWCN5F3SEgYV6Hd90ru
- OxMpY5wxWvsedtNWj8Sb
- da8225phUIr7tay92JLG
- jFzHdp4ZaZtdDNWjlauz

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| created_at | string | 4 | 4 | 0 |
| dados_calculados | map | 4 | 4 | 0 |
| dados_calculados.address | string | 4 | 4 | 0 |
| dados_calculados.caracteristicas | map | 4 | 4 | 0 |
| dados_calculados.caracteristicas.consumoNaoCompensado | number | 4 | 4 | 0 |
| dados_calculados.caracteristicas.descricao | string | 4 | 4 | 0 |
| dados_calculados.caracteristicas.energiaCompensada | number | 4 | 4 | 0 |
| dados_calculados.caracteristicas.percentualCompensado | number | 4 | 4 | 0 |
| dados_calculados.caracteristicas.tipo | string | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos | map | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.consumoNaoCompensado | number | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.consumoTotal | number | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.cpfCnpj | string | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.endereco | string | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.energiaCompensada | number | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.ilumPublica | number | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.jurosMulta | number | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.mesReferencia | string | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.nome | string | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.tarifaComTributos | number | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.uc | string | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.valorTotal | number | 4 | 4 | 0 |
| dados_calculados.dadosExtraidos.vencimento | string | 4 | 4 | 0 |
| dados_calculados.economia | number | 4 | 4 | 0 |
| dados_calculados.energia_compensada | number | 4 | 4 | 0 |
| dados_calculados.extra | map | 4 | 4 | 0 |
| dados_calculados.extra.cnpj_cpf | string | 4 | 4 | 0 |
| dados_calculados.full_result | map | 4 | 4 | 0 |
| dados_calculados.full_result.caracteristicas | map | 4 | 4 | 0 |
| dados_calculados.full_result.caracteristicas.consumoNaoCompensado | number | 4 | 4 | 0 |
| dados_calculados.full_result.caracteristicas.descricao | string | 4 | 4 | 0 |
| dados_calculados.full_result.caracteristicas.energiaCompensada | number | 4 | 4 | 0 |
| dados_calculados.full_result.caracteristicas.percentualCompensado | number | 4 | 4 | 0 |
| dados_calculados.full_result.caracteristicas.tipo | string | 4 | 4 | 0 |
| dados_calculados.full_result.confianca | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos | map | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.address | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.ajustes | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.ajustes_breakdown | null | 4 | 0 | 4 |
| dados_calculados.full_result.dados_extraidos.bandeira_1 | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.bandeira_2 | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.ciclo_geracao | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.cofins_aliq | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.compensated_energy | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.compensated_energy_breakdown | null | 4 | 0 | 4 |
| dados_calculados.full_result.dados_extraidos.consumer_unit | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.excedente_recebido | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.expiration_date | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.extraction_confidence | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.extraction_source | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.fioB | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.fioB_rate | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.icms_aliq | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.ICMS_SCEE | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.iluminacaoPublica | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.invoice_consume | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.invoice_value | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.is_baixa_renda | boolean | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.is_shared | boolean | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.juros | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.legal_name | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.measured_energy | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.month_reference | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.multa | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.outros | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.pis_aliq | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.PIS_COFINS_SCEE | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.retroativos | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.saldo_acumulado | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.saldo_anterior | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.saldo_pdf | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.status | string | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.Tarifa Do Ad. De Band. 1 Com impostos | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_bandeira | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_bandeira_base | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_com_tributos | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_nc_sem_tributos | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_scee | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_scee_inj | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.total_energy_ativa | number | 4 | 4 | 0 |
| dados_calculados.full_result.dados_extraidos.uc_geradora | string | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos | map | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.consumoNaoCompensado | number | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.consumoTotal | number | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.cpfCnpj | string | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.endereco | string | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.energiaCompensada | number | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.ilumPublica | number | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.jurosMulta | number | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.mesReferencia | string | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.nome | string | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.tarifaComTributos | number | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.uc | string | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.valorTotal | number | 4 | 4 | 0 |
| dados_calculados.full_result.dadosExtraidos.vencimento | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2 | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.consumoNaoCompensado | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.energiaCompensada | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.energiaInjetada | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.saldoAnterior | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.consumoNaoCompensado | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.cpfCnpj | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.endereco | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.energiaCompensada | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.mesReferencia | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.nome | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.saldoAnterior | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.uc | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.valorTotal | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.vencimento | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.endereco | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.mes_referencia | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.nome | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.uc | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.vencimento | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.id | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.justificativa | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.modelo | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.nome | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.desconto | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.economia | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.tarifaCheia | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.tarifaComDesconto | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.valorEquatorial | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.valorGoldtech | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.valorTotal | number | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.success | boolean | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh) | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Consumo Total | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Compensada | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Não Compensada | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Excedente Recebido | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Anterior | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Atualizado | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Adicionais de Bandeira | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Créditos / Ajustes de Faturamento | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Energia Não Compensada | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.EQUATORIAL | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Iluminação Pública (CIP/COSIP) | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Impostos SCEE (Encargos Redes) | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 1 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 2 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 3 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 4 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.TOTAL EQUATORIAL | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH._obs | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Detalhamento | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.GOLDTECH | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.total | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (a pagar) | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (Líquido) | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Unitário (Líquido) | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA.ECONOMIA REAL | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA.Tarifa Referencia | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA.TOTAL A PAGAR | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Custo total | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.preco | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Preço unitário | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.total | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Custo total | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.preco | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Preço unitário | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.QTD (kWh) | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.total | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Custo total | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Preço unitário | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH._obs | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS) | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Custo total | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).preco | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Preço unitário | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).QTD (kWh) | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).total | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC) | map | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).Custo total | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).preco | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).Preço unitário | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).QTD (kWh) | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).total | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS) | map | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS).Custo total | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS).Preço unitário | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS).QTD (kWh) | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR | map | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR._fonte | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Energia (sem solar) | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Ilum. Pública (CIP/COSIP) | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Total | string | 4 | 4 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Você pagaria esse mês o valor de | string | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro | map | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro.desconto | number | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro.economia | number | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro.tarifaCheia | number | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro.tarifaComDesconto | number | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro.valorEquatorial | number | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro.valorGoldtech | number | 4 | 4 | 0 |
| dados_calculados.full_result.financeiro.valorTotal | number | 4 | 4 | 0 |
| dados_calculados.full_result.info_fatura | map | 4 | 4 | 0 |
| dados_calculados.full_result.info_fatura.endereco | string | 4 | 4 | 0 |
| dados_calculados.full_result.info_fatura.mes_referencia | string | 4 | 4 | 0 |
| dados_calculados.full_result.info_fatura.nome | string | 4 | 4 | 0 |
| dados_calculados.full_result.info_fatura.uc | string | 4 | 4 | 0 |
| dados_calculados.full_result.info_fatura.vencimento | string | 4 | 4 | 0 |
| dados_calculados.full_result.modelo | string | 4 | 4 | 0 |
| dados_calculados.full_result.modeloDetectado | string | 4 | 4 | 0 |
| dados_calculados.full_result.originalPdfUrl | string | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro | map | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.desconto | number | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.economia | number | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.tarifaCheia | number | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.tarifaComDesconto | number | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.tarifaLiquidaGoldtech | number | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.valorEquatorial | number | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.valorGoldtech | number | 4 | 4 | 0 |
| dados_calculados.full_result.splitFinanceiro.valorTotal | number | 4 | 4 | 0 |
| dados_calculados.full_result.success | boolean | 4 | 4 | 0 |
| dados_calculados.invoice_value | number | 4 | 4 | 0 |
| dados_calculados.legal_name | string | 4 | 4 | 0 |
| dados_calculados.modelo | string | 4 | 4 | 0 |
| dados_calculados.referencia | string | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro | map | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.desconto | number | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.economia | number | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.tarifaCheia | number | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.tarifaComDesconto | number | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.tarifaLiquidaGoldtech | number | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.valorEquatorial | number | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.valorGoldtech | number | 4 | 4 | 0 |
| dados_calculados.splitFinanceiro.valorTotal | number | 4 | 4 | 0 |
| dados_calculados.valor_sem_energypay | number | 4 | 4 | 0 |
| dados_calculados.valor_total | number | 4 | 4 | 0 |
| data_emissao | string | 4 | 4 | 0 |
| data_vencimento | string | 4 | 4 | 0 |
| documento | string | 4 | 4 | 0 |
| economia | number | 4 | 4 | 0 |
| endereco | string | 4 | 4 | 0 |
| energia_compensada | number | 4 | 4 | 0 |
| extra | map | 4 | 4 | 0 |
| fatura_url | string | 4 | 4 | 0 |
| faturamento_usina | map | 4 | 4 | 0 |
| invoice_value | number | 4 | 4 | 0 |
| nome_cliente | string | 4 | 4 | 0 |
| numero_fatura | string | 4 | 4 | 0 |
| referencia | string | 4 | 4 | 0 |
| status_pagamento | string | 4 | 4 | 0 |
| subscriber_id | string | 4 | 4 | 0 |
| subscriber_name | string | 4 | 4 | 0 |
| tenantId | string | 4 | 4 | 0 |
| tipo_pessoa | string | 4 | 4 | 0 |
| uc | string | 4 | 4 | 0 |
| updated_at | string | 4 | 4 | 0 |
| user_id | string | 4 | 4 | 0 |
| valor_sem_energypay | number | 4 | 4 | 0 |
| valor_total | number | 4 | 4 | 0 |

### Colecao: gcredito_faturas_validacao

- ID da colecao: gcredito_faturas_validacao
- Quantidade de documentos: 3
- Quantidade de campos unicos: 303

#### Document IDs

- 2wqz17Rv6mJL4TkLytQI
- BR8TYUIheqXsfRPcrdLM
- tPLKNoY0d3CP624HZZQ6

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| created_at | string | 3 | 3 | 0 |
| dados_calculados | map | 3 | 3 | 0 |
| dados_calculados.address | string | 3 | 3 | 0 |
| dados_calculados.caracteristicas | map | 3 | 3 | 0 |
| dados_calculados.caracteristicas.consumoNaoCompensado | number | 3 | 3 | 0 |
| dados_calculados.caracteristicas.descricao | string | 3 | 3 | 0 |
| dados_calculados.caracteristicas.energiaCompensada | number | 3 | 3 | 0 |
| dados_calculados.caracteristicas.percentualCompensado | number | 3 | 3 | 0 |
| dados_calculados.caracteristicas.tipo | string | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos | map | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.consumoNaoCompensado | number | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.consumoTotal | number | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.cpfCnpj | string | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.endereco | string | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.energiaCompensada | number | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.ilumPublica | number | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.jurosMulta | number | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.mesReferencia | string | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.nome | string | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.tarifaComTributos | number | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.uc | string | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.valorTotal | number | 3 | 3 | 0 |
| dados_calculados.dadosExtraidos.vencimento | string | 3 | 3 | 0 |
| dados_calculados.economia | number | 3 | 3 | 0 |
| dados_calculados.energia_compensada | number | 3 | 3 | 0 |
| dados_calculados.full_result | map | 3 | 3 | 0 |
| dados_calculados.full_result.address | string | 1 | 1 | 0 |
| dados_calculados.full_result.caracteristicas | map | 3 | 3 | 0 |
| dados_calculados.full_result.caracteristicas.consumoNaoCompensado | number | 3 | 3 | 0 |
| dados_calculados.full_result.caracteristicas.descricao | string | 3 | 3 | 0 |
| dados_calculados.full_result.caracteristicas.energiaCompensada | number | 3 | 3 | 0 |
| dados_calculados.full_result.caracteristicas.percentualCompensado | number | 3 | 3 | 0 |
| dados_calculados.full_result.caracteristicas.tipo | string | 3 | 3 | 0 |
| dados_calculados.full_result.compensated_energy | number | 1 | 1 | 0 |
| dados_calculados.full_result.confianca | number | 3 | 3 | 0 |
| dados_calculados.full_result.consumer_unit | string | 1 | 1 | 0 |
| dados_calculados.full_result.consumo_nao_compensado | number | 1 | 1 | 0 |
| dados_calculados.full_result.dados_extraidos | map | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.address | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.ajustes | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.ajustes_breakdown | null | 3 | 0 | 3 |
| dados_calculados.full_result.dados_extraidos.bandeira_1 | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.bandeira_2 | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.ciclo_geracao | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.cofins_aliq | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.compensated_energy | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.compensated_energy_breakdown | null | 3 | 0 | 3 |
| dados_calculados.full_result.dados_extraidos.consumer_unit | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.excedente_recebido | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.expiration_date | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.extraction_confidence | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.extraction_source | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.fioB | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.fioB_rate | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.icms_aliq | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.ICMS_SCEE | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.iluminacaoPublica | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.invoice_consume | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.invoice_value | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.is_baixa_renda | boolean | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.is_shared | boolean | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.juros | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.legal_name | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.measured_energy | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.month_reference | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.multa | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.outros | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.pis_aliq | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.PIS_COFINS_SCEE | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.retroativos | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.saldo_acumulado | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.saldo_anterior | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.saldo_pdf | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.status | string | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.Tarifa Do Ad. De Band. 1 Com impostos | number | 1 | 1 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_bandeira | number | 1 | 1 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_bandeira_base | number | 1 | 1 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_com_tributos | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_nc_sem_tributos | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_scee | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.tarifa_scee_inj | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.total_energy_ativa | number | 3 | 3 | 0 |
| dados_calculados.full_result.dados_extraidos.uc_geradora | string | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos | map | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.consumoNaoCompensado | number | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.consumoTotal | number | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.cpfCnpj | string | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.endereco | string | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.energiaCompensada | number | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.ilumPublica | number | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.jurosMulta | number | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.mesReferencia | string | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.nome | string | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.tarifaComTributos | number | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.uc | string | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.valorTotal | number | 3 | 3 | 0 |
| dados_calculados.full_result.dadosExtraidos.vencimento | string | 3 | 3 | 0 |
| dados_calculados.full_result.economia | number | 1 | 1 | 0 |
| dados_calculados.full_result.expiration_date | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra | map | 1 | 1 | 0 |
| dados_calculados.full_result.extra.address | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.ajustes | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.ajustes_breakdown | null | 1 | 0 | 1 |
| dados_calculados.full_result.extra.bandeira_1 | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.bandeira_2 | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.ciclo_geracao | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.cofins_aliq | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.compensated_energy | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.compensated_energy_breakdown | null | 1 | 0 | 1 |
| dados_calculados.full_result.extra.consumer_unit | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.excedente_recebido | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.expiration_date | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.extraction_confidence | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.extraction_source | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.fioB | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.fioB_rate | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.icms_aliq | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.ICMS_SCEE | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.iluminacaoPublica | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.invoice_consume | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.invoice_value | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.is_baixa_renda | boolean | 1 | 1 | 0 |
| dados_calculados.full_result.extra.is_shared | boolean | 1 | 1 | 0 |
| dados_calculados.full_result.extra.juros | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.legal_name | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.measured_energy | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.month_reference | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.multa | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.non_compensated_energy | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.outros | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.pis_aliq | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.PIS_COFINS_SCEE | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.retroativos | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.saldo_acumulado | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.saldo_anterior | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.saldo_pdf | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.status | string | 1 | 1 | 0 |
| dados_calculados.full_result.extra.Tarifa Do Ad. De Band. 1 Com impostos | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.tarifa_bandeira | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.tarifa_bandeira_base | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.tarifa_com_tributos | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.tarifa_compensacao | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.tarifa_nc_sem_tributos | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.tarifa_scee | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.tarifa_scee_inj | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.total_energy_ativa | number | 1 | 1 | 0 |
| dados_calculados.full_result.extra.uc_geradora | string | 1 | 1 | 0 |
| dados_calculados.full_result.fatura_calculada | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2 | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.consumoNaoCompensado | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.energiaCompensada | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.energiaInjetada | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.caracteristicas.saldoAnterior | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.consumoNaoCompensado | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.cpfCnpj | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.endereco | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.energiaCompensada | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.mesReferencia | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.nome | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.saldoAnterior | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.uc | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.valorTotal | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.dadosExtraidos.vencimento | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.endereco | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.mes_referencia | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.nome | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.uc | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.info_fatura.vencimento | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.id | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.justificativa | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.modelo | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.modelo.nome | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.desconto | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.economia | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.tarifaCheia | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.tarifaComDesconto | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.valorEquatorial | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.valorGoldtech | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.splitFinanceiro.valorTotal | number | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada_v2.success | boolean | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh) | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Consumo Total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Compensada | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Não Compensada | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Excedente Recebido | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Anterior | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Atualizado | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.EQUATORIAL | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 1 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 2 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 3 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 4 | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Detalhamento | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.GOLDTECH | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA.ECONOMIA REAL | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA.Tarifa Referencia | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.3. TOTAL E ECONOMIA.TOTAL A PAGAR | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH._obs | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.GOLDTECH.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS) | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.OUTROS.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR | map | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Energia (sem solar) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Ilum. Pública (CIP/COSIP) | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Total | string | 3 | 3 | 0 |
| dados_calculados.full_result.fatura_calculada.VALOR SEM SOLAR.Você pagaria esse mês o valor de | string | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro | map | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro.desconto | number | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro.economia | number | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro.tarifaCheia | number | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro.tarifaComDesconto | number | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro.valorEquatorial | number | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro.valorGoldtech | number | 3 | 3 | 0 |
| dados_calculados.full_result.financeiro.valorTotal | number | 3 | 3 | 0 |
| dados_calculados.full_result.info_fatura | map | 3 | 3 | 0 |
| dados_calculados.full_result.info_fatura.endereco | string | 3 | 3 | 0 |
| dados_calculados.full_result.info_fatura.mes_referencia | string | 3 | 3 | 0 |
| dados_calculados.full_result.info_fatura.nome | string | 3 | 3 | 0 |
| dados_calculados.full_result.info_fatura.uc | string | 3 | 3 | 0 |
| dados_calculados.full_result.info_fatura.vencimento | string | 3 | 3 | 0 |
| dados_calculados.full_result.legal_name | string | 1 | 1 | 0 |
| dados_calculados.full_result.modelo | string | 3 | 3 | 0 |
| dados_calculados.full_result.modeloDetectado | string | 3 | 3 | 0 |
| dados_calculados.full_result.month_reference | string | 1 | 1 | 0 |
| dados_calculados.full_result.originalPdfUrl | string | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro | map | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.desconto | number | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.economia | number | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.tarifaCheia | number | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.tarifaComDesconto | number | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.tarifaLiquidaGoldtech | number | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.valorEquatorial | number | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.valorGoldtech | number | 3 | 3 | 0 |
| dados_calculados.full_result.splitFinanceiro.valorTotal | number | 3 | 3 | 0 |
| dados_calculados.full_result.success | boolean | 3 | 3 | 0 |
| dados_calculados.full_result.tarifa_com_tributos | number | 1 | 1 | 0 |
| dados_calculados.full_result.valor_sem_energypay | number | 1 | 1 | 0 |
| dados_calculados.full_result.valor_total_com_energypay | number | 1 | 1 | 0 |
| dados_calculados.full_result.valor_total_energypay | number | 1 | 1 | 0 |
| dados_calculados.invoice_value | number | 3 | 3 | 0 |
| dados_calculados.legal_name | string | 3 | 3 | 0 |
| dados_calculados.modelo | string | 3 | 3 | 0 |
| dados_calculados.referencia | string | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro | map | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.desconto | number | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.economia | number | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.tarifaCheia | number | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.tarifaComDesconto | number | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.tarifaLiquidaGoldtech | number | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.valorEquatorial | number | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.valorGoldtech | number | 3 | 3 | 0 |
| dados_calculados.splitFinanceiro.valorTotal | number | 3 | 3 | 0 |
| dados_calculados.valor_sem_energypay | number | 3 | 3 | 0 |
| dados_calculados.valor_total | number | 3 | 3 | 0 |
| documento | string | 3 | 3 | 0 |
| fatura_url | string | 3 | 3 | 0 |
| message | string | 3 | 3 | 0 |
| referencia | string | 3 | 3 | 0 |
| status | string | 3 | 3 | 0 |
| subscriber_id | string | 3 | 3 | 0 |
| subscriber_name | string | 3 | 3 | 0 |
| tenantId | string | 3 | 3 | 0 |
| tipo_pessoa | string | 3 | 3 | 0 |
| uc | string | 3 | 3 | 0 |
| updated_at | string | 3 | 3 | 0 |
| user_id | string | 3 | 3 | 0 |
| valor | number | 3 | 3 | 0 |
| vencimento | string | 3 | 3 | 0 |

### Colecao: gcredito_funcionarios

- ID da colecao: gcredito_funcionarios
- Quantidade de documentos: 9
- Quantidade de campos unicos: 26

#### Document IDs

- 1ckUtQDFBwRglgmJ9BgOpyJobxB3
- 8GYj9ztajVOqHN9ze18KyIcm26v1
- 9WA0LfxiH3WpMDXbUkbH
- UzjOW2gTXkbF0EIGOFkGgBBaZYa2
- fn8hF1NYEqONOVtWyqq6Cew19fi1
- lmh2ocUtdGNFO6JhKpoB
- qjQPKn2ySmNzUB2f50vEBB2cnks2
- tNuLgyctjMY4ix0TkrsDUJwMnbI2
- uf6JTRYctiNBprWtckmt66cx9fd2

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| approved_at | string | 7 | 7 | 0 |
| approved_by | string | 7 | 7 | 0 |
| auth_user_id | null | 2 | 0 | 2 |
| can_see_manager_percentage | boolean | 2 | 2 | 0 |
| cargo | string | 9 | 9 | 0 |
| commission_months | number | 7 | 7 | 0 |
| commission_percentage | number | 7 | 7 | 0 |
| created_at | string | 2 | 2 | 0 |
| createdAt | string | 7 | 7 | 0 |
| email | string | 9 | 9 | 0 |
| nome | string | 9 | 9 | 0 |
| permissions | map | 9 | 9 | 0 |
| permissions.assinantes | boolean | 9 | 9 | 0 |
| permissions.canEditGdRules | boolean | 2 | 2 | 0 |
| permissions.dashboard | boolean | 9 | 9 | 0 |
| permissions.faturas | boolean | 9 | 9 | 0 |
| permissions.geradoras | boolean | 9 | 9 | 0 |
| permissions.procuracao | boolean | 9 | 9 | 0 |
| permissions.rateio | boolean | 9 | 9 | 0 |
| permissions.representantes | boolean | 7 | 7 | 0 |
| status | string | 9 | 9 | 0 |
| telefone | string | 9 | 9 | 0 |
| tenantId | string | 9 | 9 | 0 |
| uid | string | 7 | 7 | 0 |
| updated_at | string | 2 | 2 | 0 |
| user_id | string | 9 | 9 | 0 |

### Colecao: gcredito_generators

- ID da colecao: gcredito_generators
- Quantidade de documentos: 7
- Quantidade de campos unicos: 138

#### Document IDs

- TGCPkex8GISK2V70ugDY
- VEXakf4DZM8a0WgBuvKn
- XrCNME8ciaqR6HA5iEUU
- YoJd5xqKWQg2IQ2Kkd6d
- b6LAqZMS1Y0tBCqK4Zr6
- sR25CMcdxVr13GTqXViu
- ziqnNMGZBDDJPzbdn9A9

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| administrator | map | 3 | 3 | 0 |
| administrator.address | map | 3 | 3 | 0 |
| administrator.address.bairro | null, string | 3 | 2 | 1 |
| administrator.address.cep | null, string | 3 | 2 | 1 |
| administrator.address.cidade | null, string | 3 | 2 | 1 |
| administrator.address.complemento | null, string | 3 | 1 | 2 |
| administrator.address.endereco | null, string | 3 | 2 | 1 |
| administrator.address.estado | null, string | 3 | 2 | 1 |
| administrator.address.numero | null, string | 3 | 2 | 1 |
| administrator.cpf | null, string | 3 | 2 | 1 |
| administrator.dataNascimento | null, string | 3 | 2 | 1 |
| administrator.email | null, string | 3 | 2 | 1 |
| administrator.nome | null, string | 3 | 2 | 1 |
| administrator.telefone | null, string | 3 | 2 | 1 |
| attachments | map | 6 | 6 | 0 |
| attachments.cnh | map | 2 | 2 | 0 |
| attachments.cnh.name | string | 2 | 2 | 0 |
| attachments.cnh.size | number | 2 | 2 | 0 |
| attachments.cnh.storagePath | string | 2 | 2 | 0 |
| attachments.cnh.type | string | 2 | 2 | 0 |
| attachments.cnh.uploadedAt | string | 2 | 2 | 0 |
| attachments.cnh.url | string | 2 | 2 | 0 |
| attachments.conta | map | 2 | 2 | 0 |
| attachments.conta.name | string | 2 | 2 | 0 |
| attachments.conta.size | number | 2 | 2 | 0 |
| attachments.conta.storagePath | string | 2 | 2 | 0 |
| attachments.conta.type | string | 2 | 2 | 0 |
| attachments.conta.uploadedAt | string | 2 | 2 | 0 |
| attachments.conta.url | string | 2 | 2 | 0 |
| attachments.contrato | map | 1 | 1 | 0 |
| attachments.contrato.name | string | 1 | 1 | 0 |
| attachments.contrato.size | number | 1 | 1 | 0 |
| attachments.contrato.storagePath | string | 1 | 1 | 0 |
| attachments.contrato.type | string | 1 | 1 | 0 |
| attachments.contrato.uploadedAt | string | 1 | 1 | 0 |
| attachments.contrato.url | string | 1 | 1 | 0 |
| attachments.contratoSocial | map | 2 | 2 | 0 |
| attachments.contratoSocial.name | string | 2 | 2 | 0 |
| attachments.contratoSocial.size | number | 2 | 2 | 0 |
| attachments.contratoSocial.storagePath | string | 2 | 2 | 0 |
| attachments.contratoSocial.type | string | 2 | 2 | 0 |
| attachments.contratoSocial.uploadedAt | string | 2 | 2 | 0 |
| attachments.contratoSocial.url | string | 2 | 2 | 0 |
| attachments.procuracao | map | 1 | 1 | 0 |
| attachments.procuracao.name | string | 1 | 1 | 0 |
| attachments.procuracao.size | number | 1 | 1 | 0 |
| attachments.procuracao.storagePath | string | 1 | 1 | 0 |
| attachments.procuracao.type | string | 1 | 1 | 0 |
| attachments.procuracao.uploadedAt | string | 1 | 1 | 0 |
| attachments.procuracao.url | string | 1 | 1 | 0 |
| concessionaria | string | 6 | 6 | 0 |
| created_at | string | 7 | 7 | 0 |
| distributor_login | map | 2 | 2 | 0 |
| distributor_login.cpfCnpj | string | 2 | 2 | 0 |
| distributor_login.dataNascimento | string | 2 | 2 | 0 |
| distributor_login.uc | string | 2 | 2 | 0 |
| distributorLogin | map | 5 | 5 | 0 |
| distributorLogin.cpfCnpj | string | 5 | 5 | 0 |
| distributorLogin.dataNascimento | string | 5 | 5 | 0 |
| distributorLogin.uc | string | 5 | 5 | 0 |
| owner | map | 6 | 6 | 0 |
| owner.address | map | 6 | 6 | 0 |
| owner.address.bairro | string | 6 | 6 | 0 |
| owner.address.cep | string | 6 | 6 | 0 |
| owner.address.cidade | string | 6 | 6 | 0 |
| owner.address.complemento | string | 6 | 6 | 0 |
| owner.address.endereco | string | 6 | 6 | 0 |
| owner.address.estado | string | 6 | 6 | 0 |
| owner.address.numero | string | 6 | 6 | 0 |
| owner.cpfCnpj | string | 6 | 6 | 0 |
| owner.dataNascimento | string | 6 | 6 | 0 |
| owner.email | string | 6 | 6 | 0 |
| owner.name | string | 6 | 6 | 0 |
| owner.nomeFantasia | string | 3 | 3 | 0 |
| owner.numeroParceiroNegocio | string | 6 | 6 | 0 |
| owner.observacoes | string | 6 | 6 | 0 |
| owner.razaoSocial | string | 6 | 6 | 0 |
| owner.telefone | string | 6 | 6 | 0 |
| owner.type | string | 6 | 6 | 0 |
| payment_data | map | 2 | 2 | 0 |
| payment_data.agencia | string | 2 | 2 | 0 |
| payment_data.banco | string | 2 | 2 | 0 |
| payment_data.conta | string | 2 | 2 | 0 |
| payment_data.pix | string | 2 | 2 | 0 |
| paymentData | map | 5 | 5 | 0 |
| paymentData.agencia | string | 5 | 5 | 0 |
| paymentData.banco | string | 5 | 5 | 0 |
| paymentData.conta | string | 5 | 5 | 0 |
| paymentData.pix | string | 5 | 5 | 0 |
| plants | array | 6 | 6 | 0 |
| plants[] | map | 6 | 6 | 0 |
| plants[].address | map | 6 | 6 | 0 |
| plants[].address.bairro | string | 6 | 6 | 0 |
| plants[].address.cep | string | 6 | 6 | 0 |
| plants[].address.cidade | string | 6 | 6 | 0 |
| plants[].address.city | string | 3 | 3 | 0 |
| plants[].address.complement | null, string | 3 | 2 | 1 |
| plants[].address.complemento | string | 6 | 6 | 0 |
| plants[].address.endereco | string | 6 | 6 | 0 |
| plants[].address.estado | string | 6 | 6 | 0 |
| plants[].address.neighborhood | string | 3 | 3 | 0 |
| plants[].address.number | string | 3 | 3 | 0 |
| plants[].address.numero | string | 6 | 6 | 0 |
| plants[].address.state | string | 3 | 3 | 0 |
| plants[].address.street | string | 3 | 3 | 0 |
| plants[].apelido | string | 6 | 6 | 0 |
| plants[].contacts | array | 6 | 6 | 0 |
| plants[].contacts[] | empty, map | 6 | 2 | 0 |
| plants[].contacts[].funcao | string | 2 | 2 | 0 |
| plants[].contacts[].nome | string | 2 | 2 | 0 |
| plants[].contacts[].telefone | string | 2 | 2 | 0 |
| plants[].geracaoProjetada | number | 6 | 6 | 0 |
| plants[].inversores | array | 6 | 6 | 0 |
| plants[].inversores[] | empty, map | 6 | 3 | 0 |
| plants[].inversores[].marca | string | 3 | 3 | 0 |
| plants[].inversores[].potencia | number | 3 | 3 | 0 |
| plants[].inversores[].quantidade | number | 3 | 3 | 0 |
| plants[].marcaModulo | string | 6 | 6 | 0 |
| plants[].modalidadeCompensacao | string | 6 | 6 | 0 |
| plants[].observacoes | string | 6 | 6 | 0 |
| plants[].observacoesInstalacao | string | 6 | 6 | 0 |
| plants[].ownerCpfCnpj | string | 6 | 6 | 0 |
| plants[].ownerDataNascimento | string | 2 | 2 | 0 |
| plants[].ownerName | string | 6 | 6 | 0 |
| plants[].ownerNumeroParceiroNegocio | string | 6 | 6 | 0 |
| plants[].ownerType | string | 6 | 6 | 0 |
| plants[].potenciaModulo | number | 6 | 6 | 0 |
| plants[].potenciaTotalInversores | number | 6 | 6 | 0 |
| plants[].potenciaTotalUsina | number | 6 | 6 | 0 |
| plants[].potenciaTotalUsinaOverride | boolean | 2 | 2 | 0 |
| plants[].quantidadeModulos | number | 6 | 6 | 0 |
| plants[].tipoUsina | string | 6 | 6 | 0 |
| plants[].uc | string | 6 | 6 | 0 |
| status | string | 6 | 6 | 0 |
| tenantId | string | 6 | 6 | 0 |
| test | boolean | 1 | 1 | 0 |
| updated_at | string | 6 | 6 | 0 |
| user_id | string | 6 | 6 | 0 |

### Colecao: gcredito_invoice_attachments

- ID da colecao: gcredito_invoice_attachments
- Quantidade de documentos: 585
- Quantidade de campos unicos: 8

#### Document IDs

- 049ERH9eXVXN9DSiv7Ut
- 054kqMtDf1ln8FEYGPH0
- 06lCUs3WTzoz2MKvNFsg
- 0SxPiKbpySg1A0CE21rN
- 0UtAKvoZ4JyyeedMBWzw
- 0h4swVQKEms2oauI4AuQ
- 0itqkNCCZvbMW5lSNXFf
- 0r9L1o3tfZeDK1zaneZS
- 0tl0RvzB1V7Sibg5NcMp
- 0uHV9rCn5Nxv9JaYe5aZ
- 1201pYXj6CPvABcU3noz
- 12LvTZKchCgeFJb2x0be
- 175SJYTqGCabHD95tpGR
- 1AYx4jNEART1h8kBOnb5
- 1HSwetQsv62XH7vni0yC
- 1Zz66WSfdSgkwJ4eTb2Q
- 1fzEVymsb2VV0OvSdW4D
- 1tSsayyqYOFcFXb7vnlK
- 2GjJRsn7FBVzmnGbTl1p
- 2MlsDhCPdmXTt2LEwQat
- 2NIOMk2oGvpxfUCkPFDY
- 2PIbQ62wJO7p2EZG0pya
- 2WRr9irgQbN45eFm9HZ2
- 2XgVVOR4vUYzbXgv3aIR
- 2Y7wIqehcCt8CSEdvF4T
- 2iYeTbWDG2Rcnd7Kjl48
- 2nNuOg7i8OKEEsy05MBE
- 2qrsvGbGExv03FR3VWqr
- 2wpU9SKQKVlVQrmA623p
- 2x7VNkOVK7LplamrJugx
- 31gFYGMgBmMldOAo7WRV
- 3XRyDoA9z9zHU7auf7cH
- 3ZxXCLl0yI53a1hPHlpg
- 3kkBKyaffxf0cS4ooHEo
- 3nR08qZcvpjt0vhlHEIX
- 3x7hj7cG6kE7PJCiZHKF
- 3z6RQGs2jbvNcyniKwLY
- 416F7P5cvDkSCAys3fO9
- 45DqvsiJldCOR3lIzvNi
- 45zvBjqii8mVhYOCIuyF
- 4FEAtC9RArTNaQNnpjqW
- 4QSEyEZAi3BlWz75EvDO
- 4XStmqYM7LxKjBFnruof
- 4iaoh5MhHkglRetOXrpV
- 4olKeOczE58p5rMJmkSy
- 4utGovWpJbVZ2YGWgjzP
- 4yKCkXgK7nRyNJTYfSXm
- 56tLclmqjkY6d6qt4Ylq
- 58qJpBFgfJsS18GF6vKb
- 59crGGpDJJ3I7G3Rsjnc
- 5DB8rN8hkYu2PHyN1zBP
- 5Vnl2uQOCW2pwSfGRffg
- 5dpVJNQSRtbH8Uw2vEvZ
- 5fmNWXS7ztz2Ga9ddcm4
- 5iGX6Zm16bSleWsiaxFj
- 5mZSwAHzZMPQy1Ea5gMf
- 68YfcUvsjXxQIRlpGGV3
- 6DgnzjdZ02iuJUGdXnXc
- 6FKKZFsJfi4PQ7ZaZ3a2
- 6WvSo9E6XU6DaGrvHpFG
- 6aF1PRn2fSDiCJi2Lcqs
- 6bOvZEEuFQnhdCG8aIF1
- 6rKHpR0rkIXR3j5VvFp3
- 6v9jBQYWnpO3dzgSwQ6h
- 7C0v2CSmSfmWl1p75TcV
- 7HUDzfbb8X7GrCQ8EA2i
- 7VbEqGmIIcV0PNNLU1ls
- 7Ykx34yUM5YXWbfG67dR
- 7YqYYvddeIor5XdV77oJ
- 7k3sgNH2rtFvAISh6q38
- 7o4HKosbKaqYtl8kbSO5
- 862VUUfKcBNBwj6Yd581
- 8J8T9ezwyJ4tipDFDl53
- 8P4NEEa7rgWrgeFM55jv
- 8ds2rEntF2UaBN7YfYbu
- 8f9W6eJ4bbsMbIUvzYpf
- 8rPn7U0QrapCaEB9Omkr
- 8sPcbQQx9jzd2RhnL3xt
- 8uqCwSLEsTIyyDaHEPC7
- 8wdeQgC7RkXOM7TJGbGX
- 90WUMT9fyPWfLzw1iCTG
- 997KC8S0Rxw9f91dCP4i
- 9I4RjtkOJyeGRkVkALYo
- 9IfEIXxs4wWwFugEO4NT
- 9JJE0a2sWNzDkn5TFF7I
- 9OFehJexIWK6joTcyUTp
- 9OiTRQg8J8bXkC9ej0ib
- 9kqCCqdSOVU0CBoIaPGE
- 9mkeQWzG4oS4ONhpnvq4
- 9o96wqyHIgPwimfTvTQa
- 9rv28Yg5jU95L9GAZ724
- AB2W0iVqVqKbRjX0VVKQ
- AKE2GvfFBNh3IFWZAkqY
- AKma8x8kor1Ptvznrw59
- AbE04fGSPfbVHdF74wvH
- AimZIJ3AQCxRtrouBpbj
- Ao6avmmDqRXiBVRfJFwT
- Asoi6YXs7h8NAc28Wgjk
- AvqGqZDd64t3WMxwergJ
- B0xded8Yu9LvRV4clL11
- B4rTpYRFvOnrQ1dsNBBQ
- BHlwjJVaFgMS9PhjncDT
- BIbRsl7gpnaUDRso7Rxn
- BK3EIOPRmQqKts07i2VZ
- BShKPltLv1zh3GxPZPdN
- BT7RjT3rNVbNVEw9ODob
- Ba2PCj7ZwSoHfDWvJi2I
- Bi5rRmTRM9LEwgRfSEbU
- BirZ4UVQL6Q348HtYIzT
- BmIXiUOH3z7hoCE64eRQ
- BmVy3mYYhVlwkdynt3rg
- Bn0tch4VWEe7NaK9x6d7
- Buoi7pmZ21w3BJ8kxJCv
- CAmUP3KisHBeTgizdJsr
- CFIIQu52FTccqPXpeCsY
- CtQMClsEP9XcMOfo9u4J
- CwALNMkafBf7yOUvzEBv
- DCmDxVUxo3YOlDmgYqMp
- DDDRV7N8OMS67Xo43YpK
- DFqanAdjWFB90e7FH904
- DFxW8sFrsYuifUTpTiC6
- DJjW1jBEOdzax50oPNBh
- DPMaTITKamgXVi7do2hl
- DPPrmsYrldLCEQP7GQmv
- Dbdl5K1GAlZnw2scfmP0
- DbvPJwYpGTnShO5OyZ66
- Dls0kdMIhC3MjQuqVcLM
- DqeQMNdRg7eQH6ZrRO43
- DwogJVvK5wuITVxQ5GR1
- E72vDKtXQUDxQ8hhc5Mv
- EQpsJtMYeR7X7HfrWIv9
- EW7Wq33YMFrNJpfbGRC7
- EYtLj0imEyUWQstG8oGr
- F6JoIt1FCoQUOirWDQuy
- FPZhp2dd58SUOndamnmY
- FRV5PUsi3kPcmuOuIgjf
- FWL7CQl60sEw1B7enag4
- FWmgHXCv8km8az0mlqat
- FcdfsDxMshs5Bj6Ca5Y7
- FmAr5TCYkJHuyeEQUPqY
- G1Vku4vSiwDxyHVOORGL
- GFYUVjJmHPExUIaIdLP8
- GIOGDgmn4iZCTAGgVxgY
- GUKlkxBAV8A62r7RBOZn
- GYIuYFkLSI5iIIbocGu3
- GZGTEwoXXdjJ6WkHcXhI
- GkAa0jhHjKGUkD7gLTpG
- GzYGNPzMbiRTv0swNR2Y
- GzdYbOD220X4iSFoftUg
- H6qq8Ii1c604CkFJapD2
- HDztwpj2v4YgSe3FgzOS
- HVPts4qaOsC59JBKtGgv
- HdzWBMIl3ku7dWgRhtEO
- Hf4otNOSvKhhBewN73yI
- Hgnde7AfwdxXjyNP74jT
- HhaGGJKiR9kIiP1tSvyo
- HxNtQ1gW4g4j0CwiVi3u
- ICrKHvfeSDHgMdrh0zEt
- ILUaaKcdSB9SkiRraHhy
- IVaWH9sxgo6YJXwnOW3f
- IWRCbhAFyduv3xgVOrbJ
- IcXOxzVsA6UUJJ8nhFyl
- IfXQw7elprCv9RaiYNA5
- IfeBQR3DbxjBRkfBe9uV
- IgtKbw3DyVYWD4Z3EZ1m
- IiBsreMzuTOaQgMIpx3O
- IjAwqmeJEn1gsxDO5YVd
- IrR1pL8AardFHJM82Iyh
- IrbReqvAOgfsjhovTy4a
- J2yR3hXTu6NanTNPgYJT
- JE4V9YYrovZRAPEM3ibH
- JHSQZ6lpETSoiuIk9xjr
- JIHpa7hd0y4wR5mnKLs6
- JULBIGoDoePYl6qKKaJV
- JoXqLQnbWdDUqIn8TUFV
- JtENyr3Jfix4k8QeiSK4
- Ju9qcEtjZDe6ZpR5oBIF
- JxyR3XJUHoRW8sRMw2J4
- JytVQhwwtHPlSU9fiFDl
- K9Ll4xg5zQUSSfP57fQ5
- KBbxzYS41vx3XYtQBvbd
- KIILBk33akVvefUdYwQ5
- KJtwtCeDhE6rTO9RbrEj
- KKiNKl2ZdaWVHXTX1pd8
- KLgqC2hEaO09HdaLAtHr
- KbOnIJwrAX0LZODT8eMB
- Kh8UhTy29KIS13JEGhe1
- Kl1xA4SJX1UkqPNW1HFy
- KtToQpFJ7qNB5Vpmw2wW
- KwojCWDxO1ldCy3Vngyo
- L2yiMy0IKEDw0CMK7tY6
- LBAylAHbIBHgPsioJve6
- LDcIQ9wB9xxmRF9X0ND4
- LGfHdqSWDKNzlMV6aavy
- LNWuFcqwLgCMpqy3zuaL
- LZJFJ0TeQApiwvsRjRup
- LjwX9lJXA3tQzAjkaJe4
- LkhcXC7yKLJpvax4bSGg
- LuUAB2m35sRZ0BU2lyQE
- LuWNmy4m9orbZ9hU5B5d
- M2r8gRIgPP3Q0JkIpdsL
- MGHcS5CjIQl1ckIDrcBC
- MW14BLXlYOLTgnzlEZCK
- Me1vDwoiBmfPuaQjCUBM
- MqaBohFRtJzmLwinMxUV
- MuIHHSqxdRfS98S1Gf2A
- MyV7TNcaRbMfEETeVR3X
- N4gAefIK9UcXcqtG6TA7
- N9a0KwBkoEGVMBNCzhpq
- NA3LnasolcXDGl5zi6AJ
- NG9HFeUveWvF2GTxbPic
- NNPIjrlBz3J3oDbngPCW
- NOLlDxjJ77KFf7wElxMV
- NXRE8Spuj0cAY3CffyF6
- NawwUbO96eavZr2gqmJz
- Necxb0eyaBDp0FAU0JRU
- NgNx9ZGKcxifAhJxFSV4
- NlmeyewHIvEomH4V79zp
- Nm3DltDJBdYpAGtYBGe0
- NqRTnXubkhPYrJnxpMFA
- Nu3wwTwhc54jIoSHGB6y
- NwypWOixrBRk3j4vPZQ4
- O3M8LIW2fMvCuPiwsfqD
- O67Fqz8Flo29r7yVJtkJ
- OAEmJs4CtsPzuZYYjeGj
- OAlcfZOk7KvhjAQM3L5D
- OIMM5MAeFGq9XQbezjqH
- OLPtupUPG5lQn6vT6oWO
- OWQYw4eKy4GKNn6FOHQ0
- ObV7GMAiPGMzGWyd53Tc
- Oy0o1j1J7DR9CpAlkWHX
- P4F8zl1ig2uj9XJwsvZP
- Pq1me3NxdmlYleX9BSpu
- PymmZe6mz673gPHcb2Ju
- Q5jiPRSWTtYzH4b2Q48D
- QCgZIdDSBYtnqYiiGAto
- QG21KV9UVRt3A4BE4nIm
- QOBtrTF8GSowpqPEz718
- QR84idUh6Y7mjtEu17hk
- QW8z5n4paCoFbZFUeIHj
- QY2XrFe2W525oAjdq3Sv
- Qo3KQKjlq8G2EEPycakP
- QoAsPzxIGwksJI44qYVm
- Qz2b1ehnQmKzH8tGgEpZ
- QzSjqdI9RFacPgOaDJmq
- R810fGsnA33kGFPsdOTj
- R9B911Wy0TmUTWjkeiJ4
- R9Ty7qtUTzjUmPyfy1OD
- RL3gE81vZx9LC30E868U
- RTOR8QpruuaNH0aVCiji
- RUexYJjOlXrGl0EHNu7s
- Rbms5ABJ1fnXbJBkX6Lg
- Rd9fQ1D7KqbQNflTUXMb
- Rf4JV4rL0KPSK87hKz5H
- Rn6y3xOAuBzGU1PBTLYy
- RooBHtOgHwSU0LLfxMk6
- RqTyiOAkmqXyek0hXjIy
- Ry5DiN0zCJir1FfNre7h
- Ryq6OdyBV4aTfNcP2DyC
- S0MdBNrLDr86Hg2LCF3p
- S5uNr7OlF5eeO1SkA6bJ
- SIFIyIVvbmPUxgGdZMNN
- SL48fNiIrHX0A3vVUmCe
- SLTtGveddC4DCJ7edG0S
- SWywKJiyYk2EvG0rcGCd
- Sf2eJO8fxThHrc7tUMvz
- ShawmLqRadevzH8pfX5j
- SqrwPnAa56EHPAC7rhER
- T14KBEoD8ZdgkaKZHkN0
- TA27FsAnfu4IQfNAfomW
- TB2WEohEPT68ZK1IjxTg
- TLPmiJFYkZNQ5PtyFEJi
- TX8axsbAMySy8bKmqIbG
- Ta7hPJrFMB9VqswGV44c
- TeuZnBuD7AFhn7ojtklM
- TjBCcbrVytvGgcY1JdqQ
- TvnrprWGf4SwvqADf5Fh
- U8qASCkg9R3xXu9cp4cW
- UEQ5xAuY5nqtwKR8iw2n
- UFFR5PzuMulgHS6397BK
- UJQ2ECdwYgutLLBst8Ge
- UT2n07G6PDQ7g7tZA2qZ
- UjgJCVOKWEJhV9NqkMEQ
- V7IWfJFkMBiMu1rWRRuR
- VCgi2UOA7NIv46QpGN7W
- VEcrKzdf2k8v5uWdGh4W
- VKb7fdoG2XOR2Tvtp4JP
- VKjoUbzm415e4hMj011v
- VQWnxMTQFhgLa3xllSmB
- VTKcwhbs7sskSy1MD6z4
- VleF3q0y0L6U48ejyWUq
- VuifaudIW1xCJNVZ9hk0
- VxzgzRGntgwm6MATualy
- WUUk0YGTIhG1CNBGHisW
- WWXSzf5tseaBt4aJJ3YE
- WXyJLB4x7wKlPojJgkSv
- WaAxeCQk9q8PmBd9aKVS
- WaK72TatI2lNGjurKmxE
- Wb4QMCDRdWwwpOnLzojL
- WbDpgeBpTeZQGbs6Y5Vd
- Wm8kIVzhAx5BAjwxCFRO
- Wma8rpZkkFqCSUnAbDE5
- WuAqjWRDcOiZNY07jBS6
- Wy6zRQManmDOpf6827kI
- X5kO5l6h7xm8UVF0c9F6
- XDHtHwMTeOS3qt1GseFS
- XGit6qPrN3rSO0dvFNCd
- XH66Y7f2zGL6reHgczAb
- XHv2ROw8RPx5cvF5fHAb
- Xhr8GgZNxTQu5McQWMRC
- Xm5Nefm2pGxUgSD5U4YJ
- XrUjQP0pL4vrnzYfSg1p
- XyXp6g1wHVX4UhnTo0a6
- YBGpw223mHCsq2mJmCVM
- YSPYqQ3HF93ZWkQnSgDF
- YqFbdOEOxFTy0REqzAP1
- YuBzySwgnaBnCKeSiNUZ
- YyHEBBBWfORoph5twIQu
- Z5GDMK4tHKUdGrgx0cvJ
- Z9gYsKrqmVlsME15mbis
- ZDG1bEV3qPpZJ4no774g
- ZHlMaCaYKZiwFrTjk53p
- ZOoMquhDrAuVYdfSfmVt
- ZYBBBkBM4tExjrZlfUAD
- Zb5uX7SSvWfmZKTVBsrB
- Ze5SHKGWqlDkfkaopT88
- ZelFYDvWuv5nxQsdfFOr
- Zi7ZPJAiwsMqbrRGr0l8
- Zij4M4T1OAawAPp5R3YE
- ZnOzOlwSTlj4dxjX4w5h
- Zuk6eYE1EKnU4Qviestn
- a1ZnT0UvQmAC5T8PHO3l
- a3EuPtNIprtd5NrDkCtB
- a3e6eXP9WpBl3sZB9dEn
- a5175ftCqhqfXswaAHf5
- a7ezkcQlWgWaaKHfnhwW
- aQ4d1Skeu4QCamMv9EwA
- aUTghqpzV8T7eyOxZKOS
- aWBK6tZxhAr8mO4rYGEu
- abOJQx4TbqEubZ5gChit
- ajdNWpn5ifnvk19S1zDF
- alYmkWdcqetFL1y6s4t3
- apogv3uY5aRVZUcOOdu5
- awLmqck6LoaklTh5FdWD
- axohXZ7l0AFtGrt57Yc1
- axwQ4EtUz7YtNCDv5ajZ
- aygxvIoNBI2Y4U803hI6
- b8qzsos8Gz7GueA31OYu
- bGAWmqR8FU2joNipIJhT
- bQ8gSIcSFD9nqb31KN5B
- bZ5p5vCNOEMj3q8YEHNP
- bZsjTTt6aYgJZ295OXJ3
- bdCil59PQSmntgbmrZGW
- bh361L2lCX1QAc1bi4Tl
- bsqf0xai18v9WswpEoCN
- btMlnOEk427dpVU4qnfp
- bzbyFHLsFk9oOtV9fwRz
- c5eh5dD5Mom4mRAaFjQ8
- cHiyEvQiZwt4AgcMFPKy
- cVITcKd1F2BZx3t0NnWB
- cd3UtaR2aiTBj0WCDMYj
- cekd05e9TVNLzXvxX6Ao
- cv8x2YE9ckABq7tOrtjy
- d1vq1IpKY0qGtSyAeiQ5
- d73fPkEv8FSg2JZjK1Iy
- dDgM4FAM6oPBTPKEGKhE
- daoOdT7QMJp2wd2tOzuQ
- ddYkBJOjRfwfKfoncnKH
- ddcKDK7Ni6IP18PB4nOj
- dfQpM7q7Xy6EGyxiQvDr
- dhtheoFpFJ1ngHBKLFZR
- dpmm87jP5W4xm3bnGkGK
- dszhBWuUSL6hvfTliIIc
- dwTPdESHRefFCy3yMjBb
- e4GKRSCSu6hzzJb3hB5A
- eCbcoaebNruYFyxl2DPe
- eQFA9OGdxIF87bPB5krq
- ecBf95tmMchbvxeLo4Pv
- ekGTq8z9u843gkUZdogg
- eqwrY4UepvkKFZbGXJxA
- erTnFuxMk8ZbM0ifxP9I
- ewhGkVy3zMPlS9yuwFFE
- f1fK5VIIqx69Blt5eW51
- f2cMGr50JW2Igzs7MOZr
- f9anEab7oRPIZylVFh8W
- fAQvqWKW9IVpMzu4mUle
- fB1a1sZEO3ouFvO4Bvnf
- fFRG6u6EyVUjU7kI0Hbu
- fKnABeFo4GrIVjWOxsso
- fT5XPsSdW1gBolcjfbjw
- fWpgYwEsYcXCX3tPZLog
- fYFTYWbtF35I9NjKNfis
- ffZGwF7C3Ef3M5WD9cGJ
- fpss0GtTZnk2JuobP4B5
- fx8ICC9MHV8iZaMlIWNb
- g04zcItOj1Ja5l0jyVbq
- g3UHjG646GJv1uPd2CpY
- g5BVD24jv4s1ZVIyhBrZ
- g5HRdxUEuh1eJotT6OQ2
- g5Ymqn3sQOvwZTTVuyIO
- g6fLDyURzc7v2UUVeTL3
- gExTR1hrOhU8jMbMCvyK
- gHp2VprWRmHSsLOtj4jV
- gIX8fMWKv4or14gCMRr6
- gKL5fBkXpiB2VLi9YEmz
- gSq3gKBtIYk39qZ0MYh8
- gW7y59hlr0sdnkUldrC6
- gZiDND2dS50tbaPfsokf
- gd44YJcpLYmuq42R5tYn
- gdi2kZRdNsPEQgh1D4Np
- gdvvPD2FiN480hIPk6ev
- gfLKUY7pKKt6FjGBLuAu
- gfyDfDW1zL07vbNhCqY3
- gj6jAo1tFSKsKio0w9yl
- h5uZCz485CjrDIFnElIf
- h9NlMZnBSEEXzQa6ViuC
- hXh8yPD7DWPqM2mqvVqu
- hYGbtcekFxUNlTP88VuK
- hYHHSkFJqnhZ1VRCcYz3
- hkp3pwu2Se9EDQKm75yc
- hohq9pTaPegClDrlg84T
- hq5zLTvhNVmaio0OUu9E
- hxPjcOAHxFPmwie8tAKX
- hztu73jHWwBa75l8MrGG
- i2p1CCv5lcs65z5UyVmo
- i6Y5DIjOfKNCud0WyI2w
- i6cQVjQfvHRZ5gy5Wdq3
- i8XdlxpZIa333q9zu27e
- iCJn3KSg1JcuSDEWmhrU
- iCvSCRve70NRzHwNrhXh
- iaZylf0VN2oWARG9Nxgk
- iqSVrVn0paPt6Oe7Xvk6
- j24IaJvrTIQdGYscAVj7
- j9nP12ZcMoyU9Qq9R1bD
- jRGmrqRvfcoAQvJD0P2i
- jdLCpuizuefInmxW2JAh
- jeCh7Zsm7V4CeBp21XcG
- joKHqPZlSdSy67VWzSQj
- jrsoF51eMvWUiIAyOgPz
- jvUAUtVOtnw62xe2kCOB
- jxGzMUoc8kRDPXzkAwB7
- jxp8ZUarmen89U67rSxP
- k1dK5EqleJkXG9cSbTpV
- k1hrjZJ5vFk2UrKZSs9V
- k2N6laYRmJtMtV51SIJg
- kBrTCTTLIEuhCRvQAibA
- kDWEvAXQtPDQ9y63xj2l
- kDzFcTyHUgzCxj13u75D
- kZ8imVDxH1Sl9vBzHgy5
- kbCW8vzXhNT0FPnOBjOJ
- kdjUjPtj9zFzpj47WWjo
- kfHBnfJbPuVcn5vb7yHd
- kmldo5OG5uXH4jaxxQHr
- kpyEIwppKm57y7cv6P2l
- lAYF2VcaUy1KS2WhprVB
- lE64tA6SyVpbzZsRQ5nV
- lIOuAJi7muQvNffuxuaj
- lK7JTNvfYwswVLZrlEE2
- lVOgVEoSG9jiqY2lrU60
- lj3nKlPWRrqPwSqrUVgb
- lqqLuCHpelJ18K6caeed
- lyykBg3Ep7kcetoYRv2q
- m3idMjU6EZGzHUdZVgS3
- mAuFl4lm3QhglmzYCDPe
- mBQOdjbNLkG6uzbxZVyM
- mEUOx4n63q10KzAGqqGf
- mExXTkDrUZ41LHzVdAjA
- mJLI5Q9pIvpcGK2odvOw
- mNqdeVeRWNuRF9NUsFX5
- mP135lVWkdlpiJQ6G08Q
- mVLyWyfizrQnGhapI4Wz
- nIS2WYGRTx0A74q2Hicq
- nLapmRIrTCFqhXjR7W11
- nMJFgv58Pbht5RHUs1r6
- nSi1xthMtH7VtMc45t5k
- nc5DA89E0InwCAhHk3ya
- ngTtFArvivgLosVUkRut
- nixKCalE9g25GWElhwEk
- nqlVshbsMM89vBguaegZ
- nz6WzGqdbujbYd9DxXjM
- o1gvEMHj6qWA5OvtyKfZ
- o2tu9ex2Bs0OUZPNnsZA
- oAImaEh61LZzKfZcFHAV
- oE0213kWMNKhX6gX7Sdc
- oL2mA8E0qR5SsEBLK8i6
- oTjzKFL8B8uLRxdnuTYD
- oZOcLfuWEfimOGywPaOs
- ouYeIcu3ByZeBDyeYUsB
- p2N0PpHegSIxOxqeTP02
- p7iLaqtp23KO0hSQtIAR
- pTabaLnhl4itxzHtYsCR
- pr7pm8u7D8khv5AX5xsz
- pwfswoVks3cdptJunkiG
- pynS8nYbuglFp9C5CCAe
- q0tS2zyFMOUdvx3iYy98
- q7Vi7mNI0SkPjJarpVg2
- qBHGCyV4gS6wiMCzrYdG
- qJrZAzeHVajkI3iAn4Ok
- qq6VezVKq9a8i9FwG84H
- r7MoJUREhmq45JgLyFql
- rFKfo4Ll87hEQUXk4eKH
- rOh4WUcOT0z5XLIFvrzr
- rULEzipjyg4YRtNuEX6O
- rcFK9VLlFsr0l7ccrolZ
- s1UxtzMYOQBbkZ7Xfjom
- sDC7yEmOpFYsaH2G6WQk
- sInMiHJa9issvWeH1h0S
- sK8HzpEaD4GdQGWLJ5fY
- sKv7ATarz5NlYY0LpwNs
- sVnkafqIj4v0G1flycOJ
- sxrBhAJITDSnDD2Wz3zi
- syeARPebVO3vQA01uuBs
- t0C5wrGVfiwfe9dHSUZM
- t0lf6hRXJqTt61j4iG4R
- t1gXYaFuQ04BcQWOUIzE
- t5zuaDOapOCchHz1JOtK
- t99ZsnRNA3VmprfHmHeQ
- tB3ce4Dr39mBu9BbN0qA
- tDpNxtvu4AATCMd9WADt
- tO6LZAj17K4lqLsph5fj
- tOXQphXCpV5SviYuYFsy
- tVBTI0MhIEtVnjiK8XWG
- tgJIiiQnomoj3NJwjY69
- tlB9GS9C4qk1Ud3PWfzK
- to9rUmrye18I7TCb5vqc
- toJwGvbd16AFI4BuD3Up
- tpSPDU4VoKw1WPSquy2B
- tyxIJDDOOfUBKyJyr1rp
- u3SQ1XcNClrlatkTulW2
- u8MVH73xPERLNag20BZs
- uGK197EYgD54AeHCFJbf
- uHHNFrrQAAl8OfRZnpXJ
- uS7OylKjpaoBqbcN5zIC
- uUGsclEgql4ztASCmFtu
- uap2SWFtibAxsTsHhIXU
- ucOnu5nFeJrezIMMo9ye
- uppkFEl6DvcUdHdRQqb8
- v0f1JMrD9UvpuBndwfuS
- v4aNQJtm3MDzOoIk4Sdp
- vYDb8rLc1UkG0ENqYHjD
- vbw8aFLVReycmT3nJW3t
- vccolXVGg1kE7h60qkz3
- ve54pwf7io11r6SFXRlU
- viP0MNiXD2Qq6XRXoyjq
- vnHS7MC5va2tAMFkE5do
- w0AShqMAHDjwtJS9I9tR
- w1uXIpGUUq025fEWrwPs
- wE9pYmVJSraBlQoCplwI
- wXopN2AMTyvjDr7t5Anr
- wYskLVJ32O2GcXET11OE
- wntfIWlnsmpLuVjnXxRu
- wq8tPtAcQ6PbyaCJ0bW5
- x19pnRlb17mur4U6bG3U
- x7HQuBa3WXrgWzRIJiew
- xCwJpxpMgN8ZcnRy9stU
- xOHWjoLwOoI4Jgz25jWd
- xQ57E4wKeXs9qIUK2MxD
- xl3vOvRtPYWLw3ZjfaqF
- xtBJnwy3Mzks8eVqHCPJ
- xwx2HHFAavLzFjE8dfaB
- xzjs1me7DJ5WibhqOWFn
- y0IZp5yXrhTcvmjZK6DK
- y86dRExxa5RwGUTqLVzw
- yPMuOihYsgdAnZnnCpuy
- yUai7Gk8zel9sfasRn7F
- yYcD3FHqWCSKxMW2nuBc
- yaZUykIdTllYz6c3K8Ea
- ydGrEol5ZrtOBqrOoC87
- ydJ329jvZlbCW9vO3Aus
- ydmmPneY1W2JTxx1s4uE
- yhhPya3DY2LrXrMQGrAw
- ykLPER8pTDWT0QeL02H2
- ytWuhrmRhyIFfFRrCsLV
- ywecDyvlckcGq9MuP0Q2
- yzJqPrdsrRYvKn8lfLjQ
- z050PqifVSO7VgBL1gSW
- z2n5LWjxjPiYr7Vb3p16
- zBwfMOvFx2O1h4AtiNXE
- zFliy1UhVfECM8epOLpp
- zNloNakR7ZOYyLhvMlFC
- zP23e3pIbfPzL3wP7K0g
- zSGcNaZEF8CjnVj9ao1k
- zZuzfDEtUwLKafuRa7R9
- zdoWRbEitGvFuiAybfwo
- zkTMkcdf68gAPayJBReX

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| created_at | string | 585 | 585 | 0 |
| file_name | string | 585 | 585 | 0 |
| file_url | string | 585 | 585 | 0 |
| invoice_uid | null | 585 | 0 | 585 |
| reference_month | string | 585 | 585 | 0 |
| subscriber_uid | null, string | 585 | 9 | 576 |
| type | string | 585 | 585 | 0 |
| user_id | string | 585 | 585 | 0 |

### Colecao: gcredito_invoice_data

- ID da colecao: gcredito_invoice_data
- Quantidade de documentos: 12
- Quantidade de campos unicos: 79

#### Document IDs

- 66aFOd2Bo0Fqe0tleSJ4
- 6JKESASaXuZizsxKhmvg
- Cp6SKmNUO4wmcBgF1DuW
- DbyEU7OSiYamJ5NCsdbL
- GrJEDslHxD6gSYEAiZY1
- Ka2b6zvd5lkPbDcde8Oq
- TyoODAtisBhgJ6j94Wfp
- bzArd6TuJWoVWz5aGVUw
- k9fjt1u9UpRGNMpGZrg4
- m4aSVRYyRTbSuIEmUnz8
- snhO4cVJFxxsNpISMOwR
- yhxfY173kOnLFlczz6BM

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| address | string | 12 | 12 | 0 |
| api_response | map | 12 | 12 | 0 |
| api_response.address | string | 12 | 12 | 0 |
| api_response.calculation | map | 12 | 12 | 0 |
| api_response.calculation.client_tariff_discounted | number | 12 | 12 | 0 |
| api_response.calculation.discount_percent | number | 12 | 12 | 0 |
| api_response.calculation.equatorial_value | number | 12 | 12 | 0 |
| api_response.calculation.goldtech_net_rate | number | 12 | 12 | 0 |
| api_response.calculation.goldtech_value | number | 12 | 12 | 0 |
| api_response.calculation.savings | number | 12 | 12 | 0 |
| api_response.calculation.tarifaCheia | number | 12 | 12 | 0 |
| api_response.calculation.tariff_base | number | 12 | 12 | 0 |
| api_response.calculation.tariff_flag | number | 12 | 12 | 0 |
| api_response.calculation.tariff_full | number | 12 | 12 | 0 |
| api_response.calculation.total_value | number | 12 | 12 | 0 |
| api_response.calculation.utility_fee_rate | number | 12 | 12 | 0 |
| api_response.cnpj_cpf | string | 12 | 12 | 0 |
| api_response.compensated_energy | number | 12 | 12 | 0 |
| api_response.consumer_unit | string | 12 | 12 | 0 |
| api_response.energia_compensada_kwh | number | 12 | 12 | 0 |
| api_response.energia_injetada_kwh | number | 12 | 12 | 0 |
| api_response.expiration_date | string | 12 | 12 | 0 |
| api_response.extra | map | 12 | 12 | 0 |
| api_response.extra.cnpj_cpf | string | 12 | 12 | 0 |
| api_response.extra.fines_interest | number | 12 | 12 | 0 |
| api_response.extra.full_text | string | 12 | 12 | 0 |
| api_response.extra.measured_energy | number | 12 | 12 | 0 |
| api_response.extra.non_compensated_energy | number | 12 | 12 | 0 |
| api_response.extra.public_light | number | 12 | 12 | 0 |
| api_response.extra.specific_fio_b | number | 12 | 12 | 0 |
| api_response.extra.specific_taxes | number | 12 | 12 | 0 |
| api_response.extra.tariff_base | number | 12 | 12 | 0 |
| api_response.extra.tariff_flag | number | 12 | 12 | 0 |
| api_response.faturamento_usina | map | 12 | 12 | 0 |
| api_response.faturamento_usina.energia_compensada_kwh | number | 12 | 12 | 0 |
| api_response.faturamento_usina.valor_credito_bruto_reais | number | 12 | 12 | 0 |
| api_response.faturamento_usina.valor_desconto_cliente_reais | number | 12 | 12 | 0 |
| api_response.faturamento_usina.valor_final_a_faturar_reais | number | 12 | 12 | 0 |
| api_response.injected_energy | number | 12 | 12 | 0 |
| api_response.invoice_consume | number | 12 | 12 | 0 |
| api_response.invoice_value | number | 12 | 12 | 0 |
| api_response.legal_name | string | 12 | 12 | 0 |
| api_response.lines | array | 12 | 12 | 0 |
| api_response.lines[] | empty | 12 | 0 | 0 |
| api_response.measured_energy | number | 12 | 12 | 0 |
| api_response.month_reference | string | 12 | 12 | 0 |
| api_response.month_reference_numeric | string | 12 | 12 | 0 |
| api_response.tarifa_com_tributos | number | 12 | 12 | 0 |
| compensated_energy | number | 12 | 12 | 0 |
| consumer_unit | string | 12 | 12 | 0 |
| created_at | string | 12 | 12 | 0 |
| discount_percentage | number | 12 | 12 | 0 |
| expiration_date | string | 12 | 12 | 0 |
| extra | map | 12 | 12 | 0 |
| extra.applied_discount | number | 12 | 12 | 0 |
| extra.cnpj_cpf | string | 12 | 12 | 0 |
| extra.fines_interest | number | 12 | 12 | 0 |
| extra.full_text | string | 12 | 12 | 0 |
| extra.measured_energy | number | 12 | 12 | 0 |
| extra.non_compensated_energy | number | 12 | 12 | 0 |
| extra.public_light | number | 12 | 12 | 0 |
| extra.specific_fio_b | number | 12 | 12 | 0 |
| extra.specific_taxes | number | 12 | 12 | 0 |
| extra.tariff_base | number | 12 | 12 | 0 |
| extra.tariff_flag | number | 12 | 12 | 0 |
| faturamento_usina | map | 12 | 12 | 0 |
| faturamento_usina.energia_compensada_kwh | number | 12 | 12 | 0 |
| faturamento_usina.valor_credito_bruto_reais | number | 12 | 12 | 0 |
| faturamento_usina.valor_desconto_cliente_reais | number | 12 | 12 | 0 |
| faturamento_usina.valor_final_a_faturar_reais | number | 12 | 12 | 0 |
| historical_lines | array | 12 | 12 | 0 |
| historical_lines[] | empty | 12 | 0 | 0 |
| invoice_value | number | 12 | 12 | 0 |
| legal_name | string | 12 | 12 | 0 |
| lines | array | 12 | 12 | 0 |
| lines[] | empty | 12 | 0 | 0 |
| month_reference | string | 12 | 12 | 0 |
| subscriber_id | string | 12 | 12 | 0 |
| tarifa_com_tributos | number | 12 | 12 | 0 |

### Colecao: gcredito_invoice_fetch_log

- ID da colecao: gcredito_invoice_fetch_log
- Quantidade de documentos: 406
- Quantidade de campos unicos: 6

#### Document IDs

- 00CxvxkPR3FC6rwOHmTo
- 0CLBI8sfIR6XFgL77EsM
- 0DmONSkBrERQ8hm5yPYp
- 0J1oXToDCjzOEYZ9Cytx
- 0OVGLwIr3mM0egrOAo19
- 0SV1e12qLQLpK00zrt80
- 0aOpG1aD4JDSlwai7v2W
- 0j3T9tCZnkh0Zd9oVke4
- 13GIrYb5pZYnlIp8IAKj
- 1Cc3V3O4050ELUpbkCTN
- 1CfU5ahZ85QJB6pyL8Dx
- 1G6YnccSOFmeQhzhdUiU
- 1Id07t0sX5r0u0iRVH4u
- 1L2iuBKDWZcmPTh2dz7f
- 1SH9A6HUJMVBPLwg9njx
- 1fsTHAbzFDSKD1RDW82v
- 1l8MaSk4PbxI0nhVMLo2
- 1lVWi6Aal52iWV9rhNvO
- 2BGvCbPcMqHjrJcJxxdH
- 2BOrKt7olenDtv0uG7u1
- 2G5Cukck19UuVhyJLfK9
- 2Gp0Nnri1y6DdeRvU54Z
- 2LZbsOQOyuSaJ3CJUqjW
- 2Lpo85hDGDY489XloQEU
- 2THE9JLPrSaTgdG3itjJ
- 2whGUGiCX9bKmsPwQfp2
- 2zPVWv6v2VfldWg48SRz
- 3Wu5VvmEGWRhZPTNSUat
- 3aD11pHwEyBGuDyO9Uhd
- 3hAHEFmMx5vv0rQZz5wB
- 3k1D0BlPnD06ldpVhTXV
- 48HUGMxDoEstgVSEHKEn
- 48a6cMkoO0nTpCCz3f5r
- 4CF7BmRabzQhMyIojp7F
- 4D5HJJzn4D9BLJSqBJ7z
- 4eshhIgt2JzU6HXuveOT
- 4fVxV1v1Tw4cbgUpxD53
- 4flfrd1M2wTfmQjuYcwY
- 4qSYWjvfq78cHnBZIkuK
- 4yZ9oKTJD4UjhpvgkrHA
- 59EPG6j27TTmWQg2z7Su
- 5Jr9l0gYXWtWoW4reQES
- 5U3FPjPmw4D6xGsx0luc
- 5ceC7ZjpkhVLkTWtJY9o
- 5nK4HjKjBOE8rgPGiKs8
- 5qOLVI1Q2urorukws4vi
- 6M7kBoWvcvtWHkC3jRz5
- 6hxvXSQfxJWwz8VqtS34
- 6iqxgdGgKHMJvijIFZMm
- 71TUlkrgpbD7l8QlUByG
- 75zQGvkzeoM3rlWgTCEt
- 7ADEBVsEgH2DiK84UuA9
- 7N5vqOpHiodoEOUARk5R
- 7VpUDd7dY9iiVyzUSIZ7
- 7WTJaHd8OUl9yZKairpF
- 7wgLPyRT5NBYXtQy1auj
- 83Ek18GkkiQROcnHr33k
- 87vOAQSgNF9kisfhsDNA
- 8DEvukRH95UvQ0Mgj2uF
- 8GLbaOUCqWcMayYZHtEu
- 8PKixF4Et9Z65xpmbrut
- 937pfeh96fegXH0qabqg
- 9G9cgpGhMXJRF1Ul5tS3
- 9SrXn5A7b9qFXuhyVAsk
- 9ygxYqt2h4XpfJXfGecE
- A8fI8KJ4WCNcjps4cfjO
- AEKOZQR46sxwrhCuEr2V
- ALWaFMe3EWCWcDyn4z7O
- ARNtbg7Be0ff6i8H3sh3
- AU0YdGx66UkvVhSiGUaw
- AnS3zfsfLqqxOHUpUoqW
- ApcgJ5tqisuq82bUUS5l
- AvoG0NVCWeR3A9o7BmNG
- Awp98O5fa4HnKI2fTyCa
- B5qc4glZxIWWbONvvaq1
- B7zCz6uwHo3BuVhl6zmK
- BBpvMQIZp9b032wkPDm2
- BIrBHLWQu3B2YkhUbDQD
- BPmYjMUG51FGIETe52C2
- BeAZlsUgv8YCmtMBfrMO
- BmuOmdlsdu2bn3hX0gki
- BunHDuNBOSem2ieowKOE
- CLGAwEyARk2BiBOlW3MM
- CN4oPv2I2JZiuhlixBCf
- CO42FSvdsUnCTbE1Y4ni
- ChGesWcLsrkUXK4zC88D
- CnKb7IFQJYkA1wkQimu8
- DK9qSZDLWNLpboteZcMt
- DUBWHTCX2P1RFPMehqYU
- EE9bQuVYKcgn1NWY6YsO
- EEIf6YBHpAvkhvudvzIj
- EIYUu2NwDQH9Ljp79JZQ
- EIf8tqfjEoHrWdesIRVN
- ETAcOwEMRQ2Sx4qtzAkN
- ETkM0If8dMjRANLex47G
- EeIHcrw7pISI0HgC5y53
- EhF76lEyUGTsPp4JeabA
- EmHGnLLfXxLZ1oQV8rNB
- Eoiu6fGe2no6oBmLx8Rw
- EpIZ4NPRU0YZ1QhSbsmF
- F6W48wpnKXN3FezJvxIm
- FDMDjKb0DcInvNEMnKZo
- FKJOWayGR58FVv13AmPu
- FLjby28bsg684PZxQLOJ
- FSMJ8hVjBJDpVkLQxoXh
- G5guJstYM6SLEubftKzC
- G9ofNZ4EZr8OvBNpaLxj
- GMrOn8A4ovG1OBGA3Nsb
- GYNx4avclJ7rkMkcUDHP
- GZIrDNTRXSSdYPnVWiY6
- Gfb4hjUvZFp61YlIogPS
- Gh4fz23azPTEf39vFVks
- GqdU5NmEp7cwh1d8AZPO
- GrJJyqvngGdMTDYomxnx
- Gzqvm39UoYRAtIeDhWGJ
- H5xHcseI4g0IJdnj6X84
- Hhxbpw4afxQ4fXjec5Qb
- HtVApWWwSYf67GnGhwpB
- I0M9gFrNPHFoElijaksT
- IX8YT7nIlV2B4XDGLRNX
- J4o2D2WiMbV4THrCORwQ
- J9cYtpuWpDei2B3ooaBU
- JAX1HxPg1lf0sEwYc569
- JIMyE4c9C0qz0WLLSWzp
- JLZBI8shYp6HTwbi82jb
- JPYCriw0uEcwILbUxYbt
- JTHSEygPNmXRguaKJjT7
- JTrJzaFBF2UDrJkaKLMa
- Jq5V9Bue3KD9eGGYSri9
- KAdb3qvtSQgxjxUj8uFm
- KBW7mY3kK5Z6SHAk1J6R
- KLKkSNxq0XDr9UHhtPP6
- KPEqvHcBhLkhY4u0iUGX
- KV2EX7XfavPQaYFdmMDd
- KY9XFTrzNBLF6oq8DMtf
- KsDDbBclXCpT0D9BLYm7
- KwLHUL8SBtx0cAYCHds6
- L0bNl1CS11p9iAK8Ytdk
- LC13FJfWJqHGV5Pj1XBm
- LIEcoC7IkUXPJTIGEJGr
- LRrdZPeaDjBDzdVdtU8v
- LUzFi0E5HwWKBqmHHq63
- LYjVHr9LbelliJXkA55P
- LpRNES58cqF5V3uTCJfA
- LzzfOsQOL6bNYp6UdL1V
- M4hbQjaE0AGnlmy0oq3C
- M9Wk9cYAINOyIUxx1PWW
- MFMZJSGcN6dLKmbok0NO
- MH8t4gL2vgPKEM5EtUNi
- MWrxQn6GPnLd6aFQpqxF
- Mmr8h2ieL8qN1INPrkjf
- Mo6lmYOB2hFKyOYlnH7B
- Mq81PddsZen39kxW3cqd
- NXUKVz7QzfnNnUQNOGP5
- NcXOIttxZr6DwYjFXpdu
- Ncx6KutoeYW8F1LtXWIx
- NwfXA7LFhTBrA9cVpPEP
- O6eSIbjfGJJYSHSl7sMM
- OBUV4Irwf3EdRC6tbQhE
- OD28HFO4N3gbZBnOKsmX
- OGdpKVZKUHhbFWKKsBk0
- OSWfx8YhoW372zRcDTJl
- OeFxSzaTQ7vG1nXKVREM
- OmHgaGu6YeUJDdIuEAbN
- OmoiVxKiP5ryDxrq1lEl
- OwHHhgUI0YjV1nRJp0Lc
- P8aFgax8rBNN0ly2J2oq
- PCvIJTdA7d8PbDMmiLn6
- PGTbmHnyeaV20d1ZcujT
- Pj6MrT4A2JlXfsyUt3V6
- Pjz0DAYcQv86GIcEOsHG
- PyNMoMaVTEgX5525pk59
- Q7FoqBG0y5uW52ukCzuB
- Q91OLPJg2pvyFN0l8dfs
- QGOHOYINvaxz8RbdFPTX
- QUU6daxDEV5tBTCMCy1O
- QWyS4aE32nOikz5sk2xH
- QibiaGpFLMVOkn1ePRuI
- Qpq88OvmdHany18mV85F
- RDgTN9H3l4wjqMdYk8yy
- RIHkrVhZ8NbsXuo03qSo
- RJ2N67MnxPNdy2R0Az0f
- RQ861bjIX6G0bmAgOYDY
- RVZDkcD9wbvpUEaNPawy
- RsQfcUmlGZEo4NlmPd2L
- RuflImWnA2MPtGxMTLl9
- RyGIViNYR8c0s9tWCYQC
- S6et7OFcSUD5QPrjYpEj
- S6pZAVUWzm4wqbh4wk2b
- SEdW1OHJw7ecsVZv1eYd
- SIPkoLrLv2oXKSUu9viX
- SMw2RViFOIqT7awfzRhB
- SQE4a87qGhpdbE49Wrbw
- Sw7TfYXKd6mER4ZA7qVo
- T47yqUxL2QvC8d8axBV6
- TS2lgEnHKlaAMLNPhZ5N
- TTqCxFt0w27yT0SIaWts
- TaBlJiYc5Js2k9hA5ood
- Td6E3OBUVNcEnedZEbR7
- TlNFAjYSBim7eqVUuCn5
- U0hQif79RNv6C1AWXell
- U1miV6aYcWldHgAX0qff
- U24Ty6IXrOJXYzW3RwuS
- U8Ww74IZNQQOujKp4CZv
- UIgi2VEbeM6qtSSfXG4p
- UXw9V7XQLqAZVyQ0vjzo
- UahrYeu77cPEgeiL5Hgm
- UglExHkmvUcTHoz2q5XC
- UyQzExGXfPnI8PqSJd9f
- VOyQAD0XFcnetd2UZOIt
- VboBlflv9QFVpHq6PM7W
- VhAwvHFrKylRCCwx115V
- VmHq8Isy64Uj1iPydQz1
- VoX8K2JFdBlXOA3nts0U
- WArfAgpQrNbLJIclVfq5
- WAvcJ4zwEw48TNNl7XsD
- WHqgUWEv5ElGANa7r3vl
- WUMc7NsPbwfpjOQwAeNd
- WVpYdkisYyba0Cdgdxbx
- WgQiDbfkUCu3nOikBO8G
- WkoMxsIlIZbB80HEskNu
- WrJteHsGd1yVXHAuo44E
- X3GyxFxhEbrzVuPrXQF0
- X4Anq5fATx460egDu3OI
- X6CQ87XBSEGCMnMOHEmf
- X79yap6dKi0ovvL765Ck
- X91sKet5fPf0uZDwKuRJ
- XCaF7FVhNoErntRC5VyQ
- XPh0nGdJxh0Y0dAvxsEY
- XkkRmM66VyY4T3IAdTPY
- Xu6xAeZmhAWaHmd24g8U
- Y1JsS272ZcZRYi1eRYU7
- YNFbCP7cyFXtLzG8dyP2
- YSqS5OEi1tfXpmJqVrMN
- YUXfqU7mCWljRNA2kx1W
- YViLexfqdrSasyYlXCuv
- YbDFqhjrpaRkG0EFp49V
- YdehtBjTvgR0Q68TVv6e
- YxLDu7tyKKJJ9Z83e7nd
- YzJkTZ4kRTQH4REmaIyq
- Z99M6DDzFZbMlSP5xUE9
- ZPFIY04Z9iLaVkzC1U3M
- ZWpez9hE9YZ0vd8ZIH7M
- ZjEat11SnNNp0Ws5Zc1h
- Zll6RJFaSFTJ0DNoUgfg
- ZsvRYQhOEZrMNuXWjES2
- ZwFEHPSJvGj2uLqh4hMb
- a4aVGrpOeuCkbJQQvsce
- aOmFUyHydtFQs6jKcQ8t
- aZKKHg2Ydu56BdNuUiMo
- aZrh8YosVnPyPY2XqpHN
- bCtfVXaKQTezqUTInUFX
- bKBDDEo9AgeVhY2scoxN
- bPdPkmIf5giddt4CLaGl
- bXWykTsH1smxYP0ix10B
- bkGJMmeRrc8NPJKeLv3n
- blAJuwHPDHW0Z7GeYoUv
- bnGKUMI3lzlQm3oD9Y1M
- bt6EewP9N6ZQDZhhjkm2
- buBtB9l13osPepFMul9I
- c3i3ST6C1lHRR64hubWy
- cW6qp7eaRQlyEjW9ZSr7
- d2LtWdkn818H8rS4yvJX
- d8w3XhDtNHnQb1IhfwrT
- dDQIT2ksUyaV4RQKZUtS
- diob1OhgByaae9bAfwSQ
- djI4Ar4jx6Bx8HlOjU8Z
- dsfmzwWl4C9auonoGnKN
- eNpMtUl1cUcwNthLhpVX
- eQbpQv3uRiwR3dtXsjC9
- eRNmuUFW3CIoWaQ8nRX7
- eWLZWNePt2mOoZrOCyR9
- elAvDBwFk9hBZYT004F3
- euiz91MhL4w9JbAdr8N2
- fB3aoV0fpJj66WQuDFp3
- fCDwPNx4xXHNmODa03ke
- fUkWxOKwn2yYtMSuAmq6
- fXvRGqswqDwCuGGdipyf
- ffnENBq6zbaayTvQTA2L
- fuNj1UOH3FFURvMFSsq2
- gf9mUD2K2sJlHdrSya1N
- gi3okW8nPIDHYmbGmqZr
- gt7DAIWVmGJcvwNw5epi
- h9Stxq5LlFHjY715H3mn
- hDz7geTavCHoYrdC2oiJ
- hPDqjjOS6GpvDb5INbua
- hXYfJPUc51Rx16fK1nJy
- haaLBO12Glyfl70WtPzC
- hcc6eCnCZokBVn5p1pUX
- hcdgfkXx4m7LLoSakNfk
- hfwhqFX8I8vF3J7kFQAa
- hj8X8ZbR4O6OtsYVpDVn
- hkrsmR4h3xO7c7NX5MI3
- hkuIRaDd8UsH4k4NQ9QB
- hp2x8N7u6tRqrFgR5e73
- hyor4w4Z9PGzaGBzDzl9
- i7AkmaQyjHIQ5VgNHEJ4
- iQvOlj6h2n1wtABAKKys
- iRxCGYErdGaY3upu0OUA
- igjiwnUYGKzgpAYp0sbv
- ilf93SdpsM9jHWHlqyu7
- irZsJqZVReu9jqnTqSJa
- irpt6KZe4HGeHTJvJDbZ
- j154fHxveYhB0qIlCSkK
- jMpOmBIXpVrxuxknYavn
- je5qc9JK3Z9jYHgda8wj
- jieDImoYL8q1dnzRDZlx
- jpduM0SJAahew95vly4m
- jswZ5pzkaP6V5wU4jclU
- k0KbaxwwgEPybC6cFHm0
- k0oT9vJqpzo9LxRbHOqK
- k31wq0ulh5JTbFMlsBai
- k3c8n9GbPWaDvlFAAYof
- kDZiRL0ktLs0mFRQi3zj
- kaHyC0pwQebZmc9j5BC2
- kcWBmBlR4ys7E7H8jAWP
- lOJyR38WvulyqKtYkL2Q
- ln33Gxv6Okd9wruaAnfr
- lrbRRPKZ0hWPdi3PyEVC
- ltkQZggb4TlubhTJPUiz
- lz3FS1QtgCwRrsNTe7Sb
- mTuRm1SQtrAO7m5LOXuS
- mWwTNIy5xjqifNaaFzBm
- maDnObbD08CfKcF44RSE
- mgezxc2xehSIqGDLvmhy
- mxIpfODn8WtyTSxyAIBp
- n641x0vNu35spirR1WVE
- nFLm0ElteIkGo19CDH9x
- nLIZDLXU9l3joDb2Pw6r
- nQ04XIPJwgsNHaJrIjec
- nTpty1ZZsij1SbyDHI3Y
- nbBM7OohszOqgQtrFLTD
- ntE9E2wEz5n7yFGoGuHt
- nvuCb2VEKtX7LtGlMzMH
- o0ibceBoNwEJUtfkuacE
- oRXphvaCHL3QaDa0WLsn
- oSAbhknff0pR7IO52rF9
- oiFOea6HXtsJYj7bM4BB
- okyOjNDYUzAex4zwRW3M
- oqZlo75EImExw2uAtifw
- p6EPcVNjMkUpIOiGJSGx
- pFu1QZJFnNLUwGC95oFC
- pUFAdPlywbyFbLTPV0hM
- pWLtplP7W2VJYqbiIDFf
- prImkkgjvgrRfwNkCdBN
- pxycSsruoEsiOoXr17gP
- qCzwnYRSPG5XZfjpliRn
- qYeYunlxXQWsIkcpTuXi
- qe5tstIcopnwH9HCo7AT
- qmbiYMiXmn75EwlKvIkm
- qqAZlzKnlMnLb9Ofvfcl
- r9HITjEuRPW1rWnx5ZNe
- rAe80fCDzep83zYDS50p
- rESgABEyB623rkccZImp
- rFeTQD49kcQAe6UOhKoY
- rHfLRlt8zo20H2W9gxPE
- rY04ya2aMM5B7WrT4R8e
- rY2exWvqwk7uU4GIkyRb
- rsgfwuhtt9JVTQoma5M3
- rytGpkUxIfQJml4eG5FC
- s2fYj9OWVaFV9HcC8w4Z
- sBBtHKaa3lYNTPAUoqMv
- sZEKGmupuOrQw5Dppytp
- sgwuNfOVp9fzFSXgZ96A
- sz8S91Lb22E1oMZjHzkx
- szQcocKsU1yynjyF70yP
- t2INYLaRZGUOpsEHbZ5K
- tBawgS53xcLZjvHTqqkm
- tGOYI9etoyeRMoO9KDCX
- tM2LsmJFUdTf7HfCo22W
- tecFqqAw3eXs3DzNWhCO
- tkjeGwj1NzyRrbhjtVKa
- u6N4gtjTQKWfOoXe2YdA
- u95jQ0BY1sRSc4Ivejpb
- uBzUyx2fYjSAesx3eD48
- uGQsXJX5F380xcUcUdHa
- uXAz8tQ2rY9tt59I181T
- ueOtE3MfL1ontPQGmHwj
- unwcbM8CH2xlmwIJPMmb
- uucyTajplyjPSg3mK6RA
- v9RKmF6iOqYuhyTNqWOB
- vHLMJonuVzj7Am8ysPwJ
- vXCHp04s5zO1cItn1NQf
- wAHixygaFYuQOMf24HEM
- wVrCBXu6UAlcnxMgS3Td
- wsrVRt1up2nssQt6bIw1
- wwiesgMZ3krTH7E7XRYp
- x4ZUs0zMlnO0ECPX4eF6
- x776Lp6hGleaCLyCMHpa
- xIREYKTFq8mhchlznoLw
- xR2mLY6kA1ou7I3e1zlK
- xTK4FP1EhHcTlyzgfX8B
- xUpSwtPoYaksBpt5YlIZ
- xVUi5vrR2SLFFNYmlzXZ
- xnlKfVYOEUFWngiaVjk5
- xv5rPifp7Iskv1nu1FZz
- y9YGiP0pGdLwVvFh8fux
- yNQEVQvF4zckrTyv8KVd
- yVBi8WYKJHVjsK8RpVqg
- ypsg2hWpngAPP3y7j0Fg
- ywBICffz1XhDd1e3gyZR
- yxEK7ThwNIYdFA5RKIrp
- zA19sugJjfp60HETPQdl
- zNxloT66eykbyultvGij
- zelfsQ2AX31hXO2oJWgJ
- zkDWXvlxoLnFP98jt0KQ

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| created_at | string | 406 | 406 | 0 |
| error_message | string | 406 | 406 | 0 |
| month | string | 406 | 406 | 0 |
| status | string | 406 | 406 | 0 |
| subscriber_id | string | 406 | 406 | 0 |
| uc | string | 406 | 406 | 0 |

### Colecao: gcredito_subscriber_fetch_status

- ID da colecao: gcredito_subscriber_fetch_status
- Quantidade de documentos: 43
- Quantidade de campos unicos: 10

#### Document IDs

- 1ndqq1SLdRJjvGK5q6kn
- 3Upw6OLkoxe8qGibsYoU
- 3ypcbaXak17w0q7JEOwk
- 44t3sVPzvRXRKO2y5qu6
- 5BTcNSNipsqUU4BjzWBR
- 5Lr5aZpKnLE2HOEpUooP
- 8dlUOHzlmkaF8pWeOu67
- 8om9SWZWuzw9jnuntmB6
- 9Ll9dWibCZ5cwLtk06DE
- AYYJ45anWp9SjzcUsyDN
- BfaFtMfn4pdlEtHy30WU
- CiS7jPJln8cAZlTRZzcA
- DEDlhGFUcTA8nWuAmzNX
- ELr8OQVNIRcejod6EHPU
- FHewRWfuCYanZmR6q4wA
- FVdAUwniZ0ocE8HCcjhi
- HZOunm5dhBrcvdmAs78D
- ImzxGIAd23viWzCGPA6w
- JB9tldrZk8LiUHu4IkRH
- JMJfexuN54VmW8U9HDjC
- Nnxubqx1iMBG1RGEd1Xo
- OErA6Fx8Ozrxz0ciqiBr
- Q7HSG5ZeRKF673UKQPLH
- SUMz8S31QS33ZYemFBYM
- T3nOYzB7Iq3xMOabBBJC
- TGh7pUbLpkumXitYS4AU
- U0AENbOlXR3waSi81iEY
- UGS4vbb2max71vxY9E9s
- VCmQgERfKNIxa4e02kus
- XlMy76sfZ1QhOEZ0BEKg
- YZmDtvbbwDU7Wy25g9nn
- adbkjCYa8nx3b5STkbrE
- c0cczkJi8v1WR04KWbyl
- drpnmmnnZfo5fc6tqnu8
- g5ENymqCq8PfgCBoowCF
- groe0fk4DFLrPVZ3BEom
- izjOLv0sIoy6kPpsATWb
- nkHj0JdotXHRZFvKGSQx
- pLcLMwW0Zc04XO7Q06hZ
- qKfiHW8g31nU8RGsIzmK
- qnSZoS0sda9hKU4CZc2j
- u4YR0FBvW2V9YBtAT1Es
- zwDdWGs3OVqOeg84fVGW

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| attempt_count | number | 43 | 43 | 0 |
| created_at | timestamp | 43 | 43 | 0 |
| last_attempt_date | null, timestamp | 43 | 5 | 38 |
| last_attempt_status | string | 43 | 43 | 0 |
| last_error_message | null, string | 43 | 2 | 41 |
| last_success_date | null, timestamp | 43 | 10 | 33 |
| next_retry_date | timestamp | 43 | 43 | 0 |
| subscriber_id | string | 43 | 43 | 0 |
| uc | string | 43 | 43 | 0 |
| updated_at | timestamp | 43 | 43 | 0 |

### Colecao: gcredito_subscribers

- ID da colecao: gcredito_subscribers
- Quantidade de documentos: 104
- Quantidade de campos unicos: 155

#### Document IDs

- 1ndqq1SLdRJjvGK5q6kn
- 2ohsffcM16WJgvKURL4L
- 2u6mdWQ6z2O32WrgGtID
- 3Upw6OLkoxe8qGibsYoU
- 3zX2nd7LRHWtXHsVshZd
- 44t3sVPzvRXRKO2y5qu6
- 4qO5DDNgsDaTJdM7qhDK
- 5BTcNSNipsqUU4BjzWBR
- 5KqrT5Iw70iECBHM0wMu
- 5Lr5aZpKnLE2HOEpUooP
- 5ympmkd8SmwKq4NYMRXt
- 6SvcwalLrE0xWNob7aIr
- 6X4aqxbCq2chqn5mDacT
- 7KT0InRz7WByQMOlLQca
- 86x8GNWYwCQ6mreQvT7y
- 8D2Xt3n5noL3Z4UZYIYR
- 8UgQqPmdrmAmkECy4bdR
- 8dlUOHzlmkaF8pWeOu67
- 8om9SWZWuzw9jnuntmB6
- 9Ll9dWibCZ5cwLtk06DE
- 9UWCTMvhxNmcot3gkru0
- AYYJ45anWp9SjzcUsyDN
- BSaztTjwe4SsZqZvGBdp
- BfaFtMfn4pdlEtHy30WU
- DCPcj1V6y26GVWPYafBC
- DEDlhGFUcTA8nWuAmzNX
- ELr8OQVNIRcejod6EHPU
- FHewRWfuCYanZmR6q4wA
- FNI3juDHcOHhVw8VF8wb
- FVdAUwniZ0ocE8HCcjhi
- GSjdlzlKzV80s1HcVjqn
- HZOunm5dhBrcvdmAs78D
- HwKWCbvIQAnU8ZSGbMae
- ImzxGIAd23viWzCGPA6w
- IxIHZzliKBozeMtL6Lzj
- JB9tldrZk8LiUHu4IkRH
- JCfADuPFvISBcCnCMrjX
- JMJfexuN54VmW8U9HDjC
- JPXThuDSQ7vknj4NRdKN
- JUpKdnH4iAOueCd5lMRC
- MyT62F9LYbevqyFDAz3V
- NBFci1Xx3TnTV0JWX7xv
- Nnxubqx1iMBG1RGEd1Xo
- OErA6Fx8Ozrxz0ciqiBr
- Q7HSG5ZeRKF673UKQPLH
- QnviVJoQH2bbj16OWxhe
- Qoa1KJTbjmObIq4DXfMW
- R7EQ99NS3rdmT95WOW9Z
- SUMz8S31QS33ZYemFBYM
- T3nOYzB7Iq3xMOabBBJC
- TGh7pUbLpkumXitYS4AU
- U0AENbOlXR3waSi81iEY
- UGS4vbb2max71vxY9E9s
- VCmQgERfKNIxa4e02kus
- X23ZxQ3FjJukVjVe2Age
- X4qyBtYojzTxHgYvN5mM
- YZmDtvbbwDU7Wy25g9nn
- ZZrTDEz9bzkX2LqmbdFe
- aIrIjpaQ3KtYMA4ovakm
- adbkjCYa8nx3b5STkbrE
- c0cczkJi8v1WR04KWbyl
- c3JvPGVCxDRYjw7JBZSC
- cSNCZjP7Wx0uB223yeFR
- dALwxsio6EC8mVzdi42h
- drpnmmnnZfo5fc6tqnu8
- eAD6K0x8kVECRlYVffwk
- eQt7kNWSOfg0n2ygDygo
- fTMSmPjZLR9rLTI44A9X
- g5ENymqCq8PfgCBoowCF
- groe0fk4DFLrPVZ3BEom
- h1GVIpma5gIhdlwW0IsA
- iBKUEF6RdyiKN0zwPt8K
- iRgatpT2AJx0bxlZkHTX
- izjOLv0sIoy6kPpsATWb
- kLUilQ1e2CDrYvaAmS7D
- llik29UvPSmAZoO5RBtW
- lqYU3GGfWdZZlJaX0GYV
- n331wOx5hIwZDnvDcJaV
- n8A2wHOipP18YsyZFo22
- nkHj0JdotXHRZFvKGSQx
- nnzoT3jtDuVLfiQCDypA
- o5o1tqGySSghXi8pPETt
- o7DKtuYP0ipIXNZrRyE3
- p8qFDTnm6uV4mBzRppvE
- pLcLMwW0Zc04XO7Q06hZ
- pUcz05UxuP5oBryLuMNW
- qKfiHW8g31nU8RGsIzmK
- qnSZoS0sda9hKU4CZc2j
- rsgEJz1Y1kFCtjlk8s20
- s7KmEWyHzhkW1Txlhubv
- sALdaUKH7uhiBErS7KE2
- seSjMnObkuCtPzbPlL96
- sneiN56TaQwHIltihD8y
- snyvRUEuZI1QcdqzotzX
- t8dEzYZTL4shR0fvwnVH
- tE6tNRUZhLAGhYKERoBb
- tgyKcpEQ0ot5U6aKygcc
- u4YR0FBvW2V9YBtAT1Es
- uShhUQ4oQmtjJOjQWHoS
- vmlXERixJvkCBBwyBjgQ
- xGGrvFEutZzmfYg9pbyS
- zkVgEwZkolMb7rEBD9rM
- zwDdWGs3OVqOeg84fVGW
- zy1OyJ0MBF0Hof1e2ZNQ

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| administrator | map, null | 104 | 96 | 8 |
| administrator.address | map | 96 | 96 | 0 |
| administrator.address.cep | string | 96 | 96 | 0 |
| administrator.address.city | string | 96 | 96 | 0 |
| administrator.address.complement | string | 96 | 96 | 0 |
| administrator.address.neighborhood | string | 96 | 96 | 0 |
| administrator.address.number | string | 96 | 96 | 0 |
| administrator.address.state | string | 96 | 96 | 0 |
| administrator.address.street | string | 96 | 96 | 0 |
| administrator.birthDate | string | 96 | 96 | 0 |
| administrator.cpf | string | 96 | 96 | 0 |
| administrator.email | string | 96 | 96 | 0 |
| administrator.fullName | string | 96 | 96 | 0 |
| administrator.maritalStatus | string | 62 | 62 | 0 |
| administrator.phone | string | 96 | 96 | 0 |
| administrator.profession | string | 62 | 62 | 0 |
| attachments | map | 70 | 70 | 0 |
| attachments.bill | map | 51 | 51 | 0 |
| attachments.bill.downloadUrl | string | 51 | 51 | 0 |
| attachments.bill.name | string | 51 | 51 | 0 |
| attachments.bill.path | string | 51 | 51 | 0 |
| attachments.cnh | map | 24 | 24 | 0 |
| attachments.cnh.downloadUrl | string | 24 | 24 | 0 |
| attachments.cnh.name | string | 24 | 24 | 0 |
| attachments.cnh.path | string | 24 | 24 | 0 |
| attachments.companyContract | map | 7 | 7 | 0 |
| attachments.companyContract.downloadUrl | string | 7 | 7 | 0 |
| attachments.companyContract.name | string | 7 | 7 | 0 |
| attachments.companyContract.path | string | 7 | 7 | 0 |
| attachments.contract | map | 3 | 3 | 0 |
| attachments.contract.downloadUrl | string | 3 | 3 | 0 |
| attachments.contract.name | string | 3 | 3 | 0 |
| attachments.contract.path | string | 3 | 3 | 0 |
| attachments.procuration | map | 13 | 13 | 0 |
| attachments.procuration.downloadUrl | string | 13 | 13 | 0 |
| attachments.procuration.name | string | 13 | 13 | 0 |
| attachments.procuration.path | string | 13 | 13 | 0 |
| concessionaria | string | 104 | 104 | 0 |
| created_at | string | 104 | 104 | 0 |
| discount_ranges | array, null | 70 | 62 | 8 |
| discount_ranges[] | empty, map | 62 | 10 | 0 |
| discount_ranges[].discounts | map | 10 | 10 | 0 |
| discount_ranges[].discounts.none | number | 10 | 10 | 0 |
| discount_ranges[].discounts.oneYear | number | 10 | 10 | 0 |
| discount_ranges[].discounts.twoYears | number | 10 | 10 | 0 |
| discount_ranges[].max | number | 10 | 10 | 0 |
| discount_ranges[].min | number | 10 | 10 | 0 |
| discount_ranges[].range | string | 10 | 10 | 0 |
| energy_account | map | 104 | 104 | 0 |
| energy_account.address | map | 104 | 104 | 0 |
| energy_account.address.cep | string | 104 | 104 | 0 |
| energy_account.address.city | string | 104 | 104 | 0 |
| energy_account.address.complement | string | 104 | 104 | 0 |
| energy_account.address.neighborhood | string | 104 | 104 | 0 |
| energy_account.address.number | string | 104 | 104 | 0 |
| energy_account.address.state | string | 104 | 104 | 0 |
| energy_account.address.street | string | 104 | 104 | 0 |
| energy_account.birthDate | string | 104 | 104 | 0 |
| energy_account.cpfCnpj | string | 104 | 104 | 0 |
| energy_account.holderName | string | 104 | 104 | 0 |
| energy_account.holderType | string | 104 | 104 | 0 |
| energy_account.partnerNumber | string | 104 | 104 | 0 |
| energy_account.uc | string | 104 | 104 | 0 |
| invoice_fetch_error | null | 103 | 0 | 103 |
| invoice_fetch_status | string | 103 | 103 | 0 |
| last_error_code | string | 7 | 7 | 0 |
| last_error_message | string | 7 | 7 | 0 |
| last_invoice_check | string | 41 | 41 | 0 |
| last_invoice_fetch_attempt | null, string | 103 | 87 | 16 |
| last_invoice_fetch_status | string | 1 | 1 | 0 |
| last_invoice_month | null, string | 103 | 41 | 62 |
| last_invoice_pdf | null, string | 96 | 1 | 95 |
| last_invoice_status | null | 94 | 0 | 94 |
| manager_percentage | number | 104 | 104 | 0 |
| next_invoice_check | null | 94 | 0 | 94 |
| next_retry_at | string | 7 | 7 | 0 |
| notifications | map | 104 | 104 | 0 |
| notifications.email | map | 65 | 65 | 0 |
| notifications.email.afterThirtyDays | boolean | 64 | 64 | 0 |
| notifications.email.changeValueOrDate | boolean | 64 | 64 | 0 |
| notifications.email.createCharge | boolean | 64 | 64 | 0 |
| notifications.email.fifteenDaysAfter | boolean | 64 | 64 | 0 |
| notifications.email.fiveDaysAfter | boolean | 64 | 64 | 0 |
| notifications.email.oneDayAfter | boolean | 64 | 64 | 0 |
| notifications.email.oneDayBefore | boolean | 65 | 65 | 0 |
| notifications.email.onVencimentoDay | boolean | 64 | 64 | 0 |
| notifications.email.sevenDaysAfter | boolean | 64 | 64 | 0 |
| notifications.email.thirtyDaysAfter | boolean | 64 | 64 | 0 |
| notifications.email.threeDaysAfter | boolean | 64 | 64 | 0 |
| notifications.email.twentyDaysAfter | boolean | 64 | 64 | 0 |
| notifications.email.twentyFiveDaysAfter | boolean | 64 | 64 | 0 |
| notifications.whatsapp | map | 104 | 104 | 0 |
| notifications.whatsapp.afterThirtyDays | boolean | 104 | 104 | 0 |
| notifications.whatsapp.changeValueOrDate | boolean | 104 | 104 | 0 |
| notifications.whatsapp.createCharge | boolean | 104 | 104 | 0 |
| notifications.whatsapp.fifteenDaysAfter | boolean | 104 | 104 | 0 |
| notifications.whatsapp.fiveDaysAfter | boolean | 104 | 104 | 0 |
| notifications.whatsapp.oneDayAfter | boolean | 104 | 104 | 0 |
| notifications.whatsapp.oneDayBefore | boolean | 104 | 104 | 0 |
| notifications.whatsapp.onVencimentoDay | boolean | 104 | 104 | 0 |
| notifications.whatsapp.paymentReceived | boolean | 104 | 104 | 0 |
| notifications.whatsapp.sendInvoices | boolean | 104 | 104 | 0 |
| notifications.whatsapp.sevenDaysAfter | boolean | 104 | 104 | 0 |
| notifications.whatsapp.thirtyDaysAfter | boolean | 104 | 104 | 0 |
| notifications.whatsapp.threeDaysAfter | boolean | 104 | 104 | 0 |
| notifications.whatsapp.twentyDaysAfter | boolean | 104 | 104 | 0 |
| notifications.whatsapp.twentyFiveDaysAfter | boolean | 104 | 104 | 0 |
| plan_contract | map | 104 | 104 | 0 |
| plan_contract.adhesionDate | string | 104 | 104 | 0 |
| plan_contract.compensationMode | string | 104 | 104 | 0 |
| plan_contract.contractedKwh | number | 104 | 104 | 0 |
| plan_contract.discountPercentage | number | 104 | 104 | 0 |
| plan_contract.informedKwh | number | 70 | 70 | 0 |
| plan_contract.loyalty | string | 104 | 104 | 0 |
| plan_contract.selectedPlan | string | 70 | 70 | 0 |
| plan_details | map | 104 | 104 | 0 |
| plan_details.addDistributorValue | boolean | 104 | 104 | 0 |
| plan_details.adhesionDate | string | 104 | 104 | 0 |
| plan_details.compensationMode | string | 104 | 104 | 0 |
| plan_details.contractedKwh | number | 104 | 104 | 0 |
| plan_details.discountPercentage | number | 104 | 104 | 0 |
| plan_details.exemptFromPayment | boolean | 104 | 104 | 0 |
| plan_details.informedKwh | number | 70 | 70 | 0 |
| plan_details.loyalty | string | 104 | 104 | 0 |
| plan_details.paysPisAndCofins | boolean | 104 | 104 | 0 |
| plan_details.paysWireB | boolean | 104 | 104 | 0 |
| plan_details.selectedPlan | string | 70 | 70 | 0 |
| retry_count | number | 7 | 7 | 0 |
| status | string | 104 | 104 | 0 |
| subscriber | map | 104 | 104 | 0 |
| subscriber.address | map | 104 | 104 | 0 |
| subscriber.address.cep | string | 104 | 104 | 0 |
| subscriber.address.city | string | 104 | 104 | 0 |
| subscriber.address.complement | string | 104 | 104 | 0 |
| subscriber.address.neighborhood | string | 104 | 104 | 0 |
| subscriber.address.number | string | 104 | 104 | 0 |
| subscriber.address.state | string | 104 | 104 | 0 |
| subscriber.address.street | string | 104 | 104 | 0 |
| subscriber.birthDate | string | 88 | 88 | 0 |
| subscriber.cnpj | string | 16 | 16 | 0 |
| subscriber.companyName | string | 16 | 16 | 0 |
| subscriber.contacts | array, map | 104 | 104 | 0 |
| subscriber.contacts[] | empty | 34 | 0 | 0 |
| subscriber.cpf | string | 88 | 88 | 0 |
| subscriber.email | string | 104 | 104 | 0 |
| subscriber.fantasyName | string | 16 | 16 | 0 |
| subscriber.fullName | string | 88 | 88 | 0 |
| subscriber.maritalStatus | string | 88 | 88 | 0 |
| subscriber.observations | string | 62 | 62 | 0 |
| subscriber.partnerNumber | string | 104 | 104 | 0 |
| subscriber.phone | string | 104 | 104 | 0 |
| subscriber.profession | string | 60 | 60 | 0 |
| tenantId | string | 104 | 104 | 0 |
| updated_at | string | 104 | 104 | 0 |
| user_id | string | 104 | 104 | 0 |

### Colecao: gcredito_tenants

- ID da colecao: gcredito_tenants
- Quantidade de documentos: 4
- Quantidade de campos unicos: 7

#### Document IDs

- 972TYkST7ua99M1NcIEJjcRAmaB3
- BgR0965BWTdrqEIBFGBUwd7iOas2
- MQ6CvSWnASQCcEX1EIoGf1tdGf03
- mqHpil0qsUUMcqwButJhZzSrodq2

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| createdAt | string | 4 | 4 | 0 |
| email | string | 1 | 1 | 0 |
| id | string | 4 | 4 | 0 |
| name | string | 4 | 4 | 0 |
| ownerUid | string | 4 | 4 | 0 |
| tenantId | string | 2 | 2 | 0 |
| updatedAt | string | 1 | 1 | 0 |

### Colecao: gcredito_whatsapp_instances

- ID da colecao: gcredito_whatsapp_instances
- Quantidade de documentos: 3
- Quantidade de campos unicos: 5

#### Document IDs

- 972TYkST7ua99M1NcIEJjcRAmaB3
- BgR0965BWTdrqEIBFGBUwd7iOas2
- codex-verify-001

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| created_at | string | 3 | 3 | 0 |
| evolution_instance_name | string | 3 | 3 | 0 |
| updated_at | string | 3 | 3 | 0 |
| user_email | string | 3 | 3 | 0 |
| user_id | string | 3 | 3 | 0 |

### Colecao: generator_subscribers

- ID da colecao: generator_subscribers
- Quantidade de documentos: 4
- Quantidade de campos unicos: 11

#### Document IDs

- Dm5Crw0ITYubu6W3V5Rm
- FjTekzxfMUzzhGeB2BKl
- Ls2gE31kLFixQEw65pkg
- bFhQqrPa2SOcLGjcuM1q

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| created_at | string | 4 | 4 | 0 |
| gd_type | string | 4 | 4 | 0 |
| generator_id | string | 4 | 4 | 0 |
| is_active | boolean | 4 | 4 | 0 |
| modalidade | string | 4 | 4 | 0 |
| percentage | number | 4 | 4 | 0 |
| priority | number | 4 | 4 | 0 |
| subscriber_id | string | 4 | 4 | 0 |
| tenantId | string | 4 | 4 | 0 |
| updated_at | string | 4 | 4 | 0 |
| user_id | string | 4 | 4 | 0 |

### Colecao: generators

- ID da colecao: generators
- Quantidade de documentos: 8
- Quantidade de campos unicos: 44

#### Document IDs

- 7H0S8rcBrfpNJuZtGtQn
- aQxpWIwLmdWNjs0yUEtQ
- jgWpGH3BlLyEdHM55Le3
- lNQPbnRdpWxBPyBx5Kok
- mZbyV9ELT39AVjj0TD2i
- nKJCXHaKAsg0MyztbKs7
- nzJTiLyBIopLSPcDyleX
- sCY774QWqRtQYNRd4FhV

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| administrator | null | 8 | 0 | 8 |
| attachments | null | 8 | 0 | 8 |
| concessionaria | string | 8 | 8 | 0 |
| createdAt | timestamp | 8 | 8 | 0 |
| distributor_login | map | 8 | 8 | 0 |
| distributor_login.cpfCnpj | string | 8 | 8 | 0 |
| distributor_login.senha | string | 8 | 8 | 0 |
| owner | map | 8 | 8 | 0 |
| owner.cpfCnpj | string | 8 | 8 | 0 |
| owner.dataNascFundacao | null | 8 | 0 | 8 |
| owner.email | string | 8 | 8 | 0 |
| owner.estadoCivil | null | 8 | 0 | 8 |
| owner.nome | string | 8 | 8 | 0 |
| owner.telefone | string | 8 | 8 | 0 |
| owner.tipo | string | 8 | 8 | 0 |
| payment_data | map | 8 | 8 | 0 |
| payment_data.agencia | string | 8 | 8 | 0 |
| payment_data.banco | number | 8 | 8 | 0 |
| payment_data.conta | number | 8 | 8 | 0 |
| payment_data.cpfCnpj | string | 8 | 8 | 0 |
| payment_data.nomeBeneficiario | string | 8 | 8 | 0 |
| payment_data.pix | string | 8 | 8 | 0 |
| plants | array | 8 | 8 | 0 |
| plants[] | map | 8 | 8 | 0 |
| plants[].apelido | string | 8 | 8 | 0 |
| plants[].dataContrato | null | 8 | 0 | 8 |
| plants[].endereco | map | 8 | 8 | 0 |
| plants[].endereco.bairro | string | 8 | 8 | 0 |
| plants[].endereco.cep | string | 8 | 8 | 0 |
| plants[].endereco.cidade | string | 8 | 8 | 0 |
| plants[].endereco.complemento | string | 8 | 8 | 0 |
| plants[].endereco.estado | string | 8 | 8 | 0 |
| plants[].endereco.logradouro | string | 8 | 8 | 0 |
| plants[].endereco.numero | number, string | 8 | 8 | 0 |
| plants[].geracaoProjetada | number | 8 | 8 | 0 |
| plants[].modalidade | string | 8 | 8 | 0 |
| plants[].numeroParceiroDistribuidora | string | 8 | 8 | 0 |
| plants[].observacoes | string | 8 | 8 | 0 |
| plants[].porte | string | 8 | 8 | 0 |
| plants[].potenciaUsina | number | 8 | 8 | 0 |
| plants[].uc | number | 8 | 8 | 0 |
| status | string | 8 | 8 | 0 |
| updatedAt | timestamp | 8 | 8 | 0 |
| user_id | string | 8 | 8 | 0 |

### Colecao: invoice_customization

- ID da colecao: invoice_customization
- Quantidade de documentos: 3
- Quantidade de campos unicos: 2

#### Document IDs

- 972TYkST7ua99M1NcIEJjcRAmaB3
- BgR0965BWTdrqEIBFGBUwd7iOas2
- MQ6CvSWnASQCcEX1EIoGf1tdGf03

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| templateLayout | string | 3 | 3 | 0 |
| updatedAt | string | 3 | 3 | 0 |

### Colecao: invoice_data

- ID da colecao: invoice_data
- Quantidade de documentos: 161
- Quantidade de campos unicos: 1525

#### Document IDs

- 0ExuPDWBumRiaiDF3ZLi
- 0u4YFUcwkDQtD3nBvPTo
- 122betmhSW1Jtympw8Yh
- 1LeblFTzj5RwadEW2bsh
- 1QeM2P1luLXGGxZqmDcR
- 1XwsIxuvuVEcvlvD2mZX
- 1xqnrn23s1oLS7fIz1Gp
- 24cfElLLYHzODF41y6Lj
- 2HqffOXvtkIupqMyEETB
- 2NoOG5iSYLL0STD2eLTY
- 2czsIkBvRjwQQL8UqCpz
- 2kHzCkjPI6x042QQEVk5
- 4PaKx9bKZZVT7sehhNJm
- 4m2GqATG60Bsje6gjcM3
- 4wrG0RfWjPYg8kZcCoDI
- 5bRMDCc5y8z2QOipgVaf
- 5i2LeERBh7UTqABOlWG9
- 5oOOiN7EHNRCv1B3zZTk
- 657RiuuTqBvqTa1NLgz4
- 6R3GFpZrnTUBEzfGK6gG
- 6cPILBngCzeu4SgrzVRw
- 6pltbkJZaWV24J3LhGol
- 6uWBS8pkAlAcBsZ0EXxQ
- 71elwUEFEE5XJslYVjgC
- 7muMSxKeTwk85NNbIeE9
- 8AeLhv8WTQTpaxTrWYZe
- 8cuTLqAVcwqKz48ZuIO3
- 997KqIKEJdVPMe9o8Fit
- 9uITTCyUH9wNdyqqG5Kf
- AFT8zLTZYlFKclO5Cvwg
- ANlgB8YPw2MRK1eGAcv0
- AuvHHCCQjs1K81ILmkJf
- AvdMlfXkT75Fc6P1HzG4
- BIRdilE3cCEilwgzazn3
- BOUutEU4sJusv9ugAMSn
- C3aoHrP5KsxreNKYwp3U
- CCS7uvihbGyydDI5sT7F
- CWu2EOgLl7iFWltPu83I
- CmNheoFyUWV0vjctkybx
- DOO270Cz9qepQoKUFuAU
- E1FCtVSDmOtJObkfCh4b
- Emb2Xvrj0HHNK2I440Dc
- Eq0FmtrBTCaNB5xsQMvt
- F30K0txoTSC8LYdL4wKO
- F3ysuWpeaXPu0j0NtO3S
- FO4Et5Ax9quTvrhxFrNs
- FYOVP9FqFIlSv5yN40x6
- FyJITVt7kH55u36cmRrS
- G9EyWluoNbb3iCm51IIT
- IfPhJxt4pKmZ2syX3GIG
- Io152Cq16HH442l7wvIR
- Iu3K4R2Anz3yKHSoKTtk
- IxRC7hK4rotW1u5E1vcd
- JE30tArrMhPBiU3w2oAx
- JQ9ZBaNUGTGXdj0g3XhY
- K9YsAA5iPn6auyxF4wxD
- KG9x5GPR6FavCx2vVzB2
- KVbIBFGOWATLN1dvvYaW
- KtHTufP0pDFtPN8R20ta
- LDztYRnKfL5kH3jPKqpq
- LFm4YWkubX14lj6LpZCb
- LGm1gzqfyhx4PCYf6NEe
- LnY1Lx0vvrNjg2jYg77S
- M7JC894MLDxoGXnL6cq2
- Nd90ANuKJHmw0ojlwr66
- NpZgmS05Zn9GDONpejqu
- O9OCJALdRcfZ2cmzhQHF
- OTsHRfKEzmVjtSosfbmm
- OxGssEJQkqWorvlCDxWa
- OxgyERBlFDfQKsQtgu6A
- P4PWJ9froAbvJCWD5HBr
- PFhq9dXrTbuvcL8IEvQr
- PYJrFP73gt8ZllBVRRUi
- PsozTqW9tb4zPs4ZBNG1
- QV4RmG0ObOpAZrD9lxpv
- R1oajCF2aqi88dCJwAuW
- RUExQnPBMGQPc4QJrhWn
- Rbq8wEku0qmh1QBbaPhs
- TXjigNKWYHJroksekfZF
- TZBytS4EtMlQ9Lwjy5Ro
- Tsa2IcjuAv7q2YPkQh3h
- U7casVTw8QGavQWnMVsF
- ULqDJGxahmKgNItGkFyj
- UVu6XFjvFZ3NjregN5RB
- UdsaNMwTwzY9oqa4vxn1
- Uso1l1C39aNrKhcR2dBB
- W4Tl0m9HhuzBBRrgv5EU
- WqONtFouEjtBmoK463BV
- Xx4SjtFHv1OcxdSBGqqy
- Y3NYZc4NfgTgRpHe7ahQ
- YbEsDFgMsJgKJ9bd1X1Q
- YnZarlEURYBADVi79qqY
- ZHWbtAxhUrVpQaVn8r2K
- Zw2Cdt3632Q90iwJa28A
- aDDmpBrmfnhG3W81evHQ
- aHNhluK8VpJaQcWOQU1n
- aIhIiaDmoExlzsQJt9dp
- bVJD6h7KjWuRZYsCxIwx
- bg3HpwsZEq7WH35fNMum
- cw8HGaBG5DQ1jD7FKZvI
- d9sKyOq221yVh9UxsfrX
- ddKX1vqjOD1GCETwwTjf
- e2XGKwi0A1gnYH6jf0cM
- f48AVTuOruuILtYERqzU
- fvwjUyIPnl0lhi6z2lph
- fzzZGjMUageWoVwcJbWQ
- gLdXKRSxS87xdMKitlFw
- gyoJVkLFau1bPbqMJNcP
- h0TuUKyflcLPpeEQI0Ub
- h8AWvSGNDG0edXJPPzYx
- hSoUiXxSkspRWHPTSlqW
- iR7gKzTwCweVdbrruJ6z
- kCCGN7F9Keo5ea3G7GUD
- kjq2f1sVF5W8EMU90AlG
- lFAaucrbJis7D8ykcVgZ
- lXkwhqATmHkAgtCM19mL
- lev4y0cm8i4ksAZcAhe1
- mbicPnv4VdPgZYuYyuFG
- mgLwq4TREbuSijCU6zRU
- n47CaQgaYw90PYlqcsWk
- nHRdWCLNXYen4Vm8Gwi9
- nWsDZBhgpIVTswTJPLF5
- nZnL6uZZbyvXMINDhnAN
- nihn8fW5x1QuEWDa4TrB
- oAVxoEXCQuDY0GWTdo1v
- pFJUDgJda3C9FV0OpUPa
- pIzJozi7Ullc6t846EK5
- pTuVmmQmc0LiekqEbFay
- pV4jH6wfGc4KH6whTNn8
- psBvKQwlQP1LRyjs4Jui
- q4Wk6QPx58QIatCkMCNV
- qJFqxX1oRlqXGylXLHD9
- r0DDoKEVxZJb79EK4Qhy
- sQALjEsdNOgOcFYt4vnq
- sQXSfUicYTVTq2XklH6D
- sTJd0GCeKgsGEM0enZgg
- seKKMVI35DFeJfv6DnQR
- sehg5aHEnOV4dJh3Sgm4
- tmstuJZbplD0BfwZAxwy
- tpniWiZGfiN2bZyLBZWt
- uAL6sJ3O1f57btWOXHhm
- uSDNUT82y3Eb4n5U6uH7
- uXo2wkXymfBsmAQVBEqU
- uZHzZICPqrz9zyrg8HH3
- utYw5dFdVGnXHgTE4qcY
- uyxTBviYL8ISMNqCy42z
- v6E9jmpX4p3GY4PGxbkB
- vEnDQR3ikZJM7knQ4VPA
- vRoCDRnQ9BSCCIgMBqWo
- vd1acnoxdJrTtaeGKDi8
- vdjvRVoBqFY6yOw3SWMV
- vndiXVYAjAqFa4zAlFpD
- wHZpVEQYsE3Si3Ch4j1w
- wenxnCHw6juiZ1tON7bY
- xfWtJVZcAc8JseSH9E0Z
- yFnsNTzNHSSN05T9WqAc
- yQ8b2UfAvnPdxSyQpA6m
- yz7LV4KJn9BqKecGxh2g
- z61fpeqUySU86kaSFvir
- zgRxtOyCGdFN4zfJyc5W
- zmQc6CNYflct30BbLnTk

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| address | string | 161 | 161 | 0 |
| api_response | map | 161 | 161 | 0 |
| api_response.address | string | 116 | 116 | 0 |
| api_response.asaas_data | map | 15 | 15 | 0 |
| api_response.asaas_data.boleto_barcode | string | 15 | 15 | 0 |
| api_response.asaas_data.boleto_charge_id | string | 15 | 15 | 0 |
| api_response.asaas_data.boleto_identification_field | string | 15 | 15 | 0 |
| api_response.asaas_data.boleto_nosso_numero | string | 15 | 15 | 0 |
| api_response.asaas_data.customer_id | string | 15 | 15 | 0 |
| api_response.asaas_data.pix_charge_id | string | 15 | 15 | 0 |
| api_response.asaas_data.pix_payload | string | 15 | 15 | 0 |
| api_response.asaas_data.pix_qr_code | string | 15 | 15 | 0 |
| api_response.asaas_data.validated_at | string | 15 | 15 | 0 |
| api_response.caracteristicas | map | 100 | 100 | 0 |
| api_response.caracteristicas.consumoNaoCompensado | number | 100 | 100 | 0 |
| api_response.caracteristicas.descricao | string | 40 | 40 | 0 |
| api_response.caracteristicas.energiaCompensada | number | 100 | 100 | 0 |
| api_response.caracteristicas.energiaInjetada | number | 60 | 60 | 0 |
| api_response.caracteristicas.percentualCompensado | number | 40 | 40 | 0 |
| api_response.caracteristicas.saldoAnterior | number | 60 | 60 | 0 |
| api_response.caracteristicas.tipo | string | 40 | 40 | 0 |
| api_response.cnpj_cpf | string | 4 | 4 | 0 |
| api_response.compensated_energy | number | 9 | 9 | 0 |
| api_response.confianca | number | 34 | 34 | 0 |
| api_response.consumer_unit | string | 24 | 24 | 0 |
| api_response.consumo_nao_compensado | number | 9 | 9 | 0 |
| api_response.cpfCnpj | string | 15 | 15 | 0 |
| api_response.dados_extraidos | map | 49 | 49 | 0 |
| api_response.dados_extraidos.address | string | 49 | 49 | 0 |
| api_response.dados_extraidos.ajustes | number | 49 | 49 | 0 |
| api_response.dados_extraidos.ajustes_breakdown | null, string | 49 | 1 | 48 |
| api_response.dados_extraidos.bandeira_1 | number | 49 | 49 | 0 |
| api_response.dados_extraidos.bandeira_2 | number | 49 | 49 | 0 |
| api_response.dados_extraidos.ciclo_geracao | string | 49 | 49 | 0 |
| api_response.dados_extraidos.cofins_aliq | number | 49 | 49 | 0 |
| api_response.dados_extraidos.compensated_energy | number | 49 | 49 | 0 |
| api_response.dados_extraidos.compensated_energy_breakdown | null, string | 49 | 16 | 33 |
| api_response.dados_extraidos.consumer_unit | string | 49 | 49 | 0 |
| api_response.dados_extraidos.data_leitura_anterior | string | 2 | 2 | 0 |
| api_response.dados_extraidos.data_leitura_atual | string | 2 | 2 | 0 |
| api_response.dados_extraidos.excedente_recebido | number | 49 | 49 | 0 |
| api_response.dados_extraidos.expiration_date | string | 49 | 49 | 0 |
| api_response.dados_extraidos.extraction_confidence | string | 33 | 33 | 0 |
| api_response.dados_extraidos.extraction_source | string | 33 | 33 | 0 |
| api_response.dados_extraidos.fioB | number | 49 | 49 | 0 |
| api_response.dados_extraidos.fioB_rate | number | 49 | 49 | 0 |
| api_response.dados_extraidos.icms_aliq | number | 49 | 49 | 0 |
| api_response.dados_extraidos.ICMS_SCEE | number | 49 | 49 | 0 |
| api_response.dados_extraidos.iluminacaoPublica | number | 49 | 49 | 0 |
| api_response.dados_extraidos.invoice_consume | number | 49 | 49 | 0 |
| api_response.dados_extraidos.invoice_value | number | 49 | 49 | 0 |
| api_response.dados_extraidos.is_baixa_renda | boolean | 49 | 49 | 0 |
| api_response.dados_extraidos.is_shared | boolean | 33 | 33 | 0 |
| api_response.dados_extraidos.juros | number | 33 | 33 | 0 |
| api_response.dados_extraidos.juros_multa | number | 16 | 16 | 0 |
| api_response.dados_extraidos.legal_name | string | 49 | 49 | 0 |
| api_response.dados_extraidos.measured_energy | number | 49 | 49 | 0 |
| api_response.dados_extraidos.month_reference | string | 49 | 49 | 0 |
| api_response.dados_extraidos.multa | number | 33 | 33 | 0 |
| api_response.dados_extraidos.outros | number | 49 | 49 | 0 |
| api_response.dados_extraidos.pis_aliq | number | 49 | 49 | 0 |
| api_response.dados_extraidos.PIS_COFINS_SCEE | number | 49 | 49 | 0 |
| api_response.dados_extraidos.retroativos | number | 49 | 49 | 0 |
| api_response.dados_extraidos.saldo_acumulado | number | 49 | 49 | 0 |
| api_response.dados_extraidos.saldo_anterior | number | 49 | 49 | 0 |
| api_response.dados_extraidos.saldo_pdf | number | 49 | 49 | 0 |
| api_response.dados_extraidos.status | string | 49 | 49 | 0 |
| api_response.dados_extraidos.Tarifa Do Ad. De Band. 1 Com impostos | number | 36 | 36 | 0 |
| api_response.dados_extraidos.tarifa_bandeira | number | 36 | 36 | 0 |
| api_response.dados_extraidos.tarifa_bandeira_base | number | 36 | 36 | 0 |
| api_response.dados_extraidos.tarifa_com_tributos | number | 49 | 49 | 0 |
| api_response.dados_extraidos.tarifa_nc_sem_tributos | number | 49 | 49 | 0 |
| api_response.dados_extraidos.tarifa_scee | number | 49 | 49 | 0 |
| api_response.dados_extraidos.tarifa_scee_inj | number | 49 | 49 | 0 |
| api_response.dados_extraidos.total_energy_ativa | number | 33 | 33 | 0 |
| api_response.dados_extraidos.uc_geradora | string | 49 | 49 | 0 |
| api_response.dadosExtraidos | map | 100 | 100 | 0 |
| api_response.dadosExtraidos.consumoNaoCompensado | number | 100 | 100 | 0 |
| api_response.dadosExtraidos.consumoTotal | number | 40 | 40 | 0 |
| api_response.dadosExtraidos.cpfCnpj | string | 55 | 55 | 0 |
| api_response.dadosExtraidos.endereco | string | 100 | 100 | 0 |
| api_response.dadosExtraidos.energiaCompensada | number | 100 | 100 | 0 |
| api_response.dadosExtraidos.ilumPublica | number | 40 | 40 | 0 |
| api_response.dadosExtraidos.jurosMulta | number | 40 | 40 | 0 |
| api_response.dadosExtraidos.mesReferencia | string | 100 | 100 | 0 |
| api_response.dadosExtraidos.nome | string | 100 | 100 | 0 |
| api_response.dadosExtraidos.saldoAnterior | number | 60 | 60 | 0 |
| api_response.dadosExtraidos.tarifaComTributos | number | 40 | 40 | 0 |
| api_response.dadosExtraidos.uc | string | 100 | 100 | 0 |
| api_response.dadosExtraidos.valorTotal | number | 100 | 100 | 0 |
| api_response.dadosExtraidos.vencimento | string | 100 | 100 | 0 |
| api_response.data_vencimento | string | 4 | 4 | 0 |
| api_response.documento | string | 15 | 15 | 0 |
| api_response.economia | number | 102 | 102 | 0 |
| api_response.endereco | string | 4 | 4 | 0 |
| api_response.energia_compensada | number | 97 | 97 | 0 |
| api_response.expiration_date | string | 99 | 99 | 0 |
| api_response.extra | map | 20 | 20 | 0 |
| api_response.extra.address | string | 5 | 5 | 0 |
| api_response.extra.ajustes | number | 5 | 5 | 0 |
| api_response.extra.ajustes_breakdown | null | 5 | 0 | 5 |
| api_response.extra.bandeira_1 | number | 5 | 5 | 0 |
| api_response.extra.bandeira_2 | number | 5 | 5 | 0 |
| api_response.extra.ciclo_geracao | string | 5 | 5 | 0 |
| api_response.extra.cnpj_cpf | string | 11 | 11 | 0 |
| api_response.extra.cofins_aliq | number | 5 | 5 | 0 |
| api_response.extra.compensated_energy | number | 5 | 5 | 0 |
| api_response.extra.compensated_energy_breakdown | null | 5 | 0 | 5 |
| api_response.extra.consumer_unit | string | 5 | 5 | 0 |
| api_response.extra.equatorial_manual_fields | map | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_ajustes_tributario_imposto_nao_identificado | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_base_calc_icms_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_base_calc_icms_injecao_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_base_calc_pis_cofins_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_ciclo_de_geracao | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_cofins | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_consumo_nao_compensado | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_conta_data_vencimento | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_conta_mes_referencia | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_custos_totais_pis_cofins_icms | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_custos_totais_pis_cofins_icms_ajustes_tributario | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_custos_totais_pis_cofins_icms_ajustes_tributario_fio_b | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_diferenca_icms_cobrado_consumo_scee_descontado_injecao_scee | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_energia_compensada_injecao_scee_kwh | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_excedente_recebido_no_mes | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_icms | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_ilum_publica | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_juros | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_multa | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_nome | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_pis | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_preco_unit_com_tributos_consumo_nao_compensado | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_preco_unit_com_tributos_consumo_scee | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_preco_unit_com_tributos_injecao_scee | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_saldo_acumulado | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_tar_de_fio_b | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_tar_de_icms | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_tar_de_pis_cofins | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_tarifa_ad_band_1_com_impostos | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_tarifa_ad_band_2_com_impostos | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_tarifa_unit_consumo_nao_compensado_sem_pis_cofins_icms | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_tributos_nao_identificado | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_uc | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_valor_icms_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_valor_icms_injecao_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_valor_pis_cofins_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.extra.equatorial_manual_fields.eq_valor_total_fio_b | string | 4 | 4 | 0 |
| api_response.extra.excedente_recebido | number | 5 | 5 | 0 |
| api_response.extra.expiration_date | string | 5 | 5 | 0 |
| api_response.extra.extraction_confidence | string | 5 | 5 | 0 |
| api_response.extra.extraction_source | string | 5 | 5 | 0 |
| api_response.extra.fioB | number | 5 | 5 | 0 |
| api_response.extra.fioB_rate | number | 5 | 5 | 0 |
| api_response.extra.icms_aliq | number | 5 | 5 | 0 |
| api_response.extra.ICMS_SCEE | number | 5 | 5 | 0 |
| api_response.extra.iluminacaoPublica | number | 5 | 5 | 0 |
| api_response.extra.invoice_consume | number | 5 | 5 | 0 |
| api_response.extra.invoice_value | number | 5 | 5 | 0 |
| api_response.extra.is_baixa_renda | boolean | 5 | 5 | 0 |
| api_response.extra.is_shared | boolean | 5 | 5 | 0 |
| api_response.extra.juros | number | 5 | 5 | 0 |
| api_response.extra.legal_name | string | 5 | 5 | 0 |
| api_response.extra.measured_energy | number | 5 | 5 | 0 |
| api_response.extra.month_reference | string | 5 | 5 | 0 |
| api_response.extra.multa | number | 5 | 5 | 0 |
| api_response.extra.non_compensated_energy | number | 9 | 9 | 0 |
| api_response.extra.outros | number | 5 | 5 | 0 |
| api_response.extra.pis_aliq | number | 5 | 5 | 0 |
| api_response.extra.PIS_COFINS_SCEE | number | 5 | 5 | 0 |
| api_response.extra.retroativos | number | 5 | 5 | 0 |
| api_response.extra.saldo_acumulado | number | 5 | 5 | 0 |
| api_response.extra.saldo_anterior | number | 5 | 5 | 0 |
| api_response.extra.saldo_pdf | number | 5 | 5 | 0 |
| api_response.extra.status | string | 5 | 5 | 0 |
| api_response.extra.Tarifa Do Ad. De Band. 1 Com impostos | number | 5 | 5 | 0 |
| api_response.extra.tarifa_bandeira | number | 5 | 5 | 0 |
| api_response.extra.tarifa_bandeira_base | number | 5 | 5 | 0 |
| api_response.extra.tarifa_com_tributos | number | 5 | 5 | 0 |
| api_response.extra.tarifa_compensacao | number | 5 | 5 | 0 |
| api_response.extra.tarifa_nc_sem_tributos | number | 5 | 5 | 0 |
| api_response.extra.tarifa_scee | number | 5 | 5 | 0 |
| api_response.extra.tarifa_scee_inj | number | 5 | 5 | 0 |
| api_response.extra.tariff_base | number | 4 | 4 | 0 |
| api_response.extra.total_energy_ativa | number | 5 | 5 | 0 |
| api_response.extra.uc_geradora | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA | map | 45 | 45 | 0 |
| api_response.FATURA CALCULADA._raw | map | 2 | 2 | 0 |
| api_response.FATURA CALCULADA._raw.consumoNC | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.consumoTotal | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.custoFioB | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.economiaReal | number | 2 | 2 | 0 |
| api_response.FATURA CALCULADA._raw.energiaCompensada | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.excedenteRecebido | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.retroativos | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.saldoAnterior | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.saldoAtual | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.subtotalEquatorial | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.tarifaGoldtech | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.totalPagar | number | 2 | 2 | 0 |
| api_response.FATURA CALCULADA._raw.valorGoldtech | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA._raw.valorGoldtechLiquido | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh) | map | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Consumo Total | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Energia Compensada | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Energia Não Compensada | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Excedente Recebido | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Saldo Anterior | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Saldo Atualizado | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO | map | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL | map | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Adicionais de Bandeira | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Créditos / Ajustes de Faturamento | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Detalhamento | string | 13 | 13 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Encargos Redes / Fio B | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Energia Não Compensada | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.EQUATORIAL | string | 22 | 22 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Iluminação Pública (CIP/COSIP) | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Impostos SCEE (Encargos Redes) | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 1 | string | 9 | 9 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 2 | string | 9 | 9 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 3 | string | 9 | 9 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 4 | string | 9 | 9 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.TOTAL EQUATORIAL | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH | map | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH._obs | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Bruto (com desc. 20%) | string | 2 | 2 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Detalhamento | string | 22 | 22 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.GOLDTECH | string | 22 | 22 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.total | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (a pagar) | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (Líquido) | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Unitário (Líquido) | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.3. TOTAL E ECONOMIA | map | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.3. TOTAL E ECONOMIA.ECONOMIA REAL | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.3. TOTAL E ECONOMIA.Tarifa Referencia | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.3. TOTAL E ECONOMIA.TOTAL A PAGAR | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.Address | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Ciclo de Geração | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Codigo Modelo | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.COFINS | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.CONSUMO NÃO COMPENSADO | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Conta Data Vencimento | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Conta Mês Referencia | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.demonstrativo | map | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento | map | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS | map | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Custo total | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Preço unitário | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA | map | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Custo total | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Preço unitário | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA | map | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Custo total | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Preço unitário | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS | map | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS.Custo total | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS.Preço unitário | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA | map | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL | map | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Custo total | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Preço unitário | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ FIO B | map | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ FIO B.Custo total | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ FIO B.Preço unitário | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ FIO B.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ ICMS | map | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ ICMS.Custo total | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ ICMS.Preço unitário | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ ICMS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ OUTROS IMPOSTOS | map | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ OUTROS IMPOSTOS.Custo total | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ OUTROS IMPOSTOS.Preço unitário | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ OUTROS IMPOSTOS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ PIS/COFINS | map | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ PIS/COFINS.Custo total | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ PIS/COFINS.Preço unitário | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.  ↳ PIS/COFINS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA | map | 43 | 43 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.Custo total | string | 43 | 43 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.preco | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.Preço unitário | string | 43 | 43 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 43 | 43 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.total | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS (FIO B + IMPOSTOS) | map | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Custo total | string | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Preço unitário | string | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B) | map | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).Custo total | string | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).preco | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).Preço unitário | string | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).total | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA | map | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA._obs | string | 13 | 13 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.Custo total | string | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.preco | string | 26 | 26 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.Preço unitário | string | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.total | string | 26 | 26 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA | map | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA.Custo total | string | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA.Preço unitário | string | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.EQUATORIAL | map | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.EQUATORIAL.Custo total | string | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.EQUATORIAL.Preço unitário | string | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.EQUATORIAL.QTD (kWh) | string | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.GOLDTECH | map | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.GOLDTECH._obs | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.GOLDTECH.Custo total | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.GOLDTECH.Preço unitário | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.GOLDTECH.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS | map | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC) | map | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).Custo total | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).preco | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).Preço unitário | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).QTD (kWh) | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).total | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS) | map | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Custo total | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Preço unitário | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).QTD (kWh) | string | 21 | 21 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS.Custo total | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS.Preço unitário | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.OUTROS.QTD (kWh) | string | 23 | 23 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.RETROATIVO (Desconsiderado) | map | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.RETROATIVO (Desconsiderado).Custo total | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.RETROATIVO (Desconsiderado).Preço unitário | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.RETROATIVO (Desconsiderado).QTD (kWh) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA | map | 41 | 41 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 41 | 41 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 41 | 41 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 41 | 41 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR | map | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR.Custo total | string | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR.Preço unitário | string | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR.QTD (kWh) | string | 14 | 14 | 0 |
| api_response.FATURA CALCULADA.ENERGIA COMPENSADA INJEÇÃO SCEE (kWh) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.excedente recebido no mês | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.ICMS | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.identificacao | map | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.identificacao.justificativa | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.identificacao.label | string | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.identificacao.modelo | number | 5 | 5 | 0 |
| api_response.FATURA CALCULADA.ILUM. PÚBLICA | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.JUROS | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Justificativa Modelo | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Modelo Identificado | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.MULTA | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Nome | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.PIS | number | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Preço Unit (R$) Com Tributos CONSUMO NÃO COMPENSADO (Com PIS/COFINS e ICMS) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Preço Unit (R$) Com Tributos CONSUMO SCEE | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Preço Unit (R$) Com Tributos INJEÇÃO SCEE | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Produção Atual | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Saldo Acumulado | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Saldo Anterior | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Tar. De FIO B | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Tarifa Do Ad. De Band. 1 Com impostos | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Tarifa Do Ad. De Band. 2 Com impostos | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.Tarifa Unit (R$) Consumo Não Compensado (Sem PIS/COFINS e ICMS) | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.UC | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.UC da geradora | string | 1 | 1 | 0 |
| api_response.FATURA CALCULADA.VALOR SEM SOLAR | map | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.VALOR SEM SOLAR._fonte | string | 28 | 28 | 0 |
| api_response.FATURA CALCULADA.VALOR SEM SOLAR.Energia (sem solar) | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.VALOR SEM SOLAR.Ilum. Pública (CIP/COSIP) | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.VALOR SEM SOLAR.Total | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.VALOR SEM SOLAR.Você pagaria esse mês o valor de | string | 45 | 45 | 0 |
| api_response.FATURA CALCULADA.Valor Total FIO B | string | 1 | 1 | 0 |
| api_response.fatura_calculada | map | 139 | 139 | 0 |
| api_response.fatura_calculada_v2 | map | 36 | 36 | 0 |
| api_response.fatura_calculada_v2.caracteristicas | map | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.caracteristicas.consumoNaoCompensado | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.caracteristicas.energiaCompensada | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.caracteristicas.energiaInjetada | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.caracteristicas.saldoAnterior | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos | map | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.consumoNaoCompensado | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.cpfCnpj | string | 29 | 29 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.endereco | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.energiaCompensada | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.mesReferencia | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.nome | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.saldoAnterior | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.uc | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.valorTotal | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.dadosExtraidos.vencimento | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.info_fatura | map | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.info_fatura.endereco | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.info_fatura.mes_referencia | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.info_fatura.nome | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.info_fatura.uc | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.info_fatura.vencimento | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.modelo | map | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.modelo.id | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.modelo.justificativa | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.modelo.modelo | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.modelo.nome | string | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro | map | 36 | 36 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro.desconto | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro.economia | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro.tarifaCheia | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro.tarifaComDesconto | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro.valorEquatorial | number | 34 | 34 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro.valorGoldtech | number | 36 | 36 | 0 |
| api_response.fatura_calculada_v2.splitFinanceiro.valorTotal | number | 35 | 35 | 0 |
| api_response.fatura_calculada_v2.success | boolean | 34 | 34 | 0 |
| api_response.fatura_calculada._raw | map | 6 | 6 | 0 |
| api_response.fatura_calculada._raw.consumoNC | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.consumoTotal | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.custoFioB | number | 2 | 2 | 0 |
| api_response.fatura_calculada._raw.economiaReal | number | 6 | 6 | 0 |
| api_response.fatura_calculada._raw.energiaCompensada | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.excedenteRecebido | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.retroativos | number | 2 | 2 | 0 |
| api_response.fatura_calculada._raw.saldoAnterior | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.saldoAtual | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.subtotalEquatorial | number | 2 | 2 | 0 |
| api_response.fatura_calculada._raw.tarifaGoldtech | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.tarifaGoldtechBruta | number | 1 | 1 | 0 |
| api_response.fatura_calculada._raw.totalPagar | number | 6 | 6 | 0 |
| api_response.fatura_calculada._raw.valor_gestora_reais | number | 1 | 1 | 0 |
| api_response.fatura_calculada._raw.valor_unitario_goldtech_reais | number | 1 | 1 | 0 |
| api_response.fatura_calculada._raw.valorGoldtech | number | 4 | 4 | 0 |
| api_response.fatura_calculada._raw.valorGoldtechBruto | number | 1 | 1 | 0 |
| api_response.fatura_calculada._raw.valorGoldtechLiquido | number | 2 | 2 | 0 |
| api_response.fatura_calculada.1. RESUMO DE ENERGIA (kWh) | map | 139 | 139 | 0 |
| api_response.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Consumo Total | string | 139 | 139 | 0 |
| api_response.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Compensada | string | 139 | 139 | 0 |
| api_response.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Não Compensada | number, string | 139 | 139 | 0 |
| api_response.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Excedente Recebido | string | 139 | 139 | 0 |
| api_response.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Anterior | string | 139 | 139 | 0 |
| api_response.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Atualizado | string | 139 | 139 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO | map | 139 | 139 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL | map | 139 | 139 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Adicionais de Bandeira | string | 39 | 39 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Créditos / Ajustes de Faturamento | string | 39 | 39 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Detalhamento | string | 39 | 39 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Encargos Redes / Fio B | string | 2 | 2 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Energia Não Compensada | string | 39 | 39 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.EQUATORIAL | string | 100 | 100 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Iluminação Pública (CIP/COSIP) | string | 39 | 39 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Impostos SCEE (Encargos Redes) | string | 33 | 33 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 1 | string | 61 | 61 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 2 | string | 61 | 61 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 3 | string | 61 | 61 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 4 | string | 61 | 61 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.TOTAL EQUATORIAL | string | 39 | 39 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH | map | 139 | 139 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH._obs | string | 33 | 33 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Bruto (com desc. 20%) | string | 6 | 6 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Detalhamento | string | 100 | 100 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.GOLDTECH | string | 100 | 100 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.total | string | 33 | 33 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (a pagar) | string | 33 | 33 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (Líquido) | string | 39 | 39 | 0 |
| api_response.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Unitário (Líquido) | string | 33 | 33 | 0 |
| api_response.fatura_calculada.3. TOTAL E ECONOMIA | map | 139 | 139 | 0 |
| api_response.fatura_calculada.3. TOTAL E ECONOMIA.ECONOMIA REAL | string | 139 | 139 | 0 |
| api_response.fatura_calculada.3. TOTAL E ECONOMIA.Tarifa Referencia | string | 139 | 139 | 0 |
| api_response.fatura_calculada.3. TOTAL E ECONOMIA.TOTAL A PAGAR | number, string | 139 | 139 | 0 |
| api_response.fatura_calculada.Address | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Ciclo de Geração | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Codigo Modelo | number | 4 | 4 | 0 |
| api_response.fatura_calculada.COFINS | number | 4 | 4 | 0 |
| api_response.fatura_calculada.CONSUMO NÃO COMPENSADO | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Conta Data Vencimento | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Conta Mês Referencia | string | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo | map | 135 | 135 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento | map | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS | map | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Custo total | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Preço unitário | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.QTD (kWh) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA | map | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Custo total | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Preço unitário | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA.QTD (kWh) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA | map | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Custo total | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Preço unitário | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.OUTROS | map | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.OUTROS.Custo total | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.OUTROS.Preço unitário | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.OUTROS.QTD (kWh) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA | map | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL | map | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Custo total | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Preço unitário | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ FIO B | map | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ FIO B.Custo total | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ FIO B.Preço unitário | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ FIO B.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ ICMS | map | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ ICMS.Custo total | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ ICMS.Preço unitário | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ ICMS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS | map | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS.Custo total | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS.Preço unitário | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ PIS/COFINS | map | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ PIS/COFINS.Custo total | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ PIS/COFINS.Preço unitário | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.  ↳ PIS/COFINS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA | map | 134 | 134 | 0 |
| api_response.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Custo total | string | 134 | 134 | 0 |
| api_response.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.preco | string | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Preço unitário | string | 134 | 134 | 0 |
| api_response.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 134 | 134 | 0 |
| api_response.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.total | string | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS) | map | 6 | 6 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Custo total | string | 6 | 6 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Preço unitário | string | 6 | 6 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B) | map | 31 | 31 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).Custo total | string | 31 | 31 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).preco | string | 29 | 29 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).Preço unitário | string | 31 | 31 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).QTD (kWh) | string | 31 | 31 | 0 |
| api_response.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).total | string | 29 | 29 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA COMPENSADA | map | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA COMPENSADA._obs | string | 39 | 39 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Custo total | string | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.preco | string | 62 | 62 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Preço unitário | string | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.QTD (kWh) | string | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.total | string | 62 | 62 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA | map | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Custo total | string | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Preço unitário | string | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 135 | 135 | 0 |
| api_response.fatura_calculada.demonstrativo.EQUATORIAL | map | 45 | 45 | 0 |
| api_response.fatura_calculada.demonstrativo.EQUATORIAL.Custo total | string | 45 | 45 | 0 |
| api_response.fatura_calculada.demonstrativo.EQUATORIAL.Preço unitário | string | 45 | 45 | 0 |
| api_response.fatura_calculada.demonstrativo.EQUATORIAL.QTD (kWh) | string | 45 | 45 | 0 |
| api_response.fatura_calculada.demonstrativo.GOLDTECH | map | 54 | 54 | 0 |
| api_response.fatura_calculada.demonstrativo.GOLDTECH._obs | string | 54 | 54 | 0 |
| api_response.fatura_calculada.demonstrativo.GOLDTECH.Custo total | string | 54 | 54 | 0 |
| api_response.fatura_calculada.demonstrativo.GOLDTECH.Preço unitário | string | 54 | 54 | 0 |
| api_response.fatura_calculada.demonstrativo.GOLDTECH.QTD (kWh) | string | 54 | 54 | 0 |
| api_response.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS) | map | 32 | 32 | 0 |
| api_response.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Custo total | string | 32 | 32 | 0 |
| api_response.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).preco | string | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Preço unitário | string | 32 | 32 | 0 |
| api_response.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).QTD (kWh) | string | 32 | 32 | 0 |
| api_response.fatura_calculada.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).total | string | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS | map | 102 | 102 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC) | map | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).Custo total | string | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).preco | string | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).Preço unitário | string | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).QTD (kWh) | string | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).total | string | 33 | 33 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS) | map | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS).Custo total | string | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS).Preço unitário | string | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS E MULTAS).QTD (kWh) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS) | map | 29 | 29 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Custo total | string | 29 | 29 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Preço unitário | string | 29 | 29 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).QTD (kWh) | string | 29 | 29 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS.Custo total | string | 102 | 102 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS.Preço unitário | string | 102 | 102 | 0 |
| api_response.fatura_calculada.demonstrativo.OUTROS.QTD (kWh) | string | 102 | 102 | 0 |
| api_response.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado) | map | 2 | 2 | 0 |
| api_response.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado).Custo total | string | 2 | 2 | 0 |
| api_response.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado).Preço unitário | string | 2 | 2 | 0 |
| api_response.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado).QTD (kWh) | string | 2 | 2 | 0 |
| api_response.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA | map | 116 | 116 | 0 |
| api_response.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 116 | 116 | 0 |
| api_response.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 116 | 116 | 0 |
| api_response.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 116 | 116 | 0 |
| api_response.fatura_calculada.demonstrativo.TOTAL A PAGAR | map | 38 | 38 | 0 |
| api_response.fatura_calculada.demonstrativo.TOTAL A PAGAR.Custo total | string | 38 | 38 | 0 |
| api_response.fatura_calculada.demonstrativo.TOTAL A PAGAR.Preço unitário | string | 38 | 38 | 0 |
| api_response.fatura_calculada.demonstrativo.TOTAL A PAGAR.QTD (kWh) | string | 38 | 38 | 0 |
| api_response.fatura_calculada.ENERGIA COMPENSADA INJEÇÃO SCEE (kWh) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.excedente recebido no mês | string | 4 | 4 | 0 |
| api_response.fatura_calculada.ICMS | number | 4 | 4 | 0 |
| api_response.fatura_calculada.identificacao | map | 29 | 29 | 0 |
| api_response.fatura_calculada.identificacao.justificativa | string | 29 | 29 | 0 |
| api_response.fatura_calculada.identificacao.label | string | 29 | 29 | 0 |
| api_response.fatura_calculada.identificacao.modelo | number | 29 | 29 | 0 |
| api_response.fatura_calculada.ILUM. PÚBLICA | string | 4 | 4 | 0 |
| api_response.fatura_calculada.JUROS | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Justificativa Modelo | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Modelo Identificado | string | 4 | 4 | 0 |
| api_response.fatura_calculada.MULTA | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Nome | string | 4 | 4 | 0 |
| api_response.fatura_calculada.PIS | number | 4 | 4 | 0 |
| api_response.fatura_calculada.Preço Unit (R$) Com Tributos CONSUMO NÃO COMPENSADO (Com PIS/COFINS e ICMS) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Preço Unit (R$) Com Tributos CONSUMO SCEE | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Preço Unit (R$) Com Tributos INJEÇÃO SCEE | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Produção Atual | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Saldo Acumulado | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Saldo Anterior | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Tar. De FIO B | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Tarifa Do Ad. De Band. 1 Com impostos | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Tarifa Do Ad. De Band. 2 Com impostos | string | 4 | 4 | 0 |
| api_response.fatura_calculada.Tarifa Unit (R$) Consumo Não Compensado (Sem PIS/COFINS e ICMS) | string | 4 | 4 | 0 |
| api_response.fatura_calculada.UC | string | 4 | 4 | 0 |
| api_response.fatura_calculada.UC da geradora | string | 4 | 4 | 0 |
| api_response.fatura_calculada.VALOR SEM SOLAR | map | 139 | 139 | 0 |
| api_response.fatura_calculada.VALOR SEM SOLAR._fonte | string | 68 | 68 | 0 |
| api_response.fatura_calculada.VALOR SEM SOLAR.Energia (sem solar) | string | 139 | 139 | 0 |
| api_response.fatura_calculada.VALOR SEM SOLAR.Ilum. Pública (CIP/COSIP) | string | 139 | 139 | 0 |
| api_response.fatura_calculada.VALOR SEM SOLAR.Total | string | 139 | 139 | 0 |
| api_response.fatura_calculada.VALOR SEM SOLAR.Você pagaria esse mês o valor de | string | 139 | 139 | 0 |
| api_response.fatura_calculada.Valor Total FIO B | string | 4 | 4 | 0 |
| api_response.fatura_calculada.valor_gestora_reais | number | 1 | 1 | 0 |
| api_response.fatura_calculada.valor_unitario_goldtech_reais | number | 1 | 1 | 0 |
| api_response.fatura_ep | number | 4 | 4 | 0 |
| api_response.faturamento_usina | map | 106 | 106 | 0 |
| api_response.faturamento_usina._raw | map | 2 | 2 | 0 |
| api_response.faturamento_usina._raw.consumoNC | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.consumoTotal | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.custoFioB | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.economiaReal | number | 2 | 2 | 0 |
| api_response.faturamento_usina._raw.energiaCompensada | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.excedenteRecebido | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.retroativos | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.saldoAnterior | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.saldoAtual | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.subtotalEquatorial | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.tarifaGoldtech | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.totalPagar | number | 2 | 2 | 0 |
| api_response.faturamento_usina._raw.valorGoldtech | number | 1 | 1 | 0 |
| api_response.faturamento_usina._raw.valorGoldtechLiquido | number | 1 | 1 | 0 |
| api_response.faturamento_usina.1. RESUMO DE ENERGIA (kWh) | map | 45 | 45 | 0 |
| api_response.faturamento_usina.1. RESUMO DE ENERGIA (kWh).Consumo Total | string | 45 | 45 | 0 |
| api_response.faturamento_usina.1. RESUMO DE ENERGIA (kWh).Energia Compensada | string | 45 | 45 | 0 |
| api_response.faturamento_usina.1. RESUMO DE ENERGIA (kWh).Energia Não Compensada | string | 45 | 45 | 0 |
| api_response.faturamento_usina.1. RESUMO DE ENERGIA (kWh).Excedente Recebido | string | 45 | 45 | 0 |
| api_response.faturamento_usina.1. RESUMO DE ENERGIA (kWh).Saldo Anterior | string | 45 | 45 | 0 |
| api_response.faturamento_usina.1. RESUMO DE ENERGIA (kWh).Saldo Atualizado | string | 45 | 45 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO | map | 45 | 45 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL | map | 45 | 45 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Adicionais de Bandeira | string | 23 | 23 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Créditos / Ajustes de Faturamento | string | 23 | 23 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Detalhamento | string | 13 | 13 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Encargos Redes / Fio B | string | 1 | 1 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Energia Não Compensada | string | 23 | 23 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.EQUATORIAL | string | 22 | 22 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Iluminação Pública (CIP/COSIP) | string | 23 | 23 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Impostos SCEE (Encargos Redes) | string | 21 | 21 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 1 | string | 9 | 9 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 2 | string | 9 | 9 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 3 | string | 9 | 9 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 4 | string | 9 | 9 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.TOTAL EQUATORIAL | string | 23 | 23 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH | map | 45 | 45 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH._obs | string | 21 | 21 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Bruto (com desc. 20%) | string | 2 | 2 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Detalhamento | string | 22 | 22 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.GOLDTECH | string | 22 | 22 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.total | string | 21 | 21 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (a pagar) | string | 21 | 21 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (Líquido) | string | 23 | 23 | 0 |
| api_response.faturamento_usina.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Unitário (Líquido) | string | 21 | 21 | 0 |
| api_response.faturamento_usina.3. TOTAL E ECONOMIA | map | 45 | 45 | 0 |
| api_response.faturamento_usina.3. TOTAL E ECONOMIA.ECONOMIA REAL | string | 45 | 45 | 0 |
| api_response.faturamento_usina.3. TOTAL E ECONOMIA.Tarifa Referencia | string | 45 | 45 | 0 |
| api_response.faturamento_usina.3. TOTAL E ECONOMIA.TOTAL A PAGAR | string | 45 | 45 | 0 |
| api_response.faturamento_usina.Address | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Ciclo de GeraÃ§Ã£o | string | 7 | 7 | 0 |
| api_response.faturamento_usina.Ciclo de Geração | string | 39 | 39 | 0 |
| api_response.faturamento_usina.Codigo Modelo | number | 46 | 46 | 0 |
| api_response.faturamento_usina.COFINS | number, string | 46 | 46 | 0 |
| api_response.faturamento_usina.CONSUMO NÃƒO COMPENSADO | string | 7 | 7 | 0 |
| api_response.faturamento_usina.CONSUMO NÃO COMPENSADO | string | 39 | 39 | 0 |
| api_response.faturamento_usina.Conta Data Vencimento | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Conta MÃªs Referencia | string | 7 | 7 | 0 |
| api_response.faturamento_usina.Conta Mês Referencia | string | 39 | 39 | 0 |
| api_response.faturamento_usina.Data Leitura Anterior | string | 7 | 7 | 0 |
| api_response.faturamento_usina.Data Leitura Atual | string | 7 | 7 | 0 |
| api_response.faturamento_usina.demonstrativo | map | 44 | 44 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento | map | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA | map | 44 | 44 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS | map | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Custo total | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Preço unitário | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.QTD (kWh) | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA.Custo total | string | 44 | 44 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA.preco | string | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA.Preço unitário | string | 44 | 44 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA.total | string | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENCARGOS REDE (FIO B) | map | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENCARGOS REDE (FIO B).Custo total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENCARGOS REDE (FIO B).preco | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENCARGOS REDE (FIO B).Preço unitário | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENCARGOS REDE (FIO B).QTD (kWh) | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENCARGOS REDE (FIO B).total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA COMPENSADA | map | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA COMPENSADA._obs | string | 13 | 13 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Custo total | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA COMPENSADA.preco | string | 27 | 27 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Preço unitário | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA COMPENSADA.QTD (kWh) | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA COMPENSADA.total | string | 27 | 27 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA | map | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Custo total | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Preço unitário | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.EQUATORIAL | map | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.EQUATORIAL.Custo total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.EQUATORIAL.Preço unitário | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.EQUATORIAL.QTD (kWh) | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.GOLDTECH | map | 19 | 19 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.GOLDTECH._obs | string | 19 | 19 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.GOLDTECH.Custo total | string | 19 | 19 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.GOLDTECH.Preço unitário | string | 19 | 19 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.GOLDTECH.QTD (kWh) | string | 19 | 19 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.IMPOSTOS SCEE (PIS/COFINS/ICMS) | map | 6 | 6 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.IMPOSTOS SCEE (PIS/COFINS/ICMS).Custo total | string | 6 | 6 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.IMPOSTOS SCEE (PIS/COFINS/ICMS).preco | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.IMPOSTOS SCEE (PIS/COFINS/ICMS).Preço unitário | string | 6 | 6 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.IMPOSTOS SCEE (PIS/COFINS/ICMS).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.IMPOSTOS SCEE (PIS/COFINS/ICMS).total | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS | map | 36 | 36 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (BANDEIRA NC) | map | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (BANDEIRA NC).Custo total | string | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (BANDEIRA NC).preco | string | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (BANDEIRA NC).Preço unitário | string | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (BANDEIRA NC).QTD (kWh) | string | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (BANDEIRA NC).total | string | 10 | 10 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS E MULTAS) | map | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS E MULTAS).Custo total | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS E MULTAS).Preço unitário | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS E MULTAS).QTD (kWh) | string | 2 | 2 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS/MULTAS/SERVIÇOS) | map | 8 | 8 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS/MULTAS/SERVIÇOS).Custo total | string | 8 | 8 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS/MULTAS/SERVIÇOS).Preço unitário | string | 8 | 8 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS (JUROS/MULTAS/SERVIÇOS).QTD (kWh) | string | 8 | 8 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS.Custo total | string | 36 | 36 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS.Preço unitário | string | 36 | 36 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.OUTROS.QTD (kWh) | string | 36 | 36 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA | map | 34 | 34 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 34 | 34 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 34 | 34 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 34 | 34 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TOTAL A PAGAR | map | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TOTAL A PAGAR.Custo total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TOTAL A PAGAR.Preço unitário | string | 17 | 17 | 0 |
| api_response.faturamento_usina.Demonstrativo de funcionamento.TOTAL A PAGAR.QTD (kWh) | string | 17 | 17 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL | map | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Custo total | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Preço unitário | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ FIO B | map | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ FIO B.Custo total | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ FIO B.Preço unitário | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ FIO B.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ ICMS | map | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ ICMS.Custo total | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ ICMS.Preço unitário | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ ICMS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ OUTROS IMPOSTOS | map | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ OUTROS IMPOSTOS.Custo total | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ OUTROS IMPOSTOS.Preço unitário | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ OUTROS IMPOSTOS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ PIS/COFINS | map | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ PIS/COFINS.Custo total | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ PIS/COFINS.Preço unitário | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.  ↳ PIS/COFINS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.ADICIONAIS DE BANDEIRA | map | 43 | 43 | 0 |
| api_response.faturamento_usina.demonstrativo.ADICIONAIS DE BANDEIRA.Custo total | string | 43 | 43 | 0 |
| api_response.faturamento_usina.demonstrativo.ADICIONAIS DE BANDEIRA.preco | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.ADICIONAIS DE BANDEIRA.Preço unitário | string | 43 | 43 | 0 |
| api_response.faturamento_usina.demonstrativo.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 43 | 43 | 0 |
| api_response.faturamento_usina.demonstrativo.ADICIONAIS DE BANDEIRA.total | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS (FIO B + IMPOSTOS) | map | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Custo total | string | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Preço unitário | string | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS REDE (FIO B) | map | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS REDE (FIO B).Custo total | string | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS REDE (FIO B).preco | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS REDE (FIO B).Preço unitário | string | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS REDE (FIO B).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.faturamento_usina.demonstrativo.ENCARGOS REDE (FIO B).total | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA COMPENSADA | map | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA COMPENSADA._obs | string | 13 | 13 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA COMPENSADA.Custo total | string | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA COMPENSADA.preco | string | 26 | 26 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA COMPENSADA.Preço unitário | string | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA COMPENSADA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA COMPENSADA.total | string | 26 | 26 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA NÃO COMPENSADA | map | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA NÃO COMPENSADA.Custo total | string | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA NÃO COMPENSADA.Preço unitário | string | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.faturamento_usina.demonstrativo.EQUATORIAL | map | 14 | 14 | 0 |
| api_response.faturamento_usina.demonstrativo.EQUATORIAL.Custo total | string | 14 | 14 | 0 |
| api_response.faturamento_usina.demonstrativo.EQUATORIAL.Preço unitário | string | 14 | 14 | 0 |
| api_response.faturamento_usina.demonstrativo.EQUATORIAL.QTD (kWh) | string | 14 | 14 | 0 |
| api_response.faturamento_usina.demonstrativo.GOLDTECH | map | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.GOLDTECH._obs | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.GOLDTECH.Custo total | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.GOLDTECH.Preço unitário | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.GOLDTECH.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS | map | 23 | 23 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (BANDEIRA NC) | map | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (BANDEIRA NC).Custo total | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (BANDEIRA NC).preco | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (BANDEIRA NC).Preço unitário | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (BANDEIRA NC).QTD (kWh) | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (BANDEIRA NC).total | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS) | map | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Custo total | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Preço unitário | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).QTD (kWh) | string | 21 | 21 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS.Custo total | string | 23 | 23 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS.Preço unitário | string | 23 | 23 | 0 |
| api_response.faturamento_usina.demonstrativo.OUTROS.QTD (kWh) | string | 23 | 23 | 0 |
| api_response.faturamento_usina.demonstrativo.RETROATIVO (Desconsiderado) | map | 1 | 1 | 0 |
| api_response.faturamento_usina.demonstrativo.RETROATIVO (Desconsiderado).Custo total | string | 1 | 1 | 0 |
| api_response.faturamento_usina.demonstrativo.RETROATIVO (Desconsiderado).Preço unitário | string | 1 | 1 | 0 |
| api_response.faturamento_usina.demonstrativo.RETROATIVO (Desconsiderado).QTD (kWh) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA | map | 41 | 41 | 0 |
| api_response.faturamento_usina.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 41 | 41 | 0 |
| api_response.faturamento_usina.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 41 | 41 | 0 |
| api_response.faturamento_usina.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 41 | 41 | 0 |
| api_response.faturamento_usina.demonstrativo.TOTAL A PAGAR | map | 14 | 14 | 0 |
| api_response.faturamento_usina.demonstrativo.TOTAL A PAGAR.Custo total | string | 14 | 14 | 0 |
| api_response.faturamento_usina.demonstrativo.TOTAL A PAGAR.Preço unitário | string | 14 | 14 | 0 |
| api_response.faturamento_usina.demonstrativo.TOTAL A PAGAR.QTD (kWh) | string | 14 | 14 | 0 |
| api_response.faturamento_usina.ENERGIA COMPENSADA INJEÃ‡ÃƒO SCEE (kWh) | string | 7 | 7 | 0 |
| api_response.faturamento_usina.ENERGIA COMPENSADA INJEÇÃO SCEE (kWh) | string | 39 | 39 | 0 |
| api_response.faturamento_usina.energia_compensada_kwh | number | 15 | 15 | 0 |
| api_response.faturamento_usina.excedente recebido no mÃªs | string | 7 | 7 | 0 |
| api_response.faturamento_usina.excedente recebido no mês | string | 39 | 39 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA | map | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw | map | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.consumoNC | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.consumoTotal | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.economiaReal | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.energiaCompensada | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.excedenteRecebido | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.saldoAnterior | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.saldoAtual | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.tarifaGoldtech | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.totalPagar | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA._raw.valorGoldtech | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh) | map | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Consumo Total | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Energia Compensada | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Energia Não Compensada | number, string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Excedente Recebido | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Saldo Anterior | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.1. RESUMO DE ENERGIA (kWh).Saldo Atualizado | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO | map | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL | map | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Adicionais de Bandeira | string | 11 | 11 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Créditos / Ajustes de Faturamento | string | 11 | 11 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Detalhamento | string | 13 | 13 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Energia Não Compensada | string | 11 | 11 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.EQUATORIAL | string | 34 | 34 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Iluminação Pública (CIP/COSIP) | string | 11 | 11 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Impostos SCEE (Encargos Redes) | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 1 | string | 21 | 21 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 2 | string | 21 | 21 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 3 | string | 21 | 21 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 4 | string | 21 | 21 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.TOTAL EQUATORIAL | string | 11 | 11 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH | map | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH._obs | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Bruto (com desc. 20%) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Detalhamento | string | 34 | 34 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.GOLDTECH | string | 34 | 34 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.total | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (a pagar) | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (Líquido) | string | 11 | 11 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Unitário (Líquido) | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.3. TOTAL E ECONOMIA | map | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.3. TOTAL E ECONOMIA.ECONOMIA REAL | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.3. TOTAL E ECONOMIA.Tarifa Referencia | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.3. TOTAL E ECONOMIA.TOTAL A PAGAR | number | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Address | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Ciclo de Geração | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Codigo Modelo | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.COFINS | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.CONSUMO NÃO COMPENSADO | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Conta Data Vencimento | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Conta Mês Referencia | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo | map | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento | map | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS | map | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Custo total | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Preço unitário | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA | map | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Custo total | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Preço unitário | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA COMPENSADA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA | map | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Custo total | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Preço unitário | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS | map | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS.Custo total | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS.Preço unitário | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.OUTROS.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA | map | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA | map | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.Custo total | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.preco | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.Preço unitário | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ADICIONAIS DE BANDEIRA.total | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B) | map | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).Custo total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).preco | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).Preço unitário | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).QTD (kWh) | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENCARGOS REDE (FIO B).total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA | map | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA._obs | string | 13 | 13 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.Custo total | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.preco | string | 27 | 27 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.Preço unitário | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA COMPENSADA.total | string | 27 | 27 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA | map | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA.Custo total | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA.Preço unitário | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 44 | 44 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.EQUATORIAL | map | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.EQUATORIAL.Custo total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.EQUATORIAL.Preço unitário | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.EQUATORIAL.QTD (kWh) | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.GOLDTECH | map | 19 | 19 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.GOLDTECH._obs | string | 19 | 19 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.GOLDTECH.Custo total | string | 19 | 19 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.GOLDTECH.Preço unitário | string | 19 | 19 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.GOLDTECH.QTD (kWh) | string | 19 | 19 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS) | map | 6 | 6 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Custo total | string | 6 | 6 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).preco | string | 2 | 2 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).Preço unitário | string | 6 | 6 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.IMPOSTOS SCEE (PIS/COFINS/ICMS).total | string | 2 | 2 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS | map | 34 | 34 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC) | map | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).Custo total | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).preco | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).Preço unitário | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).QTD (kWh) | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (BANDEIRA NC).total | string | 10 | 10 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS E MULTAS) | map | 2 | 2 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS E MULTAS).Custo total | string | 2 | 2 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS E MULTAS).Preço unitário | string | 2 | 2 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS E MULTAS).QTD (kWh) | string | 2 | 2 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS) | map | 8 | 8 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Custo total | string | 8 | 8 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Preço unitário | string | 8 | 8 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).QTD (kWh) | string | 8 | 8 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS.Custo total | string | 34 | 34 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS.Preço unitário | string | 34 | 34 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.OUTROS.QTD (kWh) | string | 34 | 34 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA | map | 32 | 32 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 32 | 32 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 32 | 32 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 32 | 32 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR | map | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR.Custo total | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR.Preço unitário | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.demonstrativo.TOTAL A PAGAR.QTD (kWh) | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.ENERGIA COMPENSADA INJEÇÃO SCEE (kWh) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.excedente recebido no mês | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.ICMS | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.identificacao | map | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.identificacao.justificativa | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.identificacao.label | string | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.identificacao.modelo | number | 17 | 17 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.ILUM. PÚBLICA | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.JUROS | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Justificativa Modelo | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Modelo Identificado | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.MULTA | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Nome | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.PIS | number | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Preço Unit (R$) Com Tributos CONSUMO NÃO COMPENSADO (Com PIS/COFINS e ICMS) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Preço Unit (R$) Com Tributos CONSUMO SCEE | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Preço Unit (R$) Com Tributos INJEÇÃO SCEE | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Produção Atual | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Saldo Acumulado | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Saldo Anterior | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Tar. De FIO B | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Tarifa Do Ad. De Band. 1 Com impostos | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Tarifa Do Ad. De Band. 2 Com impostos | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Tarifa Unit (R$) Consumo Não Compensado (Sem PIS/COFINS e ICMS) | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.UC | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.UC da geradora | string | 1 | 1 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.VALOR SEM SOLAR | map | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.VALOR SEM SOLAR._fonte | string | 28 | 28 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.VALOR SEM SOLAR.Energia (sem solar) | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.VALOR SEM SOLAR.Ilum. Pública (CIP/COSIP) | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.VALOR SEM SOLAR.Total | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.VALOR SEM SOLAR.Você pagaria esse mês o valor de | string | 45 | 45 | 0 |
| api_response.faturamento_usina.FATURA CALCULADA.Valor Total FIO B | string | 1 | 1 | 0 |
| api_response.faturamento_usina.ICMS | number, string | 46 | 46 | 0 |
| api_response.faturamento_usina.identificacao | map | 5 | 5 | 0 |
| api_response.faturamento_usina.identificacao.justificativa | string | 5 | 5 | 0 |
| api_response.faturamento_usina.identificacao.label | string | 5 | 5 | 0 |
| api_response.faturamento_usina.identificacao.modelo | number | 5 | 5 | 0 |
| api_response.faturamento_usina.ILUM. PÃšBLICA | string | 7 | 7 | 0 |
| api_response.faturamento_usina.ILUM. PÚBLICA | string | 39 | 39 | 0 |
| api_response.faturamento_usina.invoice_value | number | 10 | 10 | 0 |
| api_response.faturamento_usina.JUROS | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Justificativa Modelo | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Modelo Identificado | string | 46 | 46 | 0 |
| api_response.faturamento_usina.MULTA | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Nome | string | 46 | 46 | 0 |
| api_response.faturamento_usina.pdfUrl | string | 45 | 45 | 0 |
| api_response.faturamento_usina.PIS | number, string | 46 | 46 | 0 |
| api_response.faturamento_usina.PreÃ§o Unit (R$) Com Tributos CONSUMO NÃƒO COMPENSADO (Com PIS/COFINS e ICMS) | string | 7 | 7 | 0 |
| api_response.faturamento_usina.PreÃ§o Unit (R$) Com Tributos CONSUMO SCEE | string | 7 | 7 | 0 |
| api_response.faturamento_usina.PreÃ§o Unit (R$) Com Tributos INJEÃ‡ÃƒO SCEE | string | 7 | 7 | 0 |
| api_response.faturamento_usina.Preço Unit (R$) Com Tributos CONSUMO NÃO COMPENSADO (Com PIS/COFINS e ICMS) | string | 39 | 39 | 0 |
| api_response.faturamento_usina.Preço Unit (R$) Com Tributos CONSUMO SCEE | string | 39 | 39 | 0 |
| api_response.faturamento_usina.Preço Unit (R$) Com Tributos INJEÇÃO SCEE | string | 39 | 39 | 0 |
| api_response.faturamento_usina.ProduÃ§Ã£o Atual | string | 7 | 7 | 0 |
| api_response.faturamento_usina.Produção Atual | string | 39 | 39 | 0 |
| api_response.faturamento_usina.Saldo Acumulado | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Saldo Anterior | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Tar. De FIO B | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Tarifa Do Ad. De Band. 1 Com impostos | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Tarifa Do Ad. De Band. 2 Com impostos | string | 46 | 46 | 0 |
| api_response.faturamento_usina.Tarifa Unit (R$) Consumo NÃ£o Compensado (Sem PIS/COFINS e ICMS) | string | 7 | 7 | 0 |
| api_response.faturamento_usina.Tarifa Unit (R$) Consumo Não Compensado (Sem PIS/COFINS e ICMS) | string | 39 | 39 | 0 |
| api_response.faturamento_usina.Total a Pagar | number | 45 | 45 | 0 |
| api_response.faturamento_usina.UC | string | 46 | 46 | 0 |
| api_response.faturamento_usina.UC da geradora | string | 46 | 46 | 0 |
| api_response.faturamento_usina.VALOR SEM SOLAR | map | 45 | 45 | 0 |
| api_response.faturamento_usina.VALOR SEM SOLAR._fonte | string | 28 | 28 | 0 |
| api_response.faturamento_usina.VALOR SEM SOLAR.Energia (sem solar) | string | 45 | 45 | 0 |
| api_response.faturamento_usina.VALOR SEM SOLAR.Ilum. Pública (CIP/COSIP) | string | 45 | 45 | 0 |
| api_response.faturamento_usina.VALOR SEM SOLAR.Total | string | 45 | 45 | 0 |
| api_response.faturamento_usina.VALOR SEM SOLAR.Você pagaria esse mês o valor de | string | 45 | 45 | 0 |
| api_response.faturamento_usina.Valor Total FIO B | string | 46 | 46 | 0 |
| api_response.faturamento_usina.valor_credito_bruto_reais | number | 15 | 15 | 0 |
| api_response.faturamento_usina.valor_desconto_cliente_reais | number | 15 | 15 | 0 |
| api_response.faturamento_usina.valor_final_a_faturar_reais | number | 15 | 15 | 0 |
| api_response.faturamento_usina.valor_total | number | 1 | 1 | 0 |
| api_response.financeiro | map | 34 | 34 | 0 |
| api_response.financeiro.desconto | number | 34 | 34 | 0 |
| api_response.financeiro.economia | number | 34 | 34 | 0 |
| api_response.financeiro.tarifaCheia | number | 34 | 34 | 0 |
| api_response.financeiro.tarifaComDesconto | number | 34 | 34 | 0 |
| api_response.financeiro.valorEquatorial | number | 34 | 34 | 0 |
| api_response.financeiro.valorGoldtech | number | 34 | 34 | 0 |
| api_response.financeiro.valorTotal | number | 34 | 34 | 0 |
| api_response.full_result | map | 51 | 51 | 0 |
| api_response.full_result.caracteristicas | map | 6 | 6 | 0 |
| api_response.full_result.caracteristicas.consumoNaoCompensado | number | 6 | 6 | 0 |
| api_response.full_result.caracteristicas.descricao | string | 6 | 6 | 0 |
| api_response.full_result.caracteristicas.energiaCompensada | number | 6 | 6 | 0 |
| api_response.full_result.caracteristicas.percentualCompensado | number | 6 | 6 | 0 |
| api_response.full_result.caracteristicas.tipo | string | 6 | 6 | 0 |
| api_response.full_result.confianca | number | 6 | 6 | 0 |
| api_response.full_result.dados_extraidos | map | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.address | string | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.ajustes | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.ajustes_breakdown | null, string | 51 | 4 | 47 |
| api_response.full_result.dados_extraidos.bandeira_1 | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.bandeira_2 | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.ciclo_geracao | string | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.cofins_aliq | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.compensated_energy | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.compensated_energy_breakdown | null, string | 51 | 45 | 6 |
| api_response.full_result.dados_extraidos.consumer_unit | string | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.data_leitura_anterior | string | 11 | 11 | 0 |
| api_response.full_result.dados_extraidos.data_leitura_atual | string | 11 | 11 | 0 |
| api_response.full_result.dados_extraidos.excedente_recebido | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.expiration_date | string | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.extraction_confidence | string | 6 | 6 | 0 |
| api_response.full_result.dados_extraidos.extraction_source | string | 6 | 6 | 0 |
| api_response.full_result.dados_extraidos.fioB | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.fioB_rate | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.icms_aliq | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.ICMS_SCEE | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.iluminacaoPublica | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.invoice_consume | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.invoice_value | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.is_baixa_renda | boolean | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.is_shared | boolean | 6 | 6 | 0 |
| api_response.full_result.dados_extraidos.juros | number | 6 | 6 | 0 |
| api_response.full_result.dados_extraidos.juros_multa | number | 45 | 45 | 0 |
| api_response.full_result.dados_extraidos.legal_name | string | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.measured_energy | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.month_reference | string | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.multa | number | 6 | 6 | 0 |
| api_response.full_result.dados_extraidos.outros | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.pis_aliq | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.PIS_COFINS_SCEE | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.retroativos | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.saldo_acumulado | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.saldo_anterior | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.saldo_pdf | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.status | string | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.Tarifa Do Ad. De Band. 1 Com impostos | number | 22 | 22 | 0 |
| api_response.full_result.dados_extraidos.tarifa_bandeira | number | 22 | 22 | 0 |
| api_response.full_result.dados_extraidos.tarifa_bandeira_base | number | 22 | 22 | 0 |
| api_response.full_result.dados_extraidos.tarifa_com_tributos | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.tarifa_nc_sem_tributos | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.tarifa_scee | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.tarifa_scee_inj | number | 51 | 51 | 0 |
| api_response.full_result.dados_extraidos.total_energy_ativa | number | 6 | 6 | 0 |
| api_response.full_result.dados_extraidos.uc_geradora | string | 51 | 51 | 0 |
| api_response.full_result.dadosExtraidos | map | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.consumoNaoCompensado | number | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.consumoTotal | number | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.cpfCnpj | string | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.endereco | string | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.energiaCompensada | number | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.ilumPublica | number | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.jurosMulta | number | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.mesReferencia | string | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.nome | string | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.tarifaComTributos | number | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.uc | string | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.valorTotal | number | 6 | 6 | 0 |
| api_response.full_result.dadosExtraidos.vencimento | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2 | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.caracteristicas | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.caracteristicas.consumoNaoCompensado | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.caracteristicas.energiaCompensada | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.caracteristicas.energiaInjetada | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.caracteristicas.saldoAnterior | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.consumoNaoCompensado | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.cpfCnpj | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.endereco | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.energiaCompensada | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.mesReferencia | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.nome | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.saldoAnterior | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.uc | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.valorTotal | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.dadosExtraidos.vencimento | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.info_fatura | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.info_fatura.endereco | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.info_fatura.mes_referencia | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.info_fatura.nome | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.info_fatura.uc | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.info_fatura.vencimento | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.modelo | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.modelo.id | number | 41 | 41 | 0 |
| api_response.full_result.fatura_calculada_v2.modelo.justificativa | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.modelo.modelo | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.modelo.nome | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro.desconto | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro.economia | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro.tarifaCheia | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro.tarifaComDesconto | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro.valorEquatorial | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro.valorGoldtech | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.splitFinanceiro.valorTotal | number | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada_v2.success | boolean | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada._raw | map | 2 | 2 | 0 |
| api_response.full_result.fatura_calculada._raw.consumoNC | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.consumoTotal | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.custoFioB | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.economiaReal | number | 2 | 2 | 0 |
| api_response.full_result.fatura_calculada._raw.energiaCompensada | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.excedenteRecebido | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.retroativos | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.saldoAnterior | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.saldoAtual | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.subtotalEquatorial | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.tarifaGoldtech | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.totalPagar | number | 2 | 2 | 0 |
| api_response.full_result.fatura_calculada._raw.valorGoldtech | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada._raw.valorGoldtechLiquido | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh) | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Consumo Total | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Compensada | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Energia Não Compensada | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Excedente Recebido | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Anterior | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.1. RESUMO DE ENERGIA (kWh).Saldo Atualizado | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Adicionais de Bandeira | string | 23 | 23 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Créditos / Ajustes de Faturamento | string | 23 | 23 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Detalhamento | string | 19 | 19 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Encargos Redes / Fio B | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Energia Não Compensada | string | 23 | 23 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.EQUATORIAL | string | 28 | 28 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Iluminação Pública (CIP/COSIP) | string | 23 | 23 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Impostos SCEE (Encargos Redes) | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 1 | string | 9 | 9 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 2 | string | 9 | 9 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 3 | string | 9 | 9 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.Linha 4 | string | 9 | 9 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À EQUATORIAL.TOTAL EQUATORIAL | string | 23 | 23 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH._obs | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Bruto (com desc. 20%) | string | 2 | 2 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Detalhamento | string | 28 | 28 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.GOLDTECH | string | 28 | 28 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.total | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (a pagar) | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.TOTAL GOLDTECH (Líquido) | string | 23 | 23 | 0 |
| api_response.full_result.fatura_calculada.2. DEMONSTRATIVO FINANCEIRO.PAGO À GOLDTECH.Unitário (Líquido) | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.3. TOTAL E ECONOMIA | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.3. TOTAL E ECONOMIA.ECONOMIA REAL | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.3. TOTAL E ECONOMIA.Tarifa Referencia | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.3. TOTAL E ECONOMIA.TOTAL A PAGAR | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.Address | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Ciclo de Geração | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Codigo Modelo | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.COFINS | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.CONSUMO NÃO COMPENSADO | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Conta Data Vencimento | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Conta Mês Referencia | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo | map | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento | map | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS | map | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Custo total | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.Preço unitário | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ADICIONAIS DE BANDEIRA NÃO COMPENSADOS.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA | map | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Custo total | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA.Preço unitário | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA COMPENSADA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA | map | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Custo total | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.Preço unitário | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.OUTROS | map | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.OUTROS.Custo total | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.OUTROS.Preço unitário | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.OUTROS.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA | map | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Demonstrativo de funcionamento.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL | map | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Custo total | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.Preço unitário | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ DEVOLUÇÃO DIC MENSAL.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ FIO B | map | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ FIO B.Custo total | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ FIO B.Preço unitário | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ FIO B.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ ICMS | map | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ ICMS.Custo total | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ ICMS.Preço unitário | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ ICMS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS | map | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS.Custo total | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS.Preço unitário | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ OUTROS IMPOSTOS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ PIS/COFINS | map | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ PIS/COFINS.Custo total | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ PIS/COFINS.Preço unitário | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.  ↳ PIS/COFINS.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA | map | 49 | 49 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Custo total | string | 49 | 49 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.preco | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.Preço unitário | string | 49 | 49 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.QTD (kWh) | string | 49 | 49 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ADICIONAIS DE BANDEIRA.total | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS) | map | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Custo total | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).Preço unitário | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS (FIO B + IMPOSTOS).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B) | map | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).Custo total | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).preco | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).Preço unitário | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).QTD (kWh) | string | 6 | 6 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENCARGOS REDE (FIO B).total | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA | map | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA._obs | string | 19 | 19 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Custo total | string | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.preco | string | 26 | 26 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.Preço unitário | string | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.QTD (kWh) | string | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA COMPENSADA.total | string | 26 | 26 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA | map | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Custo total | string | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.Preço unitário | string | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.ENERGIA NÃO COMPENSADA.QTD (kWh) | string | 50 | 50 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.EQUATORIAL | map | 20 | 20 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.EQUATORIAL.Custo total | string | 20 | 20 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.EQUATORIAL.Preço unitário | string | 20 | 20 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.EQUATORIAL.QTD (kWh) | string | 20 | 20 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.GOLDTECH | map | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.GOLDTECH._obs | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.GOLDTECH.Custo total | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.GOLDTECH.Preço unitário | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.GOLDTECH.QTD (kWh) | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS | map | 29 | 29 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC) | map | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).Custo total | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).preco | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).Preço unitário | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).QTD (kWh) | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (BANDEIRA NC).total | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS) | map | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Custo total | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).Preço unitário | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS (JUROS/MULTAS/SERVIÇOS).QTD (kWh) | string | 21 | 21 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS.Custo total | string | 29 | 29 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS.Preço unitário | string | 29 | 29 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.OUTROS.QTD (kWh) | string | 29 | 29 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado) | map | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado).Custo total | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado).Preço unitário | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.RETROATIVO (Desconsiderado).QTD (kWh) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA | map | 47 | 47 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Custo total | string | 47 | 47 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.Preço unitário | string | 47 | 47 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TAXA DE ILUMINAÇÃO PÚBLICA.QTD (kWh) | string | 47 | 47 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TOTAL A PAGAR | map | 14 | 14 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TOTAL A PAGAR.Custo total | string | 14 | 14 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TOTAL A PAGAR.Preço unitário | string | 14 | 14 | 0 |
| api_response.full_result.fatura_calculada.demonstrativo.TOTAL A PAGAR.QTD (kWh) | string | 14 | 14 | 0 |
| api_response.full_result.fatura_calculada.ENERGIA COMPENSADA INJEÇÃO SCEE (kWh) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.excedente recebido no mês | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.ICMS | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.identificacao | map | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.identificacao.justificativa | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.identificacao.label | string | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.identificacao.modelo | number | 5 | 5 | 0 |
| api_response.full_result.fatura_calculada.ILUM. PÚBLICA | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.JUROS | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Justificativa Modelo | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Modelo Identificado | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.MULTA | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Nome | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.PIS | number | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Preço Unit (R$) Com Tributos CONSUMO NÃO COMPENSADO (Com PIS/COFINS e ICMS) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Preço Unit (R$) Com Tributos CONSUMO SCEE | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Preço Unit (R$) Com Tributos INJEÇÃO SCEE | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Produção Atual | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Saldo Acumulado | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Saldo Anterior | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Tar. De FIO B | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Tarifa Do Ad. De Band. 1 Com impostos | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Tarifa Do Ad. De Band. 2 Com impostos | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.Tarifa Unit (R$) Consumo Não Compensado (Sem PIS/COFINS e ICMS) | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.UC | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.UC da geradora | string | 1 | 1 | 0 |
| api_response.full_result.fatura_calculada.VALOR SEM SOLAR | map | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.VALOR SEM SOLAR._fonte | string | 28 | 28 | 0 |
| api_response.full_result.fatura_calculada.VALOR SEM SOLAR.Energia (sem solar) | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.VALOR SEM SOLAR.Ilum. Pública (CIP/COSIP) | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.VALOR SEM SOLAR.Total | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.VALOR SEM SOLAR.Você pagaria esse mês o valor de | string | 51 | 51 | 0 |
| api_response.full_result.fatura_calculada.Valor Total FIO B | string | 1 | 1 | 0 |
| api_response.full_result.financeiro | map | 6 | 6 | 0 |
| api_response.full_result.financeiro.desconto | number | 6 | 6 | 0 |
| api_response.full_result.financeiro.economia | number | 6 | 6 | 0 |
| api_response.full_result.financeiro.tarifaCheia | number | 6 | 6 | 0 |
| api_response.full_result.financeiro.tarifaComDesconto | number | 6 | 6 | 0 |
| api_response.full_result.financeiro.valorEquatorial | number | 6 | 6 | 0 |
| api_response.full_result.financeiro.valorGoldtech | number | 6 | 6 | 0 |
| api_response.full_result.financeiro.valorTotal | number | 6 | 6 | 0 |
| api_response.full_result.info_fatura | map | 51 | 51 | 0 |
| api_response.full_result.info_fatura.endereco | string | 51 | 51 | 0 |
| api_response.full_result.info_fatura.mes_referencia | string | 51 | 51 | 0 |
| api_response.full_result.info_fatura.nome | string | 51 | 51 | 0 |
| api_response.full_result.info_fatura.uc | string | 51 | 51 | 0 |
| api_response.full_result.info_fatura.valor_total | number | 45 | 45 | 0 |
| api_response.full_result.info_fatura.vencimento | string | 51 | 51 | 0 |
| api_response.full_result.justificativa | string | 35 | 35 | 0 |
| api_response.full_result.modelo | number, string | 51 | 51 | 0 |
| api_response.full_result.modelo_identificado | string | 35 | 35 | 0 |
| api_response.full_result.modeloDetectado | string | 6 | 6 | 0 |
| api_response.full_result.originalPdfUrl | string | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro | map | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.desconto | number | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.economia | number | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.tarifaCheia | number | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.tarifaComDesconto | number | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.tarifaLiquidaGoldtech | number | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.valorEquatorial | number | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.valorGoldtech | number | 6 | 6 | 0 |
| api_response.full_result.splitFinanceiro.valorTotal | number | 6 | 6 | 0 |
| api_response.full_result.success | boolean | 51 | 51 | 0 |
| api_response.full_result.tarifas | map | 45 | 45 | 0 |
| api_response.full_result.tarifas.bandeira_1 | string | 45 | 45 | 0 |
| api_response.full_result.tarifas.bandeira_2 | string | 45 | 45 | 0 |
| api_response.full_result.tarifas.fio_b_rate | string | 45 | 45 | 0 |
| api_response.full_result.tarifas.tarifa_scee | string | 45 | 45 | 0 |
| api_response.full_result.tarifas.tarifa_scee_inj | string | 45 | 45 | 0 |
| api_response.info_fatura | map | 49 | 49 | 0 |
| api_response.info_fatura.endereco | string | 49 | 49 | 0 |
| api_response.info_fatura.mes_referencia | string | 49 | 49 | 0 |
| api_response.info_fatura.nome | string | 49 | 49 | 0 |
| api_response.info_fatura.uc | string | 49 | 49 | 0 |
| api_response.info_fatura.vencimento | string | 49 | 49 | 0 |
| api_response.invoice_value | number | 66 | 66 | 0 |
| api_response.legal_name | string | 117 | 117 | 0 |
| api_response.manual_layout_edited_at | string | 6 | 6 | 0 |
| api_response.manual_layout_overrides | map | 6 | 6 | 0 |
| api_response.manual_layout_overrides.ep_calc_com_energypay | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_calc_economia_total | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_calc_sem_energypay | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_cliente | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_cpf | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_economia_mes | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_endereco | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_energia_compensada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_energia_compensada_sem_ep | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_energia_nao_compensada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_fatura_ep | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_fatura_ep_linha | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_instalacao | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_referencia | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_tarifa_sem_energypay | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_tarifa_total | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_total_com_energypay | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_valor_energia_compensada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_valor_nao_compensada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_valor_sem_energypay | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_valor_sem_energypay_total | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.ep_valor_total | string | 2 | 2 | 0 |
| api_response.manual_layout_overrides.ep_vencimento | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_ajustes_tributario_imposto_nao_identificado | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_base_calc_icms_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_base_calc_icms_injecao_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_base_calc_pis_cofins_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_ciclo_de_geracao | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_cofins | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_consumo_nao_compensado | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_conta_data_vencimento | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_conta_mes_referencia | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_custos_totais_pis_cofins_icms | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_custos_totais_pis_cofins_icms_ajustes_tributario | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_custos_totais_pis_cofins_icms_ajustes_tributario_fio_b | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_diferenca_icms_cobrado_consumo_scee_descontado_injecao_scee | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_energia_compensada_injecao_scee_kwh | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_excedente_recebido_no_mes | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_icms | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_ilum_publica | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_juros | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_multa | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_nome | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_pis | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_preco_unit_com_tributos_consumo_nao_compensado | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_preco_unit_com_tributos_consumo_scee | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_preco_unit_com_tributos_injecao_scee | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_saldo_acumulado | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_tar_de_fio_b | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_tar_de_icms | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_tar_de_pis_cofins | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_tarifa_ad_band_1_com_impostos | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_tarifa_ad_band_2_com_impostos | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_tarifa_unit_consumo_nao_compensado_sem_pis_cofins_icms | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_tributos_nao_identificado | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_uc | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_valor_icms_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_valor_icms_injecao_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_valor_pis_cofins_consumo_scee_energia_injetada | string | 4 | 4 | 0 |
| api_response.manual_layout_overrides.eq_valor_total_fio_b | string | 4 | 4 | 0 |
| api_response.modelo | map, number, string | 113 | 113 | 0 |
| api_response.modelo.id | number | 4 | 4 | 0 |
| api_response.modelo.justificativa | string | 15 | 15 | 0 |
| api_response.modelo.modelo | number | 15 | 15 | 0 |
| api_response.modelo.nome | string | 15 | 15 | 0 |
| api_response.modeloDetectado | string | 34 | 34 | 0 |
| api_response.month_reference | string | 24 | 24 | 0 |
| api_response.nome | string | 4 | 4 | 0 |
| api_response.originalPdfUrl | string | 49 | 49 | 0 |
| api_response.referencia | string | 97 | 97 | 0 |
| api_response.splitFinanceiro | map | 100 | 100 | 0 |
| api_response.splitFinanceiro.desconto | number | 100 | 100 | 0 |
| api_response.splitFinanceiro.economia | number | 100 | 100 | 0 |
| api_response.splitFinanceiro.tarifaCheia | number | 100 | 100 | 0 |
| api_response.splitFinanceiro.tarifaComDesconto | number | 100 | 100 | 0 |
| api_response.splitFinanceiro.tarifaLiquidaGoldtech | number | 40 | 40 | 0 |
| api_response.splitFinanceiro.valorEquatorial | number | 100 | 100 | 0 |
| api_response.splitFinanceiro.valorGoldtech | number | 100 | 100 | 0 |
| api_response.splitFinanceiro.valorSemEnergyPay | number | 4 | 4 | 0 |
| api_response.splitFinanceiro.valorTotal | number | 100 | 100 | 0 |
| api_response.success | boolean | 49 | 49 | 0 |
| api_response.tarifa_com_tributos | number | 9 | 9 | 0 |
| api_response.tarifa_total | number | 4 | 4 | 0 |
| api_response.uc | string | 50 | 50 | 0 |
| api_response.valor_sem_energypay | number | 102 | 102 | 0 |
| api_response.valor_total | number | 97 | 97 | 0 |
| api_response.valor_total_com_energypay | number | 4 | 4 | 0 |
| api_response.valor_total_energypay | number | 11 | 11 | 0 |
| api_response.vencimento | string | 4 | 4 | 0 |
| compensated_energy | number | 161 | 161 | 0 |
| created_at | map, string | 161 | 161 | 0 |
| created_at._methodName | string | 115 | 115 | 0 |
| discount_percentage | number | 161 | 161 | 0 |
| expiration_date | string | 161 | 161 | 0 |
| invoice_value | number | 161 | 161 | 0 |
| legal_name | string | 161 | 161 | 0 |
| month_reference | string | 161 | 161 | 0 |
| subscriber_id | null, string | 161 | 131 | 30 |
| tarifa_com_tributos | number | 161 | 161 | 0 |
| uc | string | 161 | 161 | 0 |
| updated_at | map, string | 161 | 161 | 0 |
| updated_at._methodName | string | 115 | 115 | 0 |
| user_id | string | 161 | 161 | 0 |

### Colecao: payment_data

- ID da colecao: payment_data
- Quantidade de documentos: 6
- Quantidade de campos unicos: 20

#### Document IDs

- 3wDyL1eZ0Cb91ULps1vY
- SvnjCGGEoPDD2qvls3IA
- aacsrg1ryHUp1bm78Zx2
- cYat4HO0BIZsRtlnwcm8
- jHFxfgIXDRM4vZHijK5s
- v4XAo1zkbSxpR7dAOWWW

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| asaas_boleto_charge_id | string | 6 | 6 | 0 |
| asaas_customer_id | string | 6 | 6 | 0 |
| asaas_pix_charge_id | string | 6 | 6 | 0 |
| boleto_barcode | string | 6 | 6 | 0 |
| boleto_identification_field | string | 6 | 6 | 0 |
| boleto_nosso_numero | string | 6 | 6 | 0 |
| created_at | string | 6 | 6 | 0 |
| document | string | 6 | 6 | 0 |
| due_date | string | 6 | 6 | 0 |
| fatura_id | string | 5 | 5 | 0 |
| fatura_validacao_id | string | 6 | 6 | 0 |
| invoice_value | number | 6 | 6 | 0 |
| month_reference | string | 6 | 6 | 0 |
| pix_payload | string | 6 | 6 | 0 |
| pix_qr_code | string | 6 | 6 | 0 |
| subscriber_id | string | 6 | 6 | 0 |
| uc | string | 6 | 6 | 0 |
| unique_charge_id | string | 6 | 6 | 0 |
| updated_at | string | 6 | 6 | 0 |
| user_id | string | 6 | 6 | 0 |

### Colecao: system_settings

- ID da colecao: system_settings
- Quantidade de documentos: 2
- Quantidade de campos unicos: 20

#### Document IDs

- global_settings
- robot_config

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| daemon_active | boolean | 1 | 1 | 0 |
| daemon_heartbeat_at | string | 1 | 1 | 0 |
| daemon_instance_id | string | 1 | 1 | 0 |
| daemon_lock_file | string | 1 | 1 | 0 |
| daemon_pid | number | 1 | 1 | 0 |
| daemon_started_at | string | 1 | 1 | 0 |
| daemon_stop_reason | string | 1 | 1 | 0 |
| daemon_stopped_at | string | 1 | 1 | 0 |
| evolution_api_key | string | 1 | 1 | 0 |
| evolution_api_url | string | 1 | 1 | 0 |
| evolution_instance_name | string | 1 | 1 | 0 |
| fixed_base_tariff_no_taxes_gd2_full_compensation | number | 1 | 1 | 0 |
| isPaused | boolean | 1 | 1 | 0 |
| isRunning | boolean | 1 | 1 | 0 |
| last_run_at | null | 1 | 0 | 1 |
| next_run_at | string | 1 | 1 | 0 |
| next_subscriber_name | string | 1 | 1 | 0 |
| pausedUntil | null | 1 | 0 | 1 |
| status_message | string | 1 | 1 | 0 |
| updatedAt | string | 1 | 1 | 0 |

### Colecao: tarifas_referencia

- ID da colecao: tarifas_referencia
- Quantidade de documentos: 12
- Quantidade de campos unicos: 4

#### Document IDs

- 4fSTXWqAyekzGk3Ehdue
- 65M3z0EtGXrg7vV2AgPD
- HNQUjGFZknwLZHmQ1kz5
- RVetmFSqdRDlpG3gQlIo
- UWAqyhGDtkHCUxCG0rZo
- W4Wg5qRXx4ut7dKXKRK4
- aX9VcyysDa77m9y1NMrE
- hFSWsBliOI04I4JC26Bz
- ha4MmCAWtl3qEtLApQHJ
- iRXHG108N0oKnOrKdXT3
- olIxnrByeDyup6RWCwQv
- tdEf7e8l6qxukX8NFjv8

#### Campos (schema observado em 100% dos documentos desta colecao)

| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |
|---|---|---:|---:|---:|
| createdAt | timestamp | 12 | 12 | 0 |
| dataInicio | timestamp | 12 | 12 | 0 |
| mesReferencia | string | 12 | 12 | 0 |
| valor | number | 12 | 12 | 0 |

## Observacoes Tecnicas

- Este documento foi gerado via leitura direta de todos os documentos encontrados no Firestore no momento da execucao.
- Tipos em Firestore sao inferidos pelos valores efetivamente armazenados.
- Um mesmo campo pode aparecer com tipos diferentes entre documentos.
- Campos aninhados sao exibidos em notacao de ponto (ex.: `owner.address.cep`).
- Arrays sao representados com sufixo `[]` para os tipos dos itens (ex.: `items[]`).
