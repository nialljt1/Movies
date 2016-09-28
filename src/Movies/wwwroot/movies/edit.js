import {inject} from "aurelia-framework";
import {MovieData} from "./movieData";
import {Router} from "aurelia-router";
import {ValidationController} from "aurelia-validation";

@inject(MovieData, Router, ValidationController)
export class Edit {

    constructor(movieData, router, validationController) {
        this.data = movieData;
        this.router = router;
        this.validationController = validationController.on(this)
        .ensure("movie.title")
        .isNotEmpty
        .hasMinLength(3)
        .hasMaxLength(100)
        .ensure("movie.releaseYear")
        .isNumber()
        .isBetween(1900, 2100);
    }

    activate(params) {
        return this.data.getById(params.id)
            .then(movie => {
                this.movie = movie;
                ////this.validation.validate();
            });
    }

    save() {

        ////this.validation.validate().then(() => {
            this.data.save(this.movie)
            let url = this.router.generate("details", {id: this.movie.id})   
            this.router.navigate(url);
        ////});

        ////.then(movie => {
        ////    let url = this.router.generate("details", {id: movie.id})   
        ////    this.router.navigate(url);
        ////})
    }
}