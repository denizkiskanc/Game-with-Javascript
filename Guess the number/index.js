// Oyun bittikten sonra ekranda sadece yeniden başlat butonu olsun
// Yeniden başlat butonuna bastığında oyunu sıfırdan yeniden başlat
// Alertboxlardan 1 tane olsun
// her durumda ilgili classı verelim Mesela successe alert success verelim içeriğini de ona göre değiştirelim
// aynı zamanda kalan hakkımızı oyun içindeyken - oyun bitene kadar - kalan hakkımızı kartın sağ üst köşesine yazalım
// hatalı tahminde bulunduğumuzda body rengini 1 saniyeliğine kırmızı yapalım
// Doğru sonuçta body yeşil olsun

const gameElement = document.querySelector('#game'); // Daha hızlı çalışması için id'si game olan divin içinde arama yapıyor.
const game = {
  count: null,
  number: null,
  startButton: gameElement.querySelector('#startButton'),
  guessInputGroup: gameElement.querySelector('#guessInputGroup'),
  guessButton: gameElement.querySelector('#guessButton'),
  guessInput: gameElement.querySelector('#guessInput'),
  alertInfo: gameElement.querySelector('#alertInfo'),
  // alertDanger: gameElement.querySelector('#alertDanger'),
  // alertSuccess: gameElement.querySelector('#alertSuccess'),
  divCount: gameElement.querySelector('#count'),
  init: () => {
    startButton.addEventListener('click', () => {
      game.start();
    });
  },
  start: () => {
    game.count = 3;
    game.random();
    game.startButton.classList.add('d-none');
    game.guessInputGroup.classList.remove('d-none');
    game.divCount.classList.remove('d-none');
    game.printCount();
    // game.alertDanger.classList.add('d-none');
    // game.alertSuccess.classList.add('d-none');
    game.alertInfo.classList.add('d-none');
    document.body.classList.remove('bg-success');
    document.body.classList.remove('bg-danger');
    document.body.classList.add('bg-dark');
    // game.guessButton.addEventListener('click', () => {
    //   game.guess(Number(game.guessInput.value)); // Number(); eklendi
    // });
    // // Yeniden başlatıldığında hata verdiği için aşağıya ekledik
  },
  reStart: () => {
    game.startButton.innerHTML = 'Yeniden Başla';
    game.startButton.classList.remove('d-none');
    game.guessInputGroup.classList.add('d-none');
  },
  random: () => {
    game.number = Math.floor(Math.random() * 21);
  },
  printCount: () => {
    game.divCount.innerHTML = `Kalan hakkınız: ${game.count}`;
  },
  guess: (value) => {
    game.guessInput.value = '';
    if(value === game.number) {
      console.log('Tahmininiz doğru. Tebrikler!');
      game.correct('Tahmininiz doğru. Tebrikler!');
    }
    else {
      game.count--;
      game.printCount();
      if(game.count === 0) {
        // game.over();
        return game.over(`Son tahmininiz yanlış... Daha fazla tahmin hakkınız kalmadı... Oyunu kaybettiniz! <br> Doğru sayı: ${game.number}`); // return eklendi.
      }
      else if(value > game.number){
        game.wrong('Daha küçük bir sayı giriniz...');
        console.log('Daha küçük bir sayı giriniz...');
      }
      else if(value < game.number) {
        game.wrong('Daha büyük bir sayı giriniz...');
        console.log('Daha büyük bir sayı giriniz...')
      }
      console.log('Kalan hakkınız: ', game.count);
    }

  },
  over: (text) => {
    console.log('Son tahmininiz yanlış... Daha fazla tahmin hakkınız kalmadı... Oyunu kaybettiniz!');
    game.alertInfo.innerHTML = text;
    game.alertInfo.classList.remove('d-none');
    game.alertInfo.classList.remove('alert-success', 'alert-info');
    game.alertInfo.classList.add('alert-danger');
    document.body.classList.add('bg-danger');
    document.body.classList.remove('bg-dark');
    setTimeout(() => {
      document.body.classList.add('bg-dark');
      document.body.classList.remove('bg-danger');
    },2000); // aynı anda yanıp sönmesi için bunu da 2 saniye yaptık
    game.reStart();
  },
  wrong: (text) => {
    game.alertInfo.classList.remove('d-none');
    document.body.classList.add('bg-danger');
    document.body.classList.remove('bg-dark');
    game.alertInfo.classList.remove('alert-success', 'alert-danger');
    game.alertInfo.classList.add('alert-info');
    game.alertInfo.innerHTML = text;
    setTimeout(() => {
      game.alertInfo.classList.add('d-none');
    },2000);
    setTimeout(() => {
      document.body.classList.add('bg-dark');
      document.body.classList.remove('bg-danger');
    },2000); // aynı anda yanıp sönmesi için bunu da 2 saniye yaptık
  },
  correct: (text) => {
    game.alertInfo.classList.remove('alert-info', 'alert-danger');
    game.alertInfo.classList.add('alert-success');
    game.alertInfo.innerHTML = text;
    game.alertInfo.classList.remove('d-none');
    game.divCount.classList.add('d-none');
    document.body.classList.add('bg-success');
    document.body.classList.remove('bg-dark');
    game.reStart();
  }
}
document.addEventListener('DOMContentLoaded', game.init());
game.guessButton.addEventListener('click', () => {
  game.guess(Number(game.guessInput.value)); // Number(); eklendi
});