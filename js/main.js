$(document).ready(function () {
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    };
    document.querySelectorAll('#menu > *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    });


    let loader = $('#loader');
    $('#submit').click(function () {
        $('.error-input').hide();

        let name = $('#name');
        let address = $('#address');
        let phone = $('#phone');

        let order=$('form');
        let orderSuccess=$('#form-success');
        name.css('border-color', 'rgb(185, 145, 80)');
        address.css('border-color', 'rgb(185, 145, 80)');
        phone.css('border-color', 'rgb(185, 145, 80)');
        let hasError = false;

        if (!name.val()) {
            name.siblings('.error-input').show();
            name.css('border-color', 'red');
            hasError = true;

        }
        if (!address.val()) {
            address.siblings('.error-input').show();
            address.css('border-color', 'red');
            hasError = true;
        }
        if (!phone.val()) {
            phone.siblings('.error-input').show();
            phone.css('border-color', 'red');
            hasError = true;
        }

        if (!hasError){

            loader.css('display', 'flex')
        $.ajax({
            method: "POST",
            url: 'https://itlogia.ru/test/checkout',
            data: {name: name.val(), address: address.val(), phone: phone.val()}
        })
            .done(function (message) {
                loader.hide();
                console.log(message);
                if (message.success) {
                    order.css('display', 'none');
                    orderSuccess.css('display', 'flex');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            });
        }
    })
});
