// $(window).bind("mousewheel", function() {
//   return false;
// });  

$(window).resize(function () {
  console.log(window.innerHeight);
})

var usingMenu = false

//carousel
var currentIndex = 0 //set initial index
var circle = document.getElementsByClassName("page-indicator")[0] //get the circle element

$(".carousel-paganation ul").on('click',function(event){
  var index = $(event.target).index(); //get the index of the clicked number
  carouselFunction(index) //move the carousel parameter=index of the clicked number
})

function carouselFunction(index) {
  //move the carousel using x position
  TweenLite.to(".carousel-area",1,{x: -100*index+"%", ease: Expo.easeInOut})
  
  //if currentIndex is less than the target number meaning it is going to the right
  if (currentIndex<index) {
    //circle animation going to
    var toCircleTimeline = new TimelineMax({paused: true})
    //animate the circle to the right
    toCircleTimeline
      .to(circle, 0.5,{width: 35+(41*(index-currentIndex)), ease: Expo.easeOut})
      .to(circle, 0.6,{x: 42*(index), width: 35, ease: Expo.easeOut},0.3)
      toCircleTimeline.play()
    goToElement(index)
  }else if(currentIndex>index){ //if the currentIndex is greater than the target meaning it is going to the left
    //circle animation going back
    var backCircleTimeline = new TimelineMax({paused: true})
    //animate the circle to the left
    backCircleTimeline
      .to(circle, 1,{width: 35+(41*(currentIndex-index)), ease: Expo.easeOut},0)
      .to(circle, 1,{x: 42*index, ease: Expo.easeOut},0)
      .to(circle, 0.5,{width: 35, ease: Expo.easeOut},0.5)
      backCircleTimeline.play()
    goBackElement(index)
  }
  currentIndex=index;
}


//carousel animation
// var carouselArea = document.getElementsByClassName("carousel-area")[0].children[index]

//go to some element
function goToElement(index) {
  //title animation
  var carouselTitle = document.getElementsByClassName("carousel-title-container")[0].children[0].children
  var titleTimeline  = new TimelineMax({paused: true})

  var starting = 0.05 //starting time
  for (let i = currentIndex; i < index; i++) {
    // move up the titles in the range from current index
    titleTimeline.to(carouselTitle[i], 0.8,{y: -520, opacity: 0, ease: Power4.easeInOut},starting )
    starting+=0.05; //increment the starting by itself so that the animation won't start at the same time
  }
  //move the last element to the visible side.
  titleTimeline.to(carouselTitle[index], 0.8,{y: -400, opacity: 1, ease: Power4.easeInOut},starting )

  titleTimeline.play()
}

//go back to some element
function goBackElement(index) {
  var carouselTitle = document.getElementsByClassName("carousel-title-container")[0].children[0].children //get the titles
  var titleTimeline  = new TimelineMax({paused: true})

  var starting = 0.05 //starting time
    // titleTimeline.to(carouselTitle[currentIndex], 0.8,{y: 0, opacity: 0, ease: Power4.easeInOut},0 )
    //animeate down the title
    for (let b = currentIndex; b > index; b--) {
      titleTimeline.to(carouselTitle[b], 0.8,{y: 0, opacity: 1, ease: Power4.easeInOut},starting )
      starting+=0.05;
    }
    //if the index is zero set the y to zero so that it will not just pass the viewable element
    //if not zero animate the element to the viewbale element
    if(index === 0)
      titleTimeline.to(carouselTitle[index], 0.8,{y: 0, opacity: 1, ease: SlowMo.easeInOut},starting )
    else
      titleTimeline.to(carouselTitle[index], 0.8,{y: -400, opacity: 1, ease: Power4.easeInOut},starting )
  titleTimeline.play()
}


//menu animation
var menuIsOpen = false
var menuAnimation = TweenMax.to(".menu-overlay",0.8,{width: '20%', ease: Expo.easeInOut, paused: true}).delay(0.4)

$("#menu-toggle").click(function (e) {
  $(this).toggleClass('open');
  //if the menu is open set the variable to false and reverse the animation
   if(menuIsOpen){
      menuIsOpen = false
      menuAnimation.reverse()
   }
   else{ //else set the variable to true and play the animation to open the menu
      menuIsOpen = true
      menuAnimation.play()
   }
})

