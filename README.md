# 1. Overview of My Full Stack Web Application with Angular, ASP.NET Core Web API, Entity Entity Framework Core, C# REST API


In this tutorial, we'll use ASP.NET Core for implementing a RESTful backend and test REST endpoint with Swagger. Learn and Create Angular single page application to display view for the users.

## 2. The ASP.NET Application

Our demo web application's functionality will be pretty simplistic indeed. It builds a controller-based web API that uses Microsoft SQL Server Management Studio.

### 2.1 The Overview 

This tutorial creates the following API:

<table>
  <thead>
    <tr>
      <th>API Endpoint</th>
      <th>Description</th>
      <th>Request Body</th>
      <th>Response Body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET /api/categoryitems</td>
      <td>Get all category items</td>
      <td>None</td>
      <td>Array of category items</td>
    </tr>
    <tr>
      <td>GET /api/categoryitems/{id}</td>
      <td>Get an item by ID</td>
      <td>None</td>
      <td>category item</td>
    </tr>
    <tr>
      <td>POST /api/categoryitems</td>
      <td>Add a new item</td>
      <td>category item</td>
      <td>category item</td>
    </tr>
    <tr>
      <td>PUT /api/categoryitems/{id}</td>
      <td>Update an existing item</td>
      <td>category item</td>
      <td>None</td>
    </tr>
    <tr>
      <td>DELETE /api/categoryitems/{id}</td>
      <td>Delete an item</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>


### 2.2 The Prerequisites
<img height="500" src="https://github.com/Tiffany678/DotNetWebAPI_Angular/Img/VSTemplate.png" alt="Visual Studio Template" width="650"/>

<ul>
  <li>From the File menu, select New > Project.</li>
  <li>Enter Web API in the search box.</li>
  <li>Select the ASP.NET Core Web API template and select Next.</li>
  <li>In the Configure your new project dialog, name the project CodePulse.API and select Next.</li>
</ul>



### 2.3 Add a NuGet package

A NuGet package must be added to support the SQL Server used in this tutorial.
<ul>
  <li>From the Tools menu, select NuGet Package Manager > Manage NuGet Packages for Solution.</li>
  <li>Select the Browse tab.</li>
  <li>Enter Microsoft.EntityFrameworkCore.SqlServer in the search box, and then select Microsoft.EntityFrameworkCore.SqlServer.</li>
  <li>Select the Project checkbox in the right pane and then select Install.</li>
  <li>Enter Microsoft.EntityFrameworkCore.Tools in the search box, and then select Microsoft.EntityFrameworkCore.Tools.</li>
  <li>Select the Project checkbox in the right pane and then select Install.</li>
</ul>


### 2.4 Add a model class

A model is a set of classes that represent the data that the app manages. One of the models for this app is the Category class.

<ul>
  <li>In Solution Explorer, right-click the project. Select <em>Add</em> > <em>New Folder</em>. Name the folder <em>Models</em>.</li>
  <li>Right-click the Models folder and select <em>Add</em> > <em>Class</em>. Name the class Category and select <em>Add</em>.</li>
  <li>Replace the template code with the following:</li>
</ul>

```
namespace CodePulse.API.Models.Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UrlHandle { get; set; }
    }
}
```

### 2.5 Add a database context

The database context is the main class that coordinates Entity Framework functionality for a data model. This class is created by deriving from the Microsoft.EntityFrameworkCore.DbContext class.

<ul>
  <li>In Solution Explorer, right-click the project. Select <em>Add</em> > <em>New Folder</em>. Name the folder <em>Data</em>.</li>
  <li>Right-click the <em>Data</em> folder and select <em>Add</em> > <em>Class</em>. Name the class <em>ApplicationDbContext</em> and select <em>Add</em>.</li>
</ul>

```
using CodePulse.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}

```

### 2.6 Add a database context
In ASP.NET Core, services such as the DB context must be registered with the dependency injection (DI) container. The container provides the service to controllers.

Update Program.cs with the following highlighted code:

```
using CodePulse.API.Data;
using CodePulse.API.Repositories.Implementation;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


<span style="background-color: yellow;">builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CodePulseConnectionString"));
});

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();</span>

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
});

app.UseAuthorization();

app.MapControllers();

app.Run();

```




# To Be Continued
