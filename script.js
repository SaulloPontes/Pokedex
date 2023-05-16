var cry = document.getElementById("cry");

  

  
document.getElementById('pokemonForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var pokemonNameOrId = document.getElementById('pokemonInput').value;

  fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonNameOrId.toLowerCase())
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function (speciesData) {
     
      var pokemonId = speciesData.id;
      var egg1 = speciesData.egg_groups[0].name
      var egg2 = speciesData.egg_groups[1]?.name == undefined ? '' : speciesData.egg_groups[1].name
  
      //var desc = speciesData.flavor_text_entries[81]?.flavor_text  ==  undefined ? speciesData.flavor_text_entries[44].flavor_text : speciesData.flavor_text_entries[81].flavor_text
     
      var en = speciesData.flavor_text_entries[0].language.name
      var cont =0;

      while(en!='en'){
        en = speciesData.flavor_text_entries[cont].language.name
        cont++
      }

      if(pokemonId>=494){
        desc = speciesData.flavor_text_entries[cont-1].flavor_text
      }else{
        desc = speciesData.flavor_text_entries[cont].flavor_text
      }


      /* SPRITEs ANIMADOs DA API : 
      
      ${pokemonData.sprites.versions['generation-v']['black-white']['animated'].front_default}
      ${pokemonData.sprites.front_default}
      ${pokemonData.sprites.versions['generation-v']['black-white']['animated'].back_default}
      ${pokemonData.sprites.back_default}
      ${pokemonData.sprites.versions['generation-v']['black-white']['animated'].back_shiny}
      ${pokemonData.sprites.back_shiny}
      ${pokemonData.sprites.versions['generation-v']['black-white']['animated'].front_shiny}
      ${pokemonData.sprites.front_shiny}
      
      */
     
      fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
        .then(function (response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(function (pokemonData) {
          var pokemonInfo = document.getElementById('pokemonInfo');

         
          
          pokemonInfo.innerHTML = `

         
          <audio src=" https://play.pokemonshowdown.com/audio/cries/${pokemonData.name}.mp3" controls autoplay  id="cry" class="cry">
          
          </audio>
        
        
      
          
            
          <div class="container  mb-5  border rounded-3  shadow-lg border-danger" style="background-color: #222224;" >
          <div class="row   m-3 "  style="background-color: #D73A33;">
            <div class="col m-2 d-flex justify-content-center align-items-center bg border border-0 rounded-circle" width="65%" >

            <img src=" https://play.pokemonshowdown.com/sprites/ani/${pokemonData.name}.gif" alt="Imagem" onerror="this.onerror=null; this.src='${pokemonData.sprites.front_default}';" width="65%">
      
            </div>
    
            <div class="col">
    
              <div class="row">
                <div class="col border-bottom  logo2 shadow-lg border-danger mt-1" >
                  <h1>${pokemonData.name.toUpperCase()}</h1>
                </div>
              </div>
              
              <div class="row">
                <div class="col logo2">
                  <h1>Types</h1>
                </div>
              </div>
              
              <div class="row justify-content-center">
                <div class="col   " style="color: #DFDFDF;">
                <h3>${pokemonData.types[0].type.name}</h3>
          
                </div>
                <div class="col " style="color: #DFDFDF;">
                <h3>${pokemonData.types[1]?.type?.name == undefined ? '' : pokemonData.types[1].type.name}</h3>
            
                </div>
              </div>
            
              <div class="row">
                <div class="col logo2">
                <h1>Abilitys</h1>
              
                </div>
              </div>
              <div class="row">
                <div class="col " style="color: #DFDFDF;">
                <h3>  ${pokemonData.abilities[0].ability.name}</h3>
              
                </div>
                <div class="col " style="color: #DFDFDF;">
                <h3>  ${pokemonData.abilities[1]?.ability?.name == undefined ? '' : pokemonData.abilities[1].ability.name}</h3>
                </div>
              </div>
              <div class="row">
                <div class="col logo2">
                <h1>Eggs groups</h1> 
                </div>
              </div>
              <div class="row">
                <div class="col " style="color: #DFDFDF;">
                 <h3> ${egg1}</h3>
                </div>
                <div class="col " style="color: #DFDFDF;">
                <h3> ${egg2}</h3>
                </div>
              </div>
            </div>
    
            <div class="col  d-flex justify-content-center align-items-center bg   border border-0 rounded-circle m-2 ">
            <img src=" https://play.pokemonshowdown.com/sprites/ani-back/${pokemonData.name}.gif" alt="Imagem" onerror="this.onerror=null; this.src='${pokemonData.sprites.back_default}';" width="65%">
            </div>
          </div>

          <p style="color: #DFDFDF;" id="text">${desc}</p>
          
          <div class="row m-3 " style="background-color: #D73A33;">
            <div class="col d-flex justify-content-center align-items-center bg border border-0 rounded-circle m-2">
            <img src= "https://play.pokemonshowdown.com/sprites/ani-shiny/${pokemonData.name}.gif" alt="Imagem" onerror="this.onerror=null; this.src='${pokemonData.sprites.front_shiny}';" width="65%">
            </div>
            <div class="col ">

            <div class="row ">
            <div class="col logo2" >
              <h3>Base stats</h3>
            </div>
      
      
            <hr>
          

          </div > 
              <div class="row" style="color: #DFDFDF;"  >
                <div class="col" >
                <h5>${pokemonData.stats[0].stat.name}</h5>
                </div>
          
                <div class="col">
                <h5>${pokemonData.stats[0].base_stat}</h5>
                </div>
                <hr>
              </div>
              <div class="row " style="color: #DFDFDF;">
                <div class="col">
                <h5>${pokemonData.stats[1].stat.name}</h5>
                </div>
                <div class="col">
                <h5>${pokemonData.stats[1].base_stat}</h5>
                </div>
                <hr>
              </div>
              <div class="row" style="color: #DFDFDF;">
                <div class="col">
                <h5>${pokemonData.stats[2].stat.name}</h5>
                </div>
                <div class="col">
                <h5>${pokemonData.stats[2].base_stat}</h5>
                </div>
              </div>
              <hr>
              <div class="row" style="color: #DFDFDF;">
                <div class="col">
                <h5>${pokemonData.stats[3].stat.name}</h5>
                </div>
                <div class="col">
                <h5>${pokemonData.stats[3].base_stat}</h5>
                </div>
              </div>
              <hr>
              <div class="row" style="color: #DFDFDF;">
                <div class="col">
                <h5>${pokemonData.stats[4].stat.name}</h5>
                </div>
                <div class="col">
                <h5>${pokemonData.stats[4].base_stat}</h5>
                </div>
              </div>
              <hr>
              <div class="row" style="color: #DFDFDF;">
                <div class="col">
                <h5>${pokemonData.stats[5].stat.name}</h5>
                </div>
                <div class="col">
                <h5>${pokemonData.stats[5].base_stat}</h5>
                </div>
              </div>
            </div>
            <div class="col m-2 d-flex justify-content-center align-items-center bg border-0 border rounded-circle" >
            <img src="https://play.pokemonshowdown.com/sprites/ani-back-shiny/${pokemonData.name}.gif" alt="Imagem" onerror="this.onerror=null; this.src='${pokemonData.sprites.back_shiny}';" width="65%" >
            </div>
          </div>
        </div>
        
          `
          var cry = document.getElementById("cry");
          cry.volume = 0.04; 
          var tag = document.getElementById('text');
          var text = tag.innerHTML;
          var newTag = text.replace(/\u000C/g, ' ')
          tag.innerHTML = newTag

          ;
        })
        .catch(function (error) {
          console.error('Erro ao obter detalhes do Pokémon:', error);
          var pokemonInfo = document.getElementById('pokemonInfo');
          pokemonInfo.innerHTML = 'Erro ao obter detalhes do Pokémon.';
        });
    })
    .catch(function (error) {
      console.error('Erro ao obter informações da espécie do Pokémon:', error);
      var pokemonInfo = document.getElementById('pokemonInfo');
      pokemonInfo.innerHTML = 'Pokémon não encontrado.';
    });
});

