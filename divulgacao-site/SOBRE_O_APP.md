# Tá Safo — tudo sobre o app

> Material de apoio para o site. Prints, vídeos e textos gerados a partir do app
> real rodando no simulador do iPhone 17 Pro Max (versão 1.3.0), em 30/09/2026.

---

## 1. Em uma frase

**O Tá Safo é o parceiro de bolso do agente de trânsito: consulta rápida do CTB,
orientações de quando autuar e quando não autuar, e um assistente com
inteligência artificial que enquadra a situação que o agente descreve.**

Frases curtas para usar no site (sugestões):

- "Descreva a abordagem. Receba o enquadramento."
- "Todo o CTB no bolso — com orientação de quem fiscaliza."
- "Quando autuar, quando não autuar e o que escrever no AIT."
- "Consulta em segundos, na rua, no meio da abordagem."

---

## 2. Para quem é

- **Agentes de trânsito** municipais e estaduais.
- **Policiais militares** que fazem fiscalização de trânsito.
- **Policiais rodoviários** e demais profissionais que lavram auto de infração.
- Estudantes de concursos da área e instrutores que precisam do CTB organizado.

O app foi pensado para ser usado **na rua**: telas limpas, letras grandes,
busca por código, artigo ou palavra, e respostas diretas.

---

## 3. Números do app

| | |
|---|---|
| **414** | infrações do CTB, cada uma com ficha completa |
| **3.295** | orientações de fiscalização ("autuar" / "não autuar" / outras situações) |
| **Arts. 302 a 312** | crimes de trânsito com texto da lei, pena e se cabe flagrante |
| **57** | placas de regulamentação (R-1 a R-44 e variações), com significado |
| **50** | resoluções do CONTRAN resumidas em linguagem simples |
| **9** | modelos de histórico prontos para copiar, em 4 categorias |
| **8** | tipos de veículo no tutorial de abordagem |
| **11** | tipos de veículo em "Diferenciar veículos" |
| **1** | assistente com IA que entende a situação descrita em linguagem natural |

Plataformas: **iPhone (App Store)** e **Android (Google Play)**.

---

## 4. Funcionalidades

### 4.1 Assistente com inteligência artificial (destaque principal)

O agente descreve a situação **com as próprias palavras**, do jeito que falaria
com um colega — por exemplo: *"motorista vendo vídeo no celular preso no painel
com o carro andando"* — e o assistente responde com:

- o **código da infração** e o artigo do CTB;
- gravidade, pontos e valor da multa;
- a **medida administrativa**;
- **por que é esse código e não outro parecido** (ex.: 763-32 "manuseando"
  e não 736-62 "utilizando");
- os cuidados da orientação de fiscalização (ex.: celular no suporte usando GPS
  não se autua; assistindo vídeo, sim).

Quando a situação tem **várias condutas** (ex.: motorista sem cinto, sem CNH e
com farol apagado), ele separa cada uma, diz qual autuar e qual não autuar, e
fecha com um **resumo da abordagem**.

Como funciona, em linguagem simples:

- O assistente **não inventa código**: ele só trabalha com as 414 infrações e
  as orientações de fiscalização cadastradas no app.
- Primeiro ele escolhe as infrações possíveis, depois lê as fichas completas e
  as orientações de cada uma antes de responder.
- Foi testado com **mais de 400 situações de fiscalização com resposta
  conferida**, incluindo situações com várias condutas ao mesmo tempo.
- Perguntas que já foram respondidas antes voltam na hora.
- Tecnologia: modelos **Claude, da Anthropic** (o app mostra "Powered by
  Claude AI").

Aviso recomendado no site: *o assistente é uma ferramenta de apoio; a decisão
final e a responsabilidade pelo auto são sempre do agente.*

Acesso: botão amarelo flutuante com o mascote (um carrinho com giroflex) em
todas as telas principais, e o cartão "Pergunte ao assistente" no Menu.

### 4.2 Ficha completa da infração

Cada uma das 414 infrações tem uma ficha pensada para a abordagem:

1. **Gravidade e descrição** em destaque.
2. Quadro com **valor da multa, pontos, infrator** (condutor, proprietário…) e
   **competência** (municipal, estadual, rodoviária).
3. Selos: **dispensa abordagem** / abordagem obrigatória, **passível de TCO**, e alerta
   **"Pode se tornar crime"** quando for o caso.
4. **Como proceder** — o passo a passo da fiscalização.
5. **Medida administrativa** (retenção, remoção, recolhimento…).
6. **Quando autuar** (balões verdes) e **Quando NÃO autuar** (balões
   vermelhos), mais **Outras situações** — cada tema abre com um toque e tem
   botão **Copiar**.
7. **Pode se tornar crime** — com atalho para a ficha do crime.
8. **Campo de observação no AIT** — texto pronto, com botão **Copiar**.

Exemplo real (518-51, cinto do condutor): a ficha lembra que, mesmo com vários
ocupantes sem cinto, **só cabe uma autuação** pelo art. 167; que cinto com
defeito vai pelo art. 230, IX; que veículo de coleção sem cinto original não se
autua; e traz o texto pronto para o AIT.

### 4.3 Busca e lista de infrações

- Busca por **código** (518-51), **artigo** (167) ou **palavra** (cinto,
  celular, capacete).
- Filtros por gravidade: **Leve, Média, Grave, Gravíssima** e **Recentes**.
- Estrela para **favoritar** direto na lista.

### 4.4 Crimes de trânsito

- Crimes dos **arts. 302 a 312** do CTB (e 312-A, 312-B).
- Texto da lei, **pena**, e se **cabe prisão em flagrante**.
- Busca por artigo ou palavra e favoritos.

### 4.5 Calculadora do etilômetro

O agente digita o valor medido e o app mostra **o resultado e as providências**
na hora:

- até 0,04 mg/L — dentro da tolerância, sem providências;
- de 0,05 a 0,33 mg/L — **infração** (art. 165);
- a partir de 0,34 mg/L — **crime** (art. 306) + as providências (AIT, condução
  à delegacia, retenção do veículo).

### 4.6 Modelos de histórico

Textos prontos para o campo de histórico/boletim, com campos para preencher e
botão **Copiar Histórico**, além dos **passos para execução**:

- **Embriaguez**: teste recusado · teste positivo (infração) · teste positivo (crime)
- **Inabilitado**: condutor sem CNH · CNH vencida há mais de 30 dias
- **Infrações diversas**: avanço de sinal vermelho · uso de celular ao volante
- **Acidentes**: sem vítima · com vítima

### 4.7 Tutorial de abordagem

Passo a passo por tipo de veículo — **carro de passeio, motocicleta,
motocicleta elétrica, ônibus, caminhão, produtos perigosos, produtos perecíveis
e trator** — com documentos necessários, passos da abordagem e itens a
verificar. Há também um conteúdo operacional liberado apenas para profissionais
com acesso autorizado.

### 4.8 Diferenciar veículos

Como distinguir, na prática, veículos que confundem na fiscalização:
**reboque, semirreboque, triciclo, caminhonete, camioneta, moto elétrica,
bicicleta elétrica, ciclomotor, autopropelido, quadriciclo e trator** — com
descrição, o que a lei exige de cada um e os pontos a verificar.

### 4.9 Placas de regulamentação

As **57 placas R** desenhadas em alta definição, com busca por código ou nome,
filtros por grupo e o significado de cada uma.

### 4.10 Resoluções do CONTRAN

**50 resoluções** com número, assunto e **resumo em linguagem simples** —
incluindo a nova **Resolução 1.031/2026** (fiscalização de álcool e
substâncias psicoativas, que substitui a 432/2013).

### 4.11 Outras facilidades

- **Início** com saudação, busca, acesso rápido (Infrações, Crimes, Diferenciar
  veículos, Tutorial de abordagem) e **consultadas recentemente**.
- **Favoritos** separados em Infrações e Crimes, sincronizados com a conta.
- **CTB completo** (link para o texto oficial), **Contato** e **Sobre**.
- **Tutorial de primeiro acesso** que apresenta as abas do app.
- Login com **"Lembrar-me"**, recuperação de senha e exclusão de conta pelo
  próprio app.

---

## 5. Identidade visual (para o site combinar com o app)

Estilo "Viatura Clara": fundo claro, cartões brancos com borda fina, sem
sombras pesadas, marinho com detalhes em amarelo.

| Uso | Cor |
|---|---|
| Marinho (principal, barra de navegação, títulos) | `#0B2545` |
| Marinho 2 (variação) | `#13315C` |
| Amarelo (destaque, botão do assistente, aba ativa) | `#F5B700` |
| Fundo | `#F3F5F8` |
| Borda dos cartões | `#E2E8F0` |
| Texto | `#0F1B2D` |
| Texto suave | `#4A5568` |
| Verde "autuar" | balões verde-claros com texto verde-escuro |
| Vermelho "não autuar" / gravíssima | balões rosados com texto vermelho-escuro |

- Tipografia do app: fonte do sistema (SF Pro no iPhone), títulos em peso
  forte (800).
- **Mascote**: carrinho amarelo com giroflex e olhos no para-brisa, no botão
  amarelo redondo do assistente. **Ainda sem nome** — não usar nome nos textos.
- Logo: círculo com viatura amarela sobre fundo vermelho/amarelo/azul (ver
  `prints/01-abertura.png`).
- Evitar as cores antigas do app (amarelo `#ECE34B` e azul `#214491`).

---

## 6. Links e contato

- Suporte: **suporte.safo@gmail.com**
- Termos de uso: https://tasafo2025.github.io/TaSafo/termos_de_uso.html
- Política de privacidade: https://tasafo2025.github.io/TaSafo/politica_de_privacidade.html
- Links das lojas (App Store e Google Play): inserir os endereços oficiais.

---

## 7. Arquivos desta pasta

```
divulgacao-site/
├── SOBRE_O_APP.md        ← este arquivo
├── prints/               ← capturas originais do iPhone 17 Pro Max (1320×2868, PNG)
├── prints-web/           ← as mesmas capturas em 720 px de largura (WebP, leves para o site)
└── videos/
    ├── tour-do-app.mp4        (49 s, 720×1564) + tour-do-app-capa.jpg
    └── assistente-ia.mp4      (24 s, 720×1564) + assistente-ia-capa.jpg
```

### Vídeos

| Arquivo | O que mostra |
|---|---|
| `videos/tour-do-app.mp4` | Início → ficha da 518-51 → balões "quando autuar / não autuar" abrindo → campo do AIT com "Copiar" → Menu → Placas → detalhe da R-9 → Favoritos |
| `videos/assistente-ia.mp4` | Pergunta "motorista vendo vídeo no celular preso no painel com o carro andando" sendo enviada e a resposta completa (763-32, por que não 736-62, atenção ao GPS) |

Os vídeos não têm som, estão em H.264 (tocam em qualquer navegador) e
funcionam bem com `autoplay muted loop playsinline`, usando a capa `.jpg` como
`poster`.

### Prints (texto alternativo sugerido)

| Arquivo | Tela / texto alternativo |
|---|---|
| `01-abertura` | Tela de abertura com a logo do Tá Safo — "Sistema para agentes de trânsito" |
| `02-tutorial-primeiro-acesso` | Tutorial de primeiro acesso destacando a aba Início |
| `03-inicio` | Início: "O que vamos consultar hoje?", busca, acesso rápido e infrações consultadas recentemente |
| `04-lista-infracoes` | Lista com as 414 infrações, filtros por gravidade e favoritos |
| `05-busca-infracao` | Busca por "cinto" encontrando 4 infrações |
| `06-ficha-infracao` | Ficha da 518-51: valor, pontos, infrator, competência, como proceder e medida administrativa |
| `06b-ficha-infracao-celular` | Ficha da 763-31 (dirigir segurando celular) |
| `07-quando-autuar-e-nao-autuar` | Orientações em balões verdes (autuar) e vermelhos (não autuar) |
| `08-orientacao-aberta` | Orientação "não autuar" aberta: veículos de coleção sem cinto original |
| `09-campo-observacao-ait` | "Outras situações" e o texto pronto para o campo de observação do AIT, com botão Copiar |
| `10-crimes-de-transito` | Lista de crimes do CTB com selo de flagrante e pena |
| `11-ficha-crime` | Ficha do crime do art. 306 (embriaguez ao volante) |
| `12-crime-pena-flagrante` | Pena de detenção e aviso de prisão em flagrante |
| `13-favoritos` | Favoritos com abas Infrações e Crimes |
| `14-menu` | Menu: assistente, consultas (infrações, crimes, placas, resoluções) e ferramentas de campo |
| `15-calculadora-etilometro` | Calculadora do etilômetro: 0,42 mg/L = crime de trânsito, com as providências |
| `16-modelos-historicos` | Modelos de histórico por categoria (acidentes, embriaguez, inabilitado, diversas) |
| `17-historico-pronto` | Modelo de histórico de embriaguez (infração) pronto para copiar |
| `18-tutorial-abordagem` | Tutorial de abordagem por tipo de veículo |
| `19-abordagem-motocicleta` | Abordagem de motocicleta: documentos e passo a passo |
| `20-diferenciar-veiculos` | Diferenciar veículos: reboque, semirreboque, triciclos, caminhonetes… |
| `21-motos-eletricas` | Como classificar motocicletas elétricas |
| `22-placas-regulamentacao` | Grade com as placas de regulamentação |
| `23-placa-detalhe` | Detalhe da placa R-4a — proibido virar à esquerda |
| `24-resolucoes-contran` | Lista de resoluções do CONTRAN, com a 1.031/2026 no topo |
| `25-resolucao-resumo` | Resumo da Resolução 1.031/2026 (álcool e substâncias psicoativas) |
| `26-perfil` | Perfil do usuário (dados pessoais desfocados) |
| `27-assistente-ia` | Assistente de infrações aberto, com mensagem de boas-vindas e exemplo |
| `28-assistente-resposta` | Resposta do assistente: infração 763-32 identificada, com artigo e gravidade |

Sugestão de destaque no site: `28-assistente-resposta`, `06-ficha-infracao`,
`07-quando-autuar-e-nao-autuar`, `15-calculadora-etilometro` e `03-inicio`.
