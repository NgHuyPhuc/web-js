
var xValues = [];
var yValues = [];

function updatechart() {
    new Chart("myChart", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Power Consumption"
            }
        }
    });
}
//add du lieu chart
$.ajax({
    type: "GET",
    url: "../json/dashboard.json",
    dataType: "json",
    success: function (response) {
        response.forEach(db => {
            xValues.splice(xValues.length, 0, db['Device']);
            yValues.splice(yValues.length, 0, db['Power']);
        });
        updatechart();
    }
})
var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#00aba9",
    "#e8c3b9",
    "#00aba9",

];

new Chart("myChart", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "Power Consumption"
        }
    }
});
//tinh total lan dau
let totaltable = 0;
$.ajax({
    type: "GET",
    url: "../json/dashboard.json",
    dataType: "json",
    success: function (response) {
        response.forEach(db => {
            totaltable = Number(totaltable) + Number(db['Power']);
        })
    }
})

//in table lan dau
$.ajax({
    type: "GET",
    url: "../json/dashboard.json",
    dataType: "json",
    success: function (response) {
        response.forEach((db,index) => {
            $("#load-dashboard").append("<tr><td>" + db['Device'] + "</td><td>" + db['MAC'] + "</td><td>" + db['IP'] + "</td><td>" + db['CreateDate'] + "</td><td>" + db['Power'] + "</td>     <td><a onclick='edittable("+index+")' id='edit"+index+"' class='edit' href='#'>Edit </a> || <a onclick='deletetable("+index+")' id='delete"+index+"' class='delete' href='#'> Delete</a></td>      </tr>"
            )
        })  
        $("#load-dashboard").append("<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td>" + 'Total' + "</td><td>" + '' + "</td><td>" + ' ' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + totaltable + "</td</tr>"
        )

    }
})

//menu
$(document).ready(function () {
    $('#toggle').click(function () {
        $('nav').slideToggle();
    });
})
//them moi du lieu
function functionadd() {
    var Deviceinput = document.getElementById("form-add").elements[0].value;
    var MACinput = document.getElementById("form-add").elements[1].value;
    var IPinput = document.getElementById("form-add").elements[2].value;
    var Dateinput = document.getElementById("form-add").elements[3].value;
    var Powerinput = document.getElementById("form-add").elements[4].value
    var checkDeviceinput = false;
    var checkMACinput=false;
    var checkIPinput=false;
    var checkDateinput=false;
    var checkPowerinput=false;
    if (Deviceinput == '' )
    {
        document.getElementById("errDevice").style.display ='block';
        checkDeviceinput = false;
    }
    else if (Deviceinput != '' )
    {
        document.getElementById("errDevice").style.display ='none';
        checkDeviceinput = true;
    }


    if(MACinput == '')  {
        document.getElementById("errMAC").style.display ='block';
        checkMACinput=false;
    }
    else if(MACinput != '')  {
        document.getElementById("errMAC").style.display ='none';
        checkMACinput=true;
    }


    if(IPinput == '')  {
        document.getElementById("errIP").style.display ='block';
        checkIPinput=false;
    }
    else if(IPinput != '')  {
        document.getElementById("errIP").style.display ='none';
        checkIPinput=true;
    }


    if(Dateinput == '')  {
        document.getElementById("errDate").style.display ='block';
        checkDateinput=false;
    }
    else if(Dateinput != '')  {
        document.getElementById("errDate").style.display ='none';
        checkDateinput=true;
    }


    if(Powerinput == '')  {
        document.getElementById("errPower").style.display ='block';
        checkPowerinput=false;
    }
    else if(Powerinput != '')  {
        document.getElementById("errPower").style.display ='none';
        checkPowerinput=true;
    }

    if(checkMACinput==true && checkMACinput ==true && checkIPinput==true && checkDateinput==true && checkPowerinput==true) {
        $.getJSON("../json/dashboard.json", function (data) {
            var newitem = {
                Device: Deviceinput,
                MAC: MACinput,
                IP: IPinput,
                CreateDate: Dateinput,
                Power: Powerinput
            } // a new object

            // add a new item to the set
            data.push(newitem);

            newtotal = 0
            html = "<tr style=' border-bottom: 2px solid #000000;'><th>Device</th><th>MAC Address</th><th>IP</th><th>Create Date</th><th>Power Consumtion(Kw/H)</th></tr>";
            for (var i = 0; i < data.length; i++) {
                html += "<tr><td>" + data[i].Device + "</td><td>" + data[i].MAC + "</td><td>" + data[i].IP + "</td><td>" + data[i].CreateDate + "</td><td>" + data[i].Power + "</td>    <td><a onclick='edittable("+i+")' id='edit"+i+"' class='edit' href='#'>Edit </a> || <a onclick='deletetable("+i+")' id='delete"+i+"' class='delete' href='#'> Delete</a></td>       </tr>";
                newtotal += Number(data[i].Power);
            }
            html += "<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td>" + "</td><td>" + '' + "</td><td>" + ' ' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + newtotal + "</td</tr>";
            document.getElementById("load-dashboard").innerHTML = html;
            //add data chart
            xValues.splice(xValues.length -1, 0, data[data.length -1].Device);
            yValues.splice(yValues.length -1, 0, data[data.length -1].Power);
            
            updatechart();

        });
    }//ngoac else

}
function logoutdropdown() {
    var x = document.getElementById("logoutdiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function loadpage()
{
    document.getElementById("adashboard").style.color = "blue";
    document.getElementById("idashboard").style.color = "blue";
}
loadpage();

function edittable(index)
{
    var Deviceinput = document.getElementById("form-edit").elements[0].value;
    var MACinput = document.getElementById("form-edit").elements[1].value;
    var IPinput = document.getElementById("form-edit").elements[2].value;
    var Dateinput = document.getElementById("form-edit").elements[3].value;
    var Powerinput = document.getElementById("form-edit").elements[4].value;
    document.getElementById('close-form-input').style.display = 'none';
    document.getElementById('edit-form-input').style.display = 'block';
    $.getJSON("../json/dashboard.json", function (data) {
        document.getElementById("form-edit").elements[0].value = data[index].Device;
        document.getElementById("form-edit").elements[1].value = data[index].MAC;
        document.getElementById("form-edit").elements[2].value = data[index].IP;
        document.getElementById("form-edit").elements[3].value = data[index].CreateDate;
        document.getElementById("form-edit").elements[4].value = data[index].Power;
        document.getElementById("iddevice").value = index;
    });
}

function edittableupdate(index)
{
    document.getElementById('close-form-input').style.display = 'none';
    document.getElementById('edit-form-input').style.display = 'block';
    $.getJSON("../json/dashboard.json", function (data) {
        document.getElementById("form-edit").elements[0].value = data[index].Device;
        document.getElementById("form-edit").elements[1].value = data[index].MAC;
        document.getElementById("form-edit").elements[2].value = data[index].IP;
        document.getElementById("form-edit").elements[3].value = data[index].CreateDate;
        document.getElementById("form-edit").elements[4].value = data[index].Power;
    });
}
function functionupdate()
{

    $.getJSON("../json/dashboard.json", function (data) {
        var Deviceinput = document.getElementById("form-edit").elements[0].value;
        var MACinput = document.getElementById("form-edit").elements[1].value;
        var IPinput = document.getElementById("form-edit").elements[2].value;
        var Dateinput = document.getElementById("form-edit").elements[3].value;
        var Powerinput = document.getElementById("form-edit").elements[4].value;
        var id = document.getElementById('iddevice').value;
        console.log(id);
        var newitem = {
            Device: Deviceinput,
            MAC: MACinput,
            IP: IPinput,
            CreateDate: Dateinput,
            Power: Powerinput
        }
        data.splice(id,1,newitem);

        newtotal = 0
            html = "<tr style=' border-bottom: 2px solid #000000;'><th>Device</th><th>MAC Address</th><th>IP</th><th>Create Date</th><th>Power Consumtion(Kw/H)</th></tr>";
            for (var i = 0; i < data.length; i++) {
                html += "<tr><td>" + data[i].Device + "</td><td>" + data[i].MAC + "</td><td>" + data[i].IP + "</td><td>" + data[i].CreateDate + "</td><td>" + data[i].Power + "</td>    <td><a onclick='edittable("+i+")' id='edit"+i+"' class='edit' href='#'>Edit </a> || <a onclick='deletetable("+i+")' id='delete"+i+"' class='delete' href='#'> Delete</a></td>       </tr>";
                newtotal += Number(data[i].Power);
            }
            html += "<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td>" + "</td><td>" + '' + "</td><td>" + ' ' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + newtotal + "</td</tr>";
            document.getElementById("load-dashboard").innerHTML = html;
            //add data chart
            xValues.splice(id, 1, data[id].Device);
            yValues.splice(id, 1, data[id].Power);
            
            updatechart();
    });
}
function deletetable(index){
    $.getJSON("../json/dashboard.json", function (data) {
        console.log(data);
        data.splice(index,1);
        console.log(data)
        newtotal = 0
        html = "<tr style=' border-bottom: 2px solid #000000;'><th>Device</th><th>MAC Address</th><th>IP</th><th>Create Date</th><th>Power Consumtion(Kw/H)</th></tr>";
        for (var i = 0; i < data.length; i++) {
            html += "<tr><td>" + data[i].Device + "</td><td>" + data[i].MAC + "</td><td>" + data[i].IP + "</td><td>" + data[i].CreateDate + "</td><td>" + data[i].Power + "</td>    <td><a onclick='edittable("+i+")' id='edit"+i+"' class='edit' href='#'>Edit </a> || <a onclick='deletetable("+i+")' id='delete"+i+"' class='delete' href='#'> Delete</a></td>       </tr>";
            newtotal += Number(data[i].Power);
        }
        html += "<tr style='background-color: #fafbfb;'><td style='font-weight: bold;'>Total</td>" + "</td><td>" + '' + "</td><td>" + ' ' + "</td><td>" + ' ' + "</td><td style='font-weight: bold;'>" + newtotal + "</td</tr>";
        document.getElementById("load-dashboard").innerHTML = html;
        //add data chart
        xValues.splice(index, 1);
        yValues.splice(index, 1);
        updatechart();

    });
}