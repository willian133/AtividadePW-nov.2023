
//CLASS WORLD PARA CONVERTER PIXELS DE UMA IMAGEM EM UM MAPA JOGÁVEL
class World{
    width;
    height;
    tiles = []; //vetor com todos os tiles do game
    association;
    constructor(path_of_sheet) {
        this._load_map();    
    }

    render(graphics){
        let g = graphics;
        // g.drawImage(Resources.get_sprite(0xFF000000)[0], 0, 0, 16, 16, 16, 16, 128, 128);
        // g.drawImage(Resources.get_sprite(0xFF000000)[0], 0, 0, 16, 16, 16, 16, 128, 128);
        // g.drawImage(Resources.get_sprite(0xFF0000FF).direita[0], 0, 0, 16, 16, 16, 16, 128, 128);
        // xx_start = 
    }

    _load_map(){
        new Player(0, 0, Resources.get_sprite(0xFF0000FF))
    }
    
}

class Camera{
    static _x=0;
    static _y=0;

    static bordered(current, min, max){
        if(current<min) atual = min;
        if(current>max) atual = max;
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
