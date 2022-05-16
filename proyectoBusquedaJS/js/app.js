
// Variables
const marca = document.querySelector('#marca')              
const year = document.querySelector('#year')              
const minimo = document.querySelector('#minimo')              
const maximo = document.querySelector('#maximo')              
const puertas = document.querySelector('#puertas')             
const transmision = document.querySelector('#transmision')              
const color = document.querySelector('#color')              

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

//Apartado para el año actual en el que estamos.
const max = new Date().getFullYear();                    // Este metodo me trae el año en el que estamos.
const min = max-10;                                      // El año en el que estamos menos 10 años  


//Generando un objeto con la busqueda que el usuario va seleccionando
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
};

// Eventos

// Agrego el evento para que cargue mi html y muestre lo que quiera de pricipio.
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos);         //Muestro los automoviles al cargar el html.
    llenarSelect();         //Llena las opciones de los años.
})

// EventListener para los select de busqueda

// Para etiquetas Select... Change es la funcion mas comun de usar.
// Uso la e para leer el valor que el usuario pone
marca.addEventListener('change',(e)=>{
    datosBusqueda.marca = e.target.value;       //De esta forma agregamos el valor que estamos asignando a nuestro objeto vacio.
    filtrarAuto();
})
/* 
    Todos los datos que vengan de un formuario vienen como String.
    Con los numeros pasa lo mismo, entonces deberiamos cambiarlos con parseInt.
*/
year.addEventListener('change',(e)=>{
    datosBusqueda.year = parseInt(e.target.value); 
    filtrarAuto();
    
})

minimo.addEventListener('change',(e)=>{
    datosBusqueda.minimo = e.target.value; 
    filtrarAuto();
    
})
maximo.addEventListener('change',(e)=>{
    datosBusqueda.maximo = e.target.value; 
    filtrarAuto();
    
})
puertas.addEventListener('change',(e)=>{
    datosBusqueda.puertas = parseInt(e.target.value); 
    filtrarAuto();
})
transmision.addEventListener('change',(e)=>{
    datosBusqueda.transmision = e.target.value; 
    filtrarAuto();
})
color.addEventListener('change',(e)=>{
    datosBusqueda.color = e.target.value; 
    filtrarAuto();
})



// Funciones

function mostrarAutos(autos){

    limpiarHTML();  //Elimina el HTML previo

    // Hago un forEach para iterar el arreglo con objetos de autos
    autos.forEach(auto => {
        
        //Creo un parrafo que despues con un appendChild lo plasmo en mi html
        const autosHTML = document.createElement('p');

        //Armo un Destructuring para llamar mejor a las propiedades de mi objeto
        const {marca,modelo,year,precio,puertas,color,transmision} = auto;
        autosHTML.textContent = `
        
            ${marca} ${modelo} - Año: ${year} - Precio: ${precio} -  ${puertas} Puertas - Color: ${color} - Transmision: ${transmision}

        `;


        resultado.appendChild(autosHTML);
        // AppendChild no borra el contenido previo
    });
}

//Limpiando HTML appendChild
//Limpio el resultado que es lo primero que carga la web.
// Mientras haya algo en resultado , remove.
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

// Generando los años del select.
function llenarSelect(){
    
    // Creo un for que corra hacia atras
    for(let i = max; i >= min; i--){
        const option = document.createElement('option')     //Los select tienen la etiqueta Option
        option.value = i;                                   // El value va a ser igual a i = igual a todos los años.
        option.textContent = i;                             // Con el textContent agrego cada año 
        
        //Ahora agrego cada opcion de año al select
        year.appendChild(option);
    }

}


/* 
    Funciones de alto nivel - Funciones que pasan otra funcion mediante sus parametros.
    El metodo filter es una arrow function pero al ser de alto nivel solamente queda de la siguiente forma.
    El metodo filter sabemos es una arrow function que por parametro se la pasa la iteracion.
    Esa iterasion en este caso al ser de alto nivel se la pasa a la otra funcion.
    Otro dato de Filter es que puede filtrar por Encadenamiento:  filter().filter().filter()

*/
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTrasmicion).filter(filtrarColor);     
    
    if(resultado.length){
    mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    const NoResultado = document.createElement('p');
    NoResultado.classList.add('alert','error','text-white','text-center');
    NoResultado.textContent=('No hay resultados');
    resultado.appendChild(NoResultado);
}

/*  - Ejemplo / Logica para filtrar por marca - 
    Datos busqueda es el objeto que cree vacio para ir llenandolo,
    entonces, Si datos busqueda no esta vacio, quiere decir que alguien lo lleno.
    Si alguien lo lleno comparando la marca quiero que me traiga el mismo valor
*/

function filtrarMarca(auto){
    if(datosBusqueda.marca)            
    return auto.marca === datosBusqueda.marca;    
    return auto;        // Si el usuario no seleciona nada que retorne todos los valores originales
}

function filtrarYear(auto){
    if(datosBusqueda.year)              
    return auto.year === datosBusqueda.year;    
    return auto;        
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo)            
    return auto.precio >= datosBusqueda.minimo;    
    return auto;        
}

function filtrarMaximo(auto){
    if(datosBusqueda.maximo)
    return auto.precio <= datosBusqueda.maximo; 
    return auto;        
}

function filtrarPuertas(auto){
    if(datosBusqueda.puertas)            
    return auto.puertas === datosBusqueda.puertas;    
    return auto;        
}

function filtrarTrasmicion(auto){
    if(datosBusqueda.transmision)            
    return auto.transmision === datosBusqueda.transmision;    
    return auto;        
}

function filtrarColor(auto){
    if(datosBusqueda.color)            
    return auto.color === datosBusqueda.color;    
    return auto;        
}