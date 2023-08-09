
function loaddatalog() {
    $.getJSON("../json/logs.json", function (data) {
        var html = "<tr style=' border-bottom: 2px solid #000000;'><th>Device</th><th>Action</th><th>IP</th><th>Date</th></tr>";
        var perpage = 3;
        var page = 0;
        var totalpaginate = 0;
        for (i = page * perpage; i < 3; i++) {
            for (i = page * perpage; i < (page + 1) * perpage; i++) {
                html += "<tr><td>" + data[i].Device + "</td><td>" + data[i].Name + "</td><td>" + data[i].Action + "</td><td>" + data[i].Date + "</td></tr>";
                totalpaginate += Number(data[i].Date);
            }
        }
        html += "<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td></td><td>" + '' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + totalpaginate + "</td</tr>";
        document.getElementById("load-logs").innerHTML = html;

        var pagenow = "<p>Trang " + Number(page + 1) + "</p>";
        document.getElementById("updatepage").innerHTML = pagenow;
        document.getElementById("updatepage").style.display = "block";
        var pagenum = "page" + page;
        console.log('pagenum ' + pagenum);
    });
}
loaddatalog();
//menu
$(document).ready(function () {
    $('#toggle').click(function () {
        $('nav').slideToggle();
    });
})


//filter


function filter() {
    var search = document.getElementById('value-search').value;
    var arrid = [];
    if (search == '') {
        // loaddatalognull();
        loaddatalog();
    }
    else {
        $.getJSON("../json/logs.json", function (data) {


            for (var i = 0; i < data.length; i++) {
                if (data[i].Device == search || data[i].Name == search || data[i].Action == search || data[i].Date == search) {
                    arrid.push(data[i]);
                }
            }
            window.arrsearch = arrid;
            newtotal = 0
            var html = "<tr style=' border-bottom: 2px solid #000000;'><th>Device</th><th>Action</th><th>IP</th><th>Date</th></tr>";
            for (var i = 0; i < 3; i++) {
                html += "<tr><td>" + arrid[i].Device + "</td><td>" + arrid[i].Name + "</td><td>" + arrid[i].Action + "</td><td>" + arrid[i].Date + "</td></tr>";
                newtotal += Number(arrid[i].Date);
            }
            html += "<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td></td><td>" + '' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + newtotal + "</td</tr>";
            document.getElementById("load-logs").innerHTML = html;

            //pagination search

            var countdata = arrid.length;
            var perpage = 3;
            var num = countdata / perpage;
            var htmlpaginatesearch = '';
            for (var i = 0; i < num; i++) {
                htmlpaginatesearch += "<a id='page" + i + "' onclick=" + "paginationsearch(" + i + ")" + " href='#'>" + Number(i + 1) + "</a>"
            }
            document.getElementById("pagination").innerHTML = htmlpaginatesearch;
        });
    }

    //table
}

function countpaginate() {
    $.getJSON("../json/logs.json", function (data) {
        var countdata = data.length;
        console.log('countdata ' + countdata);
        var perpage = 3;
        var num = countdata / perpage;
        var html = '';
        for (var i = 0; i < num; i++) {
            html += "<a id='page" + i + "' onclick=" + "pagination(" + i + ")" + " href='#'>" + Number(i + 1) + "</a>"
        }
        document.getElementById("pagination").innerHTML = html;
        document.getElementById("page0").style.color = "red";

    })
}
countpaginate();
//phan trang binh thuong
function pagination(page) {
    $.getJSON("../json/logs.json", function (data) {
        var html = "<tr style=' border-bottom: 2px solid #000000;'><th>Device</th><th>Action</th><th>IP</th><th>Date</th></tr>";

        var perpage = 3;
        var totalpaginate = 0;
        for (i = page * perpage; i < (page + 1) * perpage; i++) {
            if (((page + 1) * perpage) > data.length) {
                for (i = page * perpage; i < data.length; i++) {
                    html += "<tr><td>" + data[i].Device + "</td><td>" + data[i].Name + "</td><td>" + data[i].Action + "</td><td>" + data[i].Date + "</td></tr>";
                    totalpaginate += Number(data[i].Date);
                }
            }
            else {
                for (i = page * perpage; i < (page + 1) * perpage; i++) {
                    html += "<tr><td>" + data[i].Device + "</td><td>" + data[i].Name + "</td><td>" + data[i].Action + "</td><td>" + data[i].Date + "</td></tr>";
                    totalpaginate += Number(data[i].Date);
                }
            }
        }


        var pagenum = "page" + page;
        console.log('pagenum ' + pagenum);
        document.getElementById(pagenum).style.color = "red";


        html += "<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td></td><td>" + '' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + totalpaginate + "</td</tr>";
        document.getElementById("load-logs").innerHTML = html;


        var pagenow = "<p>Trang " + Number(page + 1) + "</p>";
        document.getElementById("updatepage").innerHTML = pagenow;
        document.getElementById("updatepage").style.display = "block";

        for (var i = 0; i < data.length; i++) {
            if(i != page)
            {
                var pagenum = "page" + i;
                document.getElementById(pagenum).style.color = "white";
            }
        }
        var pagenum = "page" + page;
        document.getElementById(pagenum).style.color = "red";

    })
}

//pagination search
function paginationsearch(page) {
    //search
    var search = document.getElementById('value-search').value;
    var arrid = [];
    if (search == '') {
        loaddatalog();
    }
    else {
        $.getJSON("../json/logs.json", function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Device == search || data[i].Name == search || data[i].Action == search || data[i].Date == search) {
                    arrid.push(data[i]);
                }
            }

            var countdata = arrid.length;
            var perpage = 3;
            var num = countdata / perpage;
            var htmlpaginatesearch = '';
            for (var i = 0; i < num; i++) {
                htmlpaginatesearch += "<a id='page" + i + "' onclick=" + "paginationsearch(" + i + ")" + " href='#'>" + Number(i + 1) + "</a>"
            }
            document.getElementById("pagination").innerHTML = htmlpaginatesearch;

            //xu ly page nhan vao
            var html = "<tr style=' border-bottom: 2px solid #000000;'><th>Device</th><th>Action</th><th>IP</th><th>Date</th></tr>";
            var perpage = 3;
            var totalpaginate = 0;
            for (i = page * perpage; i < (page + 1) * perpage; i++) {
                if (((page + 1) * perpage) > arrid.length) {
                    for (i = page * perpage; i < arrid.length; i++) {
                        html += "<tr><td>" + arrid[i].Device + "</td><td>" + arrid[i].Name + "</td><td>" + arrid[i].Action + "</td><td>" + arrid[i].Date + "</td></tr>";
                        totalpaginate += Number(arrid[i].Date);
                    }
                }
                else {
                    for (i = page * perpage; i < (page + 1) * perpage; i++) {
                        html += "<tr><td>" + arrid[i].Device + "</td><td>" + arrid[i].Name + "</td><td>" + arrid[i].Action + "</td><td>" + arrid[i].Date + "</td></tr>";
                        totalpaginate += Number(arrid[i].Date);
                    }
                }
            }
            var pagenum = "page" + page;
            console.log('pagenum ' + pagenum);
            document.getElementById(pagenum).style.color = "red";


            html += "<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td></td><td>" + '' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + totalpaginate + "</td</tr>";
            document.getElementById("load-logs").innerHTML = html;


            var pagenow = "<p>Trang " + Number(page + 1) + "</p>";
            document.getElementById("updatepage").innerHTML = pagenow;
            document.getElementById("updatepage").style.display = "block";

            for (var i = 0; i < data.length; i++) {
                if(i != page)
                {
                    var pagenum = "page" + i;
                    document.getElementById(pagenum).style.color = "white";
                }
            }
            var pagenum = "page" + page;
            document.getElementById(pagenum).style.color = "red";

        });
    }



    //end search


}
function logoutdropdown() {
    var x = document.getElementById("logoutdiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function loadpage() {
    document.getElementById("alogs").style.color = "blue";
    document.getElementById("ilogs").style.color = "blue";
    
}
loadpage();
