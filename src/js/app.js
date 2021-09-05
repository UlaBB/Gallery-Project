const auth = "563492ad6f91700001000001f95785d6f92045c1af0364c7f6ffc9c3";

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.search-submit');

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

async function curatedPhotos(){
    const dataFetch = await fetch(
        "https://api.pexels.com/v1/curated",
        {
        	method: 'GET',
        	headers: {
            Accept: "application/json",
            Authorization: auth
        }
    	}
    );
		const data = await dataFetch.json();
		console.log(data);
		data.photos.forEach(photo => {
			console.log('photo:',photo);
			const galleryImg = document.createElement('div');
			galleryImg.classList.add('gallery-img');
			galleryImg.innerHTML = `<img src=${photo.src.large}></img>
			<p>${photo.photographer}</p>`;
			gallery.appendChild(galleryImg);
		});
}

curatedPhotos();

