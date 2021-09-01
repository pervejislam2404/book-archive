const searchButton = document.getElementById('button-search');
const inputName = document.getElementById('search-meal');
const container = document.getElementById('display-container');
const msg = document.getElementById('alert-msg');
const loader = document.getElementById('preloader');


searchButton.addEventListener('click', () => {
    const inpValue = inputName.value;

    const url = `http://openlibrary.org/search.json?q=${inpValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => setData(data))
    inputName.value = '';
})

const setData = data => {
    container.textContent = '';
    // console.log(data.docs.length)
    if (data.docs.length === 0) {
        msg.classList.remove('d-none')
    } else {
        msg.classList.add('d-none')
        const book = data.docs;
        const bookQuantity = book.slice(0, 25)
        const quantity = [...bookQuantity]
        quantity.forEach(book => {
            // console.log(book);
            let img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                // console.log(img)

            const { author_name, first_publish_year, title } = book;
            console.log(author_name, first_publish_year, title);
            const div = document.createElement('div');
            div.classList.add('col-3')
            div.innerHTML = `
            <div class="card p-0 col">
               <img src="${img}" alt="" class="card-img-top">
                <div class="card-body">
                    <h2 class="text-capitalize">${title}</h2>
                    <h4 class="card-title text-start">Author:</h4>
                    <p class="text-start">publish date :${first_publish_year}</p>
                </div>
            </div>
            `
            container.appendChild(div);
        })
    }
}