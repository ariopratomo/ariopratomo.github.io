// Apikey 5f6a3109
$.ajax({
  url: "http://www.omdbapi.com/?apikey=5f6a3109&s=ipman",
  success: results => {
    const movies = results;
    console.log(movies);
  },
  error: e => {
    console.log(e.responseText);
  }
});
