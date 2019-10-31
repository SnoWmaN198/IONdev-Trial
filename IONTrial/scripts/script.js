var users = [];

$(document).ready(function(){
  
  // Checklist (personal tracking of the exercice for myself)
  $('input[type=checkbox]').on('change', function(){
    var div = $(this).closest('.task');
    if($(this).is(":checked")){
        div.addClass("done");
    }
    else
    {
        div.removeClass("done");
    }
  });

  // Get all Users  
  $.ajax(
    {
      type:'GET',
      url: 'https://ricardo.trials.iondev.lu/users',
      success:function(data){
      for(var i = 0; i < data.length; i++){
        users.push(data[i].username);
      }
      console.log(users);
      },
      error:function(){
        console.log("error");
      }
    }
  );

  // Set up eventListeners
  $(".getPost").click(getAllPost);
  $(".addPost").click(addPost);
  //$(".searches").click(searchTable);
  $("tbody").on("click",".deletePost",null,function(){
    var id = $(this).attr("id");
    deletePost(id);
  });

  // Get all Posts
  function getAllPost()
  {
      var posts = [];

      $.ajax(
        {
          type:'GET',
          url: 'https://ricardo.trials.iondev.lu/posts',
          success:function(data){
            $("tbody").empty();
            $("thead").empty();
            $("thead").append("<tr>" + "<th>"+"Title"+"</th>"+"<th>"+"Author"+"</th>"+ "<th>"+ "Id" +"</th>"+ "<th>"+ "Action" +"</th>"+"</tr>");
            for(var i = 0; i < data.length; i++){
              posts.push(data[i].title);
              $("tbody").append("<tr>" + "<td>"+ data[i].title +" "+ data[i].body + "</td>"+"<td>"+data[i].userId+"</td>"+ "<td>"+ data[i].id+"</td>"+"<td><button id="+data[i].id+" class='deletePost'>Delete</button></td>"+"</tr>");
            }
            console.log(posts);
          },
            error:function(){
            console.log("error");
          }
        }
      );
  }
    
  // Delete a Post
  function deletePost(id){
    //console.log("id",id);
    $.ajax(
      {
          type:'DELETE',
          url: 'https://ricardo.trials.iondev.lu/posts/'+id,
          success:function(){
            getAllPost();
            console.log("Post deleted");
          },
          error:function(){
            console.log("error");
          }
      }
    );
  }

  // Add a new Post
  function addPost()
  {
      var data = new Object();
      data.title = $("input[name='title']").val();
      data.body = $("input[name='body']").val();
      data.userId = $("input[name='author']").val();
      //console.log(data.title,data.body,data.userId,data.id);
      $.ajax(
        {
          type:'POST',
          url: 'https://ricardo.trials.iondev.lu/posts',
          data: JSON.stringify(data),
          contentType:'application/json',
          success:function(){
            getAllPost();
            console.log("Post added");
          },
          error:function(){
              console.log("error");
          }
        }
      );
  }

  // Search a Post
  $("#search").keyup(function(){
    searchTable($(this).val());
  });

  function searchTable(value){
    $('#postResults tr').each(function(){
      var foundResult = 'false';
      var searchResults = [];
      $(this).each(function() {
        if($(this).text().toLowerCase().indexof(value.toLowerCase()) >= 0){
          foundResult = 'true';
        }
      });

      if(foundResult == 'true'){
        searchResults.push($(this));
        $(this).show();
      }
      else{
        $(this).hide();
      }
      console.log(searchResults);
    });
  };

});