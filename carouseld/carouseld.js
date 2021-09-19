var arrActualCar = [];

iniAct();

function iniAct(){
    if(arrActualCar.length!=0)  return;

    document.querySelectorAll(".contcarouseld")
        .forEach(function(value,key,arr){
            arrActualCar.push([value.id, 1]);
        });
}

function incrAct(e, n){    
    arrActualCar.forEach(function(value, index){
        if(value[0]==e)
            value[1]+=n;
    });    
}
function getAct(e){
    var res = -1;
    arrActualCar.forEach(function(value, index){
        if(value[0]==e)
            res = value[1];
    });    
    return res;
}

//let actuals = 1;
let lastClick = new Date().getTime();

function carouseldAnterior(e){
    iniAct();

    var actuals = getAct(e.parentElement.id);
    let translatePorc = '-' + ((actuals-2) * 100) + '%';
    if(actuals==1) return;

    let elems=getItems(e.parentElement);
    elems.forEach(function(value) {            
        value.style.transition = '.3s';
        value.style.transform = 'translateX(' + translatePorc +')'; 
    });

    incrAct(e.parentElement.id, -1);
    //actuals--;
}

function carouseldSiguiente(e){
    iniAct();

    var actuals = getAct(e.parentElement.id);

    if((new Date().getTime() - lastClick) < 300) return;   
    lastClick = new Date().getTime();   

    let elems = getItems(e.parentElement);
    let ultVis = 0;
    elems.forEach(function(value, key){
        if(isVisible(value)){
            ultVis = key;
        }
    });
    if(elems.length == (ultVis + 1)) return;
    
    let translatePorc = '-' + ((actuals) * 100) + '%';

    elems.forEach(function(value) {            
        value.style.transition = '.3s';
        value.style.transform = 'translateX(' + translatePorc +')'; 
    });
    
    incrAct(e.parentElement.id, 1);
    //actuals++;        
}

getItems=function(elem){
    return elem.querySelectorAll(".carouseld-item");    
}
//-----------
function isVisible (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        //bounding.top >= 0 &&
        bounding.left >= 0 &&
        //Math.floor(bounding.bottom) <= (window.innerHeight || document.documentElement.clientHeight) &&
        Math.floor(bounding.right) <= (window.innerWidth || document.documentElement.clientWidth)
    );
};