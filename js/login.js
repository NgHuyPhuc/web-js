var checklogin = function check(){
    if(document.getElementById('username-input').value=='')
    {
        document.getElementById('userinputrong').style.display='block';
        document.getElementById('userinput').style.display='none';

    }
    else if(document.getElementById('username-input').value !='john')
    {
        document.getElementById('userinputrong').style.display='none';
        document.getElementById('userinput').style.display='block';
    }

    if(document.getElementById('password-input').value=='')
    {
        document.getElementById('passinputrong').style.display='block';
        document.getElementById('passinput').style.display='none';

    }
    else if(document.getElementById('password-input').value !='1234')
    {
        document.getElementById('passinput').style.display='block';
        document.getElementById('passinputrong').style.display='none';

    }

    else{
        console.log(document.getElementById('username-input').value);
        console.log(document.getElementById('password-input').value);

        if (document.getElementById('username-input').value == 'john' && document.getElementById('password-input').value == '1234') {
            window.location.href = './dashboard.html';
        }
    }
    
}