# Handoff de Contexto para Continuidade em Outra IA

Gerado em: 2026-03-08

## 1) Estado atual do workspace

- Pasta raiz: `C:\Users\danil\OneDrive\Área de Trabalho\novogcsolar`
- Projeto Git (landing): `C:\Users\danil\OneDrive\Área de Trabalho\novogcsolar\referenciacores`
- Documentação completa do Firestore: `C:\Users\danil\OneDrive\Área de Trabalho\novogcsolar\FIRESTORE_BANCO_COMPLETO.md`
- Relatório técnico JSON do Firestore: `C:\Users\danil\OneDrive\Área de Trabalho\novogcsolar\.firebase-audit\firestore-full-report.json`

## 2) Git hoje

Repositório: `referenciacores`

- Branch atual: `main`
- Status: limpo (sem alterações locais nesse repo)
- Tracking: `main...origin/main`
- Remote origin (fetch/push): `https://github.com/grupoj7dev-web/gcsolar-landing-page.git`

Últimos commits:

1. `8989d5f` fix: enforce non-interactive SSH with CI key
2. `c62ba88` fix: make SSH deploy resilient in CI
3. `e96a73b` fix: pass SSH_TARGET_DIR to stack deploy step
4. `3bf4d86` feat: deploy landing to Docker Swarm via SSH
5. `8a0f6aa` chore: add GitHub Pages deploy and optional SSH deploy

## 3) Firebase / banco

Credencial usada para mapear o Firestore:

- `C:\Users\danil\OneDrive\Área de Trabalho\novogcsolar\gcredito-firebase-adminsdk-fbsvc-6aaab7801a.json`

Observação:

- Este arquivo contém credencial administrativa do Firebase (service account).
- Tratar como segredo sensível.

## 4) VPS e deploy

O pipeline de deploy por SSH está em:

- `C:\Users\danil\OneDrive\Área de Trabalho\novogcsolar\referenciacores\.github\workflows\deploy.yml`

Secrets esperados no GitHub Actions:

1. `SSH_HOST`
2. `SSH_USER`
3. `SSH_PRIVATE_KEY`
4. `SSH_PORT`
5. `SSH_TARGET_DIR`

Estado local detectado (nesta máquina):

- `~/.ssh/config`: não existe
- Chaves privadas em `~/.ssh`: não encontradas
- Variáveis de ambiente com credenciais SSH/VPS: não encontradas

Conclusão:

- As credenciais reais de VPS não estão gravadas em arquivo local neste workspace.
- Elas provavelmente estão apenas nos `GitHub Secrets` do repositório.

## 5) Como continuar desenvolvimento rápido

1. Usar `FIRESTORE_BANCO_COMPLETO.md` como base de modelagem de dados.
2. Se precisar de deploy automático na VPS, recuperar os valores dos secrets no GitHub.
3. Manter a credencial Firebase admin fora do git e fora de compartilhamento público.

## 6) Credenciais VPS (informadas manualmente)

- IP: `31.97.84.89`
- Usuário: `root`
- Senha: `Destruidor007!!`

Observação:

- Credenciais sensíveis. Evitar versionar em Git e evitar compartilhar em canais públicos.
