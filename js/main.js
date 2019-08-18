
function init() {
    new HikarApp();
}

class HikarApp {

    constructor() {
        this.setupMap();
        this.setupAbout();
        this.setupSignup();
        this.setupLogin();
    }

    setupMap() {
        document.getElementById("noticeboard").addEventListener("click", e=> {
            this.dlg = new Dialog('main',
                { 'Close': ()=> { this.dlg.hide(); } }, 
                { backgroundColor: 'rgba(128,128,192,0.9)',
                    width: '800px',
                    height: '800px',
                    color: 'white',
                    borderRadius: '15px' } );

             var content= 
"<h2>Create noticeboards...</h2>"
+"<p>Upcoming version 0.3 will show <em>augmented reality noticeboards</em>, "+
"informing walkers of points of interest along the way or warning them of "+
"hazards such as steep paths, animals, or path blockages. While version 0.3 "+
"is not out just yet, you can add noticeboards <strong>right now!</strong></p>"+
"<p>Just do it by selecting the marker icon and clicking on the map. Note "+
"that you will need to be <a href='/login'>logged in with your Hikar account</a>"+
" to be able to create noticeboards, and all noticeboards must be verified by site admins.</p>"+
"<p><strong>Privacy notice: your user ID will be recorded in the Hikar database alongside your noticeboard, so it is possible for the Hikar admin to find out which OSM users contributed which notices.</strong>. However, this information is not available via a public API.</p>"+
"<div id='map' style='margin-left: auto; margin-right:auto; width:640px; height:480px'>"+
            "<div id='searchContainer'>"+
            "<div id='search'>"+
                "<input id='q' type='text'  />"+
                "<div id='imageContainer'>" +
                "<img src='images/search.png' alt='Search' id='searchBtn' />"+
                "</div>"+
            "</div><div id='searchResults' style='clear: both'></div></div></div>";
            this.dlg.setContent(content);
            this.dlg.setPosition("100px", "100px");
            this.dlg.show();
        
            var lat = (window.localStorage &&
                window.localStorage.getItem("lat")!=null) 
                ? window.localStorage.getItem("lat") : 51.05;
			var lon = (window.localStorage &&
                window.localStorage.getItem("lon")!=null) 
                ? window.localStorage.getItem("lon") : -0.72;
        	var zoom = (window.localStorage &&
                window.localStorage.getItem("zoom")!=null) 
                ? window.localStorage.getItem("zoom") : 14;

            this.hikarMap = new HikarMap("map", lat, lon, zoom);    
        });
    }

    setupLogin() {
        this.loginDlg = new Dialog('main',
                { 'Login': this.processLogin.bind(this),
                'Cancel': ()=> { this.loginDlg.hide(); }},
                {
                backgroundColor: "rgba(128,128,192,0.9)",
                color: "white",
                borderRadius: "20px", textAlign: "center" });
        this.loginDlg.setContent('<h2>Login</h2>'+
            "<p><span id='loginError' class='error'></span><br />"+
            "<label for='username'>Email address</label><br />" +
            "<input id='username' type='text' /> <br />"+
            "<label for='password'>Password</label><br />" +
            "<input id='password' type='password' /> </p>"+
            "<p><a href='forgotPassword'>Forgot password?</a></p>");
        this.loginDlg.setPosition("37%", "25%");
        this.loginDlg.setSize ("25%", "288px");
        fetch ('login').then(resp => resp.json()).then(json => {
            this.username = json.username;
            this.userid = json.userid;
            this.onLoginStateChange();
        });
    }    

    setupAbout() {
        this.aboutDlg = new Dialog('main',
                { 'OK': ()=> { this.aboutDlg.hide(); }},
                {
                backgroundColor: "rgba(128,128,192,0.9)",
                color: "white",
                padding: '20px',
                overflow: 'auto',
                fontSize: '120%',
                borderRadius: "20px", textAlign: "left" });
        this.aboutDlg.setPosition("25%", "20%");
        this.aboutDlg.setSize ("50%", "512px");
        fetch('views/about.html')
            .then(resp=>resp.text())
            .then(txt => { this.aboutDlg.setContent(txt);
        });
        document.getElementById('more').addEventListener('click', this.aboutDlg.show.bind(this.aboutDlg));
    }

    setupSignup() {
        this.signupDlg = new Dialog('main',
                { 'Agree and signup': this.processSignup.bind(this),
                'Close': ()=> { this.signupDlg.hide(); }},
                {
    
                backgroundColor: "rgba(128,128,192,0.9)",
                color: "white", padding: '10px',
                borderRadius: "20px", textAlign: "center" });
        this.signupDlg.setContent(
"<h2>Sign up</h2>"+
"<p id='signupMsg' class='error'></p>"+
"<div id='signup_content'>"+
"<p>Signing up will allow you to create, modify and delete AR noticeboards."+
"</p>"+
"<p><strong>Please do NOT use a password that you use "+
"elsewhere. While this site has standard security measures implemented, it is "+
"a personal rather than a corporate site, and "+
"therefore has not had a full security audit carried out by a security professional.</strong></p>"+
"<label for='username'>"+
"Enter your email address:"+
"</label>"+
"<br />"+
"<input name='username' id='username' type='text' />"+
"<br /> <label for='password'>Enter a password: </label> <br />"+
"<input name='password' id='password' type='password'/>" +
"<br /> <label for='password2'>Re-enter your password: </label> <br />"+
"<input name='password2' id='password2' type='password'/>"+
"<p>"+
"<strong>Privacy policy:</strong> Your email address is stored in the Hikar "+
"database to allow you to reset your password should you forget it. All "+
"noticeboards you create will be associated with your user account in the "+
"Hikar database and therefore Hikar admins can work out who created which "+
"noticeboard. However this information is not available via a public API."+
"</p></div>");

        this.signupDlg.setPosition("25%", "10%");
        this.signupDlg.setSize ("800px", "560px");
    }    

    
    processLogin() {
        var json=JSON.stringify({"username": document.getElementById("username").value,  "password": document.getElementById("password").value});
        fetch('login', { method: 'POST', headers: {'Content-Type': 'application/json'}, body:json})
                .then(res => res.json())
                .then(json => {
                    if(json.error) {
                        document.getElementById("loginError").innerHTML = json.error;
                    } else if(json.username) {
                        this.username = json.username;
                        this.userid = json.userid;
                        this.loginDlg.hide();
                        this.onLoginStateChange();
                    }
            });
    }

    processSignup() {
        var json=JSON.stringify({"username": document.getElementById("username").value,  "password": document.getElementById("password").value, "password2": document.getElementById("password2").value});
        fetch('signup', { method: 'POST', headers: {'Content-Type': 'application/json'}, body:json})
                .then(res => res.json())
                .then(json => {
                    if(json.error) {
                        document.getElementById("signupMsg").innerHTML = json.error;
                    } else if(json.username) {
                        document.getElementById("signupMsg").innerHTML = `Successfully signed up as ${json.username}`; 
                    }
        });
    }

    onLoginStateChange(){
        if(this.username) {
            this.onLogin();
        } else {
            this.onLogout();
        }
    }

    onLogin() {
        document.getElementById("loginContainer").innerHTML = "";
        var t = document.createTextNode(`Logged in as ${this.username}`);
        document.getElementById("loginContainer").appendChild(t);
        var a = document.createElement("a");
        a.id="logout";
        a.addEventListener("click", this.logout.bind(this));
        a.appendChild(document.createTextNode(" "));
        a.appendChild(document.createTextNode("Logout"));
        document.getElementById("loginContainer").appendChild(a);
    }

    onLogout() {
        document.getElementById("loginContainer").innerHTML = "";
        var as = document.createElement("a");
        as.id="signup";
        as.addEventListener("click", this.signupDlg.show.bind(this.signupDlg));
        as.appendChild(document.createTextNode("Sign up"));
        var al = document.createElement("a");
        al.id="login";
        al.addEventListener("click", this.loginDlg.show.bind(this.loginDlg));
        al.appendChild(document.createTextNode("Login"));
        document.getElementById("loginContainer").appendChild(as);
        document.getElementById("loginContainer").appendChild(document.createTextNode(" | "));
        document.getElementById("loginContainer").appendChild(al);
    } 


    logout() {
        fetch('logout', {method:"POST"}).then(resp=> {
            this.username = null;
            this.onLoginStateChange();
        });
    }
}

