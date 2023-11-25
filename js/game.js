let _canvas = document.getElementById('game_window');
let _graphics = _canvas.getContext("2d");
let game;
class Game{
    constructor(){
        // DEFININDO TAMANHO DA JANELA
        this.WIDTH_WINDOW  = 720;// comprimento da tela
        this.HEIGHT_WINDOW = 480;// altura da tela
        this.SCALE  = 3;  // escala com relação aos pixels
        this.WIDTH = this.WIDTH_WINDOW / this.SCALE;  // comprimento em escala do jogo
        this.HEIGHT = this.HEIGHT_WINDOW / this.SCALE;// largura em escala do jogo;

        //ALTERANDO ELEMENTO CANVAS
        _canvas.width = this.WIDTH_WINDOW;
        _canvas.height = this.HEIGHT_WINDOW;
        this._graphics = _graphics;

    }

    //ATUALIZA A LÓGICA DO GAME
    _update(){

    }

    //ATUALIZA O QUE É MOSTRADO NO CANVAS
    _render(){
        //RESETAR A TELA COM UM FUNDO PRETO
        this._graphics.fillStyle = "rgb(0,0,0)";
        this._graphics.fillRect(0, 0, this.WIDTH_WINDOW, this.HEIGHT_WINDOW);
        
        //EXEMPLO DE TEXTO A SER PRINTADO
        this._graphics.font = "bold 20px Courier";
        this._graphics.fillStyle = "rgb(255,0,0)";
        this._graphics.fillText("Press the button", 20, 20);

    }

    //roda o loop principal do game
    loop(){
        this._update();
        this._render();
    }

    static new_game(){
        let teste = Game;
        if(teste){
            game = new teste();
        }

        // game = new Game();
    }

    //faz o jogo dar início ao loop principal
    static start(){
        //faz o método loop rodar 30 vezes por segundo
        setInterval(() => game.loop(), 1000/30);
    }
}

class Keyboard{
    static listening; 
    static _keys = {};

}

Game.new_game();
Game.start();

