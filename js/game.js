//Canvas HTML element;
let _canvas = document.getElementById('game_window');

//armazenará a instância principal de Game;
class Game{
    static game;
    static _path_map = "assets/map.png"; 
    static _WIDTH_WINDOW  = 720;// comprimento da tela
    static _HEIGHT_WINDOW = 480;// altura da tela
    static _SCALE  = 3;  // escala com relação aos pixels
    static _WIDTH = Game.get_width_window / Game._SCALE;  // comprimento em escala do jogo
    static _HEIGHT = Game.get_height_window / Game._SCALE;// largura em escala do jogo;
    world;

    constructor(){
        // DEFININDO TAMANHO DA JANELA

        //ALTERANDO ELEMENTO CANVAS
        _canvas.width = Game.get_width_window;
        _canvas.height = Game.get_height_window;
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
        // RENDERIZA COM ESCALA
        
        // let g = this._graphics
        let c = document.createElement("canvas");
        let g = c.getContext("2d");
        c.width = Game.get_width;
        c.height = Game.get_height;

        //RESETAR A TELA COM UM FUNDO PRETO
        g.fillStyle = "rgb(0,0,0)";
        g.fillRect(0, 0, Game.get_width, Game.get_width);
        
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

        // -----------------------------------------
        // RENDERIZA SEM SCALA

        //converte o canvas de background em IMG
        let bg = new Image()
        bg.onload = ()=>{
            //dá zoom na imagem do background
            this._graphics.drawImage(bg, 0, 0, Game.get_width, Game.get_height, 0, 0, Game.get_width_window, Game.get_height_window);
        };
        bg.src = c.toDataURL();
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
    static get get_width_window(){return Game._WIDTH_WINDOW}
    static set set_width_window(width){Game._WIDTH_WINDOW = width}
    static get get_height_window(){return Game._HEIGHT_WINDOW}
    static set set_height_window(height){Game._HEIGHT_WINDOW = height}
    
    static get get_width(){return Game._WIDTH}
    static set _set_width(width){Game._WIDTH = width}
    static get get_height(){return Game._HEIGHT}
    static set _set_height(height){Game._HEIGHT = height}

    static get get_scale(){return Game._SCALE}
    static set set_scale(scale){
        Game._SCALE = scale
        Game._set_height = Math.floor(Game.get_height_window / scale);
        Game._set_width  = Math.floor(Game.get_width_window  / scale);
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

