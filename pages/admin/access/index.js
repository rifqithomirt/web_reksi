$(document).ready(function() {
    $('#headtitle').text('Daftar User')
    $.ajax({
        url: 'http://' + R.hostport + '/get/users',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
        },
        success: function(data) {
            console.log(data)
            var objDataUsers = {};
            var strData = '<tr>' + data.message.map((obj) => {
            	objDataUsers[obj.username] = obj;
                return `<td>` + obj.username + `</td>
                 <td>` + obj.role + `</a></td>
                 <td><span class="chip ` + (obj.status == "aktif" ? 'green' : 'red') + ` lighten-5">
                    <span class="` + (obj.status == "aktif" ? 'green-text' : 'red-text') + `">` + obj.status + `</span>
                  </span></td>
                 <td>` + obj.description + `</td>
                 <td>
                 <a id="edit" data-username="${obj.username}" class="modal-trigger" href="#modal1"><i class="material-icons">edit</i></a>
                 <a href="#"><i class="material-icons">delete</i></a>
                 </td>
                `;
            }).join('</tr><tr>') + '</tr>';
            var strTable =
                ` <section class="users-list-wrapper section">
                <div class="users-list-filter">
                    <div class="card">
                        <div class="card-content">
                            <div class="responsive-table">
                            <table id="table_id" class="display">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${strData}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
             <!-- Modal Structure -->
			  <div id="modal1" class="modal">
			    <div class="modal-content">
			      <h6 class="card-title">Form User Registration</h6>
		          <form>
		          <div class="row">
		              <div class="input-field col m12 s12">
		                <input id="username" type="text">
		                <label for="username" disabled>Username</label>
		              </div>
		            </div>
		            <div class="row">
		              <div class="input-field col m12 s12">
		                <input id="description" type="text">
		                <label for="description">Description</label>
		              </div>
		            </div>
		            <div class="row">
		              <div class="input-field col m12 s12">
		                <select id="role">
		                  <option value="" disabled selected>Pilih Kategori</option>
		                  <option value="admin" >Admin</option>
		                  <option value="guest" >Tamu</option>
		                  <option value="calon" >Calon</option>
		                  <option value="posko" >Posko</option>
		                </select>
		                <label for="role">Category</label>
		              </div>
		            </div>
		            <div class="row">
		              <div class="input-field col m12 s12">
		                <select id="status">
		                  <option value="" disabled selected>Pilih Status</option>
		                  <option value="aktif" >Aktif</option>
		                  <option value="off" >Tidak Aktif</option>
		                </select>
		                <label for="status">Status</label>
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
            `;

            $('.container').html(strTable);

            $('#table_id').DataTable({
                "searching": true
            });
            $('.modal').modal({
            	endingTop: '5%'
            });
            $('#role').formSelect();

            $( "table" ).delegate( "a#edit", "click", function(){
            	var username = $(this).data('username')
            	$('#username').val(objDataUsers[username]['username'])
            	$('#role').val(objDataUsers[username]['role'])
            	$('#description').val(objDataUsers[username]['description'])
            	$('#status').val(objDataUsers[username]['status'])
            	$('#submit').data('uid', objDataUsers[username]['uid'])
            	$('#role').formSelect();
            	$('#status').formSelect();
            	M.updateTextFields();
            })

            $( "form" ).delegate( "#submit", "click", function(){
            	var uid = $('#submit').data('uid');
            	var objUpdated = {
            		'username':$('#username').val(),
            		'role':$('#role').val(),
            		'status':$('#status').val(),
            		'description':$('#description').val()
            	};
            	$.ajax({
		            url: 'http://' + R.hostport + '/update/user?uid=' + uid ,
		            type: 'put',
		            data: JSON.stringify(objUpdated),
		            contentType: "application/json; charset=utf-8",
		            dataType: "json",
		            beforeSend: function(xhr) {
		                xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.replace("token=", ""))
		            },
		            success: function(data) {
		            	alert(data.message)
		            	window.location.reload()
		            }
		        });
            });


        }
    })

});