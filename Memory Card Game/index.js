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



countPrint.innerHTML=`HAK: ${count}`;
scorePrint.innerHTML=`SCORE: ${score}`;

function flipCard() {


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
  firstCard.classList.add('has-match');// firstcard 'ın tıklama özelliğini kaldırıyor
  secondCard.classList.add('has-match');// secondcard 'ın tıklama özelliğini kaldırıyor

  // firstCard.removeEventListener('click', flipCard);
  // secondCard.removeEventListener('click', flipCard);
  score++; //eşleşmiş kart sayısı artıyor.
  scorePrint.innerHTML=`SCORE: ${score}`;
  if(score===10){//toplam 20 kart 
    win();
  }
  resetBoard();
}

function unflipCards() {
  gameCards.classList.add('no-event');//css deki no-event classını ekliyor.
  count--;//hak eksiliyor
  countPrint.innerHTML=`HAK: ${count}`;


  setTimeout(() => {
    firstCard.classList.remove('flipped');//dönen ve eşleşmeyen kartları kaldırıyor
    secondCard.classList.remove('flipped');//dönen ve eşleşmeyen kartları kaldırıyor

    resetBoard();//resetBoard() fonksiyonunu çalıştırıyor.
  }, 1500);
}

function resetBoard() { // başlangıçtaki haline döndürüyor
  firstCard=null;
  secondCard=null;
  hasFlippedCard = false;
  if(count===0){  
      document.querySelector('#lose').classList.remove('d-none');//Kaybettiniz yazısının d-none classını kaldırıyor.
      return reStart();
  }

  gameCards.classList.remove('no-event');

 
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
        card.classList.remove('has-match');
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