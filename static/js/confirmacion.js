$(document).ready(function(){
	$('.btncode').on('click',function(){
        document.getElementById('div_buscar').style.display = 'none';
        var codigo = $('#codigo').val();
        console.log(codigo);
        req = $.ajax({
            url : '/confirmacion/buscar',
            type : 'POST',
            data : { codigo : codigo}
        });
        req.done(function(data) {
            console.log(data);
            console.log('fam', data.familia);
            document.getElementById('div_confirmacion').style.display = '';
            fs = data.familia
            let numb = "Fam. "+fs;
            document.getElementById("familia").innerHTML = numb;
            var inv = data.invitados
            console.log('array_invitados', inv)
            var countadult = 0
            var countnin = 0
            var arr = inv
            var filteredAdul = arr.filter ( function ( d ) {
                countadult++;
                return d.type_person === 'Adulto';
            });
            console.log ( "filtrocount", filteredAdul.length );
            console.log ( "fil", filteredAdul );
            
            var filteredNin = arr.filter ( function ( d ) {
                countnin++;
                return d.type_person === 'Niño';
            });
            console.log ( "filtrocount", filteredNin.length );
            console.log ( "fil", filteredNin );

            let counpers ="<div  class='col-md-12 col-sm-12'>";
            counpers+="<div style='text-align: -webkit-center; color: lightgoldenrodyellow;'> Pases </div><hr style='1px solid rgb(255 255 255 / 10%) !important'>"
            counpers+="<div class='col-md-6 col-sm-6' style='text-align: -webkit-center; color: lightgoldenrodyellow;'><div>"+ filteredAdul.length +" Adultos</div></div>"
            if(filteredNin.length > 0){
                counpers+="<div class='col-md-6 col-sm-6' style='text-align: -webkit-center; color: lightgoldenrodyellow;'><div>"+ filteredNin.length +" Niños</div></div>"
            }
            counpers+="</div>"
            document.getElementById('countpersonas').innerHTML = counpers

            
            $('.btn_continuar').on('click',function(){
                document.getElementById('div_cconfi').style.display = '';
                document.getElementById('div_confirmacion').style.display = 'none';
                console.log( filteredAdul.length)
                let myTable= "<div>";

                for (let i = 0; i <  filteredAdul.length; i++) {
                    console.log('for',  filteredAdul[i].nombre)
                    myTable+="<div class='row ng-scope' ng-repeat='invitado in adultos' style=''>"
                    myTable+="<div class='col-md-1 col-sm-1' id='select_check'>"
                    myTable+="<input type='checkbox' value='"+ filteredAdul[i].id +"' class='asistencia_check'>"
                    myTable+="</div>"
                    myTable+="<div class='col-md-11 col-sm-11'>"
                    myTable+="<p class='' style='color: white; margin: auto;'>" + filteredAdul[i].nombre + "</p>"
                    myTable+="</div>"
                    myTable+="</div>"
                }
      
                myTable+="</div>";
                document.getElementById('tablePrint').innerHTML = myTable;
            });   
            
            
        });
        // $('.btn_continuar').on('click',function(){
        //     var selected = '';    
        //     $('#select_check input[type=checkbox]').each(function(){
        //         if (this.checked) {
        //             selected += $(this).val()+', ';
        //         }
        //     }); 
    
        //     if (selected != '') 
        //         alert('Has seleccionado: '+selected);  
        //     else
        //         alert('Debes seleccionar al menos una opción.');
    
        //     return false;
        // });  
	});
    
    
        
        
        
});


