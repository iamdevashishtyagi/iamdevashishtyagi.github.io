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
    
    // ========== PROFILE PHOTO GALLERY - INFINITE AUTO LOOP (NO ARROWS) ==========
    let currentSlide = 0;
    const slides = $('.gallery-img');
    const dots = $('.dot');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Proper infinite loop - wrap around to 0 when reaching end
        if(index >= totalSlides) {
            currentSlide = 0;
        } else if(index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Update images - fade transition
        slides.removeClass('active');
        $(slides[currentSlide]).addClass('active');
        
        // Update dots
        dots.removeClass('active');
        $(dots[currentSlide]).addClass('active');
    }
    
    // Auto-rotate slides every 4 seconds - INFINITE LOOP
    let slideInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 4000);
    
    // Pause auto-rotate on hover (optional - gives user control)
    $('.profile-gallery').hover(
        function() { 
            clearInterval(slideInterval); 
        },
        function() { 
            slideInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 4000);
        }
    );
    
    // Also allow clicking on dots for manual navigation
    dots.each(function(index) {
        $(this).click(function() {
            showSlide(index);
            // Reset timer after manual click
            clearInterval(slideInterval);
            slideInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 4000);
        });
    });
    
    // ========== HIDE ARROW BUTTONS COMPLETELY ==========
    $('.gallery-prev, .gallery-next').remove();
    
    // ========== DYNAMIC CV LINK ==========
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
        
        // Reset button after 3 seconds
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
                const currentWidth = $(this).width();
                if(currentWidth === 0) {
                    const targetClass = $(this).attr('class');
                    const match = targetClass.match(/p-(\d+)/);
                    if(match) {
                        const targetWidth = match[1];
                        $(this).css('width', targetWidth + '%');
                    }
                }
            });
        }
    }
    
    // Check on scroll
    $(window).on('scroll', animateSkillBars);
    // Initial check
    setTimeout(animateSkillBars, 500);
    
    // ========== PROJECT LIVE LINKS FIX ==========
    $('.live-link-notebook').on('click', function(e) {
        e.preventDefault();
        alert('Live link coming soon! The project is currently being deployed.');
    });
    
    console.log("Portfolio enhanced successfully with infinite auto-rotating gallery! 🚀");
    console.log("Total slides: " + totalSlides);
});

// REMOVED the problematic preloader code that was causing blank page on refresh
