$(function(){
    loadrecipice()
    $("#recipes").on("click",".btn-danger",DeleteRecipies);
    $("#addBtn").click(Addrecipies);
    $("#recipes").on("click", ".btn-warning", UpdateRecepies);
    $("#updateSave").click(function () {
        var id = $("#updateId").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        $.ajax({
          url: "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
          data: { title, body },
          method: "PUT",
          success: function (response) {
            console.log(response);
            loadRecipies();
            $("#updateModal").modal("hide");
          },
        });
    });
});

function UpdateRecepies() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get(
      "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
      function (response) {
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");
      }
    );
  }

function loadrecipice(){
 $.ajax({
    url: "https://usman-fake-api.herokuapp.com/api/recipes",
    method: "GET",
    error: function(res) {
        console.log("error occured"+res)
    },
    success: function(res){
        const data=res;
        let recipes=$("#recipes")
        recipes.empty();
        for (let i = 0; i < data.length; i++) {
            const rec = data[i];
        recipes.append(`<div class="recipe" data-id="${rec._id}">
        <h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> 
        ${rec.body}</p></div>`)
            
        }
    }

 })
}

function Addrecipies(){
    let title=$("#title").val();
    let body=$("#body").val();
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes",
        method: "POST",
        data:{title,body},
        error: function(res) {
            console.log("error occured"+res)
        },
        success: function(res){

            console.log("res"+res)
            loadrecipice()
            $("#updateModal").modal("hide");
        
        }

    })
}

function DeleteRecipies(){
    let btn =$(this)
    let parent_div=btn.closest(".recipe")
    let id=parent_div.attr("data-id")
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes/"+id,
        method: "DELETE",
        error: function(res) {
            console.log("error occured"+res)
        },
        success: function(res){

          console.log("res"+res)
            loadrecipice()
        
        }

    })

}


  

