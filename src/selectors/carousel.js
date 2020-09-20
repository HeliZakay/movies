export const getCarouselItems = ({friends, movies, watchlist, language}) => {
    let friendsArray = friends.map((friend) => {
        return friend.userId;
    });
    let items = [];
    movies.forEach((movie) => {
        const friendsReviews = movie.reviews.filter((review) => {
            return friendsArray.includes(review.userUid);
        });
        if (!watchlist.includes(movie.id)) {
            friendsReviews.forEach((review) => {
                const header = `${review.personName} ${language==="English"? "reviewed the movie": "הוסיפה ביקורת על הסרט"} ${movie.movieName}`;
                const score = review.score;
                const content=review.content;
                const item = {
                    header,
                    score,
                    content
                };
                items.push(item);
            });
        }
    });
    items.sort((a,b) => {
        return a.createdAt < b.createdAt? 1:-1; 
    })
    if (items.length > 7) {
        items = items.slice(0,7);
    }
    return items;
}