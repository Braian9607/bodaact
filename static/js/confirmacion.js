$(document).ready(function(){
	$('.btncode').on('click',function(){
        var codigo = $('#codigo').val();
        console.log(codigo);
        req = $.ajax({
            url : '/confirmacion/buscar',
            type : 'POST',
            data : { codigo : codigo}
        });
        req.done(function(data) {
            console.log(data.familia);
        });
	});
});
