
const cardsContainer = document.querySelector('.comment-list__container');
const cardTemplate = document.getElementById('card-template').content;

const nameUserInput = document.getElementById('name-input');
const commentUserInput = document.getElementById('text-input');

const submitButton = document.querySelector('.comment-form__submit');

const dateInput = document.getElementById('date-input');
const checkBoxInput = document.getElementById('date-auto-input');

const validationError = document.querySelector('.validate-error');


const form = document.forms.add;
const user = form.elements.name;
const comment = form.elements.text;
const dateComment = form.elements.date;
// const dateAutoComment = form.elements.date-auto;


let today = new Date();
let month = today.getMonth() + 1;
let date = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes()


let now = (today.getFullYear() + '-' + addZero(month) + '-' + addZero(date));
let dateNow = ("Сегодня, " + addZero(hours) + ':' + addZero(minutes));

let yesterday = (today.getFullYear() + '-' + addZero(month) + '-' + addZero(date - 1));
let dateYesterday = ("Вчера, " + addZero(hours) + ':' + addZero(minutes));



//добавлять ноль перед месяцем, датой, временем, чтобы было 09:01, а не 9:1
function addZero(item) {
    if( item < 10) {
        return '0' + item;
    }
    else {
        return item
    }
}


function getCommentDate() {
    if(dateComment.value === now) {
        return dateNow;
    }

    else if(dateComment.value === yesterday) {
        return dateYesterday;
    }

    else {
        return dateComment.value;
    }
} 

// для того, чтобы включенный чекбокс выключал соседннюю форму
function setDateCheckboxState() {
    if(checkBoxInput.checked) {
        dateInput.setAttribute('disabled', true);
        dateInput.classList.add('input-date_disabled')
    }
    
    else {
        dateInput.removeAttribute('disabled');
        dateInput.classList.remove('input-date_disabled');
   }
}



//для кнопки сабмита
function setSubmitButtonState(isCheckValid) {
    if (isCheckValid) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('comment-form__button_disabled');
    }

    else {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add('comment-form__button_disabled');
    }
}





// validationError.classList.remove('validate-error_active');
// validationError.classList.add('validate-error_active')

//удаление коммента
function deleteCardHandler(event) { 
    console.log('udoli!')
    const deleteCard = event.target.closest('.card'); //освежить
    deleteCard.remove(); 
    }; 

    
//снять поставить лайк
function toggleLikeHandler(event) {
    event.target.classList.toggle('card__like_active');
}






function addComment(nameValue, commentValue, dateValue) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__name').textContent = nameValue;
    cardElement.querySelector('.card__text').textContent = commentValue;
    cardElement.querySelector('.card__date').textContent = dateValue;

    cardsContainer.prepend(cardElement);


    const deleteButton = document.querySelector('.card__delete');
    deleteButton.addEventListener('click', deleteCardHandler);

    const likeButton = document.querySelector('.card__like');
    likeButton.addEventListener('click', toggleLikeHandler);
}




submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    let dateChecker = checkBoxInput.checked ? dateNow : getCommentDate(); 
    addComment(user.value, comment.value, dateChecker);
        
    form.reset();
    setSubmitButtonState(false);
    setDateCheckboxState();

});

//слушатель на изменения в форме
form.addEventListener('input', () => {
    const isValid = user.value.length > 1 && comment.value.length > 0 && (dateComment.value || checkBoxInput.checked);
    setSubmitButtonState(isValid);
});


//слушатель для понимания используем чекбокс в форме или дату сами заполняем.
checkBoxInput.addEventListener('click', setDateCheckboxState);
