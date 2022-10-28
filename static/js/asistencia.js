$(document).ready(function(){
    $('.btn_confi_asistencia').on('click',function(){
        console.log($('[name="asistencia_check"]'))
        var arr = $('[name="asistencia_check"]:checked').map(function(){
            console.log( $(this).val());
            return this.value;
        }).get();            

        var str = arr.join(',');
        var cod = JSON.stringify(arr)
            
        console.log(cod)

        req = $.ajax({
            url : '/confirmacion/update',
            type : 'POST',
            data : cod,
            dataType : 'json',
            contentType:'application/json; charset=utf-8',

        });
        req.done(function(data) {
            console.log(data);
        });

      
    
    }); 
});