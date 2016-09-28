import {inject} from "aurelia-framework"
import {HttpClient} from "aurelia-http-client";

let baseUrl = "/movies.json"

@inject(HttpClient)
export class MovieData {
    constructor(httpClient) {
        this.http = httpClient;
    }

    getById(id) {
        return this.http.get(baseUrl)
                .then(response => {
                    var movie =  response.content.filter(function (el) {
                        return el.id == id;
                    });
                    return movie[0];
                });
    }

    getAll() {
        return this.http.get(baseUrl)
                .then(response => {
                    return response.content;
                });
    }

    save(movie) {
        //// return this.http.put(baseUrl, movie);
        console.log(movie.id + "/" + movie.title + "/" + movie.releaseYear);
    }
}