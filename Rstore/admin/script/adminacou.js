let acou = {} || acou;

acou.drawTable = function () {
    $.ajax({
        url: '  https://rstorecompany.herokuapp.com/acouticsguitar',
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
                    "<td>" + v.origin + "</td>" +
                    "<td>" + v.shape + "</td>" +
                    "<td>" + v.paint + "</td>" +
                    "<td>" + v.face + "</td>" +
                    "<td>" + v.back + "</td>" +
                    "<td>" + v.head + "</td>" +
                    "<td>" + v.horse + "</td>" +
                    "<td>" + v.string + "</td>" +
                    "<td>" + v.time + "</td>" +
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
    $('#origin').val("");
    $('#shape').val("");;
    $('#paint').val("");
    $('#face').val("");
    $('#back').val("");
    $('#head').val("");
    $('#horse').val("");
    $('#string').val("");
    $('#time').val("");
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
            acouObj.origin = $('#origin').val();
            acouObj.shape = $('#shape').val();;
            acouObj.paint = $('#paint').val();
            acouObj.face = $('#face').val();
            acouObj.back = $('#back').val();
            acouObj.head = $('#head').val();
            acouObj.horse = $('#horse').val();
            acouObj.string = $('#string').val();
            acouObj.time = $('#time').val();


            $.ajax({
                url: ' https://rstorecompany.herokuapp.com/acouticsguitar',
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
            acouObj.origin = $('#origin').val();
            acouObj.shape = $('#shape').val();;
            acouObj.paint = $('#paint').val();
            acouObj.face = $('#face').val();
            acouObj.back = $('#back').val();
            acouObj.head = $('#head').val();
            acouObj.horse = $('#horse').val();
            acouObj.string = $('#string').val();
            acouObj.time = $('#time').val();
            acouObj.id = $('#id').val();

            $.ajax({
                url: 'https://rstorecompany.herokuapp.com/acouticsguitar/' + acouObj.id,
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
        url: 'https://rstorecompany.herokuapp.com/acouticsguitar/' + id,
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#name').val(data.name);
            $('#Image').attr('src',data.image);
            $('#price').val(data.price);
            $('#origin').val(data.origin);
            $('#shape').val(data.shape);
            $('#paint').val(data.paint);
            $('#face').val(data.face);
            $('#back').val(data.back);
            $('#head').val(data.head);
            $('#horse').val(data.horse);
            $('#string').val(data.string);
            $('#time').val(data.time);
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
                    url: "https://rstorecompany.herokuapp.com/acouticsguitar/" +id,
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