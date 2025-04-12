$.ajax({
    headers: { "Accept": "application/json"},
    type: 'GET',
    url: 'http://cl.ly/2wr4',
    crossDomain: true,
    beforeSend: function(xhr){
        xhr.withCredentials = true;
  },
    success: function(data, textStatus, request){
        console.log(data);
    }
});