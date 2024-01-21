const API_LINK='https://api.github.com/users';
let searchBtn=document.querySelector('.search');
let searchElement = document.getElementById("search-term");
var repoValue = document.getElementById("repo");
let searching=document.querySelector('.searching');

var repo=new Array(0);

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(searchElement.value)
    {
        searching.innerHTML='Loading...';
        setTimeout(()=>{
            getUserDetails(`${API_LINK}/${searchElement.value}`);
        },2000);
        setTimeout(()=>{
            getRepoDetails(`${API_LINK}/${searchElement.value}/repos`);
        },1000);
    }
})

function showUserDetails(data){
    var box = document.querySelector(".box-body");
    var repository=``;
    repo.forEach((res)=>{
        res.forEach((e)=>{
        repository+=`<a href="${e.html_url}" target="_blank" class="list-group-item list-group-item-action list-group-item-dark">${e.name}</a>`;
        })
    })
searching.innerHTML="";
    
box.innerHTML=(`
<div class="profile">
    <div class="row">
        
    <div class="about">
        <div class="details">
            <h2 class="name">${data.name}</h2>
            <p class="username">@${data.login}</p>
            <p class="country"><span>${data.location===null ? 'Unknown' : data.location}</p>
        </div>
        <div class="btn-profile">
        <div class="image">
            <img src="${data.avatar_url}" alt="">
        </div>
            
        </div>
    </div>
    </div>
    
    <div class="row-details">
        <div class="col">
            <h3 class="heading">
                Followers
            </h3>
            <p>${data.followers}</p>
        </div>      
        <div class="col">
            <h3 class="heading">
                Repository
            </h3>
            <p>${data.public_repos}</p>
        </div>
        <div class="col">
            <h3 class="heading">
                Github Link
            </h3>
            <p><a class="visit" href="${data.html_url}" target="_blank">Visit</a></p>
        </div>
    </div>
    
    <div class="respos-row">
    <div class="list-group">
        <ul id="repo">
        ${repository}
        </ul>
        </div>
    </div>
    <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>
`);

}

async function getUserDetails(api){
    let query = await fetch(api)
    .then(async (query)=>{
     return await query.json();
    }).then((result)=>{
        console.log(result);
      if(result.name==null){
          alert("User not found");
          location.reload();
      }
      else{
          showUserDetails(result);
      }
    }).catch((error)=>{
        console.log(error)
    })
}

async function getRepoDetails(repi_api){
    let repo_query = await fetch(repi_api)
    .then(async (repo_query)=>{
     return await repo_query.json()
    }).then((repo_result)=>{
    repo=[];
    repo.push(repo_result);
    }).catch((repo_error)=>{
        console.log(repo_error)
    });
}