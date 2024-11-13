class Modal {
    constructor(){
        this._modal = document.getElementById('modal');
        this._modalBtn = document.getElementById('modal-btn');
        this.addEventListeners();
    }

    open = () => {
        this._modal.style.display = 'block';
    }
    
    close = () => {
        this._modal.style.display = 'none';
    }
    
    outsideClick = (e) => {
        if(e.target === this._modal){
            this.close();
        }
    }

    addEventListeners= () => {
        this._modalBtn.addEventListener('click', this.open);
        window.addEventListener('click', this.outsideClick);
        document.addEventListener('closeModal', () => {
            this.close();
        })
    }
}

export default Modal;