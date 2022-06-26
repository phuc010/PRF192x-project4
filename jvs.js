$(document).ready(function(){ 
    //get modalbox sybolopenmodal btnsearch close
    var modal = document.getElementById("modalbox");
    var openModal = document.getElementById("sybolopenmodal");
    var btnSearch = document.getElementById("btnsearch");
    var spanClose = document.getElementById("close");
    //function click open Modal
    openModal.onclick = function(){
        modal.style.display = "block";
    };
    //When btnSearch is clicked close Modal
    btnSearch.onclick = function(){
        modal.style.display = "none"
    };
    //When span is clicked close Modal
    spanClose.onclick = function(){
        modal.style.display = "none"
    };

    var link = new Request('https://gnews.io/api/v4/top-headlines?&lang=en&token=636563d98e9d26a4f55d45dec06a678c');
    fetch(link)
        .then(function(response){
            return response.json();
        })
        .then(function(datas){
            console.log(datas);
        let htmlsLink = datas.articles.map(function(data){
            return `
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12">
                    <a target="_blank" href = '${data.url}'> <img class="hvr-float" src = '${data.image}'> </a>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-12">
                    <a target="_blank" href = '${data.url}'>
                    <b> ${data.title} </b></a>
                    <p><i> ${data.publishedAt} </i></p>
                    <p> ${data.description}</p>
                    </div>
                </div>
            </div>
            `;
        });
        let htmlLink = htmlsLink.join(' ');
        $('#main').html(htmlLink);
    });

    $("#btnsearch").click(function(){
        var searchExam = $('#searchkeywords').val();
        var apiNew = 'https://gnews.io/api/v4/search?q=' + searchExam + '&lang=en&token=636563d98e9d26a4f55d45dec06a678c'
            fetch(apiNew)
            .then(function (response) {
                return response.json();
            })
            .then(function (datas) {
                console.log(datas);
                $('#main').html('');  
            let htmlsLink = datas.articles.map(function(data){
                return `
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                        <a target="_blank" href = '${data.url}'> <img class="hvr-float" src = '${data.image}'> </a>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                        <a target="_blank" href = '${data.url}'>
                        <b> ${data.title} </b></a>
                        <p><i> ${data.publishedAt} </i></p>
                        <p> ${data.description}</p>
                        </div>
                    </div>
                </div>
                `;
            });
            let htmlLink = htmlsLink.join(' ');
            // document.getElementById("main").innerHTML = html;
            $('#main').html(htmlLink);
            });
    })
})