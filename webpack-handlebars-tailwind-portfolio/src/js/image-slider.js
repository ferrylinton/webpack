export class ImageSlider {
    currentSliderIndex = 0;
    sliderContents;
    sliderIndicators = [];
    sliderPrevious;
    sliderNext;

    constructor(contanerID) {
        this.sliderContents = document.querySelectorAll(`${contanerID} .slider-content`);
        this.sliderPrevious = document.querySelector(`${contanerID}  .slider-previous`);
        this.sliderNext = document.querySelector(`${contanerID} .slider-next`);

        if (this.sliderContents && this.sliderPrevious &&  this.sliderNext) {


            this.sliderPrevious.addEventListener('click', () => {
                this.handlePreviousSlider();
            });

            this.sliderNext.addEventListener('click', () => {
                this.handleNextSlider();
            });

            this.createIndicators(contanerID);
        }

    }

    createIndicators = (contanerID) => {
        let indicators = document.createElement('ul');
        indicators.classList.add("indicators");

        for (let i = 1; i <= this.sliderContents.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = i;

            if (i === 1) {
                li.classList.add("active");
            }

            li.addEventListener('click', (e) => {
                this.setActiveContent(parseInt(e.target.innerHTML) - 1)
            });

            indicators.appendChild(li);
            this.sliderIndicators.push(li);
        }
        document.querySelector(contanerID).append(indicators);
    }

    static init(contanerID) {
        new this(contanerID);
    }

    handlePreviousSlider = () => {
        this.setActiveContent(this.currentSliderIndex <= 0 ? (this.sliderContents.length - 1) : (this.currentSliderIndex - 1))
    };

    handleNextSlider = () => {
        this.setActiveContent(this.currentSliderIndex >= (this.sliderContents.length - 1) ? 0 : this.currentSliderIndex + 1);
    }

    setActiveContent = (currentSliderIndex) => {
        this.sliderContents[this.currentSliderIndex].classList.remove('active');
        this.sliderIndicators[this.currentSliderIndex].classList.remove('active');

        this.currentSliderIndex = currentSliderIndex;
        this.sliderContents[currentSliderIndex].classList.add('active');
        this.sliderIndicators[currentSliderIndex].classList.add('active');
    }

}