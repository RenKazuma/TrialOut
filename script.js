function createBubbles(){
    const section = document.querySelector('.circleMama');
    const createElement = document.createElement('span');
    var size = Math.random() * 80;

    createElement.classList.add('circle');
    createElement.style.width = 20 + size + 'px';
    createElement.style.height = 20 + size + 'px';

    createElement.style.left = Math.random() * innerWidth + "px";
    
    section.appendChild(createElement);

    setTimeout(() => {
        createElement.remove()
    },50000);
}

setInterval(createBubbles, 1000);