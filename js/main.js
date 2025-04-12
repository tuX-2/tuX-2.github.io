$(document).ready(function () {
  "use strict";

  // Animación de elementos al hacer scroll
  function animateOnScroll() {
    $(".fadeInUp").each(function () {
      var elementPosition = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (elementPosition < topOfWindow + windowHeight - 50) {
        $(this).addClass("animated");
      }
    });
  }

  // Activar animaciones iniciales
  animateOnScroll();

  // Animaciones al hacer scroll
  $(window).on("scroll", function () {
    animateOnScroll();

    // Mostrar/ocultar botón de volver arriba
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").addClass("show");
    } else {
      $(".back-to-top").removeClass("show");
    }
  });

  // Navegación suave al hacer clic en los enlaces del menú
  $(".navbar-nav a, .back-to-top, .btn").on("click", function (e) {
    if (this.hash !== "") {
      const hash = this.hash;
      const $target = $(hash);

      // Validar si el elemento existe en el DOM
      if ($target.length) {
        e.preventDefault();

        $("html, body").animate(
          {
            scrollTop: $target.offset().top - 56,
          },
          800
        );

        // Cerrar el menú móvil después de hacer clic
        $(".navbar-collapse").collapse("hide");
      }
    }
  });

  // Cambiar clase activa en la navegación durante el desplazamiento
  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();

    $("section").each(function () {
      const sectionTop = $(this).offset().top - 80;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const sectionId = $(this).attr("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $(".navbar-nav a").removeClass("active");
        $(`.navbar-nav a[href="#${sectionId}"]`).addClass("active");
      }
    });
  });

  // Filtro de proyectos
  $(".filter-btn").on("click", function () {
    const filterValue = $(this).attr("data-filter");

    // Cambiar botón activo
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    if (filterValue === "all") {
      $(".project-item").show(300);
    } else {
      $(".project-item").hide(300);
      $(`.project-item[data-category="${filterValue}"]`).show(300);
    }
  });

  // Efecto de hover en tarjetas de proyecto
  $(".project-card").hover(
    function () {
      $(this).find(".card-img-top").css("opacity", "0.8");
    },
    function () {
      $(this).find(".card-img-top").css("opacity", "1");
    }
  );

  // Validación del formulario de contacto
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const subject = $("#subject").val();
    const message = $("#message").val();

    if (name === "" || email === "" || subject === "" || message === "") {
      alert("Por favor, completa todos los campos del formulario.");
      return false;
    }

    // Número de WhatsApp al que deseas enviar el mensaje (coloca el tuyo con código de país, sin espacios)
    const phoneNumber = "529542052144"; // ejemplo: México +52 y número

    // Crear el mensaje
    const whatsappMessage = `Hola, soy ${name}.\nMi correo es: ${email}.\nAsunto: ${subject}.\nMensaje: ${message}`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Crear el enlace
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, "_blank");

    // Opcional: limpiar el formulario
    this.reset();
  });

  // Añadir clases a elementos para animaciones
  function setupAnimations() {
    // Añadir clase para animación en secciones
    $("section").each(function (index) {
      $(this).find(".section-title, .divider, .lead").addClass("fadeInUp");
      $(this)
        .find(".col-md-6, .project-item, .skill-item")
        .addClass("fadeInUp");

      // Retraso escalonado para elementos
      $(this)
        .find(".fadeInUp")
        .each(function (i) {
          $(this).css("animation-delay", `${i * 0.1}s`);
        });
    });
  }

  setupAnimations();

  // Contador para estadísticas (ejemplo)
  function startCounter() {
    $(".counter").each(function () {
      const $this = $(this);
      const countTo = $this.attr("data-count");

      $({ countNum: $this.text() }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
  }

  // Iniciar contador cuando se hace scroll hasta la sección apropiada
  const counterSection = $("#habilidades");
  let counterStarted = false;

  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();
    const sectionTop = counterSection.offset().top - 200;

    if (scrollPosition >= sectionTop && !counterStarted) {
      startCounter();
      counterStarted = true;
    }
  });

  // Efecto de escritura para el texto del héroe
  function typeEffect() {
    const text = $(".typing-text");
    const textContent = text.data("text");
    let i = 0;

    if (text.length && textContent) {
      const typeInterval = setInterval(function () {
        if (i < textContent.length) {
          text.text(text.text() + textContent.charAt(i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
    }
  }

  // Modo oscuro/claro (toggle)
  $(".theme-switch").on("click", function () {
    $("body").toggleClass("dark-mode");

    // Guardar preferencia en localStorage
    const isDarkMode = $("body").hasClass("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
  });

  // Verificar preferencia de tema guardada
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  if (savedDarkMode) {
    $("body").addClass("dark-mode");
  }

  // Animación del preloader
  $(window).on("load", function () {
    $(".preloader").fadeOut(1000);
  });

  // Modal de proyecto (para mostrar detalles del proyecto)
  $(".project-details-btn").on("click", function () {
    const projectId = $(this).data("project");

    // Aquí puedes cargar los detalles del proyecto específico según el ID
    $("#projectModal .modal-title").text(`Detalles del Proyecto ${projectId}`);
    $("#projectModal").modal("show");
  });

  // Inicializar tooltips de Bootstrap
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Añadir funcionalidad al botón de descarga de CV
  $(".download-cv").on("click", function (e) {
    e.preventDefault();

    // Puedes reemplazar esta alerta con un enlace real a tu CV
    alert(
      "Descargando CV... Puedes reemplazar esto con un enlace real a tu archivo de CV."
    );
  });

  // Animación de progreso de habilidades
  function animateSkills() {
    $(".progress-bar").each(function () {
      const width = $(this).attr("aria-valuenow") + "%";
      $(this).css("width", "0");
      $(this).animate({ width: width }, 1000);
    });
  }

  // Animar barras de progreso al hacer scroll a la sección
  let skillsAnimated = false;
  $(window).on("scroll", function () {
    const skillsSection = $("#habilidades");

    if (skillsSection.length) {
      const sectionTop = skillsSection.offset().top;
      const windowScroll = $(window).scrollTop() + $(window).height() * 0.8;

      if (windowScroll > sectionTop && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
      }
    }
  });
});
