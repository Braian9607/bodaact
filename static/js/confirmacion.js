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
            console.log(data.familia);
            console.log(data.invitados);
            document.getElementById('div_confirmacion').style.display = '';
            fs = data.familia
            let numb = "Familia "+fs;
            document.getElementById("familia").innerHTML = numb;
            var inv = data.invitados
            console.log('array', inv)

           

            let myTable= "<div>";
                  

            for (let i = 0; i < inv.length; i++) {

                myTable+="<div class='row ng-scope' ng-repeat='invitado in adultos' style=''>"
                myTable+="<div class='col-md-1 col-sm-1'>"
                myTable+="<input type='checkbox' id='asistencia'>"
                myTable+="</div>"
                myTable+="<div class='col-md-11 col-sm-11'>"
                myTable+="<h6 class='guest-name ng-binding'>" + inv[i] + "</h6>"
                myTable+="</div>"
                myTable+="</div>"
            }
      
            myTable+="</div>";
            document.getElementById('tablePrint').innerHTML = myTable;
            
        });
	});

});


