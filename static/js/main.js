
let f = 1;


let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');


function displayPage(){
    let myTable = document.querySelector('#mytable');
    $.getJSON('https://swapi.co/api/planets/?page=' + f, function(response){
    $('.tabledata').remove();
    let result = response.results;
    for (let i=0;i<result.length;i++) {
        let name = result[i].name;
        let diameter = result[i].diameter;
        let climate = result[i].climate;
        let terrain = result[i].terrain;
        let surface_water = result[i].surface_water;
        let population = result[i].population;
        let residents = result[i].residents;
        let residentsBtn = "There are " + residents.length + " residents."
      myTable.insertAdjacentHTML('beforeend',`<tr class="tabledata"><td>${name}</td><td>${diameter}</td><td>${climate}</td><td>${terrain}</td><td>${surface_water}</td><td>${population}</td><td><button class="residentBtn">${residentsBtn}</button></td></tr>`);



        }
    return residents;
    });
}

displayPage();

$
prevBtn.addEventListener('click', function(event){
    if (f <= 1){
        f = 1;
    }
    f -= 1;
    displayPage();

});

nextBtn.addEventListener('click', function(event){
    if (f >= 6){
        f = 6;
    }
    f += 1;
    displayPage();

});
