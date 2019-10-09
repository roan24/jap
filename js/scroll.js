var timeLine = new TimelineMax({paused: true}) //the animation to show the intro texts
timeLine
  .to(".firstSectionTitle", 0.3, {opacity: 1, top: 1},0.4)
  .to(".authorName", 0.4, {opacity: 1, top: 0}, 0.6 )
  .to(".short-message", 0.3, {opacity: 1, top: 0}, 0.4)
  .to(".transparent-btns", 0.4, {opacity: 1}, 0.6)
timeLine.play()

var showIntroTimeline = new TimelineMax({paused: true})//the animation to show and hide the intro texts
showIntroTimeline.to("#intro-row", 0.8,{y: 0, opacity: 1, ease: Power4.easeInOut},"+=0.2")
// showIntroTimeline.play()

var masterTimeline = new TimelineMax({paused: true})//the sequence animation of intro, about and work

//hide intro animation
masterTimeline
  // .to(".firstSectionTitle", 0.3, {opacity: 1, top: 1},0.4)
  // .to(".authorName", 0.4, {opacity: 1, top: 0}, 0.6 )
  // .to(".short-message", 0.3, {opacity: 1, top: 0}, 0.4)
  // .to(".transparent-btns", 0.4, {opacity: 1}, 0.6)
  .to("#intro-row", 0.8,{y: 400, opacity: 0, ease: Power4.easeInOut},"-=1")
  masterTimeline.addLabel("intro") 

//about animtion sequence
masterTimeline
  .to(".about-title-container",1,{left: '-500px', opacity: 0, ease: Power4.easeInOut},"+=0.15")
  .to(".about-split-left",1,{x: '-35%', ease: Power4.easeInOut},"-=1")
  .to(".about-split-right",1,{width: '62%', ease: Power4.easeInOut},"-=1")
  .to(".about-lorem-container",1.5,{ left: -150, opacity: 1, ease: Power4.easeInOut},"-=1")
  .to(".about-paracontainer",0.5,{right: '50%', opacity: 1, ease: SlowMo.easeInOut},"-=0.7")

var aboutclickables = document.getElementsByClassName("about-clickables")[0].children;

for (let i = 0; i < aboutclickables.length; i++) {
  const element = aboutclickables[i];
  masterTimeline.to(element, 0.3,{left: -150, opacity: 1});
}
  masterTimeline.addLabel("about")  
  masterTimeline.addLabel("company")
  
  //work animation sequence
  masterTimeline
    .to(".work-title-container",1,{right: -200, opacity: 0, ease: Power4.easeInOut},"+=0.2")
    .to(".work-split-left",0.8,{width: '62%', ease: Power4.easeInOut},"-=0.6")
    .to(".work-lorem-container",1.5,{x: '60%', opacity: 1, ease: Expo.easeInOut},"-=0.4")
    .to(".work-paracontainer",1,{left: '50%', opacity: 1, ease: Power3.easeInOut},"-=1.1")
  
  var workClickables = document.getElementsByClassName("work-clickables")[0].children;
  
  for (let i = 0; i < workClickables.length; i++) {
    const element = workClickables[i];
    masterTimeline.to(element, 0.3,{left: 0, opacity: 1});
  }
  masterTimeline.addLabel("work")
  masterTimeline.addLabel("contact")


//add mousewheel listeners to control the website
document.addEventListener("mousewheel", Go);
document.addEventListener("DOMMouseScroll", Go);
var masterStatus; //master variable to determine if the animations is playing
var height = 0; //scrolled value of the window
var sectionIndex = 0; //the current index to determine which section we are currently in
var sectionArray = ["intro", "about", "company", "work", "contact"] //the array of the sections

function Go(e) {
  var SD = e.wheelDelta || -e.detail; //variable to determine the scroll direction
  
  //if SD is greater than 0 meaning user is scrolling up
  //only play if masterStatus is not true
  //only play if section index is equal or greater than 0 
  //so that sectionIndex will not have a value of less than zero
  if (SD > 0 && !masterStatus && sectionIndex>= 0) {
    //if the sectionIndex is equal to 1(about section) and cannot scrollup yet
    if(sectionIndex == 1 && !aboutCanScrollUp){
      aboutScrollUpParagraph()//scroll up the paragraphs
    }
    else if(sectionIndex == 2 && currentIndex != 0){//if the sectionIndex is equal to 2 and the currentIndex of the carousel is not equal to zero
      masterStatus = true
      carouselFunction(currentIndex-1) //go back one step in the carousel
      //set timeout to avoid other animations from firing
      setTimeout(() => {
        masterStatus = false
      }, 1250);
    }else if (sectionIndex == 3 && !workCanScrollUp) {//if the sectionIndex is equal to 3(work section) and cannot scrollup yet
      workScrollUpParagraph()//scroll up the paragraphs
    }else if(height !== 0){
      //set the height to the window height multiplied by the section index to know where in the window to scroll
      height = window.innerHeight *(sectionIndex-1) 
      //animate the scroll
      TweenLite.to(window, 1 ,{scrollTo: height,
        ease: Expo.easeInOut,
        autoKill:false,
        onStart: function () {
          sectionIndex-=1 //decrement the sectionIndex by on since the user is scrolling up
          changeActiveMenu(sectionIndex) //change the active menu 
          if(sectionIndex == 0) //if the sectionIndex is zero animate the intro texts to show it
            showIntroTimeline.restart()
          masterStatus = true
          masterTimeline.tweenTo(sectionArray[sectionIndex]) //play the animation depending on the section
        },
        onComplete: function () {
          setTimeout(() => {
            masterStatus = false
          }, 1500);
        }
      })
    }
      
  } else if (SD < 0  && !masterStatus && sectionIndex <4) {

    if(sectionIndex == 1 && !aboutCanScrollDown){ //if the section index is 1(about section) and can scroll down
      masterStatus = true
      aboutScrollDownParagraph() //animate the scroll down in the paragraphs
    }else if(sectionIndex == 2 && currentIndex != $(".carousel-paganation ul").find("li").length-1){ 
      //if the section index is 2(company section) and the current index of the carousel is not the size of the paganation
      //we just go to the next carousel element but if the current index is equal to the length of the paganation means
      //we go to the next section and not just animation the carousel to white page  of heaven
      masterStatus = true
      carouselFunction(currentIndex+1) //go to the next element of the carousel
      setTimeout(() => {
        masterStatus = false
      }, 1250);
    }else if (sectionIndex == 3 && !workCanScrollDown) { //if the section index is 3(work section) and can scroll down
      workScrollDownParagraph()//animate the scroll down in paragraph
    }else{
      console.log(sectionIndex);
      height = window.innerHeight *(sectionIndex+1) //scroll to the next section
      TweenLite.to(window, 1 ,{scrollTo: height,
        ease: Expo.easeInOut,
        autoKill:false,
        onStart: function () {
          if(sectionIndex == 0 )
            masterTimeline.tweenTo(sectionArray[sectionIndex]) //animate the intro section
  
          sectionIndex+=1//increment the sectionIndex by 1
          changeActiveMenu(sectionIndex) //change the active menu
          masterStatus = true
          masterTimeline.tweenTo(sectionArray[sectionIndex]).delay(1) //tween to the next section and delay by 1second
        },
        onCompleteParams: [masterTimeline],
        onComplete: function (time) {
          var time =time.tweenTo(sectionArray[sectionIndex])
          setTimeout(() => {
            masterStatus = false
          }, time.duration()*1000+100); //timeout based on the duration of the tween
        }
      })
    }
  };
};


//menu click
$(".menu-container ul li").click(function (e) {
  usingMenu = true;
  var target = e.target.value;

  changeActiveMenu(target) //change the active menu

  $(e.target).addClass("active-menu") //and add the class

  goToSection(target) //go the desired section
})

function goToSection(target) {
  console.log(sectionIndex);

  if(target>2){
    //down
    carouselFunction($(".carousel-paganation ul").find("li").length-1)
  }else if(target<2){
    //up
    carouselFunction(0)
  }


  if(target>=2){
    // console.log("about full!");
    aboutScrollValue = aboutScroll.height - aboutScroll.clientHeight
    aboutCanScrollUp = false
    aboutCanScrollDown = false
    //down
    setAboutProgressValue(1)
  }else if(target ==0){
    aboutScrollValue = 0
    setAboutProgressValue(0)
    // aboutScrollValue = 0
    aboutCanScrollUp = false
    aboutCanScrollDown = false
  }


  if(target==4){
    console.log("about full!");
    workScrollValue = workScroll.height - workScroll.clientHeight
    workCanScrollUp = false
    workCanScrollDown = false
    //down
    setWorkProgressValue(1)
  }
  else if(target <=2){
    workScrollValue = 0
    workCanScrollUp = false
    workCanScrollDown = false
    setWorkProgressValue(0)
  }

  if(target === 4){
    TweenMax.to(".arrow-down", 1, {opacity: 0})
  }else{
    TweenMax.to(".arrow-down", 1, {opacity: 0.8})
  }



  TweenLite.to(window, 1 ,{scrollTo: target*window.innerHeight,
    ease: Expo.easeInOut,
    onStart: function () {
      sectionIndex = target
      if(sectionIndex == 0)
        showIntroTimeline.restart()

      masterStatus = true
      masterTimeline.tweenTo(sectionArray[sectionIndex]).delay(1)
    },
    onComplete: function () {
      setTimeout(() => {
        masterStatus = false
        console.log(sectionIndex);
      }, 1500);
    }
  })
}

$("#down-button").click(function() {
  goToSection(sectionIndex+1)
  changeActiveMenu(sectionIndex+1)
});

function changeActiveMenu(indexNumber) {
  var menuList = $(".menu-container ul").find($("li"));
  $.each(menuList,function (index,element) {
    if($(element).hasClass("active-menu") && index !== indexNumber)
      $(element).removeClass("active-menu")
  })
  $(menuList[indexNumber]).addClass("active-menu")
}

// var upMasterTimeline = new TimelineMax({paused: true})

// upMasterTimeline.to(window,1,{scrollTo: "#work", ease: Expo.easeInOut})

// upMasterTimeline.
