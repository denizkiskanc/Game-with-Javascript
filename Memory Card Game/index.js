//getElementById,querySelector,querySelectorAll farkı : getElementById direkt olarak o id’ye odaklanıyor, querySelector o id’yi bulana kadar tarıyor bulunca bırakıyor, querySelectorAll ise bulduktan sonra bile var mı diye aramaya devam ediyor.
const gameCards = document.querySelector('.game__cards');
const cards = document.querySelectorAll('.game__card');
const countPrint=document.querySelector('#count');
const scorePrint=document.querySelector('#score');
let count = 10;
let score = 0;
let firstCard=null;
let secondCard=null;
let hasFlippedCard = false;
let lockBoard = false;
//loackboard firstCard ve secondCard açılıp kapanmadan önce başka bir kartın açılmasını engellemek için tanımlandı.
//Başta false çünkü şuan herhangi bir firstCard ve secondCard şeçilmedi

countPrint.innerHTML=`HAK: ${count}`;
scorePrint.innerHTML=`SCORE: ${score}`;

function flipCard() {

  if (lockBoard===true) 
  return;
  if (this === firstCard) 
  return;

  this.classList.add('flipped');//flipped classını aktive ediyor

  if (hasFlippedCard === false) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();//checkForMatch() fonksiyonunu çalıştırıyor
}

function checkForMatch() {
  let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

  if(isMatch ===true) {
    disableCards();
  } 
  else {
    unflipCards();
  }

  //isMatch ? disableCards() :unflipCards(); // eşleşme doğruysa disableCards değilse unflipcards
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);// firstcard 'ın tıklama özelliğini kaldırıyor
  secondCard.removeEventListener('click', flipCard);// secondcard 'ın tıklama özelliğini kaldırıyor
  score++; //eşleşmiş kart sayısı artıyor.
  scorePrint.innerHTML=`SCORE: ${score}`;
  if(score===10){//toplam 20 kart 
    win();
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true; // kilityor.
  count--;//hak eksiliyor
  countPrint.innerHTML=`HAK: ${count}`;
  if(count===0){
    gameCards.classList.add('no-event');//css deki no-event classını ekliyor.Yani oyun bittiğinde tıklanma özelliği kapanıyor
    reStart();
    document.querySelector('#lose').classList.remove('d-none');//Kaybettiniz yazısının d-none classını kaldırıyor.
  }

  setTimeout(() => {
    firstCard.classList.remove('flipped');//dönen ve eşleşmeyen kartları kaldırıyor
    secondCard.classList.remove('flipped');//dönen ve eşleşmeyen kartları kaldırıyor

    resetBoard();//resetBoard() fonksiyonunu çalıştırıyor.
  }, 1500);
}

function resetBoard() { // başlangıçtaki haline döndürüyor
  
  hasFlippedCard = false;
  lockBoard=false;
  firstCard=null;
  secondCard=null;
 
}

function shuffle() {
  cards.forEach(card => {
    let randomPositon = Math.floor(Math.random() * 20);
    card.style.order = randomPositon;
  });
};
// shuffle();
addEventListener('DOMContentLoaded', shuffle()); // sayfa yenilenince karıştırma 


function win() {
            score=10;
            scorePrint.innerHTML=`SCORE: ${score}`;
            document.querySelector('#win').classList.remove('d-none');//Oyun kazanıldıktan sonra 'tebrikler' yazısının gözükmesi için d-none classını kaldırdım.
            gameCards.classList.add('no-event');//kartların tıklanmasını engellemek için no-event classını ekledim
            reStart();      
}
function reStart() {

  const button = document.querySelector('#btn'); 
  button.classList.remove('d-none');
  
}

function reset() { // yeniden başla butonuna tıklandıktan sonra
      count=10;
      score=0;
      shuffle();  // butona tıklayıncada karıştırma iişini yapması için
      cards.forEach(card => {

        card.classList.remove('flipped'); // dönen kartları kapatmak için
    });
    countPrint.innerHTML=`HAK: ${count}`;
    scorePrint.innerHTML=`SCORE: ${score}`;
    gameCards.classList.remove('no-event');// no event classını yani cardların tıklanmasını engellyeyen classı kaldırır
    
    document.querySelector('#win').classList.add('d-none'); 
    document.querySelector('#lose').classList.add('d-none'); 
    document.querySelector('#btn').classList.add('d-none'); 
    
}

document.querySelector('#btn').addEventListener('click', () => {//yeniden başlat butonuna tıklayınca çalışan  fonksiyonlar
  resetBoard();
  reset();
});


cards.forEach(card => card.addEventListener('click', flipCard));//tıklanılan kartın index değerini card değişkenine atar.