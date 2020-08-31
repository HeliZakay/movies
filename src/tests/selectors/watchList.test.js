import getWatchListMovies from "../../selectors/watchList";
import movies from "../fixtures/movies";

test("should filter only movies in watch list", () => {
    const result = getWatchListMovies(movies);
    expect(result).toEqual([movies[2]]);    
});
