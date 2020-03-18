let product = {} || product;

product.drawTable = function (){
    $.ajax({
        url: 'https://rstorecompany.herokuapp.com/electricguitar',
        method: "GET",
        dataType: "JSON",
        success : function(data){
            $('#tbProduct').empty();
            $.each(data, function(i,v){
                $('#tbProduct').append(
                    "<tr>"+
                    "<td>"+v.id+"</td>"+
                    "<td>"+v.name+"</td>"+
                    "<td>   <img src="+v.image+" width='100px' height='120px'> </td>" +
                    "<td>   <img src="+v.image2+" width='100px' height='120px'> </td>" +
                    "<td>"+v.price+"</td>"+
                    "<td>"+v.decri+"</td>"+
                    "<td >"+
                    "<a href ='javascript:;' onclick='product.get("+v.id+")'     title='edit'><i class='fa fa-edit' ></i></a> "+
                    "<a href ='javascript:;' onclick='product.delete("+v.id+")' title='remove'><i class='fa fa-trash'  ></i></a>"+

               "</td>"+
            
               +"</tr>"

                );
            });
            $('#datatb').DataTable();
        }
    })
};
product.openModal = function(){
    product.reset();
    $('#addEditProduct').modal('show')
};
product.save = function(){
    if($('#formAddEditProduct').valid()){
        if($('#id').val() ==0){
            let productObj = {};
            productObj.name = $('#Name').val();
            productObj.image = $('#image').val();
            productObj.image2 = $('#image2').val();
            productObj.price   = $('#Price').val();
            productObj.decri =$('#Decribe').val();
    
            $.ajax({
                url: 'https://rstorecompany.herokuapp.com/electricguitar',
                method: "POST",
                dataType: "JSON",
                contentType: "application/JSON",
                data : JSON.stringify(productObj),
                success : function (data){
                    $('#addEditProduct').modal('hide'),
                    product.drawTable();;
                }
            })
        } else {
            let productObj = {};
            productObj.name = $('#Name').val();
            productObj.image = $('#image').val();
            productObj.image2 = $('#image2').val();
            productObj.price   = $('#Price').val();
            productObj.decri =$('#Decribe').val();
            productObj.id   = $('#id').val();
    
            $.ajax({
                url: 'https://rstorecompany.herokuapp.com/electricguitar/' +productObj.id,
                method: "PUT",
                dataType: "JSON",
                contentType: "application/JSON",
                data : JSON.stringify(productObj),
                success : function (data){
                    $('#addEditProduct').modal('hide'),
                   product.drawTable();;
                }
            })
        }
      
    }   
};
product.get = function (id){
    $.ajax({
        url: 'https://rstorecompany.herokuapp.com/electricguitar/' +id,
        method : "GET",
        dataType : "JSON",
        success : function(data){
            $('#Name').val(data.name);
            $('#image').val(data.image);
            $('#image2').val(data.image2);
            $('#id').val(data.id);
            $('#Price').val(data.price);
            $('#Decribe').val(data.decri);
            let validator =$('#formAddEditProduct').validate();
            validator.resetForm();
            $('#addEditProduct').modal('show');
        }
    })
};
product.delete = function (id){
    bootbox.confirm({
        title: "Remove product",
        message: "Do you want remove this product?",
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
                    url: "https://rstorecompany.herokuapp.com/electricguitar/" +id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        product.drawTable();
                    }
                })
            }   
        }
    });
};

product.reset = function (){
    $('#Name').val("");
    $('#image').val("");
    $('#image2').val("");
    $('#id').val('0');
    $('#Price').val("");
    $('#Decribe').val("");
    let validator =$('#formAddEditProduct').validate();
    validator.resetForm();
}

product.init = function (){
    product.drawTable();
}
$(document).ready(function(){
    product.init();
});

$(document).on({
    ajaxStart: function () {
        $(".loader").show();
    },
    ajaxStop: function () {
        $(".loader").hide();
    },
    ajaxError: function () {
        $(".loader").hide();
    }
});