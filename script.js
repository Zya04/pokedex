$(function () {
    $.ajax({
        url: 'pokemon.json',
        type: 'get',
        dataType: 'json',
        success: function(pokemons){
            localStorage.setItem('pokemons',JSON.stringify(pokemons));
        }
    });
    $('form[name="form"]').submit(function(){
        var pokemons = localStorage.getItem('pokemons');
        var pokemon = JSON.parse(pokemons);
        var inputName = $('NamePokemon').val();
        var name = inputName.substr(1);
        var firstChar = inputName.charAt(0).toUpperCase();
        var pokename = firstChar + name;
        var lowerPokename = inputName.toLowerCase();
        searchPokemon(lowerPokename,pokemon,pokename);
        return false;
    });
});
function searchPokemon(lowerPokename, pokemon, pokename){
    var errorBlock = $('error');
    for (var i in pokemon) {
        var name = pokemon[i].name;
        var type = pokemon[i].type;
        if (isNaN(lowerPokename) === true && pokename === pokemon[i].name){ 
            errorBlock.text('');
            showPokemon(name, type);
            break;
        } else {
            errorBlock.text(pokename + ' not found.');
        }
        if (isNaN(lowerPokename) === false){
            if (pokename === i ){
                errorBlock.text('');
                showPokemon(name, type);
                return false;
            } else if (1 > pokename || 151 < pokename){
                errorBlock.text('pokemon number :' + pokename + ' not found, please enter a number between 1 and 151.');
                return false;
            }
        }
    }
}
function showPokemon(name, type){
    var Frame = $('screen');
    var pokemonName = $('pokemonName');
    var pokemonType = $('pokemonType');
    Frame.attr('src', 'https://img.pokemondb.net/artwork/' + name.toLowerCase() + '.jpg');
    pokemonName.text('Name : ' + name);
    pokemonType.text('Type : ' + type);
}