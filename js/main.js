document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    iconMenu.classList.remove("hidden");
    iconClose.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      iconMenu.classList.add("hidden");
      iconClose.classList.remove("hidden");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Cerrar menú");
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll("[data-faq-item]");
  faqItems.forEach((item) => {
    const button = item.querySelector("button");
    const panel = item.querySelector("[data-faq-panel]");
    const icon = item.querySelector("[data-faq-icon]");

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      faqItems.forEach((other) => {
        if (other !== item) {
          other.querySelector("button").setAttribute("aria-expanded", "false");
          other.querySelector("[data-faq-panel]").classList.remove("grid-rows-[1fr]");
          other.querySelector("[data-faq-panel]").classList.add("grid-rows-[0fr]");
          other.querySelector("[data-faq-icon]").style.transform = "rotate(0deg)";
        }
      });

      if (isOpen) {
        button.setAttribute("aria-expanded", "false");
        panel.classList.remove("grid-rows-[1fr]");
        panel.classList.add("grid-rows-[0fr]");
        icon.style.transform = "rotate(0deg)";
      } else {
        button.setAttribute("aria-expanded", "true");
        panel.classList.remove("grid-rows-[0fr]");
        panel.classList.add("grid-rows-[1fr]");
        icon.style.transform = "rotate(180deg)";
      }
    });
  });

  /* ---------- Lead form ---------- */
  const form = document.getElementById("lead-form");
  const formFields = document.getElementById("form-fields");
  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");
  const submitLabel = document.getElementById("submit-label");
  const submitSpinner = document.getElementById("submit-spinner");
  const submitButton = form.querySelector('button[type="submit"]');

  formSuccess.setAttribute("aria-live", "polite");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      formError.textContent = "Revisa los campos: todos son obligatorios.";
      formError.classList.remove("hidden");
      form.reportValidity();
      return;
    }

    formError.classList.add("hidden");
    submitButton.disabled = true;
    submitLabel.classList.add("hidden");
    submitSpinner.classList.remove("hidden");

    window.setTimeout(() => {
      formFields.classList.add("hidden");
      formSuccess.classList.remove("hidden");
      formSuccess.classList.add("flex");
      if (window.gsap && !prefersReducedMotion) {
        gsap.fromTo(formSuccess, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      }
    }, 900);
  });

  /* ---------- Motion ---------- */
  if (!window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add(
    {
      motionOK: "(prefers-reduced-motion: no-preference)",
      motionReduced: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { motionOK } = context.conditions;

      if (!motionOK) {
        gsap.set("[data-reveal], [data-stagger], [data-mock-block], [data-mock-badge]", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      /* Hero entrance (on load, not scroll) */
      const heroReveals = document.querySelectorAll("#contenido > section:first-of-type [data-reveal]");
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl.from(heroReveals, { opacity: 0, y: 24, duration: 0.7, stagger: 0.12 });

      /* Hero mockup build-up */
      const mockBlocks = document.querySelectorAll("[data-mock-block]");
      heroTl.from(
        mockBlocks,
        { opacity: 0, scaleX: 0.6, transformOrigin: "left center", duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.5"
      );

      const mockBadge = document.querySelector("[data-mock-badge]");
      if (mockBadge) {
        heroTl.from(mockBadge, { opacity: 0, scale: 0.8, y: 12, duration: 0.5, ease: "back.out(1.6)" }, "-=0.15");
        heroTl.to(mockBadge, {
          y: -8,
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      const heroVisual = document.querySelector("[data-hero-visual]");
      if (heroVisual) {
        gsap.to(heroVisual, {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1,
        });
      }

      /* Scroll-triggered reveals for sections below the fold */
      const scrollReveals = document.querySelectorAll(
        "#contenido > section:not(:first-of-type) [data-reveal]"
      );
      scrollReveals.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* Staggered card grids */
      ScrollTrigger.batch("[data-stagger]", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 24,
            scale: 0.97,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.4)",
          }),
        once: true,
      });
    }
  );
});
