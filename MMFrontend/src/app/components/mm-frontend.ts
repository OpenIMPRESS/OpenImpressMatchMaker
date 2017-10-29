
abstract class Editable {
    editing : boolean = false;

    abstract update() : void;
    abstract reset() : void;

    edit() : void {
        this.editing = true;
    }
    
    submit(event) : void {
        if(event.keyCode == 13){
            this.update();
        } else if (event.keyCode == 27) {
            this.reset();
        }
    }
}

abstract class Deletable {
    abstract delete() : void;
}

export { Editable, Deletable }

