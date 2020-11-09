$(document).ready(async function() {
    $('#headtitle').text('Daftar Role Akses')
    var roles = await R.aget(`http://${R.hostport}/get/roles`, document.cookie.replace("token=", ""))
    var objRoles = {}
    var objRolesArray = {}
    roles.message.forEach(function(obj) {
        console.log(obj)
        if (!(obj.rolename in objRoles)) {
            objRoles[obj.rolename] = []
            objRolesArray[obj.rolename] = []
        }
        console.log(obj.roles)
        var roleList = JSON.parse(obj.roles);
        objRolesArray[obj.rolename] = roleList;
    })
    console.log(objRolesArray)
    
    var arrRoles = R.ROLES.map(function(menu) {
        return [ 
                menu.nama,
                menu.link,
                `<label>
                    <input type="checkbox" class="filled-in" data-link="${menu.link}" disabled="disabled"/>
                    <span></span>
                </label>`,
                    `<label>
                    <input type="checkbox" class="filled-in" data-link="${menu.link}" disabled="disabled" />
                    <span></span>
                </label>`,
                    `<label>
                    <input type="checkbox" class="filled-in" data-link="${menu.link}" disabled="disabled" />
                    <span></span>
                </label>` ]
    });
    var strSelectRole = R.panelTop({
        str:    `<div class="row ">
                    <div class="input-field col m8 s8">
                        <select id="rolename">
                          <option value="" disabled selected>Pilih Nama Role Akses</option>
                          ${ Object.keys(objRolesArray).map(function( rolename ){
                            return `<option value="${rolename}">${rolename.toUpperCase()}</option>`
                          }).join('') }
                        </select>
                        <label for="rolename">Nama Akses</label>
                    </div>
                    <div class="input-field col m2 s2">
                        <a class="waves-effect waves-light btn" id="save">Save</a>
                   </div>
                   <div class="input-field col m2 s2">
                        <a class="waves-effect waves-light btn modal-trigger" id="add" href="#modalRole">Add</a>
                   </div>
                </div>`
    })
    $('.container').html(strSelectRole);
    $('#rolename').formSelect();
    var str = R.createTable({
        head: [
            { 'label': 'Nama Akses', 'varname': 'rolename' },
            { 'label': 'Menu', 'varname': 'menu' },
            { 'label': 'View', 'varname': 'view'},
            { 'label': 'Edit', 'varname': 'edit'},
            { 'label': 'Delete', 'varname': 'delete'}
        ],
        data: []
    })
    $('.container').append(str);
    instanceTable = $('#table_id').DataTable({
        "searching": false,
        "responsive": true,
        "paging": false
    });
    arrRoles.forEach(function( data ){
        instanceTable.row.add(data).draw(false)
    });
    $('#save').attr('disabled', 'disabled');
    $('#rolename').on('change', function(){
        $('#save').removeAttr('disabled', 'disabled');
        var namarole = $('#rolename').val()
        if( namarole != '' ) {
            instanceTable.clear().draw();
            var objMenus = objRolesArray[namarole];
            R.ROLES.map(function(menu) {
                instanceTable.row.add( [ 
                    menu.nama,
                    menu.link,
                    `<label>
                        <input type="checkbox" data-link="${menu.link}" class="filled-in view" ${( objMenus.view.indexOf(menu.link) > -1  ?  'checked="checked"' : '')}/>
                        <span></span>
                    </label>`,
                        `<label>
                        <input type="checkbox" data-link="${menu.link}" class="filled-in edit" ${(objMenus.edit.indexOf(menu.link) > -1  ?  'checked="checked"' : '' )} />
                        <span></span>
                    </label>`,
                        `<label>
                        <input type="checkbox" data-link="${menu.link}" class="filled-in delete" ${(objMenus.delete.indexOf(menu.link) > -1  ?  'checked="checked"' : '')}/>
                        <span></span>
                    </label>` ]).draw(false)
            });
        }
    })
    $('#save').on('click', async function(){
        var rolename = $('#rolename').val();
        var objDelete = $('.delete').filter(function( e ) {
            return $(this).is(':checked');
        }).map(function( e ){
            return $(this).data('link');
        });
        var objEdit = $('.edit').filter(function( e ) {
            return $(this).is(':checked');
        }).map(function( e ){
            return $(this).data('link');
        });
        var objView = $('.view').filter(function( e ) {
            return $(this).is(':checked');
        }).map(function( e ){
            return $(this).data('link');
        });
        var arrDelete = Array.from(objDelete);
        var arrEdit = Array.from(objEdit);
        var arrView = Array.from(objView);
        arrView.push('/logout/')
        var objRolesActivated = ({
            view : arrView,
            edit: arrEdit,
            delete: arrDelete
        })
        var response = await R.aput('http://' + R.hostport + '/update/role?role=' + rolename, document.cookie.replace("token=", ""), {roles: objRolesActivated})
        alert(response.message)
        window.location.reload()
    });
    var strModal = R.createModal({
        form: [{
            type: 'input',
            id: 'namarole',
            label: 'Nama Role Baru'
        }],
        id: 'modalRole',
        title: 'Form Add Role'
    });
    //console.log(strModal)
    $('.container').append(strModal);
    $('.modal').modal({
        endingTop: '5%'
    });
    $('#submit').on('click', async function(){
        $(this).attr('disabled', 'disabled')
        var namarole_baru = $('#namarole').val()
        if( /^[A-Za-z]+$/.test(namarole_baru) ) {
            var response = await R.apost('http://' + R.hostport + '/add/role', document.cookie.replace("token=", ""), {'role':namarole_baru.toLowerCase(), 'roles':'{"view":[], "edit":[], "delete":[]}'});
            alert(response.message)
            window.location.reload()
        } else {
            alert('Nama Salah')
        }
    })
});