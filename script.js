  document.addEventListener('DOMContentLoaded', function () {
  


fetch('https://run.mocky.io/v3/86a2bcc1-e63a-41cc-b116-b57f6a4c86ea')
  .then(response => response.json())
  .then(data => {
    const campaigns = data.campaigns;
    const container = document.getElementById('campaigns-container');
    
    campaigns.forEach(campaign => {
      const card = document.createElement('div');
      card.classList.add('col-lg-1', 'col-md-3', 'col-sm-6' ,'col-12');
      
      card.innerHTML = `
        <div class="card shadow mt-2">
          <a href="${campaign.link}" target="_blank">
            <img src="${campaign.image}" alt="${campaign.title}" class="card-img">
          </a>
        </div>
        <div class="desc mt-2 text-center">${campaign.title}</div>
      `;
      
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching campaigns:', error));

  

  

  function createStarHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="fa fa-star ${i <= rating ? 'checked' : ''}"></span>`;
    }
    return stars;
  }


fetch('https://run.mocky.io/v3/aa2b4460-c961-42d7-9d5d-7c60e7f06232')
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById('suggestedProducts');
        products.slice(0, 6).forEach(product => {
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
                <div class="card shadow">
                    <div class="img-wrap">
                        <span class="badge bg-success">İndirim</span>
                        <a href="${product.link}" target="_blank">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        </a>
                    </div>
                    <div class="border-top info-wrap">
                        <a href="#" class="float-end btn btn-light">
                            <i class="fa-regular fa fa-heart"></i>
                        </a>
                        <div class="rating-wrap mt-1 me-2">
                            ${createStarHTML(product.rating)}
                        </div>
                        <a href="#" class="title text-truncate">${product.title}</a>
                        <div class="price-wrap">
                            <span class="price-discount">${product.price}</span>
                            <del class="price">${product.discount}</del>
                        </div>
                    </div>
                </div>`;
            container.appendChild(card);
        });
    })
    .catch(err => console.error('Product fetch error:', err));



    const carouselInner = document.querySelector("#slider1 .carousel-inner");
    const indicatorsContainer = document.querySelector("#slider1 .carousel-indicators");
    const counter = document.getElementById("carousel-counter");

    fetch('https://run.mocky.io/v3/7ecdc3e5-32b8-4ebe-8f25-baf7de66ad89')
        .then(response => response.json())
        .then(data => {
            carouselInner.innerHTML = ''; 
            indicatorsContainer.innerHTML = ''; 

            data.forEach((item, index) => {
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");
                if (index === 0) carouselItem.classList.add("active");

                const image = document.createElement("img");
                image.src = item.image;
                image.alt = `slider ${index + 1}`;
                image.className = "d-block w-100";

                
                if (item.link) {
                    const link = document.createElement("a");
                    link.href = item.link;
                    link.target = "_blank";
                    link.appendChild(image);
                    carouselItem.appendChild(link);
                } else {
                    carouselItem.appendChild(image);
                }

                carouselInner.appendChild(carouselItem);

                  
                const indicator = document.createElement("button");
                indicator.type = "button";
                indicator.setAttribute("data-bs-target", "#slider-1");
                indicator.setAttribute("data-bs-slide-to", index);
                if (index === 0) indicator.classList.add("active");
                indicatorsContainer.appendChild(indicator);
            });

            counter.textContent = `1 / ${data.length}`;

        const carouselElement = document.getElementById('slider-1');
        const bsCarousel = new bootstrap.Carousel(carouselElement); 

        carouselElement.addEventListener('slid.bs.carousel', () => {
            const activeIndex = Array.from(carouselInner.children).findIndex(item =>
                item.classList.contains('active')
            );
            
            counter.textContent = `${1+activeIndex } / ${data.length}`;
        });
        })
        .catch(error => {
            console.error("Failed to load slider data:", error);
        });

        const apiUrl = 'https://run.mocky.io/v3/d71e933b-e84e-4eef-aca9-916e15bd2a1f'; 
        let products = [];
        let currentIndex = 0;
        let priceInterval;


        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data;
            displayCard(currentIndex); 
            setAutoRotate(); 
        })
        .catch(error => console.error('Error fetching products:', error));

    function displayCard(index) {
        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = ''; 

        const product = products[index];

        const cardHTML = `
            <div class="card">
                <div class="row h-100">
                    <div class="col-4 d-flex align-items-center justify-center">
                        <img src="${product.image}" class="img-fluid rounded">
                    </div>
                    <div class="col-8 d-flex flex-column justify-content-center">
                        <article>
                            <h4 class="title text-dark">${product.title}</h4>
                            <p class="text-success">${product.stockStatus}</p>
                            <div class="mb-3"><b class="price h5">${product.price}</b></div>
                            <div class="product-description mb-3">${product.description}</div>
                            <div class="buttons">
                                <a href="${product.link}" class="btn btn-warning" target="_blank">
                                    <i class="fa fa-shopping-basket me-1">Sepete Ekle</i>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        `;
        
        cardContainer.innerHTML = cardHTML; 
    }

    
    document.getElementById("nextBtn").addEventListener("click", function() {
        clearInterval(priceInterval);
        currentIndex = (currentIndex + 1) % products.length; 
        displayCard(currentIndex);
        setAutoRotate();
    });

    document.getElementById("prevBtn").addEventListener("click", function() {
        clearInterval(priceInterval);
        currentIndex = (currentIndex - 1 + products.length) % products.length; 
        displayCard(currentIndex);
        setAutoRotate();
    });

    
    function setAutoRotate() {
        priceInterval = setInterval(() => {
            const product = products[currentIndex];
            const priceElement = document.querySelector(".price");
    
            
            const randomPrice = (Math.random() * (5000 - 2000) + 2000).toFixed(2); 
            priceElement.innerHTML = `${randomPrice} TL`; 
        }, 3000); 
    }

});
