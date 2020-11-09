var strXML = `<section class="users-list-wrapper section">
<div class="users-list-filter">
    <div class="card">
    <div class="card-content">
          <h4 class="card-title">Form User Registration</h4>
          <form>
          <div class="row">
              <div class="input-field col m12 s12">
                <input id="username" type="text">
                <label for="username">Username</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col m12 s12">
                <input id="password" type="password">
                <label for="password">Password</label>
                <p>
                  <label>
                    <input id="showpasswd" type="checkbox" />
                    <span>Show Password</span>
                  </label>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col m12 s12">
                <input id="description" type="text">
                <label for="description">Description</label>
              </div>
            </div>
            <div class="row">
              <div class="row">
                <div class="input-field col s12">
                  <button id="submit" class="btn cyan waves-effect waves-light right" type="button" name="action">Submit
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>`;
$(document).ready(function() {

    
    $('.container').html(strXML);
    $('#showpasswd').on('click', function() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    })

    $('#submit').on('click', function() {
        var password = $('#password').val();
        var username = $('#username').val();
        var description = $('#description').val();
        var objData = {
            password: password,
            username: username,
            description: description,
            role: 'guest'
        };
        if (/^[a-zA-Z0-9]*$/g.test(username) && /^[a-zA-Z0-9]*$/g.test(password) && username.length >= 4 && password.length >= 4) {
            $.ajax({
                url: 'http://' + R.hostport + '/add/user',
                type: 'post',
                data: JSON.stringify(objData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
                },
                success: function(data) {
                    alert(data.message)
                    if (data.status == 'true') {
                        window.location.reload()
                    }
                }
            });
        } else {
            alert('Isi data dengan benar');
        }
    });

});

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var isEmpty = function(obj) {
    var arr = Object.keys(obj).filter((head) => {
        return (obj[head] === null || obj[head] === undefined || obj[head] === "");
    })
    if (arr.length > 0) return {
        value: true,
        data: arr
    };
    else return {
        value: false,
        data: arr
    };
}