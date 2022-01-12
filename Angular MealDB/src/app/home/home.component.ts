import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchStr=""
  food:{idMeal : String, strMealThumb : String, strMeal : String}[]=[]
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("key") === "no-access" || localStorage.getItem("key") === "no-access-login-required")
    {
      this.router.navigateByUrl('/login');
    }
    this.http.get <any>("https://www.themealdb.com/api/json/v1/1/filter.php?i="+"onion") 
    .subscribe (data => {
      this.food=data.meals
      // console.log(data.meals)
    })
  }
  getMeal()
  {
    // console.log(this.searchStr)
    this.http.get <any>("https://www.themealdb.com/api/json/v1/1/filter.php?i="+this.searchStr) 
    .subscribe (data => {
      this.food=data.meals
      // console.log(data.meals)
    })
  }
  getMealRecepie(mealId:String)
  {
   
    // this.http.get <any>(" https://www.themealdb.com/api/json/v1/1/lookup.php?i="+mealId) 
    // .subscribe (data => {
    //   // this.food=data.meals
    //   console.log(data)
    // })
    this.router.navigateByUrl('/recepie/'+mealId, { state: {link: "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+mealId} });
  }
  logout(){
    localStorage.setItem("key","no-access")
    this.router.navigateByUrl('/login');
  }
}
