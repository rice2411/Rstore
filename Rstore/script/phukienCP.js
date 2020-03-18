let product = {} || product;
let showimg = {} || showimg;
let sub = {} || sub;
let cus = {} || cus;
let cart = {} || cart;
product.drawTable = function () {
    $.ajax({
        url: ' http://rstorecompany.herokuapp.com/capo',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            $('#tbProduct').empty();
            $.each(data, function (i, v) {
                $('#tbProduct').append(
                    " <div class='col-lg-4 col-md-6 mb-4'>" +
                    "<div class='card h-100 text-center'>" +
                    " <a href='#'  ><img class='card-img-top' src='" + v.image + "' style='width: 200px; height:200px'>  </a>" +
                    " <div class='card-body'>" +
                    "   <h4 class='card-title' id='srh'>" +
                    "<a href=''  type='button' id='makecolor' data-toggle='modal' data-target='#myModal"+v.id+"'>" + v.name + "</a>  </h4>" +
                    "<h5>"+v.price+"</h5>" +
                    " <p class='card-text'>" + v.decri + "</p>" +
                    "        </div>" +
                    " <div class='card-footer text-center'>" +
                    "<a href='' class='btn btn-danger btn-sm' type='button' data-toggle='modal' data-target='#buy"+v.id+"' onclick='rs("+v.id+")'>Buy</a><br>" +
                    "<a href='' class='btn btn-warning btn-sm' type='button' data-toggle='modal' data-target='#cart"+v.id+"'onclick='cart.addtocart("+v.id+")' style='margin-top:5px;'>Add to cart<i class='fa fa-cart-plus' ></i></a>"+
                    "       </div> </div></div></div> </div>"+
                    "<div id='buy"+v.id+"' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h4 >Please fill your information</h4><button type='button' class='close' data-dismiss='modal'>&times;</button></div><div class='modal-body'><div><div class='alsuccess'><div class='alert alert-success' role='alert'  ><b>We will contact you soon</b><button type='button' class='close' data-dismiss='modal'>&times;</button></div></div></div><form id='forminformation'><div class='row form-group'><div class='col-3'><label for=''>FullName</label></div><div class='col-9'><input type='text' name='FullName' id='fullName"+v.id+"' class='form-control' required></div></div><div class='row form-group'><div class='col-3'><label for=''>Phone Number</label></div><div class='col-9'><input type='number' name='phoneNumber' id='phoneNumber"+v.id+"' class='form-control' required></div></div><div class='row form-group'><div class='col-3'><label for=''>Address</label></div><div class='col-9'><input type='text' name='Address' id='Address"+v.id+"' class='form-control' required ></div></div>  <div class='row form-group'><div class='col-3'><label for=''>Product Name</label></div><div class='col-9'><input type='text' name='ProductName' id='ProductName"+v.id+"' class='form-control' value ='"+v.name+"' readonly ></div></div><div class='row form-group'><div class='col-3'><label for=''>Price</label></div><div class='col-9'><input type='text' name='ProductName' id='Price"+v.id+"' class='form-control' value ='"+v.price+"'readonly ></div></div></form></div><div class='modal-footer'><a href='#' class='btn btn-primary' onclick='cus.confirminfor("+v.id+")' >Confirm</a><button type='button' class='btn btn-danger' data-dismiss='modal'>Cancel</button></div></div></div> </div>"+
                    "<div id='cart"+v.id+"' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h4 >Check your cart</h4></div><div class='modal-body' hidden><div><form id='forminformation'><div class='row form-group'><div class='col-3'><label for=''>Name</label></div><div class='col-9'><input type='text' name='Name' id='name"+v.id+"' class='form-control' required></div></div><div class='row form-group'><div class='col-3'><label for=''>Image</label></div><div class='col-9'><input type='text' name='image' id='image"+v.id+"' class='form-control' required></div></div><div class='row form-group'><div class='col-3'><label for=''>Image2</label></div><div class='col-9'><input type='text' name='Image2' id='image2"+v.id+"' class='form-control' required ></div></div>  <div class='row form-group'><div class='col-3'><label for=''>Price</label></div><div class='col-9'><input type='text' name='Price' id='price"+v.id+"' class='form-control'  ></div></div><div class='row form-group'><div class='col-3'><label for=''>Deribe</label></div><div class='col-9'><input type='text' name='Deribe' id='decribe"+v.id+"' class='form-control'  ></div></div></form></div></div><div class='modal-footer'><button type='button' class='btn btn-success' data-dismiss='modal' onclick='cart.addtocart1("+v.id+")'>OK</button></div></div> </div>"
                  
                  
                );
            });
            $('.alsuccess').hide();
        }
    })
};
cart.confirminfor =function (id){

    if($('#forminformation').valid()){ 
       
      
        let cusObj = {};
            $.ajax({
                url: 'http://rstorecompany.herokuapp.com/capo/' +id,
                method : "GET",
                dataType : "JSON",
                success : function(data){
                      $('#ProductName'+id).val(data.name);
                      $('#Price'+id).val(data.price);
                 
                }
            })
      
          
        cusObj.fullName = $('#fullName'+id).val();
        cusObj.phoneNumber = $('#phoneNumber'+id).val();
        cusObj.address=$('#Address'+id).val();
        cusObj.product=$('#ProductName'+id).val();
        cusObj.price=$('#Price'+id).val();
        $.ajax({
            url: 'http://rstorecompany.herokuapp.com/customer',
            method: "POST",
            dataType: "JSON",
            contentType: "application/JSON",
            data : JSON.stringify(cusObj),
            success : function (data){
                cus.drawTable();
            }
        })
bootbox.alert('We will contact to you soon')
        $.ajax({
            url: "https://rstorecompany.herokuapp.com/cart/"+id,
            method: "DELETE",
            dataType: "JSON",
            success : function(data){
                cart.drawTable();
            }
        })
   $(".modal-backdrop").hide()
    }
}
cart.removefromcart = function(id){
    bootbox.confirm({
        title: "Remove cart?",
        message: "Do you want remove this cart?",
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
                    url: "https://rstorecompany.herokuapp.com/cart/"+id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        cart.drawTable();
                    }
                })
            }   
        }
    });
}
cart.addtocart =function (id){
  
    $.ajax({
        url: 'http://rstorecompany.herokuapp.com/capo/' +id,
        method : "GET",
        dataType : "JSON",
        success : function(data){
            $("#name"+id).val(data.name);
           $('#image'+id).val(data.image);
           $('#image2'+id).val(data.image2);
           $('#price'+id).val(data.price);
           $('#decribe'+id).val(data.decri);

         
        }
    })
}  
cart.addtocart1 = function (id){
    let cartObj = {};
    cartObj.name=  $("#name"+id).val();
    cartObj.image=  $("#image"+id).val();
    cartObj.image2=$("#image2"+id).val();
    cartObj.price=$("#price"+id).val();
    cartObj.decri=$("#decribe"+id).val();;
    $.ajax({
        url: 'https://rstorecompany.herokuapp.com/cart',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data : JSON.stringify(cartObj),
        success : function (data){
            cart.drawTable();;
        }
    })

}   
 function rs (id){
    $('.alsuccess').hide();
    $('#fullName'+id).val("");
    $('#phoneNumber'+id).val("");
    $('#Address'+id).val("");
   
 }
showimg.drawTable = function () {
    $.ajax({
        url: ' http://rstorecompany.herokuapp.com/capo',
        method: "GET",
        dataType: "JSON",
        success: function (data) {
        
            $.each(data, function (i, v) {
                $('#anotherimage').append(
                   "  <div id='myModal"+v.id+"' class='modal fade' role='dialog'>"+
                   "<div class='modal-dialog'>"+
                   " <div class='modal-content'>"+
                   "<div class='modal-header'>"+
                   "  <button type='button' class='close' data-dismiss='modal'>&times;</button>"+
                   "</div>"+
                   "  <div class='modal-dialog modal-lg text-center'>"+
                   "  <img src='"+v.image2+"'  style='width: 50%;height: 50%'>"+
                   " </div>"+
                   "      <div class='modal-footer'>"+
                   " <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+
                   "      </div> </div></div></div>  "
                );
            });

        }
    })
};
$("#althank").hide();


sub.drawTable = function (){
    $.ajax({
        url: 'https://rstorecompany.herokuapp.com/subscriber',
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
sub.Subscribe =function (){
    if($('#SUBSCRIBE').valid()){ 
           
    
        $("#althank").show();
        let subObj = {};
        subObj.email = $('#Email').val();
        $.ajax({
            url: 'https://rstorecompany.herokuapp.com/subscriber',
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
                    url: "https://rstorecompany.herokuapp.com/subscriber/" +id,
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
cus.drawTable = function (){
    $.ajax({
        url: 'http://rstorecompany.herokuapp.com/customer',
        method: "GET",
        dataType: "JSON",
        success : function(data){
            $('#tbcustomer').empty();
            $.each(data, function(i,v){
                $('#tbcustomer').append(
                    "<tr>"+
                    "<td>"+v.id+"</td>"+
                    "<td>"+v.fullName+"</td>"+
                    "<td>"+v.phoneNumber+"</td>"+
                    "<td>"+v.address+"</td>"+
                    "<td > "+v.product+"</td>"+
                    "<td>"+v.price+"</td>"+
                    "<td >"+
                    "<a href ='javascript:;' onclick='cus.check("+v.id+")'     title='done'><i class='fa fa-check' ></i></a> "+
                    "<a href ='javascript:;' onclick='cus.delete("+v.id+")' title='remove'><i class='fa fa-trash'  ></i></a>"+

               "</td>"+
            
               +"</tr>"

                );
            });
            $('#datatb1').DataTable();
        }
    })
};

cus.confirminfor =function (id){

    if($('#forminformation').valid()){ 
       
        $(".alsuccess").show();
        let cusObj = {};
            $.ajax({
                url: 'http://rstorecompany.herokuapp.com/capo/' +id,
                method : "GET",
                dataType : "JSON",
                success : function(data){
                      $('#ProductName'+id).val(data.name);
                      $('#Price'+id).val(data.price);
                 
                }
            })
      
          
        cusObj.fullName = $('#fullName'+id).val();
        cusObj.phoneNumber = $('#phoneNumber'+id).val();
        cusObj.address=$('#Address'+id).val();
        cusObj.product=$('#ProductName'+id).val();
        cusObj.price=$('#Price'+id).val();
        $.ajax({
            url: 'http://rstorecompany.herokuapp.com/customer',
            method: "POST",
            dataType: "JSON",
            contentType: "application/JSON",
            data : JSON.stringify(cusObj),
            success : function (data){
                cus.drawTable();;
            }
        })
    
    }
}
cus.delete = function (id){
    bootbox.confirm({
        title: "Remove customer?",
        message: "Do you want remove this customer?",
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
                    url: "http://rstorecompany.herokuapp.com/customer/" +id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        cus.drawTable();
                    }
                })
            }   
        }
    });
}
cus.check = function (id){
    bootbox.confirm({
        title: "Oder",
        message: "Is this order ready yet?",
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
                    url: "http://rstorecompany.herokuapp.com/customer/" +id,
                    method: "DELETE",
                    dataType: "JSON",
                    success : function(data){
                        cus.drawTable();
                    }
                })
            }   
        }
    });
}
cart.init = function (){
    cart.drawTable();
}
$(document).ready(function(){
    cart.init();
});
cus.init = function (){
    cus.drawTable();
}
$(document).ready(function(){
    cus.init();
});
sub.init = function (){
    sub.drawTable();
}
$(document).ready(function(){
    sub.init();
});
showimg.init = function (){
    showimg.drawTable();
}
$(document).ready(function(){
    showimg.init();
});
product.init = function (){
    product.drawTable();
}
$(document).ready(function(){
    product.init();
});
