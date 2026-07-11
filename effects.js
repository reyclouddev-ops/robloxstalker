// ===============================
// ReyCloud UI Effects
// ===============================

// Ripple Effect
document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        const size = Math.max(this.clientWidth,this.clientHeight);

        ripple.style.width = ripple.style.height = size + "px";

        ripple.style.left =
        e.clientX - this.getBoundingClientRect().left - size/2 + "px";

        ripple.style.top =
        e.clientY - this.getBoundingClientRect().top - size/2 + "px";

        ripple.className = "ripple";

        this.appendChild(ripple);

        setTimeout(()=>{
            ripple.remove();
        },600);

    });

});


// Toast Notification
function toast(text){

    const t = document.createElement("div");

    t.className = "toast";

    t.innerText = text;

    document.body.appendChild(t);

    setTimeout(()=>{
        t.classList.add("show");
    },100);

    setTimeout(()=>{
        t.classList.remove("show");

        setTimeout(()=>{
            t.remove();
        },400);

    },2500);

}

window.toast = toast;


// Copy User ID
const userId = document.getElementById("userId");

if(userId){

userId.style.cursor="pointer";

userId.title="Klik untuk Copy";

userId.onclick=()=>{

if(userId.innerText=="-") return;

navigator.clipboard.writeText(userId.innerText);

toast("User ID berhasil disalin.");

};

}


// Floating Background
const bg=document.querySelector(".bg");

for(let i=0;i<25;i++){

const dot=document.createElement("span");

dot.className="particle";

dot.style.left=Math.random()*100+"%";

dot.style.top=Math.random()*100+"%";

dot.style.animationDelay=Math.random()*8+"s";

dot.style.animationDuration=
6+Math.random()*10+"s";

bg.appendChild(dot);

}
