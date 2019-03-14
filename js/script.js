var highscorestuff=JSON.parse(sessionStorage.getItem("highscore")) || {};
        document.getElementById("scorename").innerHTML=highscorestuff.name || ""
        document.getElementById("scorenamee").innerHTML=highscorestuff.name + " 's" || ""
        document.getElementById("scoretotal").innerHTML=highscorestuff.score || ""
        var startBtn=document.getElementById("start");
        var startDiv=document.getElementById("startbuttondiv")
        var playcard=document.getElementById("playcard")
        var highscorewindow=document.getElementById("highscorewindow")

        playcard.style.display='none'
        highscorewindow.style.display='none'
     
    
    var points=0;
    var seconds=20;
    var isRunning=false;
    var currentword;
    var timer="";
    var words=['julie','cindy','soccer','twizzlers','slurpees','watermelon','tacos','corndogs','blankets','minions','frozen','ruby','janelle','jasmine','slime','singing','school','math','computers','music','cardib','sleep','eat','physics','entropy','happy']
    var randomSelector;

    var highscorecounter=10;
    var isRunningTwo=false;
    var highscoretimer=""

    function highscoretimercount(){
        document.getElementById("highscoretimer").innerHTML=highscorecounter;
        highscorecounter--
        if(highscorecounter === 0){
            location.reload()
        }
    }

    function highscoretimerrun(){
        if(!isRunningTwo){
            isRunningTwo=true;
            highscoretimer=setInterval(highscoretimercount,1000)
        }
    }



    function startGame(){
    randomSelector=Math.floor(Math.random()*words.length)
    currentword=words[randomSelector];

    document.getElementById("currentword").innerHTML=currentword
    document.getElementById("score").innerHTML=points
    document.getElementById("timer").innerHTML=seconds;
    countTimer()
    }

    function count(){
        seconds--;
        document.getElementById("timer").innerHTML=seconds;
        if(seconds === 0){
            clearInterval(timer)
            var output='Game Over! Your Score was ' + points + "!"
            document.getElementById("endgame").innerHTML=output
            if(points > document.getElementById("scoretotal").innerHTML || document.getElementById("scoretotal").innerHTML === "undefined"){
                highscorewindow.style.display='block'
            }
            else{console.log('setimeout set off')
                setTimeout(()=>{location.reload()},3000);}
        }
    }

    function countTimer(){
        if(!isRunning){
            isRunning=true;
            timer=setInterval(count,1000)
        }
    }

       startBtn.addEventListener("click",function(){
        startDiv.style.display='none'
        playcard.style.display='block'
        startGame()
        })

   
   
   var playerInput=document.querySelector("input");
   playerInput.addEventListener("keyup",playGame)
   
   
   function playGame(e){
       var text=e.target.value;
       console.log(text)
       if(text === currentword){
           console.log('nice!')
           document.getElementById('praise').innerHTML="nice!!"
           setTimeout(()=>{
               document.getElementById("praise").innerHTML=""
           },500)
           points++;
           document.getElementById("score").innerHTML=points
           currentword=words[Math.floor(Math.random()*words.length)]
           console.log(currentword)
           document.getElementById("currentword").innerHTML=currentword
           playerInput.value=""
       }
   }

   document.getElementById("highscoreform").addEventListener('click',()=>{
       var scorename=document.getElementById("highscorer").value;
       var highscore=points;
       var highscoreSS={
           name:scorename,
           score:highscore
       }
       sessionStorage.setItem("highscore",JSON.stringify(highscoreSS))
       document.getElementById("scorename").innerHTML=scorename;
       document.getElementById("scoretotal").innerHTML=highscore;  
       highscoretimerrun() 
      // setTimeout(()=>{location.reload()},10000);

   })