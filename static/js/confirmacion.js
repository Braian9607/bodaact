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
            let numb = "Familia "+fs;
            document.getElementById("familia").innerHTML = numb;
            var inv = data.invitados
            console.log('array_invitados', inv)

           

            let myTable= "<div>";
                  
            console.log( inv.length)
            for (let i = 0; i <  inv.length; i++) {
                console.log('for',  inv[i].nombre)
                myTable+="<div class='row ng-scope' ng-repeat='invitado in adultos' style=''>"
                myTable+="<div class='col-md-1 col-sm-1' id='select_check'>"
                myTable+="<input type='checkbox' value='"+ inv[i].id +"' class='asistencia_check'>"
                myTable+="</div>"
                myTable+="<div class='col-md-11 col-sm-11'>"
                myTable+="<p class='' style='color: white; margin: auto;'>" + inv[i].nombre + "</p>"
                myTable+="</div>"
                myTable+="</div>"
            }
      
            myTable+="</div>";
            document.getElementById('tablePrint').innerHTML = myTable;
            
        });
	});
    
    $('.btn_continuar').on('click',function(){
        var selected = '';    
        $('#select_check input[type=checkbox]').each(function(){
            if (this.checked) {
                selected += $(this).val()+', ';
            }
        }); 

        if (selected != '') 
            alert('Has seleccionado: '+selected);  
        else
            alert('Debes seleccionar al menos una opción.');

        return false;
    });
        
        
        
});


