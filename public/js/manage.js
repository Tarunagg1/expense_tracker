const expenceformel = document.getElementById("addexpense")
if(expenceformel){
    expenceformel.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formdata = $("#addexpense").serialize();
        $.ajax({
            url:$("#addexpense").attr("action"),
            type:"POST",
            data:formdata,
            success:function(data){
                $("#addexpense")[0].reset();
                if(data.status){
                    swal(data.message)
                }
            },
            error:function(err){
                $("#addexpense")[0].reset();
                if(err.status){
                    swal(data.message);
                }
            }
        })
    })
}

///////////////////// updateprofile
const updateprofile = document.getElementById("updateprofile");
if(updateprofile){
    updateprofile.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formdata = $("#updateprofile").serialize();
        $.ajax({
            url:"/updatepass",
            type:"PUT",
            data:formdata,
            success:function(data){
                console.log(data);
                if(data.status){
                    swal(data.message)
                }
            },
            error:function(err){
                if(!err.status >= 400){
                    swal(data.message);
                }
            }
        })
    })
}


/////// change pass
const changepass = document.getElementById('changepass');
if(changepass){
    changepass.addEventListener('submit',(e)=>{
        e.preventDefault();
        // validation
        oldpass = $("#oldpass").val();
        newpass = $("#newpass").val();
        cpass = $("#cpass").val();

        if(!oldpass || !newpass || !cpass){
            swal("All field required");
            return;
        }

        if(newpass != cpass){
            swal("new password not match with confirm password");
            return
        }

        // ajax req
        const formdata = $("#changepass").serialize();
        $.ajax({
            url:"/changepass",
            type:"PUT",
            data:formdata,
            success:function(data){
                console.log(data);
                if(data.status){
                    swal(data.message)
                }
            },
            error:function(err){
                resp = JSON.parse(err.responseText)
                swal(resp.message);
            }
        })
    })
}



//////////////////// report genration
const makeDomUpdate = (data,no)=>{
    let table = `<h4>${no} Expence found</h4> <button class="btn btn-primary" id="againform">Reload</button> <table id="datatables-dashboard-projects" class="table mt-5 table-striped my-0 dataTable no-footer">
    <thead>
        <tr role="row">
            <th>Sno.</th>
            <th >email</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
            ${data}
        </tbody>
    </table>`;

    const mainreportel = document.getElementById("mainreport");
    mainreportel.innerHTML = table;

    //// reverse to form
    let againformel = document.getElementById("againform");
    console.log(againformel);
    againformel.addEventListener('click',makeform);
}

const iteratedata = (dataobj)=>{
    let maketable = '';
    sno = 0;
    dataobj.map((data,ind)=>{
        maketable += ` <tr role="row" class="odd">
            <td>${ind+1}</td>
            <td>${data.email}</td>
            <td>${data.title}</td>
            <td>
                ${data.cradittype == `cradit` ? `<span class="badge badge-success">+ ${data.amount}</span>` : `<span class="badge badge-danger">- ${data.amount}</span>`};
            </td>
            <td>${data.desc}</td>
            <td>${data.createdAt}</td>
        </tr>`;
        sno = ind;
    });
    makeDomUpdate(maketable,sno+1);
}


const makeform = () =>{
    const form = `<div class="card">
    <div class="card-header">
        <h5 class="card-title">View profile</h5>
    </div>
    <div class="card-body">
        <div class="form-group">
            <label class="form-label">View From</label>
            <input type="date" name="from" id="from"" class=" form-control" placeholder="Select form"
                required>
            </div>
            <div class="form-group">
                <label class="form-label">View to</label>
                <input type="date" name="to" id="to"" class=" form-control" placeholder="Select date"
                    required>
            </div>

            <button type="submit" id="viewreport" class="btn btn-primary">View report</button>
        </div>
    </div>`;
    const mainreportel = document.getElementById("mainreport");
    mainreportel.innerHTML = form;
}


const viewreportel = document.getElementById("viewreport")
if(viewreportel){
    viewreportel.addEventListener('click',()=>{
        from = $("#from").val();
        to = $("#to").val();
        if(from == "")
            swal("select from date")
        else if(to == "")
            swal("select to date");
        else{
            $.ajax({
                url:"/getreport",
                type:"POST",
                data:"from="+from+"&to="+to,
                success:function(data){
                    if(data.status){
                        console.log(data.expencedata.length);
                        if(data.expencedata.length){
                            iteratedata(data.expencedata);
                        }else{
                            swal("no expense found");
                        }
                    }
                },
                error:function(err){
                    console.log(err);
                    // resp = JSON.parse(err.responseText)
                    console.log(err.responseJSON);
                    swal(resp.message);
                }
            })
        }
    })
}



//////////////////////////////////////////////// feedback
const feedbackformel = document.getElementById("feedbackform");
if(feedbackformel){
    feedbackformel.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formdata = $("#feedbackform").serialize();
        $.ajax({
            url:"/feedback",
            type:"POST",
            data:formdata,
            success:function(data){
                console.log(data);
                $("#feedbackform")[0].reset();
                if(data.status){
                    swal(data.message)
                }
            },
            error:function(err){
                resp = JSON.parse(err.responseText)
                swal(resp.message);
            }
        })
    })
}
