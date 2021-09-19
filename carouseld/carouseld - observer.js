let actuals = 1;
let esVisible = false;
let lastClick = new Date().getTime();
window.addEventListener("load", window_onload);

function window_onload() {    
    EsVisible(document.querySelector(".carouseld-item:nth-last-child(1)"));
}

function EsVisible(elem){
    
    let observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true)            
        esVisible = true;
    else
        esVisible =  false;        
    }, { threshold: [0.9] });

    observer.observe(elem);        
}

function carouseldAnterior(){

    let translatePorc = '-' + ((actuals-2) * 100) + '%';
    if(actuals==1) return;

    let arr=getItems();
    arr.forEach(function(value) {            
        value.style.transition = '.3s';
        value.style.transform = 'translateX(' + translatePorc +')'; 
    });

    actuals--;
}

function carouseldSiguiente(){
        
    if((new Date().getTime() - lastClick) < 300) return;   
    lastClick = new Date().getTime();   

    let elems = document.querySelectorAll(".carouseld-item");
    let ultVis = 0;
    elems.forEach(function(value, key){
        if(isVisible(value)){
            ultVis = key;
        }
    });
    if(elems.length == (ultVis + 1)) return;

    //if(esVisible) return;

    
    let translatePorc = '-' + ((actuals) * 100) + '%';

    let arr=getItems();
    arr.forEach(function(value) {            
        value.style.transition = '.3s';
        value.style.transform = 'translateX(' + translatePorc +')'; 
    });

    actuals++;        
}

getItems=function(){
    return document.querySelectorAll(".carouseld-item");    
}
//-----------
function isVisible (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        //Math.floor(bounding.bottom) <= (window.innerHeight || document.documentElement.clientHeight) &&
        Math.floor(bounding.right) <= (window.innerWidth || document.documentElement.clientWidth)
    );
};