var requete = document.getElementById("requete");
var add_Btn = document.getElementById("add_Btn");
var del_Btn = document.getElementById("del_Btn");

del_Btn.addEventListener('click', () =>
{
	var div = document.getElementsByClassName("video2")[0];
	div.remove();
});

var query = null;

//console.log(add_Btn.value);
add_Btn.addEventListener('click', () => {
	if (requete.value.length != 0){
		if (testLigne(requete.value)){
			createLigne(requete.value);
			ecriturelocal();
		}else{
			alert("requete deja existante !")
		}
		
	}else{
		alert("requete vide");
	}

});
function testLigne(data){
	let test = true;
	let index = document.getElementsByClassName("request").length;
	for (let i=0;i<index;i++){
		if (document.getElementsByClassName("request")[i].textContent == data){test=false}
	}
	return test
}

function ecriturelocal() {

    let requete = new Array();
	let index = document.getElementsByClassName("request").length;
	for (let i=0;i<index;i++){
		requete.push(document.getElementsByClassName("request")[i].textContent)
	}
	
    if(typeof localStorage != "undefined" && JSON){


        localStorage.setItem("Requetes",JSON.stringify(requete));
		//console.log(requete);
    }
    else {
        alert("local Storage non suporte sur ce navigateur !");
    }
}

function createLigne(data){
	
	let div = document.createElement("div") 
	div.classList.add("request__Grp");
	select.appendChild(div);

	let option = document.createElement("button");
	option.addEventListener('click',function(){
		let index = this.parentNode.children.length;
		query=null;
		for (var i = 0; i < index; i++) {
			if (this.parentNode.children[i].tagName == "SPAN"){
				query=encodeURI("q=" + this.parentNode.children[i].textContent);

				//console.log(query);
				appelRequete();
			}
		 }
	});
	option.textContent = "select";
	option.classList.add("btn-secondary");
	option.classList.add("btn");
	div.appendChild(option);

	option = document.createElement("button");
	option.addEventListener('click', function() {
		this.parentElement.remove();
		ecriturelocal();
	});
	option.textContent = "dell";
	option.classList.add("btn-secondary");
	option.classList.add("btn");
	div.appendChild(option);

	option = document.createElement("span");
	option.textContent = data;
	option.classList.add("request");
	option.classList.add("text-uppercase");
	div.appendChild(option);

}
function lecturelocal() {
	
    if(typeof localStorage != "undefined"){  
        
        let coordonne = JSON.parse(localStorage.getItem("Requetes"));
		console.log(coordonne);
		for(let i = 0; i<coordonne.length;i++){

			createLigne(coordonne[i]);
		}
    }
    else {
        alert(encodeURI("local Storage non suporte sur ce navigateur !"));
    }    
}
//var query = encodeURI(("q=trail OR hiking OR "course a pieds" OR "course de fond" OR athletisme");
var query = encodeURI("q=minimalisme OR minimaliste OR frugalisme OR frugaliste OR econome");

function appelRequete()
{
	var maxResult = "maxResults=12";
	var order = "order=date";
	var region = "regionCode=FR";
	var key = "key=AIzaSyDrFB7_UUVM6f1AOHZ3F3xS_Ima5K6WSBQ";
console.log("requete : " +maxResult+"&"+order+"&"+query+"&"+region);
	var xhr = new XMLHttpRequest;
	xhr.open("GET",`https://youtube.googleapis.com/youtube/v3/search?${maxResult}&${order}&${query}&${region}&${key}`,true );

	xhr.send(null);

	xhr.onreadystatechange = function() {
    	if ((xhr.readyState==4) && ((xhr.status==200)||(xhr.status==0))){
        	/*On déporte le code de traitement de la réponse 
        	dans la fonction nommée ici Callback*/
        	callback(xhr.response);
    	}
	}
}
function callback(data){
	console.log(JSON.parse(data));
	var donnes = JSON.parse(data);

	var div = document.getElementById("video");
	
	var div2 = document.createElement("div") 
	div2.classList.add("video2");
	div.appendChild(div2);
	
	//let div = document.getElementById("video");
	
	 
	//div.removeChild(childNodes.firstChild);
	//console.log(donnes.items[2].id.videoId);
	for (var i = 0;i<=12;i++){
		let retour = donnes.items[i].id.videoId;
		
		let option = document.createElement("iframe");
		option.width=320;
		option.height=240;
		option.src=`https://www.youtube.com/embed/${retour}`;
		option.title="YouTube video player";
		option.frameborder=0;
		option.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		option.allowfullscreen=true;
		option.textContent = data;
		option.classList.add("recherche");
		div2.appendChild(option);
	}

}