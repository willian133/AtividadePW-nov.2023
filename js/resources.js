class Resources{
    static _spritesheet;
    static _path_spritesheet = "assets/spritesheet.png";
    static _sprites = {} //dicionário {tile_color: sheet}
    static _size = 16; //dimensão do sheet, ex: 16px x 16px
    static _association;

    static get_sprite(tile_color){
        let sprites = Resources._sprites[tile_color];
        if(!sprites) console.log(tile_color, "- cor não identificada...")
        return sprites;
        // return Resources._spritesheet;
    }

    //carrega os diferentes sheets do spritesheet no dicionário para buscas futuras
    static _load_sheets(){
        let promise = new Promise((resolve, reject) =>{

            Resources._association = {
                0xFFFFFFFF: {'className': Wall,   'position': [[0, 1]]},
                0xFF000000: {'className': Grass,  'position': [[0, 0]]},
                //player
                0xFF0000FF: {'className': Player, 'position': {
                    'direita':   [[0, 2], [0, 3], [0, 4], [0, 5]],
                    'esquerda':  [[0, 6], [0, 7], [0, 8], [0, 9]],
                    'cima':     [[0, 2], [0, 3], [0, 4], [0, 5]], // os mesmos da direita
                    'baixo':    [[0, 6], [0, 7], [0, 8], [0, 9]], // os mesmos da esquerda
                }}
            }
            let asc = Resources._association;
    
            for(let color in asc){
                let position = asc[color].position;
    
                if(Array.isArray(position)){
                    let arr = [];
                    position.forEach(([x, y]) =>{
                        Resources._get_sheets(x, y).then(img => arr.push(img));
                    });
                    Resources._sprites[color] = arr;                
                }else{
                    let dir = {};
                    for(let direction in position){
                        
                        let arr = [];
                        position[direction].forEach(([x, y]) =>{
                            Resources._get_sheets(x, y).then(img => arr.push(img));
                        });
                        dir[direction] = arr;
                    }
                    Resources._sprites[color] = dir;                    
                }
            }
        });
        return promise
    }
    //carrega o spritesheet
    static load_resourses(func){
        let p = new Promise((resolve, rejected) => {
            let img = new Image();
            img.onload = ()=> resolve(img);
            img.src = Resources._path_spritesheet;
        });
        p.then((img)=> {
            Resources._spritesheet = img;
            Resources._load_sheets().then(func());
        })
    }
    // (x, y) -> retorna um promise com o sprite da posição x, y do sheet na matriz do spritesheet
    static _get_sheets(x, y){
        let cv = document.createElement('canvas');
        let size = Resources.get_size;
        cv.width = size;
        cv.height = size;

        let ctx = cv.getContext('2d');
        ctx.drawImage(Resources._spritesheet, y*size, x*size, size, size, 0, 0, size, size)        

        return new Promise((resolve, rejected) => {
            let img = new Image();
            img.onload = () => {resolve(img);};
            img.src = cv.toDataURL();
            img.width = 64; img.height = 64;
        });
    }

    static get get_size(){return this._size;}
}
