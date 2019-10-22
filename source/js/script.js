let popupButtons = document.querySelectorAll(".contact-button");
let popup = document.querySelector(".popup-main");
let popupSuccess = document.querySelector(".success");
let closePopupButton = document.querySelector(".close-main");
let body = document.querySelector(".body");
let popupErrorText = document.querySelector(".submit-error");
let popupSubmitButton = document.querySelector(".popup-button");
let closeMobMenuButton = document.querySelector(".menu-close");
let maskOptions = {
  mask: '+{7}(000)000-00-00'
};
let closeSuccessButton = document.querySelector(".success-close");
const ESC__BUTTON = 27;

// Отрабатываем сценарии закрытия всплывающих окон
let onOverlayClick = function (evt) {
  if (!popup.contains(evt.target) && !popup.classList.contains("hidden")) { 
    popup.classList.add("hidden");
    body.style.overflow = "auto";
    popupErrorText.classList.add("hidden");
    popup.reset();
	  document.querySelector("#name-popup").style.border = "";
	  document.querySelector("#tel-popup").style.border = "";
	}

	if (!popupSuccess.contains(evt.target) && !popupSuccess.classList.contains("hidden")) { 
    popupSuccess.classList.add("hidden");
    body.style.overflow = "auto";
    popup.reset();
	}

  if(!document.querySelector(".mobile-menu").contains(evt.target) && !document.querySelector(".mobile-menu").classList.contains("menu-hidden")) {
    document.querySelector(".mobile-menu").classList.add("menu-hidden");
    body.style.overflow = "auto";
  }
}

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === ESC__BUTTON) {
    evt.preventDefault();
    if (!popup.classList.contains("hidden")) {
     	popup.classList.add("hidden");
     	body.style.overflow = "auto";
     	popupErrorText.classList.add("hidden");
     	popup.reset();
     	document.querySelector("#name-popup").style.border = "";
  		document.querySelector("#tel-popup").style.border = "";
    }

    if (!popupSuccess.classList.contains("hidden")) {
    	popupSuccess.classList.add("hidden");
    	body.style.overflow = "auto";
    	popup.reset();
    }
  }
});

closePopupButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("hidden");
  body.style.overflow = "auto";
  popupErrorText.classList.add("hidden");
  popup.reset();
  document.querySelector("#name-popup").style.border = "";
  document.querySelector("#tel-popup").style.border = "";
});

closeSuccessButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupSuccess.classList.add("hidden");
  body.style.overflow = "auto";
  popup.reset();
});


// Открываем окно popup
popupButtons.forEach(function (button) {
  button.addEventListener("click", function (evt) {
  	evt.preventDefault();
    if (popup.classList.contains("hidden")) {
      popup.classList.remove("hidden");
      body.style.overflow = "hidden";
      document.addEventListener("mousedown", onOverlayClick);
      document.querySelector("#name-popup").focus();
    } else {
      popup.classList.add("hidden");
      document.removeEventListener("mousedown", onOverlayClick);
    }
  });
});

// проверяем валидность формы и открываем окно success
popupSubmitButton.addEventListener("click", function (evt) {
	evt.preventDefault();
	if (document.querySelector("#name-popup").checkValidity() == false) {
		popupErrorText.classList.remove("hidden");
		document.querySelector("#name-popup").reportValidity();
		document.querySelector("#name-popup").style.border = "2px solid #ff0000";
	} else if (document.querySelector("#name-popup").checkValidity() == true) {
		document.querySelector("#name-popup").style.border = "";
		if (document.querySelector("#tel-popup").checkValidity() == false) {
			popupErrorText.classList.remove("hidden");
			document.querySelector("#tel-popup").reportValidity();
			document.querySelector("#tel-popup").style.border = "2px solid #ff0000";
		} else if (document.querySelector("#tel-popup").checkValidity() == true) {
			document.querySelector("#tel-popup").style.border = "";
			if (!document.querySelector("#checkbox-popup").checked) {
				popupErrorText.classList.remove("hidden");
				document.querySelector("#checkbox-popup").reportValidity();
			} 
		} 
	} 

	if (document.querySelector("#name-popup").checkValidity() == true && document.querySelector("#tel-popup").checkValidity() == true &&
		document.querySelector("#checkbox-popup").checked) {
		popupErrorText.classList.add("hidden");
		popup.classList.add("hidden");
		popupSuccess.classList.remove("hidden");
		body.style.overflow = "hidden";
	}
})

// Отрабатываем закрытие меню на мобильной версии
let closeMobileMenu = function (evt) {
  evt.preventDefault();
  if (!document.querySelector(".mobile-menu").classList.contains("menu-hidden")) {
    document.querySelector(".mobile-menu").classList.add("menu-hidden");
    body.style.overflow = "auto";
  }
}

// Открываем блок информации по клику на бургерное меню
document.querySelector(".header__toggle").addEventListener("click", function (evt) {
	evt.preventDefault();
  document.querySelector(".mobile-menu").classList.remove("menu-hidden");
  body.style.overflow = "hidden";
  closeMobMenuButton.addEventListener("click", closeMobileMenu);
  document.addEventListener("mousedown", onOverlayClick);
});

// Маска для телефонов
var mask = IMask(document.querySelector("#tel"), maskOptions);
var mask = IMask(document.querySelector("#tel-popup"), maskOptions);

