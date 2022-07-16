



const view = {


  infoCardDisplay(data){
    const displayArea = document.querySelector(".display-card");
    let htmlCode = "";
    htmlCode += `
    <div class="card-info">
      <div class="avatar">
        <img class="card-avatar" data-id="${data.id}" src="${data.photos[0] || '/findPets/images/14.png'}" alt="card-avatar">
      </div>
      <p>Contact Person  ${data.ownerName}</p>
      <p>Contact Information  ${data.contactType} ${data.contactInput}</p>
      <p>Pet Name  ${data.petName}</p>
      <p>Pet Type  ${data.petType}</p>
      <p>Pet Gender  ${data.petGender}</p>
      <p>Lost Location  ${data.lostLocation}</p>
    </div>
    `
    displayArea.innerHTML = htmlCode;
  },
  renderCardContainer(data){ //用頁數找
    const cardContainer = document.querySelector(".card-container");
    let htmlCode = "";
    let contactHtml = "";
    data.forEach(item => {
      htmlCode += `
      <div class="display-card">
        <div class="card-info">
          <div class="avatar">
            <img class="card-avatar" data-id="${item.id}" src="${item.photos[0]}" alt="card-avatar">
          </div>
          <p>Contact Person: ${item.ownerName}</p>
          <p>Contact Information: </br>
          ${item.contactType} ${item.contactInput}</p>
          <p>Pet Name: ${item.petName}</p>
          <p>Pet Type: ${item.petType}</p>
          <p>Pet Gender: ${item.petGender}</p>
          <p>Lost Location: ${item.lostLocation}</p>
        </div>
        <div class="card-btn">
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
      `
    })

    cardContainer.innerHTML = htmlCode;
  },
  renderModal(data , id , panel){
    //讀取所有該card的上傳照片放在album裡面
    let albumHtml = "";
    let i = 0;
    data.photos.forEach(item => {

      albumHtml += `<img class="album-photo" data-cardId="${id}" data-photoId="${i++}" src="${item}" alt="card-avatar">`
    })

    let htmlCode = "";
    htmlCode += `
      <div class="info">
        <img class="card-avatar" src="${data.photos[0] || '/findPets/images/14.png'}" alt="card-avatar">
        <p>Contact Person ${data.ownerName}</p>
        <p>Contact Information ${data.contactType} ${data.contactInput}</p>
        <p>Pet Name ${data.petName}</p>
        <p>Pet Type ${data.petType}</p>
        <p>Pet Gender ${data.petGender}</p>
        <p>Lost Location ${data.lostLocation}</p>
      </div>

      <div class="show-image">
        <div class="image-frame">
          <img src="${data.photos[0] || '/findPets/images/14.png'}" alt="">    
        </div>
        <p>my pet is so cute.</p>
      </div>

      <div class="album">
        ${albumHtml}
      </div>
    `

    panel.innerHTML = htmlCode;
  },
  renderModalPhoto(panel , data , index ){
    let htmlCode = "";
    htmlCode += `
      <div class="image-frame">
        <img src="${data.photos[index]}" alt="">    
      </div>
      <p>my pet is so cute.</p>
    `
    panel.innerHTML = htmlCode;
  }

}



const model = {
  contactAddBtn : document.querySelector(".add-contact"),
  submitBtn : document.querySelector("#submit"),
  ownerName : (document.querySelector("#owner-name")),
  petName : document.querySelector("#pet-name"),
  petType : document.querySelector("#pet-type"),
  contactType : document.querySelector("#contact-type"),
  contactInput : document.querySelector("#contact-input"),
  lostLocation : document.querySelector("#lost-location"),
  previewPhotoArea : document.querySelector(".show-photo"),
  petPhotoInput : document.querySelector("#photo-input"),
  modal : document.querySelector(".modal-hidden"),

  serialNumber : 10,
  photos : [],
  petCards : [
    new Petcard (00 , "system" , ["email"] , ["sys@tem"] , "sys" , "dog" , "male" , "Taipei" , ["/findPets/images/04.png" , "/findPets/images/04.png"]),
    new Petcard (01 , "mike" , ["email"] , ["abc@123"] , "BOBO" , "dog" , "male" , "Taipei" , ["/findPets/images/20.png" , "/findPets/images/38.png"]),
    new Petcard (02 , "kiwi" , ["mobile"] , ["091100"] , "CC" , "dog" , "female" , "NewTaipei" , ["/findPets/images/37.png" , "/findPets/images/40.png"]),
    new Petcard (03 , "judy" , ["line"] , ["j111222"] , "yuki" , "cat" , "female" , "Hsinchu" , ["/findPets/images/38.png" , "/findPets/images/39.png"]),
    new Petcard (04 , "mary" , ["line"] , ["moooppp"] , "momo" , "bird" , "female" , "Miaoli" , ["/findPets/images/39.png" , "/findPets/images/04.png"]),
    new Petcard (05 , "viki" , ["mobile"] , ["091253"] , "raw" , "dog" , "male" , "New Taipei" , ["/findPets/images/37.png" , "/findPets/images/40.png"]),
    new Petcard (06 , "yun" , ["mobile"] , ["091789"] , "fix" , "bird" , "male" , "New Taipei" , ["/findPets/images/20.png" , "/findPets/images/04.png"]),
    new Petcard (07 , "kim" , ["mobile"] , ["091888"] , "dafi" , "cat" , "female" , "Taipei" , ["/findPets/images/40.png" , "/findPets/images/20.png"]),
    new Petcard (08 , "tac" , ["facebook"] , ["tac01"] , "dafi" , "reptile" , "not-sure" , "Taoyuan" , ["/findPets/images/20.png" , "/findPets/images/37.png"]),
    new Petcard (09 , "gigi" , ["facebook"] , ["g1230"] , "jojo" , "bird" , "not-sure" , "Hsinchu" , ["/findPets/images/20.png" , "/findPets/images/39.png"]),
    new Petcard (10 , "wayne" , ["email"] , ["wan@123"] , "lucky" , "cat" , "male" , "Miaoli" , ["/findPets/images/20.png" , "/findPets/images/04.png"]),
  ],

  

  itemsPerPage : 8,

  getPetGender(){
    const genders = [...document.querySelectorAll(".gender-radio")];
    for (let i in genders){
      //遍歷所有選項 看哪個含有checked
      if (genders[i].classList.contains("checked")){
        return genders[i].value;
      }
    }
  },

  getItemsByPage (page) {
    //輸入第幾頁 獲取該頁資料
    let start = model.itemsPerPage * ( page - 1 ) + 1;
    let end = model.itemsPerPage * page + 1;
    let filteredData = model.petCards.slice( start , end );
    return filteredData;
  },

  saveCardInfo(){
    return new Petcard(model.serialNumber+=1 , model.ownerName.value , model.contactType.value , model.contactInput.value , model.petName.value , model.petType.value , model.getPetGender() , model.lostLocation.value , model.photos);
  }
}
//可以切換頁面
//model.getItemsByPage(2);

function Petcard(id , ownerName , contactType , contactInput , petName , petType , petGender , lostLocation , photos){
    this.id = id,
    this.ownerName = ownerName,
    this.contactType = contactType,
    this.contactInput = contactInput,
    this.petName = petName,
    this.petType = petType,
    this.petGender = petGender,
    this.lostLocation = lostLocation,
    this.photos = photos
}



const controll = {

  onGenderSelected(){
    const genderForm = document.querySelector(".gender");
    genderForm.addEventListener("click" , e =>{

      if (e.target.matches(".gender-radio")){
        const options = [...document.querySelectorAll(".gender-radio")];
        options.forEach (item =>{
          item.classList.remove("checked");
        })
        e.target.classList.add("checked")
      }

    })
  },

  onPhotoUploadChanged (photoDisplayPanel , photoInput) {

    photoInput.addEventListener( "change" , e => {

      for (let i = 0; i < e.target.files.length; i++){

        const reader = new FileReader();
        
        reader.readAsDataURL(e.target.files[i]);
        // reader.readAsArrayBuffer(e.target.files[i]);
        
        reader.addEventListener("load" , e => {
          //預覽所有上傳圖片
          photoDisplayPanel.innerHTML += `<img class="photo-preview" src="${e.target.result}">`;
          
          //暫存所有上傳圖片
          model.photos.push(e.target.result);
          
          // let result = Array.from(new Uint8Array(e.target.result)) ;
          // let J = JSON.stringify(result);

          // console.log(J.length);

        })
      }
      
    })
  },


  onSubmitted () {
    model.submitBtn.addEventListener("click" , e => {
      e.preventDefault();
      let newData = model.saveCardInfo();
      //render a card
      // view.infoCardDisplay( model.ownerName.value , model.contactType.value , model.contactInput.value , model.petName.value , model.petType.value , model.getPetGender() , model.lostLocation.value);
      view.infoCardDisplay(newData);
      //save information
      model.petCards.push(newData);
      console.log(model.petCards);
      
        //清空暫存
      model.photos = [];
      //render all cards

      
    })
  },

  onAvatarClicked(){
    const displayCard = document.querySelector(".card-container");
    displayCard.addEventListener("click" , e => {
      if (e.target.matches(".card-avatar")){
        //如果id跟indexof的值不同的話  就要用find來找

        view.renderModal(model.petCards[e.target.dataset.id] , e.target.dataset.id , model.modal);
        model.modal.classList.remove("modal-hidden");
      }
    })
  },

  closeModal(){
    document.addEventListener("click" , e => {
      if (e.target.matches(".card-avatar")) return;
      else if (e.target.closest(".modal")) return;

      
      model.modal.classList.add("modal-hidden");
    })
  },

  onModalPhotoClicked(){
    model.modal.addEventListener("click" , e => {
      if(!e.target.matches(".album-photo")) return;
      const modalShowImage = document.querySelector(".show-image");

      let cardId = Number(e.target.dataset.cardid);
      view.renderModalPhoto(modalShowImage , model.petCards[cardId] , e.target.dataset.photoid);
    })


    model.modal.addEventListener("scroll" , e => {
      if(e.target.matches(".modal")) return;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(scrollTop);
    })
  }
}

view.renderCardContainer(model.getItemsByPage(1));
controll.onSubmitted();
controll.onGenderSelected();
controll.onPhotoUploadChanged(model.previewPhotoArea , model.petPhotoInput);
model.getPetGender();



controll.onAvatarClicked();
controll.closeModal();
controll.onModalPhotoClicked();