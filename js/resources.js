class Resources{
    static _spritesheet;
    static _path_spritesheet = "assets/spritesheet.png";
    static _size = 16; //dimensão do sheet, ex: 16px x 16px
    static _association; // associa cor a {className; posições dos sheets no spritesheet; sprites já carregados}

    static get_sprite(tile_color){
        let sprites = Resources._association[tile_color]['sprites'];
        if(tile_color == 0x0000FFFF) console.log(sprites)
        if(!sprites) console.log(tile_color, "- cor não identificada...")
        return sprites;
        // return Resources._spritesheet;
    }

    //carrega os diferentes sheets do spritesheet no dicionário para buscas futuras
    static _load_sheets(){
        let promise = new Promise((resolve, reject) =>{

            Resources._association = {
                0xFFFFFFFF: {'className': Wall,   'sheets_position': [[0, 1]]},
                0x00000000: {'className': Grass,  'sheets_position': [[0, 0]]},
                //player
                0x0000FFFF: {'className': Player, 'sheets_position': {
                    'd':    [[0, 2], [0, 3], [0, 4], [0, 5]],   // direita
                    'a':    [[0, 6], [0, 7], [0, 8], [0, 9]],   // esquerda
                    's':    [[0, 2], [0, 3], [0, 4], [0, 5]],   // cima  - os mesmos da direita
                    'w':    [[0, 6], [0, 7], [0, 8], [0, 9]],   // baixo - os mesmos da esquerda
                }}
            }
            let asc = Resources._association;
    
            for(let color in asc){
                let sheets_position = asc[color].sheets_position;
    
                if(Array.isArray(sheets_position)){
                    let arr = [];
                    sheets_position.forEach(([x, y]) =>{
                        Resources._get_sheets(x, y).then(img => arr.push(img));
                    });
                    Resources._association[color]["sprites"] = arr;                
                }else{
                    let dir = {};
                    for(let direction in sheets_position){
                        
                        let arr = [];
                        sheets_position[direction].forEach(([x, y]) =>{
                            Resources._get_sheets(x, y).then(img => arr.push(img));
                        });
                        dir[direction] = arr;
                    }
                    Resources._association[color]["sprites"] = dir;                    
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
    static get get_assossiation(){return Resources._association}
}
