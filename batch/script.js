let page = 1;
let load = `<div class="col d-flex justify-content-center" style="margin-top:250px">
            <div class="spinner-grow text-primary" role="status">
              
            </div>
            <div class="spinner-grow text-secondary" role="status">
              
            </div>
            <div class="spinner-grow text-success" role="status">
              
            </div>
            <div class="spinner-grow text-danger" role="status">
              
            </div>
            <div class="spinner-grow text-warning" role="status">
              
            </div>
            <div class="spinner-grow text-info" role="status">
              
            </div>
            <div class="spinner-grow text-dark" role="status">
              
            </div>
            </div> `;
let load2 = `<div style="margin-top:250px" class="text-center"><strong>Loading mek</strong></div>
<div class="col d-flex justify-content-center">

	<div class="spinner-grow text-primary" role="status">

	</div>
	<div class="spinner-grow text-secondary" role="status">

	</div>
	<div class="spinner-grow text-success" role="status">

	</div>
	<div class="spinner-grow text-danger" role="status">

	</div>
	<div class="spinner-grow text-warning" role="status">

	</div>
	<div class="spinner-grow text-info" role="status">

	</div>
	<div class="spinner-grow text-dark" role="status">

	</div>
</div> `;

const apiUrl = "http://147.139.170.159:4141/";
const apiUrlBatch = "https://kusonime-scrapper.glitch.me/api/";
$('#btn-cari').on('click', function () {
	searchAnime();
});
$('#keyword').on('keyup', function (e) {
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

$('#hal').on('cli', function () {
	console.log('click');
});
fetchHome()
$('#rekomendasi').click(function () {
	fetchHome()
})
function fetchHome() {
	$.ajax({
		url: apiUrlBatch + 'rekomendasi',
		method: 'get',
		success: (home) => {
			const anime = home;

			let card = '';
			// let last_page = search.last_page;

			anime.forEach((a) => {
				card += showHome(a);
			});

			$('.load').html(load2);
			$('.anime-container').html(``);
			$('.animek').html('Rekomendasi Animek');
			$('#keyword').val('');
			setTimeout(() => {
				$('.load').html('');
				$('.anime-container').html(``);
				if (anime.length >= 1) {
					$('.anime-container').html(card);
				} else {
					$('.anime-container').html(
						`<div class="col d-flex justify-content-center"><h4 class="text-muted">Tidak ada data.</h4></div>`
					);
				}
			}, 500);

			// ketika btn detail di klik
			$('.anime-container').on('click', '.btn-detail', function () {
				loadingDetail();
				setTimeout(() => {
					$.ajax({
						url: apiUrlBatch + 'anime/' + $(this).data('linkid'),
						success: (a) => {
							const animeDetail = showAnimeDetail(a);
							$('.modal-body').html(animeDetail);
							$('.modal-title').html(a.title);
						},
						error: (a) => { }
					});
				}, 500);
			});
		},
		error: (a) => { }
	});
}
function fetchAnime(type, keyword) {
	$.ajax({
		url: apiUrlBatch + 'cari/' + keyword,
		method: 'get',
		success: (search) => {
			const anime = search;

			let card = '';
			let last_page = search.last_page;

			anime.forEach((a) => {
				card += showAnime(a);
			});

			loadingAnime();
			$('.animek').html(keyword);
			setTimeout(() => {
				$('.anime-container').html(``);
				if (anime.length >= 1) {
					$('.anime-container').html(card);
				} else {
					$('.anime-container').html(
						`<div class="col d-flex justify-content-center"><h4 class="text-muted">Tidak ada data.</h4></div>`
					);
				}
			}, 500);

			// ketika btn detail di klik
			$('.anime-container').on('click', '.btn-detail', function () {
				loadingDetail();
				setTimeout(() => {
					$.ajax({
						url: apiUrlBatch + 'anime/' + $(this).data('linkid'),
						success: (a) => {
							const animeDetail = showAnimeDetail(a);
							$('.modal-body').html(animeDetail);
							$('.modal-title').html(a.title);
						},
						error: (a) => { }
					});
				}, 500);
			});
		},
		error: (a) => { }
	});
}
function loadingAnime() {
	$('.anime-container').html(load);
}
function loadingDetail() {
	$('.modal-body').html(`
	<div class="loading2">
	
	<div class="text-center"><strong>Loading mek</strong></div>
		<div class=" d-flex justify-content-center">
			<div class="spinner-grow text-primary" role="status">
			</div>
			<div class="spinner-grow text-secondary" role="status">
				
			</div>
			<div class="spinner-grow text-success" role="status">
				
			</div>
			<div class="spinner-grow text-danger" role="status">
				
			</div>
			<div class="spinner-grow text-warning" role="status">
				
			</div>
			<div class="spinner-grow text-info" role="status">
				
			</div>
			<div class="spinner-grow text-dark" role="status">
				
			</div>
		</div>
	</div>
	`);
}

function showAnime_(a) {
	return `<div class="col-lg-3 col-md-3 col-6 my-3"  data-toggle="tooltip" data-placement="top" title="${a.title}">
						<div class="card border-0 shadow-sm">
								<img src="${a.image}" class="card-img-top lazy" alt="">
              <div class="card-body">
                <h6 class="card-title title">${a.title}</h6>
                <small class=" text-muted">Status : ${a.status}</small>
                <br>
                <small class=" text-muted">Score : ${a.score}</small>
                <br>
                <a href="#" class="mt-2 btn btn-block btn-primary btn-detail" data-linkid="${a.linkId}" data-toggle="modal" data-target="#AnimeDetailModal">Detail</a>
              </div>
            </div>
          </div>`;
}
function showAnime(a) {
	return `<div class="col-lg-3 col-md-3 col-6 my-3"  data-toggle="tooltip" data-placement="top" title="${a.title}">
						<div class="card border-0 shadow-sm">
								<img src="${a.link.thumbnail}" class="card-img-top lazy" alt="">
              <div class="card-body">
                <h6 class="card-title title">${a.title}</h6>
                <a href="#" class="mt-2 btn btn-block btn-primary btn-detail" data-linkid="${a.link.endpoint}" data-toggle="modal" data-target="#AnimeDetailModal">Detail</a>
              </div>
            </div>
          </div>`;
}

function showAnimeDetail(a) {
	let episodeString = '<tr>';
	let link = a.list_download.link_download
	let list = a.list_download
	var link2 = ''
	var tes2 = '<tr>'
	list.forEach(e => {
		tes2 += '<td><span class="p-2 bg-dark text-white">' + e.resolusi + '</span></td>';
		e.link_download.forEach(l => {
			tes2 += '<td> <a href="' + l.link + '" target="_blank" >' + l.platform + '</a></td>';
		})
		tes2 += '<tr>'
	});
	// for (let i = 0; i < list.length; i++) {
	//   var list2 = list[i];
	//   for (let ins = 0; ins < list[i].link_download.length; ins++) {
	//     // link2 += '<a class="px-2" href="'+list.link_download.link + '">'+list.link_download.platform + '</a>'
	//     link2 += list.link_download[ins].platform;
	//   }
	//   tes2 += '<td> <span class="text-white p-2 bg-dark">'+list[i].resolusi + '</span></td>';
	//   tes2 += '<td>'+link2 +'</td>';
	//   tes2 += '<tr>';


	// }
	return `<div class="container-fluid">
            <div class="row">
              <div class="col-lg-3 d-flex justify-content-center">
								<div class="my-2">
								<img src="${a.thumbnail}" alt="" class="img-fluid lazy">
								</div>
              </div>
							<div class="col-lg-9">
							<ul class="list-unstyled">
                  <li><h5>Alternative Titles</h5></li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Title :</strong> ${a.title}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Japanese :</strong> ${a.japanese} </li>
                  <hr>
                  <li><h5>Information<h5></li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Type :</strong> ${a.type}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Status :</strong> ${a.status}</li>
                  
                </ul>
                <table class="table">
                <thead>
                      <tr>
                        <th width="30%" align="left">Episode</th>
                        <th width="70%" align="left">Link</th>
                      </tr>
                    </thead>
                </table>
                
                  <table class="table">
                    
                    <tbody>
                    ${tes2}
                    </tbody>
                  </table>
              </div>
            </div>
          </div>`;
}
function showAnimeDetail_(a) {
	let episodeString = '<tr>';
	for (let i = 0; i < a.list_episode.length; i++) {
		episodeString += '<td width="30%" align="left">' + a.list_episode[i].episode + '</td>';
		episodeString += '<td width="70%" align="left"> <a href="' + a.list_episode[i].link + '">Download</a></td>';
		episodeString += '<tr>';
	}
	// let linkString = '';
	// for (let i = 0; i < a.list_episode.length; i++) {
	// 	linkString += '<td> <a href=">'+a.list_episode[i].link +'">Download</a></td></tr>';
	// }
	// let typ = '';
	// for (let i = 0; i < a.detail.length; i++) {
	// 	detail += a.detail[i]. + ', ';
	// }
	// let producer_string = '';
	// for (let i = 0; i < a.producers.length; i++) {
	// 	producer_string += a.producers[i].name + ', ';
	// }
	// let licensor_string = '';
	// for (let i = 0; i < a.licensors.length; i++) {
	// 	licensor_string += a.licensors[i].name + ', ';
	// }
	// let studio_string = '';
	// for (let i = 0; i < a.studios.length; i++) {
	// 	studio_string += a.studios[i].name + ', ';
	// }

	// const year = a.aired.prop.to.year;
	// const aired = a.aired.string;

	// if (a.episodes == null) {
	// 	a.episodes = '-';
	// }
	let detail = a.detail;
	return `<div class="container-fluid">
            <div class="row">
              <div class="col-lg-3 d-flex justify-content-center">
								<div class="my-2">
								<img src="${a.image}" alt="" class="img-fluid lazy">
								</div>
                
                
              </div>
							<div class="col-lg-9">
							<ul class="list-unstyled">
                  <li><h5>Alternative Titles</h5></li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>English :</strong> ${detail.English}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Japanese :</strong> ${detail.Japanese}</li>
                  
                  <hr>
                  <li><h5>Information<h5></li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Type :</strong> ${detail.Type}</li>
                  <li class="text-muted py-1" style="font-size:13px"><strong>Status :</strong> ${detail.Status}</li>
                </ul>
                <table class="table">
                <thead>
                      <tr>
                        <th width="30%" align="left">Episode</th>
                        <th width="70%" align="left">Link</th>
                      </tr>
                    </thead>
                </table>
                <div style="height: 600px;overflow: scroll;">
                  <table class="table">
                    
                    <tbody>
                      <tr>
                      
                        ${episodeString}
                        
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>`;
}

function showHome(a) {
	return `<div class="col-lg-3 col-md-3 col-6 my-3"  data-toggle="tooltip" data-placement="top" title="${a.title}">
						<div class="card border-0 shadow-sm">
								<img src="${a.link.thumbnail}" class="card-img-top lazy" alt="">
              <div class="card-body">
                <h6 class="card-title title">${a.title}</h6>
                <a href="#" class="mt-2 btn btn-block btn-primary btn-detail" data-linkid="${a.link.endpoint}" data-toggle="modal" data-target="#AnimeDetailModal">Detail</a>
              </div>
            </div>
          </div>`;
}
