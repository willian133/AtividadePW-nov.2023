
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

        let xx_start = Camera.get_x >> (Resources._size>>2);
        let yy_start = Camera.get_y >> (Resources._size>>2);
        let xx_end = xx_start + (Game.get_width >> (Resources._size>>2))+1;
        let yy_end = yy_start + (Game.get_height >> (Resources._size>>2))+1;
        for(let yy=yy_start; yy<=yy_end; yy++){
            for(let xx=xx_start; xx<=xx_end; xx++){
                if(xx<0 || yy<0 || xx>=this.get_width || yy>=this.get_width){
                    continue;
                }
                let tile = this._tiles[xx+yy*this.get_width];

                if(tile){
                    if(tile instanceof(Tile))
                        tile.render(g);
                }
            }
        }

    }
    

    _load_map(path){
        let img = new Image();
        img.onload = ()=>{
            let cv = document.createElement("canvas");
            this._set_width = img.width;
            this._set_height = img.height;
            cv.width = this.get_width;
            cv.height = this.get_height;
            let ctx = cv.getContext("2d");
            ctx.drawImage(img, 0, 0);
            
            for(let yy=0; yy<cv.height; yy++){
                for(let xx=0; xx<cv.width; xx++){
                    let data = ctx.getImageData(xx, yy, 1 ,1).data
                    let rgba = Number(`0x${Number(data[0]).toString(16)}${Number(data[1]).toString(16)}${Number(data[2]).toString(16)}${Number(data[3]).toString(16)}`);
                                        
                    let rs = Resources.get_assossiation[rgba];
                    
                    if(!rs) {
                        console.log(xx, yy, Number(rgba).toString(16));
                        continue;
                    }

                    let tile_entity = rs['className'];
                    if(tile_entity){                    
                        if(Entity.isPrototypeOf(tile_entity)){
                            new tile_entity(xx*Resources.get_size, yy*Resources.get_size, rs['sprites']);
                            rs = Resources.get_assossiation[0x00000000];//grama por padrão                     
                            tile_entity = rs['className'];
                        }
                        this._tiles.push(new tile_entity(xx*Resources.get_size, yy*Resources.get_size, rs['sprites']));
                    } 
                }
            }

        };
        img.src = path;
        // new Player(-16, -16, Resources.get_sprite(0x0000FFFF));
    }

    //Retorna {}. dic[cor] = func(x, y) -> returns TileType já instanciado entidades;

    get get_width(){return this._width}
    get get_height(){return this._height}

    set _set_width(width){this._width = width}
    set _set_height(height){this._height = height}

    get get_tiles(){return this._tiles}
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
    _sprites = [];
    _current_sprite = 0;
    _x;
    _y;
    constructor(x, y, sprites){
        this._x = x;
        this._y = y;
        this._sprites = sprites;
    }

    render(graphics){
        let g = graphics;
        g.drawImage(this._sprites[this._current_sprite], this.get_x-Camera.get_x, this.get_y - Camera.get_y);
    }
    get get_x(){return this._x}
    get get_y(){return this._y}
}

class Wall extends Tile{
    constructor(x, y, sprites){
        super(x, y, sprites);
    }
}
class Grass extends Tile{
    constructor(x, y, sprites){
        super(x, y, sprites);
    }
    
}

