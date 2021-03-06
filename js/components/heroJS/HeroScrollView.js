import { isValidAlbumSelector, isValidAlbumData } from '../isValidData.js';
import { renderAlbums } from './renderHeroAlbums.js';


class HeroScroll {
    constructor(params) {
        this.selector = params.selector || 'body';
        this.data = params.data || [];
        this.pseudoCount = params.pseudoCount || 2;
        this.areDotsVisible = params.areDotsVisible;

        this.DOM = null;
        this.listDOM = null;
        this.controlsDOM = null;
        this.dotsDOM = null;
        this.activeDotIndex = 0;

        this.visibleArray = [];
        console.log('atejau iki cia');
        this.init();
        console.log(this.DOM);

    }

    init() {

        if (!this.isValidAlbumSelector()) {
            return false;
        }
        if (!this.isValidData()) {
            return false;
        }
        if (!this.createNewArray() || this.visibleArray.length === 0) {
            console.error('Error: there are no album elements to display in hero section');
            return false;
        }
        this.render();
        this.addEvents();
    }

    render() {
        const listWidth = (this.visibleArray.length + 2 * this.pseudoCount) * 100;
        const HTML = `
        <div class="list" style="width: ${listWidth}%; margin-left: -${this.pseudoCount}00%;">
           ${this.generateHeroAlbums()}
        </div>
        <div class="controls">${this.generateDots()}</div>
    </div>`;

        this.DOM.innerHTML = HTML;

        this.listDOM = this.DOM.querySelector('.list');

        if (this.areDotsVisible) {
            this.controlsDOM = this.DOM.querySelector('.controls');
            if (!this.controlsDOM) {
                console.error('Error: Cannot find controls in HTML');
                return false;
            }
            this.dotsDOM = this.DOM.querySelectorAll('.minus');
            if (!this.controlsDOM) {
                console.error('Error: Cannot find dots in HTML');
                return false;
            }
        }
    }

    addEvents() {
        if (this.areDotsVisible) {
            for (let i = 0; i < this.dotsDOM.length; i++) {
                const dot = this.dotsDOM[i];
                dot.addEventListener('click', () => {
                    this.clickDot(i);
                }
                )
            }
        }
    }

    createNewArray() {
        for (let i = 0; i < this.data.length; i++) {
            if (!this.data[i].isInHeroSection) {
                continue;
            }
            this.visibleArray.push(this.data[i]);
        }
        return true;
    }

    generateHeroAlbums() {
        let HTML = '';
        const itemWidth = 100 / ((2 * this.pseudoCount) + this.visibleArray.length);
        const dataCopy = [this.visibleArray[2], this.visibleArray[1], ...this.visibleArray, this.visibleArray[0], this.visibleArray[1]];
        for (let album of dataCopy) {
            HTML += `<div class="item" style="width: ${itemWidth}%">
            ${renderAlbums(album)}
        </div>`
        }
        return HTML;
    }


    generateDots() {
        let HTML = '';
        if (!this.areDotsVisible) {
            console.log('Dots are set to be invisable');
            return HTML;
        }
        HTML = `<div class="minus active"></div>`
        HTML += `<div class="minus"></div>`.repeat(this.visibleArray.length - 1);
        return HTML;
    }

    clickDot(dotIndex) {
        const dot = this.dotsDOM[dotIndex];
        this.listDOM.style.marginLeft = -100 * (this.pseudoCount + dotIndex) + '%';
        this.dotsDOM[this.activeDotIndex].classList.remove('active');
        this.activeDotIndex = dotIndex;
        dot.classList.add('active');
    }

    isValidAlbumSelector() {
        const selector = document.querySelector(this.selector);
        if (!selector) {
            console.error('Error: I cannot find a given selector in HTML file!');
            return false;
        }
        if (!isValidAlbumSelector(this.selector)) {
            return false;
        }
        this.DOM = selector;
        return true;
    }

    isValidData() {
        if (!isValidAlbumData(this.data)) {
            return false;
        }
        return true;
    }

}


export { HeroScroll }