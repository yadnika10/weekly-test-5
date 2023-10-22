//Search Text::
let searchText = '13'; 
function Search(isShowAll){
    loading(true);
    let searchField = document.getElementById("searchField");
    searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const loading= (isLoading)=>{
    const loading = document.getElementById("loading");
    if(isLoading){
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }
}

//Load data on search::
const loadPhone = async(searchText,isShowAll) => {
    let promise = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    let data = await promise.json();
    let phones = data.data;
    displayPhones(phones,isShowAll);
}
loadPhone(searchText);

//Phone Cards::
const displayPhones = (phones,isShowAll) => {
    console.log(phones);
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent='';
    console.log(phoneContainer);

    const showAll = document.getElementById("showALLBtn");
    if(phones.length > 12 && !isShowAll){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card`;
        phoneCard.innerHTML = `
        <figure>
            <img src="${phone.image}" alt="phone" class="rounded-xl" />
        </figure>
        <div>
            <h2>${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div>
                <button onclick="showDetailsHandler('${phone.slug}')">Show Details</button>
            </div>
        </div>

    `;
        console.log(phoneContainer.appendChild(phoneCard));
    });
    loading(false);
}
 
// show all button::
function showBtn(){
    Search(true);
}

//show Details::
const showDetailsHandler = async (id) => {
    let promise = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    let data = await promise.json();
    let details = data.data;
    console.log(details);
    showPhoneDetails(details);
}

const showPhoneDetails = (details) => {
    my_modal.showModal();
    const modelName = document.getElementById('detailsPhoneName');
    const brandName= document.getElementById('detailsBrand');
    const detailsSpec= document.getElementById('detailsSpec');
    const releaseDate= document.getElementById('releaseDate');
    const imageDiv= document.getElementById('imgContainer');

    imageDiv.innerHTML=`<img src="${details.image}" alt="">`;
    modelName.innerText = details.name;
    brandName.innerText = `Brand: ${details.brand}`;
    const features = details.mainFeatures;

    let string = "";
    for(const key in features){
        string = string + `${key}: ${features[key]} \n`;
        console.log(string);
    }
    detailsSpec.innerText = string;
    releaseDate.innerText = `${details.releaseDate}`;
}