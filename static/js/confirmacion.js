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
            console.log(data.familia);
            document.getElementById('div_confirmacion').style.display = '';
        });
	});
});
