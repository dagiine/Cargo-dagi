import { saveSession, authAPI } from "../js/api.js";

const NAV_ICONS = {
  "#/"              : "home",
  "#/track"         : "search",
  "#/create-order" : "add",
  "#/support"      : "help",
  "#/about-us"     : "groups"
};

/* =========================================
   Navigation menu үүсгэх
========================================= */
function buildNav(routes, currentHash) {
  let html = "";

  routes.forEach(function(route) {

    // Одоогийн page мөн эсэх
    const isActive = route.lnk === currentHash;

    // Route icon авах
    const icon = NAV_ICONS[route.lnk] || "circle";

    // Create order button мөн эсэх
    const isCreate = route.lnk === "#/create-order";

    html += `
      <li class="${isCreate ? "nav-create" : ""}">
        <a href="${route.lnk}" class="${isActive ? "active" : ""}">

          <!-- Navigation icon -->
          <span class="nav-icon material-symbols-outlined">
            ${icon}
          </span>

          <!-- Navigation text -->
          <span class="nav-label">
            ${route.item}
          </span>

        </a>
      </li>
    `;
  });

  return html;
}

/* =========================================
   Header render хийх
========================================= */
export function renderHeader(routes, currentHash) {

  return `
  
    <!--
      hidden checkbox ашиглаж
      popup open / close удирдаж байна
    -->
    <input type="checkbox" id="call-toggle" hidden />
    <input type="checkbox" id="signin-toggle" hidden />



    <!-- =====================================
         HEADER
    ====================================== -->
    <header>

      <!-- Logo -->
      <a href="#/" class="logo">

        <span class="logo-icon">
          <img src="./pics/logo.png" alt="Cash 4 Cargo Logo" />
        </span>

        Cash 4 Cargo
      </a>



      <!-- Navigation -->
      <nav>
        <ul>
          ${buildNav(routes, currentHash)}
        </ul>
      </nav>



      <!-- Header buttons -->
      <section class="header-actions">

        <!-- Contact button -->
        <label for="call-toggle" class="header-call-btn">

          <span class="material-symbols-outlined">
            call
          </span>

          <span class="call-btn-text">
            Холбоо барих
          </span>

        </label>



        <!-- Sign in button -->
        <label for="signin-toggle" class="signin-open-btn">

          <span class="material-symbols-outlined signin-icon">
            person
          </span>

          <span class="signin-text">
            Нэвтрэх
          </span>

        </label>

      </section>

    </header>



    <!-- =====================================
         CONTACT BACKDROP
         Outside дарахад popup хаагдана
    ====================================== -->
    <label for="call-toggle" class="call-backdrop"></label>



    <!-- =====================================
         CONTACT PANEL
    ====================================== -->
    <aside class="call-panel">

      <!-- Close button -->
      <label for="call-toggle" class="call-close">

        <span class="material-symbols-outlined">
          close
        </span>

      </label>

      <h2>Холбоо барих</h2>



      <!-- УБ салбар -->
      <article class="call-card">

        <div class="call-info">
          <strong>УБ салбар</strong>
          <span>+976 9944 7176</span>
        </div>

        <a href="tel:+97699447176" class="call-link">

          <span class="material-symbols-outlined">
            call
          </span>

        </a>

      </article>



      <!-- Эрээн агуулах -->
      <article class="call-card">

        <div class="call-info">
          <strong>Эрээн агуулах</strong>
          <span>+86 175 4755 8506</span>
        </div>

        <a href="weixin://dl/chat" class="call-link">
          <span class="material-symbols-outlined">sms</span>
        </a>

      </article>



      <!-- Жолооч -->
      <article class="call-card">

        <div class="call-info">
          <strong>Жолооч</strong>
          <span>+976 9911 2233</span>
        </div>

        <a href="tel:+97699112233" class="call-link">

          <span class="material-symbols-outlined">
            call
          </span>

        </a>

      </article>

    </aside>



    <!-- =====================================
         SIGN IN BACKDROP
    ====================================== -->
    <div class="signin-panel">

  <!-- Close button -->
  <label for="signin-toggle" class="signin-close">
    <span class="material-symbols-outlined">
      close
    </span>
  </label>

  <!-- Sign in form -->
  <form id="signin-form">

    <h2>Нэвтрэх</h2>

    <p id="signin-message" class="signin-message"></p>

    <input
      id="signin-value"
      type="text"
      placeholder="Имэйл эсвэл утасны дугаар"
    />

    <input
      id="signin-password"
      type="password"
      placeholder="Нууц үг"
    />

    <button type="submit" class="signin-btn">
      Нэвтрэх
    </button>

    <a href="#" class="signin-forgot">
      Нууц үгээ мартсан?
    </a>

    <hr />

    <button type="button" class="signin-create" id="show-register-btn">
      Шинэ хаяг үүсгэх
    </button>

  </form>

  <!-- Register form -->
  <form id="register-form" style="display: none;">

    <h2>Шинэ хаяг үүсгэх</h2>

    <p id="register-message" class="signin-message"></p>

    <input
      id="register-name"
      type="text"
      placeholder="Нэр"
    />

    <input
      id="register-phone"
      type="text"
      placeholder="Утасны дугаар"
    />

    <input
      id="register-password"
      type="password"
      placeholder="Нууц үг"
    />

    <button type="submit" class="signin-btn">
      Бүртгүүлэх
    </button>

    <button type="button" class="signin-create" id="show-login-btn">
      Нэвтрэх рүү буцах
    </button>

  </form>

</div>
  `;
}

/* =========================================
   Empty function
========================================= */
export function renderSignin() {
  return "";
}

/* =========================================
   Sign in logic
========================================= */
export function initSignin() {

  const signinForm = document.querySelector("#signin-form");
  const registerForm = document.querySelector("#register-form");

  const panel = document.querySelector(".signin-panel");

  const signinMessage = document.querySelector("#signin-message");
  const registerMessage = document.querySelector("#register-message");

  const signinToggle = document.querySelector("#signin-toggle");
  const callToggle = document.querySelector("#call-toggle");

  const showRegisterBtn = document.querySelector("#show-register-btn");
  const showLoginBtn = document.querySelector("#show-login-btn");



  /* =====================================
     Нэг popup нээгдэхэд нөгөөг нь хаах
  ====================================== */

  if (signinToggle) {
    signinToggle.addEventListener("change", function() {
      if (signinToggle.checked && callToggle) {
        callToggle.checked = false;
      }
    });
  }

  if (callToggle) {
    callToggle.addEventListener("change", function() {
      if (callToggle.checked && signinToggle) {
        signinToggle.checked = false;
      }
    });
  }



  /* =====================================
     Нэвтрэх → Бүртгүүлэх form руу шилжих
  ====================================== */

  if (showRegisterBtn) {
    showRegisterBtn.addEventListener("click", function() {
      signinForm.style.display = "none";
      registerForm.style.display = "block";

      clearMessage(signinMessage);
      clearMessage(registerMessage);
    });
  }



  /* =====================================
     Бүртгүүлэх → Нэвтрэх form руу буцах
  ====================================== */

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", function() {
      registerForm.style.display = "none";
      signinForm.style.display = "block";

      clearMessage(signinMessage);
      clearMessage(registerMessage);
    });
  }



  /* =====================================
     Нэвтрэх form submit
  ====================================== */

  if (signinForm) {
    signinForm.addEventListener("submit", async function(e) {

      e.preventDefault();

      const value = document.querySelector("#signin-value").value.trim();
      const password = document.querySelector("#signin-password").value.trim();

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhone = /^[6-9]\d{7}$/.test(value);
      const validPassword = password.length >= 6;

      if (!value || !password) {
        showMessage(signinMessage, panel, "Бүх талбарыг бөглөнө үү", "error");
        return;
      }

      if (!isEmail && !isPhone) {
        showMessage(signinMessage, panel, "Имэйл эсвэл утасны дугаар буруу байна", "error");
        return;
      }

      if (!validPassword) {
        showMessage(signinMessage, panel, "Нууц үг дор хаяж 6 тэмдэгт байна", "error");
        return;
      }

      try {
        const data = await authAPI.login(value.replace(/\D/g, ""), password);
        saveSession(data.token, data.user);
        showMessage(signinMessage, panel, "Амжилттай нэвтэрлээ", "success");

        setTimeout(function() {
          signinToggle.checked = false;
          signinForm.reset();
          clearMessage(signinMessage);
          window.location.reload();
        }, 700);
      } catch (err) {
        showMessage(signinMessage, panel, err.message, "error");
      }

    });
  }



  /* =====================================
     Бүртгүүлэх form submit
  ====================================== */

  if (registerForm) {
    registerForm.addEventListener("submit", async function(e) {

      e.preventDefault();

      const name = document.querySelector("#register-name").value.trim();
      const phone = document.querySelector("#register-phone").value.trim();
      const password = document.querySelector("#register-password").value.trim();

      const isPhone = /^[6-9]\d{7}$/.test(phone);
      const validPassword = password.length >= 6;

      if (!name || !phone || !password) {
        showMessage(registerMessage, panel, "Бүх талбарыг бөглөнө үү", "error");
        return;
      }

      if (!isPhone) {
        showMessage(registerMessage, panel, "Утасны дугаар буруу байна", "error");
        return;
      }

      if (!validPassword) {
        showMessage(registerMessage, panel, "Нууц үг дор хаяж 6 тэмдэгт байна", "error");
        return;
      }

      try {
        const data = await authAPI.register(name, phone, password);
        saveSession(data.token, data.user);
        showMessage(registerMessage, panel, "Бүртгэл амжилттай үүслээ", "success");

        setTimeout(function() {
          registerForm.reset();
          clearMessage(registerMessage);
          signinToggle.checked = false;
          window.location.reload();
        }, 700);
      } catch (err) {
        showMessage(registerMessage, panel, err.message, "error");
      }

    });
  }
}

/* =========================================
   Message харуулах
========================================= */
function showMessage(message, panel, text, type) {

  if (!message) return;

  message.textContent = text;
  message.classList.add("show");

  if (type === "error") {
    message.style.color = "var(--color--error)";

    panel.classList.remove("signin-shake");
    void panel.offsetWidth;
    panel.classList.add("signin-shake");
  }

  if (type === "success") {
    message.style.color = "var(--color--success)";
  }
}



/* =========================================
   Message цэвэрлэх
========================================= */
function clearMessage(message) {

  if (!message) return;

  message.textContent = "";
  message.classList.remove("show");
}