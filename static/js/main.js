let f = 1;

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
        let residentTag = 'There is no resident';
        if (residents.length > 0){
            residentTag = `<button class="residentBtn" data-toggle="modal" data-target="#residentModal" aria-labelledby="residentModalLabel" aria-hidden="true">There are ${residents.length} residents.</button>`
        }
        myTable.insertAdjacentHTML('beforeend',`<tr class="tabledata"><td>${name}</td><td>${diameter}</td><td>${climate}</td><td>${terrain}</td><td>${surface_water}</td><td>${population}</td><td>${residentTag}</td></tr>`);
        $('#residentModalModal').on('.residentBtn', displayResidents (event))

        }

    });
}


function displayResidents(residents){
    let modal = $(this)
    modal.find('.modalvalues').val(residents)


}



displayPage();



let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');

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



