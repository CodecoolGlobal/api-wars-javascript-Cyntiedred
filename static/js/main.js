let f = 1;

function displayPage(){
    let myTable = document.querySelector('#mytable');
    let modalTable = document.querySelector('#modal-table');
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
            residentTag = `<button class="residentBtn" data-toggle="modal" data-target="#residentModal" aria-labelledby="residentModalLabel" aria-hidden="true" data-planet="${residents}">There are ${residents.length} residents.</button>`
        }
        myTable.insertAdjacentHTML('beforeend',`<tr class="tabledata"><td>${name}</td><td>${diameter}</td><td>${climate}</td><td>${terrain}</td><td>${surface_water}</td><td>${population}</td><td>${residentTag}</td></tr>`);
        }
        $('#residentModal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget);
            let residents = button.data('planet');
            let ar = residents.split(",");
            $('.residentdata').remove();
            for (let n=0; n<ar.length; n++){
               $.getJSON(ar[n], function(response){
                   let nameRes = response.name;
                   let heightRes = response.height;
                   let massRes = response.mass;
                   let hairRes = response.hair_color;
                   let skinRes = response.skin_color;
                   let eyeRes = response.eye_color;
                   let birthRes = response.birth_year;
                   let genderRes = response.gender;
                   modalTable.insertAdjacentHTML('beforeend',`<tr class="residentdata"><td>${nameRes}</td><td>${heightRes}</td><td>${massRes}</td><td>${hairRes}</td><td>${skinRes}</td><td>${eyeRes}</td><td>${birthRes}</td><td>${genderRes}</td></tr>`);
               });
            }
            })

    });
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



