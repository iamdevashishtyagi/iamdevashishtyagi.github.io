$(document).ready(function() {
    // Navigation Section Switching
    $("#main-nav a").click(function(e) {
        e.preventDefault();
        $("section").removeClass("show");
        var target = $(this).attr("href");
        $(target).addClass("show");
        
        // Update URL hash without scrolling
        history.pushState(null, null, target);
        
        // Scroll to top of content when switching sections
        $(target).scrollTop(0);
    });
    
    // Check for hash in URL on load
    if(window.location.hash) {
        $("section").removeClass("show");
        $(window.location.hash).addClass("show");
    } else {
        $("#home").addClass("show");
    }

    // Typed.js Animation
    var typed = new Typed(".type-animation", { 
        strings: ["Full Stack Developer", "Vue.js Developer", "React Developer", "Node.js Expert", "MERN Stack Developer"], 
        typeSpeed: 80, 
        backSpeed: 50, 
        loop: true,
        backDelay: 1500
    });
    
    // ========== PROFILE PHOTO GALLERY ==========
    let currentSlide = 0;
    const slides = $('.gallery-img');
    const dots = $('.dot');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Loop index
        if(index >= totalSlides) currentSlide = 0;
        if(index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;
        
        // Update images
        slides.removeClass('active');
        $(slides[currentSlide]).addClass('active');
        
        // Update dots
        dots.removeClass('active');
        $(dots[currentSlide]).addClass('active');
    }
    
    // Next slide
    $('.gallery-next').click(function() {
        showSlide(currentSlide + 1);
    });
    
    // Previous slide
    $('.gallery-prev').click(function() {
        showSlide(currentSlide - 1);
    });
    
    // Dot navigation
    dots.each(function(index) {
        $(this).click(function() {
            showSlide(index);
        });
    });
    
    // Auto-rotate slides every 5 seconds
    let slideInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto-rotate on hover
    $('.profile-gallery').hover(
        function() { clearInterval(slideInterval); },
        function() { 
            slideInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 5000);
        }
    );
    
    // ========== DYNAMIC CV LINK (Update with your actual CV URL) ==========
    // Replace this URL with your latest CV Google Drive link
    const cvUrl = "https://drive.google.com/file/d/1h-GnxUa8bEgEKS_x5eY4Q1A4ke2IvEW2/view";
    $("#cv-download-link").attr("href", cvUrl);
    
    // ========== SMOOTH SCROLLING FOR INTERNAL LINKS ==========
    $('a[href^="#"]').not('#main-nav a').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if(target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });
    
    // ========== FORM SUBMISSION ENHANCEMENT ==========
    $('form').on('submit', function() {
        const btn = $(this).find('button[type="submit"]');
        btn.html('Sending... <i class="fas fa-spinner fa-spin"></i>');
        btn.prop('disabled', true);
        
        // Reset button after 3 seconds (actual submission handled by Web3Forms)
        setTimeout(function() {
            btn.html('Send Message <i class="fa-solid fa-paper-plane"></i>');
            btn.prop('disabled', false);
        }, 3000);
    });
    
    // ========== SKILLS ANIMATION ON SCROLL ==========
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate skill bars when skills section becomes visible
    function animateSkillBars() {
        const skillsSection = document.getElementById('skills');
        if(skillsSection && isInViewport(skillsSection)) {
            $('.bar span').each(function() {
                const width = $(this).css('width');
                if(width === '0px') {
                    const targetWidth = $(this).attr('class').split('-')[1];
                    $(this).css('width', targetWidth + '%');
                }
            });
        }
    }
    
    // Check on scroll
    $(window).on('scroll', animateSkillBars);
    // Initial check
    setTimeout(animateSkillBars, 500);
    
    // ========== PROJECT LIVE LINKS FIX ==========
    // Update notebook link when available
    $('.live-link-notebook').on('click', function(e) {
        e.preventDefault();
        alert('Live link coming soon! The project is currently in development.');
    });
    
    // ========== ADD YEAR TO FOOTER (if you add a footer) ==========
    const currentYear = new Date().getFullYear();
    // Optional: Add copyright dynamically if needed
    
    // ========== PRELOADER / LOADING STATE ==========
    $('body').css('opacity', '0');
    $(window).on('load', function() {
        $('body').animate({opacity: 1}, 500);
    });
    
    // ========== KEYBOARD NAVIGATION ==========
    $(document).on('keydown', function(e) {
        // Left arrow for previous slide in gallery
        if(e.keyCode === 37 && $('.profile-gallery:hover').length) {
            showSlide(currentSlide - 1);
        }
        // Right arrow for next slide
        if(e.keyCode === 39 && $('.profile-gallery:hover').length) {
            showSlide(currentSlide + 1);
        }
    });
    
    console.log("Portfolio enhanced successfully! 🚀");
});
