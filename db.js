//------------post data on server-----------------
let image = document.getElementById("image");
let name = document.getElementById("name");
let email = document.getElementById("email");
let btn = document.getElementById("btn");
let display = document.getElementById("display");
let arr = [];
let state = false;
let currentId = null;
async function postData() {
  let obj = {
    image: document.getElementById("image").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };
  try {
    let res = await axios.post("http://localhost:8080/user", obj);
    alert("Submitted");
  } catch (error) {
    console.log(error);
  }
}
btn.addEventListener("click", postData);

//----------------get data from server-------------
async function getData() {
  try {
    let res = await axios.get("http://localhost:8080/user");
    arr = res.data;
    displayData(arr);
    console.log(arr);
  } catch (error) {
    console.log(error);
  }
}
getData();

//-------------display data------------------------
async function displayData(data) {
  data.map((ele) => {
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
displayData(arr);

//-------------Edit-------------------
async function getDataforEdit(data) {
  
  newobj = {
    image: (document.getElementById("image").value = data.image),
    name: (document.getElementById("name").value = data.name),
    email: (document.getElementById("email").value = data.email),
  };
  // console.log(newobj);
  state = true;
  currentId = data.id;
  btn.innerText = "Update";
}
