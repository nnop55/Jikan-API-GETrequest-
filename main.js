let searchInp = document.getElementById("searchinp");

let cardsArea = document.querySelector(".cardsarea");

class RenderHtml {
    renderData(collection) {
        cardsArea.innerHTML = "";
        collection.forEach(item => {
            cardsArea.innerHTML += `<div class="cardbody">
                                        <img src="${item.images.jpg.image_url}">
                                        <h1>${item.title}</h1>
                                        <hr style="width: 150px;color: #fff";margin-top: 0px; margin-bottom: 0px;>
                                         <button onclick="controller.openModal(${item.mal_id})" id="showbtn">Show More</button>
                                    </div>`

        });
    }

}


class HttpService {
    baseApiUrl = "https://api.jikan.moe/v4/anime";

    data = [];

    readData() {
        fetch(this.baseApiUrl)
            .then(async (resp) => {
                this.data = await resp.json();
                this.data = this.data.data;
                new RenderHtml().renderData(this.data)
            })


    }
}



class ViewController {

    filteredData = [];

    httpService = new HttpService();

    constructor() {
        this.httpService.readData();
    }

    openModal(id) {
        let item = this.httpService.data.filter(o => o.mal_id == id)[0];
        document.getElementById('id01').style.display = 'block';
        document.getElementById("description").innerText = item.synopsis;
        document.getElementById("rating").innerText = "Rating: " + item.rating;
    }

    filterBtnFunc() {
        let filterValue = searchInp.value;
        this.filteredData = this.httpService.data.filter(o => o.title.toLowerCase().includes(filterValue.toLowerCase()))
        new RenderHtml().renderData(this.filteredData)
    }

    clearBtnFunc() {
        new RenderHtml().renderData(this.httpService.data);
        searchInp.value = "";
    }
}

var controller = new ViewController();


