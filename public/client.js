fetch("/post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: "Text"})
    }).then(res => res.text())
    .then(res => console.log(res));