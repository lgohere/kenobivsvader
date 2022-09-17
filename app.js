new Vue({
  el: "#app",
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: [],
    attackEffect: false,
  },

  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0;
    },
  },

  methods: {
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    attack(special) {
      this.hurt(
        "monsterLife",
        5,
        10,
        special,
        "Obi-Wan",
        "Darth Vader",
        "player"
      );

      if (this.monsterLife > 0) {
        this.hurt(
          "playerLife",
          7,
          12,
          false,
          "Darth Vader",
          "Obi-Wan",
          "monster"
        );
      }
      //playerLife é o valor de 'atr'

      //o player vai sempre perder mais que o monstro.
      // special é passado como parametro pq o monstro deve estar sujeito
      // a receber também esse ataque - o special portanto é passado como true.
    },

    hurt(atr, min, max, special, source, target, css) {
      const plus = special ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      //this.playerLife = Math.max(this.playerLife - hurt, 0)
      // foi substituido pelo abaixo.
      this[atr] = Math.max(this[atr] - hurt, 0);
      // source = a origem do attack = Obi-Wan ou Darth Vader
      // target = o alvo do attack = Obi-Wan ou Darth Vader
      // css = a classe para quem feriu = player ou monster
      this.registerLog(
        `${source} attacked ${target}! -${hurt} of damage!`,
        css
      );
    },

    healAndHurt() {
      this.heal(10, 15);
      //primeiro o jogador é curado..
      this.hurt(
        "playerLife",
        7,
        12,
        false,
        "Darth Vader",
        "Obi-Wan",
        "monster"
      );
      // o player não pode ser ferido com ataque especial, somento o monstro.
      // portanto recebe como ultimo parâmetro o false.
    },

    heal(min, max) {
      const heal = this.getRandom(min, max);
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.registerLog(`Obi-Wan gained ${heal} of strength.`, "player");
      // será pego o menor valor dos dois.
      // ex.: se a expressao der 103: o maior número será 100
      // se a expressao der menor do que 100: será recebido o valor da expressão.
    },

    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },

    registerLog(text, css) {
      this.logs.unshift({ text, css });
      //sempre os logs mais recentes ficarão no topo da column.
    },
  },
  watch: {
    hasResult(value) {
      if (value) this.running = false;
    },
  },
});

/* 

----> getRandom()
função que é responsavel por calcular um valor minimo e maximo:

na constante 'value' o Math.random() gera um valor entre 0 e 1
esse valor é multiplicado  pelo valor 'max - min' (entre 5 e 10 ou seja
    10 - 5 = 5) ele pega 5 soma pelo valor minimo o que retornará
    o arrendondamento que tanto poderá ir para 5 quanto para 10.~

-----------------------------------------------------------------------


----> hurt(min, max, special)
recebe um valor minimo e um valor maximo
e recebe a flex se é um ataque special ou não.

# para um ataque special:
cria-se a const 'plus' que:
caso for verdadeiro: recebe 5,
caso for falso: recebe 0,

# para o tamanho do dano:
cria-se a const 'hurt' que:
aplica-se this.getRandom(min+ plus, max + plus)
- se o special for FALSE o plus será 0, o min e max que forem passados
serão somados com 0.
- se o special for TRUE o plus será 5, o min e max que forem passados
serão somados com 5.

O valor calculado será aplicado ao playerLife:
this.playerLife = Math.max(this.playerLife - hurt, 0)

Por que é usado o Math.max()??
Está sendo usado para que seja evitado que o valor de playerLife
seja NEGATIVO.
Que o playerLife a partir do dano gerado em hurt não seja inferior
a 0. 
Se o resultado gerado for negativo o maior entre os dois parametros
(this.playerLife e hurt) será 0.
Se o resultado gerado for positivo, o maior entre os dois parametros
será o valor positivo, ou seja, maior que 0.

-----------------------------------------------------------------------

A partir da função 'hurt()', como afetar tanto o playerLife como monsterLife?

Em Javascript:
Se há uma const como:
const aluno = { nome: 'Ana', nota: 9.5}

E uma let como:
let atr (de atributo) = 'nome'

É possivel acessar o nome do aluno de diferentes formas:
1) aluno.nome
2) aluno['nome']
3) aluno[atr] -> nesse exemplo ele lê o conteúdo da varíavel e acessa
um atributo dentro de um objeto.

Portanto, é possivel passar para a função 'hurt()' o nome do atributo 
que ele passe a atender. Nesse caso:

hurt(atr, min, max, special) {}



*/
