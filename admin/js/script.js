var titles = Array.from(document.querySelectorAll('li.titles'));
var navbar = document.getElementById('navbar');
var cont = document.getElementById('cont');
var sCard = document.createElement("div");
titles.forEach(ttl=>{
	ttl.addEventListener('click',e=>{
		e.preventDefault();
		var c = ttl.childNodes;
		if (c.length != 3) {
			if (c[3].classList.contains('hidden')) {
				c[3].classList.remove('hidden');
				ttl.classList.add('expand');

			}else{
				c[3].classList.add('hidden');
				ttl.classList.remove('expand');
			}
		}
	})
})
var input = Array.from(document.getElementsByTagName('input'));
var select = Array.from(document.getElementsByTagName('select')); 
input.forEach(e=>{
	e.addEventListener('focus',f=>{
		var parent = e.parentNode;
		var placeholder = parent.childNodes[5];
		if (parent.childNodes.length > 5) {
			placeholder.classList.remove('hidden');
		}
		parent.classList.add('focus');
	})
})

input.forEach(e=>{
	e.addEventListener('blur',f=>{
		var parent = e.parentNode;
		var placeholder = parent.childNodes[5];
		if(e.value == ''){
			if (parent.childNodes.length > 5) {
				placeholder.classList.add('hidden');
			}
			parent.classList.remove('focus');
		}
	})
})
var pform = document.getElementById('pform');
pform.addEventListener('submit', e=>{
	e.preventDefault();
	let formdata = new FormData();
	var pname = document.getElementById('pname').value.trim();	
	var category = document.getElementById('category').value.trim();
	var minquantity = document.getElementById('minquantity').value.trim();
	var maxquantity = document.getElementById('maxquantity').value.trim();
	var pvolume = document.getElementById('pvolume').value.trim();

	var alcvolume = document.getElementById('alcvolume').value.trim();
	var pimg = document.getElementById('pimg').files[0];
	var pprice = document.getElementById('pprice').value.trim();
	formdata.append('pname',pname);
	formdata.append('category',category);
	formdata.append('minquantity',minquantity);
	formdata.append('maxquantity',maxquantity);
	formdata.append('pvolume',pvolume);
	formdata.append('alcvolume',alcvolume);
	formdata.append('pimg',pimg);
	formdata.append('pprice',pprice);	
	formdata.append('addprod','true');
	$.ajax({
 	  url: 'server/server.php',
      type: 'post',
      data: formdata,
      contentType: false,
      processData: false,
      success: function (res) {
      	pform.reset();
      	input.forEach(e=>{
      		parent=e.parentNode;
      		parent.classList.remove('focus');
      	})
      	select.forEach(e=>{
      		parent=e.parentNode;
      		parent.classList.remove('focus');
      		if (parent.childNodes.length > 5) {
				placeholder.classList.add('hidden');
			}
      	})
      	cont.appendChild(sCard);
      	addsCard(res,sCard);
		setTimeout(removecard,2000,sCard);
     } 
  });
})
function removecard(sCard) {
			sCard.classList.remove('add-success');
			sCard.classList.add('remove-success');
			sCard.classList.remove('mt-100p');
			setTimeout(deleteCard,1000,sCard); 
		}
function deleteCard(sCard) {
			cont.removeChild(sCard);
}
function addsCard(message,sCard) {
	sCard.className = "success-card p-a";
	cards = Array.from(document.querySelectorAll('div.success-card'));
	if (cards.length <= 1) {
		sCard.className = "card success-card w-a h-20p p-a mt-100p bc-white br-20p p-10p cntr t-0 zi-100 tr-0-4 add-success ovh";
		var scard_hol = document.createElement('div');
		sCard.appendChild(scard_hol);
		scard_hol.classList.add('w-a');
		scard_hol.classList.add('h-a');
		scard_hol.innerHTML = `<span class='left center w-40p l-0 h-100 bc-white p-a green igrid t-0  '><svg version="1.1" class="w-20p h-20p" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="fill: var(--green);" xml:space="preserve"><g><g id="check_x5F_alt"><path style="fill: var(--green);"d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383 L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z"/></g></g></svg></span><span class=' horizontal igrid right w-a  h-100 mt--1p zi--1 p-r black verdana ml-30p mr-5p'>${message}</span>`;
		setTimeout(removecard,2000,sCard);	
	}else{
		for(var b = 1 ; b < cards.length; b++){
			cont.removeChild(cards[b]);
		}
	}
	
}

