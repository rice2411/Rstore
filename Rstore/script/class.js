let acou  = {} || acou;   
let detail = {} || detail
let cus = {} || cus;
acou.drawTable = function () {
    $.ajax({
        url: 'https://rstorecompany.herokuapp.com/classicguitar',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#tbAcou').empty();
            $.each(data,function (i,v) {
                $('#tbAcou').append(
                    "<div class='col-md-6 col-lg-4 mb-5' data-aos='fade-up' data-aos-delay='100'>"+
                    "  <a  class='unit-9'>"+
                    "<div class='image' style=' "+'background-image: url('+v.image+');'+"'></div>"+
                    "<div class='unit-9-content'>"+
                    "  <h2>"+v.name+"</h2>"+
                    "<span>"+v.price+"₫</span>"+
                    "  </div></a><br>"+
                    "<a class='btn btn-danger' href='#go' onclick='acou.buy("+v.id+")'>Buy</a>"+
                    " <a class='btn btn-warning'><i class='fa fa-cart-plus'></i></a> "+
                    "<a class='btn btn-info' href='#go' onclick='detail.showdetail("+v.id+")'>Details</a>"+
                    "</div>"
                    
                  
                    
                  
                );
            });
         
        }
    })
};

detail.showdetail = function (id){
 
    $.ajax({
        url: '  https://rstorecompany.herokuapp.com/classicguitar/'+id,
        method: 'GET',
        dataType: "JSON",
        success: function(data){
            $('#showdetail').empty()
                $('#showdetail').append(
                    "   <div class='featured-property-half d-flex'>"+
                    "<div class='image' style=' "+'background-image: url('+data.image+');'+"'></div>"+
                    "   <div class='text'>"+
                    "   <h2>"+data.name+"</h2>"+
                    "  <ul class='property-list-details mb-54'>"+
                    "<li class='text-black'>Tên sản phẩm <strong class='text-black'>"+data.name+"</strong></li>"+
                    "<li>Xuất xứ: <strong>"+data.origin+"</strong></li>"+
                    "<li>Kiểu Dáng: <strong>"+data.shape+"</strong></li>"+
                    "<li>Kiểu sơn: <strong>"+data.paint+"</strong></li>"+
                    "<li>Mặt Đàn: <strong>"+data.face+"</strong></li>"+
                    "<li>Lưng & Hông: <strong>"+data.back+"</strong></li>"+
                    "<li>Đầu Đàn & Cần: <strong>"+data.head+"</strong></li>"+
                    "<li>Ngựa Đàn: <strong>"+data.horse+"</strong></li>"+
                    "<li>Dây Đàn: <strong>"+data.string+"</strong></li>"+
                    "<li>Bảo hành: <strong>"+data.time+"</strong></li></ul>"+
                    "<a class='btn btn-danger'>Buy</a> <a class='btn btn-warning'><i class='fa fa-cart-plus'></i></a> <a class='btn btn-primary' onclick='remove()'><i class='fa fa-times'></i></a></div><div>"
                )
           
        }
    })
}
acou.buy = function (id){
    $.ajax({
        url: ' https://rstorecompany.herokuapp.com/classicguitar/'+id,
        method: 'GET',
        dataType: "JSON",
        success: function(data){
            $('#showdetail').empty()
                $('#showdetail').append(
                    "   <div class='featured-property-half d-flex'>"+
                    "<div class='image' style=' "+'background-image: url('+data.image+');'+"'></div>"+
                    "   <div class='text'>"+
                    "   <h2>"+data.name+"</h2>"+
                    " <form id='forminformation'> <ul class='property-list-details mb-54'>"+
                    "<li class='text-black'>Full Name:    <input type='text' id='fullName"+data.id+"'    class='form-control' required></li>"+  
                    "<li class='text-black'>Address:      <input type='text' id='addRess"+data.id+"'     class='form-control' required></li>"+
                    "<li class='text-black'>Phone Number: <input type='text' id='phoneNumber"+data.id+"' class='form-control' required></li>"+
                    "<li class='text-black'>Product Name: <input type='text' id='productname"+data.id+"' class='form-control' readonly value='"+data.name+"'></li>"+
                    "<li class='text-black'>Price: <input type='number' id='price"+data.id+"' class='form-control' readonly value='"+data.price+"'></li>"+
                    "<a class='btn btn-danger' style='color: white;' onclick='cus.confirm("+data.id+")'>Confirm</a> <a class='btn btn-warning'><i class='fa fa-times' onclick='no()'></i></a></form></div><div>"
                )
           
        }
    })
}
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
                    "<a href ='javascript:;' onclick='cus.check("+v.id+")'     title='mail'><i class='fa fa-check' ></i></a> "+
                    "<a href ='javascript:;' onclick='cus.delete("+v.id+")' title='remove'><i class='fa fa-trash'  ></i></a>"+

               "</td>"+
            
               +"</tr>"

                );
            });
            $('#datatb').DataTable();
        }
    })
};
cus.confirm =function (id){

    if($('#forminformation').valid()){ 
       
        bootbox.alert('We will contact to you soon')
        let cusObj = {};
            $.ajax({
                url: 'https://rstorecompany.herokuapp.com/classicguitar/' +id,
                method : "GET",
                dataType : "JSON",
                success : function(data){
                      $('#productname'+id).val(data.name);
                      $('#price'+id).val(data.price);
                 
                }
            })
      
          
        cusObj.fullName = $('#fullName'+id).val();
        cusObj.phoneNumber = $('#phoneNumber'+id).val();
        cusObj.address=$('#addRess'+id).val();
        cusObj.product=$('#productname'+id).val();
        cusObj.price=$('#price'+id).val();
        $.ajax({
            url: 'https://rstorecompany.herokuapp.com/customer',
            method: "POST",
            dataType: "JSON",
            contentType: "application/JSON",
            data : JSON.stringify(cusObj),
            success : function (data){
                cus.drawTable();
            }
        })
    
    }
}
function no(){
    $('#showdetail').empty()
}
cus.init = function (){
    cus.drawTable();
}
$(document).ready(function(){
    cus.init();
});
function remove(){
    $('#showdetail').empty()
}
acou.init = function (){
    acou.drawTable();
}
$(document).ready(function(){
    acou.init();
});
