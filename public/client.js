fetch("/post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: "Text"})
    }).then(res => res.text())
    .then(res => console.log(res));

function getstatus(){
    var xhr = new XMLHttpRequest();
    console.log('ooijoijoij');
    xhr.open('GET','/check',false);
    xhr.onload = function(){
        if (xhr.responseText == 'true') {
            document.getElementById('log-in-btn').setAttribute('hidden','true');
            document.getElementById('user-btn').removeAttribute('hidden');
            console.log('yees');
        }else{
            document.getElementById('user-btn').setAttribute('hidden','true');
            document.getElementById('log-in-btn').removeAttribute('hidden');
            console.log('nooo');
        }
    };
    xhr.send();
}