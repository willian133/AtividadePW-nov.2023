//Canvas HTML element;
let _canvas = document.getElementById('game_window');

//armazenará a instância principal de Game;
class Game{
    static game;
    static _path_map = "assets/map.png"; 
    world;

    constructor(){
        // DEFININDO TAMANHO DA JANELA
        this.WIDTH_WINDOW  = 720;// comprimento da tela
        this.HEIGHT_WINDOW = 480;// altura da tela
        this.SCALE  = 1;  // escala com relação aos pixels
        this.WIDTH = this.WIDTH_WINDOW / this.SCALE;  // comprimento em escala do jogo
        this.HEIGHT = this.HEIGHT_WINDOW / this.SCALE;// largura em escala do jogo;

        //ALTERANDO ELEMENTO CANVAS
        _canvas.width = this.WIDTH_WINDOW;
        _canvas.height = this.HEIGHT_WINDOW;
        this._graphics = _canvas.getContext("2d");

        //Mapa e entidades
        this.entidades = [];
    }

    //ATUALIZA A LÓGICA DO GAME
    update(){
        let ett = Entity.entities;
        for(let i in ett){
            let e = ett[i];
            if(e instanceof Player){ // Player
                e.update();
            }else{
                e.update();
            }
        }
    }

    //ATUALIZA O QUE É MOSTRADO NO CANVAS
    render(){
        let g = this._graphics
        
        //RESETAR A TELA COM UM FUNDO PRETO
        g.fillStyle = "rgb(0,0,0)";
        g.fillRect(0, 0, this.WIDTH_WINDOW, this.HEIGHT_WINDOW);
        
        //EXEMPLO DE TEXTO A SER PRINTADO
        // g.font = "bold 20px Courier";
        // g.fillStyle = "rgb(255,0,0)";
        // g.fillText("Press the button", 20, 20);

        this.world.render(g)

        let ett = Entity.entities;
        for(let i in ett){
            let e = ett[i];
            if(e instanceof Player){ //Player
                e.render(g);
            }else{
                e.render(g);
            }
        }
    }

    //roda o loop principal do game
    loop(){
        this.update();
        this.render();
    }

    static new_game(){
        Game.game = new Game();
    }

    //faz o jogo dar início ao loop principal
    static start(){
        //faz o método loop rodar 30 vezes por segundo
        Game.game.world = new World(Game._path_map);
        setInterval(() => Game.game.loop(), 1000/60);
    }
}

class Keyboard{
    static listening; 
    static _keys = {};

}

class KeyboardListener{
    static _listeners = {};
    static add_listener(key, listener){
        if(!Keyboard._listeners){
            Keyboard._listeners = {};
        }
        if(!Keyboard._listeners[key]){
            Keyboard._listeners[key] = [];
        }
        Keyboard._listeners[key].push(listener);
    }
    static key_pressed(event){
        let key = (event.key + "").toLowerCase();
        let commands = Keyboard._listeners[key];
        if(commands){
            for(let i in commands){
                let command = commands[i];
                command(true);
            }
        }
    }
    static key_released(event){
        let key = (event.key + "").toLowerCase();
        let commands = Keyboard._listeners[key];
        if(commands){
            for(let i in commands){
                let command = commands[i];
                command(false);
            }
        }

    }
}

//adicionando escuta no teclado
document.addEventListener('keydown', KeyboardListener.key_pressed);
document.addEventListener('keyup', KeyboardListener.key_released);

//Instancia um novo jogo;
Game.new_game();

//Carrega recursos para então executar o jogo
Resources.load_resourses(Game.start);

