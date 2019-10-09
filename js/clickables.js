

// about clickables animations
var aboutClickables = $(".about-clickables").find("li")
var activeAboutClickables = 0
var aboutParagraph = $(".about-paracontainer ul").find("li")
var aboutScroll = {
  container: aboutParagraph[activeAboutClickables],
  height: 0,
  clientHeight:0,
  scrollMade: 0,
}
var aboutCanScrollDown = false; //condition if the user can scroll back the section
var aboutCanScrollUp = false; //condition if the user can scroll to the next section
var aboutScrollValue = 0; //scroll made

var aboutClickTimeline = new TimelineMax({paused: true});
$(".about-clickables li").click(function (e) {
  //clicked clickables index
  var clickedClickables = e.target.value
  //if clicked clickables is not equal to the active and not animating
  if (clickedClickables !== activeAboutClickables && !aboutClickTimeline.isActive()) {
    //target paragraph
    var aboutPara = $(".about-paracontainer ul").find("li")[clickedClickables]
    // current paragraph
    var currentPara = $(".about-paracontainer ul").find("li")[activeAboutClickables]
  
      // move the current paragraph down    
      aboutClickTimeline.to(currentPara,0.7,{top: '100%', ease: Expo.easeInOut})
      
      // if(clickedClickables === 0){
      //   aboutClickTimeline.to(aboutPara,0.7,{top: '0%', ease: Expo.easeInOut})
      // }else
      //move the next paragraph up
        aboutClickTimeline.to(aboutPara,0.7,{top: '0%', ease: Expo.easeInOut})
  
      aboutClickTimeline.play()
      
      //change the active clickables parameter=the clicked clickables index
    changeActiveClickables(clickedClickables)
    //set the active clickables to be the active clickables
    activeAboutClickables = e.target.value
    
    //set the values of the about scroll handler
    aboutScroll.container = $(aboutParagraph[activeAboutClickables]).find("p")[0] //the container
    aboutScroll.height = $(aboutParagraph[activeAboutClickables]).find("p")[0].scrollHeight //height of the overall scroll
    aboutScroll.clientHeight = $(aboutParagraph[activeAboutClickables]).find("p")[0].clientHeight //height of the paragraph container
    aboutScroll.scrollMade = 0 //number of scroll made

    //set the conditions for starters
    aboutCanScrollDown = false; //set the canScrollDown to false so that it won't scroll down
    aboutCanScrollUp = true; //set the canScrollUp to true so that it can go scroll up again if user wants to go back up

    aboutScrollValue= 0 //set back the scrollvalue to zero
    masterStatus = true //add timeout to prevent overlapping animations
    setAboutProgressValue(0) //animate the scroll and progress bar to zero
    
  }
    
})

  function changeActiveClickables(value) {
    //change the active clickables
    //find the clickables that has ".active" class
    var activeClickables = $(".about-clickables").find(".active")
    // remove the class from the last active clickables
    $(activeClickables).removeClass("active")
    // add the ".active" class to the new active clickables
    $(aboutClickables[value]).addClass("active")
  }


  function aboutScrollDownParagraph() {
    //set the values
    aboutScroll.container = $(aboutParagraph[activeAboutClickables]).find("p")[0]
    aboutScroll.height = $(aboutParagraph[activeAboutClickables]).find("p")[0].scrollHeight
    aboutScroll.clientHeight = $(aboutParagraph[activeAboutClickables]).find("p")[0].clientHeight
    aboutScroll.scrollMade = $(aboutScroll.container).scrollTop()
    
    //value of the scroll to be made
    aboutScrollValue= aboutScrollValue+((aboutScroll.height - aboutScroll.clientHeight)/2)
    aboutCanScrollUp = false //set to false so that user can't scroll up

    //once the scrollValue exceeds the value of the possible height set it to the
    //max scrollable value and set the canScrollDown to true so that use
    //can scroll down, at this point user has reached the maximum scrollable value
    if((aboutScroll.height - aboutScroll.clientHeight) <= aboutScrollValue){
      aboutScrollValue = aboutScroll.height - aboutScroll.clientHeight
      aboutCanScrollDown = true
    }

    //make the computation of the percentage of the made scroll to the maximum scrollable value
    var aboutScrollComputation = aboutScrollValue / (aboutScroll.height - aboutScroll.clientHeight)
      masterStatus = true // set masterStatus to true to have the timeout active;
      setAboutProgressValue(aboutScrollComputation) //animate the scroll and set the value of the progress

  }

  function aboutScrollUpParagraph() {
    
    //set the values
    aboutScroll.container = $(aboutParagraph[activeAboutClickables]).find("p")[0]
    aboutScroll.height = $(aboutParagraph[activeAboutClickables]).find("p")[0].scrollHeight
    aboutScroll.clientHeight = $(aboutParagraph[activeAboutClickables]).find("p")[0].clientHeight
    aboutScroll.scrollMade = $(aboutScroll.container).scrollTop()

    //value of the scroll made as user scrolls up
    aboutScrollValue= aboutScrollValue-((aboutScroll.height - aboutScroll.clientHeight)/2)
    aboutCanScrollDown = false; //set false so that user won't go to the next section

    //once the aboutScrollValue is lower than 0 set the scroll value to 0 so that we won't have
    //negative value and set the canScrollUp to true so that user can scroll up,
    //at this point user has reached back to top.
    if(aboutScrollValue <= 0){
      aboutScrollValue = 0
      aboutCanScrollUp = true
    }

    //make the computation of the made scroll
    var aboutScrollComputation = aboutScrollValue / (aboutScroll.height - aboutScroll.clientHeight)
    
      masterStatus = true
      setAboutProgressValue(aboutScrollComputation)//animate the scroll and set the value of the progress

  }

  function setAboutProgressValue(aboutScrollComputation) {
    
    //animate the scroll based of the scrolled value
    //animate the progress bar based on the computation and multiply it by 100
    TweenLite.to($(aboutScroll.container), 1 ,{scrollTo:aboutScrollValue,
      onStart: function () {
        $("#about-progress-bar").css("width",aboutScrollComputation * 100+"%")
      },
      onComplete: function () {
        setTimeout(() => {
          masterStatus = false
          // console.log("object");
        }, 300);
      }
    })
  }



  //===============================WORK ANIMATIONS===============================\\



// work clickables animations
var workClickables = $(".work-clickables").find("li")
var activeWorkClickables = 0
var workParagraph = $(".work-paracontainer ul").find("li")
var workScroll = {
  container: workParagraph[activeWorkClickables],
  height: 0,
  clientHeight:0,
  scrollMade: 0,
}
var workCanScrollDown = false; //condition if the user can scroll back the section
var workCanScrollUp = false; //condition if the user can scroll to the next section
var workScrollValue = 0; //scroll made

var workClickTimeline = new TimelineMax({paused: true});
$(".work-clickables li").click(function (e) {
  var clickedWork = e.target.value //clicked clickables index
  
  //if clicked clickables is not equal to the active and not animating
  if(clickedWork !== activeWorkClickables && !workClickTimeline.isActive()){
    var workPara = $(".work-paracontainer ul").find("li")[clickedWork] //target paragraph
    var workCurrent = $(".work-paracontainer ul").find("li")[activeWorkClickables] //current paragraph
    workClickTimeline.to(workCurrent,1,{top: '100%', ease: Expo.easeInOut})//animate the current paragraph down
    
    // if(clickedWork === 0){
    //   workClickTimeline.to(workPara,1,{top: 0, ease: Expo.easeInOut})
    // }else
    
    workClickTimeline.to(workPara,1,{top: 0, ease: Expo.easeInOut})//animate the target paragraph up
  
    workClickTimeline.play()

    changeWorkActiveClickables(clickedWork) //change the active clickables parameter=the clicked clickables index
    activeWorkClickables = e.target.value //set the active clickables to be the active clickables
    workScroll.container = $(workParagraph[activeWorkClickables]).find("p")[0] //the container
    workScroll.height = $(workParagraph[activeWorkClickables]).find("p")[0].scrollHeight //height of the overall scroll
    workScroll.clientHeight = $(workParagraph[activeWorkClickables]).find("p")[0].clientHeight //height of the paragraph container
    workScroll.scrollMade = 0 //number of scroll made

    //set the conditions for starters
    workCanScrollDown = false;//set the canScrollDown to false so that it won't scroll down
    workCanScrollUp = true;//set the canScrollUp to true so that it can go scroll up again if user wants to go back up

    workScrollValue= 0 //set back the scrollvalue to zero
    masterStatus = true //add timeout to prevent overlapping animations
    setWorkProgressValue(0) //animate the scroll and progress bar to zero
  }
    
})

function changeWorkActiveClickables(value) {
  //change the active clickables
  var activeWork = $(".work-clickables").find(".active")//find the clickables that has ".active" class
  $(activeWork).removeClass("active")//remove the class from the last active clickables
  $(workClickables[value]).addClass("active")// add the ".active" class to the new active clickables
}



function workScrollDownParagraph() {
  //set the values
  workScroll.container = $(workParagraph[activeWorkClickables]).find("p")[0]
  workScroll.height = $(workParagraph[activeWorkClickables]).find("p")[0].scrollHeight
  workScroll.clientHeight = $(workParagraph[activeWorkClickables]).find("p")[0].clientHeight
  workScroll.scrollMade = $(workScroll.container).scrollTop()
  
  //values of the scroll made
  workScrollValue= workScrollValue+((workScroll.height - workScroll.clientHeight)/2)
  workCanScrollUp = false //set to false so that user can't scroll up

  //once the scrollValue exceeds the value of the possible height set it to the
  //max scrollable value and set the canScrollDown to true so that use
  //can scroll down, at this point user has reached the maximum scrollable value
  if((workScroll.height - workScroll.clientHeight) <= workScrollValue){
    workScrollValue = workScroll.height - workScroll.clientHeight
    workCanScrollDown = true
  }

  //make the computation of the percentage of the made scroll to the maximum scrollable value
  var workScrollComputation = workScrollValue / (workScroll.height - workScroll.clientHeight)

  masterStatus = true // set masterStatus to true to have the timeout active;
  setWorkProgressValue(workScrollComputation) //animate the scroll and set the value of the progress

}

function workScrollUpParagraph() {
  
  //set the values
  workScroll.container = $(workParagraph[activeWorkClickables]).find("p")[0]
  workScroll.height = $(workParagraph[activeWorkClickables]).find("p")[0].scrollHeight
  workScroll.clientHeight = $(workParagraph[activeWorkClickables]).find("p")[0].clientHeight
  workScroll.scrollMade = $(workScroll.container).scrollTop()

  //value of the scroll made as user scrolls up
  workScrollValue= workScrollValue-((workScroll.height - workScroll.clientHeight)/2)
  workCanScrollDown = false; //set false so that user won't go to the next section

  //once the aboutScrollValue is lower than 0 set the scroll value to 0 so that we won't have
  //negative value and set the canScrollUp to true so that user can scroll up,
  //at this point user has reached back to top.
  if(workScrollValue <= 0){
    workScrollValue = 0
    workCanScrollUp = true
  }

  //make the computation of the made scroll
  var workScrollComputation = workScrollValue / (workScroll.height - workScroll.clientHeight)
  
  masterStatus = true
  setWorkProgressValue(workScrollComputation)//animate the scroll and set the value of the progress

}

function setWorkProgressValue(workScrollComputation) {
  //animate the scroll based of the scrolled value
  //animate the progress bar based on the computation and multiply it by 100
  TweenLite.to($(workScroll.container), 1 ,{scrollTo:workScrollValue,
    onStart: function () {
      $("#work-progress-bar").css("width",workScrollComputation * 100+"%")
    },
    onComplete: function () {
      setTimeout(() => {
        masterStatus = false
        // console.log("object");
      }, 300);
    }
  })
}
