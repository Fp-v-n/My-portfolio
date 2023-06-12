document.addEventListener("DOMContentLoaded", function () {
  let btnSearch = document.querySelector(".search__btn");
  let inpSearch = document.querySelector("#search");
  let content = document.querySelector(".box");
  let btnContent = document.querySelector(".btn__box");
  let url = "https://api.jikan.moe/v4/anime";
  let xhr = new XMLHttpRequest();
  let xhr2 = new XMLHttpRequest();
  let xhr3 = new XMLHttpRequest();
  let anime = document.querySelector(".anime");
  let id = localStorage.getItem("id");
  let nId = localStorage.getItem("numberId");
  let posterImg = document.querySelector(".poster__img");
  let posterWrap = document.querySelector(".poster__wrap");
  let serachWrap = document.querySelector(".search__wrap");
  let searchTxt = document.querySelector(".search__txt");
  let showJanre = document.querySelector(".header__menu");
  let gender = document.querySelector(".show__gender");
  let genderWrap = document.querySelector(".gender__wrap");
  let genderTxt = document.querySelector(".gender__txt");
  let url2 = `https://api.jikan.moe/v4/anime/${id}/videos`;
  let regestration = document.querySelector("#reg__profile");
  let logBtn = document.querySelector(".login__btn");
  let enterProfil = document.querySelector("#enter__profile");
  let regName = document.querySelector("#reg__name");
  let regPass = document.querySelector("#reg__pass");
  let userInfo = document.querySelector(".user__info");
  let signBtn = document.querySelector(".sig__btn");
  let inName = document.querySelector("#in__name");
  let inPass = document.querySelector("#in__pass");
  let count = localStorage.getItem("count") || 0;
  let flag = localStorage.getItem("flag") || false;
  let userPass = document.createElement("div");
  let userName = document.createElement("div");
  let closeBtn = document.querySelector("#leave");

  enterProfil.setAttribute("disabled", "disabled");
  btnSearch.setAttribute("disabled", "disabled");
  inpSearch.addEventListener("input", function () {
    inpSearch.value
      ? btnSearch.removeAttribute("disabled")
      : btnSearch.setAttribute("disabled", "disabled");
  });
  regestration.addEventListener("click", function () {
    let linkLog = document.querySelector(".link__login");
    document.querySelector(".signin").style.display = "flex";
    linkLog.addEventListener("click", function () {
      document.querySelector(".signin").style.display = "none";
      document.querySelector(".login").style.display = "flex";
    });
  });
  logBtn.addEventListener("click", function () {
    localStorage.setItem(`login-${count}`, regName.value);
    localStorage.setItem(`pass-${count}`, regPass.value);
    count++;
    localStorage.setItem("count", count);
    document.querySelector(".login").style.display = "none";
    enterProfil.removeAttribute("disabled");
    regestration.setAttribute("disabled", "disabled");
    regestration.style.display = "none";
    enterProfil.style.display = "block";

    userInfo.innerHTML = "";
    userName.textContent = "name: " + regName.value;
    userPass.textContent = "password: " + regPass.value;
    userInfo.append(userName, userPass);
    localStorage.setItem("userName", regName.value);
    localStorage.setItem("userPass", regPass.value);
    localStorage.setItem("flag", "true");
    localStorage.setItem("flag-count", count);
  });
  signBtn.addEventListener("click", function () {
    let clk = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if (
        inName.value == localStorage.getItem(`login-${i}`) &&
        inPass.value == localStorage.getItem(`pass-${i}`)
      ) {
        document.querySelector(".signin").style.display = "none";
        enterProfil.removeAttribute("disabled");
        regestration.setAttribute("disabled", "disabled");
        regestration.style.display = "none";
        enterProfil.style.display = "block";
        userInfo.innerHTML = "";

        userName.textContent = "name: " + inName.value;

        userPass.textContent = "password: " + inPass.value;
        userInfo.append(userName, userPass);
        localStorage.setItem("userName", inName.value);
        localStorage.setItem("userPass", inPass.value);
        localStorage.setItem("flag", "true");
        localStorage.setItem("flag-count", i);
      } else {
        console.log("No");
        clk++;
      }
    }
    if (clk == localStorage.length) {
      alert("Такого аккаунта нет! Пожалуйста зарегестрируейтесь");
      document.querySelector(".signin").style.display = "none";
      document.querySelector(".login").style.display = "flex";
    }
  });
  enterProfil.addEventListener("click", function () {
    document.querySelector(".profil").style.display = "flex";
  });
  if (flag == "true") {
    regestration.style.display = "none";
    enterProfil.style.display = "block";
    userName.textContent = "name: " + localStorage.getItem("userName");
    userPass.textContent = "password: " + localStorage.getItem("userPass");
    userInfo.append(userName, userPass);
  }
  closeBtn.addEventListener("click", function () {
    regestration.removeAttribute("disabled");
    enterProfil.setAttribute("disabled", "disabled");
    enterProfil.style.display = "none";
    regestration.style.display = "block";
    document.querySelector(".profil").style.display = "none";
    localStorage.setItem("flag", "false");
  });

  if (anime) {
    let list = document.querySelector(".list");
    xhr2.open("get", url2);
    xhr2.send();
    xhr2.onreadystatechange = function () {
      list.innerHTML = "";
      if (xhr2.readyState == 4 && xhr2.status == 200) {
        let data = JSON.parse(xhr2.response);
        console.log(data);
        console.log(data.data.episodes.length);
        if (data.data.episodes.length == 0) {
          let li = document.createElement("li");
          let notVideo = document.createElement("div");
          notVideo.textContent = "СЕРИИ НЕ ДОСТУПНЫ!!!!";
          notVideo.classList.add("not__video");
          li.append(notVideo);
          list.append(li);
        } else {
          for (let i = 0; i < data.data.episodes.length; i++) {
            let episodes = data.data.episodes[i];
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = episodes.url;
            a.textContent = `Серия ${data.data.episodes.length - i}`;
            li.append(a);
            list.append(li);
          }
        }
      }
    };
    xhr3.open("get", url);
    xhr3.send();
    xhr3.onreadystatechange = function () {
      posterImg.innerHTML = "";
      posterWrap.innerHTML = "";
      if (xhr3.readyState == 4 && xhr3.status == 200) {
        let data = JSON.parse(xhr3.response);
        for (let i = 0; i < data.data.length; i++) {
          if (i == nId) {
            let synopsis = document.createElement("div");
            let pImg = document.createElement("img");
            let posterTitle = document.createElement("p");
            posterTitle.style.display = "block";
            posterTitle.textContent = data.data[i]["title"];
            pImg.src = data.data[i]["images"]["jpg"]["image_url"];
            posterImg.append(pImg);
            synopsis.textContent = data.data[i]["synopsis"];
            posterWrap.append(posterTitle, synopsis);
          }
        }
      }
    };
  }
  xhr.open("get", url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.response);
      console.log(data);
      content.innerHTML = "";
      btnContent.innerHTML = "";

      let boxTxt = document.createElement("div");
      boxTxt.classList.add("search__txt");
      boxTxt.textContent = "Все аниме:";
      for (let i = 0; i < data.data.length; i++) {
        let movie = data.data[i];
        let title = document.createElement("h4");
        let year = document.createElement("div");
        let poster = document.createElement("img");
        let movieCont = document.createElement("div");
        let a = document.createElement("a");
        let wrap = document.createElement("div");

        title.textContent = movie.title;
        year.textContent = movie.year;
        poster.src = movie.images.jpg.image_url;

        poster.setAttribute("atrr", movie.mal_id);
        poster.setAttribute("number", i);
        a.append(poster);
        console.log(movie.mal_id);
        a.href = `pages/anime.html`;
        a.setAttribute("target", "_blank");
        // poster.classList.add(movie.mal_id)
        wrap.classList.add("box__wrap");
        movieCont.classList.add("box__img");
        a.classList.add("box__card");

        wrap.append(title, year);
        movieCont.append(poster);
        a.append(movieCont, wrap);
        content.append(a);
      }
      content.before(boxTxt);
      btnSearch.addEventListener("click", function () {
        serachWrap.innerHTML = "";
        searchTxt.textContent = "";
        searchTxt.textContent = "Результаты поиска:";
        for (let i = 0; i < data.data.length; i++) {
          let movie = data.data[i];
          if (inpSearch.value == movie.title) {
            let title = document.createElement("h4");
            let year = document.createElement("div");
            let poster = document.createElement("img");
            let movieCont = document.createElement("div");
            let a = document.createElement("a");
            let wrap = document.createElement("div");

            title.textContent = movie.title;
            year.textContent = movie.year;
            poster.src = movie.images.jpg.image_url;

            poster.setAttribute("atrr", movie.mal_id);
            poster.setAttribute("number", i);
            a.append(poster);
            console.log(movie.mal_id);
            a.href = `pages/anime.html`;
            a.setAttribute("target", "_blank");
            wrap.classList.add("box__wrap");
            movieCont.classList.add("box__img");
            a.classList.add("box__card");

            wrap.append(title, year);
            movieCont.append(poster);
            a.append(movieCont, wrap);
            serachWrap.append(a);
          }
          serachWrap.before(searchTxt);
        }
      });

      gender.addEventListener("click", function (e) {
        genderWrap.innerHTML = "";
        genderTxt.textContent = "";
        let target = e.target;
        genderTxt.textContent = target.value;
        genderTxt.style.border = "1px solid chocolate";
        for (let i = 0; i < data.data.length; i++) {
          let movie = data.data[i];
          for (let y = 0; y < movie.genres.length; y++) {
            if (target.value == movie.genres[y].name) {
              let title = document.createElement("h4");
              let year = document.createElement("div");
              let poster = document.createElement("img");
              let movieCont = document.createElement("div");
              let a = document.createElement("a");
              let wrap = document.createElement("div");

              title.textContent = movie.title;
              year.textContent = movie.year;
              poster.src = movie.images.jpg.image_url;

              poster.setAttribute("atrr", movie.mal_id);
              poster.setAttribute("number", i);
              a.append(poster);
              console.log(movie.mal_id);
              a.href = `pages/anime.html`;
              a.setAttribute("target", "_blank");
              wrap.classList.add("box__wrap");
              movieCont.classList.add("box__img");
              a.classList.add("box__card");

              wrap.append(title, year);
              movieCont.append(poster);
              a.append(movieCont, wrap);
              genderWrap.append(a);
            }
          }
        }
        genderWrap.before(genderTxt);
      });
    }
  };
  function clickElem(elem) {
    elem.addEventListener("click", function (e) {
      let target = e.target;
      localStorage.setItem("id", target.getAttribute("Atrr"));
      localStorage.setItem("numberId", target.getAttribute("Number"));
    });
  }
  clickElem(content);
  clickElem(serachWrap);
  clickElem(genderWrap);
  showJanre.addEventListener("click", function () {
    if (!this.dataset.clicked) {
      this.setAttribute("data-clicked", "true");
      gender.style.display = "flex";
    } else {
      this.removeAttribute("data-clicked");
      gender.removeAttribute("style");
    }
  });
});
