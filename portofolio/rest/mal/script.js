let page = 1;
let load = `<div class="col d-flex justify-content-center" style="margin-top:250px">
<div class="spinner-grow text-primary" role="status">
	<span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-secondary" role="status">
	<span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
	<span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-danger" role="status">
	<span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-warning" role="status">
	<span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-info" role="status">
	<span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-dark" role="status">
	<span class="sr-only">Loading...</span>
</div>
</div>
							`;
$('#btn-cari').on('click', function() {
	searchAnime();
});
$('#keyword').on('keyup', function(e) {
	if (e.keyCode === 13) {
		//checks whether the pressed key is "Enter"

		searchAnime();
	}
});
function searchAnime() {
	$('.anime-container').empty();
	const keyword = $('#keyword').val();
	const type = $('#type').val();
	fetchAnime(type, keyword);
}
$('#hal').on('cli', function() {
	console.log('click');
});

function fetchAnime(type, keyword) {
	$.ajax({
		url: 'https://api.jikan.moe/v3/search/' + type + '?q=' + keyword + '&page=' + page,
		method: 'get',
		success: (search) => {
			const anime = search.results;

			let card = '';
			let last_page = search.last_page;

			anime.forEach((a) => {
				card += showAnime(a);
			});

			loadingAnime();
			setTimeout(() => {
				$('.anime-container').html(``);
				if (anime.length >= 1) {
					$('.anime-container').html(card);
				} else {
					$('.anime-container').html(
						`<div class="col d-flex justify-content-center"><h4 class="text-muted">` +
							type.charAt(0).toUpperCase() +
							type.slice(1) +
							` yang anda cari tidak ada.</h4></div>`
					);
				}
			}, 500);

			// ketika btn detail di klik
			$('.anime-container').on('click', '.btn-detail', function() {
				loadingDetail();
				setTimeout(() => {
					$.ajax({
						url: 'https://api.jikan.moe/v3/anime/' + $(this).data('malid'),
						success: (a) => {
							const animeDetail = showAnimeDetail(a);
							$('.modal-body').html(animeDetail);
							$('.modal-title').html(a.title);
						},
						error: (a) => {}
					});
				}, 500);
			});
		},
		error: (a) => {}
	});
}
function loadingAnime() {
	$('.anime-container').html(load);
}
function loadingDetail() {
	$('.modal-body').html(`
					<div class="loading2 d-flex justify-content-center">
					<div>Loading</div>
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
	`);
}

function showAnime(a) {
	return `<div class="col-lg-3 col-md-3 col-6 my-3"  data-toggle="tooltip" data-placement="top" title="${a.title}">
						<div class="card border-0 shadow-sm">
								<img src="${a.image_url}" class="card-img-top " alt="">
              <div class="card-body">
                <h6 class="card-title title">${a.title}</h6>
                <small class=" text-muted">Type : ${a.type}</small>
                <br>
                <small class=" text-muted">Score : ${a.score}</small>
                <br>
                <a href="#" class="mt-2 btn btn-block btn-primary btn-detail" data-malid="${a.mal_id}" data-toggle="modal" data-target="#AnimeDetailModal">Detail</a>
              </div>
            </div>
          </div>`;
}

function showAnimeDetail(a) {
	let genre_string = '';
	for (let i = 0; i < a.genres.length; i++) {
		genre_string += a.genres[i].name + ', ';
	}
	let producer_string = '';
	for (let i = 0; i < a.producers.length; i++) {
		producer_string += a.producers[i].name + ', ';
	}
	let licensor_string = '';
	for (let i = 0; i < a.licensors.length; i++) {
		licensor_string += a.licensors[i].name + ', ';
	}
	let studio_string = '';
	for (let i = 0; i < a.studios.length; i++) {
		studio_string += a.studios[i].name + ', ';
	}

	const year = a.aired.prop.to.year;
	const aired = a.aired.string;

	if (a.episodes == null) {
		a.episodes = '-';
	}
	return `<div class="container-fluid">
            <div class="row">
              <div class="col-lg-3 d-flex justify-content-center">
								<div class="my-2">
								<img src="${a.image_url}" alt="" class="img-fluid  ">
								</div>
                
                
              </div>
							<div class="col-lg-9">
							<ul class="list-unstyled">
                  <li><h5>Alternative Titles</h5></li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>English :</strong> ${a.title_english}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Japanese :</strong> ${a.title_japanese}</li>
                  <hr>
                  <li><h5>Information<h5></li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Type :</strong> ${a.type}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Episode :</strong> ${a.episodes}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Status :</strong> ${a.status}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Aired :</strong> ${aired}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Premiered :</strong> ${a.premiered}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Broadcast :</strong> ${a.broadcast}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Producers :</strong> ${producer_string}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Licensors :</strong> ${licensor_string}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Studios :</strong> ${studio_string}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Source :</strong> ${a.source}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Genre :</strong> ${genre_string}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Duration :</strong> ${a.duration}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Rating :</strong> ${a.rating}</li>
                  <hr>
                  <li><h5>Statistics<h5></li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Score :</strong> ${a.score} (scored by ${a.scored_by})</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Ranked :</strong> #${a.rank}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Popularity :</strong> #${a.popularity}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Members :</strong> #${a.members}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Favorites :</strong> #${a.favorites}</li>
                </ul>
              </div>
            </div>
          </div>`;
}
