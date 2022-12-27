class Carousel{
  constructor(element){
    this.element = element;
    this.carouselData = [
      {
        'index': '1',
        'link': '/',
        'src': 'https://source.unsplash.com/450x450/?city',
      },
      {
        'index': '2',
        'link': '/',
        'src': 'https://source.unsplash.com/450x450/?people',
      },
      {
        'index': '3',
        'link': '/',
        'src': 'https://source.unsplash.com/450x450/?galaxy',
      },
      {
        'index': '4',
        'link': '/',
        'src': 'https://source.unsplash.com/450x450/?girl',
      },
      {
        'index': '5',
        'link': '/',
        'src': 'https://source.unsplash.com/450x450/?cat',
      },

    ];
    this.controls = true;
    this.moduleContainer;
  }



  init(){
    this.setupModule();
  }

  setupModule(){
    const carousel = document.createElement('ul');
    const controlItems = ['left', 'right'];

    this.element.append(carousel);
    carousel.className = 'carousel-module';

    this.carouselData.forEach((item, index) => {
      const createItem = document.createElement('li');
      const createItemLink = document.createElement('a');
      const createItemImage = document.createElement('img');
      
      carousel.appendChild(createItem);
      createItem.appendChild(createItemLink);
      createItemLink.appendChild(createItemImage);


      createItem.className = `item item-index-${index + 1}`;
      createItemImage.className = `item-image-${index + 1}`;;
      createItemImage.src = item.src;
      createItemImage.setAttribute('loading', 'lazy');
    })

    if(this.controls){
      controlItems.forEach(element => {
        const button = document.createElement('button');
        const fontAwesome = document.createElement('i');
        const module = document.getElementsByTagName('button');

        button.className = `control-${element}`;
        fontAwesome.className = `fa fa-arrow-${element}`
        button.setAttribute('data-name', element);
        button.appendChild(fontAwesome);

        this.element.append(button);

        this.setEvent([...module]);
      })
    }
    this.moduleContainer = carousel;
  }

  setEvent(controls){
    controls.forEach(control => {
      control.onclick = event => {
        event.preventDefault();
        this.handleControlEvent(control.dataset.name);
      };
    })
  }

  handleControlEvent(options){
    if (options === 'left') return this.handlePrevEvent();
    if (options === 'right') return this.handleNextEvent();
  }

  handlePrevEvent(){
    this.carouselData.unshift(this.carouselData.pop());

    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.item-image-${index + 1}`).src = data.src;
    });
  }

  handleNextEvent(){
    this.carouselData.push(this.carouselData.shift());

    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.item-image-${index + 1}`).src = data.src;
    });
  }
}

const target = document.querySelector('.container');

const buildModule = new Carousel(target);

window.onload = function(){
  buildModule.init();
}