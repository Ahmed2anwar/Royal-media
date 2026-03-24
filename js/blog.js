/**
 * Blog Details Handler
 * Loads and displays blog-specific information on blog-details page
 */

// Language configuration for blog information
const blogLanguageStrings = {

  en: {
    blogInfo: 'Blog Information',
    backToBlog: 'home',
    blogNotFound: 'Blog post not found. Please select a blog post from the main page.',
    unableToLoad: 'Unable to load blog information.',
    readMore: 'Read More'
  },
  ar: {
    blogInfo: 'معلومات المدونة',
    backToBlog: 'الرئيسية',
    blogNotFound: 'لم يتم العثور على منشور المدونة. يرجى اختيار منشور من الصفحة الرئيسية.',
    unableToLoad: 'تعذر تحميل معلومات المدونة.',
    readMore: 'اقرأ المزيد'
  }

};

// Detect current language
function getCurrentLanguage() {
  const htmlLang = document.documentElement.lang;
  return htmlLang === 'ar' ? 'ar' : 'en';
}

// Get translated string
function getBlogTranslation(key) {
  const lang = getCurrentLanguage();
  return blogLanguageStrings[lang][key] || blogLanguageStrings.en[key];
}

document.addEventListener('DOMContentLoaded', function() {
  // Get blog ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('blog');

  if (blogId) {
    loadBlogDetails(blogId);
  } else {
    // Fallback - show first blog or message
    console.warn('No blog ID provided');
    showBlogErrorMessage(getBlogTranslation('blogNotFound'));
  }
});

/**
 * Load and display blog details based on blog ID
 */
function loadBlogDetails(blogId) {
  // Get blog data (assumes portfolio-data.js is loaded)
  if (typeof getBlogData === 'undefined') {
    console.error('Blog data not loaded');
    showBlogErrorMessage(getBlogTranslation('unableToLoad'));
    return;
  }

  const blog = getBlogData(blogId);

  if (!blog) {
    showBlogErrorMessage(getBlogTranslation('blogNotFound'));
    return;
  }

  // Update page title and breadcrumb
  updateBlogPageTitle(blog);

  // Update blog details section
  updateBlogDisplay(blog);

  // Reinitialize animations if available
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

/**
 * Update page title and breadcrumb
 */
function updateBlogPageTitle(blog) {
  const isArabic = getCurrentLanguage() === 'ar';
  const blogTitle = isArabic ? blog.titleAr || blog.title : blog.title;

  // Update page heading (if exists)
  const pageTitle = document.querySelector('.page-title h1');
  if (pageTitle) {
    pageTitle.textContent = blogTitle;
  }

  // Update breadcrumb home
  let homeLink = document.querySelector('.breadcrumbs a ') || document.querySelector('.breadcrumb a') || document.querySelector('.breadcrumb-custom a');
  if (homeLink) {
    homeLink.textContent = getBlogTranslation('backToBlog');
    homeLink.href = isArabic ? 'index-ar.html' : 'index.html';
  }

  // Update breadcrumb current
  let breadcrumbCurrent = document.querySelector('.page-title .breadcrumbs .current') || document.querySelector('.breadcrumb-item.active') || document.querySelector('.breadcrumb-custom .breadcrumb-item.active');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = blogTitle;
  }

  // Update HTML title
  document.title = `${blogTitle} - Royal Media`;
}

/**
 * Update the blog details display with blog information
 */

function updateBlogDisplay(blog) {
 
  // Detect current language
 
  const isArabic = getCurrentLanguage() === 'ar';

  // Get blog content
  const title = isArabic ? blog.titleAr || blog.title : blog.title;
  const content = isArabic ? blog.fullContentAr || blog.fullContent : blog.fullContent;
  const date = blog.date;
  const image = blog.image;

  // Update title in hero section
  const heroTitle = document.querySelector('.blog-hero h1');
  if (heroTitle) {
    heroTitle.textContent = title;
  }

  // Update breadcrumb active
  const breadcrumbActive = document.querySelector('.breadcrumb-custom .breadcrumb-item.active') || document.querySelector('.breadcrumb .breadcrumb-item.active');
  if (breadcrumbActive) {
    breadcrumbActive.textContent = title;
  }

  // Update featured image
  const featuredImg = document.querySelector('.blog-featured-image img');
  if (featuredImg) {
    featuredImg.src = image;
    featuredImg.alt = title;
  }

  // Update blog date in meta
  const blogDate = document.querySelector('.blog-date');
  if (blogDate) {
    blogDate.textContent = date;
  }

  // Update blog content
  const contentWrapper = document.querySelector('.blog-content-wrapper');
  if (contentWrapper) {
    const contentHTML = isArabic ? blog.fullContentAr : blog.fullContent;
    // Replace the content, but keep the footer
    const footer = contentWrapper.querySelector('.blog-footer');
    if (footer) {
      // Clear existing content except footer
      while (contentWrapper.firstChild && contentWrapper.firstChild !== footer) {
        contentWrapper.removeChild(contentWrapper.firstChild);
      }
      // Insert new content before footer
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = contentHTML;
      while (tempDiv.firstChild) {
        contentWrapper.insertBefore(tempDiv.firstChild, footer);
      }
    } else {
      // If no footer, replace all content
      contentWrapper.innerHTML = contentHTML;
    }
  }

  // Update recent posts if they exist
  updateRecentPosts(isArabic);
}

/**
 * Update recent posts in the sidebar
 */
function updateRecentPosts(isArabic) {
  const recentPosts = document.querySelectorAll('.recent-posts-widget .post-item');

  // Get all blogs
  if (typeof getAllBlogs === 'undefined') {
    return;
  }

  const allBlogs = getAllBlogs();
  const blogIds = Object.keys(allBlogs).filter(id => id !== '2019'); // Exclude current if it's 2019

  recentPosts.forEach((item, index) => {
    if (blogIds[index]) {
      const blog = allBlogs[blogIds[index]];
      const title = isArabic ? blog.titleAr || blog.title : blog.title;

      const link = item.querySelector('a');
      if (link) {
        link.textContent = title;
        link.href = isArabic ? `blog-details-ar.html?blog=${blog.id}` : `blog-details.html?blog=${blog.id}`;
      }

      const timeEl = item.querySelector('time');
      if (timeEl) {
        timeEl.textContent = blog.date;
      }
    }
  });
}

/**
 * Show error message
 */
function showBlogErrorMessage(message) {
  const container = document.querySelector('#blog-details .container');
  if (container) {
    container.innerHTML = `
      <div class="row">
        <div class="col-12 text-center">
          <h2>${message}</h2>
          <a href="index.html" class="btn btn-primary">Back to Home</a>
        </div>
      </div>
    `;
  }
}