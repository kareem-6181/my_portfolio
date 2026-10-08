/* =========================================================
   KAREEM REDA — PERSONAL PORTFOLIO
   Main JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   01. DOM ELEMENTS
   ========================================================= */

const body = document.body;

const pageLoader = document.querySelector(".page-loader");

const siteHeader = document.querySelector(".site-header");

const mobileMenuToggle =
    document.querySelector(".mobile-menu-toggle");

const mainNavigation =
    document.querySelector(".main-navigation");

const navLinks =
    document.querySelectorAll(".nav-link");

const languageToggle =
    document.querySelector(".language-toggle");

const languageLabel =
    document.querySelector("#languageLabel");

const themeToggle =
    document.querySelector(".theme-toggle");

const themeIcon =
    document.querySelector("#themeIcon");

const projectModal =
    document.querySelector("#projectModal");

const modalOverlay =
    document.querySelector(".modal-overlay");

const modalClose =
    document.querySelector("#modalClose");

const modalProjectNumber =
    document.querySelector("#modalProjectNumber");

const modalProjectCategory =
    document.querySelector("#modalProjectCategory");

const modalProjectTitle =
    document.querySelector("#modalProjectTitle");

const projectCards =
    document.querySelectorAll("[data-project-open]");

const projectDetails =
    document.querySelectorAll(".project-detail");

const backToTop =
    document.querySelector(".back-to-top");

const currentYear =
    document.querySelector("#currentYear");


/* =========================================================
   02. LANGUAGE DATA
   ========================================================= */

const translations = {

    en: {

        htmlLang: "en",
        direction: "ltr",

        languageLabel: "AR",

        themeDark: "Switch to light mode",
        themeLight: "Switch to dark mode",

        modalClose: "Close project details",

        projects: {
            "brain-tumor": {
                number: "01",
                category: "AI / COMPUTER VISION",
                title: "Brain Tumor MRI Segmentation"
            },

            "heart-disease": {
                number: "02",
                category: "MACHINE LEARNING",
                title: "Heart Disease Prediction"
            },

            "ebdaa": {
                number: "03",
                category: "WEB DEVELOPMENT",
                title: "Ebda’a — Advertising & Printing Agency Website"
            },

            "cnc": {
                number: "04",
                category: "EMBEDDED / AUTOMATION",
                title: "CNC Pen Plotter"
            },

            "line-following": {
                number: "05",
                category: "ROBOTICS / EMBEDDED",
                title: "Line Following Robot"
            }
        }
    },


    ar: {

        htmlLang: "ar",
        direction: "rtl",

        languageLabel: "EN",

        themeDark: "التبديل إلى الوضع الفاتح",
        themeLight: "التبديل إلى الوضع الداكن",

        modalClose: "إغلاق تفاصيل المشروع",

        projects: {
            "brain-tumor": {
                number: "٠١",
                category: "الذكاء الاصطناعي / الرؤية الحاسوبية",
                title: "تجزئة أورام المخ من صور الرنين المغناطيسي"
            },

            "heart-disease": {
                number: "٠٢",
                category: "تعلم الآلة",
                title: "التنبؤ بأمراض القلب"
            },

            "ebdaa": {
                number: "٠٣",
                category: "تطوير الويب",
                title: "إبداع — موقع وكالة للدعاية والطباعة"
            },

            "cnc": {
                number: "٠٤",
                category: "الأنظمة المدمجة / الأتمتة",
                title: "رسم آلي باستخدام CNC Pen Plotter"
            },

            "line-following": {
                number: "٠٥",
                category: "الروبوتات / الأنظمة المدمجة",
                title: "روبوت متتبع الخط"
            }
        }
    }
};


/* =========================================================
   03. LANGUAGE HELPERS
   ========================================================= */

function getSavedLanguage() {

    const savedLanguage =
        localStorage.getItem("portfolioLanguage");

    if (
        savedLanguage === "ar" ||
        savedLanguage === "en"
    ) {
        return savedLanguage;
    }

    return "en";
}


function setTextFromData(element, language) {

    if (!element) {
        return;
    }

    const value =
        element.getAttribute(`data-${language}`);

    if (value !== null) {
        element.textContent = value;
    }
}


function updateLanguageElements(language) {

    const elements =
        document.querySelectorAll(
            "[data-en][data-ar]"
        );

    elements.forEach(element => {
        setTextFromData(element, language);
    });
}


function updateLanguageBlocks(language) {

    const englishBlocks =
        document.querySelectorAll(".lang-en");

    const arabicBlocks =
        document.querySelectorAll(".lang-ar");

    englishBlocks.forEach(block => {

        block.hidden = language !== "en";

    });

    arabicBlocks.forEach(block => {

        block.hidden = language !== "ar";

    });
}


function updateLanguage(language) {

    if (
        language !== "en" &&
        language !== "ar"
    ) {
        language = "en";
    }


    const languageData =
        translations[language];


    document.documentElement.lang =
        languageData.htmlLang;

    document.documentElement.dir =
        languageData.direction;


    body.setAttribute(
        "dir",
        languageData.direction
    );


    if (languageLabel) {

        languageLabel.textContent =
            languageData.languageLabel;

    }


    updateLanguageElements(language);

    updateLanguageBlocks(language);


    if (modalClose) {

        modalClose.setAttribute(
            "aria-label",
            languageData.modalClose
        );

    }


    updateThemeButton(language);

    updateOpenModalLanguage();


    localStorage.setItem(
        "portfolioLanguage",
        language
    );
}


function toggleLanguage() {

    const currentLanguage =
        document.documentElement.lang === "ar"
            ? "ar"
            : "en";

    const newLanguage =
        currentLanguage === "en"
            ? "ar"
            : "en";

    updateLanguage(newLanguage);
}


/* =========================================================
   04. THEME
   ========================================================= */

function getSavedTheme() {

    const savedTheme =
        localStorage.getItem("portfolioTheme");

    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {
        return savedTheme;
    }

    return "dark";
}


function applyTheme(theme) {

    const isLight =
        theme === "light";


    body.classList.toggle(
        "light-theme",
        isLight
    );


    if (themeIcon) {

        themeIcon.className =
            isLight
                ? "fa-solid fa-moon"
                : "fa-solid fa-sun";

    }


    updateThemeButton();


    localStorage.setItem(
        "portfolioTheme",
        theme
    );
}


function updateThemeButton(language = null) {

    if (!themeToggle) {
        return;
    }


    const currentLanguage =
        language ||
        document.documentElement.lang ||
        "en";


    const data =
        translations[
            currentLanguage === "ar"
                ? "ar"
                : "en"
        ];


    const isLight =
        body.classList.contains(
            "light-theme"
        );


    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? data.themeLight
            : data.themeDark
    );


    themeToggle.setAttribute(
        "title",
        isLight
            ? data.themeLight
            : data.themeDark
    );
}


function toggleTheme() {

    const currentTheme =
        body.classList.contains(
            "light-theme"
        )
            ? "light"
            : "dark";


    const newTheme =
        currentTheme === "light"
            ? "dark"
            : "light";


    applyTheme(newTheme);
}


/* =========================================================
   05. MOBILE NAVIGATION
   ========================================================= */

function openMobileMenu() {

    if (!mobileMenuToggle || !mainNavigation) {
        return;
    }


    mobileMenuToggle.classList.add("active");

    mainNavigation.classList.add("open");

    mobileMenuToggle.setAttribute(
        "aria-expanded",
        "true"
    );
}


function closeMobileMenu() {

    if (!mobileMenuToggle || !mainNavigation) {
        return;
    }


    mobileMenuToggle.classList.remove(
        "active"
    );

    mainNavigation.classList.remove(
        "open"
    );

    mobileMenuToggle.setAttribute(
        "aria-expanded",
        "false"
    );
}


function toggleMobileMenu() {

    if (!mainNavigation) {
        return;
    }


    const isOpen =
        mainNavigation.classList.contains(
            "open"
        );


    if (isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }
}


/* =========================================================
   06. HEADER SCROLL EFFECT
   ========================================================= */

function handleHeaderScroll() {

    if (!siteHeader) {
        return;
    }


    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }
}


/* =========================================================
   07. ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (!sections.length) {
        return;
    }


    const scrollPosition =
        window.scrollY +
        180;


    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );

    });
}


/* =========================================================
   08. SMOOTH NAVIGATION
   ========================================================= */

function handleNavigationClick(event) {

    const link =
        event.currentTarget;

    const href =
        link.getAttribute("href");


    if (
        !href ||
        !href.startsWith("#")
    ) {
        return;
    }


    const target =
        document.querySelector(href);


    if (!target) {
        return;
    }


    event.preventDefault();


    const headerHeight =
        siteHeader
            ? siteHeader.offsetHeight
            : 0;


    const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;


    window.scrollTo({

        top: targetPosition,

        behavior: "smooth"

    });


    closeMobileMenu();
}


/* =========================================================
   09. PROJECT MODAL
   ========================================================= */

let currentProject = null;


function getProjectData(projectId) {

    const language =
        document.documentElement.lang === "ar"
            ? "ar"
            : "en";


    return translations[
        language
    ].projects[projectId];
}


function hideAllProjectDetails() {

    projectDetails.forEach(detail => {

        detail.classList.remove(
            "active"
        );

        detail.setAttribute(
            "data-active",
            "false"
        );

    });
}


function showProjectDetail(projectId) {

    const detail =
        document.querySelector(
            `[data-detail-project="${projectId}"]`
        );


    if (!detail) {
        return;
    }


    hideAllProjectDetails();


    detail.classList.add("active");

    detail.setAttribute(
        "data-active",
        "true"
    );
}


function updateModalHeader(projectId) {

    const project =
        getProjectData(projectId);


    if (!project) {
        return;
    }


    if (modalProjectNumber) {

        modalProjectNumber.textContent =
            project.number;

    }


    if (modalProjectCategory) {

        modalProjectCategory.textContent =
            project.category;

    }


    if (modalProjectTitle) {

        modalProjectTitle.textContent =
            project.title;

    }

}


function openProjectModal(projectId) {

    if (!projectModal) {
        return;
    }


    const project =
        getProjectData(projectId);


    if (!project) {
        return;
    }


    currentProject =
        projectId;


    updateModalHeader(
        projectId
    );


    showProjectDetail(
        projectId
    );


    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    body.classList.add(
        "modal-open"
    );


    if (modalClose) {

        setTimeout(() => {

            modalClose.focus();

        }, 100);

    }


    const modalBody =
        projectModal.querySelector(
            ".modal-body"
        );


    if (modalBody) {

        modalBody.scrollTop = 0;

    }
}


function closeProjectModal() {

    if (!projectModal) {
        return;
    }


    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "modal-open"
    );


    currentProject = null;
}


function updateOpenModalLanguage() {

    if (
        !projectModal ||
        !currentProject
    ) {
        return;
    }


    updateModalHeader(
        currentProject
    );

    updateLanguageBlocks(
        document.documentElement.lang === "ar"
            ? "ar"
            : "en"
    );
}


/* =========================================================
   10. PROJECT CARD LINKS
   ========================================================= */

function handleProjectOpen(event) {

    const button =
        event.currentTarget;


    const projectId =
        button.getAttribute(
            "data-project-open"
        );


    if (!projectId) {
        return;
    }


    openProjectModal(
        projectId
    );
}


/* =========================================================
   11. MODAL KEYBOARD SUPPORT
   ========================================================= */

function handleModalKeyboard(event) {

    if (
        !projectModal ||
        projectModal.getAttribute(
            "aria-hidden"
        ) === "true"
    ) {
        return;
    }


    if (event.key === "Escape") {

        closeProjectModal();

        return;
    }


    if (event.key !== "Tab") {
        return;
    }


    const focusableElements =
        projectModal.querySelectorAll(
            `
            button,
            a,
            input,
            textarea,
            select,
            [tabindex]:not([tabindex="-1"])
            `
        );


    if (!focusableElements.length) {
        return;
    }


    const first =
        focusableElements[0];

    const last =
        focusableElements[
            focusableElements.length - 1
        ];


    if (
        event.shiftKey &&
        document.activeElement === first
    ) {

        event.preventDefault();

        last.focus();

    } else if (
        !event.shiftKey &&
        document.activeElement === last
    ) {

        event.preventDefault();

        first.focus();

    }
}


/* =========================================================
   12. SCROLL REVEAL
   ========================================================= */

function initializeRevealElements() {

    const revealElements =
        document.querySelectorAll(
            `
            .section-heading,
            .about-main-card,
            .expertise-card,
            .service-card,
            .project-card,
            .journey-item,
            .contact-card
            `
        );


    revealElements.forEach(
        (element, index) => {

            element.classList.add(
                "reveal"
            );


            element.style.transitionDelay =
                `${(index % 5) * 70}ms`;

        }
    );


    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );
}


/* =========================================================
   13. BACK TO TOP
   ========================================================= */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }


    if (window.scrollY > 650) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }
}


function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


/* =========================================================
   14. CURRENT YEAR
   ========================================================= */

function updateCurrentYear() {

    if (!currentYear) {
        return;
    }


    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   15. EXTERNAL PROJECT LINKS
   ========================================================= */

function handleExternalProjectLinks() {

    const links =
        document.querySelectorAll(
            "[data-external-link]"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    });
}


/* =========================================================
   16. INITIAL PAGE STATE
   ========================================================= */

function initializePage() {

    const savedLanguage =
        getSavedLanguage();

    const savedTheme =
        getSavedTheme();


    applyTheme(
        savedTheme
    );


    updateLanguage(
        savedLanguage
    );


    updateCurrentYear();

    handleHeaderScroll();

    updateBackToTop();

    initializeRevealElements();

    handleExternalProjectLinks();


    if (mobileMenuToggle) {

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (projectModal) {

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }
}


/* =========================================================
   17. EVENT LISTENERS
   ========================================================= */


/* Language */

if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        toggleLanguage
    );

}


/* Theme */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* Mobile Menu */

if (mobileMenuToggle) {

    mobileMenuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* Navigation */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        handleNavigationClick
    );

});


/* Project Buttons */

projectCards.forEach(button => {

    button.addEventListener(
        "click",
        handleProjectOpen
    );

});


/* Modal Close */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


/* Modal Overlay */

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProjectModal
    );

}


/* Back To Top */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        scrollToTop
    );

}


/* Keyboard */

document.addEventListener(
    "keydown",
    handleModalKeyboard
);


/* Scroll */

window.addEventListener(
    "scroll",
    () => {

        handleHeaderScroll();

        updateActiveNavigation();

        updateBackToTop();

    },
    {
        passive: true
    }
);


/* Resize */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 992
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   18. PAGE LOADER
   ========================================================= */

function hidePageLoader() {

    if (!pageLoader) {
        return;
    }


    pageLoader.classList.add(
        "hidden"
    );


    setTimeout(() => {

        pageLoader.style.display =
            "none";

    }, 700);
}


window.addEventListener(
    "load",
    () => {

        initializePage();


        setTimeout(
            hidePageLoader,
            450
        );

    }
);


/* =========================================================
   19. FALLBACK INITIALIZATION
   ========================================================= */

if (
    document.readyState ===
    "interactive" ||
    document.readyState === "complete"
) {

    initializePage();

}


/* =========================================================
   20. PROJECT MODAL ACCESSIBILITY
   ========================================================= */

function improveModalAccessibility() {

    if (!projectModal) {
        return;
    }


    projectModal.setAttribute(
        "role",
        "dialog"
    );


    projectModal.setAttribute(
        "aria-modal",
        "true"
    );


    if (modalProjectTitle) {

        modalProjectTitle.id =
            modalProjectTitle.id ||
            "modalProjectTitle";

    }


    projectModal.setAttribute(
        "aria-labelledby",
        "modalProjectTitle"
    );
}


improveModalAccessibility();


/* =========================================================
   21. HANDLE CLICK OUTSIDE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !mainNavigation ||
            !mobileMenuToggle
        ) {
            return;
        }


        const clickedInsideMenu =
            mainNavigation.contains(
                event.target
            );


        const clickedToggle =
            mobileMenuToggle.contains(
                event.target
            );


        if (
            mainNavigation.classList.contains(
                "open"
            ) &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   22. INITIAL ACTIVE NAVIGATION
   ========================================================= */

setTimeout(
    updateActiveNavigation,
    100
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */