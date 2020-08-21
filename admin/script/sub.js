let sub = {} || sub;
sub.drawTable = function (){
    $.ajax({
        url: ' https://rstorecompany.herokuapp.com/subcriber',
        method: "GET",
        dataType: "JSON",
        success : function(data){
            $('#tbsubscriber').empty();
            $.each(data, function(i,v){
                $('#tbsubscriber').append(
                    "<tr>"+
                    "<td>"+v.id+"</td>"+
                    "<td>"+v.email+"</td>"+
                    "<td >"+
                    "<a href ='javascript:;' onclick='sub.mail("+v.id+")'     title='mail'><i class='fa fa-envelope' ></i></a> "+
                    "<a href ='javascript:;' onclick='sub.delete("+v.id+")' title='remove'><i class='fa fa-trash'  ></i></a>"+

               "</td>"+
            
               +"</tr>"

                );
            });
            $('#datatb').DataTable();
        }
    })
};
$("#althank").hide();
sub.Subscribe =function (){
    if($('#SUBSCRIBE').valid()){ 
           
    
        $("#althank").show();
        let subObj = {};
        subObj.email = $('#Email').val();
        $.ajax({
            url: ' https://rstorecompany.herokuapp.com/subcriber',
            method: "POST",
            dataType: "JSON",
            contentType: "application/JSON",
            data : JSON.stringify(subObj),
            success : function (data){
                sub.drawTable();;
            }
        })
    
    }
}
sub.delete = function (id){
    bootbox.confirm({
        title: "Remove subscriber?",
        message: "Do you want remove this subscriber?",
        buttons: {
            confirm: {
                label: '<i class ="fa fa-check"></i>YES',
                
            },
            cancel: {
                label: '<i class ="fa fa-times"></i>NO',
               
            }
        },
        callback: function (result) {
            if(result){
                $.ajax({
                    url: " https://rstorecompany.herokuapp.com/subcriber/" +id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        sub.drawTable();
                    }
                })
            }   
        }
    });
};
sub.mail = function (id){
    bootbox.confirm({
        title: "Send Mail",
        message: "Do you want send a mail to this subscriber?",
        buttons: {
            confirm: {
                label: '<i class ="fa fa-check"></i>YES',
                
            },
            cancel: {
                label: '<i class ="fa fa-times"></i>NO',
               
            }
        },
        callback: function (result) {
            if(result){
               bootbox.alert("Mail have been sent")
            }   
        }
    });
};
sub.init = function (){
    sub.drawTable();
}
$(document).ready(function(){
    sub.init();
});