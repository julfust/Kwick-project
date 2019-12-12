const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
	init: function() {
		console.log('Kwick app is ready to rock !');

		/*Ensemble des selecteur JQuery déclencheur des différents fonctions */
		$('#bt_ping').on('click', app.ping);
		$('#create').on('click', app.signup);
		$('#connexion').on('click', app.login);
		$('#button-ctnr').on('click', app.disconect);
	},

	/* Fonction permettant de renvoyer le temps de réponse au serveur (Liée à la page index.html) */
	ping: function() {
		$.ajax({
			url: app.kwick_api_url + 'ping',
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				console.log(result);
				localStorage.setItem('time', result.kwick.completed_in);
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},

	/* Fonction permettant de créer un compte (liée à la page inscription.html) */
	signup: function(){

		let pseudo = $('#pseudo').val();
		let pass = $('#pass').val();
		let confirmation_pass = $('#confirmation').val();

		if(pseudo)	$('#pseudo').css('border', '');
		if(pass)	$('#pass').css('border', '');
		if(confirmation_pass)	$('#confirmation').css('border', '');		

		if(pass == confirmation_pass){

			$.ajax({
				url: app.kwick_api_url + 'signup/' + pseudo + '/' + pass,
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					console.log(result);
					alert(result.result.message);

					if(result.result.status == "done"){
						localStorage.setItem('id', result.result.id);
						localStorage.setItem('token', result.result.token);
						localStorage.setItem('time', result.kwick.completed_in);
						window.location.href = 'messagerie.html';
						return false;
					}

					else{
						$('#pseudo').css('border-color', 'red');
					}
				},

				error: function(xhr, status, error) {
					alert('Erreur: Veuillez renseigner tout les champs du formulaire');
					if(!(pseudo))	$('#pseudo').css('border-color', 'red');
					if(!(pass))	$('#pass').css('border-color', 'red');
					if(!(confirmation_pass))	$('#confirmation').css('border-color', 'red');
				}
			});
		}

		else{
			alert("Les champs des mots de passe ne sont pas identique, veuillez recommencer");
			$('#confirmation').css('border-color', 'red');
			$('#pass').css('border-color', 'red');
		}
	},

	/* Fonction permettant de se connecter à partir d'un login et d'un mots de passe */
	login: function(){
		
		let pseudo = $('#pseudo').val();
		let pass = $('#pass').val();

		$.ajax({
			url: app.kwick_api_url + 'login/' + pseudo + '/' + pass,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				console.log(result);
				alert(result.result.message);

				if(result.result.status == "done"){
					localStorage.setItem('time', result.kwick.completed_in);
					localStorage.setItem('id', result.result.id);
					localStorage.setItem('token', result.result.token);
					window.location.href = 'messagerie.html';
					return false;
				}

				else{
					$('#pseudo').css('border-color', 'red');
					$('#pass').css('border-color', 'red');
				}
			},

			error: function(xhr, status, error) {
				alert('Erreur : Veuillez renseigner tout les champs');
				$('#pseudo').css('border-color', 'red');
				$('#pass').css('border-color', 'red');
			}
		});
	},

	/*Fonction permettant de se déconnecter en utilisant le token (liée à la page messagerie.html) */
	disconect: function() {
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('id');

		$.ajax({
			url: app.kwick_api_url + 'logout/' + token + '/' + id,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				console.log(result);
				localStorage.setItem('id', '');
				localStorage.setItem('token', '');
				localStorage.setItem('time', result.kwick.completed_in);
				window.location.href = 'index.html';
            	return false;
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	},

	/* Fonction permettant d'afficher l'ensemble des utilisateurs connectés */
	/*
	logged: function(){
		let token = localStorage.getItem('token');

		$.ajax({
			url: app.kwick_api_url + 'user/logged/' + token,
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				console.log(result);

				for(let i = 0; i < 10; i++){
					$(".contact-item").after("<div class=\"contact-item\"><img src=\"assets/img/logo-contact.png\" /><p>" + result.result.user[i] + "</p></div>");
				}
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		})
	}*/
}