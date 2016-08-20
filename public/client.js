$(document).ready(
    function(){
        var initialized = false;
        var list = $('ol')[0];
        $('#button').click(
            function(){
                var input = $('input[name=ListItem]');
                if(input.val().length > 0) {
                    initialized = true;
                    var toAdd = input.val();
                    $('ol').append('<li>' + toAdd + '</li>');
                    input.val("");
                }
            });

        $("input[name=ListItem]").keyup(function(event){
            if(event.keyCode === 13){
                $("#button").click();
            }
        });

        $(document).on('dblclick','li', function(){
            $(this).toggleClass('strike').fadeOut('slow').remove();
            if(list.childElementCount === 0) {
                initialized = false;
                navigator.geolocation.getCurrentPosition(function (position) {
                    jQuery.post( '/order?lat='+position.coords.latitude + "&long=" + position.coords.longitude, {}, function(data){
                        console.log('destiny', data)
                    })
                });
            }
        });

        $('input').focus(function() {
            $(this).val('');
        });


    }
);