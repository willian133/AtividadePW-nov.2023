
//CLASS WORLD PARA CONVERTER PIXELS DE UMA IMAGEM EM UM MAPA JOGÁVEL
class World{
    width;
    height;
    tiles = []; //vetor com todos os tiles do game
    association;
    constructor(path_of_sheet) {
        this._load_map();  
        this.width = 50;
        this.height = 50;

    }

    render(graphics){
        let g = graphics;

    }

    _load_map(){
        new Player(0, 0, Resources.get_sprite(0xFF0000FF))
    }
    
}

class Camera{
    static _x=0;
    static _y=0;

    static border(current, min, max){
        if(current<min) current = min;
        if(current>max) current = max;
        return current;
    }

    static get get_x() { return this._x; }
    static get get_y() { return this._y; }
    static set set_x(x) { this._x = x; }
    static set set_y(y) { this._y = y; }

}

class Tile{
    sprites = [];
    x;
    y;
    constructor(x, y, tile_color){
        this.x = x;
        this.y = y;
        sprites = _load_sprites(tile_color);
    }

    render(graphics){
        graphics.drawImage(sprites[0], x-Camera.get_x, y-get_y);
    }

    static _load_sprites(tile_color){
        return null;
    }
}

class Wall extends Tile{}
class Grass extends Tile{

}
