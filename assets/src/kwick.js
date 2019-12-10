const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
	init: function() {
		console.log('Kwick app is ready to rock !');
		/*alert(localStorage.getItem('time'));

		$('#bt_ping').on('click', app.ping);
	},
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
		});*/
	}
};
