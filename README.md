# Um convite para Glória Godart ❤️

Site estático (HTML + CSS + JavaScript puro), pronto pro GitHub Pages.

```
index.html        estrutura das telas (convite, catálogo, recusa, modal)
style.css         identidade visual e animações
script.js         configuração, atividades, mensagens e interações
assets/favicon.svg
```

## Personalizar

Tudo fica no começo do `script.js`:

- `CONFIG.whatsappNumber`: número no formato internacional, só dígitos (`5511979938429`).
  Se ficar vazio, o site mostra um aviso em vez de gerar um link quebrado.
- `CONFIG.myName` / `CONFIG.herName`: nomes exibidos.
- `CONFIG.noMaxEscapes`: quantas vezes o botão NÃO foge antes de se cansar.
- `ACTIVITIES`: lista de ideias. Cada uma tem `id`, `title`, `punch`, `description`,
  `fine`, `message` (texto do WhatsApp), `art` e `tint`. Pra adicionar uma ideia,
  copie um bloco, troque o `id` e os textos e escolha uma ilustração existente em `ART`.

## Testar no Windows

Abrir o `index.html` com dois cliques já funciona. Pra testar como no GitHub Pages,
abra um terminal na pasta e rode:

```bash
npx --yes http-server -p 8080 -c-1
```

Depois acesse http://localhost:8080. Pra simular o celular: F12 → ícone de celular (Ctrl+Shift+M).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `convite`).
2. Envie os arquivos (pelo site: "Add file → Upload files", ou pelo git):
   ```bash
   git init
   git add .
   git commit -m "Convite"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/convite.git
   git push -u origin main
   ```
3. No repositório: Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)` → Save.
4. Em 1–2 minutos o site fica em `https://SEU-USUARIO.github.io/convite/`.

## Atualizar

Edite os arquivos e rode:

```bash
git add .
git commit -m "Atualiza convite"
git push
```

O GitHub Pages republica sozinho em cerca de um minuto. Se não aparecer, atualize com Ctrl+F5.
