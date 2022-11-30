$(document).ready(function () {
  const navIcon = document.querySelector(".nav-icon");
  const nav = document.querySelector(".nav-mobile");
  const bodyE1 = document.body;

  // Прослушиваем событие, клик по Бургеру

  navIcon.addEventListener("click", function () {
    this.classList.toggle("nav-icon--active");
    nav.classList.toggle("nav--active");
    bodyE1.classList.toggle("noscroll");
  });

  const navLinks = document.querySelectorAll(".nav-mobile a");

  navLinks.forEach(function (item) {
    item.addEventListener("click", function () {
      navIcon.classList.remove("nav-icon--active");
      nav.classList.remove("nav--active");
      bodyE1.classList.remove("noscroll");
    });
  });

  window.addEventListener("resize", function () {
    navIcon.classList.remove("nav-icon--active");
    nav.classList.remove("nav--active");
    bodyE1.classList.remove("noscroll");
  });

  //Contacts form

  const formItems = document.querySelectorAll(".form-field");

  for (let item of formItems) {
    const thisParent = item.closest(".form-item");
    const thisPlaceholder = thisParent.querySelector(".fake-placeholder");
    //Если input в фокусе
    item.addEventListener("focus", function () {
      thisPlaceholder.classList.add("active");
    });
    //Если input теряет фокус
    item.addEventListener("blur", function () {
      if (item.value.length > 0) {
        thisPlaceholder.classList.add("active");
      } else {
        thisPlaceholder.classList.remove("active");
      }
    });
  }

  //FORM VALIDATE
  $(".form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },

      message: {
        required: true,
      },
    },
    messages: {
      email: {
        required: "Введите email",
        email: "Некорректно введен email",
      },

      message: {
        required: "Заполните поле",
      },
    },
    submitHandler: function (form) {
      ajaxFormSubmit();
    },
  });

  // AJAX - Запрса на сервер

  function ajaxFormSubmit() {
    let string = $(".form").serialize(); // Соханяем данные введенные в форму в строку.

    //Формируем ajax запрос
    $.ajax({
      type: "POST", // Тип запроса - POST
      url: "php/mail.php", // Куда отправляем запрос
      data: string, // Какие даные отправляем, в данном случае отправляем переменную string

      // Функция если все прошло успешно
      success: function (html) {
        $(".form").slideUp(800);
        $("#answer").html(html);
      },
    });
    // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
    return false;
  }

  // Back top icon

  const backTopBtn = document.querySelector("#backtop");

  backTopBtn.style.opacity = 0;
  document.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      backTopBtn.style.opacity = 1;
    } else {
      backTopBtn.style.opacity = 0;
    }
  });

  // plagin pageNav

  $("#header-menu").onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollSpeed: 350,
    scrollThreshold: 0.2,
    filter: "",
    easing: "swing",
  });

  // mixitUp

  let containerE1 = document.querySelector("#mix-cards");
  let mixer = mixitup(containerE1, {
    classNames: {
      block: "",
    },
  });
});
