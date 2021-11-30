import { client } from "./index.js";

async function createMovieById(data) {
    return await client.db("nodejs").collection("movies").insertMany(data);
}
async function getAllMovies(filter) {
    return await client.db("nodejs").collection("movies").find(filter).toArray();
}
async function deleteMovieById(id) {
    return await client.db("nodejs").collection("movies").deleteOne({ id: id });
}
async function updateMovieById(id, data) {
    return await client.db("nodejs").collection("movies").updateOne({ id: id }, { $set: data });
}
async function getMovieById(id) {
    return await client.db("nodejs").collection("movies").findOne({ id: id });
}

export { getAllMovies, createMovieById, getMovieById, deleteMovieById, updateMovieById }