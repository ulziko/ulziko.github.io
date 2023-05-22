var asuult=[{ques:"Хамгийн том тив",ans:"ази"},{ques:"Хамгийн том нуур",ans:"Нил"},{ques:"Хамгийн том газар нутагтай орон",ans:"Орос"},{ques:"Нарны аймгын хамгийн том гариг",ans:"Бархасбадь"},{ques:"Хамгийн гүн нуур",ans:"Байгаль"},{ques:"Дэлхийн хамгийн өндөр оргил",ans:"Эвэрист"},{ques:"Хамгийн жижиг тив",ans:"Австрали"},{ques:"нарны аймгын хамгийн жижиг гариг",ans:"буд"},{ques:"Хамгийн том амьтан",ans:"халим"},{ques:"Хамгийн хурдан тээврийн хэрэгсэл?",ans:"пуужин"}];
var live=5;
var correct_letter=0;
var asuult_local=[];
var correct_ans=0;
var btns=document.querySelectorAll(".letters>button");
var pictures=["man-1.png", "man-2.png", "man-3.png", "man-4.png", "man-5.png", "dead_hangman.png"].reverse();
var round=document.querySelector(".round");
var live_display=document.querySelector(".live");
var main=document.getElementById("game_core");
var start_button=document.querySelector(".start");
var restart_button=document.querySelector(".restart");
var win_button=document.querySelector(".win");
var start_back=document.querySelector(".start_container");
var restart_back=document.querySelector(".restart_container");
var win_back=document.querySelector(".win_container");
var hangman= document.querySelector(".hangman>img");

btns.forEach((btn)=>{
    btn.onclick= function(event) {
        this.disabled=true;
        button_match(event.target.innerText);
    }
});

async function button_match(letter){   
    var ans=document.querySelectorAll(".answer>button");
    var sub_live=true;
    ans.forEach((btn)=>{
        if(btn.value.toUpperCase()==letter.toUpperCase()){
            btn.innerText=letter;
            correct_letter++;
            sub_live=false;
        }
    });

    if(correct_letter==ans.length){
        correct_ans++;
        round.innerText=correct_ans+1;
        next_ques();
        
    }

    if(sub_live){
        if(live>0){
            draw_hangman(live);
            live--;
            live_display.innerText=live+1;
        }
        else{
            draw_hangman(0);
            live_display.innerText=0;
            await new Promise(r => setTimeout(r, 1000));
            restart();

        }
    }
    if(correct_ans==3){
        win();
    }
}

function draw_hangman(live){
    if (live<pictures.length) {
        hangman.src=pictures[live];
    } 
    return;
}
function reset(){
    live=5;
    correct_ans=0;
    round.innerText=correct_ans+1;
    asuult_local=[...asuult];
    var ans=document.querySelector(".answer");
    ans.innerHTML = "";
    undisable_button();
    reset_hangman();
}

 function start(){
    reset();
    next_ques();
}


function next_ques(){
    correct_letter=0;
    live=5;
    live_display.innerText=live+1;
    var random=Math.floor(Math.random()*asuult_local.length);
    var quiz=document.querySelector("#quiz");
    var node=asuult_local[random];
    quiz.innerText=node.ques;
    add_container(node.ans);
    undisable_button();
    reset_hangman();
    renew(random);
}

// functon adds button container
function add_container(list){
    var ans=document.querySelector(".answer");
    ans.innerHTML="";
    for( var i=0;i<list.length;i++){
        const new_button = document.createElement("button");
        new_button.setAttribute("value", list[i]);
        ans.append(new_button);
    }
}

function undisable_button(){
    var btns=document.querySelectorAll(".letters>button");
    btns.forEach((btn)=>{
        btn.disabled=false;
    });
}

function renew(random){
    temp=asuult_local[asuult_local.length-1];
    asuult_local[asuult_local.length-1]=asuult_local[random];
    asuult_local[random]=temp;
    asuult_local.pop();
    // console.log(asuult_local);
 }

function reset_hangman(){
    hangman.src='man-0.png';
}

function setall(){
    main.style.display="none";
    start_back.style.display="block";
    restart_back.style.display="none";
    win_back.style.display="none";
    start_button.onclick=game;
}
function game(){
    main.style.display="block";
    start_back.style.display="none";
    restart_back.style.display="none";
    win_back.style.display="none";
    start();
}

function restart(){
    start_back.style.display="none";
    main.style.display="none";
    restart_back.style.display="block";
    win_back.style.display="none";
    hangman.style.display="block";
    hangman.src= "dead_hangman.png";
    restart_button.onclick=game;
}

function win(){
    asuult_local=[...asuult, { tty: "kjh"}];
    console.log('======> ', asuult);
    start_back.style.display="none";
    main.style.display="none";
    restart_back.style.display="none";
    win_back.style.display="block";
    win_button.onclick=game;
}
setall();
