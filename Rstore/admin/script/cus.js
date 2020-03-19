let cus = {} || cus;
cus.drawTable = function (){
    $.ajax({
        url: ' https://rstorecompany.herokuapp.com/customer',
        method: "GET",
        dataType: "JSON",
        success : function(data){
            $('#tbcusscriber').empty();
            $.each(data, function(i,v){
                $('#tbcusscriber').append(
                    "<tr>"+
                    "<td>"+v.id+"</td>"+
                    "<td>"+v.fullName+"</td>"+
                    "<td>"+v.phoneNumber+"</td>"+
                    "<td>"+v.address+"</td>"+
                    "<td>"+v.product+"</td>"+
                    "<td>"+v.price+"</td>"+
                    "<td >"+
                    "<a href ='javascript:;' onclick='cus.check("+v.id+")'  title='mail'><i class='fa fa-check' ></i></a> "+
                    "<a href ='javascript:;' onclick='cus.delete("+v.id+")' title='remove'><i class='fa fa-trash'  ></i></a>"+

               "</td>"+
            
               +"</tr>"

                );
            });
            $('#datatb').DataTable();
        }
    })
};

cus.delete = function (id){
    bootbox.confirm({
        title: "Remove cusscriber?",
        message: "Do you want remove this cusscriber?",
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
                    url: " http://localhost:3000/cuscriber/" +id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        cus.drawTable();
                    }
                })
            }   
        }
    });
};
cus.check = function (id){
    bootbox.confirm({
        title: "Oder",
        message: "Did oder already yet?",
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
                    url: " http://localhost:3000/cuscriber/" +id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        cus.drawTable();
                    }
                })
            } 
           
        }
    });
};
cus.init = function (){
    cus.drawTable();
}
$(document).ready(function(){
    cus.init();
});