const auth = "563492ad6f91700001000001f95785d6f92045c1af0364c7f6ffc9c3";

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.search-submit');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let page = 1;

let searchValue;

// curatedPhotos = async () => {

//     const fetchData = await fetch('https://api.pexels.com/v1/curated/?page=1&per_page=16', { 
//         method: "GET",
//         headers: {
//             Accept: 'application/json',
//             Authorization: auth
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             const allPhotos = data.photos;
//             allPhotos.map((item) => {
//                 const id = item.id;
//                 console.log(id);
//             })
//         })

// }

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=>{
	e.preventDefault();
	searchPhoto(searchValue);
})

more.addEventListener('click', uploadMorePhoto);

function updateInput(e){
	searchValue= e.target.value;
}

async function fetchApi(url){
	const dataFetch = await fetch(url,{
		method: 'GET',
		headers: {
			Accept: "application/json",
			Authorization: auth
		}
	});
	const data = await dataFetch.json();
	return data;
}

function generatePicture(data){
		data.photos.forEach(photo => {
		const galleryImg = document.createElement('div');
		galleryImg.classList.add('gallery-img');
		galleryImg.innerHTML = `
		<div class="gallery-info">
			<p class="gallery-info-p">${photo.photographer}</p>
			<a href=${photo.src.original}>Download</a>
		</div>
		<img src=${photo.src.large}></img>`;
		gallery.appendChild(galleryImg);
	});
}



async function curatedPhotos(){
    const data = await fetchApi("https://api.pexels.com/v1/curated");
	generatePicture(data);
}

async function searchPhoto(query){
	const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query} + query`);
	clearGallery();
	generatePicture(data);
}

function clearGallery(){
	gallery.innerHTML = "";
	searchInput.value = '';
}

curatedPhotos();

