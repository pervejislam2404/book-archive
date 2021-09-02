const searchButton = document.getElementById('button-search');
const inputName = document.getElementById('search-meal');
const container = document.getElementById('display-container');
const msg = document.getElementById('alert-msg');
const quantity = document.getElementById('quantity');
const totalData = document.getElementById('total-found')
const showData = document.getElementById('total-show')

let counter = 0;
document.getElementById('total-show').innerText = counter;
searchButton.addEventListener('click', () => {
    const inpValue = inputName.value;

    const url = `http://openlibrary.org/search.json?q=${inpValue}`;
    console.log();
    fetch(url)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error("something went wrong", err))
    inputName.value = '';
})

const setData = data => {
    container.textContent = '';
    // console.log(data.docs.length)
    if (data.docs.length === 0) {
        msg.classList.remove('d-none')
        quantity.classList.add('d-none')

    } else {
        counter = 0;
        msg.classList.add('d-none')
        const book = data.docs;
        document.getElementById('total-found').innerText = book.length;
        const bookQuantity = book.slice(0, 25)
            // const quantity = [...bookQuantity]
        bookQuantity.forEach(book => {
            console.log(book);
            counter = counter + 1;
            quantity.classList.remove('d-none')
            let img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                // console.log(img)
            const { author_name, first_publish_year, title } = book;
            const author = author_name[0];
            const div = document.createElement('div');
            div.classList.add('col-3')
            div.innerHTML = `
            <div class="card p-0 col">
               <img src="${img}" alt="" height="300"; class="card-img-top">
                <div class="card-body">
                    <h3 class="text-capitalize">${title}</h3>
                    <h5 class="card-title text-start">Author:${!author? unknown : author}</h5>
                    <p class="text-start">published in ${first_publish_year}</p>
                </div>
            </div>
            `
            container.appendChild(div);
            showData.innerText = counter;
        })

    }

}