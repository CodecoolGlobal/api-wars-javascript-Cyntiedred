
let myTable = document.querySelector('#mytable')

for (let i=0;i<61;i++) {
  $.getJSON('https://swapi.co/api/planets/'+i, function(response){
      let name = response['name'];
      let diameter = response['diameter'];
      let climate = response['climate'];
      let terrain = response['terrain'];
      let surface_water = response['surface_water']+'%';
      if (surface_water === 'unknown%'){
          surface_water = '-'
      }
      let population = response['population'];
      myTable.insertAdjacentHTML('beforeend',`<tr><td>${name}</td><td>${diameter}</td><td>${climate}</td><td>${terrain}</td><td>${surface_water}</td><td>${population}</td></tr>`);
    });
}



