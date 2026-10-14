/* ==========================================================
   UM CONVITE PARA GLÓRIA GODART ❤️
   JavaScript puro, sem dependências.
   ----------------------------------------------------------
   Índice
   1. CONFIGURAÇÃO  ← comece por aqui
   2. ATIVIDADES    ← textos e mensagens de WhatsApp
   3. Ilustrações (SVG próprios)
   4. Utilidades
   5. WhatsApp
   6. Navegação entre telas (+ botão "voltar" do celular)
   7. Botão SIM
   8. Botão NÃO fujão
   9. Catálogo
   10. Modal de detalhes
   11. Inicialização
   ========================================================== */
'use strict';

/* ==========================================================
   1. CONFIGURAÇÃO
   ========================================================== */
const CONFIG = {
  herName: 'Glória Godart',
  myName: 'Gabriel',

  // Número do WhatsApp em formato internacional, SÓ dígitos:
  // 55 (Brasil) + DDD + número. Sem espaços, parênteses, hífens ou "+".
  // Se ficar vazio (''), o site mostra um aviso em vez de gerar um link quebrado.
  whatsappNumber: '5511979938429',

  // Mensagem do botão "Sugerir outro rolê", no fim do catálogo.
  suggestionMessage: 'Oi! ❤️ Vi o convite e tenho uma outra ideia de rolê: ',

  // Quantas vezes o botão NÃO foge antes de se cansar e aceitar o clique.
  noMaxEscapes: 3,
};

/* ==========================================================
   2. ATIVIDADES
   ----------------------------------------------------------
   Cada atividade tem um "id" único. O botão de WhatsApp
   busca a mensagem pelo id (nunca pelo título exibido),
   então cada escolha sempre abre o texto certo.

   Campos:
   id          identificador único (sem espaços/acentos)
   emoji       emoji do cartão
   title       título
   punch       frase curta do cartão
   description lista de parágrafos da descrição completa
   fine        "letras miúdas" (observação final)
   message     mensagem que vai pré-preenchida no WhatsApp
   art         nome da ilustração (ver seção 3)
   tint        cor de fundo da ilustração
   featured    true = cartão em destaque
   ========================================================== */
const ACTIVITIES = [
  {
    id: 'xadrez',
    emoji: '♟️',
    title: 'Xadrez na praça com os idosos',
    punch: 'Dois jovens, uma praça e uma aposentadoria emocional precoce.',
    description: [
      'A gente senta numa praça, joga xadrez com os senhores aposentados e tenta fazer amizade com a galera.',
      'Se perdermos, aprendemos estratégia. Se ganharmos, provavelmente é porque tiveram pena da gente.',
      'No fim, estaremos discutindo aposentadoria, política e o preço do café como se tivéssemos 80 anos.',
    ],
    fine: 'Os senhores da praça têm prioridade no tabuleiro. A gente só senta se for convidado.',
    message: 'Oi! ❤️ Vamos jogar xadrez na praça? ♟️',
    art: 'chess',
    tint: '#FFE5ED',
  },
  {
    id: 'circo',
    emoji: '🎪',
    title: 'Visitar o maior circo da América Latina',
    punch: 'Uma experiência cultural extremamente profissional.',
    description: [
      'A gente vai assistir a um espetáculo de circo, come alguma coisa gostosa e tenta entender como existem pessoas capazes de fazer aquelas acrobacias sem desafiar todas as leis da física.',
      'Também podemos fingir que entendemos profundamente de arte circense.',
      'Objetivo secundário: sair de lá querendo aprender alguma coisa completamente desnecessária.',
    ],
    fine: 'O espetáculo a gente escolhe junto depois: data, ingresso e pipoca a combinar.',
    message: 'Oi! ❤️ Bora conhecer um circo juntos?',
    art: 'circus',
    tint: '#FBEBDD',
  },
  {
    id: 'golfinhes',
    emoji: '🐬',
    title: 'Aprender a falar golfinhês',
    punch: 'Intercâmbio internacional com outra espécie.',
    description: [
      'A gente vai estudar os sons dos golfinhos e tentar entender o que eles estão falando.',
      'Se descobrirmos que eles sabem mais da vida do que nós, pedimos conselhos.',
      'Se não der certo, inventamos nosso próprio idioma e começamos a conversar sem que ninguém mais entenda.',
      'O objetivo final é desenvolver uma comunicação diplomática entre humanos e golfinhos.',
    ],
    fine: 'Diplomacia responsável: observação de longe, com guia credenciado, ou um bom documentário. Nenhum golfinho será tocado, perseguido ou incomodado.',
    message: 'Oi! ❤️ Vamos aprender golfinhês juntos? 🐬',
    art: 'dolphin',
    tint: '#E9EEF7',
  },
  {
    id: 'estratosfera',
    emoji: '🚀',
    title: 'Visitar a estratosfera',
    punch: 'Um encontro um pouquinho acima das expectativas.',
    description: [
      'Tomar um café é muito convencional. Nossa meta é observar a curvatura da Terra, tirar uma foto bonita e voltar com a certeza de que a humanidade é muito estranha.',
      'O único problema é que o orçamento ainda não foi aprovado pelo departamento financeiro, que sou eu mesmo.',
      'Plano alternativo: visitar um planetário ou observatório e fingir que estamos planejando a missão.',
    ],
    fine: 'Orçamento em análise desde sempre. Previsão realista: planetário, com cara de missão espacial.',
    message: 'Oi! ❤️ bora pra estratosfera?',
    art: 'rocket',
    tint: '#F1E6F3',
  },
  {
    id: 'cafe',
    emoji: '☕',
    title: 'Derrubar o capitalismo num café',
    punch: 'Começa com um café. Termina com uma revolução.',
    description: [
      'A gente pede alguma coisa, começa falando da vida e, quando percebe, já está discutindo como reorganizar a economia mundial.',
      'Nenhuma experiência em economia é necessária. Apenas indignação, criatividade e um guardanapo para anotar nossas propostas.',
      'Previsão de conclusão: entre 40 minutos e o próximo século.',
    ],
    fine: 'Debate leve, café quente e zero brigas. O guardanapo com o plano fica com você.',
    message: 'Oi! ❤️ Vamos tomar um café e resolver os problemas do capitalismo? ☕',
    art: 'coffee',
    tint: '#F6E3D6',
  },
  {
    id: 'uno',
    emoji: '🃏',
    title: 'Campeonato mundial de Uno',
    punch: 'Uma prova definitiva de compatibilidade.',
    description: [
      'A gente joga Uno, dá risada e descobre se nossa conexão sobrevive a um +4.',
      'O vencedor ganha o direito de se gabar por tempo indeterminado. O perdedor pode recorrer à arbitragem internacional, desde que aceite que a arbitragem sou eu.',
      'A revanche será obrigatória.',
    ],
    fine: '+4 em cima de +4 está liberado. Ressentimentos, não.',
    message: 'Oi! ❤️ Vamos jogar Uno?',
    art: 'uno',
    tint: '#FFE5ED',
  },
  {
    id: 'et',
    emoji: '👽',
    title: 'Procurar vida extraterrestre',
    punch: 'Se a gente encontrar alienígenas, a Terra continua sendo problema deles.',
    description: [
      'A gente vai a um planetário, observatório ou lugar com pouca poluição luminosa, olha para o céu e tenta encontrar sinais de vida fora da Terra.',
      'Se encontrarmos alguma civilização inteligente, perguntamos se eles têm um sistema econômico melhor, internet mais barata e algum planeta disponível para aluguel.',
      'Se não encontrarmos nada, pelo menos teremos visto um céu bonito juntos.',
    ],
    fine: 'Se os aliens parecerem hostis, a gente finge que era só uma estrela piscando.',
    message: 'Oi! ❤️ Vamos procurar vida extraterrestre juntos?',
    art: 'ufo',
    tint: '#E8E6F4',
  },
  {
    id: 'tour',
    emoji: '🍜',
    title: 'Tour gastronômico aleatório',
    punch: 'Uma batalha culinária entre duas civilizações.',
    description: [
      'A proposta é simples: podem acontecer até dois encontros. Eu escolho uma culinária para o primeiro, você escolhe outra para o segundo, e a gente sai para descobrir qual delas merece o título de melhor comida da noite.',
      'Posso escolher comida árabe, você pode escolher comida japonesa, italiana, mexicana ou qualquer outra. Depois, você escolhe uma culinária para o nosso segundo encontro.',
      'A gente prova os pratos, dá notas, defende nossas escolhas com argumentos completamente tendenciosos e elege um vencedor.',
      'Se houver empate, teremos que realizar uma segunda edição.',
    ],
    fine: 'As culinárias a gente combina pelo WhatsApp. Notas tendenciosas são permitidas e incentivadas.',
    message: 'Oi! ❤️ Vamos fazer nosso tour gastronômico?',
    art: 'food',
    tint: '#FFE5ED',
    featured: true,
  },
  {
    id: 'ceramica',
    emoji: '🏺',
    title: 'Aula de cerâmica no Sesc',
    punch: 'Vamos produzir arte ou dois objetos irreconhecíveis.',
    description: [
      'A gente faz uma aula de cerâmica, coloca a mão na massa e tenta criar alguma coisa bonita.',
      'Se ficar torto, chamamos de arte contemporânea. Se ficar bom, abrimos uma galeria e nunca mais trabalhamos.',
      'Cada um pode fazer uma peça para guardar como lembrança desse encontro.',
    ],
    fine: 'É uma ideia, não uma reserva: turmas, unidades e horários a gente consulta juntos na programação do Sesc.',
    message: 'Oi! ❤️ Bora fazer uma aula de cerâmica no Sesc? Acho que seria muito legal criar alguma coisa juntos! 🏺',
    art: 'pottery',
    tint: '#F6E3D6',
  },
  {
    id: 'karaoke',
    emoji: '🎤',
    title: 'Karaokê',
    punch: 'Uma apresentação musical que pode mudar nossas vidas. Ou não.',
    description: [
      'A gente vai ao karaokê, escolhe músicas e canta como se estivesse num show para milhares de pessoas.',
      'Se cantarmos bem, consideramos iniciar uma carreira. Se cantarmos mal, dizemos que era uma performance experimental.',
      'A única regra é não julgar o outro por escolher uma música vergonhosa demais.',
    ],
    fine: 'O microfone é compartilhado. A vergonha também.',
    message: 'Oi! ❤️ Bora ao karaokê? Quero descobrir se a gente forma uma dupla musical',
    art: 'mic',
    tint: '#F1E6F3',
  },
  {
    id: 'por-do-sol',
    emoji: '🌅',
    title: 'Pôr do sol com violão',
    punch: 'A grande estrela encerrando o expediente enquanto a gente conversa.',
    description: [
      'A gente aprecia a grande estrela se despedir do seu horário de trabalho enquanto conversamos.',
      'E, se você quiser, eu posso ser o chato do violão e tocar Djavan pra você.',
      'A ideia é sentar em algum lugar bonito, conversar sem pressa e deixar o céu fazer a parte mais impressionante do encontro.',
    ],
    fine: 'O violão é opcional e pode ser recusado a qualquer momento, sem ofender o Djavan.',
    message: 'Oi! ❤️ Vamos ver o pôr do sol juntos?',
    art: 'sunset',
    tint: '#FDE3D8',
  },
];

// Ideias de culinária só para o botão "sortear inspiração" do tour gastronômico.
const CUISINES = [
  'Árabe', 'Japonesa', 'Italiana', 'Mexicana', 'Coreana', 'Peruana', 'Indiana',
  'Tailandesa', 'Nordestina', 'Grega', 'Vietnamita', 'Libanesa', 'Chinesa',
  'Portuguesa', 'Francesa', 'Mineira', 'Etíope', 'Turca',
];

/* ==========================================================
   3. ILUSTRAÇÕES — SVGs próprios, mesmo traço e paleta
   ========================================================== */
const C = { wine: '#351323', cherry: '#E84D70', pink: '#F4A6BC', cream: '#FFF5ED', blush: '#FFE5ED',
  sea: '#B9D3EC', yolk: '#F5A93B', taco: '#F6C979', leaf: '#8CBF7A' }; // poucos acentos extras

const svg = (inner) =>
  `<svg class="ill" viewBox="0 0 240 160" aria-hidden="true" focusable="false">${inner}</svg>`;

// Estrelinha de 4 pontas que pisca
const spark = (x, y, s = 6, fill = C.wine) =>
  `<path class="twinkle" fill="${fill}" d="M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z"/>`;

const ART = {
  // Tabuleiro em perspectiva, rei, peão, um peão capturado e o pombo-juiz da praça
  chess: (() => {
    const pawn = `
      <rect class="o" x="58" y="108" width="36" height="10" rx="3" fill="${C.pink}"/>
      <path class="o" d="M64 108 Q66 94 71 90 L81 90 Q86 94 88 108 Z" fill="${C.pink}"/>
      <rect class="o" x="66" y="85" width="20" height="6" rx="2" fill="${C.pink}"/>
      <circle class="o" cx="76" cy="76" r="9" fill="${C.pink}"/>
      <path d="M71 73 q2 -4 6 -4" fill="none" stroke="${C.cream}" stroke-width="2.4" stroke-linecap="round"/>`;
    // tabuleiro: trapézio de 8x4 casas
    const T = { y0: 98, y1: 134, l0: 58, r0: 168, l1: 28, r1: 192 };
    const pt = (u, v) => {
      const y = T.y0 + (T.y1 - T.y0) * v;
      const l = T.l0 + (T.l1 - T.l0) * v;
      const r = T.r0 + (T.r1 - T.r0) * v;
      return `${(l + (r - l) * u).toFixed(1)} ${y.toFixed(1)}`;
    };
    let squares = '';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        const u0 = col / 8, u1 = (col + 1) / 8, v0 = row / 4, v1 = (row + 1) / 4;
        squares += `<path d="M${pt(u0, v0)} L${pt(u1, v0)} L${pt(u1, v1)} L${pt(u0, v1)} Z" fill="${(row + col) % 2 ? C.wine : C.cream}"/>`;
      }
    }
    return svg(`
      <ellipse cx="114" cy="146" rx="98" ry="7" fill="${C.wine}" opacity=".1"/>
      <path class="o" d="M28 134 L192 134 L192 141 L28 141 Z" fill="${C.wine}"/>
      ${squares}
      <path class="l" d="M${pt(0, 0)} L${pt(1, 0)} L${pt(1, 1)} L${pt(0, 1)} Z"/>
      <ellipse cx="106" cy="113" rx="25" ry="4" fill="${C.wine}" opacity=".25"/>
      <g class="float"><g transform="translate(-18 -5)">
        <rect class="o" x="100" y="106" width="48" height="12" rx="3" fill="${C.cherry}"/>
        <path class="o" d="M106 106 Q110 80 114 64 L134 64 Q138 80 142 106 Z" fill="${C.cherry}"/>
        <path d="M116 72 Q114 86 112 100" fill="none" stroke="${C.cream}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
        <rect class="o" x="110" y="57" width="28" height="8" rx="3" fill="${C.pink}"/>
        <path class="o" d="M114 57 Q124 33 134 57 Z" fill="${C.cherry}"/>
        <path class="l" d="M124 24 V42 M117 31 H131"/>
      </g></g>
      <ellipse cx="62" cy="127" rx="20" ry="3.5" fill="${C.wine}" opacity=".25"/>
      <g transform="translate(-14 9)">${pawn}</g>
      <g transform="translate(138 120) rotate(96) scale(.62) translate(-76 -113)">${pawn}</g>
      <g transform="translate(-8 0)">
        <path d="M214 132 V141 M222 132 V141 M209 141 h9 M217 141 h9" fill="none" stroke="${C.cherry}" stroke-width="2.6" stroke-linecap="round"/>
        <path class="o" d="M200 112 C202 103 214 101 222 107 C230 113 236 119 239 126 L227 128 C214 135 200 129 200 112 Z" fill="${C.blush}"/>
        <path d="M201 110 C205 117 212 119 217 114" fill="none" stroke="${C.pink}" stroke-width="5" stroke-linecap="round"/>
        <path class="t" d="M212 117 C220 114 228 118 233 126"/>
        <circle class="o" cx="206" cy="99" r="9" fill="${C.blush}"/>
        <path class="o" d="M197 98 L190 101 L197 104 Z" fill="${C.cherry}" style="stroke-width:2"/>
        <circle cx="204" cy="97" r="2.2" fill="${C.wine}"/>
        <text class="hand-t" x="214" y="86" transform="rotate(10 218 80)">?</text>
      </g>
      <text class="hand-t" x="20" y="44" transform="rotate(-8 40 40)">xeque!</text>
      ${spark(44, 68, 5)}${spark(178, 40, 6, C.cherry)}${spark(150, 22, 4)}
    `);
  })(),

  circus: svg(`
    <ellipse cx="120" cy="134" rx="104" ry="7" fill="${C.wine}" opacity=".08"/>
    <rect class="o" x="62" y="84" width="116" height="48" fill="${C.blush}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${66 + i * 20}" y="92" width="8" height="40" fill="${C.pink}"/>`).join('')}
    <path class="o" d="M106 132 V108 Q120 94 134 108 V132 Z" fill="${C.wine}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M120 32 L${48 + i * 24} 84 L${72 + i * 24} 84 Z" fill="${i % 2 ? C.cream : C.cherry}"/>`).join('')}
    <path class="l" d="M120 32 L48 84 H192 Z"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path class="o" d="M${48 + i * 24} 84 a12 10 0 0 0 24 0 Z" fill="${i % 2 ? C.pink : C.cherry}"/>`).join('')}
    <path class="l" d="M120 32 V12"/>
    <path class="o" d="M120 12 L140 17 L120 23 Z" fill="${C.cherry}"/>
    <path class="l" d="M24 132 H216"/>
    ${spark(40, 40, 6)}${spark(200, 46, 5, C.cherry)}${spark(206, 106, 4)}
  `),

  // Golfinho saltando (um boto-cor-de-rosa, claro), com onda e respingo
  dolphin: (() => {
    const body = 'M-62 -3 C-40 -20 -16 -32 10 -32 C34 -32 50 -26 56 -16 C59 -10 64 -7 74 -5 C80 -4 80 2 74 3 C66 4 60 6 54 10 C38 22 8 26 -16 20 C-38 14 -52 6 -62 3 Z';
    return svg(`
      <path d="M0 116 Q20 110 40 116 T80 116 T120 116 T160 116 T200 116 T240 116 V160 H0 Z" fill="${C.sea}" opacity=".55"/>
      <g class="float">
        <g transform="translate(116 74) rotate(-12)">
          <path class="o" d="M-62 -3 C-70 -6 -78 -14 -88 -22 C-86 -12 -85 -5 -81 0 C-85 6 -87 13 -90 22 C-80 15 -71 7 -62 3 Z" fill="${C.pink}"/>
          <path class="o" d="M18 -31 C8 -36 -2 -44 -16 -52 C-11 -43 -10 -36 -8 -29 Z" fill="${C.pink}"/>
          <path d="${body}" fill="${C.pink}"/>
          <path d="M54 10 C38 22 8 26 -16 20 C-38 14 -52 6 -60 2 C-38 6 -10 10 14 8 C32 6 46 4 54 10 Z" fill="${C.cream}"/>
          <path d="M-32 -16 C-16 -26 4 -29 22 -27" fill="none" stroke="${C.cream}" stroke-width="3.4" stroke-linecap="round" opacity=".9"/>
          <path class="l" d="${body}"/>
          <path class="o" d="M20 17 C14 27 4 33 -6 35 C0 27 4 21 6 18 Z" fill="${C.pink}"/>
          <ellipse cx="51" cy="-3" rx="6" ry="3.4" fill="${C.cherry}" opacity=".55"/>
          <circle cx="41" cy="-14" r="4.2" fill="${C.wine}"/>
          <circle cx="42.7" cy="-15.7" r="1.5" fill="${C.cream}"/>
          <path class="t" d="M74 2.5 C66 4.5 60 3.5 54 0"/>
        </g>
      </g>
      <path class="o" d="M156 6 h66 a9 9 0 0 1 9 9 v15 a9 9 0 0 1 -9 9 h-26 l-9 10 l0 -10 h-31 a9 9 0 0 1 -9 -9 v-15 a9 9 0 0 1 9 -9z" fill="${C.cream}"/>
      <text class="hand-t" x="189" y="30" font-size="19" text-anchor="middle">ííí-íí?</text>
      <path class="t" d="M206 58 q4 4 0 9 M212 54 q7 7 0 17" stroke="${C.cherry}"/>
      <path d="M0 126 Q15 119 30 126 T60 126 T90 126 T120 126 T150 126 T180 126 T210 126 T240 126 V160 H0 Z" fill="${C.sea}"/>
      <path class="l" d="M0 126 Q15 119 30 126 T60 126 T90 126 T120 126 T150 126 T180 126 T210 126 T240 126"/>
      <ellipse class="t" cx="36" cy="128" rx="26" ry="4"/>
      <path class="o" d="M18 127 C20 117 24 113 26 121 C28 110 34 106 36 118 C38 110 44 110 46 120 C48 116 52 118 53 127 Z" fill="${C.cream}"/>
      <circle class="o" cx="14" cy="106" r="3" fill="${C.sea}" style="stroke-width:2"/>
      <circle class="o" cx="56" cy="102" r="2.6" fill="${C.sea}" style="stroke-width:2"/>
      <circle class="o" cx="30" cy="96" r="2" fill="${C.sea}" style="stroke-width:2"/>
      <path d="M78 142 q8 -4 16 0 M150 146 q8 -4 16 0 M200 138 q6 -3 12 0" fill="none" stroke="${C.cream}" stroke-width="2.5" stroke-linecap="round"/>
      ${spark(26, 40, 6, C.cherry)}${spark(112, 18, 4)}${spark(232, 86, 4)}
    `);
  })(),

  rocket: svg(`
    <circle class="o" cx="120" cy="300" r="178" fill="${C.pink}"/>
    <circle cx="120" cy="300" r="192" fill="none" stroke="${C.wine}" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round" opacity=".5"/>
    <path d="M64 138 q14 -12 32 -5 q10 6 -4 12 q-14 5 -28 -7z M150 132 q12 -8 26 0 q4 6 -8 8 q-12 0 -18 -8z" fill="${C.cherry}"/>
    <path class="t" d="M56 128 C68 114 84 104 100 98" stroke-dasharray="2 7"/>
    <g class="float"><g transform="rotate(32 120 70)">
      <path class="o flame" d="M108 98 Q120 138 132 98 Z" fill="${C.cherry}"/>
      <path class="flame" d="M113 99 Q120 122 127 99 Z" fill="${C.yolk}"/>
      <path class="o" d="M106 76 L90 102 L108 96 Z M134 76 L150 102 L132 96 Z" fill="${C.cherry}"/>
      <path class="o" d="M120 18 C138 34 140 70 134 98 L106 98 C100 70 102 34 120 18 Z" fill="${C.cream}"/>
      <path d="M129 34 C135 52 135 76 132 94" fill="none" stroke="${C.pink}" stroke-width="4" stroke-linecap="round" opacity=".8"/>
      <path class="o" d="M104.6 80 Q120 84 135.4 80 L135 88 Q120 92 105 88 Z" fill="${C.cherry}" style="stroke-width:2.4"/>
      <path class="o" d="M110 33 Q120 28 130 33 L127 26 Q120 19 113 26 Z" fill="${C.cherry}" style="stroke-width:2.4"/>
      <circle class="o" cx="120" cy="56" r="10" fill="${C.blush}"/>
      <path d="M120 61 c-5-3.5-7-6-7-8.5 c0-2 1.6-3.4 3.4-3.4 c1.6 0 2.8 0.8 3.6 2 c0.8-1.2 2-2 3.6-2 c1.8 0 3.4 1.4 3.4 3.4 c0 2.5-2 5-7 8.5z" fill="${C.cherry}"/>
    </g></g>
    ${spark(36, 30, 6)}${spark(204, 40, 7, C.cherry)}${spark(60, 80, 4)}${spark(196, 92, 4)}
    <circle cx="170" cy="20" r="2" fill="${C.wine}"/><circle cx="30" cy="104" r="2" fill="${C.wine}"/><circle cx="96" cy="14" r="2" fill="${C.wine}"/>
  `),

  coffee: svg(`
    <g transform="rotate(-8 186 62)">
      <rect class="o" x="150" y="30" width="74" height="60" rx="4" fill="${C.cream}"/>
      <text class="hand-t" x="158" y="52" font-size="17">plano:</text>
      <path class="t" d="M158 62 h52 M158 72 h40 M158 82 h48"/>
      <path class="t" d="M196 76 l6 -12 l6 12" stroke="${C.cherry}"/>
    </g>
    <ellipse cx="100" cy="138" rx="60" ry="8" fill="${C.wine}" opacity=".08"/>
    <ellipse class="o" cx="100" cy="134" rx="58" ry="8" fill="${C.cream}"/>
    <path class="o" d="M138 92 Q162 90 158 106 Q154 120 134 118" fill="none"/>
    <path class="o" d="M60 80 L68 124 Q70 132 80 132 L120 132 Q130 132 132 124 L140 80 Z" fill="${C.cherry}"/>
    <ellipse class="o" cx="100" cy="80" rx="40" ry="7" fill="${C.wine}"/>
    <path d="M100 85 c-4-4-11 0-6 4 l6 4 l6 -4 c5-4 -2-8 -6-4z" fill="${C.pink}"/>
    <path class="l steam" d="M86 66 q-6 -9 0 -17 q6 -8 0 -17"/>
    <path class="l steam" d="M100 62 q-6 -9 0 -17 q6 -8 0 -17" style="animation-delay:-.5s"/>
    <path class="l steam" d="M114 66 q-6 -9 0 -17 q6 -8 0 -17" style="animation-delay:-1s"/>
    ${spark(34, 56, 6, C.cherry)}${spark(52, 28, 4)}
  `),

  uno: svg(`
    <ellipse cx="120" cy="142" rx="80" ry="7" fill="${C.wine}" opacity=".08"/>
    ${[
      { a: -24, c: C.wine, t: '7', tc: C.wine },
      { a: 0, c: C.pink, t: '↺', tc: C.wine },
      { a: 24, c: C.cherry, t: '+4', tc: C.wine },
    ].map((k) => `
      <g transform="translate(120 140) rotate(${k.a}) translate(-32 -112)">
        <rect class="o" x="0" y="0" width="64" height="92" rx="9" fill="${k.c}"/>
        <rect x="6" y="6" width="52" height="80" rx="6" fill="none" stroke="${C.cream}" stroke-width="2"/>
        <ellipse cx="32" cy="46" rx="19" ry="31" transform="rotate(28 32 46)" fill="${C.cream}"/>
        <text class="big-t" x="32" y="54" text-anchor="middle" fill="${k.tc}">${k.t}</text>
      </g>`).join('')}
    <text class="hand-t" x="186" y="44" transform="rotate(10 196 40)">uno!</text>
    ${spark(40, 40, 6, C.cherry)}${spark(206, 70, 4)}
  `),

  ufo: svg(`
    <ellipse cx="120" cy="146" rx="56" ry="7" fill="${C.pink}"/>
    <path d="M98 90 L72 146 H168 L142 90 Z" fill="${C.cream}" opacity=".85"/>
    <g class="float">
      <path class="o" d="M90 74 Q92 38 120 38 Q148 38 150 74 Z" fill="${C.blush}"/>
      <path class="l" d="M114 52 l-5 -9 M126 52 l5 -9"/>
      <circle cx="109" cy="42" r="2.5" fill="${C.cherry}"/><circle cx="131" cy="42" r="2.5" fill="${C.cherry}"/>
      <ellipse class="o" cx="120" cy="62" rx="12" ry="12" fill="${C.pink}"/>
      <ellipse cx="115" cy="61" rx="2.6" ry="3.6" fill="${C.wine}"/><ellipse cx="125" cy="61" rx="2.6" ry="3.6" fill="${C.wine}"/>
      <ellipse class="o" cx="120" cy="78" rx="62" ry="15" fill="${C.cherry}"/>
      ${[78, 99, 120, 141, 162].map((x) => `<circle cx="${x}" cy="${x === 120 ? 84 : (x === 99 || x === 141 ? 83 : 80)}" r="4" fill="${C.cream}"/>`).join('')}
    </g>
    <text class="hand-t" x="164" y="132">olá?</text>
    ${spark(34, 30, 7)}${spark(206, 28, 5, C.cherry)}${spark(46, 108, 4)}${spark(196, 64, 4)}
    <circle cx="80" cy="22" r="2" fill="${C.wine}"/><circle cx="170" cy="14" r="2" fill="${C.wine}"/>
  `),

  // Lámen x taco: duas civilizações, um vencedor
  food: svg(`
    <ellipse cx="68" cy="138" rx="48" ry="6" fill="${C.wine}" opacity=".1"/>
    <path class="l steam" d="M54 70 q-5 -8 0 -15 q5 -7 0 -15"/>
    <path class="l steam" d="M72 66 q-5 -8 0 -15 q5 -7 0 -15" style="animation-delay:-.8s"/>
    <path class="o" d="M26 92 Q26 134 68 134 Q110 134 110 92 Z" fill="${C.cherry}"/>
    <path d="M34 110 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0" fill="none" stroke="${C.cream}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M44 124 Q68 131 92 124" fill="none" stroke="${C.wine}" stroke-width="2" opacity=".25" stroke-linecap="round"/>
    <ellipse class="o" cx="68" cy="92" rx="42" ry="10" fill="${C.taco}"/>
    <path class="t" d="M34 94 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0" stroke-width="2.2"/>
    <ellipse class="o" cx="50" cy="89" rx="10" ry="6.5" fill="#FFFFFF" style="stroke-width:2"/>
    <circle cx="50" cy="89" r="3.8" fill="${C.yolk}"/>
    <rect class="o" x="80" y="78" width="13" height="15" rx="2" fill="${C.wine}" transform="rotate(10 86 86)" style="stroke-width:2"/>
    <path class="o" d="M62 98 L114 62" style="stroke-width:5"/><path d="M62 98 L114 62" stroke="${C.cream}" stroke-width="2" stroke-linecap="round"/>
    <path class="o" d="M70 100 L120 70" style="stroke-width:5"/><path d="M70 100 L120 70" stroke="${C.cream}" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="178" cy="138" rx="46" ry="6" fill="${C.wine}" opacity=".1"/>
    <ellipse class="o" cx="178" cy="128" rx="44" ry="10" fill="${C.cream}"/>
    <path d="M146 98 q4 -10 10 -6 q5 -12 12 -6 q6 -12 12 -5 q6 -11 12 -4 q6 -8 10 4" fill="none" stroke="${C.leaf}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <circle class="o" cx="160" cy="90" r="4.5" fill="${C.cherry}" style="stroke-width:2"/><circle class="o" cx="182" cy="87" r="4.5" fill="${C.cherry}" style="stroke-width:2"/><circle class="o" cx="199" cy="92" r="4" fill="${C.cherry}" style="stroke-width:2"/>
    <path class="o" d="M144 96 C144 122 162 130 178 130 C194 130 212 122 212 96 C198 103 158 103 144 96 Z" fill="${C.taco}"/>
    <path d="M154 108 C158 118 166 122 174 123" fill="none" stroke="${C.cream}" stroke-width="2.6" stroke-linecap="round" opacity=".8"/>
    <circle cx="170" cy="112" r="1.8" fill="${C.wine}" opacity=".45"/><circle cx="190" cy="110" r="1.8" fill="${C.wine}" opacity=".45"/><circle cx="198" cy="118" r="1.8" fill="${C.wine}" opacity=".45"/>
    <g class="float">
      <circle class="o" cx="128" cy="40" r="19" fill="${C.wine}"/>
      <text x="128" y="47" text-anchor="middle" style="font:italic 700 18px var(--serif)" fill="${C.cream}">vs</text>
    </g>
    ${spark(100, 24, 5, C.cherry)}${spark(160, 24, 6)}${spark(206, 54, 4, C.cherry)}
  `),

  // Torno de cerâmica: uma peça bonita e uma… contemporânea
  pottery: svg(`
    <ellipse cx="110" cy="146" rx="78" ry="6" fill="${C.wine}" opacity=".1"/>
    <path class="o" d="M38 126 V134 A72 13 0 0 0 182 134 V126 Z" fill="${C.wine}"/>
    <ellipse class="o" cx="110" cy="126" rx="72" ry="13" fill="${C.pink}"/>
    <path d="M70 128 a40 7 0 0 0 80 0" fill="none" stroke="${C.cream}" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 7" opacity=".9"/>
    <path class="t" d="M30 110 q-8 8 -2 18 M190 110 q8 8 2 18"/>
    <path class="o" d="M90 124 Q72 106 87 89 Q97 79 95 62 L125 62 Q123 79 133 89 Q148 106 130 124 Z" fill="${C.cherry}"/>
    <path d="M85 98 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6" fill="none" stroke="${C.cream}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M100 70 Q98 80 90 92" fill="none" stroke="${C.cream}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
    <ellipse class="o" cx="110" cy="62" rx="15" ry="4.5" fill="${C.wine}"/>
    <circle cx="58" cy="118" r="3" fill="${C.cherry}"/><circle cx="160" cy="120" r="2.4" fill="${C.cherry}"/><circle cx="66" cy="128" r="2" fill="${C.wine}" opacity=".5"/>
    <g transform="rotate(12 202 76)">
      <path class="o" d="M184 92 q-12 -14 1 -25 q5 -6 2 -13 l17 -2 q-1 9 7 15 q11 13 -4 25 Z" fill="${C.blush}"/>
      <circle cx="194" cy="76" r="1.9" fill="${C.wine}"/><circle cx="204" cy="75" r="1.9" fill="${C.wine}"/>
      <path class="t" d="M193 84 q6 -3 12 1"/>
    </g>
    <text class="hand-t" x="174" y="40" transform="rotate(-6 190 34)">arte?</text>
    ${spark(40, 40, 6, C.cherry)}${spark(150, 28, 4)}${spark(70, 22, 4)}
  `),

  // Microfone com holofote; o fio termina desenhando um coração
  mic: svg(`
    <path d="M150 0 H186 L232 160 H96 Z" fill="${C.cream}" opacity=".75"/>
    <ellipse cx="164" cy="150" rx="62" ry="7" fill="${C.cream}"/>
    <path class="l" d="M131 128 C131 148 104 150 88 124"/>
    <path class="o" d="M70 146 C60 138 52 132 52 124 C52 118 57 114 62 114 C66 114 69 116 70 120 C71 116 74 114 78 114 C83 114 88 118 88 124 C88 132 80 138 70 146 Z" fill="${C.pink}"/>
    <path class="l" d="M70 146 C60 152 40 150 22 140"/>
    <path class="t" d="M122 22 q8 10 0 22 M130 16 q13 16 0 34" stroke="${C.cherry}" stroke-width="2.6"/>
    <g transform="rotate(-24 110 80)">
      <rect class="o" x="101" y="62" width="18" height="70" rx="7" fill="${C.wine}"/>
      <rect class="o" x="98" y="56" width="24" height="10" rx="3" fill="${C.cherry}"/>
      <circle class="o" cx="110" cy="36" r="23" fill="${C.pink}"/>
      <path class="t" d="M93 28 h34 M89 38 h42 M93 48 h34 M110 14 v44"/>
      <path d="M96 24 q4 -6 10 -8" fill="none" stroke="${C.cream}" stroke-width="3" stroke-linecap="round"/>
      <path d="M106 72 V120" stroke="${C.cream}" stroke-width="2.4" stroke-linecap="round" opacity=".35"/>
    </g>
    <g class="float">
      <path class="l" d="M164 54 V26 l18 -5 V48"/>
      <ellipse class="o" cx="159" cy="55" rx="6" ry="5" fill="${C.cherry}"/>
      <ellipse class="o" cx="177" cy="49" rx="6" ry="5" fill="${C.cherry}"/>
    </g>
    <g class="float" style="animation-delay:-1.4s">
      <path class="l" d="M200 98 V76 l10 4"/>
      <ellipse class="o" cx="195" cy="99" rx="6" ry="5" fill="${C.wine}"/>
    </g>
    ${spark(40, 42, 7, C.cherry)}${spark(214, 30, 5)}
  `),

  // Pôr do sol retrô, violão e passarinhos
  sunset: svg(`
    ${[-60, -35, -12, 12, 35, 60].map((a) => `<path class="t" transform="rotate(${a} 150 108)" d="M150 52 V40"/>`).join('')}
    <path class="o" d="M106 108 A44 44 0 0 1 194 108 Z" fill="${C.cherry}"/>
    ${[[88, 3], [96, 4], [103, 5]].map(([y, h]) => {
      const w = Math.sqrt(44 * 44 - (108 - y) * (108 - y));
      return `<rect x="${(150 - w).toFixed(1)}" y="${y}" width="${(2 * w).toFixed(1)}" height="${h}" fill="#FDE3D8"/>`;
    }).join('')}
    <path class="o" d="M92 40 q2 -10 12 -8 q4 -8 14 -4 q10 0 8 10 Z" fill="${C.cream}" style="stroke-width:2.4"/>
    <path class="o" d="M196 76 q2 -8 10 -6 q4 -7 12 -3 q8 1 6 9 Z" fill="${C.cream}" style="stroke-width:2.4"/>
    <rect x="0" y="108" width="240" height="52" fill="${C.pink}"/>
    <path class="l" d="M0 108 H240"/>
    <path d="M118 118 h64 M128 127 h44 M138 136 h24 M146 145 h8" stroke="${C.cherry}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <path class="t" d="M176 34 q5 -6 10 0 q5 -6 10 0 M200 50 q4 -5 8 0 q4 -5 8 0"/>
    <g transform="translate(10 0) rotate(-30 70 118)">
      <rect class="o" x="57" y="30" width="10" height="64" fill="${C.wine}"/>
      <rect class="o" x="54" y="18" width="16" height="16" rx="3" fill="${C.wine}"/>
      <circle class="o" cx="62" cy="128" r="25" fill="${C.cream}"/>
      <circle class="o" cx="62" cy="104" r="19" fill="${C.cream}"/>
      <path d="M48 112 Q62 104 76 112 L74 126 Q62 132 50 126 Z" fill="${C.cream}"/>
      <circle cx="62" cy="114" r="7" fill="${C.wine}"/>
      <rect x="55" y="136" width="14" height="5" rx="1" fill="${C.wine}"/>
      <path d="M60 34 V138 M64 34 V138" stroke="${C.wine}" stroke-width="1"/>
    </g>
    ${spark(30, 30, 6)}${spark(96, 24, 4, C.cherry)}
  `),
};

/* ==========================================================
   4. UTILIDADES
   ========================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const pad = (n) => String(n).padStart(2, '0');
const rand = (min, max) => min + Math.random() * (max - min);
const firstName = (full) => String(full).trim().split(/\s+/)[0];

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const reducedMotion = () => motionQuery.matches;

const HEART_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C5 16 2 12 2 8.5 2 5.4 4.4 3 7.4 3c1.9 0 3.6 1 4.6 2.5C13 4 14.7 3 16.6 3 19.6 3 22 5.4 22 8.5 22 12 19 16 12 21z"/></svg>';

/** Avisa leitores de tela sem mexer no visual. */
function announce(text) {
  const live = $('#live');
  live.textContent = '';
  setTimeout(() => { live.textContent = text; }, 60);
}

/** Explosão de coraçõezinhos a partir de um ponto (x, y) da tela. */
function heartBurst(x, y, count = 12) {
  if (reducedMotion()) return;
  const colors = [C.cherry, C.pink, '#C7375A', C.wine];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'burst-heart';
    el.innerHTML = HEART_SVG;
    const angle = (Math.PI * 2 * i) / count + rand(-0.3, 0.3);
    const dist = rand(60, 130);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist - 30}px`);
    el.style.setProperty('--r', `${rand(-40, 40)}deg`);
    el.style.setProperty('--size', `${rand(12, 22)}px`);
    el.style.setProperty('--c', colors[i % colors.length]);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
}

/** Preenche o nome dele e dela em qualquer elemento marcado no HTML. */
function fillNames() {
  $$('[data-her-name]').forEach((el) => { el.textContent = CONFIG.herName; });
  $$('[data-my-name]').forEach((el) => { el.textContent = CONFIG.myName; });
}

/* ==========================================================
   5. WHATSAPP
   ========================================================== */
const WHATSAPP_NOT_CONFIGURED =
  'O número de WhatsApp ainda não foi configurado. Edite <code>CONFIG.whatsappNumber</code> no arquivo <code>script.js</code> (formato: 55 + DDD + número, só dígitos).';

/** Número válido = só dígitos, entre 10 e 15 caracteres. */
function hasValidNumber() {
  return /^\d{10,15}$/.test(String(CONFIG.whatsappNumber || ''));
}

/** Monta o link wa.me — ou devolve null se o número não estiver configurado. */
function buildWhatsAppUrl(message) {
  if (!hasValidNumber()) return null;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Liga um <a> ao WhatsApp. Sem número válido, o botão continua
 * clicável, mas mostra um aviso em vez de abrir um link quebrado.
 */
function setupWhatsAppLink(anchor, warnEl, message) {
  const url = buildWhatsAppUrl(message);
  warnEl.hidden = true;
  if (url) {
    anchor.href = url;
    anchor.removeAttribute('aria-disabled');
    anchor.removeAttribute('role');
    anchor.removeAttribute('tabindex');
  } else {
    anchor.removeAttribute('href');
    anchor.setAttribute('role', 'button');
    anchor.setAttribute('aria-disabled', 'true');
    anchor.tabIndex = 0;
  }
}

function guardWhatsAppClick(anchor, warnEl) {
  const showWarn = (e) => {
    if (anchor.getAttribute('aria-disabled') !== 'true') return false;
    e.preventDefault();
    warnEl.innerHTML = WHATSAPP_NOT_CONFIGURED;
    warnEl.hidden = false;
    return true;
  };
  anchor.addEventListener('click', showWarn);
  anchor.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') showWarn(e);
  });
}

/* ==========================================================
   6. NAVEGAÇÃO ENTRE TELAS
   ----------------------------------------------------------
   Usa o histórico do navegador: o botão "voltar" do Android
   fecha o modal / volta de tela, em vez de sair do site.
   ========================================================== */
const screens = {
  invite: $('#screen-invite'),
  catalog: $('#screen-catalog'),
  declined: $('#screen-declined'),
};
let currentScreen = null;

function showScreen(name, { focus = false } = {}) {
  if (!screens[name]) name = 'invite';
  Object.entries(screens).forEach(([key, el]) => { el.hidden = key !== name; });
  const changed = currentScreen !== name;
  currentScreen = name;
  document.body.dataset.screen = name;

  if (name !== 'invite') NoButton.reset();
  if (name === 'invite') resetYes();
  if (name === 'catalog') Catalog.reveal();

  if (changed) {
    const el = screens[name];
    el.classList.remove('is-entering');
    void el.offsetWidth; // reinicia a animação
    el.classList.add('is-entering');
    window.scrollTo(0, 0);
  }
  if (focus) $('[data-focus]', screens[name])?.focus({ preventScroll: true });
}

function screenFromHash() {
  const h = location.hash;
  if (h === '#catalogo' || h.startsWith('#ideia-')) return 'catalog';
  if (h === '#tudo-bem') return 'declined';
  return 'invite';
}

window.addEventListener('popstate', (e) => {
  const state = e.state || { screen: screenFromHash() };
  if (!state.idea && Detail.isOpen()) Detail.close();
  if (state.screen !== currentScreen) showScreen(state.screen, { focus: true });
  if (state.idea && !Detail.isOpen()) Detail.open(state.idea, { push: false });
});

/* ==========================================================
   7. BOTÃO SIM
   ========================================================== */
const btnYes = $('#btnYes');
const curtain = $('#curtain');
let accepting = false;

function resetYes() {
  accepting = false;
  btnYes.classList.remove('is-pressed');
  $('.btn__label', btnYes).textContent = 'SIM, EU TOPO!';
}

async function acceptInvite() {
  if (accepting) return;
  accepting = true;
  NoButton.hideBubble();

  const r = btnYes.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  btnYes.classList.add('is-pressed');
  $('.btn__label', btnYes).textContent = 'EBAAA!';
  heartBurst(cx, cy, 14);
  announce('Convite aceito! Abrindo o catálogo de encontros.');

  const goToCatalog = () => {
    history.pushState({ screen: 'catalog' }, '', '#catalogo');
    showScreen('catalog', { focus: true });
  };

  if (reducedMotion()) { goToCatalog(); return; }

  await wait(520);

  // Cortina vinho que cresce a partir do botão, com coraçõezinhos subindo
  curtain.style.setProperty('--cx', `${cx}px`);
  curtain.style.setProperty('--cy', `${cy}px`);
  for (let i = 0; i < 9; i++) {
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.innerHTML = HEART_SVG;
    h.style.left = `${rand(8, 92)}%`;
    h.style.animationDelay = `${rand(0, 500)}ms`;
    h.style.setProperty('--r', `${rand(-30, 30)}deg`);
    h.style.width = h.style.height = `${rand(12, 26)}px`;
    curtain.appendChild(h);
  }
  void curtain.offsetWidth;
  curtain.classList.add('is-in');
  await wait(1250);

  goToCatalog();
  curtain.classList.add('is-out');
  curtain.classList.remove('is-in');
  await wait(600);
  curtain.classList.remove('is-out');
  $$('.float-heart', curtain).forEach((h) => h.remove());
}

btnYes.addEventListener('click', acceptInvite);

/* ==========================================================
   8. BOTÃO NÃO FUJÃO
   ----------------------------------------------------------
   Sequência: treme → ganha perninhas → corre (com poeira) →
   balão de fala → pode sumir pela borda e reaparecer.
   Depois de CONFIG.noMaxEscapes fugas ele se cansa e aceita
   o clique. Pelo teclado (Enter/Espaço), leitor de tela ou
   com "movimento reduzido", o NÃO funciona na hora.
   ========================================================== */
const NoButton = (() => {
  const slot = $('#noSlot');
  const run = $('#runaway');
  const btn = $('#btnNo');
  const bubble = $('#bubble');
  const declineWrap = $('#declineWrap');

  const LINES = [
    'EU NÃO FUI PROGRAMADO PRA ISSO 😭',
    'socorro, ela tá vindo!! 🏃',
    'tô sem fôlego... pode clicar 😮‍💨',
  ];

  const s = { escapes: 0, busy: false, free: false, x: 0, y: 0, ignoreClickUntil: 0, bubbleTimer: 0 };

  const isTired = () => s.escapes >= CONFIG.noMaxEscapes;

  function setPos(x, y, animate = true) {
    if (!animate) run.style.transition = 'none';
    run.style.left = `${x}px`;
    run.style.top = `${y}px`;
    s.x = x; s.y = y;
    if (!animate) { void run.offsetWidth; run.style.transition = ''; }
  }

  /** Solta o botão do layout e passa a posicioná-lo na tela. */
  function free() {
    if (s.free) return;
    const r = run.getBoundingClientRect();
    slot.style.width = `${r.width}px`;
    slot.style.height = `${r.height}px`;
    slot.classList.add('is-empty');
    document.body.appendChild(run);
    run.classList.add('is-free');
    setPos(r.left, r.top, false);
    s.free = true;
  }

  /** Escolhe um destino longe do dedo/cursor e longe do botão SIM. */
  function pickTarget() {
    const w = run.offsetWidth;
    const h = run.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const half = Math.min(130, vw / 2 - 16); // espaço pro balão não sair da tela
    const minX = Math.max(16, half - w / 2);
    const maxX = Math.max(minX, vw - Math.max(16, half - w / 2) - w);
    const minY = 110;
    const maxY = Math.max(minY, vh - h - 50);
    // Áreas proibidas: o botão SIM e o link de recusa (precisam continuar clicáveis)
    const avoid = [btnYes.getBoundingClientRect()];
    if (!declineWrap.hidden) avoid.push(declineWrap.getBoundingClientRect());
    const overlaps = (x, y) => avoid.some((r) =>
      x < r.right + 24 && x + w > r.left - 24 && y < r.bottom + 50 && y + h > r.top - 24);

    let best = null;
    let bestScore = -1;
    for (let i = 0; i < 40; i++) {
      const x = rand(minX, maxX);
      const y = rand(minY, maxY);
      if (overlaps(x, y)) continue;
      const dist = Math.hypot(x - s.x, y - s.y);
      if (dist > Math.min(200, vw * 0.45)) return { x, y };
      if (dist > bestScore) { bestScore = dist; best = { x, y }; }
    }
    return best || { x: minX, y: maxY };
  }

  /** Nuvenzinhas de poeira saindo dos pés. */
  function dust(direction) {
    if (reducedMotion()) return;
    const r = run.getBoundingClientRect();
    const footY = r.bottom + 16;
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('span');
      p.className = 'dust';
      p.style.left = `${r.left + r.width / 2 + rand(-18, 18)}px`;
      p.style.top = `${footY + rand(-4, 4)}px`;
      p.style.setProperty('--dx', `${-direction * rand(20, 60)}px`);
      p.style.setProperty('--dy', `${rand(-26, -4)}px`);
      p.style.setProperty('--s', rand(1.2, 2.2).toFixed(2));
      p.style.animationDelay = `${i * 40}ms`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  }

  function showBubble(text) {
    clearTimeout(s.bubbleTimer);
    bubble.textContent = text;
    bubble.classList.toggle('is-below', s.free && s.y < 150);
    bubble.classList.add('is-on');
    s.bubbleTimer = setTimeout(hideBubble, 2600);
  }
  function hideBubble() {
    clearTimeout(s.bubbleTimer);
    bubble.classList.remove('is-on');
  }

  /** Corre até (x, y) com poeira e pernas animadas. */
  async function dashTo(x, y, { fast = false } = {}) {
    const dir = x < s.x ? -1 : 1;
    run.classList.toggle('face-left', dir < 0);
    run.classList.add('is-running');
    run.classList.toggle('is-dashing', fast);
    dust(dir);
    setPos(x, y);
    const puff = setInterval(() => dust(dir), 220);
    await wait(fast ? 430 : 640);
    clearInterval(puff);
    run.classList.remove('is-dashing');
  }

  async function escape() {
    if (s.busy || isTired()) return;
    s.busy = true;
    s.escapes += 1;
    hideBubble();

    // 1. treme de nervoso
    run.classList.add('is-nervous');
    await wait(380);
    run.classList.remove('is-nervous');

    // 2. ganha perninhas
    run.classList.add('has-legs');
    await wait(220);

    // 3–4. corre pra outro lugar, levantando poeira
    free();
    const target = pickTarget();
    if (s.escapes === 2) {
      // 6. some pela borda da tela... e reaparece do outro lado
      const vw = document.documentElement.clientWidth;
      const goRight = s.x + run.offsetWidth / 2 > vw / 2;
      await dashTo(goRight ? vw + 40 : -run.offsetWidth - 40, s.y, { fast: true });
      setPos(goRight ? -run.offsetWidth - 40 : vw + 40, target.y, false);
      await wait(250);
      await dashTo(target.x, target.y);
    } else {
      await dashTo(target.x, target.y);
    }
    run.classList.remove('is-running');

    // 5. balão de fala
    showBubble(LINES[Math.min(s.escapes - 1, LINES.length - 1)]);
    declineWrap.hidden = false;
    announce('O botão NÃO saiu correndo. Se quiser recusar de verdade, use o link “responder não de verdade”.');

    await wait(500);
    run.classList.remove('has-legs');
    if (isTired()) run.classList.add('is-tired');
    s.busy = false;
  }

  function decline() {
    hideBubble();
    history.pushState({ screen: 'declined' }, '', '#tudo-bem');
    showScreen('declined', { focus: true });
  }

  /** Coloca o botão de volta no lugar original. */
  function reset() {
    hideBubble();
    if (s.free) {
      slot.appendChild(run);
      run.classList.remove('is-free', 'face-left');
      run.style.left = run.style.top = run.style.transition = '';
      slot.style.width = slot.style.height = '';
      slot.classList.remove('is-empty');
    }
    run.classList.remove('is-running', 'has-legs', 'is-nervous', 'is-tired', 'is-dashing');
    declineWrap.hidden = true;
    Object.assign(s, { escapes: 0, busy: false, free: false, x: 0, y: 0 });
  }

  // Toque / clique com mouse: foge antes do clique acontecer.
  btn.addEventListener('pointerdown', (e) => {
    if (reducedMotion() || isTired() || currentScreen !== 'invite') return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    s.ignoreClickUntil = performance.now() + 900;
    escape();
  });

  // No desktop, o cursor chegando perto já assusta o botão.
  btn.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse' || reducedMotion() || currentScreen !== 'invite') return;
    if (isTired()) { if (!s.busy) showBubble('tá bom... pode clicar 😔'); return; }
    escape();
  });

  btn.addEventListener('click', (e) => {
    if (performance.now() < s.ignoreClickUntil || s.busy) { e.preventDefault(); return; }
    // e.detail === 0 → teclado ou leitor de tela: respeita o NÃO na hora.
    if (e.detail === 0 || isTired() || reducedMotion()) { decline(); return; }
    escape();
  });

  $('#btnDeclineForReal').addEventListener('click', decline);

  // Se a tela mudar de tamanho, mantém o botão visível.
  window.addEventListener('resize', () => {
    if (!s.free) return;
    const vw = document.documentElement.clientWidth;
    const x = Math.min(Math.max(16, s.x), vw - run.offsetWidth - 16);
    const y = Math.min(Math.max(16, s.y), window.innerHeight - run.offsetHeight - 40);
    setPos(x, y, false);
  });

  return { reset, hideBubble };
})();

$('#btnBackToInvite').addEventListener('click', () => {
  history.pushState({ screen: 'invite' }, '', location.pathname + location.search);
  showScreen('invite', { focus: false });
  btnYes.focus({ preventScroll: true });
});

/* ==========================================================
   9. CATÁLOGO
   ========================================================== */
const Catalog = (() => {
  const list = $('#cards');
  let observer = null;

  function versusMini() {
    return `
      <div class="vs-mini" aria-hidden="true">
        <span>${CONFIG.myName}</span><b>vs</b><span>${firstName(CONFIG.herName)}</span>
        <small>Resultado: a definir depois de comer</small>
      </div>`;
  }

  function cardHTML(a, i) {
    return `
      <li class="card${a.featured ? ' card--featured' : ''}" style="--tint:${a.tint}; --d:${(i % 3) * 90}ms">
        <div class="card__art">${ART[a.art]}</div>
        <div class="card__body">
          <p class="card__num"><span>IDEIA ${pad(i + 1)}</span><span aria-hidden="true">${a.emoji}</span></p>
          <h3 class="card__title">${a.title}</h3>
          <p class="card__punch">${a.punch}</p>
          ${a.featured ? versusMini() : ''}
          <button class="card__btn" type="button" data-open="${a.id}" aria-label="Ver essa ideia: ${a.title}">
            Ver essa ideia <span aria-hidden="true">→</span>
          </button>
        </div>
        ${a.featured ? '<span class="card__badge" aria-hidden="true">destaque<br>da casa</span>' : ''}
      </li>`;
  }

  function render() {
    list.innerHTML = ACTIVITIES.map(cardHTML).join('');
    $('#statCount').textContent = ACTIVITIES.length;
    list.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open]');
      if (trigger) Detail.open(trigger.dataset.open);
    });

    // Botão "sugerir outro rolê"
    const suggest = $('#btnSuggest');
    const warn = $('#suggestWarn');
    setupWhatsAppLink(suggest, warn, CONFIG.suggestionMessage);
    guardWhatsAppClick(suggest, warn);
  }

  /** Cartões aparecem suavemente quando entram na tela. */
  function reveal() {
    const cards = $$('.card', list);
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      cards.forEach((c) => c.classList.add('is-in'));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); observer.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    cards.forEach((c) => { if (!c.classList.contains('is-in')) observer.observe(c); });
  }

  return { render, reveal };
})();

/* ==========================================================
   10. MODAL DE DETALHES
   ========================================================== */
const Detail = (() => {
  const dialog = $('#detail');
  const els = {
    art: $('#detailArt'),
    kicker: $('#detailKicker'),
    title: $('#detailTitle'),
    desc: $('#detailDesc'),
    extra: $('#detailExtra'),
    fine: $('#detailFine'),
    whats: $('#btnWhats'),
    warn: $('#whatsWarn'),
    scroll: $('.detail__scroll', dialog),
  };
  let lastTrigger = null;
  let closing = false;

  function versusFull() {
    const me = CONFIG.myName;
    const her = firstName(CONFIG.herName);
    return `
      <div class="versus" role="group" aria-label="Placar do tour gastronômico">
        <div class="versus__side">
          <span class="versus__who">${me}</span>
          <span class="versus__label">Encontro 1 · culinária escolhida por mim</span>
          <span class="versus__slot">a combinar</span>
        </div>
        <span class="versus__vs" aria-hidden="true">vs</span>
        <div class="versus__side">
          <span class="versus__who">${her}</span>
          <span class="versus__label">Encontro 2 · culinária escolhida por você</span>
          <span class="versus__slot">a combinar</span>
        </div>
        <p class="versus__result"><strong>Resultado:</strong> a definir depois de comer 🍽️</p>
      </div>
      <div class="inspire">
        <button class="chip" type="button" data-shuffle><span aria-hidden="true">🎲</span> Sortear uma inspiração</button>
        <span class="inspire__out" data-shuffle-out aria-live="polite"></span>
        <small>Só pra dar ideia. A escolha oficial a gente combina no WhatsApp.</small>
      </div>`;
  }

  /** Mini roleta de culinárias (só inspiração, não muda a mensagem). */
  async function shuffle(btn) {
    const out = $('[data-shuffle-out]', dialog);
    if (!out || btn.disabled) return;
    btn.disabled = true;
    const pick = () => CUISINES[Math.floor(Math.random() * CUISINES.length)];
    if (!reducedMotion()) {
      out.classList.add('is-rolling');
      for (let i = 0; i < 12; i++) {
        out.textContent = pick();
        await wait(45 + i * 12);
      }
      out.classList.remove('is-rolling');
    }
    let final = pick();
    while (final === out.textContent) final = pick();
    out.textContent = `Que tal: comida ${final.toLowerCase()}?`;
    btn.disabled = false;
  }

  function open(id, { push = true } = {}) {
    const index = ACTIVITIES.findIndex((a) => a.id === id);
    if (index < 0) return;
    const a = ACTIVITIES[index];

    lastTrigger = $(`[data-open="${id}"]`);
    dialog.dataset.activity = a.id;
    dialog.style.setProperty('--tint', a.tint);

    els.art.innerHTML = ART[a.art];
    els.kicker.textContent = `Ideia ${pad(index + 1)} de ${pad(ACTIVITIES.length)}  ${a.emoji}`;
    els.title.textContent = a.title;
    els.desc.innerHTML = a.description.map((p) => `<p>${p}</p>`).join('');
    els.extra.innerHTML = a.id === 'tour' ? versusFull() : '';
    els.fine.innerHTML = `<strong>Letras miúdas:</strong> ${a.fine}`;

    // A mensagem vem do objeto da atividade (pelo id), nunca do título na tela.
    setupWhatsAppLink(els.whats, els.warn, a.message);
    els.whats.dataset.activity = a.id;

    closing = false;
    dialog.classList.remove('is-closing');
    if (!dialog.open) dialog.showModal();
    els.scroll.scrollTop = 0;
    $('.detail__close', dialog).focus({ preventScroll: true });

    if (push) history.pushState({ screen: 'catalog', idea: a.id }, '', `#ideia-${a.id}`);
  }

  function close() {
    if (!dialog.open || closing) return;
    if (reducedMotion()) { dialog.close(); return; }
    closing = true;
    dialog.classList.add('is-closing');
    setTimeout(() => {
      dialog.classList.remove('is-closing');
      dialog.close();
      closing = false;
    }, 250);
  }

  /** Fecha usando o histórico (assim o "voltar" do celular fica coerente). */
  function requestClose() {
    if (history.state && history.state.idea) history.back();
    else close();
  }

  dialog.addEventListener('close', () => {
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });

  // Esc
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); requestClose(); });

  dialog.addEventListener('click', (e) => {
    // clique no fundo escuro (fora do conteúdo)
    if (e.target === dialog) { requestClose(); return; }
    if (e.target.closest('[data-close]')) { requestClose(); return; }
    const sh = e.target.closest('[data-shuffle]');
    if (sh) shuffle(sh);
  });

  guardWhatsAppClick(els.whats, els.warn);
  els.whats.addEventListener('click', () => {
    if (els.whats.getAttribute('aria-disabled') === 'true') return;
    const r = els.whats.getBoundingClientRect();
    heartBurst(r.left + r.width / 2, r.top + r.height / 2, 10);
  });

  return { open, close, isOpen: () => dialog.open };
})();

/* ==========================================================
   11. INICIALIZAÇÃO
   ========================================================== */
(function init() {
  fillNames();
  Catalog.render();

  const hash = location.hash;
  if (hash === '#catalogo' || hash.startsWith('#ideia-')) {
    // Recarregou no meio da navegação: volta direto pro catálogo.
    history.replaceState({ screen: 'catalog' }, '', '#catalogo');
    showScreen('catalog');
    if (hash.startsWith('#ideia-')) Detail.open(hash.slice('#ideia-'.length));
  } else {
    history.replaceState({ screen: 'invite' }, '', location.pathname + location.search);
    showScreen('invite');
  }
})();
