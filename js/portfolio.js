/**
 * Portfolio Details Handler
 * Loads and displays product-specific information on portfolio-details page
 */

// Language configuration for product information
const languageStrings = {
  en: {
    productInfo: 'Product Information',
    tableHeaders: ['Item', 'Weight', 'Surface', 'Fabric', 'Width', 'Length'],
    backToPortfolio: 'Back to Portfolio',
    productNotFound: 'Product not found. Please select a product from the portfolio.',
    unableToLoad: 'Unable to load product information.',
    visitWebsite: 'Visit Website',
    home: 'Home'
  },
  ar: {
    productInfo: 'معلومات المنتج',
    tableHeaders: ['المنتج', 'الوزن', 'السطح', 'النسيج', 'العرض', 'الطول'],
    backToPortfolio: 'العودة إلى المحفظة',
    productNotFound: 'المنتج غير موجود. يرجى تحديد منتج من المحفظة.',
    unableToLoad: 'تعذر تحميل معلومات المنتج.',
    visitWebsite: 'زيارة الموقع',
    home: 'الرئيسية'
  }
};

// Detect current language
function getCurrentLanguage() {
  const htmlLang = document.documentElement.lang;
  return htmlLang === 'ar' ? 'ar' : 'en';
}

// Get translated string
function getTranslation(key) {
  const lang = getCurrentLanguage();
  return languageStrings[lang][key] || languageStrings.en[key];
}

document.addEventListener('DOMContentLoaded', function() {
  // Get product ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  if (productId) {
    loadProductDetails(productId);
  } else {
    // Fallback - show first product or message
    console.warn('No product ID provided');
    showErrorMessage(getTranslation('productNotFound'));
  }
});

/**
 * Load and display product details based on product ID
 */
function loadProductDetails(productId) {
  // Get product data (assumes portfolio-data.js is loaded)
  if (typeof getProductData === 'undefined') {
    console.error('Portfolio data not loaded');
    showErrorMessage(getTranslation('unableToLoad'));
    return;
  }

  const product = getProductData(productId);

  if (!product) {
    showErrorMessage(getTranslation('productNotFound'));
    return;
  }

  // Update page title and breadcrumb
  updatePageTitle(product);

  // Update portfolio details section
  updateProductDisplay(product);

  // Reinitialize animations and lightbox if available
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }

  if (typeof GLightbox !== 'undefined') {
    // Reinitialize GLightbox
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }
}

/**
 * Update page title and breadcrumb
 */
function updatePageTitle(product) {
  const isArabic = getCurrentLanguage() === 'ar';
  const productName = isArabic ? product.nameAr || product.name : product.name;

  // Update page heading (if exists)
  const pageTitle = document.querySelector('.page-title h1');
  if (pageTitle) {
    pageTitle.textContent = productName;
  }

  // Update breadcrumb home link
  const homeLink = document.querySelector('.breadcrumbs a');
  if (homeLink) {
    homeLink.textContent = getTranslation('home');
    homeLink.href = isArabic ? 'index-ar.html' : 'index.html';
  }

  // Update breadcrumb current
  const breadcrumbCurrent = document.querySelector('.page-title .breadcrumbs .current');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = productName;
  }

  // Update HTML title
  document.title = `${productName} - Royal Media`;
}

/**
 * Update the portfolio details display with product information
 */

function updateProductDisplay(product) {
  const detailsSection = document.querySelector('#portfolio-details');
  
  if (!detailsSection) {
    console.error('Portfolio details section not found');
    return;
  }

  // Find the main container
  const container = detailsSection.querySelector('.container');
  
  if (!container) {
    console.error('Details container not found');
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Detect current language
  const isArabic = getCurrentLanguage() === 'ar';

  // Create new structure with product data
  const contentRow = document.createElement('div');
  contentRow.className = 'row gy-4 g-lg-5';
  contentRow.setAttribute('data-aos', 'fade-up');

  // Left column - Images
  const leftCol = document.createElement('div');
  leftCol.className = 'col-5 pe-4';
  
  // Main product image
  const mainImg = document.createElement('img');
  mainImg.src = product.image;
  mainImg.className = 'img-fluid mb-4';
  mainImg.alt = isArabic ? product.nameAr || product.name : product.name;

  leftCol.appendChild(mainImg);

  // Right column - Details
  const rightCol = document.createElement('div');
  rightCol.className = ' col-7';

  const stickyDiv = document.createElement('div');
  stickyDiv.className = 'position-sticky';
  stickyDiv.style.top = '40px';

  // Product description section
  const descDiv = document.createElement('div');
  descDiv.className = 'portfolio-description';

  // Product title
  const titleH2 = document.createElement('h2');
  titleH2.textContent = isArabic ? product.nameAr || product.name : product.name;
  descDiv.appendChild(titleH2);

  // Product description
  const descP = document.createElement('p');
  descP.textContent = isArabic ? product.descriptionAr || product.description : product.description;
  descDiv.appendChild(descP);

  // Full description
  const fullDesc = isArabic ? product.fullDescriptionAr : product.fullDescription;
  if (fullDesc) {
    const fullDescP = document.createElement('p');
    fullDescP.textContent = fullDesc;
    descDiv.appendChild(fullDescP);
  }

  stickyDiv.appendChild(descDiv);

  // Product information section
  const infoDiv = document.createElement('div');
  infoDiv.className = 'portfolio-info mt-5';

  const infoTitle = document.createElement('h3');
  infoTitle.textContent = getTranslation('productInfo');
  infoDiv.appendChild(infoTitle);

  // Check if product has items array (materials)
  if (product.items && Array.isArray(product.items)) {
    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped';

    const thead = document.createElement('thead');
   
    const headRow = document.createElement('tr');
    const headers = getTranslation('tableHeaders').slice();

    // Special case for vinyl: change "Weight" label to "Micron/Liner"
    if (product.id === 'vinyl' || product.id === 'Duplex' || product.id === 'Film' || product.id === 'Tarpulin') {
      headers[1] = isArabic ? 'الميكرون/لاينر' : 'Micron/Liner';
    }

    headers.forEach(hdr => {
      const th = document.createElement('th');
      th.textContent = hdr;
   
   
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    product.items.forEach(item => {
      const row = document.createElement('tr');
      row.appendChild(document.createElement('td')).textContent = item.name || '';
      row.appendChild(document.createElement('td')).textContent = item.weight || '';
      row.appendChild(document.createElement('td')).textContent = item.surface || '';
      row.appendChild(document.createElement('td')).textContent = item.fabric || '';
      row.appendChild(document.createElement('td')).textContent = item.width || '';
      row.appendChild(document.createElement('td')).textContent = item.length || '';
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    infoDiv.appendChild(table);
  } else if (product.details) {
    // Table for machines and inks with specifications
    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped';

    const tbody = document.createElement('tbody');
    Object.entries(product.details).forEach(([key, value]) => {
      if (key !== 'Surface' && key !== 'Fabric' && value) {
        const row = document.createElement('tr');
        const th = document.createElement('td');
        th.innerHTML = `<strong>${key}:</strong>`;
        th.style.width = '30%';
        const td = document.createElement('td');

        if (Array.isArray(value)) {
          const list = document.createElement('ul');
          list.style.paddingLeft = '18px';
          list.style.margin = '0';
          value.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
          });
          td.appendChild(list);
        } else {
          td.textContent = value;
        }

        row.appendChild(th);
        row.appendChild(td);
        tbody.appendChild(row);
      }
    });
    table.appendChild(tbody);

    infoDiv.appendChild(table);
  }
  stickyDiv.appendChild(infoDiv);

  rightCol.appendChild(stickyDiv);

  // Add columns to row
  contentRow.appendChild(leftCol);
  contentRow.appendChild(rightCol);

  // Add row to container
  container.appendChild(contentRow);

  // Add another row for imageDescription if available
  if (product.imageDescription) {
    const imageDescRow = document.createElement('div');
    imageDescRow.className = 'row mt-4';
    imageDescRow.setAttribute('data-aos', 'fade-up');

    const imageDescCol = document.createElement('div');
    imageDescCol.className = 'col-12';

    const descImg = document.createElement('img');
    descImg.src = product.imageDescription;
    descImg.className = 'img-fluid';
    descImg.alt = `${product.name} Description`;

    imageDescCol.appendChild(descImg);
    imageDescRow.appendChild(imageDescCol);
    container.appendChild(imageDescRow);
  }
}

/**
 * Show error message when product not found
 */
function showErrorMessage(message) {
  const detailsSection = document.querySelector('#portfolio-details');
  
  if (!detailsSection) return;

  const container = detailsSection.querySelector('.container');
  if (!container) return;

  container.innerHTML = `
    <div class="row">
      <div class="col-12">
        <div class="alert alert-warning" role="alert">
          <h4 class="alert-heading">Product Not Found</h4>
          <p>${message}</p>
          <hr>
          <a href="index.html#portfolio" class="btn btn-primary">Back to Portfolio</a>
        </div>
      </div>
    </div>
  `;
}
