(function () {
  var Memory = {
    init: function (cards) {
      this.$game = $(".game");
      this.$modal = $(".modal");
      this.$overlay = $(".modal-overlay");
      this.$restartButton = $("button.restart");
      this.cardsArray = $.merge(cards, cards);
      this.shuffleCards(this.cardsArray);
      this.setup();
    },

    shuffleCards: function (cardsArray) {
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function () {
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $(".card");
      this.paused = false;
      this.guess = null;
      this.binding();
    },

    binding: function () {
      this.$memoryCards.on("click", this.cardClicked);
      this.$restartButton.on("click", $.proxy(this.reset, this));
    },
    // kinda messy but hey
    cardClicked: function () {
      var _ = Memory;
      var $card = $(this);
      if (
        !_.paused &&
        !$card.find(".inside").hasClass("matched") &&
        !$card.find(".inside").hasClass("picked")
      ) {
        $card.find(".inside").addClass("picked");
        if (!_.guess) {
          _.guess = $(this).attr("data-id");
        } else if (
          _.guess == $(this).attr("data-id") &&
          !$(this).hasClass("picked")
        ) {
          $(".picked").addClass("matched");
          _.guess = null;
        } else {
          _.guess = null;
          _.paused = true;
          setTimeout(function () {
            $(".picked").removeClass("picked");
            Memory.paused = false;
          }, 600);
        }
        if ($(".matched").length == $(".card").length) {
          _.win();
        }
      }
    },

    win: function () {
      this.paused = true;
      setTimeout(function () {
        Memory.$game.fadeOut();
      }, 1000);
    },

    reset: function () {
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
    },

    // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
    shuffle: function (array) {
      var counter = array.length,
        temp,
        index;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function () {
      var frag = "";
      this.$cards.each(function (k, v) {
        frag +=
          '<div class="card" data-id="' +
          v.id +
          '"><div class="inside">\
				<div class="front"><img src="' +
          v.img +
          '"\
				alt="' +
          v.name +
          '" /></div>\
				<div class="back"><img src="img/beyin_sembol.png"\
				alt="Codepen" /></div></div>\
				</div>';
      });
      return frag;
    },
  };

  var cards = [
    {
      name: "fi",
    img: "img/fi_sembol.png",
    id: 1,
    },
    {
      name: "integral",
    img: "img/integral_sembol.png",
    id: 2,
    },
    {
      name: "fonksiyon",
    img: "img/fonksiyon_sembol.png",
      id: 3,
    },
    {
      name: "phi_sembol",
      img: "img/phi_sembol.png",
      id: 4,
    },
    {
      name: "pi_sayısı",
      img: "img/pi_sayısı.png",
      id: 5,
    },
    {
      name: "psi_sembol",
      img: "img/psi_sembol.png",
      id: 6,
    },
    {
      name: "toplam_sembol",
      img: "img/toplam_sembol.png",
      id: 7,
    },
    {
      name: "türev_sembol",
      img: "img/türev_sembol.png",
      id: 8,
    },
    {
      name: "alfa_sembol",
      img: "img/alfa_sembol.png",
      id: 9,
    },
    {
      name: "sonsuzluk_sembol",
      img: "img/sonsuzluk_sembol.png",
      id: 10,
    },
    {
      name: "delta_sembol",
      img: "img/delta_sembol.png",
      id: 11,
    },
    {
      name: "lambda_sembol",
      img: "img/lambda_sembol.png",
      id: 12,
    },
  ];

  Memory.init(cards);
})();
