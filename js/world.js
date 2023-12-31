
//CLASS WORLD PARA CONVERTER PIXELS DE UMA IMAGEM EM UM MAPA JOGÁVEL
class World{
    _width;
    _height;
    _tiles = []; //vetor com todos os this.get_tiles do game - equivalente a
    _entities = []; 
    constructor(path_of_sheet) {
        this._load_map(path_of_sheet);  
    }

    update(){
        let ett = this._entities;
        //percorre todas as entidades
        for(let i in ett){
            let e = ett[i];
            if(e instanceof Player){ // Player
                e.update();
            }else{
                e.update();
            }
        }
    }

    // Renderiza todos os this.get_tiles do game
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
    
    // método que carrega os this.get_tiles. Cria uma nova instância de Tiles e posiciona elas na posição de acorodo com a posição e cor do mapa base a ser carregado. Resources._association contém o dicionário de conversão
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
                            this._entities.push(new tile_entity(xx*Resources.get_size, yy*Resources.get_size, rs['sprites']));
                            rs = Resources.get_assossiation[0x00000000];//grama por padrão                     
                            tile_entity = rs['className'];
                        }
                        this._tiles.push(new tile_entity(xx*Resources.get_size, yy*Resources.get_size, rs['sprites']));
                    } 
                }
            }

        };
        img.src = path;
    }

    is_free(x, y){
        let x1 = Math.floor(x / Resources.get_size);
        let y1 = Math.floor(y / Resources.get_size);
        if(this.get_tiles[x1+y1*this.get_width] instanceof Wall) return false;

        let x2 = Math.floor((x+Resources.get_size-1) / Resources.get_size);
        let y2 = Math.floor(y / Resources.get_size);
        if(this.get_tiles[x2+y2*this.get_width] instanceof Wall) return false;

        let x3 = Math.floor(x / Resources.get_size);
        let y3 = Math.floor((y+Resources.get_size-1) / Resources.get_size);
        if(this.get_tiles[x3+y3*this.get_width] instanceof Wall) return false;

        let x4 = Math.floor((x+Resources.get_size-1) / Resources.get_size);
        let y4 = Math.floor((y+Resources.get_size-1) / Resources.get_size);
        if(this.get_tiles[x4+y4*this.get_width] instanceof Wall) return false;

        return true;
    }

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

