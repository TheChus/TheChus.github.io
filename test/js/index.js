var img = document.querySelector('section.banner')

var url = img.getAttribute('style')

img.onclick = function(){
    var url = img.getAttribute('style')

    if(url == "background-image: url(./img/DespicableMe3/13.jpg"){
        img.setAttribute('style','background-image: url(./img/DespicableMe3/14.jpg')
    }
    else if(url == "background-image: url(./img/DespicableMe3/14.jpg"){    
        img.setAttribute('style','background-image: url(./img/DespicableMe3/15.jpg')
    }

    else if(url == "background-image: url(./img/DespicableMe3/15.jpg"){    
        img.setAttribute('style','background-image: url(./img/DespicableMe3/16.jpg')
    }

    else{
        img.setAttribute('style','background-image: url(./img/DespicableMe3/13.jpg')
    }
}

// document.body.style.backgroundImage="url(/i/eg_bg_desert.jpg)"