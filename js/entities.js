class Entity{
    static entities = [];
    _x;
    _y;
    _sprites = [];

    constructor(x, y, sprites){
        this._x = x;
        this._y = y;
        this._sprites = sprites;
        Entity.entities.push(this);
    }

    update(){

    }
    render(graphics){
        let g = graphics;
        g.drawImage(this._sprites["direita"][0], this.get_x, this.get_y)
    }

    get get_x(){return this._x};
    get get_y(){return this._y};
    set set_x(x) {this._x = x};
    set set_y(y) {this._y = y};
}

class Player extends Entity{ //não tem interface para adicionar KeyBoardListener...
    //_KEYS - armazena as teclas que a classe utilizara
    static _KEYS = {up: 'w', down: 's', left: 'a', right: 'd'};
    _keyboard_listeners = {};
    _commands = {};
    _last_directional_pressed;
    _speed = 3;

    constructor(x, y, sprites){
        super(x, y, sprites);
        this._add_listeners();
        this._add_commands();
        for(let key in this._keyboard_listeners)
            KeyboardListener.add_listener(key, this._keyboard_listeners[key])
    }

    update(){
        let a = '';
        for(let i in this._commands){
            let command = this._commands[i];
            a+=` ${i}: ${command.is_pressed}`
        }
        a+= '\n';
        console.log(a)
        
    }

    render(graphics){
        let g = graphics;
        // super.render(g);
    }

    //adiciona eventos para serem ativados de acordo com as entradas do teclado
    _add_commands(){
        this._commands[Player._KEYS.up].function = (is_pressed) => {

        };
        this._commands[Player._KEYS.down].function = (is_pressed) => {
            
        };
        this._commands[Player._KEYS.left].function = (is_pressed) => {
            
        };
        this._commands[Player._KEYS.right].function = (is_pressed) => {
            
        };

    }

    //adiciona escuta para as teclas que a classe vai reagir
    _add_listeners(){
        //ADICIONA ESCUTAS PARA AS TECLAS DIRECIONAIS PARA CONTROLAR O PLAYER...
        let keys = Player._KEYS;
        keys = [keys.left, keys.down, keys.right, keys.up];
        // arrows - teclas equivalentes para direcionais (mesma ordem de 'keys')
        let arrows = ['arrowleft', 'arrowdown', 'arrowright', 'arrowup'];
        for(let i in keys){
            let key = keys[i];
            let arrow_key = arrows[i];  
            this._commands[key] = new Object();        
            this._commands[key].is_pressed = false;        
            this._keyboard_listeners[key] = (is_pressed)=>{
                this._commands[key].is_pressed = is_pressed;
            };
            //adicona o as escutas nas teclas equivalentes 
            this._keyboard_listeners[arrow_key] = (is_pressed)=>{
                this._commands[key].is_pressed = is_pressed;
            };
        }
        //FIM DIRECIONAIS...
    }

}
