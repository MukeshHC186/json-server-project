//------------post data on server-----------------
let form=document.getElementById("form")
let image = document.getElementById("image");
let name = document.getElementById("name");
let email = document.getElementById("email");
let btn = document.getElementById("btn");
let display = document.getElementById("display");
let arr = [];
let state = false;
let currentId = null;
async function postData(e) {
  e.preventDefault();
  let obj = {
    image:image.value,
    name: name.value,
    email:email.value,
  };
  try {
    let res = await axios.post("https://json-live-server-new-project.onrender.com/cards", obj);
    alert("Submitted");
    // console.log(res.data);
    form.reset()
    getData()
  } catch (error) {
    console.log(error);
  }
}
btn.addEventListener("click", postData);

//----------------get data from server-------------
async function getData() {
  try {
    let res = await axios.get("https://json-live-server-new-project.onrender.com/cards");
    arr = res.data;
    displayData(arr);
    // console.log(`get data ${arr}`);
  } catch (error) {
    console.log(error);
  }
}
getData();

//-------------display data------------------------
async function displayData() {
  
  display.innerHTML=""
  arr.map((ele) => {
    let div = document.createElement("div");
    let image = document.createElement("img");
    image.src = ele.image;
    let name = document.createElement("h3");
    name.innerText = ele.name;
    let email = document.createElement("h4");
    email.innerText = ele.email;

    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.id = "edit";
    edit.addEventListener("click",()=>{
      getDataforEdit(ele)
    })

    let del = document.createElement("button");
    del.innerText = "Delete";
    del.id = "del";

    div.append(image, name, email, edit, del);
    display.append(div);
  });
}
// displayData(arr);

//-------------Edit-------------------
async function getDataforEdit(data) {
  
  newobj = {
    image:image.src=data.src,
    name: data.value=name.value,
    email:data.value=email.value,
  };
  // console.log(newobj);
  state = true;
  currentId = data.id;
  btn.innerText = "Update";
}
