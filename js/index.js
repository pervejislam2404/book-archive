const searchButton = document.getElementById('button-search');
const inputName = document.getElementById('search-meal');
const container = document.getElementById('display-container');
const msg = document.getElementById('alert-msg');
const quantity = document.getElementById('quantity');
const totalData = document.getElementById('total-found')
const showData = document.getElementById('total-show')
    // showing-data-container
let counter = 0;
document.getElementById('total-show').innerText = counter;
searchButton.addEventListener('click', () => {
    const inpValue = inputName.value;
    // data-fetching
    const url = `https://openlibrary.org/search.json?q=${inpValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error(err))
    inputName.value = '';
})

const setData = data => {
    // clearing-past-data-from-main-container    
    container.textContent = '';
    //   checking-the-fetching-data
    if (data.docs.length === 0) {
        // error-msg
        msg.classList.remove('d-none')
        quantity.classList.add('d-none')

    } else {
        counter = 0;
        msg.classList.add('d-none')
        const book = data.docs;
        document.getElementById('total-found').innerText = book.length;
        const bookQuantity = book.slice(0, 25)
            //    set-data-to-main-container
        bookQuantity.forEach(book => {
            //    showed-book-quantity
            counter = counter + 1;
            quantity.classList.remove('d-none')
            let img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                //    object-destructuring
            const { author_name, first_publish_year, publisher, title } = book;
            const author = author_name[0];
            const publisherName = publisher.slice(0, 5);
            // making-card-for-each-book
            const div = document.createElement('div');
            div.classList.add('col-3')
            div.innerHTML = `
            <div class="card p-0 col">
               <img src="${img}" alt="" height="300"; class="card-img-top">
                <div class="card-body">
                    <h3 class="text-capitalize">${title}</h3>
                    <h5 class="card-title text-start">Author: ${!author? unknown : author}</h5>
                    <p class="text-start"><span class="fw-bold">Publisher : </span>${publisherName}</p>
                    <p class="text-start">Published in ${first_publish_year}</p>
                </div>
            </div>
            `
            container.appendChild(div);
            showData.innerText = counter;
        })

    }

}