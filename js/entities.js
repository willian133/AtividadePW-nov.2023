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
    //KEYS - armazena as teclas que a classe utilizara
    static KEYS = {up: 'w', down: 's', left: 'a', right: 'd', nothing: 0};
    _keyboard_listeners = {};
    _commands = {};
    _last_directional_pressed = Player.KEYS.nothing;
    _sprite_direction = Player.KEYS.right;
    _current_sprite_position = 0;
    _speed = 2; 

    constructor(x, y, sprites){
        super(x, y, sprites);
        this._add_listeners();
        this._add_commands();
        for(let key in this._keyboard_listeners)
            KeyboardListener.add_listener(key, this._keyboard_listeners[key])
    }

    update(){
        // Verificação nos direcionais para realizar movimentação com o pressionamento dos direcionais
        if(this._last_directional_pressed != Player.KEYS.nothing){//verifica se já havia algum direcional sendo pressinonado anteriormente (prioridade de movimentação para o que já estava sendo pressonado)
            let command = this._commands[this._last_directional_pressed];
            this._last_directional_pressed = command.event(command.is_pressed)
        }else{
            let directionals = [Player.KEYS.up, Player.KEYS.down, Player.KEYS.left, Player.KEYS.right];
            for(let d in directionals){
                let i = directionals[d];
                let command = this._commands[i];
                if(command.event){
                    let dir = command.event(command.is_pressed);
                    if(dir != Player.KEYS.nothing){
                        this._last_directional_pressed = dir;
                        break;
                    }
                } 
            }
        }
        
        //Troca de sprites, tanto de direção quanto de sequência(para formação de animação de caminhada)
        let world = Game.game.world;
        Camera.set_x = Camera.border(Math.floor(this.get_x - Game.game.WIDTH/2), 0, world.width*Resources._size - Game.game.WIDTH);
        Camera.set_y = Camera.border(Math.floor(this.get_y - Game.game.HEIGHT/2), 0, world.height*Resources._size - Game.game.HEIGHT);

    }

    render(graphics){
        let g = graphics;
        g.drawImage(this._sprites[this._sprite_direction][this._current_sprite_position], this.get_x - Camera.get_x, this.get_y - Camera.get_y)

    }

    //adiciona eventos para serem ativados de acordo com as entradas do teclado
    _add_commands(){
        //UP
        this._commands[Player.KEYS.up].event = (is_pressed) => {
            if(!is_pressed) return Player.KEYS.nothing;
            let y;
            if((y = this.get_y - this.get_speed) >= 0){//verifica para ver se o player não está fora da tela
                if(this.will_not_collide(this.get_x, y))
                    this.set_y = this.get_y - this.get_speed;
            }else{
                this.set_y = 0;
            }

            return Player.KEYS.up;
        };
        //DOWN
        this._commands[Player.KEYS.down].event = (is_pressed) => {
            if(!is_pressed) return Player.KEYS.nothing; 

            if(this.will_not_collide(this.get_x, this.get_y + this.get_speed)){
                this.set_y = this.get_y + this.get_speed;
            }
            
            return Player.KEYS.down;
        };
        //LEFT
        this._commands[Player.KEYS.left].event = (is_pressed) => {
            if(!is_pressed) return Player.KEYS.nothing;
            
            let x;
            if((x = this.get_x - this.get_speed) >= 0){ //verifica para ver se o player não está fora da tela
                if(this.will_not_collide(x, this.get_y))
                    this.set_x = this.get_x - this.get_speed;
            }else{
                this.set_x = 0;
            }
            
            return Player.KEYS.left;
        };
        //RIGHT
        this._commands[Player.KEYS.right].event = (is_pressed) => {
            if(!is_pressed) return Player.KEYS.nothing;

            if(this.will_not_collide(this.get_x + this.get_speed, this.get_y)){
                this.set_x = this.get_x + this.get_speed;
            }

            return Player.KEYS.right;
        };

    }

    //adiciona escuta para as teclas que a classe vai reagir
    _add_listeners(){
        //ADICIONA ESCUTAS PARA AS TECLAS DIRECIONAIS PARA CONTROLAR O PLAYER...
        let keys = Player.KEYS;
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

    //retorna verdadeiro quando não está colidindo com nada. falso quando está colidindo.
    will_not_collide(x, y){
        return true;
    }

    get get_speed(){return this._speed}
    set set_speed(speed){this._speed = speed}
}
