new fullpage("#fullpage", {
  //options here
  autoScrolling: true,
  scrollHorizontally: true,
  navigation: true,
  navigationPosition: "right",
  navigationTooltips: [
    "Home",
    "Three Safety Tips",
    "Behaviour",
    "Breeding Spots",
    "Encounters",
    "Contact Us"
  ],
  showActiveTooltip: true,
  controlArrows: false,
  slidesNavigation: true,
  slidesNavPosition: "bottom",

  //callback function onleave
  onLeave: function (origin, destination, direction) {
    if (destination.index == 1) {
      bigThreeSection(destination);
    } else if (destination.index == 2) {
      apertureSection(destination);
    }
  },
  //callback => for homepage
  afterRender: () => {
    homeSection();
  },

  onSlideLeave: function (section, origin, destination, direction) {
    //on current aperture slide
    if (section.index == 2) {
      animateApertureSlide(destination.item, destination.index);
    }
  }
});

// home section animations
function homeSection() {
  //gsap timeline created
  const tl = new TimelineMax({ delay: 0.5 });

  //animate in
  tl.from(".bg", { bottom: "50%", top: "50%", duration: 0.6 })
    .from("#logo", {
      x: -1000,
      scale: 0.1,
      opacity: 0,
      ease: "elastic",
      duration: 2.5
    })
    .from(".section-home .content", { y: 30, opacity: 0, duration: 2 }, "-=1")
    .from("#camera", { y: -1000, duration: 3, ease: "elastic" }, "-=1.5")
    .from("#fp-nav", { opacity: 0, duration: 1 });
}

// big three safety tips section
function bigThreeSection(destination) {
  // get elements
  let section = destination.item;
  let heading = section.querySelector("h1");
  let content = section.querySelector(".content");
  let btCol = section.querySelectorAll(".bt-col");

  // animate
  const tl = new TimelineMax({ delay: 0.5 });
  tl.from(heading, { duration: 1, x: 500, opacity: 0 })
    .from(btCol, { y: "-50", duration: 0.5, opacity: 0, stagger: 0.2 })
    .from(content, { duration: 1, y: 30, opacity: 0 }, "-=1.5");
}

// behaviourial section

function animateSection(destination) {
  animateApertureSlide(destination.item, 0);
}

function animateApertureSlide(slide, index) {
  let slideHeading = slide.querySelector(".slide h1");
  let slideContent = slide.querySelector(".slide .content");
  let slideImage = slide.querySelector(".slide .slide-img");

  const tl = new TimelineMax({ delay: 0.3 });
  // animate slide heading and content
  tl.from(slideHeading, { duration: 1, y: 100, opacity: 0 }).from(
    slideContent,
    { duration: 1, x: 50, opacity: 0 },
    "-=0.5"
  );

  //animate slide image
  //slide #2
  if (index == 1) {
    tl.from(slideImage, { duration: 1.2, y: -700, opacity: 0, ease: "back" });
    //all other slides
  } else {
    tl.from(
      slideImage,
      { duration: 1.2, y: 700, opacity: 0, ease: "back" },
      "-=1.5"
    );
  }
}

function apertureSection(destination) {
  let section = destination.item;
  // animate first slide
  animateApertureSlide(section, 0);
}

// slide nav btns, next and prev
// next slide btn
let nextSlideBtn = document.querySelectorAll(".next-slide-btn");
nextSlideBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    fullpage_api.moveSlideRight();
  });
});

//prev slide btn

let prevSlideBtn = document.querySelectorAll(".prev-slide-btn");
prevSlideBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    fullpage_api.moveSlideLeft();
  });
});

//jump to section 2 btn

let jumptoS2Btn = document.querySelector(".jumpto-s2");
jumptoS2Btn.addEventListener("click", () => {
  fullpage_api.moveTo(2);
});

//jump to section 3 btn

let jumptoS3Btn = document.querySelector(".jumpto-s3");
jumptoS3Btn.addEventListener("click", () => {
  fullpage_api.moveTo(3);
});

// onleave
new fullpage("#fullpage", {
  onLeave: function (origin, destination, direction) {
    var leavingSection = this;

    //after leaving section 2
    if (origin.index == 1 && direction == "down") {
      alert("Going to section 3!");
    } else if (origin.index == 1 && direction == "up") {
      alert("Going to section 1!");
    }
  }
});

/* Camera back js */

// load scene function
function loadScene() {
  //gsap timeline
  const tl = new TimelineMax({ delay: 0.5 });
  // animate elements
  tl.to(".perth-bg", { filter: "blur(20px)", duration: 1, ease: "linear" })
    .from(".section-iso h1", { opacity: 0, y: 50, duration: 0.5 }, "-=0.5")
    .from(".camera-back", { opacity: 0, y: 20 })
    .from(".camera-display", { opacity: 0 })
    .to(".camera-back", { x: 200, duration: 0.5 })
    .from(".section-iso .content.day", { y: 150, opacity: 0, duration: 0.5 })
    .from("#night-toggle", { opacity: 0, y: -150, duration: 0.5 }, "-=0.5")
    .to("#night-toggle-tooltip", { open: true });
}

// foreshore to location map toggle / switch
let nightToggle = document.querySelector("#night-toggle");
nightToggle.addEventListener("sl-change", () => {
  if (nightToggle.checked === true) {
    isoNightMode();
  } else {
    isoDayMode();
  }
});

function isoNightMode() {
  // gsap timeline
  const tl = new TimelineMax();
  // aninmate elements
  tl.to(".perth-bg.day", { opacity: 0, duration: 0.5 })
    .to(".perth-bg.night", { opacity: 1, duration: 0.5 }, "-=0.5")
    .to(".camera-display.day", { opacity: 0, scale: 0.5, duration: 0.5 })
    .fromTo(
      ".camera-display.night",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5 }
    )
    .to(
      ".section-iso .content.day",
      { opacity: 0, y: -150, duration: 0.5 },
      "-=1"
    )
    .fromTo(
      ".section-iso .content.night",
      { opacity: 0, y: -150, duration: 0.5 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=1"
    )
    .to(".noise-comparision-open-btn", {
      scale: "+=0.5",
      yoyo: true,
      duration: 0.2,
      repeat: 4
    });
}

function isoDayMode() {
  const tl = new TimelineMax();

  tl.to(".perth-bg.night", { opacity: 0, duration: 0.5 })
    .to(".perth-bg.day", { opacity: 1, duration: 0.5 }, "-=0.5")
    .to(".camera-display.night", { opacity: 0, scale: 0.5, duration: 0.5 })
    .fromTo(
      ".camera-display.day",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5 }
    )
    .to(
      ".section-iso .content.night",
      { opacity: 0, y: -150, duration: 0.5 },
      "-=1"
    )
    .fromTo(
      ".section-iso .content.day",
      { opacity: 0, y: -150, duration: 0.5 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=1"
    );
}

// Male / female magpie comarision dialog

const noiseComparisionDialogBtn = document.querySelector(
  ".noise-comparision-open-btn"
);
const noiseComparisionDialog = document.querySelector(
  "#dialog-noise-comparision"
);
// click to trigger dialogue
noiseComparisionDialogBtn.addEventListener("click", () =>
  noiseComparisionDialog.show()
);

loadScene();

//Glider carousel section

new Glider(document.querySelector(".glider"), {
  slidesToShow: 2,
  slidesToScroll: 1,
  draggable: true,
  dots: "#dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next"
  }
});

//js-trigger Back to Home section btn

let jumptoHomeBtn = document.querySelector(".js-trigger");
jumptoHomeBtn.addEventListener("click", () => {
  fullpage_api.moveTo(1);
});

//activate sound icon button on home section

const bgMusic = new Audio("audio/bgmusic.mp3");

const soundBtn = document.querySelector("#sound-btn");
soundBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    soundBtn.name = "volume-up";
  } else {
    bgMusic.pause();
    soundBtn.name = "volume-mute";
  }
});
