let acou = {} || acou;

acou.drawTable = function () {
    $.ajax({
        url: '  https://rstorecompany.herokuapp.com/pick',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#tbProduct').empty();
            $.each(data, function (i, v) {
                $('#tbProduct').append(
                    "<tr>" +
                    "<td>" + v.id + "</td>" +
                    "<td>" + v.name + "</td>" +
                    "<td><img src=" + v.image + " style='width: 50px; height: 50px'   ></td>" +
                    "<td>" + v.decri + "</td>" +
                    "<td>" + v.price + "</td>" +
                    "<td>" +
                    "<a href ='javascript:;'    title='edit' onclick='acou.get(" + v.id + ")'><i class='fa fa-edit' ></i></a> " +
                    "<a href ='javascript:;'  title='remove' onclick='acou.delete("+v.id+")'><i class='fa fa-trash'  ></i></a>" +
                    "</td></tr>"
                );
            });
            $('#datatb').DataTable();
        }
    })
};
$("#showadd").hide()
acou.add = function () {
    $('#name').val("");
    $('#Image').attr("");
    $('#price').val("");
    $('#decri').val("");
    $('#id').val("");
    $("#showadd").show()

}
acou.cancel = function () {
    $("#showadd").hide()
}
acou.save = function () {

    if ($('#formacou').valid()) {
        if ($('#id').val() == 0) {
            let acouObj = {};
            acouObj.name = $('#name').val();
            acouObj.image = $('#Image').attr('src');;
            acouObj.price = $('#price').val();
            acouObj.decri=$('#decri').val();


            $.ajax({
                url: ' https://rstorecompany.herokuapp.com/pick',
                method: "POST",
                dataType: "JSON",
                contentType: "application/JSON",
                data: JSON.stringify(acouObj),
                success: function (data) {
                    $("#showadd").hide()
                    acou.drawTable();;
                }
            })
        } else {
            let acouObj = {};
            acouObj.name = $('#name').val();
            acouObj.image = $('#Image').attr('src');
            acouObj.price = $('#price').val();
            acouObj.decri=$('#decri').val();
            acouObj.id = $('#id').val();

            $.ajax({
                url: 'https://rstorecompany.herokuapp.com/pick/' + acouObj.id,
                method: "PUT",
                dataType: "JSON",
                contentType: "application/JSON",
                data: JSON.stringify(acouObj),
                success: function (data) {
                    $("#showadd").hide()
                    acou.drawTable();;
                }
            })
        }

    }
};
acou.get = function (id) {
    $.ajax({
        url: 'https://rstorecompany.herokuapp.com/pick/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#name').val(data.name);
            $('#Image').attr('src',data.image);
            $('#price').val(data.price);
            $('#decri').val(data.decri)
            $('#id').val(data.id);
         
            $("#showadd").show()
        }
    })
}
acou.delete = function (id){
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
                    url: "https://rstorecompany.herokuapp.com/pick/" +id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        acou.drawTable();
                    }
                })
            }   
        }
    });
};
acou.uploadImage = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Image').attr('src', e.target.result);
            console.log(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

acou.init = function () {
    acou.drawTable();
}
$(document).ready(function () {
    acou.init();
});