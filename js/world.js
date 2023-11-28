
//CLASS WORLD PARA CONVERTER PIXELS DE UMA IMAGEM EM UM MAPA JOGÁVEL
class World{
    _width;
    _height;
    _tiles = []; //vetor com todos os tiles do game
    constructor(path_of_sheet) {
        this._load_map(path_of_sheet);  

        


    }

    update(){

    }

    render(graphics){
        let g = graphics;

    }
    

    _load_map(path){
        let img = new Image();
        img.onload = ()=>{
            let cv = document.createElement("canvas");
            cv.width = img.width;
            cv.height = img.height;
            let ctx = cv.getContext("2d");
            ctx.drawImage(img, 0, 0);

            for(let xx=0; xx<cv.width; xx++){
                for(let yy=0; yy<cv.height; yy++){
                    let data = ctx.getImageData(xx, yy, 1 ,1).data
                    let rgba = Number(`0x${Number(data[0]).toString(16)}${Number(data[1]).toString(16)}${Number(data[2]).toString(16)}${Number(data[3]).toString(16)}`);
                    
                    let tile_entity = Resources.get_assossiation[rgba]['className'];
                    if(tile_entity){
                        if(tile_entity instanceof(Entity)){
                            // new Player(xx, yy, )
                            // tile_entity = 
                        }
                        // this._tiles.push(tile_entity);
                    } 
                    break;
                }
                break;
            }

        };
        img.src = path;
        new Player(-16, -16, Resources.get_sprite(0xFF0000FF));
    }

    //Retorna {}. dic[cor] = func(x, y) -> returns TileType já instanciado entidades;

    get get_width(){this._width}
    get get_height(){this._height}

    set _set_width(width){this._width = width}
    set _set_height(height){this._height = height}
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

