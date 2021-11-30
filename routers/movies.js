import express from "express";
import { getAllMovies, createMovieById, getMovieById, deleteMovieById, updateMovieById } from "../helper.js";

const router = express.Router();

router.route("/").get(async (request, response) => {

    console.log(request.query);
    const filter = request.query;
    console.log(filter);
    if (filter.rating) {
        filter.rating = +(filter.rating)
    }
    //db.movies.find({language: "tamil",rating: 8})
    const filterMovie = await getAllMovies(filter);
    response.send(filterMovie);
}).post(async (request, response) => {
    const data = request.body;
    const result = await createMovieById(data);
    response.send(result);
});

router.route("/:id").get(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    //db query
    const movie = await getMovieById(id);

    console.log(movie);
    movie ? response.send(movie) : response.status(404).send({ message: "No matching movie found" })
}).delete(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    //db query
    const result = await deleteMovieById(id);

    result.deletedCount > 0 ? response.send(result) : response.status(404).send({ message: "No matching movie found" })
}).put(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    const data = request.body;
    //db query
    const result = await updateMovieById(id, data);
    const movie = await getMovieById(id);
    response.send(movie);
    // result.deletedCount > 0 ? response.send(result) : response.status(404).send({ message: "No matching movie found" })
});

export const moviesRouter = router;