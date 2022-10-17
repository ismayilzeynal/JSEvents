const createButton=document.getElementById("accept-input");
const productName=document.getElementById("product-name");
const productPrice=document.getElementById("product-price");
const productCount=document.getElementById("product-count");
const productCategory=document.getElementById("categories");
const catagories= ["meiset", "mebel", "elektronika", "usaq", "geyim", "qida"]
const minPrice=document.getElementById("min-price");
const maxPrice=document.getElementById("max-price");
const tableBase=document.getElementById("table-base");
const findButton=document.getElementById("find-btn");
const filterButton1=document.getElementById("filter-btn-1");
const filterButton2=document.getElementById("filter-btn-2");
let products=document.querySelectorAll("#table-base .product");
const minInput=document.getElementById("min-price");
const maxInput=document.getElementById("max-price");
const categoryInput=document.querySelector(".filter-by-category #categories");

createButton.addEventListener("click",createCheck);
filterButton1.addEventListener("click",filterCheck1);
filterButton2.addEventListener("click",filterCheck2);
// findButton.addEventListener("click",findCheck);



function createCheck()
{
    if(!validationOfCreate(productName.value, productPrice.value, productCount.value, productCategory.value))
        invalidInput();
    else
        create();
}



function validationOfCreate(prodName, prodPrice, prodCount, prodCategory){    
    // ilk olaraq yanlis daxil edilme halini yoxlayiriq
    if(nameCheck(prodName) || !priceCheck(prodPrice) ||  countCheck(prodCount) || categoryCheck(prodCategory) || existOfProduct(prodName, prodPrice, prodCount, prodCategory))                                         
        return false;                                                                                                                                                                                                                                           
    return true;
}



function create(){
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("product");
    tableBase.appendChild(mainDiv);

    //Name
    const divName = document.createElement("div");
    mainDiv.appendChild(divName);
    divName.classList.add("col-3");
    divName.classList.add("pr-name");
    let pName = document.createElement("p");
    pName.appendChild(document.createTextNode(productName.value));
    divName.appendChild(pName);

    // Price
    const divPrice = document.createElement("div");
    mainDiv.appendChild(divPrice);
    divPrice.classList.add("col-3");
    divPrice.classList.add("pr-price");
    let pPrice = document.createElement("p");
    pPrice.appendChild(document.createTextNode(productPrice.value));
    divPrice.appendChild(pPrice);

    //Count
    const divCount = document.createElement("div");
    mainDiv.appendChild(divCount);
    divCount.classList.add("col-3");
    divCount.classList.add("pr-count");
    let pCount = document.createElement("p");
    pCount.appendChild(document.createTextNode(productCount.value));
    divCount.appendChild(pCount);

    // Category
    const divCategory = document.createElement("div");
    mainDiv.appendChild(divCategory);
    divCategory.classList.add("col-3");
    divCategory.classList.add("pr-category");
    text=document.createTextNode("Qida");
    let pCategory = document.createElement("p");
    pCategory.appendChild(document.createTextNode(productCategory.value));
    divCategory.appendChild(pCategory);
}



function filterCheck1(){
    if(!priceCheck(minInput.value) || !priceCheck(maxInput.value) || Number(minInput.value) > Number(maxInput.value))
        invalidInput();
    else
    {
        const pricesOfElements=document.querySelectorAll(".product .pr-price p");
        pricesOfElements.forEach(element => {
            if( Number(element.innerHTML) < Number(minPrice.value) || Number(element.innerHTML) > Number(maxPrice.value))
                element.parentElement.parentElement.style.display="none";
        });
    }
}


function filterCheck2(){
    // if(!priceCheck(minInput.value) || !priceCheck(maxInput.value) || Number(minInput.value) > Number(maxInput.value))
    //     invalidInput();
    // else
    // {
    //     const pricesOfElements=document.querySelectorAll(".product .pr-price p");
    //     pricesOfElements.forEach(element => {
    //         if( Number(element.innerHTML) < Number(minPrice.value) || Number(element.innerHTML) > Number(maxPrice.value))
    //             element.parentElement.parentElement.style.display="none";
    //     });
    // }
}






// additional functions

function getCountOfDigits(str){
    return str.replace(/[^0-9]/g, '').length;
}

function nameCheck(prodName){
    return prodName.trim().length === 0;
}

function priceCheck(prodPrice){
    return prodPrice.trim().length !== 0 || prodPrice.length === getCountOfDigits(prodPrice) 
}

function countCheck(prodCount){
    return prodCount.length !== getCountOfDigits(prodCount)
}

function categoryCheck(prodCategory){
    return catagories.find(element => element === prodCategory) === undefined;
}

function invalidInput()
{
    alert("Please input correctly!");
}

function existOfProduct(prodName, prodPrice, prodCount, prodCategory){
    products=document.querySelectorAll("#table-base .product");
    for(i=0; i<products.length; i++){
        if(products[i].childNodes[0].childNodes[0].innerHTML === prodName && products[i].childNodes[1].childNodes[0].innerHTML === prodPrice && products[i].childNodes[2].childNodes[0].innerHTML === prodCount && products[i].childNodes[3].childNodes[0].innerHTML === prodCategory) 
            return true;
    }
    return false;
}