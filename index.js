document.querySelector("#color-picker").addEventListener("click",droper);


const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
//fetch from local storage
const pickedColor = JSON.parse(localStorage.getItem("#color-picker") || "[]");

const copyColor= elem =>
{
    //copies color code
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied";
    setTimeout(()=>elem.innerText= elem.dataset.color,1000);
}

const showColors = ()=>
{
    if(!pickedColor.length)return;//if no color selected 
    colorList.innerHTML= pickedColor.map(color=>`
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#ccc":color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
        `).join("");//generatinf li for picked color and adding it to colorList

        document.querySelector(".picked-color").classList.remove("hide");//show color list by removing class

        //add a click event listner for each color element to copy the color code
        document.querySelectorAll(".color").forEach(li =>
            {
                li.addEventListener("click",e => copyColor(e.currentTarget.lastElementChild));
            });
}
showColors();


async function droper()  
{
    document.body.style.display = "none";
    setTimeout(async () => {
        try {
            const resultElement = document.getElementById("color-picker");
            const eyeDropper = new EyeDropper();
          
            const {sRGBHex} = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);     //copies to clipboard
            //adding color that doesnt conatin already in list
            if(!pickedColor.includes(sRGBHex))
            {
                pickedColor.push(sRGBHex);
                localStorage.setItem("picked-colors",JSON.stringify(pickedColor));
                showColors();
            }
        
        } catch (error) {
                console.log(error);
            }
        
    }, 10);

    document.body.style.display = "block";
    
}

//clearing all picked ele and upadating local storage
const clearItem =

clearAll.addEventListener("click",()=>
{
    pickedColor.length =0;
    document.querySelector(".picked-color").classList.add("hide");//add color list by adding class
    localStorage.setItem("picked-colors",JSON.stringify(pickedColor));
    
});







