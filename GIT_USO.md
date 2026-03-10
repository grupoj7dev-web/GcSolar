# Guia Git (GcSolar)

Este guia explica o fluxo básico para atualizar o projeto com segurança.

## 1) Verificar status

```
git status -sb
```

## 2) Ver diferenças

```
git diff
```

## 3) Adicionar arquivos

```
git add caminho/do/arquivo
```

## 4) Commit

```
git commit -m "descrição curta e objetiva"
```

## 5) Enviar para o GitHub

```
git push origin main
```

## Observações de segurança

- Não salve tokens ou senhas em arquivos `.md`.
- Se precisar de autenticação, use o login via `gh auth login` ou variáveis de ambiente temporárias.

## Submódulo/Repo interno (referenciacores)

Se você alterar o conteúdo de `referenciacores`, confirme se o commit foi feito naquele repositório e depois atualize o ponteiro no repositório principal.

```
cd referenciacores
# faça commit e push
cd ..
# atualize o ponteiro no repo principal
```
